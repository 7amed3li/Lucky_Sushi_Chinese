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
      latitude: '41.0664',
      longitude: '28.9484',
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.6',
      reviewCount: '800',
      bestRating: '5',
      worstRating: '1',
    },
    menu: `${baseUrl}/menu`,
    hasMenu: {
      '@type': 'Menu',
      url: `${baseUrl}/menu`,
      name: 'Lucky Sushi & Chinese Menu',
    },
    sameAs: [
      'https://www.instagram.com/lucky.sushi_chinese/',
      'https://maps.app.goo.gl/FYJRC83umT6g6diYA',
    ],
    department: restaurantInfo.branches.map((branch) => ({
      '@type': 'Restaurant',
      name: `Lucky Sushi & Chinese — ${branch.name}`,
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
