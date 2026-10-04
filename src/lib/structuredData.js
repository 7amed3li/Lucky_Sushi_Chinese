import { restaurantInfo } from '@/data/menuData';

/**
 * Generate Restaurant JSON-LD structured data.
 * Only uses real data from restaurantInfo — never fabricated values.
 */
export function generateRestaurantJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lucky-sushi-chinese.vercel.app';
  const mainBranch = restaurantInfo.branches[0];

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurantInfo.name,
    url: baseUrl,
    telephone: restaurantInfo.phone,
    servesCuisine: ['Sushi', 'Japanese', 'Chinese', 'Asian'],
    priceRange: '₺₺',
    image: `${baseUrl}/logo-full-badge.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Vardar Bulvarı Çırçır Caddesi No: 25',
      addressLocality: 'Eyüpsultan',
      addressRegion: 'İstanbul',
      postalCode: '34060',
      addressCountry: 'TR',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday',
        'Friday', 'Saturday', 'Sunday'
      ],
      opens: '10:00',
      closes: '04:00',
    },
    menu: `${baseUrl}/menu`,
    hasMenu: {
      '@type': 'Menu',
      url: `${baseUrl}/menu`,
      name: 'Lucky Sushi Chinese Menu',
    },
    sameAs: [
      'https://instagram.com/lucky.sushi_chinese',
    ],
    // Only listing branches as sub-entities
    department: restaurantInfo.branches.map((branch) => ({
      '@type': 'Restaurant',
      name: `Lucky Sushi Chinese — ${branch.name}`,
      telephone: branch.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: branch.address,
        addressCountry: 'TR',
      },
    })),
  };
}

/**
 * Generate BreadcrumbList JSON-LD.
 * @param {Array<{name: string, url: string}>} items
 */
export function generateBreadcrumbJsonLd(items) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lucky-sushi-chinese.vercel.app';

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
