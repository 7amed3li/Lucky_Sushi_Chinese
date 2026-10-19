import { getRouteCanonicalAndAlternates } from '@/lib/seo';
import { generateBreadcrumbJsonLd } from '@/lib/structuredData';

const CONTACT_META = {
  tr: {
    title: "İletişim & Sipariş Hatları | Lucky Sushi & Chinese İstanbul",
    description: "Lucky Sushi & Chinese iletişim bilgileri: Alibeyköy merkez, Zeytinburnu ve Sarıyer şubeleri telefon, WhatsApp ve adres detayları. Gece 04:00'e kadar açık.",
  },
  en: {
    title: "Contact & Direct Ordering Lines | Lucky Sushi & Chinese Istanbul",
    description: "Get in touch with Lucky Sushi & Chinese: Phone numbers, WhatsApp ordering, and addresses for our Alibeyköy, Zeytinburnu, and Sarıyer branches.",
  },
  ar: {
    title: "اتصل بنا وخطوط الطلب المباشر | لاكي سوشي صيني إسطنبول",
    description: "معلومات التواصل مع لاكي سوشي صيني: أرقام الهواتف، وخطوط طلب الواتساب، وعناوين فروعنا في أليبي كوي، زيتون بورنو، وساريير. مفتوح حتى 04:00 فجراً.",
  },
  ru: {
    title: "Контакты и телефоны заказа | Lucky Sushi & Chinese Стамбул",
    description: "Свяжитесь с Lucky Sushi & Chinese: контактные телефоны, WhatsApp для заказов и адреса филиалов в Алибейкёй, Зейтинбурну и Сарыере.",
  },
  zh: {
    title: "联系我们与订餐热线 | Lucky Sushi & Chinese 伊斯坦布尔",
    description: "Lucky Sushi & Chinese 联系方式：阿里贝科伊、宰廷布尔努及萨勒耶尔分店电话、WhatsApp在线订餐热线及门店地址。营业至凌晨04:00。",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const alternates = getRouteCanonicalAndAlternates('/contact', locale);
  const meta = CONTACT_META[locale] || CONTACT_META.tr;

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
          alt: "Contact Lucky Sushi & Chinese",
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

export default async function ContactLayout({ children, params }) {
  const { locale } = await params;
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: locale === 'ar' ? 'الرئيسية' : locale === 'en' ? 'Home' : 'Ana Sayfa', url: locale === 'tr' ? '/' : `/${locale}` },
    { name: locale === 'ar' ? 'اتصل بنا' : locale === 'en' ? 'Contact' : 'İletişim & Sipariş Hatları', url: locale === 'tr' ? '/contact' : `/${locale}/contact` },
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
