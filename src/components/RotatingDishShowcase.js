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
  if (lang === 'ru') {
    return portion
      .replace(/(\d+)\s*pcs/i, '$1 шт.')
      .replace(/(\d+)\s*bowl/i, '$1 порция')
      .replace(/(\d+)\s*portion/i, '$1 порция');
  }
  if (lang === 'zh') {
    return portion
      .replace(/(\d+)\s*pcs/i, '$1件')
      .replace(/(\d+)\s*bowl/i, '$1碗')
      .replace(/(\d+)\s*portion/i, '$1份');
  }
  return portion;
}

export default function RotatingDishShowcase({ onOpen }) {
  const { lang, t, dir } = useLang();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [incomingIndex, setIncomingIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  const isTransitioningRef = useRef(false);
  const swapTimerRef = useRef(null);
  const doneTimerRef = useRef(null);
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

  const currentDish = items[currentIndex] || items[0];
  const incomingDish = incomingIndex !== null ? items[incomingIndex] : null;
  const displayedDish = isSwapping && incomingDish ? incomingDish : currentDish;

  const goToDish = useCallback((nextIdx) => {
    if (isTransitioningRef.current || nextIdx === currentIndex || !items[nextIdx]) return;
    isTransitioningRef.current = true;
    setIncomingIndex(nextIdx);
    setIsTransitioning(true);
    setIsSwapping(false);
    setBurstKey((k) => k + 1);

    // Step 1: The plate starts rotating circularly at a moderate speed
    // Step 2: At 450ms into the rotation, switch image and card with the animation
    if (swapTimerRef.current) clearTimeout(swapTimerRef.current);
    swapTimerRef.current = setTimeout(() => {
      setIsSwapping(true);
    }, 450);

    // Step 3: At 1100ms, the plate finishes its rotation smoothly onto the new dish
    if (doneTimerRef.current) clearTimeout(doneTimerRef.current);
    doneTimerRef.current = setTimeout(() => {
      setCurrentIndex(nextIdx);
      setIncomingIndex(null);
      setIsTransitioning(false);
      setIsSwapping(false);
      isTransitioningRef.current = false;
    }, 1100);
  }, [currentIndex, items]);

  const nextDish = useCallback(() => {
    if (items.length <= 1) return;
    goToDish((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, goToDish]);

  const prevDish = useCallback(() => {
    if (items.length <= 1) return;
    goToDish((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, goToDish]);

  // Keep ambient rotation alive; auto-advance dishes every 4.6s unless paused
  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    const interval = setInterval(() => {
      nextDish();
    }, 4600);
    return () => clearInterval(interval);
  }, [isPaused, nextDish, items.length]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (swapTimerRef.current) clearTimeout(swapTimerRef.current);
      if (doneTimerRef.current) clearTimeout(doneTimerRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

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
      if (dir === 'rtl') { delta > threshold ? nextDish() : prevDish(); }
      else { delta < -threshold ? nextDish() : prevDish(); }
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  const badge = getBadge(displayedDish?.tags, lang);
  const dishName = displayedDish ? t(displayedDish, 'name') : '';
  const activeDotIndex = isSwapping && incomingIndex !== null ? incomingIndex : currentIndex;

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
            onClick={() => { triggerTempPause(); dir === 'rtl' ? nextDish() : prevDish(); }}
            aria-label="Previous"
          >
            {dir === 'rtl' ? <FaChevronRight /> : <FaChevronLeft />}
          </button>

          {/* ═══ THE SIGNATURE SPINNING PLATE (Perpetual non-stop rotation + animated transition) ═══ */}
          <div
            className="dish-showcase__plate-wrapper"
            onClick={() => onOpen?.(displayedDish)}
            role="button"
            tabIndex={0}
            aria-label={dishName}
            onKeyDown={(e) => { if (e.key === 'Enter') onOpen?.(displayedDish); }}
          >
            {/* Perpetual turntable: spins constantly without stopping */}
            <div className="dish-showcase__plate-turntable">
              {/* Plate rim: executes the animated transition burst when changing dish */}
              <div
                className={`dish-showcase__plate-rim ${isTransitioning ? 'is-bursting' : ''}`}
                key={burstKey}
              >
                {/* Active / Outgoing Dish Image Layer */}
                <div
                  className={`dish-showcase__plate-layer ${isSwapping ? 'is-leaving' : 'is-active'}`}
                >
                  <Image
                    src={currentDish.image}
                    alt={t(currentDish, 'name')}
                    fill
                    sizes="(max-width: 480px) 270px, 340px"
                    priority
                    className="dish-showcase__plate-img"
                  />
                </div>

                {/* Incoming Dish Image Layer during transition */}
                {incomingDish && (
                  <div
                    className={`dish-showcase__plate-layer ${isSwapping ? 'is-entering' : 'is-hidden'}`}
                  >
                    <Image
                      src={incomingDish.image}
                      alt={t(incomingDish, 'name')}
                      fill
                      sizes="(max-width: 480px) 270px, 340px"
                      className="dish-showcase__plate-img"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Next Arrow */}
          <button
            type="button"
            className="dish-showcase__arrow dish-showcase__arrow--next"
            onClick={() => { triggerTempPause(); dir === 'rtl' ? prevDish() : nextDish(); }}
            aria-label="Next"
          >
            {dir === 'rtl' ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>

        {/* Stable Product Info Card with smooth content update */}
        <div
          className="dish-showcase__details-card"
          onClick={() => onOpen?.(displayedDish)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') onOpen?.(displayedDish); }}
        >
          <div className="dish-showcase__meta-top">
            {badge ? (
              <span className="dish-showcase__badge" style={{ backgroundColor: badge.bg, color: badge.color }}>
                {badge.label}
              </span>
            ) : <span />}
            {displayedDish?.portion_or_pieces && (
              <span className="dish-showcase__portion">
                <GiChopsticks style={{ marginInlineEnd: '4px' }} aria-hidden="true" />
                {formatPortion(displayedDish.portion_or_pieces, lang)}
              </span>
            )}
          </div>
          <h3 className="dish-showcase__dish-name">{dishName}</h3>
          <div className="dish-showcase__meta-bottom">
            <span className="dish-showcase__price">
              {displayedDish?.price ? displayedDish.price.toLocaleString('tr-TR') : ''} ₺
            </span>
            <button
              type="button"
              className="dish-showcase__cta-btn"
              onClick={(e) => { e.stopPropagation(); onOpen?.(displayedDish); }}
              aria-label={`${getOrderBtnText()} - ${dishName}`}
            >
              <span>{getOrderBtnText()}</span>
              <span aria-hidden="true">{dir === 'rtl' ? '←' : '→'}</span>
            </button>
          </div>
        </div>

        {/* ═══ SLIDE DOTS INDICATOR (One dot per dish, expands when active) ═══ */}
        <div className="dish-showcase__dots" role="tablist" aria-label="Slide Indicator">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={idx === activeDotIndex}
              className={`dish-showcase__dot ${idx === activeDotIndex ? 'is-active' : ''}`}
              onClick={() => { triggerTempPause(); goToDish(idx); }}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
