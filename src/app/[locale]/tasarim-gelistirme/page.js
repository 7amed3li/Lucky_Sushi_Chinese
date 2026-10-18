'use client';

import React from 'react';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import DeveloperProfile from '@/components/DeveloperProfile';
import { devProfileContent } from '@/data/developerProfile';
import { useLang } from '@/context/LangContext';

export default function TasarimGelistirmePage() {
  const { lang } = useLang();
  const currentLang = lang || 'tr';
  const content = devProfileContent[currentLang] || devProfileContent.tr;
  const isRTL = currentLang === 'ar';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            name: content.meta?.title || 'Hamed Mohamed — Web Designer & Developer',
            description: content.meta?.description || '',
            mainEntity: {
              '@type': 'Person',
              name: content.hero?.name || 'Hamed Mohamed',
              jobTitle: content.hero?.role || 'Web Designer & Developer',
              url: 'https://hamedmohamed.dev/',
              sameAs: [
                'https://hamedmohamed.dev',
                'https://wa.me/905060453906',
              ],
            },
          }),
        }}
      />
      <Header />
      <main id="main-content">
        <DeveloperProfile content={content} isRTL={isRTL} lang={currentLang} />
      </main>
      <CartDrawer />
    </>
  );
}
