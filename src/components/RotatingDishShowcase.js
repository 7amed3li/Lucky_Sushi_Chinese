'use client';

import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { GiSushis, GiChopsticks } from 'react-icons/gi';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { useLang } from '@/context/LangContext';
import { menuItems } from '@/data/menuData';

// All top best-sellers and chef picks with confirmed real photographs
const POPULAR_IDS = [
  // Pair 1: Iconic Sushi Sets
  'set-canada',
  'set-salmon-lovers',
  // Pair 2: Classic Signature Rolls
  'sr-california-8',
  'sr-philadelphia-8',
  // Pair 3: Cooked & Tempura Rolls
  'sr-dragon',
  'sr-ebi-tempura',
  // Pair 4: Hot Appetizers & Authentic Ramen
  'start-dynamite-shrimp',
  'soup-karides-ramen',
  // Pair 5: Grand Sharing Sets
  'set-cooked-mix',
  'set-lucky-prestige',
  // Pair 6: Crunchy & Green Dragon Rolls
  'cr-california',
  'sr-green-dragon',
  // Pair 7: Special Salmon & Crispy Philly
  'sr-crazy-salmon',
  'cr-philadelphia',
  // Pair 8: Dumplings & Wok Noodles
  'start-gyoza',
  'noodle-tavuklu',
  // Pair 9: Chinese Hot Wok Specialties
  'chicken-general-tso',
  'padthai-karides',
];

const BADGE_MAP = {
  'bestseller': {
    tr: 'Çok Satan', en: 'Best Seller', ar: 'الأكثر طلباً', zh: '热卖',
    ru: 'Бестселлер', fa: 'پرفروش‌ترین', fr: 'Meilleure Vente',
    bg: 'var(--color-brand-primary)', color: '#FFFFFF',
  },
  'chefs-pick': {
    tr: 'Şef Seçimi', en: "Chef's Pick", ar: 'اختيار الشيف', zh: '主厨推荐',
    ru: 'Выбор шефа', fa: 'انتخاب سرآشپز', fr: 'Choix du Chef',
    bg: 'var(--color-accent)', color: '#FFFFFF',
  },
};

function getBadge(tags, lang) {
  if (tags?.includes('bestseller')) {
    const b = BADGE_MAP.bestseller;
    return { label: b[lang] || b.en, bg: b.bg, color: b.color };
  }
  if (tags?.includes('chefs-pick')) {
    const b = BADGE_MAP['chefs-pick'];
    return { label: b[lang] || b.en, bg: b.bg, color: b.color };
  }
  return null;
}

function formatPortion(portion, lang) {
  if (!portion) return '';
  if (lang === 'ar') {
    return portion
      .replace(/(\d+)\s*pcs/i, '$1 قطعة')
      .replace(/(\d+)\s*bowl/i, '$1 وعاء')
      .replace(/(\d+)\s*portion/i, '$1 حصة');
  }
  if (lang === 'tr') {
    return portion
      .replace(/(\d+)\s*pcs/i, '$1 Adet')
      .replace(/(\d+)\s*bowl/i, '$1 Kase')
      .replace(/(\d+)\s*portion/i, '$1 Porsiyon');
  }
  return portion;
}

export default function RotatingDishShowcase({ onOpen }) {
  const { lang, t, dir } = useLang();
  // pairIndex controls which PAIR of images is in the spinner
  const [pairIndex, setPairIndex] = useState(0);
  // displayIndex is whichever dish info we show in the card
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);
  const pauseTimeoutRef = useRef(null);

  const activeLang = lang || 'tr';
  const getSectionTitle = () => {
    if (activeLang === 'ar') return 'الأكثر طلباً واختياراتنا';
    if (activeLang === 'tr') return 'En Çok Tercih Edilenler';
    if (activeLang === 'zh') return '热门精选与推荐';
    if (activeLang === 'ru') return 'Популярные блюда';
    if (activeLang === 'fa') return 'محبوب‌ترین‌ها';
    if (activeLang === 'fr') return 'Nos Meilleurs Choix';
    return 'Top Picks & Best Sellers';
  };

  const getSectionBadge = () => {
    if (activeLang === 'ar') return 'أطباق مميزة';
    if (activeLang === 'tr') return 'ÖNE ÇIKANLAR';
    if (activeLang === 'zh') return '精选推荐';
    if (activeLang === 'ru') return 'Рекомендации';
    if (activeLang === 'fa') return 'پیشنهاد ویژه';
    if (activeLang === 'fr') return 'Sélection';
    return 'SIGNATURE PICKS';
  };

  const getOrderBtnText = () => {
    if (activeLang === 'ar') return 'عرض الطبق والطلب';
    if (activeLang === 'tr') return 'Detaylar ve Sipariş';
    if (activeLang === 'zh') return '详情与点餐';
    if (activeLang === 'ru') return 'Заказать';
    if (activeLang === 'fa') return 'مشاهده و سفارش';
    if (activeLang === 'fr') return 'Détails & Commande';
    return 'Details & Order';
  };

  const items = POPULAR_IDS
    .map((id) => menuItems.find((m) => m.id === id))
    .filter(Boolean);

  const totalPairs = Math.ceil(items.length / 2);

  const imgA = items[pairIndex * 2] || items[0];
  const imgB = items[pairIndex * 2 + 1] || items[0];

  const goToPair = useCallback((newPair) => {
    setPairIndex(newPair);
    setDisplayIndex(newPair * 2);
    setAnimKey((k) => k + 1);
  }, []);

  const nextPair = useCallback(() => {
    goToPair((pairIndex + 1) % totalPairs);
  }, [pairIndex, totalPairs, goToPair]);

  const prevPair = useCallback(() => {
    goToPair((pairIndex - 1 + totalPairs) % totalPairs);
  }, [pairIndex, totalPairs, goToPair]);

  // Auto-advance pair every 6s (matches 720deg CSS keyframe duration)
  useEffect(() => {
    if (isPaused || totalPairs <= 1) return;
    const interval = setInterval(() => {
      nextPair();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextPair, totalPairs]);

  // Toggle display info between the two images mid-cycle (at ~3s)
  useEffect(() => {
    if (isPaused) return;
    const timeout = setTimeout(() => {
      setDisplayIndex(pairIndex * 2 + 1 < items.length ? pairIndex * 2 + 1 : pairIndex * 2);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [pairIndex, animKey, isPaused, items.length]);

  const triggerTempPause = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 6000);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    triggerTempPause();
  };
  const handleTouchMove = (e) => {
    if (!touchStartX.current) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const handleTouchEnd = () => {
    if (!touchStartX.current) return;
    const delta = touchDeltaX.current;
    const threshold = 35;
    if (Math.abs(delta) > threshold) {
      if (dir === 'rtl') { delta > threshold ? nextPair() : prevPair(); }
      else { delta < -threshold ? nextPair() : prevPair(); }
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  const currentItem = items[displayIndex] || items[0];
  const badge = getBadge(currentItem?.tags, lang);
  const dishName = currentItem ? t(currentItem, 'name') : '';

  return (
    <section
      className={`dish-showcase ${isPaused ? 'is-paused' : ''}`}
      aria-label={getSectionTitle()}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="dish-showcase__inner">
        {/* Header */}
        <div className="dish-showcase__header">
          <span className="home-section-badge">
            <GiSushis style={{ marginInlineEnd: '6px' }} aria-hidden="true" />
            {getSectionBadge()}
          </span>
          <h2 className="dish-showcase__title">{getSectionTitle()}</h2>
        </div>

        {/* Slider Arena */}
        <div className="dish-showcase__arena">
          {/* Previous Arrow */}
          <button
            type="button"
            className="dish-showcase__arrow dish-showcase__arrow--prev"
            onClick={() => { triggerTempPause(); dir === 'rtl' ? nextPair() : prevPair(); }}
            aria-label="Previous"
          >
            {dir === 'rtl' ? <FaChevronRight /> : <FaChevronLeft />}
          </button>

          {/* ═══ THE SIGNATURE SPINNING PLATE (720deg rotation + crossfade) ═══ */}
          <div
            className="dish-showcase__plate-wrapper"
            onClick={() => onOpen?.(currentItem)}
            role="button"
            tabIndex={0}
            aria-label={dishName}
            onKeyDown={(e) => { if (e.key === 'Enter') onOpen?.(currentItem); }}
          >
            <div className="dish-showcase__plate-rim" key={animKey}>
              <Image
                src={imgA.image}
                alt={t(imgA, 'name')}
                fill
                sizes="(max-width: 480px) 270px, 340px"
                priority
                className="dish-showcase__plate-img dish-plate-1"
              />
              <Image
                src={imgB.image}
                alt={t(imgB, 'name')}
                fill
                sizes="(max-width: 480px) 270px, 340px"
                className="dish-showcase__plate-img dish-plate-2"
              />
            </div>
          </div>

          {/* Next Arrow */}
          <button
            type="button"
            className="dish-showcase__arrow dish-showcase__arrow--next"
            onClick={() => { triggerTempPause(); dir === 'rtl' ? prevPair() : nextPair(); }}
            aria-label="Next"
          >
            {dir === 'rtl' ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>

        {/* Stable Product Info Card */}
        <div
          className="dish-showcase__details-card"
          onClick={() => onOpen?.(currentItem)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') onOpen?.(currentItem); }}
        >
          <div className="dish-showcase__meta-top">
            {badge ? (
              <span className="dish-showcase__badge" style={{ backgroundColor: badge.bg, color: badge.color }}>
                {badge.label}
              </span>
            ) : <span />}
            {currentItem?.portion_or_pieces && (
              <span className="dish-showcase__portion">
                <GiChopsticks style={{ marginInlineEnd: '4px' }} aria-hidden="true" />
                {formatPortion(currentItem.portion_or_pieces, lang)}
              </span>
            )}
          </div>
          <h3 className="dish-showcase__dish-name">{dishName}</h3>
          <div className="dish-showcase__meta-bottom">
            <span className="dish-showcase__price">
              {currentItem?.price ? currentItem.price.toLocaleString('tr-TR') : ''} ₺
            </span>
            <button
              type="button"
              className="dish-showcase__cta-btn"
              onClick={(e) => { e.stopPropagation(); onOpen?.(currentItem); }}
              aria-label={`${getOrderBtnText()} - ${dishName}`}
            >
              <span>{getOrderBtnText()}</span>
              <span aria-hidden="true">{dir === 'rtl' ? '←' : '→'}</span>
            </button>
          </div>
        </div>

        {/* ═══ SLIDE DOTS INDICATOR (One dot per pair, pill-expanded when active) ═══ */}
        <div className="dish-showcase__dots" role="tablist" aria-label="Slide Indicator">
          {Array.from({ length: totalPairs }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={idx === pairIndex}
              className={`dish-showcase__dot ${idx === pairIndex ? 'is-active' : ''}`}
              onClick={() => { triggerTempPause(); goToPair(idx); }}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
