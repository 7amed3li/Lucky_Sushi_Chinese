import { getRouteCanonicalAndAlternates } from '@/lib/seo';
import { generateBreadcrumbJsonLd } from '@/lib/structuredData';

const DEV_META = {
  tr: {
    title: "Tasarım ve Geliştirme — Hamed Mohamed | Full-Stack Yazılım Mühendisi",
    description: "Lucky Sushi & Chinese web sitesi tasarım ve teknik geliştirme süreçleri: Bilgisayar Mühendisliği mezunu Hamed Mohamed'in mühendislik yaklaşımı ve mimari kararları.",
  },
  en: {
    title: "Design & Development — Hamed Mohamed | Full-Stack Software Engineer",
    description: "Technical design and development of Lucky Sushi & Chinese: Engineering approach, architecture, and implementation by Hamed Mohamed, Full-Stack Software Engineer.",
  },
  ar: {
    title: "التصميم والتطوير — حامد محمد | مهندس برمجيات متكامل",
    description: "تصميم وتطوير موقع Lucky Sushi & Chinese: الرؤية الهندسية، معمارية الأنظمة والحلول التقنية للمطور حامد محمد، مهندس برمجيات متكامل وخريج هندسة الحاسوب.",
  },
  ru: {
    title: "Дизайн и разработка — Хамед Мохамед | Full-Stack инженер-программист",
    description: "Технический дизайн и разработка веб-сайта Lucky Sushi & Chinese: инженерный подход и архитектурные решения от инженера-программиста Хамеда Мохамеда.",
  },
  zh: {
    title: "设计与开发 — Hamed Mohamed | 全栈软件工程师",
    description: "Lucky Sushi & Chinese 网站技术设计与开发实践：计算机工程毕业生 Hamed Mohamed 的系统架构、多语言实现与技术栈。",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const alternates = getRouteCanonicalAndAlternates('/tasarim-gelistirme', locale);
  const meta = DEV_META[locale] || DEV_META.tr;

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
          alt: "Tasarım ve Geliştirme — Hamed Mohamed",
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

export default async function DeveloperLayout({ children, params }) {
  const { locale } = await params;
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: locale === 'ar' ? 'الرئيسية' : locale === 'en' ? 'Home' : 'Ana Sayfa', url: locale === 'tr' ? '/' : `/${locale}` },
    { name: locale === 'ar' ? 'التصميم والتطوير' : locale === 'en' ? 'Design & Development' : 'Tasarım ve Geliştirme', url: locale === 'tr' ? '/tasarim-gelistirme' : `/${locale}/tasarim-gelistirme` },
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
