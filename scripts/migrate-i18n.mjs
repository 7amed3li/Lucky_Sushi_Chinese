import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const localesModule = await import(pathToFileURL(join(root, 'src/i18n/config/locales.js')));
const translationsModule = await import(pathToFileURL(join(root, 'src/data/translations.js')));
const menuSource = await readFile(join(root, 'src/data/menuData.js'), 'utf8');

const locales = localesModule.ACTIVE_LOCALE_CODES;
const translations = translationsModule.uiTranslations;
const menuItems = [...menuSource.matchAll(/\r?\n  \{\r?\n    id: "([^"]+)",([\s\S]*?)\r?\n  \},/g)].map(([, id, body]) => {
  const fields = { id };
  for (const [, field, value] of body.matchAll(/((?:name|description)_(?:tr|en|ar|ru|zh)):\s*"([^"]*)"/g)) {
    fields[field] = value;
  }
  return fields;
});
const productModules = Object.fromEntries(
  await Promise.all(locales.map(async (locale) => {
    const productModule = await import(pathToFileURL(join(root, `src/i18n/content/${locale}-products.js`)));
    const products = productModule[`${locale}Products`] ?? productModule.default ?? {};
    return [locale, products];
  }))
);

const messagesRoot = join(root, 'messages');
const migratedCharacters = [];

function inspectText(value, source) {
  if (typeof value !== 'string' || !/[{}<>%]/.test(value)) return value;
  migratedCharacters.push({ source, value });
  return value.replaceAll('{', "'{'").replaceAll('}', "'}'");
}

function deepMerge(...objects) {
  return objects.reduce((result, source) => {
    for (const [key, value] of Object.entries(source ?? {})) {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        result[key] = deepMerge(result[key], value);
      } else if (value !== undefined && value !== null && value !== '') {
        result[key] = value;
      }
    }
    return result;
  }, {});
}

const uiByLocale = Object.fromEntries(
  locales.map((locale) => [
    locale,
    Object.fromEntries(
      Object.entries(translations).map(([key, values]) => [
        key,
        inspectText(values[locale] ?? values.en ?? values.tr ?? '', `ui.${key}.${locale}`),
      ])
    ),
  ])
);

const productsByLocale = Object.fromEntries(
  locales.map((locale) => {
    const products = {};
    for (const item of menuItems) {
      const inline = Object.fromEntries(
        Object.entries(item)
          .filter(([key, value]) => /^(name|description)_(tr|en|ar|ru|zh)$/.test(key) && value)
          .map(([key, value]) => [key.split('_')[0], value])
      );
      const external = productModules[locale][item.id] ?? {};
      const product = { ...inline, ...external };
      if (Object.keys(product).length > 0) products[item.id] = product;
    }
    for (const [id, product] of Object.entries(productModules[locale])) {
      products[id] = { ...products[id], ...product };
    }
    return [locale, products];
  })
);

for (const locale of locales) {
  const directory = join(messagesRoot, locale);
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, 'ui.json'), `${JSON.stringify(uiByLocale[locale], null, 2)}\n`);
  await writeFile(join(directory, 'products.json'), `${JSON.stringify(productsByLocale[locale], null, 2)}\n`);
}

for (const [key, values] of Object.entries(translations)) {
  for (const locale of locales) {
    const generated = uiByLocale[locale][key];
    const expected = values[locale] ?? values.en ?? values.tr ?? '';
    if (generated !== expected) {
      throw new Error(`UI parity failed for ${key}.${locale}`);
    }
  }
}

const productIds = new Set(menuItems.map((item) => item.id));
for (const locale of locales) {
  for (const id of Object.keys(productsByLocale[locale])) {
    if (id.includes('.')) throw new Error(`Product id contains a dot: ${id}`);
  }
}

console.log(`Generated ${locales.length} UI files and ${locales.length} product files.`);
console.log(`UI parity: passed (${Object.keys(translations).length * locales.length} key/language pairs).`);
console.log(`Product ids checked: ${productIds.size}; ids with dots: 0.`);
if (migratedCharacters.length > 0) {
  console.log('Characters requiring review:', JSON.stringify(migratedCharacters));
} else {
  console.log('UI strings requiring ICU/HTML conversion: 0.');
}
