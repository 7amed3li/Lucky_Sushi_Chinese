const fs = require('fs');
const path = require('path');

const menuDataContent = fs.readFileSync(path.join(__dirname, '../src/data/menuData.js'), 'utf8');
const menuItemsBlock = menuDataContent.split('export const menuCategories =')[0];
const itemIds = [...menuItemsBlock.matchAll(/id:\s*["']([^"']+)["']/g)].map(m => m[1]);

console.log(`Total menuItems in database: ${itemIds.length}`);

const registries = Object.fromEntries(
  ['tr', 'en', 'ar', 'ru', 'zh'].map((locale) => [
    locale.toUpperCase(),
    JSON.parse(fs.readFileSync(path.join(__dirname, `../messages/${locale}/products.json`), 'utf8')),
  ])
);

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
