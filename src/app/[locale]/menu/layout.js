import { getRouteCanonicalAndAlternates } from '@/lib/seo';
import { generateMenuJsonLd, generateBreadcrumbJsonLd } from '@/lib/structuredData';

const MENU_META = {
  tr: {
    title: "Menü — Sushi Setleri, Noodle, Wok & Ramen | Lucky Sushi & Chinese",
    description: "Lucky Sushi & Chinese güncel menüsü: 181 çeşit taze sushi setleri, sıcak wok lezzetleri, çıtır roll'lar ve ramen çeşitleri. Eyüpsultan, Alibeyköy sipariş verin.",
  },
  en: {
    title: "Menu — Fresh Sushi Sets, Wok, Noodles & Ramen | Lucky Sushi & Chinese",
    description: "Explore our full menu: 181 authentic Asian dishes, specialty sushi rolls, sizzling wok noodles, and hearty ramen. Delivery & takeaway in Istanbul.",
  },
  ar: {
    title: "قائمة الطعام — أطقم السوشي، النودلز والرامن | لاكي سوشي صيني",
    description: "استكشف قائمتنا الكاملة: 181 صنفاً من السوشي الطازج، الرولز المقرمشة، نودلز الووك والرامن الساخن. توصيل واستلام في إسطنبول.",
  },
  ru: {
    title: "Меню — Сеты суши, лапша вок и рамен | Lucky Sushi & Chinese",
    description: "Полное меню Lucky Sushi & Chinese: 181 азиатское блюдо, авторские роллы, горячий вок и сытный рамен с доставкой по Стамбулу.",
  },
  zh: {
    title: "菜单 — 新鲜寿司组合、炒面与拉面 | Lucky Sushi & Chinese",
    description: "浏览 Lucky Sushi & Chinese 完整菜单：181款精选亚洲美食、特色寿司卷、经典炒面与拉面，伊斯坦布尔快捷外送与自提。",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const alternates = getRouteCanonicalAndAlternates('/menu', locale);
  const meta = MENU_META[locale] || MENU_META.tr;

  return {
    title: meta.title,
    description: meta.description,
    alternates,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: alternates.canonical,
      siteName: "Lucky Sushi & Chinese",
      images: [
        {
          url: "/logo-full-badge.png",
          width: 800,
          height: 600,
          alt: "Lucky Sushi & Chinese Menu",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/logo-full-badge.png"],
    },
  };
}

export default async function MenuLayout({ children, params }) {
  const { locale } = await params;
  const menuJsonLd = generateMenuJsonLd(locale);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: locale === 'ar' ? 'الرئيسية' : locale === 'en' ? 'Home' : 'Ana Sayfa', url: locale === 'tr' ? '/' : `/${locale}` },
    { name: locale === 'ar' ? 'قائمة الطعام' : locale === 'en' ? 'Menu' : 'Menü', url: locale === 'tr' ? '/menu' : `/${locale}/menu` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
