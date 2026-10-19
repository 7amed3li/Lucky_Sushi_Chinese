import { restaurantInfo } from '@/data/menuData';

/**
 * Generate Restaurant JSON-LD structured data.
 * Only uses real data from restaurantInfo — never fabricated values.
 */
export function generateRestaurantJsonLd(locale = 'tr') {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.luckysushichinese.com.tr').replace(/\/$/, '');
  const mainBranch = restaurantInfo.branches[0] || {};
  const menuUrl = locale === 'tr' ? `${baseUrl}/menu` : `${baseUrl}/${locale}/menu`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurantInfo.name,
    alternateName: ['Lucky Sushi Chinese', 'Lucky Sushi & Chinese Istanbul', 'Lucky Sushi Eyüpsultan'],
    url: baseUrl,
    telephone: restaurantInfo.phone,
    servesCuisine: ['Sushi', 'Chinese', 'Japanese', 'Asian', 'Wok', 'Ramen'],
    priceRange: '₺₺',
    image: `${baseUrl}/logo-full-badge.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Alibeyköy, Çırçır Cd. 25 A',
      addressLocality: 'Eyüpsultan',
      addressRegion: 'İstanbul',
      postalCode: '34060',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '41.0757',
      longitude: '28.9421',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday',
          'Friday', 'Saturday', 'Sunday',
        ],
        opens: '10:45',
        closes: '04:00',
      },
    ],
    menu: menuUrl,
    hasMenu: {
      '@type': 'Menu',
      url: menuUrl,
      name: 'Lucky Sushi & Chinese Menu',
    },
    sameAs: [
      'https://www.instagram.com/lucky.sushi_chinese/',
      'https://maps.app.goo.gl/FYJRC83umT6g6diYA',
    ],
    department: (restaurantInfo.branches || []).map((branch) => {
      const branchName = branch[`name_${locale}`] || branch.name_tr || branch.id;
      const branchAddress = branch[`address_${locale}`] || branch.address || branch.address_tr;
      return {
        '@type': 'Restaurant',
        name: `Lucky Sushi & Chinese — ${branchName}`,
        telephone: branch.phone || restaurantInfo.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: branchAddress,
          addressCountry: 'TR',
        },
      };
    }),
  };
}

/**
 * Generate BreadcrumbList JSON-LD.
 * @param {Array<{name: string, url: string}>} items
 */
export function generateBreadcrumbJsonLd(items) {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.luckysushichinese.com.tr').replace(/\/$/, '');

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  };
}

/**
 * Generate Menu JSON-LD structured data with representative signature categories and items.
 */
export function generateMenuJsonLd(locale = 'tr') {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.luckysushichinese.com.tr').replace(/\/$/, '');
  const menuUrl = locale === 'tr' ? `${baseUrl}/menu` : `${baseUrl}/${locale}/menu`;

  const sections = [
    {
      '@type': 'MenuSection',
      name: locale === 'ar' ? 'أطقم السوشي' : locale === 'en' ? 'Sushi Set Menus' : locale === 'ru' ? 'Сеты суши' : locale === 'zh' ? '寿司套餐' : 'Sushi Set Menüler',
      hasMenuItem: [
        {
          '@type': 'MenuItem',
          name: 'Canada Set (32 Pcs)',
          description: 'Philadelphia roll, California roll, Kappa maki, Avocado maki',
          offers: { '@type': 'Offer', price: '1300', priceCurrency: 'TRY' },
        },
        {
          '@type': 'MenuItem',
          name: 'Combo Crunchy Set (24 Pcs)',
          description: 'Crispy crunchy ebi ten, crispy crunchy philadelphia, crispy crunchy california',
          offers: { '@type': 'Offer', price: '1350', priceCurrency: 'TRY' },
        },
        {
          '@type': 'MenuItem',
          name: 'Salmon Lovers Set (40 Pcs)',
          description: 'Special 40-piece sushi set for salmon lovers',
          offers: { '@type': 'Offer', price: '1600', priceCurrency: 'TRY' },
        },
      ],
    },
    {
      '@type': 'MenuSection',
      name: locale === 'ar' ? 'الرامن والشوربات' : locale === 'en' ? 'Soups & Ramen' : locale === 'ru' ? 'Супы и рамен' : locale === 'zh' ? '汤与拉面' : 'Çorba & Ramen',
      hasMenuItem: [
        {
          '@type': 'MenuItem',
          name: 'Tavuklu Ramen',
          description: 'Tavuk eti, taze ramen eriştesi, haşlanmış yumurta, soya filizi, yeşil soğan, özel Asya et suyu',
          offers: { '@type': 'Offer', price: '380', priceCurrency: 'TRY' },
        },
        {
          '@type': 'MenuItem',
          name: 'Karidesli Ramen',
          description: 'Taze karides, ramen eriştesi, haşlanmış yumurta, mantar, özel Asya deniz mahsulü suyu',
          offers: { '@type': 'Offer', price: '450', priceCurrency: 'TRY' },
        },
      ],
    },
    {
      '@type': 'MenuSection',
      name: locale === 'ar' ? 'أطباق الووك والنودلز' : locale === 'en' ? 'Wok & Noodles' : locale === 'ru' ? 'Вок и лапша' : locale === 'zh' ? '炒面与炒锅' : 'Noodle & Wok',
      hasMenuItem: [
        {
          '@type': 'MenuItem',
          name: 'Sebzeli Noodle',
          description: 'Özel Asya sebzeleri, soya sosu ve wok ateşinde pişirilmiş erişte',
          offers: { '@type': 'Offer', price: '290', priceCurrency: 'TRY' },
        },
        {
          '@type': 'MenuItem',
          name: 'Dana Etli Udon',
          description: 'Kalın Japon udon eriştesi, jülyen dana eti, mevsim sebzeleri, teriyaki sos',
          offers: { '@type': 'Offer', price: '440', priceCurrency: 'TRY' },
        },
      ],
    },
    {
      '@type': 'MenuSection',
      name: locale === 'ar' ? 'المطبخ الصيني' : locale === 'en' ? 'Chinese Favorites' : locale === 'ru' ? 'Китайская кухня' : locale === 'zh' ? '中式热炒' : 'Çin Sıcak Yemekleri',
      hasMenuItem: [
        {
          '@type': 'MenuItem',
          name: 'General Tso Tavuk',
          description: 'Özel tatlı-acı soslu çıtır tavuk parçaları, susam ve pilav ile',
          offers: { '@type': 'Offer', price: '390', priceCurrency: 'TRY' },
        },
        {
          '@type': 'MenuItem',
          name: 'Tatlı Ekşi Soslu Tavuk',
          description: 'Ananas, renkli biberler ve klasik tatlı ekşi sos ile çıtır tavuk',
          offers: { '@type': 'Offer', price: '380', priceCurrency: 'TRY' },
        },
      ],
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: locale === 'ar' ? 'قائمة طعام لاكي سوشي صيني' : locale === 'en' ? 'Lucky Sushi & Chinese Menu' : 'Lucky Sushi & Chinese Menü',
    url: menuUrl,
    inLanguage: locale,
    hasMenuSection: sections,
  };
}
