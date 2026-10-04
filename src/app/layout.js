import { DM_Serif_Display, Manrope } from "next/font/google";
import "./globals.css";
import "./footer.css";
import { LangProvider } from "@/context/LangContext";
import { CartProvider } from "@/context/CartContext";
import Footer from "@/components/Footer";
import { generateRestaurantJsonLd } from "@/lib/structuredData";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lucky-sushi-chinese.vercel.app';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: "%s | Lucky Sushi Chinese — Istanbul",
    default: "Lucky Sushi Chinese — Sushi & Asya Mutfağı · Eyüpsultan, İstanbul",
  },
  description:
    "Taze sushi setleri, sıcak wok lezzetleri ve doyurucu ramenler. Eyüpsultan, İstanbul. Gece 04:00'e kadar açık. Paket servis mevcuttur.",
  keywords: [
    "sushi istanbul", "çin yemeği istanbul", "ramen istanbul", "eyüpsultan sushi",
    "asya mutfağı", "paket servis sushi", "lucky sushi", "sushi delivery istanbul",
    "سوشي اسطنبول", "مطعم صيني", "寿司 伊斯坦布尔"
  ],
  openGraph: {
    title: "Lucky Sushi Chinese — Sushi & Asya Mutfağı · İstanbul",
    description:
      "Taze sushi, sıcak Asya yemekleri. Eyüpsultan, İstanbul — Gece 04:00'e kadar açık.",
    siteName: "Lucky Sushi Chinese",
    locale: "tr_TR",
    alternateLocale: ["en_US", "ar_SA", "zh_CN"],
    type: "website",
    url: baseUrl,
    images: [
      {
        url: "/logo-full-badge.png",
        width: 800,
        height: 600,
        alt: "Lucky Sushi Chinese Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucky Sushi Chinese — Sushi & Asian Kitchen",
    description: "Contemporary sushi & Asian kitchen — open until 4AM in Istanbul.",
    images: ["/logo-full-badge.png"],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: baseUrl,
    languages: {
      'tr': baseUrl,
      'en': baseUrl,
      'ar': baseUrl,
      'zh': baseUrl,
      'x-default': baseUrl,
    },
  },
  other: {
    "theme-color": "#F3E8D2",
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
  themeColor: '#F3E8D2',
};

export default function RootLayout({ children }) {
  const restaurantJsonLd = generateRestaurantJsonLd();

  return (
    <html lang="tr" dir="ltr" className={`${dmSerif.variable} ${manrope.variable}`}>
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
          <CartProvider>
            {children}
            <Footer />
          </CartProvider>
        </LangProvider>
      </body>
    </html>
  );
}
