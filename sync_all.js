const fs = require('fs');
const path = require('path');

const srcRoot = path.join(__dirname, 'public', 'images', 'lucky_sushi_images', 'صور الأصناف');
const destRoot = path.join(__dirname, 'public', 'images');
const menuDataPath = path.join(__dirname, 'src', 'data', 'menuData.js');

let menuDataContent = fs.readFileSync(menuDataPath, 'utf8');

// جلب كل الملفات الحقيقية
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
const allFilesInfo = allSrcFiles.map(f => ({
    fullPath: f,
    ext: path.extname(f),
    name: path.basename(f, path.extname(f)).toLowerCase().replace(/['"()]/g, '').trim()
}));

// استخراج الأصناف من menuData.js
const regex = /id:\s*"([^"]+)",[\s\S]*?name_tr:\s*"([^"]+)",[\s\S]*?image:\s*"(?:[^"]*\/)?([^"]+)"/g;
let match;
let updatedCount = 0;

while ((match = regex.exec(menuDataContent)) !== null) {
    const id = match[1];
    const name_tr = match[2].toLowerCase().replace(/['"()]/g, '').trim();
    const currentImg = match[3];

    // بحث عن الصورة المناسبة
    let matchedFile = allFilesInfo.find(f => f.name.includes(name_tr) || name_tr.includes(f.name.split('-').pop().trim()));
    
    // استثناءات خاصة لتسهيل المطابقة
    if (!matchedFile) {
        if (name_tr.includes('steamed dumplig')) matchedFile = allFilesInfo.find(f => f.name.includes('steamed dumplig'));
        if (name_tr.includes('prown cracers')) matchedFile = allFilesInfo.find(f => f.name.includes('prown cracers'));
        if (name_tr.includes('shanghai mantı')) matchedFile = allFilesInfo.find(f => f.name.includes('shanghai mantı'));
        if (name_tr.includes('bento menü 1')) matchedFile = allFilesInfo.find(f => f.name.includes('bento 1'));
        if (name_tr.includes('bento menü 2')) matchedFile = allFilesInfo.find(f => f.name.includes('bento menü 2'));
        if (name_tr.includes('bento menü 3')) matchedFile = allFilesInfo.find(f => f.name.includes('bento menü 3'));
        if (name_tr.includes('vegan bento')) matchedFile = allFilesInfo.find(f => f.name.includes('bento menü vegan'));
        if (name_tr.includes('coca cola')) matchedFile = allFilesInfo.find(f => f.name.includes('coca cola (330 ml)'));
        if (name_tr.includes('coca cola zero')) matchedFile = allFilesInfo.find(f => f.name.includes('coca cola zero'));
        if (name_tr.includes('pepsi')) matchedFile = allFilesInfo.find(f => f.name.includes('pepsi cola (330)'));
        if (name_tr.includes('pepsi max')) matchedFile = allFilesInfo.find(f => f.name.includes('pepsi zero'));
        if (name_tr.includes('fanta')) matchedFile = allFilesInfo.find(f => f.name.includes('fanta'));
        if (name_tr.includes('yedigün')) matchedFile = allFilesInfo.find(f => f.name.includes('yedigün'));
        if (name_tr.includes('sprite')) matchedFile = allFilesInfo.find(f => f.name.includes('seven up')); // البديل
        if (name_tr.includes('fuse tea şeftali')) matchedFile = allFilesInfo.find(f => f.name.includes('fuse tea'));
        if (name_tr.includes('su')) matchedFile = allFilesInfo.find(f => f.name === 'içecek - su (330 ml)');
        if (name_tr.includes('soda')) matchedFile = allFilesInfo.find(f => f.name.includes('soda'));
        if (name_tr.includes('moğol usulü tavuk')) matchedFile = allFilesInfo.find(f => f.name.includes('moğol usulü tavuk'));
    }

    if (matchedFile) {
        const newImgName = id + matchedFile.ext;
        const destPath = path.join(destRoot, newImgName);
        fs.copyFileSync(matchedFile.fullPath, destPath);
        
        // تحديث menuData
        menuDataContent = menuDataContent.replace(`"${currentImg}"`, `"${newImgName}"`);
        updatedCount++;
    }
}

fs.writeFileSync(menuDataPath, menuDataContent);
console.log(`تم مطابقة ونسخ وتحديث ${updatedCount} صورة بنجاح.`);
