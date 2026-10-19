import { ACTIVE_LOCALE_CODES, DEFAULT_LOCALE } from '@/i18n/config/locales';

export default function sitemap() {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://lucky-sushi-chinese.com.tr').replace(/\/$/, '');
  
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

  return pages.map((page) => {
    const alternatesLanguages = {};
    ACTIVE_LOCALE_CODES.forEach((locale) => {
      alternatesLanguages[locale] = getLocalizedUrl(page.path, locale);
    });

    return {
      url: getLocalizedUrl(page.path, DEFAULT_LOCALE),
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: alternatesLanguages,
      },
    };
  });
}
