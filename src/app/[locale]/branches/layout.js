import { getRouteCanonicalAndAlternates } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const alternates = getRouteCanonicalAndAlternates('/branches', locale);

  return {
    alternates,
    openGraph: {
      url: alternates.canonical,
    },
  };
}

export default function BranchesLayout({ children }) {
  return children;
}
