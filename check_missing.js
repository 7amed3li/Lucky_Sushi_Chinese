const fs = require('fs');

const menuDataContent = fs.readFileSync('./src/data/menuData.js', 'utf8');
const regex = /name_tr:\s*"([^"]+)",[\s\S]*?image:\s*"([^"]+)"/g;

let match;
const missing = [];

while ((match = regex.exec(menuDataContent)) !== null) {
  const name = match[1];
  let img = match[2];
  
  if (!img.startsWith('/')) img = '/' + img;
  
  if (!fs.existsSync('./public' + img)) {
    missing.push(name);
  }
}

console.log(`Missing ${missing.length} images.`);
console.log(missing.join('\n'));
