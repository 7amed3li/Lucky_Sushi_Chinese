const fs = require('fs');
let data = fs.readFileSync('./src/data/menuData.js', 'utf8');
data = data.replace(/image:\s*"\/?logo\.png"/g, 'image: null');
fs.writeFileSync('./src/data/menuData.js', data);
console.log('Removed logo.png fallbacks');
