import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Service-role Supabase client. SERVER ONLY - never import this from
 * a Client Component. It bypasses Row Level Security, so every caller
 * must verify the signed-in user's panel role first (see adminAuth.js).
 *
 * Returns null when SUPABASE_SERVICE_ROLE_KEY is not configured.
 */
export function createSupabaseAdminClient() {
  if (!supabaseUrl || !serviceRoleKey) return null;

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export default createSupabaseAdminClient;
