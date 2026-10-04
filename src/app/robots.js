export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lucky-sushi-chinese.vercel.app';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
