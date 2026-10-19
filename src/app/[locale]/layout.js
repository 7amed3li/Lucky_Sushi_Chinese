import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { getLocale as getLocaleConfig } from '@/i18n/config/locales';

import { getRouteCanonicalAndAlternates } from '@/lib/seo';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();

  const alternates = getRouteCanonicalAndAlternates('', locale);

  return {
    alternates,
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
