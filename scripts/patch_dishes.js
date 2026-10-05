const fs = require('fs');
const path = require('path');

// 1. Update DishCard.js
const cardPath = path.join(__dirname, '../src/components/DishCard.js');
let cardContent = fs.readFileSync(cardPath, 'utf8');

const oldBadgeMapRegex = /const BADGE_MAP = \{[\s\S]*?\};/;
const newBadgeMap = `const BADGE_MAP = {
  'bestseller':        { label_tr: 'Çok Satan', label_en: 'Best Seller', label_ar: 'الأكثر طلباً', label_ru: 'Хит продаж', label_zh: '热卖', bg: 'var(--color-brand-primary)', color: '#FFFFFF' },
  'chefs-pick':        { label_tr: 'Şef Seçimi', label_en: "Chef's Pick", label_ar: 'اختيار الشيف', label_ru: 'Выбор шефа', label_zh: '主厨推荐', bg: 'var(--color-accent)', color: '#FFFFFF' },
  'beginner-friendly': { label_tr: 'Yeni Başlayan', label_en: 'Beginner', label_ar: 'للمبتدئين', label_ru: 'Для новичков', label_zh: '新手', bg: 'var(--color-surface-secondary)', color: 'var(--color-text-primary)' },
  'cooked':            { label_tr: 'Pişmiş', label_en: 'Cooked', label_ar: 'مطهو', label_ru: 'Горячее', label_zh: '熟食', bg: 'var(--color-brand-primary)', color: '#FFFFFF' },
  'spicy':             { label_tr: 'Acılı', label_en: 'Spicy', label_ar: 'حار', label_ru: 'Острое', label_zh: '辣', bg: 'var(--color-accent)', color: '#FFFFFF' },
  'vegetarian':        { label_tr: 'Vejetaryen', label_en: 'Vegetarian', label_ar: 'نباتي', label_ru: 'Вегетарианское', label_zh: '素食', bg: 'var(--color-brand-primary)', color: '#FFFFFF' },
};`;

cardContent = cardContent.replace(oldBadgeMapRegex, newBadgeMap);
fs.writeFileSync(cardPath, cardContent, 'utf8');
console.log('Successfully updated DishCard.js with Russian badge support.');

// 2. Update DishModal.js
const modalPath = path.join(__dirname, '../src/components/DishModal.js');
let modalContent = fs.readFileSync(modalPath, 'utf8');

const oldAllergenMapRegex = /const ALLERGEN_LABELS = \{[\s\S]*?\};/;
const newAllergenMap = `const ALLERGEN_LABELS = {
  gluten:    { tr: 'Glüten', en: 'Gluten', ar: 'جلوتين', ru: 'Глютен', zh: '麸质' },
  fish:      { tr: 'Balık', en: 'Fish', ar: 'سمك', ru: 'Рыба', zh: '鱼' },
  shellfish: { tr: 'Kabuklu', en: 'Shellfish', ar: 'محار', ru: 'Морепродукты', zh: '贝壳' },
  dairy:     { tr: 'Süt', en: 'Dairy', ar: 'ألبان', ru: 'Молочные продукты', zh: '乳制品' },
  egg:       { tr: 'Yumurta', en: 'Egg', ar: 'بيض', ru: 'Яйца', zh: '蛋' },
  soy:       { tr: 'Soya', en: 'Soy', ar: 'صويا', ru: 'Соя', zh: '大豆' },
  sesame:    { tr: 'Susam', en: 'Sesame', ar: 'سمسم', ru: 'Кунжут', zh: '芝麻' },
  peanuts:   { tr: 'Fıstık', en: 'Peanuts', ar: 'فول سوداني', ru: 'Арахис', zh: '花生' },
  nuts:      { tr: 'Kuruyemiş', en: 'Nuts', ar: 'مكسرات', ru: 'Орехи', zh: '坚果' },
};`;

const oldTagMapRegex = /const TAG_LABELS = \{[\s\S]*?\};/;
const newTagMap = `const TAG_LABELS = {
  raw:         { tr: 'Çiğ', en: 'Raw', ar: 'نيء', ru: 'Сырое', zh: '生食' },
  cooked:      { tr: 'Pişmiş', en: 'Cooked', ar: 'مطهو', ru: 'Горячее', zh: '熟食' },
  spicy:       { tr: 'Acılı', en: 'Spicy', ar: 'حار', ru: 'Острое', zh: '辣' },
  vegan:       { tr: 'Vegan', en: 'Vegan', ar: 'نباتي صرف', ru: 'Веганское', zh: '纯素' },
  vegetarian:  { tr: 'Vejetaryen', en: 'Vegetarian', ar: 'نباتي', ru: 'Вегетарианское', zh: '素食' },
  sharing:     { tr: 'Paylaşım', en: 'Sharing', ar: 'للمشاركة', ru: 'На компанию', zh: '分享' },
};`;

modalContent = modalContent.replace(oldAllergenMapRegex, newAllergenMap);
modalContent = modalContent.replace(oldTagMapRegex, newTagMap);

const oldLabelsRegex = /const addLabel = \{[\s\S]*?const allergensLabel = \{[\s\S]*?\};/;
const newLabels = `const addLabel = {
    tr: 'Sepete Ekle',
    en: 'Add to Cart',
    ar: 'أضف للسلة',
    ru: 'В корзину',
    zh: '加入购物车',
  };

  const ingredientsLabel = {
    tr: 'İçindekiler',
    en: 'Ingredients',
    ar: 'المكونات',
    ru: 'Состав',
    zh: '配料',
  };

  const allergensLabel = {
    tr: 'Alerjenler',
    en: 'Allergens',
    ar: 'مسببات الحساسية',
    ru: 'Аллергены',
    zh: '过敏原',
  };`;

modalContent = modalContent.replace(oldLabelsRegex, newLabels);
fs.writeFileSync(modalPath, modalContent, 'utf8');
console.log('Successfully updated DishModal.js with Russian allergen & tag support.');
