const fs = require('fs');
const path = require('path');

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
const allFilesInfo = allSrcFiles.map(f => ({
    fullPath: f,
    ext: path.extname(f),
    name: path.basename(f, path.extname(f)).toLowerCase().replace(/['"()]/g, '').replace(/ - /g, ' ').trim()
}));

const regex = /id:\s*"([^"]+)",[\s\S]*?name_tr:\s*"([^"]+)",[\s\S]*?image:\s*"(?:[^"]*\/)?([^"]+)"/g;
let match;
let fixedCount = 0;

// دالة لحساب التشابه بين كلمتين (Fuzzy Search)
function levenshtein(a, b) {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
      }
    }
  }
  return matrix[b.length][a.length];
}

while ((match = regex.exec(menuDataContent)) !== null) {
    const id = match[1];
    const name_tr = match[2].toLowerCase().replace(/['"()]/g, '').replace(/ - /g, ' ').trim();
    const currentImg = match[3];

    // تحقق مما إذا كانت الصورة موجودة بالفعل
    const currentImgPath = path.join(destRoot, currentImg);
    if (!fs.existsSync(currentImgPath)) {
        // البحث عن أفضل تطابق بناءً على الاسم
        let bestMatch = null;
        let bestScore = Infinity;

        allFilesInfo.forEach(f => {
            const score = levenshtein(name_tr, f.name.split('-').pop().trim());
            const score2 = levenshtein(name_tr, f.name);
            const finalScore = Math.min(score, score2);
            
            if (finalScore < bestScore) {
                bestScore = finalScore;
                bestMatch = f;
            }
        });

        // إذا كان التطابق جيداً بما فيه الكفاية (فارق حروف قليل)
        if (bestMatch && bestScore <= 10) { // التسامح مع 10 حروف كحد أقصى للخطأ
            const newImgName = id + bestMatch.ext;
            fs.copyFileSync(bestMatch.fullPath, path.join(destRoot, newImgName));
            menuDataContent = menuDataContent.replace(`"${currentImg}"`, `"/images/${newImgName}"`);
            fixedCount++;
            console.log(`Matched: ${name_tr} -> ${bestMatch.name}`);
        }
    }
}

fs.writeFileSync(menuDataPath, menuDataContent);
console.log(`تم إصلاح ومطابقة ${fixedCount} صورة مفقودة إضافية!`);
