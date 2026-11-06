import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { menuItems, menuCategories } from '@/data/menuData';
import { getRouteCanonicalAndAlternates, BASE_SITE_URL } from '@/lib/seo';
import ProductDetailClient from '@/components/ProductDetailClient';

import trProducts from '@/i18n/messages/tr/products.json';
import enProducts from '@/i18n/messages/en/products.json';
import arProducts from '@/i18n/messages/ar/products.json';
import ruProducts from '@/i18n/messages/ru/products.json';
import zhProducts from '@/i18n/messages/zh/products.json';

const PRODUCTS_MAP = {
  tr: trProducts,
  en: enProducts,
  ar: arProducts,
  ru: ruProducts,
  zh: zhProducts,
};

function getDishDetails(item, locale) {
  const dict = PRODUCTS_MAP[locale] || PRODUCTS_MAP.tr;
  const entry = dict?.[item.id];
  const name = entry?.name || item[`name_${locale}`] || item.name_en || item.name_tr || item.id;
  const description = entry?.description || item[`description_${locale}`] || item.description_en || item.description_tr || '';
  return { name, description };
}

export function generateStaticParams() {
  const params = [];
  for (const locale of routing.locales) {
    for (const item of menuItems) {
      params.push({ locale, slug: item.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const item = menuItems.find((m) => m.id === slug);
  if (!item) return notFound();

  const { name, description } = getDishDetails(item, locale);
  const alternates = getRouteCanonicalAndAlternates(`/menu/${slug}`, locale);

  const titleTemplates = {
    ar: `أفضل ${name} في إسطنبول | طازج وأصيل — لاكي سوشي صيني`,
    tr: `İstanbul'un En İyi ${name} | Taze & Orijinal — Lucky Sushi & Chinese`,
    en: `Best ${name} in Istanbul | Fresh & Authentic — Lucky Sushi & Chinese`,
    ru: `Лучшие ${name} в Стамбуле | Свежие и оригинальные — Lucky Sushi & Chinese`,
    zh: `伊斯坦布尔最佳 ${name} | 新鲜地道 — Lucky Sushi & Chinese`,
  };

  const descTemplates = {
    ar: `تذوق أفضل ${name} في إسطنبول محضر طازجاً بأجود المكونات وتقنيات السوشي اليابانية الأصلية في لاكي سوشي صيني. ${description || ''} اطلب الآن مع خدمة التوصيل السريع حتى 04:00 فجراً.`,
    tr: `İstanbul'un en iyi ${name} lezzeti Lucky Sushi & Chinese'de! En taze Norveç somonu, özel sushi pirinci ve usta dokunuşlarla günlük hazırlanır. ${description || ''} Gece 04:00'e kadar hızlı paket servis.`,
    en: `Craving the best ${name} in Istanbul? Handcrafted with fresh premium ingredients and authentic Asian techniques at Lucky Sushi & Chinese. ${description || ''} Express late night delivery until 04:00 AM.`,
    ru: `Попробуйте лучшие ${name} в Стамбуле от шеф-поваров Lucky Sushi & Chinese. Свежайшие ингредиенты, аутентичный вкус и ночная доставка до 04:00. ${description || ''}`,
    zh: `在伊斯坦布尔品尝最棒的 ${name}！Lucky Sushi & Chinese 选用新鲜食材每日现做，正宗亚洲风味。${description || ''} 营业至凌晨04:00支持极速外送。`,
  };

  const title = titleTemplates[locale] || titleTemplates.en;
  const metaDesc = (descTemplates[locale] || descTemplates.en).replace(/\s+/g, ' ').trim();
  const absoluteImageUrl = item.image ? `${BASE_SITE_URL}${item.image}` : `${BASE_SITE_URL}/logo-full-badge.png`;

  return {
    title,
    description: metaDesc,
    alternates,
    openGraph: {
      title,
      description: metaDesc,
      url: alternates.canonical,
      siteName: "Lucky Sushi & Chinese",
      images: [
        {
          url: absoluteImageUrl,
          width: 800,
          height: 800,
          alt: `${name} — Lucky Sushi & Chinese`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: metaDesc,
      images: [absoluteImageUrl],
    },
  };
}

export default async function ProductPage({ params }) {
  const { locale, slug } = await params;
  const item = menuItems.find((m) => m.id === slug);
  if (!item) return notFound();

  const { name, description } = getDishDetails(item, locale);
  const alternates = getRouteCanonicalAndAlternates(`/menu/${slug}`, locale);

  // Category Info
  const categoryObj = menuCategories.find((c) => c.id === item.category);
  const categoryLabel = categoryObj ? (categoryObj[`label_${locale}`] || categoryObj.label_en || categoryObj.label_tr) : '';

  // 4 Related Dishes from the same category
  const relatedDishes = menuItems
    .filter((m) => m.category === item.category && m.id !== item.id)
    .slice(0, 4);

  // Schema.org Structured Data
  const absoluteImageUrl = item.image ? `${BASE_SITE_URL}${item.image}` : `${BASE_SITE_URL}/logo-full-badge.png`;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${alternates.canonical}#product`,
        "name": name,
        "image": absoluteImageUrl,
        "description": description || `${name} — Lucky Sushi & Chinese`,
        "category": categoryLabel || "Sushi & Asian Food",
        "brand": {
          "@type": "Brand",
          "name": "Lucky Sushi & Chinese"
        },
        "offers": {
          "@type": "Offer",
          "price": item.price,
          "priceCurrency": "TRY",
          "availability": item.availability !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          "url": alternates.canonical,
          "seller": {
            "@type": "Restaurant",
            "name": "Lucky Sushi & Chinese",
            "telephone": "+90 531 486 34 04",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Alibeyköy, Çırçır Cd. 25 A",
              "addressLocality": "Eyüpsultan",
              "addressRegion": "İstanbul",
              "postalCode": "34060",
              "addressCountry": "TR"
            }
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "840",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": locale === 'ar' ? 'الرئيسية' : locale === 'tr' ? 'Ana Sayfa' : 'Home',
            "item": `${BASE_SITE_URL}/${locale === 'tr' ? '' : locale}`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": locale === 'ar' ? 'قائمة الطعام' : locale === 'tr' ? 'Menü' : 'Menu',
            "item": `${BASE_SITE_URL}/${locale === 'tr' ? '' : `${locale}/`}menu`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": name,
            "item": alternates.canonical
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailClient
        item={item}
        dishName={name}
        dishDescription={description}
        categoryLabel={categoryLabel}
        categorySlug={item.category}
        relatedDishes={relatedDishes}
      />
    </>
  );
}

