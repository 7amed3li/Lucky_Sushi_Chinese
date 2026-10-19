import { ACTIVE_LOCALE_CODES, DEFAULT_LOCALE } from '@/i18n/config/locales';

export default function sitemap() {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.luckysushichinese.com.tr').replace(/\/$/, '');
  
  const pages = [
    { path: '', changeFrequency: 'weekly', priority: 1.0 },
    { path: '/menu', changeFrequency: 'weekly', priority: 0.95 },
    { path: '/branches', changeFrequency: 'monthly', priority: 0.85 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/tasarim-gelistirme', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/kvkk', changeFrequency: 'yearly', priority: 0.4 },
  ];

  const getLocalizedUrl = (pagePath, locale) => {
    if (locale === DEFAULT_LOCALE) {
      return `${baseUrl}${pagePath || '/'}`;
    }
    return `${baseUrl}/${locale}${pagePath}`;
  };

  const sitemapEntries = [];

  pages.forEach((page) => {
    const alternatesLanguages = {};
    ACTIVE_LOCALE_CODES.forEach((locale) => {
      alternatesLanguages[locale] = getLocalizedUrl(page.path, locale);
    });
    alternatesLanguages['x-default'] = getLocalizedUrl(page.path, DEFAULT_LOCALE);

    ACTIVE_LOCALE_CODES.forEach((locale) => {
      sitemapEntries.push({
        url: getLocalizedUrl(page.path, locale),
        lastModified: new Date('2026-10-19T00:00:00.000Z'),
        changeFrequency: page.changeFrequency,
        priority: locale === DEFAULT_LOCALE ? page.priority : Math.max(0.3, Number((page.priority - 0.05).toFixed(2))),
        alternates: {
          languages: alternatesLanguages,
        },
      });
    });
  });

  return sitemapEntries;
}
