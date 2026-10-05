import { Noto_Sans, Noto_Serif } from "next/font/google";
import "./globals.css";
import "./footer.css";
import { LangProvider } from "@/context/LangContext";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import { generateRestaurantJsonLd } from "@/lib/structuredData";

const notoSans = Noto_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-noto-sans",
  display: "swap",
});

const notoSerif = Noto_Serif({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
  variable: "--font-noto-serif",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lucky-sushi-chinese.vercel.app';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: "%s | Lucky Sushi & Chinese — Istanbul",
    default: "Lucky Sushi & Chinese — Sushi & Asya Mutfağı · Eyüpsultan, İstanbul",
  },
  description:
    "Taze sushi setleri, sıcak wok lezzetleri ve doyurucu ramenler. Eyüpsultan, Alibeyköy, İstanbul. Gece 04:00'e kadar açık. Paket servis mevcuttur.",
  keywords: [
    "sushi istanbul", "sushi eyüpsultan", "sushi alibeyköy", "çin restoranı istanbul",
    "ramen istanbul", "wok istanbul", "asya mutfağı istanbul", "gece açık sushi istanbul",
    "late night sushi istanbul", "sushi delivery istanbul", "lucky sushi",
    "سوشي اسطنبول", "مطعم اسيوي اسطنبول", "مطعم صيني اسطنبول", "寿司 伊斯坦布尔", "суши стамбул"
  ],
  openGraph: {
    title: "Lucky Sushi & Chinese — Sushi & Asya Mutfağı · İstanbul",
    description:
      "Taze sushi, sıcak wok ve ramen lezzetleri. Eyüpsultan Alibeyköy, İstanbul — Gece 04:00'e kadar açık.",
    siteName: "Lucky Sushi & Chinese",
    locale: "tr_TR",
    alternateLocale: ["en_US", "ar_SA", "ru_RU", "zh_CN"],
    type: "website",
    url: baseUrl,
    images: [
      {
        url: "/logo-full-badge.png",
        width: 800,
        height: 600,
        alt: "Lucky Sushi & Chinese Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucky Sushi & Chinese — Sushi & Asian Kitchen",
    description: "Contemporary sushi & Asian kitchen — open until 04:00 AM in Eyüpsultan, Istanbul.",
    images: ["/logo-full-badge.png"],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: baseUrl,
    languages: {
      'tr': baseUrl,
      'en': baseUrl,
      'ar': baseUrl,
      'ru': baseUrl,
      'zh': baseUrl,
      'x-default': baseUrl,
    },
  },
  other: {
    "theme-color": "#F6F1E8",
    "color-scheme": "light",
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  manifest: '/manifest.json',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#F6F1E8',
};

export default function RootLayout({ children }) {
  const restaurantJsonLd = generateRestaurantJsonLd();

  return (
    <html lang="tr" dir="ltr" className={`${notoSerif.variable} ${notoSans.variable}`}>
      <head>
        {/* Structured Data: Restaurant */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
        {/* Arabic & secondary font imports via CSS @import in globals.css */}
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <LangProvider defaultLang="tr">
          <CurrencyProvider>
            <CartProvider>
            {children}
            <Footer />
            <MobileBottomBar />
          </CartProvider>
          </CurrencyProvider>
        </LangProvider>
      </body>
    </html>
  );
}
