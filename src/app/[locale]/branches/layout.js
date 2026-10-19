import { getRouteCanonicalAndAlternates } from '@/lib/seo';
import { generateBreadcrumbJsonLd } from '@/lib/structuredData';

const BRANCHES_META = {
  tr: {
    title: "Şubelerimiz & Konumlar — Alibeyköy, Zeytinburnu, Sarıyer | Lucky Sushi & Chinese",
    description: "Lucky Sushi & Chinese İstanbul şubeleri: Alibeyköy (Merkez Restoran & Gel-Al), Zeytinburnu (Gel-Al & Paket Servis), Sarıyer Reşitpaşa (Paket Servis Mutfak).",
  },
  en: {
    title: "Our Branches & Locations — Alibeyköy, Zeytinburnu, Sarıyer | Lucky Sushi & Chinese",
    description: "Find Lucky Sushi & Chinese branches in Istanbul: Alibeyköy (Dine-in & Takeaway), Zeytinburnu (Pickup & Delivery), and Sarıyer Reşitpaşa (Delivery Cloud Kitchen).",
  },
  ar: {
    title: "فروعنا في إسطنبول — أليبي كوي، زيتون بورنو، ساريير | لاكي سوشي صيني",
    description: "فروع لاكي سوشي صيني في إسطنبول: فرع أليبي كوي (مطعم وجلسات)، زيتون بورنو (استلام وتوصيل)، وساريير ريشيت باشا (مطبخ توصيل سحابي).",
  },
  ru: {
    title: "Наши филиалы в Стамбуле — Алибейкёй, Зейтинбурну, Сарыер | Lucky Sushi & Chinese",
    description: "Филиалы Lucky Sushi & Chinese в Стамбуле: Алибейкёй (главный ресторан), Зейтинбурну (самовывоз и доставка), Сарыер Решитпаша (кухня доставки).",
  },
  zh: {
    title: "分店地址与营业指南 — 阿里贝科伊、宰廷布尔努、萨勒耶尔 | Lucky Sushi & Chinese",
    description: "Lucky Sushi & Chinese 伊斯坦布尔分店信息：阿里贝科伊（堂食与自提总店）、宰廷布尔努（自提与外送）及萨勒耶尔（专属外送厨房）。",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const alternates = getRouteCanonicalAndAlternates('/branches', locale);
  const meta = BRANCHES_META[locale] || BRANCHES_META.tr;

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
          alt: "Lucky Sushi & Chinese Branches",
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

export default async function BranchesLayout({ children, params }) {
  const { locale } = await params;
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: locale === 'ar' ? 'الرئيسية' : locale === 'en' ? 'Home' : 'Ana Sayfa', url: locale === 'tr' ? '/' : `/${locale}` },
    { name: locale === 'ar' ? 'فروعنا وتواصل معنا' : locale === 'en' ? 'Branches & Contact' : 'Şubelerimiz & İletişim', url: locale === 'tr' ? '/branches' : `/${locale}/branches` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
