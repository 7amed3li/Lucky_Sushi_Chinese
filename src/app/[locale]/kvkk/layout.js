import { getRouteCanonicalAndAlternates } from '@/lib/seo';

const KVKK_META = {
  tr: {
    title: "Kişisel Verilerin Korunması & Gizlilik (KVKK) | Lucky Sushi & Chinese",
    description: "Lucky Sushi & Chinese KVKK aydınlatma metni, gizlilik politikası ve çerez bilgilendirmesi.",
  },
  en: {
    title: "Privacy & Data Protection Policy (KVKK) | Lucky Sushi & Chinese",
    description: "Lucky Sushi & Chinese data protection policy, privacy notice, and customer information under applicable laws.",
  },
  ar: {
    title: "سياسة الخصوصية وحماية البيانات الشخصية (KVKK) | لاكي سوشي صيني",
    description: "إشعار الخصوصية وحماية البيانات الشخصية لعملاء لاكي سوشي صيني في تركيا.",
  },
  ru: {
    title: "Политика конфиденциальности и защита данных (KVKK) | Lucky Sushi & Chinese",
    description: "Уведомление о защите персональных данных и политика конфиденциальности Lucky Sushi & Chinese.",
  },
  zh: {
    title: "隐私政策与个人数据保护 (KVKK) | Lucky Sushi & Chinese",
    description: "Lucky Sushi & Chinese 个人数据保护政策与用户隐私说明指南。",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const alternates = getRouteCanonicalAndAlternates('/kvkk', locale);
  const meta = KVKK_META[locale] || KVKK_META.tr;

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
          alt: "KVKK Lucky Sushi & Chinese",
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

export default function KvkkLayout({ children }) {
  return children;
}
