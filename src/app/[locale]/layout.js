import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { getLocale as getLocaleConfig } from '@/i18n/config/locales';

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
  const localeConfig = getLocaleConfig(locale);
  if (!localeConfig) notFound();
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={await getMessages()}>
      {children}
    </NextIntlClientProvider>
  );
}
