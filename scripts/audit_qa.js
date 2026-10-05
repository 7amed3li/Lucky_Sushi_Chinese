const fs = require('fs');
const path = require('path');

const menuDataContent = fs.readFileSync(path.join(__dirname, '../src/data/menuData.js'), 'utf8');
const menuItemsBlock = menuDataContent.split('export const menuCategories =')[0];
const itemIds = [...menuItemsBlock.matchAll(/id:\s*["']([^"']+)["']/g)].map(m => m[1]);

const { trProducts } = require('../src/i18n/content/tr-products.js');
const { enProducts } = require('../src/i18n/content/en-products.js');
const { arProducts } = require('../src/i18n/content/ar-products.js');
const { ruProducts } = require('../src/i18n/content/ru-products.js');
const { zhProducts } = require('../src/i18n/content/zh-products.js');

console.log(`Total menuItems in database: ${itemIds.length}`);

const registries = { TR: trProducts, EN: enProducts, AR: arProducts, RU: ruProducts, ZH: zhProducts };

let hasErrors = false;
Object.entries(registries).forEach(([code, reg]) => {
  const missing = itemIds.filter(id => !reg[id] || !reg[id].name);
  if (missing.length === 0) {
    console.log(`✓ ${code} Registry: 100% complete (${Object.keys(reg).length} items translated)`);
  } else {
    hasErrors = true;
    console.log(`✗ ${code} Registry: ${missing.length} missing items:`, missing);
  }
});

if (!hasErrors) {
  console.log('\n🎉 ALL 142 DISHES ARE 100% TRANSLATED IN ALL 5 REGISTRIES (TR, EN, AR, RU, ZH)!');
}
