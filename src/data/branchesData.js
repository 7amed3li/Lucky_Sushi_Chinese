/**
 * Lucky Sushi & Chinese — Single Source of Truth for Branches & Working Hours
 * 
 * TODO: Restaurant owner must confirm:
 * 1. Exact closing hours for all branches (currently conflicting 03:00 vs 04:00).
 * 2. Zeytinburnu exact street address and building number.
 * 3. Reşitpaşa cloud kitchen exact address and whether any walk-in pickup is allowed.
 * 4. Company official title and tax registration for KVKK/Privacy legal notice.
 */

export const branchesData = [
  {
    id: "alibeykoy",
    name_tr: "Alibeyköy (Merkez)",
    name_en: "Alibeyköy (Main Branch)",
    name_ar: "أليبي كوي (الفرع الرئيسي)",
    name_ru: "Алибейкёй (Главный филиал)",
    name_zh: "阿里贝科伊 (总店)",
    
    type: "restaurant", // Restoran, Gel-Al & Paket Servis
    allowDirections: true,
    allowDineIn: true,
    allowPickup: true,
    allowDelivery: true,
    
    badge_tr: "Restoran, Gel-Al & Paket Servis",
    badge_en: "Dine-in, Takeaway & Delivery",
    badge_ar: "مطعم وجلسات، استلام وتوصيل",
    badge_ru: "Ресторан, самовывоз и доставка",
    badge_zh: "堂食、自提与外送",
    
    desc_tr: "Geniş oturma alanı, masada servis, gel-al ve bölgeye hızlı paket servis.",
    desc_en: "Spacious dine-in seating, table service, takeaway pickup and fast local delivery.",
    desc_ar: "جلسات داخلية مريحة، خدمة طاولات، استلام مباشر وتوصيل سريع للمنطقة.",
    desc_ru: "Уютный зал, обслуживание за столиками, самовывоз и быстрая доставка.",
    desc_zh: "宽敞堂食坐席、堂食点餐服务、自提点及快捷外送。",
    
    address_tr: "Alibeyköy, Çırçır Cd. 25 A, 34060 Eyüpsultan/İstanbul",
    address_en: "Alibeyköy, Çırçır Cd. 25 A, 34060 Eyüpsultan/Istanbul",
    address_ar: "أليبي كوي، شارع تشيرتشير 25 أ، 34060 أيوب سلطان/إسطنبول",
    address_ru: "Алибейкёй, ул. Чырчыр 25 A, 34060 Эйюпсултан/Стамбул",
    address_zh: "伊斯坦布尔埃于普苏丹区阿里贝科伊 Çırçır街 25 A号 (34060)",
    address: "Alibeyköy, Çırçır Cd. 25 A, 34060 Eyüpsultan/İstanbul",
    
    phone: "+90 531 486 34 04",
    whatsapp: "+90 531 486 34 04",
    phoneClean: "905314863404",
    map: "https://maps.app.goo.gl/FYJRC83umT6g6diYA?g_st=ic",
    
    // Working hours (TODO: Confirm closing hour with owner)
    hours_tr: "10:45 — 04:00 (Her gün)",
    hours_en: "10:45 AM — 04:00 AM (Daily)",
    hours_ar: "10:45 صباحًا — 04:00 فجرًا (يوميًا)",
    hours_ru: "10:45 — 04:00 (Ежедневно)",
    hours_zh: "10:45 — 04:00 (每天)",
    hoursShort: "10:45 — 04:00",
    
    coverage_tr: "Eyüpsultan, Gaziosmanpaşa, Kağıthane, Alibeyköy ve çevresi",
    coverage_en: "Eyüpsultan, Gaziosmanpaşa, Kağıthane, Alibeyköy & surroundings",
    coverage_ar: "أيوب سلطان، غازي عثمان باشا، كاغد خانه، أليبي كوي والمناطق المجاورة",
    coverage_ru: "Эйюпсултан, Газиосманпаша, Кягытхане, Алибейкёй и окрестности",
    coverage_zh: "埃于普苏丹、加济奥斯曼帕夏、卡厄特哈内及周边",
    
    image: "/images/floter.jpg",
  },
  {
    id: "zeytinburnu",
    name_tr: "Zeytinburnu",
    name_en: "Zeytinburnu",
    name_ar: "زيتون بورنو",
    name_ru: "Зейтинбурну",
    name_zh: "宰廷布尔努",
    
    type: "pickup-delivery", // Gel-Al & Paket Servis
    allowDirections: true,
    allowDineIn: false,
    allowPickup: true,
    allowDelivery: true,
    
    badge_tr: "Gel-Al & Paket Servis",
    badge_en: "Takeaway & Delivery",
    badge_ar: "استلام وتوصيل",
    badge_ru: "Самовывоз и доставка",
    badge_zh: "自提与外送",
    
    desc_tr: "Hızlı gel-al noktası ve Zeytinburnu ile çevresine hızlı paket servis. (Masa servisi yoktur)",
    desc_en: "Convenient takeaway pickup counter and rapid delivery for Zeytinburnu and surroundings. (No dine-in)",
    desc_ar: "نقطة استلام سريعة وتوصيل طلبات مغطى لمنطقة زيتون بورنو والمناطق المجاورة (بدون صالة جلوس).",
    desc_ru: "Удобный пункт самовывоза и быстрая доставка по району Зейтинбурну. (Без зала)",
    desc_zh: "便捷自提点及辐射周边的高效外送服务。(无堂食)",
    
    address_tr: "Zeytinburnu, İstanbul (Detaylı cadde/kapı bilgisi teyit edilecek - TODO)",
    address_en: "Zeytinburnu, Istanbul (Exact street address to be confirmed - TODO)",
    address_ar: "زيتون بورنو، إسطنبول (العنوان التفصيلي قيد تأكيد المالك - TODO)",
    address_ru: "Зейтинбурну, Стамбул (Точный адрес уточняется - TODO)",
    address_zh: "伊斯坦布尔 宰廷布尔努 (具体地址待确认 - TODO)",
    address: "Zeytinburnu, İstanbul",
    
    phone: "+90 544 217 98 57",
    whatsapp: "+90 544 217 98 57",
    phoneClean: "905442179857",
    map: "https://maps.app.goo.gl/1bUYKe45ERSb8HWo7?g_st=ic",
    
    // Working hours (TODO: Confirm closing hour with owner)
    hours_tr: "11:00 — 03:00 (Her gün)",
    hours_en: "11:00 AM — 03:00 AM (Daily)",
    hours_ar: "11:00 صباحًا — 03:00 فجرًا (يوميًا)",
    hours_ru: "11:00 — 03:00 (Ежедневно)",
    hours_zh: "11:00 — 03:00 (每天)",
    hoursShort: "11:00 — 03:00",
    
    coverage_tr: "Zeytinburnu, Bakırköy, Fatih, Topkapı ve çevresi",
    coverage_en: "Zeytinburnu, Bakırköy, Fatih, Topkapı & surroundings",
    coverage_ar: "زيتون بورنو، باكركوي، الفاتح، توبكابي والمناطق المجاورة",
    coverage_ru: "Зейтинбурну, Бакыркёй, Фатих, Топкапы и окрестности",
    coverage_zh: "宰廷布尔努、巴克尔柯伊、法蒂赫及周边",
    
    image: "/images/bento-1.jpg",
  },
  {
    id: "resitpasa",
    name_tr: "Reşitpaşa (Sarıyer)",
    name_en: "Reşitpaşa (Sarıyer)",
    name_ar: "ريشيت باشا (ساريير)",
    name_ru: "Решитпаша (Сарыер)",
    name_zh: "赖希特帕夏 (萨勒耶尔)",
    
    type: "delivery-only", // Sadece Paket Servis Mutfak
    allowDirections: false, // NO directions/dine-in
    allowDineIn: false,
    allowPickup: false,
    allowDelivery: true,
    
    badge_tr: "Sadece Paket Servis (Mutfak)",
    badge_en: "Delivery Kitchen Only (No Dine-In)",
    badge_ar: "مطبخ توصيل فقط (بدون صالة جلوس)",
    badge_ru: "Только доставка (Кухня без зала)",
    badge_zh: "仅限外送厨房 (无堂食与自提)",
    
    desc_tr: "Sarıyer ve Reşitpaşa çevresine hızlı teslimat sağlayan özel paket servis mutfağımız. (Oturma ve gel-al servisi yoktur)",
    desc_en: "Dedicated cloud kitchen providing fast delivery of fresh sushi across Sarıyer and surroundings. (No dine-in or pickup)",
    desc_ar: "مطبخنا المتخصص لتغطية ساريير وريشيت باشا بتوصيل سريع ومباشر (لا توجد صالة جلوس أو استلام مباشر).",
    desc_ru: "Специализированная кухня для быстрой доставки суши и горячих блюд по району Сарыер. (Без посадки и самовывоза)",
    desc_zh: "专为萨勒耶尔及周边区域提供高效外送的专属厨房。(无堂食与自提)",
    
    address_tr: "Reşitpaşa, Sarıyer, İstanbul (Bulut Mutfak - Detaylı adres teyit edilecek - TODO)",
    address_en: "Reşitpaşa, Sarıyer, Istanbul (Cloud Kitchen - Address to be confirmed - TODO)",
    address_ar: "ريشيت باشا، ساريير، إسطنبول (مطبخ توصيل - العنوان قيد تأكيد المالك - TODO)",
    address_ru: "Решитпаша, Сарыер, Стамбул (Кухня доставки - адрес уточняется - TODO)",
    address_zh: "伊斯坦布尔萨勒耶尔区赖希特帕夏 (外送厨房，地址待确认 - TODO)",
    address: "Reşitpaşa, Sarıyer, İstanbul",
    
    phone: "+90 555 995 34 04",
    whatsapp: "+90 555 995 34 04",
    phoneClean: "905559953404",
    map: null, // NO map direction link
    
    // Working hours (TODO: Confirm closing hour with owner)
    hours_tr: "11:00 — 03:00 (Her gün)",
    hours_en: "11:00 AM — 03:00 AM (Daily)",
    hours_ar: "11:00 صباحًا — 03:00 فجرًا (يوميًا)",
    hours_ru: "11:00 — 03:00 (Ежедневно)",
    hours_zh: "11:00 — 03:00 (每天)",
    hoursShort: "11:00 — 03:00",
    
    coverage_tr: "Sarıyer, Reşitpaşa, Maslak, İstinye, Beşiktaş ve çevresi",
    coverage_en: "Sarıyer, Reşitpaşa, Maslak, İstinye, Beşiktaş & surroundings",
    coverage_ar: "ساريير، ريشيت باشا، مسلك، إستينيا، بشكتاش والمناطق المجاورة",
    coverage_ru: "Сарыер, Решитпаша, Маслак, Истинье, Бешикташ и окрестности",
    coverage_zh: "萨勒耶尔、赖希特帕夏、马斯拉克、伊斯廷耶及周边",
    
    image: "/images/lucky-set.png",
  },
];

export const DEFAULT_BRANCH_ID = "alibeykoy";

export function getBranchById(id) {
  return branchesData.find((b) => b.id === id) || null;
}
