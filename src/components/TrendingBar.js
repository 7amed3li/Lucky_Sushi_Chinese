'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useLang } from '@/context/LangContext';
import { menuItems } from '@/data/menuData';
import BrandedImagePlaceholder from './BrandedImagePlaceholder';

export default function TrendingBar({ onOpen }) {
  const { lang, t, tUI, dir } = useLang();
  const scrollRef = useRef(null);
  const [canScrollStart, setCanScrollStart] = useState(false);
  const [canScrollEnd, setCanScrollEnd] = useState(true);
  const [failedImages, setFailedImages] = useState({});

  // Curated list of best sellers and chef's picks across various categories
  const featuredList = useMemo(() => {
    // Priority IDs to ensure a rich variety of sets, rolls, ramen, starters, etc.
    const priorityIds = [
      'set-canada',
      'sr-california-8',
      'set-salmon-lovers',
      'soup-karides-ramen',
      'start-dynamite-shrimp',
      'cr-shrimp',
      'set-cooked-mix',
      'sr-dragon',
      'padthai-karides',
      'chicken-general-tso',
      'set-moriawase',
      'start-gyoza',
      'set-istanbul',
      'poke-salmon',
    ];

    const prioritized = priorityIds
      .map((id) => menuItems.find((item) => item.id === id))
      .filter(Boolean);

    // If needed, supplement with any remaining bestsellers with images
    const others = menuItems.filter(
      (item) =>
        (item.tags.includes('bestseller') || item.tags.includes('chefs-pick')) &&
        !priorityIds.includes(item.id) &&
        item.image
    );

    return [...prioritized, ...others].slice(0, 16);
  }, []);

  // Check scroll bounds
  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const current = Math.abs(el.scrollLeft);

    setCanScrollStart(current > 8);
    setCanScrollEnd(current < maxScroll - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener('scroll', updateScrollButtons, { passive: true });
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [updateScrollButtons, featuredList]);

  // Smooth scroll by distance
  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    // In RTL, scrollLeft behaves in reverse or negative depending on browser
    const isRtl = dir === 'rtl';
    const amount = 320;
    const scrollDelta = isRtl ? -direction * amount : direction * amount;
    el.scrollBy({ left: scrollDelta, behavior: 'smooth' });
  };

  const handleImageError = (id) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const getBadgeText = (item) => {
    if (item.tags.includes('bestseller')) {
      return {
        tr: '🔥 Çok Satan',
        en: '🔥 Best Seller',
        ar: '🔥 الأكثر طلباً',
        zh: '🔥 热卖',
      }[lang] || '🔥 Best Seller';
    }
    if (item.tags.includes('chefs-pick')) {
      return {
        tr: '⭐ Şef Seçimi',
        en: "⭐ Chef's Pick",
        ar: '⭐ اختيار الشيف',
        zh: '⭐ 主厨推荐',
      }[lang] || "⭐ Chef's Pick";
    }
    return null;
  };

  if (!featuredList.length) return null;

  return (
    <section
      className="trending-section"
      aria-label={tUI('trending_title')}
      id="trending-bar"
    >
      <div className="trending-container">
        {/* Header with Title and Desktop Controls */}
        <div className="trending-header">
          <div className="trending-header__text">
            <div className="trending-header__title-row">
              <span className="trending-icon" aria-hidden="true">🔥</span>
              <h2 className="trending-title">{tUI('trending_title')}</h2>
              <span className="trending-badge">{tUI('trending_badge')}</span>
            </div>
            <p className="trending-sub">{tUI('trending_sub')}</p>
          </div>

          {/* Desktop Arrow Controls */}
          <div className="trending-arrows" aria-hidden="true">
            <button
              type="button"
              className={`trending-arrow trending-arrow--prev${!canScrollStart ? ' trending-arrow--disabled' : ''}`}
              onClick={() => scroll(-1)}
              disabled={!canScrollStart}
              aria-label={tUI('scroll_left')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d={dir === 'rtl' ? 'm9 18 6-6-6-6' : 'm15 18-6-6 6-6'} />
              </svg>
            </button>
            <button
              type="button"
              className={`trending-arrow trending-arrow--next${!canScrollEnd ? ' trending-arrow--disabled' : ''}`}
              onClick={() => scroll(1)}
              disabled={!canScrollEnd}
              aria-label={tUI('scroll_right')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d={dir === 'rtl' ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'} />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Mini-Cards Track */}
        <div
          ref={scrollRef}
          className="trending-track no-scrollbar"
          tabIndex={0}
          role="region"
          aria-label={tUI('trending_title')}
        >
          {featuredList.map((item) => {
            const badge = getBadgeText(item);
            const hasValidImage = item.image && !failedImages[item.id];

            return (
              <article
                key={item.id}
                className="trending-card"
                onClick={() => onOpen(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpen(item);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`${t(item, 'name')} - ${item.price} ${item.currency}`}
              >
                {/* Image / Thumbnail Container */}
                <div className="trending-card__img-box">
                  {hasValidImage ? (
                    <img
                      src={item.image}
                      alt={t(item, 'name')}
                      className="trending-card__img"
                      loading="lazy"
                      onError={() => handleImageError(item.id)}
                    />
                  ) : (
                    <BrandedImagePlaceholder category={item.category} />
                  )}

                  {badge && (
                    <span className="trending-card__badge" aria-hidden="true">
                      {badge}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="trending-card__details">
                  <h3 className="trending-card__name" title={t(item, 'name')}>
                    {t(item, 'name')}
                  </h3>

                  {item.portion_or_pieces && (
                    <span className="trending-card__portion">
                      {item.portion_or_pieces}
                    </span>
                  )}

                  <div className="trending-card__bottom">
                    <span className="trending-card__price">
                      {item.price.toLocaleString()} <span className="trending-card__currency">{item.currency}</span>
                    </span>
                    <span className="trending-card__btn" aria-hidden="true">
                      +
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
