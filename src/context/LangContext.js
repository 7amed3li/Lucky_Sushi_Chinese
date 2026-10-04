'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { uiTranslations } from '@/data/translations';
import { ACTIVE_LOCALE_CODES, getDir, DEFAULT_LOCALE, getLocale } from '@/i18n/config/locales';
import { ruProducts } from '@/i18n/content/ru-products';
import { trProducts } from '@/i18n/content/tr-products';
import { enProducts } from '@/i18n/content/en-products';
import { arProducts } from '@/i18n/content/ar-products';
import { zhProducts } from '@/i18n/content/zh-products';

const LangContext = createContext(null);

// Registry of externalized translations
const PRODUCT_TRANSLATIONS = {
  ru: ruProducts,
  tr: trProducts,
  en: enProducts,
  ar: arProducts,
  zh: zhProducts,
};

export function LangProvider({ children, defaultLang = DEFAULT_LOCALE }) {
  const [lang, setLangState] = useState(defaultLang);
  const [dir, setDirState] = useState(getDir(defaultLang));

  // Initialize lang from localStorage or browser preferences
  useEffect(() => {
    const savedLang = localStorage.getItem('lucky_lang');
    if (savedLang && ACTIVE_LOCALE_CODES.includes(savedLang)) {
      setLangState(savedLang);
      setDirState(getDir(savedLang));
      document.documentElement.lang = savedLang;
      document.documentElement.dir = getDir(savedLang);
    } else {
      const browserLang = navigator.language.split('-')[0];
      if (ACTIVE_LOCALE_CODES.includes(browserLang)) {
        setLangState(browserLang);
        setDirState(getDir(browserLang));
        document.documentElement.lang = browserLang;
        document.documentElement.dir = getDir(browserLang);
      }
    }
  }, []);

  const switchLang = useCallback((code) => {
    if (ACTIVE_LOCALE_CODES.includes(code)) {
      setLangState(code);
      setDirState(getDir(code));
      localStorage.setItem('lucky_lang', code);
      document.documentElement.lang = code;
      document.documentElement.dir = getDir(code);
    }
  }, []);

  /**
   * Translates a product field using the robust fallback system.
   * t(item, 'name') checks:
   * 1. PRODUCT_TRANSLATIONS[lang][id][field]
   * 2. item[`${field}_${lang}`] (inline)
   * 3. item[`${field}_en`] (fallback)
   * 4. item[`${field}_tr`] (fallback)
   */
  const t = useCallback(
    (item, field) => {
      if (!item) return '';

      // 1. External registry check
      if (PRODUCT_TRANSLATIONS[lang]?.[item.id]?.[field]) {
        return PRODUCT_TRANSLATIONS[lang][item.id][field];
      }

      // 2. Inline fields check
      const inlineKey = `${field}_${lang}`;
      if (item[inlineKey]) {
        return item[inlineKey];
      }

      // 3. Fallbacks
      return item[`${field}_en`] ?? item[`${field}_tr`] ?? '';
    },
    [lang]
  );

  /**
   * Translates UI strings from the translations file.
   * tUI('nav_home') -> 'Ana Sayfa'
   */
  const tUI = useCallback(
    (key) => uiTranslations[key]?.[lang] ?? uiTranslations[key]?.en ?? uiTranslations[key]?.tr ?? '',
    [lang]
  );

  return (
    <LangContext.Provider value={{
      lang,
      switchLang,
      t,
      tUI,
      dir,
      SUPPORTED_LANGS: ACTIVE_LOCALE_CODES, // Keep name for backwards compatibility temporarily
      getLocale
    }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside LangProvider');
  return ctx;
}
