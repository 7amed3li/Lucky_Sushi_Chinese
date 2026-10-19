import { getRouteCanonicalAndAlternates } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const alternates = getRouteCanonicalAndAlternates('/contact', locale);

  return {
    alternates,
    openGraph: {
      url: alternates.canonical,
    },
  };
}

export default function ContactLayout({ children }) {
  return children;
}
