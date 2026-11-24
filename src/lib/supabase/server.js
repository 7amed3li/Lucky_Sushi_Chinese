import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/**
 * Server-side Supabase client bound to the request cookies.
 * Used by Server Components and Route Handlers to read the
 * signed-in user's session. Returns null when Supabase env
 * vars are not configured.
 */
export async function createSupabaseServerClient() {
  if (!supabaseUrl || !supabaseKey) return null;

  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Called from a Server Component where cookies are read-only.
          // The session is refreshed by the browser client instead;
          // safe to ignore.
        }
      },
    },
  });
}

export default createSupabaseServerClient;
