import { getAdminSession, hasRoleAtLeast, roleRank, ROLES } from '@/lib/adminAuth';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

/**
 * Admin panel - user & role management.
 *
 * Hierarchy: developer > owner > admin
 *   GET    list users          -> owner and above
 *   POST   create a user       -> developer: any role / owner: admins only
 *   PATCH  change role/active  -> developer: anyone* / owner: admins only
 *   DELETE delete a user       -> developer only
 *   * a developer can never delete/deactivate/demote the LAST active
 *     developer, and nobody can change their own role or active flag.
 *
 * All writes go through the service-role client AFTER the caller's
 * role has been verified here - this route is the security gate.
 */

function fail(message, status = 400) {
  return Response.json({ error: message }, { status });
}

async function requireSession(minRole) {
  const session = await getAdminSession();
  if (!session) return { error: fail('Not signed in.', 401) };
  if (!hasRoleAtLeast(session.profile, minRole)) {
    return { error: fail('Your role does not allow this action.', 403) };
  }
  const admin = createSupabaseAdminClient();
  if (!admin) {
    return {
      error: fail(
        'Server is missing SUPABASE_SERVICE_ROLE_KEY - user management is unavailable.',
        503
      ),
    };
  }
  return { session, admin };
}

async function getProfile(admin, id) {
  const { data } = await admin
    .from('profiles')
    .select('id, email, display_name, role, is_active, created_by, created_at')
    .eq('id', id)
    .single();
  return data ?? null;
}

async function countActiveDevelopers(admin, exceptId = null) {
  let query = admin
    .from('profiles')
    .select('id', { count: 'exact', head: true })
    .eq('role', 'developer')
    .eq('is_active', true);
  if (exceptId) query = query.neq('id', exceptId);
  const { count } = await query;
  return count ?? 0;
}

export async function GET() {
  const { session, admin, error } = await requireSession('owner');
  if (error) return error;
  void session;

  const { data, error: dbError } = await admin
    .from('profiles')
    .select('id, email, display_name, role, is_active, created_by, created_at')
    .order('created_at', { ascending: true });
  if (dbError) return fail(dbError.message, 500);

  return Response.json({ users: data });
}

export async function POST(request) {
  const { session, admin, error } = await requireSession('owner');
  if (error) return error;
  const actor = session.profile;

  const body = await request.json().catch(() => ({}));
  const email = String(body.email ?? '').trim().toLowerCase();
  const password = String(body.password ?? '');
  const displayName = String(body.display_name ?? '').trim() || null;
  const role = String(body.role ?? 'admin');

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return fail('A valid email is required.');
  }
  if (password.length < 8) {
    return fail('Password must be at least 8 characters.');
  }
  if (!ROLES.includes(role)) return fail('Unknown role.');
  // Owners may only create admins; developers may create any role.
  if (actor.role !== 'developer' && role !== 'admin') {
    return fail('Owners can only add admin accounts.', 403);
  }

  const { data: created, error: createError } =
    await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { role, display_name: displayName },
    });
  if (createError) return fail(createError.message, 400);

  // The DB trigger created the profile from metadata; make sure the
  // stored role/creator match exactly what was requested.
  const { data: profile, error: updateError } = await admin
    .from('profiles')
    .update({ role, display_name: displayName, created_by: actor.id })
    .eq('id', created.user.id)
    .select('id, email, display_name, role, is_active, created_by, created_at')
    .single();
  if (updateError) return fail(updateError.message, 500);

  return Response.json({ user: profile }, { status: 201 });
}

export async function PATCH(request) {
  const { session, admin, error } = await requireSession('owner');
  if (error) return error;
  const actor = session.profile;

  const body = await request.json().catch(() => ({}));
  const targetId = String(body.id ?? '');
  if (!targetId) return fail('Missing user id.');

  const target = await getProfile(admin, targetId);
  if (!target) return fail('User not found.', 404);

  const isSelf = target.id === actor.id;
  const nextRole = body.role !== undefined ? String(body.role) : target.role;
  const nextActive =
    body.is_active !== undefined ? Boolean(body.is_active) : target.is_active;
  const nextName =
    body.display_name !== undefined
      ? String(body.display_name).trim() || null
      : target.display_name;

  if (!ROLES.includes(nextRole)) return fail('Unknown role.');

  if (isSelf && (nextRole !== target.role || nextActive !== target.is_active)) {
    return fail('You cannot change your own role or active status.');
  }

  if (actor.role === 'owner') {
    // Owners manage admins only - never owners/developers, never promote.
    if (target.role !== 'admin' || nextRole !== 'admin') {
      return fail('Owners can only manage admin accounts.', 403);
    }
  }

  // Protect the last active developer.
  const losesDeveloper =
    target.role === 'developer' &&
    target.is_active &&
    (nextRole !== 'developer' || nextActive === false);
  if (losesDeveloper) {
    const others = await countActiveDevelopers(admin, target.id);
    if (others === 0) {
      return fail('There must always be at least one active developer.');
    }
  }
  void roleRank;

  const { data: updated, error: updateError } = await admin
    .from('profiles')
    .update({
      role: nextRole,
      is_active: nextActive,
      display_name: nextName,
      updated_at: new Date().toISOString(),
    })
    .eq('id', target.id)
    .select('id, email, display_name, role, is_active, created_by, created_at')
    .single();
  if (updateError) return fail(updateError.message, 500);

  return Response.json({ user: updated });
}

export async function DELETE(request) {
  const { session, admin, error } = await requireSession('developer');
  if (error) return error;
  const actor = session.profile;

  const body = await request.json().catch(() => ({}));
  const targetId = String(body.id ?? '');
  if (!targetId) return fail('Missing user id.');
  if (targetId === actor.id) return fail('You cannot delete your own account.');

  const target = await getProfile(admin, targetId);
  if (!target) return fail('User not found.', 404);

  if (target.role === 'developer' && target.is_active) {
    const others = await countActiveDevelopers(admin, target.id);
    if (others === 0) {
      return fail('There must always be at least one active developer.');
    }
  }

  const { error: deleteError } = await admin.auth.admin.deleteUser(targetId);
  if (deleteError) return fail(deleteError.message, 500);

  return Response.json({ ok: true });
}
