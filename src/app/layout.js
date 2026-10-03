import { DM_Serif_Display, Manrope } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/context/LangContext";
import { CartProvider } from "@/context/CartContext";

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

export const metadata = {
  title: {
    template: "%s | Lucky Sushi Chinese",
    default: "Lucky Sushi Chinese — Contemporary Sushi & Asian Kitchen · Istanbul",
  },
  description:
    "Fresh sushi, warm Asian dishes, and details crafted to be craved from first glance. Eyüpsultan, Istanbul. Open until 4AM. Delivery available.",
  keywords: ["sushi", "chinese food", "ramen", "istanbul", "eyüpsultan", "delivery", "سوشي", "مطعم", "sushi istanbul"],
  openGraph: {
    title: "Lucky Sushi Chinese — Contemporary Sushi & Asian Kitchen",
    description:
      "Fresh sushi, warm Asian dishes, and details crafted to be craved. Eyüpsultan, Istanbul — open until 4AM.",
    siteName: "Lucky Sushi Chinese",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucky Sushi Chinese",
    description: "Contemporary sushi & Asian kitchen — open until 4AM in Istanbul.",
  },
  robots: { index: true, follow: true },
  other: {
    "theme-color": "#F3E8D2",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={`${dmSerif.variable} ${manrope.variable}`}>
      <head>
        {/* Arabic & secondary font imports via CSS @import in globals.css */}
      </head>
      <body>
        <LangProvider defaultLang="tr">
          <CartProvider>{children}</CartProvider>
        </LangProvider>
      </body>
    </html>
  );
}
