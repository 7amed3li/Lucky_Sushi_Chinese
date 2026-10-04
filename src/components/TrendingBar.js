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

  const activeLang = lang || 'tr';
  const getBestSellersTitle = () => {
    if (activeLang === 'ar') return 'الأكثر مبيعاً';
    if (activeLang === 'tr') return 'En Çok Satanlar';
    if (activeLang === 'zh') return '热卖菜品';
    return 'Best Sellers';
  };

  const trendingItems = TRENDING_IDS
    .map((id) => menuItems.find((m) => m.id === id))
    .filter(Boolean);

  return (
    <div className="trending-showcase">
      <div className="trending-showcase__inner">
        <h2 className="trending-showcase__title">
          <span style={{ fontSize: '1rem', color: '#B99452' }}>🍱</span>
          <span>{getBestSellersTitle()}</span>
        </h2>
        
        <div 
          className="trending__scroll" 
          ref={scrollRef}
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {trendingItems.map((item) => {
            const name = t(item, 'name');
            const hasImage = item.image && item.image !== '/images/placeholder.jpg';
            const isBestseller = item.tags?.includes('bestseller');
            const isChef = item.tags?.includes('chefs-pick');
            const badgeLabel = isBestseller
              ? (lang === 'ar' ? 'الأكثر طلباً' : lang === 'tr' ? 'Çok Satan' : lang === 'zh' ? '热卖' : 'Best Seller')
              : isChef
              ? (lang === 'ar' ? 'اختيار الشيف' : lang === 'tr' ? 'Şef Seçimi' : lang === 'zh' ? '主厨' : "Chef's Pick")
              : (lang === 'tr' ? 'Popüler' : 'Popular');

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
                <div className="trending__img-container">
                  <div className="trending__img-wrap">
                    {hasImage ? (
                      <Image
                        src={item.image}
                        alt={name}
                        fill
                        sizes="(max-width: 640px) 68px, 80px"
                        loading="lazy"
                        style={{ objectFit: 'contain', padding: '2px' }}
                      />
                    ) : (
                      <div style={{
                        width: '100%', height: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.4rem', opacity: 0.4,
                      }}>
                        🍣
                      </div>
                    )}
                  </div>
                  {badgeLabel && (
                    <div className="trending__badge-wrap">
                      <span className="trending__badge">{badgeLabel}</span>
                    </div>
                  )}
                </div>
                <span className="trending__name">{name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
