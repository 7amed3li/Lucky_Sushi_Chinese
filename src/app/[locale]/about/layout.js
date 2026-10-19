import { getRouteCanonicalAndAlternates } from '@/lib/seo';
import { generateBreadcrumbJsonLd } from '@/lib/structuredData';

const ABOUT_META = {
  tr: {
    title: "Hakkımızda — Hikayemiz & Asya Gece Mutfağı | Lucky Sushi & Chinese",
    description: "Eyüpsultan Alibeyköy'de doğan Lucky Sushi & Chinese: Taze Norveç somonu, yüksek ateşli wok erişteleri ve saat 04:00'e kadar süren lezzet yolculuğumuz.",
  },
  en: {
    title: "About Us — Our Story & Asian Kitchen | Lucky Sushi & Chinese",
    description: "Discover the story of Lucky Sushi & Chinese in Istanbul: Fresh salmon sushi, sizzling high-heat wok noodles, and authentic Asian culinary passion until 04:00 AM.",
  },
  ar: {
    title: "قصتنا — مطبخ إسطنبول الآسيوي الليلي | لاكي سوشي صيني",
    description: "تعرف على قصة لاكي سوشي صيني في أيوب سلطان، إسطنبول: نكهات السوشي الطازجة، ونودلز الووك الأصيلة بنار قوية، والخدمة المستمرة حتى الرابعة فجراً.",
  },
  ru: {
    title: "О нас — Наша история и азиатская кухня | Lucky Sushi & Chinese",
    description: "История Lucky Sushi & Chinese в Стамбуле: свежий норвежский лосось, аутентичный вок и ночная кухня до 04:00 утра в Эйюпсултане.",
  },
  zh: {
    title: "关于我们 — 品牌故事与深夜亚洲厨房 | Lucky Sushi & Chinese",
    description: "了解 Lucky Sushi & Chinese 的故事：严选新鲜三文鱼、猛火镬气面食与暖心拉面，为伊斯坦布尔提供营业至凌晨04:00的纯正亚洲美味。",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const alternates = getRouteCanonicalAndAlternates('/about', locale);
  const meta = ABOUT_META[locale] || ABOUT_META.tr;

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
          alt: "About Lucky Sushi & Chinese",
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

export default async function AboutLayout({ children, params }) {
  const { locale } = await params;
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: locale === 'ar' ? 'الرئيسية' : locale === 'en' ? 'Home' : 'Ana Sayfa', url: locale === 'tr' ? '/' : `/${locale}` },
    { name: locale === 'ar' ? 'قصتنا' : locale === 'en' ? 'Our Story' : 'Hikayemiz', url: locale === 'tr' ? '/about' : `/${locale}/about` },
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
