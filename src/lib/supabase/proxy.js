import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/**
 * Keeps the Supabase session alive for /admin and /api/admin.
 *
 * Server Components cannot write cookies, so once the access token expired
 * (every hour) the panel would throw the user back to the login page even
 * though the refresh token was still valid. This runs in the proxy, refreshes
 * the token when needed, and forwards the new cookies both to the rest of the
 * request and to the browser.
 */
export async function refreshAdminSession(request) {
  let response = NextResponse.next({ request });

  const hasAuthCookie = request.cookies
    .getAll()
    .some((cookie) => cookie.name.startsWith('sb-'));
  if (supabaseUrl && supabaseKey && hasAuthCookie) {
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });

    try {
      // Verifies locally; only hits the network when a refresh is required.
      await supabase.auth.getClaims();
    } catch {
      // A failed refresh must never break the request - the page will
      // simply treat the visitor as signed out.
    }
  }

  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}
