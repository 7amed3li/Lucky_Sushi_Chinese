import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { getLocale as getLocaleConfig } from '@/i18n/config/locales';

import { getRouteCanonicalAndAlternates } from '@/lib/seo';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const HOMEPAGE_META = {
  tr: {
    title: "Lucky Sushi & Chinese — Sushi & Asya Mutfağı · Eyüpsultan, İstanbul",
    description: "Taze sushi setleri, sıcak wok lezzetleri ve doyurucu ramenler. Eyüpsultan, Alibeyköy, İstanbul. Gece 04:00'e kadar açık. Paket servis mevcuttur.",
  },
  en: {
    title: "Lucky Sushi & Chinese — Fresh Sushi & Asian Kitchen · Istanbul",
    description: "Fresh sushi sets, sizzling wok noodles, and comforting ramen in Istanbul (Eyüpsultan, Alibeyköy). Open until 04:00 AM. Delivery & takeaway available.",
  },
  ar: {
    title: "لاكي سوشي صيني — سوشي ونكهات آسيوية أصيلة · إسطنبول",
    description: "أشهى أطقم السوشي الطازجة، ونودلز الووك الساخنة والرامن في إسطنبول (أيوب سلطان، أليبي كوي). مفتوح حتى 04:00 فجراً. توصيل واستلام مباشر.",
  },
  ru: {
    title: "Lucky Sushi & Chinese — Свежие суши и азиатская кухня · Стамбул",
    description: "Свежие сеты суши, горячая лапша вок и сытный рамен в Стамбуле (Эйюпсултан, Алибейкёй). Открыто до 04:00 утра. Доставка и самовывоз.",
  },
  zh: {
    title: "Lucky Sushi & Chinese — 新鲜寿司与亚洲美食 · 伊斯坦布尔",
    description: "新鲜三文鱼寿司组合、经典镬气炒面及暖心拉面。伊斯坦布尔埃于普苏丹，营业至凌晨04:00，支持外送与自提。",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();

  const alternates = getRouteCanonicalAndAlternates('', locale);
  const meta = HOMEPAGE_META[locale] || HOMEPAGE_META.tr;

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
          alt: "Lucky Sushi & Chinese",
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

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const localeConfig = getLocaleConfig(locale);
  if (!localeConfig) notFound();
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={await getMessages()}>
      {children}
    </NextIntlClientProvider>
  );
}
