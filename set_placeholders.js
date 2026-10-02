const fs = require('fs');

let data = fs.readFileSync('./src/data/menuData.js', 'utf8');
const regex = /image:\s*"([^"\n]+)"/g;
let match;
let count = 0;

while ((match = regex.exec(data)) !== null) {
  let img = match[1];
  if (!img.startsWith('/')) img = '/' + img;
  if (!fs.existsSync('./public' + img)) {
    // استبدال الصورة المفقودة بالشعار ليكون صورة افتراضية
    data = data.replace(match[0], 'image: "/logo.png"');
    count++;
  }
}

fs.writeFileSync('./src/data/menuData.js', data);
console.log(`Replaced ${count} missing images with /logo.png`);
