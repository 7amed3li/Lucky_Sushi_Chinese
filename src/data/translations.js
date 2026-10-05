/**
 * Lucky Sushi Chinese — Complete UI Translations
 * Supports: Turkish (tr) · English (en) · Arabic (ar) · Russian (ru)
 *
 * ARCHITECTURE RULES:
 *  • Never import this directly in components — use useLang() → tUI(key)
 *  • Add new keys here; never hardcode strings in JSX
 *  • Russian (ru) is a FIRST-CLASS language — every key must have an ru value
 *  • Arabic (ar) is RTL — keep strings concise for layout
 *
 * KEY NAMING: <namespace>_<identifier>
 *   navigation, home, menu, cart, product, footer, common, badge, allergen, tag, seo
 */

export const uiTranslations = {

  // ══════════════════════════════════════════════════════════════
  // NAVIGATION
  // ══════════════════════════════════════════════════════════════
  nav_home: {
    tr: 'Ana Sayfa',
    en: 'Home',
    ar: 'الرئيسية',
    ru: 'Главная',
    zh: '首页',
  },
  nav_menu: {
    tr: 'Menü',
    en: 'Menu',
    ar: 'المنيو',
    ru: 'Меню',
    zh: '菜单',
  },
  nav_about: {
    tr: 'Hikayemiz',
    en: 'Our Story',
    ar: 'قصتنا',
    ru: 'О нас',
    zh: '品牌故事',
  },
  nav_contact: {
    tr: 'İletişim & Konum',
    en: 'Contact & Location',
    ar: 'تواصل والموقع',
    ru: 'Контакты',
    zh: '联系我们',
  },
  nav_language: {
    tr: 'Dil',
    en: 'Language',
    ar: 'اللغة',
    ru: 'Язык',
    zh: '语言',
  },

  // ══════════════════════════════════════════════════════════════
  // COMMON ACTIONS
  // ══════════════════════════════════════════════════════════════
  common_close: {
    tr: 'Kapat',
    en: 'Close',
    ar: 'إغلاق',
    ru: 'Закрыть',
    zh: '关闭',
  },
  common_back: {
    tr: 'Geri',
    en: 'Back',
    ar: 'رجوع',
    ru: 'Назад',
    zh: '返回',
  },
  common_save: {
    tr: 'Kaydet',
    en: 'Save',
    ar: 'حفظ',
    ru: 'Сохранить',
    zh: '保存',
  },
  common_cancel: {
    tr: 'İptal',
    en: 'Cancel',
    ar: 'إلغاء',
    ru: 'Отмена',
    zh: '取消',
  },
  common_loading: {
    tr: 'Yükleniyor...',
    en: 'Loading...',
    ar: 'جارٍ التحميل...',
    ru: 'Загрузка...',
    zh: '加载中...',
  },
  common_error: {
    tr: 'Bir hata oluştu.',
    en: 'Something went wrong.',
    ar: 'حدث خطأ ما.',
    ru: 'Произошла ошибка.',
    zh: '出现错误。',
  },
  skip_to_content: {
    tr: 'İçeriğe geç',
    en: 'Skip to content',
    ar: 'انتقل إلى المحتوى',
    ru: 'Перейти к содержимому',
    zh: '跳至内容',
  },

  // ══════════════════════════════════════════════════════════════
  // HEADER / LANGUAGE SELECTOR
  // ══════════════════════════════════════════════════════════════
  header_logo_aria: {
    tr: 'Lucky Sushi Chinese — Ana Sayfa',
    en: 'Lucky Sushi Chinese — Home',
    ar: 'لاكي سوشي صيني — الرئيسية',
    ru: 'Lucky Sushi Chinese — Главная',
    zh: '幸运寿司中餐厅 — 首页',
  },
  header_select_language: {
    tr: 'Dil Seç',
    en: 'Select language',
    ar: 'اختر اللغة',
    ru: 'Выбрать язык',
    zh: '选择语言',
  },
  header_open_nav: {
    tr: 'Gezinti menüsünü aç',
    en: 'Open navigation menu',
    ar: 'فتح قائمة التنقل',
    ru: 'Открыть навигацию',
    zh: '打开导航菜单',
  },
  header_close_nav: {
    tr: 'Menüyü kapat',
    en: 'Close menu',
    ar: 'إغلاق القائمة',
    ru: 'Закрыть меню',
    zh: '关闭菜单',
  },
  header_open_cart_aria: {
    tr: 'Sepeti Aç',
    en: 'Open Cart',
    ar: 'فتح سلة الطلب',
    ru: 'Открыть корзину',
    zh: '打开购物车',
  },

  // ══════════════════════════════════════════════════════════════
  // BUTTONS / CTA
  // ══════════════════════════════════════════════════════════════
  order_now_btn: {
    tr: 'Sipariş Ver',
    en: 'Order Now',
    ar: 'اطلب الآن',
    ru: 'Заказать',
    zh: '立即点餐',
  },
  explore_menu_btn: {
    tr: 'Menüyü İncele',
    en: 'Explore Menu',
    ar: 'تصفح المنيو',
    ru: 'Смотреть меню',
    zh: '查看菜单',
  },
  view_details: {
    tr: 'İncele',
    en: 'View Details',
    ar: 'عرض التفاصيل',
    ru: 'Подробнее',
    zh: '查看详情',
  },
  read_full_story: {
    tr: 'Hikayemizi Keşfedin',
    en: 'Discover Our Story',
    ar: 'اكتشف قصتنا الكاملة',
    ru: 'Узнать нашу историю',
    zh: '了解我们的故事',
  },
  scroll_left: {
    tr: 'Önceki',
    en: 'Previous',
    ar: 'السابق',
    ru: 'Назад',
    zh: '上一项',
  },
  scroll_right: {
    tr: 'Sonraki',
    en: 'Next',
    ar: 'التالي',
    ru: 'Вперёд',
    zh: '下一项',
  },

  // ══════════════════════════════════════════════════════════════
  // CART
  // ══════════════════════════════════════════════════════════════
  cart_title: {
    tr: 'Sepetiniz',
    en: 'Your Cart',
    ar: 'سلة الطلب',
    ru: 'Ваша корзина',
    zh: '购物车',
  },
  cart_empty: {
    tr: 'Sepetiniz boş',
    en: 'Your cart is empty',
    ar: 'سلتك فارغة',
    ru: 'Корзина пуста',
    zh: '购物车为空',
  },
  cart_empty_hint: {
    tr: 'Lezzetleri keşfetmeye başlayın',
    en: 'Start exploring our dishes',
    ar: 'ابدأ باستكشاف أطباقنا',
    ru: 'Начните выбирать блюда',
    zh: '开始探索美食',
  },
  cart_subtotal: {
    tr: 'Ara Toplam',
    en: 'Subtotal',
    ar: 'المجموع الفرعي',
    ru: 'Итого',
    zh: '小计',
  },
  cart_checkout: {
    tr: 'WhatsApp ile Sipariş',
    en: 'Order via WhatsApp',
    ar: 'اطلب عبر واتساب',
    ru: 'Заказ через WhatsApp',
    zh: 'WhatsApp下单',
  },
  cart_min_notice: {
    tr: 'Minimum sipariş tutarı:',
    en: 'Minimum order amount:',
    ar: 'الحد الأدنى للطلب:',
    ru: 'Минимальная сумма заказа:',
    zh: '最低订单金额:',
  },
  cart_clear_all: {
    tr: 'Tümünü Temizle',
    en: 'Clear All',
    ar: 'مسح الكل',
    ru: 'Очистить всё',
    zh: '清空',
  },
  cart_remove_item: {
    tr: 'Kaldır',
    en: 'Remove',
    ar: 'حذف',
    ru: 'Удалить',
    zh: '删除',
  },
  cart_close_aria: {
    tr: 'Sepeti kapat',
    en: 'Close cart',
    ar: 'إغلاق سلة الطلب',
    ru: 'Закрыть корзину',
    zh: '关闭购物车',
  },
  cart_new_order: {
    tr: 'Yeni Sipariş',
    en: 'New Order',
    ar: 'طلب جديد',
    ru: 'Новый заказ',
    zh: '新订单',
  },
  cart_decrease_aria: {
    tr: 'Miktarı azalt',
    en: 'Decrease quantity',
    ar: 'تقليل الكمية',
    ru: 'Уменьшить количество',
    zh: '减少数量',
  },
  cart_increase_aria: {
    tr: 'Miktarı artır',
    en: 'Increase quantity',
    ar: 'زيادة الكمية',
    ru: 'Увеличить количество',
    zh: '增加数量',
  },

  // ══════════════════════════════════════════════════════════════
  // PRODUCT / DISH CARD
  // ══════════════════════════════════════════════════════════════
  add_to_cart: {
    tr: 'Sepete Ekle',
    en: 'Add to Cart',
    ar: 'أضف للسلة',
    ru: 'В корзину',
    zh: '加入购物车',
  },
  dish_add_aria: {
    tr: 'Ekle',
    en: 'Add',
    ar: 'أضف',
    ru: 'Добавить',
    zh: '添加',
  },
  ingredients_label: {
    tr: 'İçindekiler',
    en: 'Ingredients',
    ar: 'المكونات',
    ru: 'Состав',
    zh: '配料',
  },
  allergens_label: {
    tr: 'Alerjenler',
    en: 'Allergens',
    ar: 'مسببات الحساسية',
    ru: 'Аллергены',
    zh: '过敏原',
  },
  dish_zoom_aria: {
    tr: 'Görseli büyüt',
    en: 'Zoom image',
    ar: 'تكبير الصورة',
    ru: 'Увеличить изображение',
    zh: '放大图片',
  },
  dish_close_modal_aria: {
    tr: 'Ürün detayını kapat',
    en: 'Close dish details',
    ar: 'إغلاق تفاصيل الطبق',
    ru: 'Закрыть описание блюда',
    zh: '关闭菜品详情',
  },

  // ══════════════════════════════════════════════════════════════
  // BADGES
  // ══════════════════════════════════════════════════════════════
  badge_bestseller: {
    tr: 'Çok Satan',
    en: 'Best Seller',
    ar: 'الأكثر طلباً',
    ru: 'Хит продаж',
    zh: '热卖',
  },
  badge_chefs_pick: {
    tr: 'Şef Seçimi',
    en: "Chef's Pick",
    ar: 'اختيار الشيف',
    ru: 'Выбор шефа',
    zh: '主厨推荐',
  },
  badge_beginner: {
    tr: 'Yeni Başlayan',
    en: 'Beginner',
    ar: 'للمبتدئين',
    ru: 'Для новичков',
    zh: '新手',
  },
  badge_cooked: {
    tr: 'Pişmiş',
    en: 'Cooked',
    ar: 'مطهو',
    ru: 'Горячее',
    zh: '熟食',
  },
  badge_spicy: {
    tr: 'Acılı',
    en: 'Spicy',
    ar: 'حار',
    ru: 'Острое',
    zh: '辣',
  },
  badge_vegetarian: {
    tr: 'Vejetaryen',
    en: 'Vegetarian',
    ar: 'نباتي',
    ru: 'Вегетарианское',
    zh: '素食',
  },
  badge_vegan: {
    tr: 'Vegan',
    en: 'Vegan',
    ar: 'نباتي صرف',
    ru: 'Веганское',
    zh: '纯素',
  },
  badge_premium: {
    tr: 'Premium',
    en: 'Premium',
    ar: 'مميز',
    ru: 'Премиум',
    zh: '精选',
  },

  // ══════════════════════════════════════════════════════════════
  // DISH TAGS (used in DishModal)
  // ══════════════════════════════════════════════════════════════
  tag_raw: {
    tr: 'Çiğ',
    en: 'Raw',
    ar: 'نيء',
    ru: 'Сырое',
    zh: '生食',
  },
  tag_cooked: {
    tr: 'Pişmiş',
    en: 'Cooked',
    ar: 'مطهو',
    ru: 'Приготовленное',
    zh: '熟食',
  },
  tag_spicy: {
    tr: 'Acılı',
    en: 'Spicy',
    ar: 'حار',
    ru: 'Острое',
    zh: '辣',
  },
  tag_vegan: {
    tr: 'Vegan',
    en: 'Vegan',
    ar: 'نباتي صرف',
    ru: 'Веганское',
    zh: '纯素',
  },
  tag_vegetarian: {
    tr: 'Vejetaryen',
    en: 'Vegetarian',
    ar: 'نباتي',
    ru: 'Вегетарианское',
    zh: '素食',
  },
  tag_sharing: {
    tr: 'Paylaşım',
    en: 'Sharing',
    ar: 'للمشاركة',
    ru: 'На компанию',
    zh: '分享',
  },
  tag_hot: {
    tr: 'Sıcak',
    en: 'Hot',
    ar: 'ساخن',
    ru: 'Горячее',
    zh: '热',
  },

  // ══════════════════════════════════════════════════════════════
  // ALLERGENS (used in DishModal)
  // ══════════════════════════════════════════════════════════════
  allergen_gluten: {
    tr: 'Glüten',
    en: 'Gluten',
    ar: 'جلوتين',
    ru: 'Глютен',
    zh: '麸质',
  },
  allergen_fish: {
    tr: 'Balık',
    en: 'Fish',
    ar: 'سمك',
    ru: 'Рыба',
    zh: '鱼',
  },
  allergen_shellfish: {
    tr: 'Kabuklu Deniz Ürünleri',
    en: 'Shellfish',
    ar: 'محار وقشريات',
    ru: 'Ракообразные',
    zh: '贝壳',
  },
  allergen_dairy: {
    tr: 'Süt & Süt Ürünleri',
    en: 'Dairy',
    ar: 'ألبان',
    ru: 'Молочные продукты',
    zh: '乳制品',
  },
  allergen_egg: {
    tr: 'Yumurta',
    en: 'Egg',
    ar: 'بيض',
    ru: 'Яйца',
    zh: '蛋',
  },
  allergen_soy: {
    tr: 'Soya',
    en: 'Soy',
    ar: 'صويا',
    ru: 'Соя',
    zh: '大豆',
  },
  allergen_sesame: {
    tr: 'Susam',
    en: 'Sesame',
    ar: 'سمسم',
    ru: 'Кунжут',
    zh: '芝麻',
  },
  allergen_peanuts: {
    tr: 'Fıstık',
    en: 'Peanuts',
    ar: 'فول سوداني',
    ru: 'Арахис',
    zh: '花生',
  },
  allergen_nuts: {
    tr: 'Kuruyemiş',
    en: 'Nuts',
    ar: 'مكسرات',
    ru: 'Орехи',
    zh: '坚果',
  },

  // ══════════════════════════════════════════════════════════════
  // MENU PAGE
  // ══════════════════════════════════════════════════════════════
  menu_search_placeholder: {
    tr: 'Ürün ara...',
    en: 'Search dishes...',
    ar: 'ابحث عن طبق...',
    ru: 'Поиск блюд...',
    zh: '搜索菜品...',
  },
  menu_search_label: {
    tr: 'Menüde Ara',
    en: 'Search Menu',
    ar: 'ابحث في المنيو',
    ru: 'Поиск по меню',
    zh: '搜索菜单',
  },
  categories_title: {
    tr: 'Menü Kategorileri',
    en: 'Menu Categories',
    ar: 'أقسام القائمة',
    ru: 'Категории меню',
    zh: '菜单分类',
  },
  filters_title: {
    tr: 'Ürün Filtreleri',
    en: 'Product Filters',
    ar: 'فلاتر المنتجات',
    ru: 'Фильтры блюд',
    zh: '菜品筛选',
  },
  filter_multi_hint: {
    tr: 'Çoklu seçim yapabilirsiniz (VE mantığı)',
    en: 'Multi-select active (AND logic)',
    ar: 'تحديد متعدد مفعل (منطق AND)',
    ru: 'Множественный выбор (логика И)',
    zh: '支持同时多选（AND逻辑）',
  },
  filter_all: {
    tr: 'Tümü',
    en: 'All',
    ar: 'الكل',
    ru: 'Все',
    zh: '全部',
  },
  clear_filters: {
    tr: 'Filtreleri Temizle',
    en: 'Clear Filters',
    ar: 'مسح الفلاتر',
    ru: 'Сбросить фильтры',
    zh: '清除筛选',
  },
  clear_all: {
    tr: 'Filtreleri ve Aramayı Temizle',
    en: 'Clear Filters & Search',
    ar: 'مسح الفلاتر والبحث',
    ru: 'Сбросить всё',
    zh: '清除筛选与搜索',
  },
  active_filters_label: {
    tr: 'Aktif Filtreler',
    en: 'Active Filters',
    ar: 'الفلاتر النشطة',
    ru: 'Активные фильтры',
    zh: '已选筛选',
  },
  results_all: {
    tr: 'lezzet listeleniyor',
    en: 'dishes listed',
    ar: 'صنف متوفر',
    ru: 'блюд в меню',
    zh: '道菜品展示中',
  },
  results_found: {
    tr: 'sonuç bulundu',
    en: 'dishes found',
    ar: 'نتيجة مطابقة',
    ru: 'блюд найдено',
    zh: '个符合条件的结果',
  },
  no_results_title: {
    tr: 'Eşleşen Lezzet Bulunamadı',
    en: 'No Matching Dishes Found',
    ar: 'لم نتمكن من العثور على أطباق مطابقة',
    ru: 'Блюда не найдены',
    zh: '未找到匹配的菜品',
  },
  no_results_desc: {
    tr: 'Seçili filtreler veya arama kelimesine uygun ürün bulunamadı. Filtreleri temizleyip tüm menüyü görebilirsiniz.',
    en: 'No dishes match your selected filters and search terms. You can clear filters to browse the entire menu.',
    ar: 'لا توجد أطباق تطابق الفلاتر النشطة أو كلمة البحث. يمكنك مسح الفلاتر لاستعراض كامل قائمة الطعام.',
    ru: 'Ни одно блюдо не соответствует выбранным фильтрам. Попробуйте сбросить фильтры.',
    zh: '没有符合您当前筛选条件和搜索词的菜品。您可以清除筛选以查看完整菜单。',
  },
  show_all_menu: {
    tr: 'Tüm Menüyü Göster',
    en: 'Show All Dishes',
    ar: 'عرض جميع الأطباق',
    ru: 'Показать всё меню',
    zh: '显示全部菜品',
  },

  // ══════════════════════════════════════════════════════════════
  // TRENDING BAR
  // ══════════════════════════════════════════════════════════════
  trending_title: {
    tr: 'En Çok Tercih Edilenler',
    en: 'Top Picks & Best Sellers',
    ar: 'الأكثر طلباً واختياراتنا',
    ru: 'Хиты и рекомендации',
    zh: '热门精选与推荐',
  },
  trending_badge: {
    tr: 'Öne Çıkanlar',
    en: 'Signature Picks',
    ar: 'مختارات مميزة',
    ru: 'Фирменные блюда',
    zh: '主厨推荐',
  },
  trending_sub: {
    tr: 'Misafirlerimizin en sevdiği imza lezzetler',
    en: "Our guests' favorite signature dishes",
    ar: 'الأطباق الأكثر طلباً وتفضيلاً لدى ضيوفنا',
    ru: 'Любимые блюда наших гостей',
    zh: '最受客人喜爱的招牌精选',
  },

  // ══════════════════════════════════════════════════════════════
  // HOME PAGE
  // ══════════════════════════════════════════════════════════════
  home_hero_tag: {
    tr: 'Eyüpsultan’ın Asya Gece Mutfağı',
    en: "Eyüpsultan's Asian Night Kitchen",
    ar: 'مطبخ إسطنبول الآسيوي الليلي · أيوب سلطان',
    ru: 'Азиатская ночная кухня в Эйюпсултане',
    zh: '欧普苏丹深夜亚洲厨房 · 伊斯坦布尔',
  },
  home_hero_title: {
    tr: 'Lucky Sushi & Chinese',
    en: 'Lucky Sushi & Chinese',
    ar: 'لاكي سوشي صيني',
    ru: 'Lucky Sushi & Chinese',
    zh: '幸运寿司中餐厅',
  },
  home_hero_sub: {
    tr: 'Sushi · Wok · Ramen. Gece 04:00\'e kadar kesintisiz taze Asya lezzetleri.',
    en: 'Sushi · Wok · Ramen. Fresh Asian flavors prepared to order until 04:00 AM.',
    ar: 'سوشي · ووك · رامن. نكهات آسيوية طازجة تُعد عند الطلب حتى الرابعة فجراً.',
    ru: 'Суши · Вок · Рамен. Свежие азиатские блюда на заказ до 04:00 утра.',
    zh: '寿司 · 炒锅 · 拉面。新鲜现点现制，深夜陪伴至凌晨04:00。',
  },
  home_hero_location_cta: {
    tr: 'Konumu Aç',
    en: 'Open Location',
    ar: 'عرض الموقع',
    ru: 'Открыть на карте',
    zh: '查看定位',
  },
  home_stats_hours: {
    tr: 'Gece 04:00\'e Kadar Açık',
    en: 'Open until 04:00 AM',
    ar: 'مفتوح حتى 04:00 فجراً',
    ru: 'Открыто до 04:00 утра',
    zh: '营业至凌晨 04:00',
  },
  home_stats_dishes: {
    tr: '140+ Çeşit Asya Lezzeti',
    en: '140+ Asian Dishes',
    ar: 'أكثر من 140 صنف آسيوي',
    ru: '140+ блюд азиатской кухни',
    zh: '140+ 种亚洲特色菜品',
  },
  home_stats_rating: {
    tr: '4.6 ★ 800+ Google Yorumu',
    en: '4.6 ★ 800+ Google Reviews',
    ar: '4.6 ★ أكثر من 800 تقييم جوجل',
    ru: '4.6 ★ 800+ отзывов в Google',
    zh: '4.6 ★ 800+ 谷歌真实好评',
  },
  home_stats_delivery: {
    tr: 'Hızlı & Sıcak Paket Servis',
    en: 'Fast & Hot Delivery',
    ar: 'توصيل سريع وساخن',
    ru: 'Быстрая горячая доставка',
    zh: '快速热送外卖服务',
  },
  bestsellers_section_title: {
    tr: 'En Çok Tercih Edilenler',
    en: 'Most Loved Bestsellers',
    ar: 'الأكثر طلباً وتفضيلاً',
    ru: 'Хиты продаж',
    zh: '热卖招牌精选',
  },
  bestsellers_section_sub: {
    tr: 'Misafirlerimizin en sevdiği imza sushi setleri, çıtır roll’lar ve sıcak lezzetler',
    en: 'Our guests’ favorite signature sushi sets, crunchy rolls, and hot specialties',
    ar: 'أشهر أطقم السوشي، الرولات المقرمشة والأطباق الساخنة المفضلة لدى ضيوفنا',
    ru: 'Популярные суши-сеты, хрустящие роллы и горячие блюда по выбору гостей',
    zh: '最受食客喜爱的招牌寿司套餐、酥脆特卷与热烈炒锅珍馐',
  },
  bestsellers_quick_add: {
    tr: 'Sepete Ekle',
    en: 'Add to Cart',
    ar: 'أضف للسلة',
    ru: 'В корзину',
    zh: '加入购物车',
  },
  bestsellers_view_all: {
    tr: 'Tüm Menüyü İncele',
    en: 'Browse Full Menu',
    ar: 'استعراض كامل القائمة',
    ru: 'Смотреть всё меню',
    zh: '查看完整菜单',
  },
  bar_menu: {
    tr: 'Menü',
    en: 'Menu',
    ar: 'المنيو',
    ru: 'Меню',
    zh: '菜单',
  },
  bar_order: {
    tr: 'Sepet',
    en: 'Cart',
    ar: 'السلة',
    ru: 'Корзина',
    zh: '购物车',
  },
  bar_whatsapp: {
    tr: 'WhatsApp',
    en: 'WhatsApp',
    ar: 'واتساب',
    ru: 'WhatsApp',
    zh: 'WhatsApp',
  },
  bar_map: {
    tr: 'Konum',
    en: 'Location',
    ar: 'الموقع',
    ru: 'Карта',
    zh: '导航',
  },
  branch_call_btn: {
    tr: 'Ara',
    en: 'Call',
    ar: 'اتصال',
    ru: 'Позвонить',
    zh: '电话',
  },
  branch_map_btn: {
    tr: 'Harita',
    en: 'Map',
    ar: 'الخريطة',
    ru: 'Карта',
    zh: '地图',
  },
  branch_status_active: {
    tr: '● Aktif Hizmet',
    en: '● Active Service',
    ar: '● خدمة نشطة',
    ru: '● Открыто',
    zh: '● 正常营业',
  },
  home_features_title: {
    tr: 'Neden Lucky Sushi Chinese?',
    en: 'Why Lucky Sushi Chinese?',
    ar: 'لماذا تختار لاكي سوشي؟',
    ru: 'Почему Lucky Sushi Chinese?',
    zh: '为什么选择幸运餐厅？',
  },
  home_features_sub: {
    tr: 'İstanbul\'un kalbinde, gece geç saatlere kadar kesintisiz Asya gastronomisi',
    en: 'Continuous Asian gastronomy late into the night in the heart of Istanbul',
    ar: 'تجربة طعام آسيوية أصيلة ومستمرة حتى ساعات متأخرة من الليل في قلب إسطنبول',
    ru: 'Непрерывная азиатская гастрономия до глубокой ночи в сердце Стамбула',
    zh: '伊斯坦布尔核心地带，营业至深夜的纯正亚洲美食盛宴',
  },
  feature_fresh_title: {
    tr: 'Günlük Taze Balık & Malzemeler',
    en: 'Daily Fresh Fish & Produce',
    ar: 'أسماك ومكونات طازجة يومياً',
    ru: 'Ежедневно свежая рыба и продукты',
    zh: '每日新鲜直达食材',
  },
  feature_fresh_desc: {
    tr: 'Norveç somonundan taze avokadolara her malzeme günlük olarak özenle seçilir ve hazırlanır.',
    en: 'From Norwegian salmon to ripe avocados, each ingredient is carefully selected and prepped daily.',
    ar: 'من السلمون النرويجي الطازج إلى الأفوكادو الفاخر، نختار ونحضر كل مكون بعناية فائقة يومياً.',
    ru: 'От норвежского лосося до спелых авокадо — каждый ингредиент тщательно выбирается и готовится ежедневно.',
    zh: '从挪威三文鱼到成熟牛油果，每种食材均每日严选精心备料。',
  },
  feature_wok_title: {
    tr: 'Ateşli Wok & Zengin Çin Mutfağı',
    en: 'Fiery Wok & Authentic Chinese',
    ar: 'ووك ناري ومطبخ صيني أصيل',
    ru: 'Огненный вок и настоящая китайская кухня',
    zh: '烈火镬气与正宗中式风味',
  },
  feature_wok_desc: {
    tr: 'Yüksek ateşte hazırlanan wok erişteler, çıtır ördekler ve geleneksel Çin sosları.',
    en: 'High-heat wok noodles, crispy chicken favorites, and traditional rich Asian sauces.',
    ar: 'نودلز الووك المحضرة على نار عالية، وأطباق الدجاج المقرمش، وأشهى الصوصات الصينية التقليدية.',
    ru: 'Лапша вок на сильном огне, хрустящая курица и традиционные азиатские соусы.',
    zh: '大火快炒的镬气面条、酥脆精选肉食与经典中式酱汁。',
  },
  feature_night_title: {
    tr: 'Gece Kuşlarına Özel Servis',
    en: 'Midnight Kitchen until 4 AM',
    ar: 'مطبخ ليلي حتى 04:00 فجراً',
    ru: 'Ночная кухня до 4 утра',
    zh: '深夜食堂营业至凌晨4点',
  },
  feature_night_desc: {
    tr: 'Gece 04:00\'e kadar sıcacık ramenler ve taze sushiler kapınızda.',
    en: 'Hot steaming ramen and fresh sushi sets delivered to your door until 4 AM.',
    ar: 'حساء الرامن الساخن والسوشي الطازج يصل إلى باب منزلك حتى الرابعة فجراً.',
    ru: 'Горячий рамен и свежие суши-сеты с доставкой до вашей двери до 4 утра.',
    zh: '热腾腾的拉面与鲜美寿司直达您家，营业至凌晨4点无间断。',
  },
  home_story_teaser_title: {
    tr: 'Bir Rulo ile Başlayan Tutku',
    en: 'A Passion Born from a Single Roll',
    ar: 'شغف بدأ مع أول لفة سوشي',
    ru: 'Страсть, рождённая из одного ролла',
    zh: '源于一枚寿司卷的热忱',
  },
  home_story_teaser_p1: {
    tr: 'Lucky Sushi Chinese, İstanbul Eyüpsultan\'da Asya sokak lezzetleri ile modern sushi sanatını aynı mutfakta buluşturmak amacıyla kuruldu.',
    en: 'Lucky Sushi Chinese was founded in Eyüpsultan to unite authentic Asian street flavors and modern sushi artistry under one roof.',
    ar: 'تأسس لاكي سوشي صيني في منطقة أيوب سلطان لدمج نكهات الشارع الآسيوي العريقة مع فنون السوشي العصرية تحت سقف واحد.',
    ru: 'Lucky Sushi Chinese был основан в Эйюпсултане с целью объединить подлинные азиатские уличные вкусы и современное искусство суши под одной крышей.',
    zh: '幸运寿司中餐厅创立于伊斯坦布尔欧普苏丹，致力于将地道亚洲风味与现代寿司艺术完美融合。',
  },
  home_story_teaser_p2: {
    tr: 'Bizim için yemek sadece doymak değil; gece yarısında bile taze, renkli ve unutulmaz bir lezzet deneyimi yaşamaktır.',
    en: 'For us, food is not merely dining; it is a fresh, colorful, and unforgettable culinary experience even at midnight.',
    ar: 'بالنسبة لنا، الطعام ليس مجرد وجبة؛ بل هو تجربة غنية بالألوان والنكهات الطازجة التي لا تُنسى حتى في أوقات متأخرة من الليل.',
    ru: 'Для нас еда — это не просто насыщение; это свежий, красочный и незабываемый гастрономический опыт даже в полночь.',
    zh: '对我们而言，美食不仅是饱腹，更是即便在深夜也能感受到的鲜活、缤纷且难忘的味觉之旅。',
  },
  visit_us_title: {
    tr: 'Bizi Ziyaret Edin & Sipariş Verin',
    en: 'Visit Us & Order',
    ar: 'زورونا أو اطلبوا مباشرة',
    ru: 'Посетите нас или закажите',
    zh: '莅临品鉴与点餐',
  },

  // ══════════════════════════════════════════════════════════════
  // ABOUT PAGE
  // ══════════════════════════════════════════════════════════════
  about_hero_tag: {
    tr: 'HİKAYEMİZ & MUTFAK FELSEFEMİZ',
    en: 'OUR STORY & CULINARY PHILOSOPHY',
    ar: 'قصتنا وفلسفتنا في الطهي',
    ru: 'НАША ИСТОРИЯ И ФИЛОСОФИЯ КУХНИ',
    zh: '品牌故事与烹饪理念',
  },
  about_hero_title: {
    tr: 'Doğunun Renkleri, İstanbul\'un Gecesiyle Buluşuyor',
    en: 'Colors of the East Meet Istanbul Nights',
    ar: 'ألوان الشرق تلتقي مع ليالي إسطنبول',
    ru: 'Краски Востока встречают ночи Стамбула',
    zh: '东方色彩邂逅伊斯坦布尔之夜',
  },
  about_hero_sub: {
    tr: 'Lucky Sushi Chinese olarak Eyüpsultan\'da taze sushi, çıtır tempuralar ve dumanı tüten wok yemekleri hazırlıyoruz.',
    en: 'At Lucky Sushi Chinese in Eyüpsultan, we craft fresh sushi, crispy tempura, and smoking wok dishes with passion.',
    ar: 'في لاكي سوشي صيني في أيوب سلطان، نحضر السوشي الطازج، والتمبورا المقرمشة، وأطباق الووك ذات الرائحة الشهية بكل شغف.',
    ru: 'В Lucky Sushi Chinese в Эйюпсултане мы с любовью готовим свежие суши, хрустящую темпуру и дымящиеся блюда вок.',
    zh: '在幸运寿司中餐厅，我们用心制作每一份新鲜寿司、酥脆天妇罗与镬气十足的特色炒菜。',
  },
  about_craft_title: {
    tr: 'Sushi Zanaatı & Hassasiyet',
    en: 'Sushi Craftsmanship & Precision',
    ar: 'حرفية السوشي والدقة العالية',
    ru: 'Мастерство суши и точность',
    zh: '寿司工艺与专注精研',
  },
  about_craft_p: {
    tr: 'Sushi ustalarımız pirincin sirke dengesinden balığın kesim açısına kadar her detayı büyük bir titizlikle uygular. Canada Set, Moriawase ve Dragon Roll gibi imza tabaklarımız bu hassasiyetin eseridir.',
    en: 'Our sushi chefs balance vinegar in the rice and calibrate cutting angles with meticulous precision. Signatures like Canada Set, Moriawase, and Dragon Roll reflect this devotion.',
    ar: 'يطبق طهاتنا أعلى معايير الدقة من توازن تتبيلة أرز السوشي إلى زوايا تقطيع الأسماك. أطباقنا المميزة مثل طقم كندا، موريواسي، ودراغون رول هي ثمرة هذا الإتقان.',
    ru: 'Наши мастера суши доводят до совершенства каждую деталь — от баланса уксуса в рисе до угла нарезки рыбы. Фирменные блюда Canada Set, Moriawase и Dragon Roll — воплощение этого мастерства.',
    zh: '从寿司醋饭的黄金酸度到生鱼切片的毫米级精准角度，主厨皆一丝不苟。加拿大套餐、盛合套餐与青龙卷等招牌佳作皆凝聚此般匠心。',
  },
  about_wok_title: {
    tr: 'Wok Ateşinin Gücü & Çin Mutfağı',
    en: 'The Power of Wok Fire & Chinese Heritage',
    ar: 'قوة نار الووك وعراقة المطبخ الصيني',
    ru: 'Сила огня вок и традиции китайской кухни',
    zh: '镬气之魂与中式美食传承',
  },
  about_wok_p: {
    tr: 'Yüksek ateşte saniyeler içinde pişen sebzeler çıtırlığını, etler ise lezzet ve suyunu korur. Özel soslarımızla harmanlanan noodle ve udonlar damağınızda unutulmaz bir Asya rüzgarı estirir.',
    en: 'Searing heat locks in crispness for vegetables and succulence for meats in seconds. Tossed in house sauces, noodles and udon bring genuine Asian flavors to life.',
    ar: 'النار العالية تحافظ على قرمشة الخضروات وطراوة اللحوم في ثوانٍ معدودة. ممزوجة بخلطات الصوص الخاصة بنا لتمنحك مذاقاً آسيوياً لا يُضاهى.',
    ru: 'Сильный огонь мгновенно запечатывает хруст овощей и сочность мяса. Лапша и удон в фирменных соусах раскрывают подлинный азиатский вкус.',
    zh: '大火瞬息锁住蔬菜清脆与肉质鲜嫩多汁。融合秘制风味酱汁的炒面与乌冬，带给您难以忘怀的舌尖享受。',
  },
  about_midnight_title: {
    tr: 'Gece 04:00\'e Kadar Kesintisiz Hizmet',
    en: 'Service Every Night until 4:00 AM',
    ar: 'خدمة مستمرة كل ليلة حتى 04:00 فجراً',
    ru: 'Работаем каждую ночь до 4:00',
    zh: '每夜陪伴营业至凌晨4点',
  },
  about_midnight_p: {
    tr: 'İster gece vardiyasından dönün, ister arkadaşlarınızla gece yarısı Asya ziyafeti çekin; Lucky Sushi mutfağı taze ve sıcacık tabaklarla daima hazır.',
    en: 'Whether returning from a late shift or hosting a midnight sushi gathering with friends, our kitchen delivers hot and fresh meals every night.',
    ar: 'سواء كنت عائداً من عملك في وقت متأخر أو مجتمعاً مع أصدقائك في سهرة ليلية؛ مطبخ لاكي سوشي جاهز دائماً لتقديم أشهى الأطباق الطازجة والساخنة.',
    ru: 'Возвращаетесь ли вы с ночной смены или собираете друзей за суши в полночь — кухня Lucky Sushi всегда готова подать горячие свежие блюда.',
    zh: '无论下班归家迟晚，亦或与好友深夜小聚；幸运寿司厨房每夜准时相伴，随时呈递温热鲜美的珍馐佳品。',
  },

  // ══════════════════════════════════════════════════════════════
  // CONTACT PAGE
  // ══════════════════════════════════════════════════════════════
  contact_hero_tag: {
    tr: 'İLETİŞİM & LOKASYON',
    en: 'CONTACT & LOCATION',
    ar: 'تواصل معنا والموقع',
    ru: 'КОНТАКТЫ И АДРЕС',
    zh: '联系我们与门店位置',
  },
  contact_hero_title: {
    tr: 'Bize Ulaşın & Ziyaret Edin',
    en: 'Get in Touch & Visit Us',
    ar: 'تواصل معنا وزيارتنا',
    ru: 'Свяжитесь с нами',
    zh: '期待您的垂询与光临',
  },
  contact_hero_sub: {
    tr: 'Eyüpsultan Alibeyköy\'deki restoranımızda sizi ağırlamaktan veya siparişinizi kapınıza getirmekten mutluluk duyarız.',
    en: 'We look forward to welcoming you at our Eyüpsultan Alibeyköy restaurant or delivering directly to your door.',
    ar: 'يسعدنا جداً استقبالكم في مطعمنا في أيوب سلطان أليبي كوي أو توصيل طلبكم ساخناً إلى بابكم.',
    ru: 'Мы рады приветствовать вас в нашем ресторане в Эйюпсултан Алибейкёй или доставить заказ прямо к вашей двери.',
    zh: '真诚期待在欧普苏丹阿里贝科伊门店与您相逢，亦愿竭诚将美味准时送达您的府上。',
  },
  contact_phone_title: {
    tr: 'Telefon & Sipariş Hattı',
    en: 'Phone & Order Line',
    ar: 'الهاتف وخط الطلبات',
    ru: 'Телефон и линия заказов',
    zh: '电话与订餐专线',
  },
  contact_address_title: {
    tr: 'Adres & Yol Tarifi',
    en: 'Address & Directions',
    ar: 'العنوان والاتجاهات',
    ru: 'Адрес и как добраться',
    zh: '地址与路线指引',
  },
  contact_hours_title: {
    tr: 'Çalışma Saatleri',
    en: 'Working Hours',
    ar: 'أوقات العمل',
    ru: 'Часы работы',
    zh: '营业时间',
  },
  contact_social_title: {
    tr: 'Sosyal Medya & Takip',
    en: 'Social Media & Updates',
    ar: 'وسائل التواصل والمتابعة',
    ru: 'Социальные сети',
    zh: '关注社交动态',
  },
  open_in_google_maps: {
    tr: 'Google Haritalar\'da Aç',
    en: 'Open in Google Maps',
    ar: 'فتح في خرائط جوجل',
    ru: 'Открыть в Google Maps',
    zh: '在谷歌地图中查看',
  },
  call_direct_btn: {
    tr: 'Hemen Ara (+90 531 486 34 04)',
    en: 'Call Directly (+90 531 486 34 04)',
    ar: 'اتصال مباشر (+90 531 486 34 04)',
    ru: 'Позвонить (+90 531 486 34 04)',
    zh: '致电订餐 (+90 531 486 34 04)',
  },

  // ══════════════════════════════════════════════════════════════
  // FOOTER
  // ══════════════════════════════════════════════════════════════
  footer_phone: {
    tr: 'Telefon',
    en: 'Phone',
    ar: 'الهاتف',
    ru: 'Телефон',
    zh: '电话',
  },
  footer_email: {
    tr: 'E-posta',
    en: 'Email',
    ar: 'البريد الإلكتروني',
    ru: 'Эл. почта',
    zh: '邮箱',
  },
  footer_hq: {
    tr: 'Merkez',
    en: 'Headquarters',
    ar: 'المقر الرئيسي',
    ru: 'Главный офис',
    zh: '总店',
  },
  footer_order_menu: {
    tr: 'Sipariş Ver / Menü',
    en: 'Order / Menu',
    ar: 'اطلب / القائمة',
    ru: 'Заказ / Меню',
    zh: '下单 / 菜单',
  },
  footer_about: {
    tr: 'Hakkımızda',
    en: 'About Us',
    ar: 'من نحن',
    ru: 'О нас',
    zh: '关于我们',
  },
  footer_branches: {
    tr: 'Şubelerimiz / İletişim',
    en: 'Branches / Contact',
    ar: 'فروعنا / اتصل بنا',
    ru: 'Филиалы / Контакты',
    zh: '分店 / 联系',
  },
  footer_rights: {
    tr: 'Tüm hakları saklıdır.',
    en: 'All rights reserved.',
    ar: 'جميع الحقوق محفوظة.',
    ru: 'Все права защищены.',
    zh: '版权所有。',
  },
  footer_store_img_alt: {
    tr: 'Lucky Sushi Chinese Restoran',
    en: 'Lucky Sushi Chinese Restaurant',
    ar: 'مطعم لاكي سوشي صيني',
    ru: 'Ресторан Lucky Sushi Chinese',
    zh: '幸运寿司中餐厅',
  },
  footer_social_aria: {
    tr: 'Sosyal medya bağlantıları',
    en: 'Social media links',
    ar: 'روابط وسائل التواصل الاجتماعي',
    ru: 'Ссылки на социальные сети',
    zh: '社交媒体链接',
  },

  // ══════════════════════════════════════════════════════════════
  // SEO STRINGS (used in metadata generation)
  // ══════════════════════════════════════════════════════════════
  seo_site_title: {
    tr: 'Lucky Sushi Chinese — Sushi & Asya Mutfağı · Eyüpsultan, İstanbul',
    en: 'Lucky Sushi Chinese — Sushi & Asian Kitchen · Istanbul',
    ar: 'لاكي سوشي صيني — سوشي ومطبخ آسيوي · إسطنبول',
    ru: 'Lucky Sushi Chinese — Суши и азиатская кухня · Стамбул',
    zh: '幸运寿司中餐厅 — 寿司与亚洲美食 · 伊斯坦布尔',
  },
  seo_site_description: {
    tr: 'Taze sushi setleri, sıcak wok lezzetleri ve doyurucu ramenler. Eyüpsultan, İstanbul. Gece 04:00\'e kadar açık. Paket servis mevcuttur.',
    en: 'Fresh sushi sets, hot wok dishes and comforting ramen. Eyüpsultan, Istanbul. Open until 4 AM. Delivery available.',
    ar: 'أطقم سوشي طازجة، أطباق ووك ساخنة ورامن شهي. أيوب سلطان، إسطنبول. مفتوح حتى الفجر. التوصيل متاح.',
    ru: 'Свежие суши-сеты, горячие блюда вок и сытный рамен. Эйюпсултан, Стамбул. Открыто до 4 утра. Доставка доступна.',
    zh: '新鲜寿司套餐、热辣炒菜和暖心拉面。欧普苏丹，伊斯坦布尔。营业至凌晨4点。提供外卖配送。',
  },
  seo_menu_title: {
    tr: 'Menü',
    en: 'Menu',
    ar: 'قائمة الطعام',
    ru: 'Меню',
    zh: '菜单',
  },
  seo_about_title: {
    tr: 'Hikayemiz',
    en: 'Our Story',
    ar: 'قصتنا',
    ru: 'О нас',
    zh: '品牌故事',
  },
  seo_contact_title: {
    tr: 'İletişim & Konum',
    en: 'Contact & Location',
    ar: 'تواصل والموقع',
    ru: 'Контакты',
    zh: '联系我们',
  },

  // ══════════════════════════════════════════════════════════════
  // ACCESSIBILITY
  // ══════════════════════════════════════════════════════════════
  aria_cart_items: {
    tr: 'Sepet',
    en: 'Cart',
    ar: 'سلة الطلب',
    ru: 'Корзина',
    zh: '购物车',
  },
  aria_main_nav: {
    tr: 'Ana gezinti',
    en: 'Main navigation',
    ar: 'التنقل الرئيسي',
    ru: 'Основная навигация',
    zh: '主导航',
  },
  aria_mobile_nav: {
    tr: 'Mobil menü',
    en: 'Mobile menu',
    ar: 'قائمة الجوال',
    ru: 'Мобильное меню',
    zh: '移动端菜单',
  },
  aria_social_media: {
    tr: 'Sosyal medya',
    en: 'Social media',
    ar: 'وسائل التواصل الاجتماعي',
    ru: 'Социальные сети',
    zh: '社交媒体',
  },
};
