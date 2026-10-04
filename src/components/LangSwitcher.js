'use client';

import { useLang } from '@/context/LangContext';

const LANG_LABELS = {
  tr: 'TR',
  en: 'EN',
  ar: 'AR',
  ru: 'RU',
  fa: 'FA',
  fr: 'FR',
  zh: 'ZH',
};

export default function LangSwitcher() {
  const { lang, switchLang, SUPPORTED_LANGS } = useLang();

  return (
    <div className="lang-switcher" role="group" aria-label="Language selector">
      {SUPPORTED_LANGS.map((code) => (
        <button
          key={code}
          id={`lang-btn-${code}`}
          className={`lang-btn${lang === code ? ' lang-btn--active' : ''}`}
          onClick={() => switchLang(code)}
          aria-pressed={lang === code}
          aria-label={`Switch to ${code.toUpperCase()}`}
        >
          {LANG_LABELS[code]}
        </button>
      ))}
    </div>
  );
}
