import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/context/LangContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | Lucky Sushi Chinese",
    default: "Lucky Sushi Chinese — Midnight Asian Menu",
  },
  description:
    "A midnight Asian menu where the food brings the color. Best sushi, ramen, noodles & Chinese food in Eyüpsultan, Istanbul. Open until 4AM. Delivery available.",
  keywords: ["sushi", "chinese food", "ramen", "istanbul", "eyüpsultan", "delivery", "سوشي", "مطعم"],
  openGraph: {
    title: "Lucky Sushi Chinese — Midnight Asian Menu",
    description:
      "A midnight Asian menu where the food brings the color. Sushi, ramen, noodles & Chinese food in Istanbul — open until 4AM.",
    siteName: "Lucky Sushi Chinese",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucky Sushi Chinese",
    description: "Midnight Asian menu — open until 4AM in Istanbul.",
  },
  robots: { index: true, follow: true },
  other: {
    "theme-color": "#111112",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <LangProvider defaultLang="tr">{children}</LangProvider>
      </body>
    </html>
  );
}
