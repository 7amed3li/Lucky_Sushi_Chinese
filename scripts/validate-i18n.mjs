import { LOCALES } from '../src/i18n/config/locales.js';
import { menuItems } from '../src/data/menuData.js';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

async function loadProductTranslations(locales) {
  const products = {};
  for (const locale of locales) {
    products[locale.code] = JSON.parse(
      await readFile(join(process.cwd(), 'messages', locale.code, 'products.json'), 'utf8')
    );
  }
  return products;
}

async function validate() {
  console.log('=============================================');
  console.log('🌍 LUCKY SUSHI CHINESE — L10N VALIDATION 🌍');
  console.log('=============================================\n');

  let errors = 0;
  let warnings = 0;

  const activeLocales = LOCALES.filter(l => l.active);
  console.log(`Active Locales: ${activeLocales.map(l => l.code).join(', ')}\n`);

  // 1. VALIDATE UI TRANSLATIONS
  console.log('🔍 Validating UI Translations...');
  const uiTranslations = {};
  for (const locale of activeLocales) {
    uiTranslations[locale.code] = JSON.parse(
      await readFile(join(process.cwd(), 'messages', locale.code, 'ui.json'), 'utf8')
    );
  }
  const referenceKeys = Object.keys(uiTranslations[activeLocales[0].code]);
  for (const locale of activeLocales) {
    for (const key of referenceKeys) {
      if (!uiTranslations[locale.code][key]) {
        console.error(`❌ [UI Error] Missing translation for key '${key}' in locale '${locale.code}'`);
        errors++;
      }
    }
  }
  console.log('✅ UI Translations check complete.\n');

  // 2. VALIDATE PRODUCT TRANSLATIONS
  console.log('🔍 Validating Product Translations...');
  const productTrans = await loadProductTranslations(activeLocales);

  for (const locale of activeLocales) {
    if (!productTrans[locale.code]) {
      console.warn(`⚠️ [Product Warning] Missing content file for locale '${locale.code}'`);
      warnings++;
      continue;
    }

    for (const item of menuItems) {
      const trans = productTrans[locale.code][item.id];
      if (!trans) {
        console.error(`❌ [Product Error] Product '${item.id}' missing entirely in ${locale.code}-products.js`);
        errors++;
      } else {
        if (!trans.name) {
          console.error(`❌ [Product Error] Product '${item.id}' missing 'name' in ${locale.code}-products.js`);
          errors++;
        }
        if (!trans.description && item.category !== 'drinks' && item.category !== 'sauces') {
          console.warn(`⚠️ [Product Warning] Product '${item.id}' missing 'description' in ${locale.code}-products.js`);
          warnings++;
        }
      }
    }
  }
  console.log('✅ Product Translations check complete.\n');

  // 3. SUMMARY
  console.log('=============================================');
  console.log(`🏁 VALIDATION COMPLETE`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Warnings: ${warnings}`);
  console.log('=============================================');

  if (errors > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

validate().catch(err => {
  console.error('Fatal Error:', err);
  process.exit(1);
});
