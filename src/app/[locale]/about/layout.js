import { getRouteCanonicalAndAlternates } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const alternates = getRouteCanonicalAndAlternates('/about', locale);

  return {
    alternates,
    openGraph: {
      url: alternates.canonical,
    },
  };
}

export default function AboutLayout({ children }) {
  return children;
}
