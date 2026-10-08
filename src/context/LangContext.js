'use client';

import { useCallback } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { ACTIVE_LOCALE_CODES, getDir, getLocale } from '@/i18n/config/locales';

export function useLang() {
  const lang = useLocale();
  const tUIMessage = useTranslations('ui');
  const tProductMessage = useTranslations('products');
  const pathname = usePathname();
  const router = useRouter();
  const dir = getDir(lang);

  const t = useCallback((item, field) => {
    if (!item) return '';
    const productKey = `${item.id}.${field}`;
    if (tProductMessage.has(productKey)) {
      return tProductMessage.raw(productKey);
    }
    return item[`${field}_${lang}`] ?? item[`${field}_en`] ?? item[`${field}_tr`] ?? '';
  }, [lang, tProductMessage]);

  const tUI = useCallback((key, values) => tUIMessage(key, values), [tUIMessage]);

  const switchLang = useCallback((code) => {
    if (!ACTIVE_LOCALE_CODES.includes(code)) return;
    const suffix = typeof window === 'undefined'
      ? ''
      : `${window.location.search}${window.location.hash}`;
    router.replace(`${pathname}${suffix}`, { locale: code });
  }, [pathname, router]);

  return {
    lang,
    dir,
    switchLang,
    t,
    tUI,
    SUPPORTED_LANGS: ACTIVE_LOCALE_CODES,
    getLocale,
  };
}
