const fs = require('fs');
const path = require('path');

const srcRoot = path.join(__dirname, 'public', 'images', 'lucky_sushi_images', 'صور الأصناف');
const destRoot = path.join(__dirname, 'public', 'images');

// اقرأ menuData.js لنستخرج منه mapping تلقائي
const menuDataPath = path.join(__dirname, 'src', 'data', 'menuData.js');
let menuDataContent = fs.readFileSync(menuDataPath, 'utf8');

// استخراج المسارات واسم الصنف (التركي) 
const items = [];
const regex = /name_tr:\s*"([^"]+)",[\s\S]*?image:\s*"(?:[^"]*\/)?([^"]+)"/g;
let match;
while ((match = regex.exec(menuDataContent)) !== null) {
    items.push({
        name_tr: match[1].toLowerCase().replace(/['"()]/g, '').trim(),
        target_image: match[2]
    });
}

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

allSrcFiles.forEach(srcPath => {
    const filename = path.basename(srcPath);
    const parsedName = path.parse(filename).name.toLowerCase().replace(/['"()]/g, '').trim();
    
    // محاولة مطابقة اسم الملف مع اسم الصنف
    let matchedItem = items.find(item => parsedName.includes(item.name_tr) || item.name_tr.includes(parsedName.split('-').pop().trim()));
    
    // بعض المطابقات المخصصة للحالات الشاذة
    if (!matchedItem) {
        if (parsedName.includes('steamed dumplig')) matchedItem = items.find(i => i.target_image === 'steamed-dumpling.jpg');
        if (parsedName.includes('shanghai mantı')) matchedItem = items.find(i => i.target_image === 'shanghai-dumplings.jpg');
        if (parsedName.includes('çin böreği')) matchedItem = items.find(i => i.target_image === 'spring-rolls.jpg');
        if (parsedName.includes('prown cracers')) matchedItem = items.find(i => i.target_image === 'prawn-crackers.jpg');
        if (parsedName.includes('tempura karides')) matchedItem = items.find(i => i.target_image === 'shrimp-tempura.jpg');
    }

    if (matchedItem) {
        const ext = path.extname(filename);
        let targetName = matchedItem.target_image;
        if (!targetName.endsWith(ext)) {
            // نأخذ الامتداد الأصلي للصورة
            targetName = targetName.replace(/\.[^/.]+$/, "") + ext;
            // تحديث menuData.js بالامتداد الجديد
            menuDataContent = menuDataContent.replace(`"${matchedItem.target_image}"`, `"${targetName}"`);
        }
        
        const destPath = path.join(destRoot, targetName);
        fs.copyFileSync(srcPath, destPath);
        copied++;
    }
});

// حفظ تحديثات الامتدادات
fs.writeFileSync(menuDataPath, menuDataContent);

console.log(`تم نسخ ${copied} صورة بنجاح من أصل ${allSrcFiles.length} ملف موجود.`);
