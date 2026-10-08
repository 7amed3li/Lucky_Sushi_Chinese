import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { getLocale } from '@/i18n/config/locales';
import { CartProvider } from '@/context/CartContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lucky-sushi-chinese.vercel.app';
  const languages = Object.fromEntries(
    routing.locales.map((code) => [code, code === routing.defaultLocale ? baseUrl : `${baseUrl}/${code}`])
  );

  return {
    alternates: {
      canonical: locale === routing.defaultLocale ? baseUrl : `${baseUrl}/${locale}`,
      languages: { ...languages, 'x-default': baseUrl },
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const localeConfig = getLocale(locale);
  if (!localeConfig) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} dir={localeConfig.dir}>
      <body>
        <NextIntlClientProvider locale={locale} messages={await getMessages()}>
          <CurrencyProvider>
            <CartProvider>
              {children}
              <Footer />
              <MobileBottomBar />
            </CartProvider>
          </CurrencyProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
