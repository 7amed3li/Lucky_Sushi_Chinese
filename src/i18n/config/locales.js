/**
 * Lucky Sushi Chinese — Locale Configuration
 * Single source of truth for all supported languages.
 * To add a new language: add a new entry here, create i18n/messages/<code>/ui.json
 * and i18n/messages/<code>/products.json, then set active: true when
 * translations are complete.
 */

export const LOCALES = [
  {
    code: 'tr',
    nativeName: 'Türkçe',
    displayName: 'TR',
    dir: 'ltr',
    flag: 'tr',
    active: true,
    ogLocale: 'tr_TR',
  },
  {
    code: 'en',
    nativeName: 'English',
    displayName: 'EN',
    dir: 'ltr',
    flag: 'en',
    active: true,
    ogLocale: 'en_US',
  },
  {
    code: 'ar',
    nativeName: 'العربية',
    displayName: 'AR',
    dir: 'rtl',
    flag: 'ar',
    active: true,
    ogLocale: 'ar_SA',
  },
  {
    code: 'ru',
    nativeName: 'Русский',
    displayName: 'RU',
    dir: 'ltr',
    flag: 'ru',
    active: true,
    ogLocale: 'ru_RU',
  },
  // ── Future languages ─────────────────────────────────────────
  // Set active: true and add translations to enable.
  {
    code: 'zh',
    nativeName: '中文',
    displayName: 'ZH',
    dir: 'ltr',
    flag: 'zh',
    active: true,
    ogLocale: 'zh_CN',
  },
  {
    code: 'fr',
    nativeName: 'Français',
    displayName: 'FR',
    dir: 'ltr',
    flag: 'fr',
    active: false,
    ogLocale: 'fr_FR',
  },
  {
    code: 'fa',
    nativeName: 'فارسی',
    displayName: 'FA',
    dir: 'rtl',
    flag: 'fa',
    active: false,
    ogLocale: 'fa_IR',
  },
  {
    code: 'de',
    nativeName: 'Deutsch',
    displayName: 'DE',
    dir: 'ltr',
    flag: 'de',
    active: false,
    ogLocale: 'de_DE',
  },
];

/** All locale codes (including inactive) */
export const ALL_LOCALE_CODES = LOCALES.map((l) => l.code);

/** Active locale codes — these are the ones shown in the UI */
export const ACTIVE_LOCALE_CODES = LOCALES.filter((l) => l.active).map((l) => l.code);

/** RTL locale codes */
export const RTL_LOCALES = LOCALES.filter((l) => l.dir === 'rtl').map((l) => l.code);

/** Default locale */
export const DEFAULT_LOCALE = 'tr';

/**
 * Get locale config object by code.
 * @param {string} code
 * @returns {object|null}
 */
export function getLocale(code) {
  return LOCALES.find((l) => l.code === code) || null;
}

/**
 * Returns true if the given locale code uses RTL direction.
 * @param {string} code
 * @returns {boolean}
 */
export function isRTL(code) {
  return RTL_LOCALES.includes(code);
}

/**
 * Returns the text direction for a locale.
 * @param {string} code
 * @returns {'ltr'|'rtl'}
 */
export function getDir(code) {
  return isRTL(code) ? 'rtl' : 'ltr';
}
