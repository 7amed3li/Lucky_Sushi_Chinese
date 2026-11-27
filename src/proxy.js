import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { refreshAdminSession } from '@/lib/supabase/proxy';

const intlProxy = createMiddleware(routing);

export default function proxy(request) {
  const { pathname } = request.nextUrl;

  // Admin panel: not a language route - just keep the session fresh.
  if (
    pathname === '/admin' ||
    pathname.startsWith('/admin/') ||
    pathname.startsWith('/api/admin')
  ) {
    return refreshAdminSession(request);
  }

  return intlProxy(request);
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/((?!api|admin|_next|_vercel|.*\\..*).*)',
  ],
};
