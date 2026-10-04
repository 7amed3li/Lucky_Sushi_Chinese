export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lucky-sushi-chinese.vercel.app';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          tr: baseUrl,
          en: baseUrl,
          ar: baseUrl,
          ru: baseUrl,
          fa: baseUrl,
          fr: baseUrl,
          zh: baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          tr: `${baseUrl}/menu`,
          en: `${baseUrl}/menu`,
          ar: `${baseUrl}/menu`,
          ru: `${baseUrl}/menu`,
          fa: `${baseUrl}/menu`,
          fr: `${baseUrl}/menu`,
          zh: `${baseUrl}/menu`,
        },
      },
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: {
        languages: {
          tr: `${baseUrl}/about`,
          en: `${baseUrl}/about`,
          ar: `${baseUrl}/about`,
          ru: `${baseUrl}/about`,
          fa: `${baseUrl}/about`,
          fr: `${baseUrl}/about`,
          zh: `${baseUrl}/about`,
        },
      },
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          tr: `${baseUrl}/contact`,
          en: `${baseUrl}/contact`,
          ar: `${baseUrl}/contact`,
          ru: `${baseUrl}/contact`,
          fa: `${baseUrl}/contact`,
          fr: `${baseUrl}/contact`,
          zh: `${baseUrl}/contact`,
        },
      },
    },
  ];
}
