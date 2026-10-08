import { defineRouting } from 'next-intl/routing';
import { ACTIVE_LOCALE_CODES, DEFAULT_LOCALE } from '@/i18n/config/locales';

export const routing = defineRouting({
  locales: ACTIVE_LOCALE_CODES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'as-needed',
});
