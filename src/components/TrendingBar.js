'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useLang } from '@/context/LangContext';
import { menuItems } from '@/data/menuData';

// Curated popular picks — IDs in display order
const TRENDING_IDS = [
  'set-canada',
  'sr-california-8',
  'set-salmon-lovers',
  'start-dynamite-shrimp',
  'sr-dragon',
  'soup-karides-ramen',
  'set-lucky-prestige',
  'sr-ebi-tempura',
];

export default function TrendingBar({ onOpen }) {
  const { lang, t } = useLang();
  const scrollRef = useRef(null);

  const trendingItems = TRENDING_IDS
    .map((id) => menuItems.find((m) => m.id === id))
    .filter(Boolean);

  const scrollBy = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction * 220,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="trending" style={{ position: 'relative' }}>
      {/* Scroll arrows (desktop) */}
      <button
        className="trending__arrow trending__arrow--left"
        onClick={() => scrollBy(-1)}
        aria-label="Scroll left"
        style={{
          position: 'absolute', top: '50%', left: '12px', zIndex: 5,
          transform: 'translateY(-50%)',
          width: '36px', height: '36px', borderRadius: '50%',
          background: 'rgba(255,253,248,0.9)', border: '1px solid rgba(185,148,82,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'var(--roasted-cacao)', fontSize: '0.9rem',
          boxShadow: '0 2px 8px rgba(52,43,37,0.06)',
        }}
      >
        ‹
      </button>
      <button
        className="trending__arrow trending__arrow--right"
        onClick={() => scrollBy(1)}
        aria-label="Scroll right"
        style={{
          position: 'absolute', top: '50%', right: '12px', zIndex: 5,
          transform: 'translateY(-50%)',
          width: '36px', height: '36px', borderRadius: '50%',
          background: 'rgba(255,253,248,0.9)', border: '1px solid rgba(185,148,82,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'var(--roasted-cacao)', fontSize: '0.9rem',
          boxShadow: '0 2px 8px rgba(52,43,37,0.06)',
        }}
      >
        ›
      </button>

      <div className="trending__scroll" ref={scrollRef}>
        {trendingItems.map((item) => {
          const name = t(item, 'name');
          const hasImage = item.image && item.image !== '/images/placeholder.jpg';
          const isBestseller = item.tags?.includes('bestseller');
          const isChef = item.tags?.includes('chefs-pick');
          const badgeLabel = isBestseller
            ? (lang === 'ar' ? 'الأكثر طلباً' : lang === 'tr' ? 'Çok Satan' : 'Best Seller')
            : isChef
            ? (lang === 'ar' ? 'اختيار الشيف' : lang === 'tr' ? 'Şef Seçimi' : "Chef's Pick")
            : null;

          return (
            <div
              key={item.id}
              className="trending__item"
              onClick={() => onOpen?.(item)}
              role="button"
              tabIndex={0}
              aria-label={name}
              onKeyDown={(e) => { if (e.key === 'Enter') onOpen?.(item); }}
            >
              <div className="trending__img-wrap">
                {hasImage ? (
                  <Image
                    src={item.image}
                    alt={name}
                    width={160}
                    height={160}
                    loading="lazy"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{
                    width: '100%', height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '2rem', opacity: 0.3,
                  }}>
                    🍣
                  </div>
                )}
              </div>
              <span className="trending__name">{name}</span>
              {badgeLabel && <span className="trending__badge">{badgeLabel}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
