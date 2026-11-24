import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

/**
 * Admin panel role hierarchy.
 * developer (top) > owner > admin
 *   - developer: everything, incl. adding/removing owners and admins.
 *   - owner:     manages admins and the menu.
 *   - admin:     manages the menu only.
 */
export const ROLE_RANK = { admin: 1, owner: 2, developer: 3 };
export const ROLES = ['developer', 'owner', 'admin'];

export function roleRank(role) {
  return ROLE_RANK[role] ?? 0;
}

export function hasRoleAtLeast(profile, minRole) {
  if (!profile || !profile.is_active) return false;
  return roleRank(profile.role) >= roleRank(minRole);
}

/**
 * Resolve the signed-in panel user for this request.
 * Returns { user, profile } or null when not signed in, when the
 * account has no profile, or when the profile is deactivated.
 */
export async function getAdminSession() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return null;

  // Read the profile through the service-role client so RLS can stay
  // strict; fall back to the session client if the key is missing.
  const admin = createSupabaseAdminClient();
  const reader = admin ?? supabase;

  const { data: profile } = await reader
    .from('profiles')
    .select('id, email, display_name, role, is_active, created_by, created_at')
    .eq('id', user.id)
    .single();

  if (!profile || !profile.is_active) return null;

  return { user, profile };
}

export default getAdminSession;
