import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { uiTranslations } from '@/data/translations';
import { ACTIVE_LOCALE_CODES } from '@/i18n/config/locales';

const legacyMessages = Object.fromEntries(
  ACTIVE_LOCALE_CODES.map((locale) => [
    locale,
    {
      ui: Object.fromEntries(
        Object.entries(uiTranslations).map(([key, values]) => [key, values[locale] ?? values.en ?? values.tr ?? ''])
      ),
    },
  ])
);

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale = routing.locales.includes(requestedLocale) ? requestedLocale : routing.defaultLocale;

  return {
    locale,
    messages: legacyMessages[locale],
  };
});
