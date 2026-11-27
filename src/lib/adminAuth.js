import { cache } from 'react';
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

const PROFILE_COLUMNS =
  'id, email, display_name, role, is_active, created_by, created_at';

/**
 * Resolve the panel auth state for this request.
 *
 * Wrapped in React `cache()` so the layout AND the page of the same request
 * share ONE auth check + ONE profile query (previously each did its own,
 * which doubled the round-trips to Supabase on every navigation).
 *
 * The JWT is verified with `getClaims()` (local signature check against the
 * cached JWKS) instead of `getUser()` (a network round-trip to Supabase Auth
 * on every request). Expired tokens are refreshed beforehand by `src/proxy.js`.
 *
 * status: 'ok' | 'anonymous' | 'no-profile' | 'inactive' | 'unconfigured'
 */
export const getAdminAuthState = cache(async () => {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { status: 'unconfigured' };

  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (error || !claims?.sub) return { status: 'anonymous' };

  // Read the profile through the service-role client so RLS can stay
  // strict; fall back to the session client if the key is missing.
  const reader = createSupabaseAdminClient() ?? supabase;
  const { data: profile } = await reader
    .from('profiles')
    .select(PROFILE_COLUMNS)
    .eq('id', claims.sub)
    .maybeSingle();

  const email = claims.email ?? profile?.email ?? '';
  if (!profile) return { status: 'no-profile', email };
  if (!profile.is_active) return { status: 'inactive', email };

  return { status: 'ok', user: { id: claims.sub, email }, profile };
});

/**
 * Resolve the signed-in panel user for this request.
 * Returns { user, profile } or null when not signed in, when the
 * account has no profile, or when the profile is deactivated.
 */
export async function getAdminSession() {
  const state = await getAdminAuthState();
  return state.status === 'ok' ? { user: state.user, profile: state.profile } : null;
}

/**
 * CSRF guard for mutating API calls: when the browser sends an Origin
 * header it must match the host that served the request.
 */
export function isSameOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin) return true; // same-origin GET / non-browser clients
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export default getAdminSession;
