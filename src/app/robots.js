export default function robots() {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.luckysushichinese.com.tr').replace(/\/$/, '');
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
