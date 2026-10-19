import { routing } from '@/i18n/routing';

export const BASE_SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.luckysushichinese.com.tr').replace(/\/$/, '');

/**
 * Generates canonical and alternate URLs for a given route and locale.
 *
 * Rules:
 * - Homepage ('') default locale -> `${BASE_SITE_URL}/`
 * - Homepage ('') other locale -> `${BASE_SITE_URL}/${locale}`
 * - Subpage (e.g. '/menu') default locale -> `${BASE_SITE_URL}${pathname}`
 * - Subpage (e.g. '/menu') other locale -> `${BASE_SITE_URL}/${locale}${pathname}`
 * - x-default always points to the default locale URL.
 */
export function getRouteCanonicalAndAlternates(pathname = '', locale = routing.defaultLocale) {
  const cleanPath = pathname ? (pathname.startsWith('/') ? pathname : `/${pathname}`) : '';

  const getUrl = (lang) => {
    if (!cleanPath) {
      return lang === routing.defaultLocale ? `${BASE_SITE_URL}/` : `${BASE_SITE_URL}/${lang}`;
    }
    return lang === routing.defaultLocale ? `${BASE_SITE_URL}${cleanPath}` : `${BASE_SITE_URL}/${lang}${cleanPath}`;
  };

  const canonical = getUrl(locale);
  const languages = Object.fromEntries(
    routing.locales.map((code) => [code, getUrl(code)])
  );
  languages['x-default'] = getUrl(routing.defaultLocale);

  return {
    canonical,
    languages,
  };
}
