import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

const messageCache = new Map();

function deepMerge(...objects) {
  return objects.reduce((result, source) => {
    for (const [key, value] of Object.entries(source ?? {})) {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        result[key] = deepMerge(result[key], value);
      } else if (value !== undefined) {
        result[key] = value;
      }
    }
    return result;
  }, {});
}

async function loadMessages(locale) {
  if (!messageCache.has(locale)) {
    const [tr, en, current] = await Promise.all(
      ['tr', 'en', locale].map(async (code) => {
        const [ui, products] = await Promise.all([
          import(`./messages/${code}/ui.json`),
          import(`./messages/${code}/products.json`),
        ]);
        return { ui: ui.default, products: products.default };
      })
    );
    messageCache.set(locale, deepMerge(tr, en, current));
  }
  return messageCache.get(locale);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale = routing.locales.includes(requestedLocale) ? requestedLocale : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale),
  };
});
