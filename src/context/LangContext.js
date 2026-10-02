'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const LangContext = createContext(null);

const SUPPORTED_LANGS = ['tr', 'en', 'ar', 'zh'];

export function LangProvider({ children, defaultLang = 'tr' }) {
  const [lang, setLang] = useState(defaultLang);

  const switchLang = useCallback((code) => {
    if (SUPPORTED_LANGS.includes(code)) setLang(code);
  }, []);

  /** t(item, 'name') → item.name_tr | item.name_en etc. */
  const t = useCallback(
    (obj, field) => obj?.[`${field}_${lang}`] ?? obj?.[`${field}_en`] ?? '',
    [lang]
  );

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <LangContext.Provider value={{ lang, switchLang, t, dir, SUPPORTED_LANGS }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside LangProvider');
  return ctx;
}
