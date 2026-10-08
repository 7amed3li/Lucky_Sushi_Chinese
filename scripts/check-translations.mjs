import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ACTIVE_LOCALE_CODES } from '../src/i18n/config/locales.js';

const root = process.cwd();

async function readMessages(locale, name) {
  return JSON.parse(await readFile(join(root, 'messages', locale, `${name}.json`), 'utf8'));
}

function flatten(value, prefix = '') {
  return Object.entries(value).reduce((result, [key, entry]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (entry && typeof entry === 'object' && !Array.isArray(entry)) {
      Object.assign(result, flatten(entry, path));
    } else {
      result[path] = entry;
    }
    return result;
  }, {});
}

const referenceUi = flatten(await readMessages('tr', 'ui'));
let hasUiMissing = false;

for (const locale of ACTIVE_LOCALE_CODES) {
  const ui = flatten(await readMessages(locale, 'ui'));
  const missing = Object.keys(referenceUi).filter((key) => !(key in ui));
  const extra = Object.keys(ui).filter((key) => !(key in referenceUi));
  const empty = Object.keys(ui).filter((key) => ui[key] === '' || ui[key] === null || ui[key] === undefined);
  if (missing.length > 0) hasUiMissing = true;

  const referenceProducts = await readMessages('tr', 'products');
  const products = await readMessages(locale, 'products');
  const missingProducts = Object.keys(referenceProducts).filter((id) => !(id in products));

  console.log(`${locale}:`);
  console.log(`  missing UI keys (${missing.length}): ${missing.join(', ') || 'none'}`);
  console.log(`  extra UI keys (${extra.length}): ${extra.join(', ') || 'none'}`);
  console.log(`  empty UI values (${empty.length}): ${empty.join(', ') || 'none'}`);
  console.log(`  missing products: ${missingProducts.length}`);
}

process.exitCode = hasUiMissing ? 1 : 0;
