const fs = require('fs');
const path = require('path');

const map = {
  "set-lucky": "Sushi Set Menüler - Lucky Set.png",
  "set-chicken-lovers": "Sushi Set Menüler - Chicken Lovers (40 Pcs).png",
  "set-lucky-prestige": "Sushi Set Menüler - Lucky Prestige Roll Set (56 Pcs).jpeg",
  "set-california-sushi": "Sushi Set Menüler - California Sushi Set (16 Pcs).jpeg",
  "set-philadelphia-sushi": "Sushi Set Menüler - Philadelphia Sushi Set (16 Pcs).jpeg",
  "set-sakura-maki": "Sushi Set Menüler - Sakura Maki Set (40 Pcs).png",
  "sr-grabi": "Special Roll - Grabi Roll.jpeg",
  "sr-chicken-california": "Special Roll - Chicken California Roll.jpeg",
  "sr-wakame": "Special Roll - Wakame Roll.jpeg",
  "sr-osaka": "Special Roll - Osaka Roll.jpeg",
  "cr-calamari": "Crunchy Roll - Crispy Crunchy Calamar (8 Pcs).jpg"
};

const srcRoot = path.join(__dirname, 'public', 'images', 'lucky_sushi_images', 'صور الأصناف');
const destRoot = path.join(__dirname, 'public', 'images');
const menuDataPath = path.join(__dirname, 'src', 'data', 'menuData.js');

let menuDataContent = fs.readFileSync(menuDataPath, 'utf8');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  });
  return arrayOfFiles;
}

const allSrcFiles = getAllFiles(srcRoot);

let copied = 0;
for (const [id, originalName] of Object.entries(map)) {
  const sourceFile = allSrcFiles.find(f => path.basename(f) === originalName);
  if (sourceFile) {
    const ext = path.extname(sourceFile);
    const destName = id + ext;
    const destPath = path.join(destRoot, destName);
    
    fs.copyFileSync(sourceFile, destPath);
    console.log(`Copied: ${originalName} -> ${destName}`);
    
    // Update menuData.js
    const regex = new RegExp(`id:\\s*"${id}",[\\s\\S]*?image:\\s*"([^"]+)"`);
    const match = regex.exec(menuDataContent);
    if (match) {
        menuDataContent = menuDataContent.replace(match[1], `/images/${destName}`);
    }
    copied++;
  } else {
    console.log(`❌ Not found: ${originalName}`);
  }
}

// Any remaining missing images get fallback logo.png
const imgRegex = /image:\s*"([^"\n]+)"/g;
let matchImg;
let placeholders = 0;
while ((matchImg = imgRegex.exec(menuDataContent)) !== null) {
  let img = matchImg[1];
  if (!img.startsWith('/')) img = '/' + img;
  if (!fs.existsSync(path.join(__dirname, 'public', img))) {
    menuDataContent = menuDataContent.replace(matchImg[0], 'image: "/logo.png"');
    placeholders++;
  }
}

fs.writeFileSync(menuDataPath, menuDataContent);
console.log(`\n✅ Finished! Copied ${copied} requested images.`);
console.log(`✅ Set ${placeholders} remaining completely missing images to fallback logo.png`);
