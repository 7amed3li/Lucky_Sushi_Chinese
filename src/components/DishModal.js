'use client';

import { useEffect, useCallback, useState } from 'react';
import { useLang } from '@/context/LangContext';

const BADGE_MAP = {
  bestseller:        { tr: 'Çok Satan',  en: 'Best Seller',  ar: 'الأكثر مبيعًا', zh: '热卖',    cls: 'badge--bestseller' },
  'chefs-pick':      { tr: 'Şef Seçimi',en: "Chef's Pick",  ar: 'اختيار الشيف',  zh: '主厨推荐', cls: 'badge--chefspick' },
  new:               { tr: 'Yeni',      en: 'New',          ar: 'جديد',          zh: '新品',    cls: 'badge--new' },
  spicy:             { tr: '🌶 Acı',    en: '🌶 Spicy',    ar: '🌶 حار',        zh: '🌶 辣',   cls: 'badge--spicy' },
  vegan:             { tr: '🌱 Vegan',  en: '🌱 Vegan',    ar: '🌱 نباتي',      zh: '🌱 纯素',  cls: 'badge--vegan' },
  vegetarian:        { tr: '🥬 Vejet.', en: '🥬 Veggie',   ar: '🥬 نباتي',      zh: '🥬 素食', cls: 'badge--vegan' },
  raw:               { tr: 'Çiğ',      en: 'Raw',          ar: 'نيئ',           zh: '生鱼',    cls: 'badge--raw' },
  cooked:            { tr: 'Pişmiş',   en: 'Cooked',       ar: 'مطهو',          zh: '熟食',    cls: 'badge--cooked' },
  'beginner-friendly': { tr: '👍 Başlangıç', en: '👍 Beginner', ar: '👍 للمبتدئين', zh: '👍 新手', cls: 'badge--new' },
};

const ALLERGEN_EMOJI = {
  gluten: '🌾', fish: '🐟', shellfish: '🦐', dairy: '🥛',
  egg: '🥚', soy: '🫘', sesame: '🫚', peanuts: '🥜', nuts: '🌰',
};

const ALLERGEN_LABEL = {
  gluten:   { tr: 'Gluten', en: 'Gluten', ar: 'غلوتين', zh: '麸质' },
  fish:     { tr: 'Balık',  en: 'Fish',   ar: 'سمك',    zh: '鱼类' },
  shellfish:{ tr: 'Kabuklu deniz ürünleri', en: 'Shellfish', ar: 'مأكولات بحرية', zh: '甲壳类' },
  dairy:    { tr: 'Süt ürünleri', en: 'Dairy', ar: 'منتجات الألبان', zh: '乳制品' },
  egg:      { tr: 'Yumurta', en: 'Egg', ar: 'بيض', zh: '蛋类' },
  soy:      { tr: 'Soya', en: 'Soy', ar: 'صويا', zh: '大豆' },
  sesame:   { tr: 'Susam', en: 'Sesame', ar: 'سمسم', zh: '芝麻' },
  peanuts:  { tr: 'Fıstık', en: 'Peanuts', ar: 'فول سوداني', zh: '花生' },
  nuts:     { tr: 'Kuruyemiş', en: 'Nuts', ar: 'مكسرات', zh: '坚果' },
};

const CALL_LABELS = {
  tr: '📞 Sipariş Ver',
  en: '📞 Order Now',
  ar: '📞 اطلب الآن',
  zh: '📞 立即订购',
};

const CLOSE_LABELS = { tr: 'Kapat', en: 'Close', ar: 'إغلاق', zh: '关闭' };

const CATEGORY_EMOJI = {
  'sushi-sets': '🎁', 'special-rolls': '🍣', 'crunchy-cooked': '✨',
  maki: '🥢', 'nigiri-sashimi': '🐟', 'bento-sets': '🍱',
  'poke-bowls': '🥣', 'ramen-soups': '🍜', 'noodles-udon': '🍝',
  'meat-chicken': '🥩', seafood: '🦐', starters: '🥟',
  'rice-salads': '🍚', desserts: '🍡', drinks: '🥤', sauces: '🫙',
};

export default function DishModal({ item, onClose }) {
  const { lang, t } = useLang();
  const [imgError, setImgError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Animate open
  useEffect(() => {
    if (item) {
      requestAnimationFrame(() => setIsOpen(true));
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [item]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setTimeout(onClose, 350);
  }, [onClose]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose]);

  if (!item) return null;

  const displayBadges = item.tags.filter((t) => BADGE_MAP[t]).slice(0, 4);
  const emoji = CATEGORY_EMOJI[item.category] ?? '🍽️';

  return (
    <div
      className={`modal-overlay${isOpen ? ' modal-overlay--open' : ''}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={t(item, 'name')}
      id="dish-modal"
    >
      <div
        className="modal-sheet"
        onClick={(e) => e.stopPropagation()}
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        {/* Drag handle */}
        <div className="modal-sheet__drag" aria-hidden="true" />

        {/* Image */}
        {!imgError && item.image ? (
          <img
            src={item.image}
            alt={t(item, 'name')}
            className="modal-img"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="modal-img-placeholder" aria-hidden="true">
            {emoji}
          </div>
        )}

        {/* Body */}
        <div className="modal-body">
          {/* Badges */}
          {displayBadges.length > 0 && (
            <div className="modal-badges">
              {displayBadges.map((tag) => {
                const b = BADGE_MAP[tag];
                return (
                  <span key={tag} className={`badge ${b.cls}`}>
                    {b[lang] ?? b.en}
                  </span>
                );
              })}
            </div>
          )}

          {/* Name */}
          <h2 className="modal-name">{t(item, 'name')}</h2>

          {/* Description */}
          <p className="modal-desc">{t(item, 'description')}</p>

          {/* Details */}
          <div className="modal-detail">
            {item.portion_or_pieces && (
              <div className="modal-detail-row">
                <span className="modal-detail-label">
                  {lang === 'tr' ? 'Porsiyon' : lang === 'ar' ? 'الحجم' : lang === 'zh' ? '分量' : 'Portion'}
                </span>
                <span className="modal-detail-value">{item.portion_or_pieces}</span>
              </div>
            )}
            {item.ingredients && item.ingredients.length > 0 && (
              <div className="modal-detail-row" style={{ alignItems: 'flex-start' }}>
                <span className="modal-detail-label">
                  {lang === 'tr' ? 'İçindekiler' : lang === 'ar' ? 'المكونات' : lang === 'zh' ? '食材' : 'Ingredients'}
                </span>
                <span className="modal-detail-value" style={{ textAlign: lang === 'ar' ? 'left' : 'right', maxWidth: '65%', lineHeight: 1.5 }}>
                  {item.ingredients.join(' · ')}
                </span>
              </div>
            )}
          </div>

          {/* Allergens */}
          {item.allergens && item.allergens.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-subtle)', marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {lang === 'tr' ? 'Alerjenler' : lang === 'ar' ? 'مسببات الحساسية' : lang === 'zh' ? '过敏原' : 'Allergens'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {item.allergens.map((a) => (
                  <span
                    key={a}
                    style={{
                      fontSize: '0.72rem',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(241,240,234,0.08)',
                      border: '1px solid rgba(241,240,234,0.12)',
                      color: 'var(--color-muted)',
                    }}
                  >
                    {ALLERGEN_EMOJI[a] ?? '⚠️'} {ALLERGEN_LABEL[a]?.[lang] ?? a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Price & CTA */}
          <div className="modal-price-row">
            <div>
              <span className="modal-price">
                {item.price.toLocaleString()}
              </span>{' '}
              <span className="modal-currency">{item.currency}</span>
            </div>
            <a
              href={`tel:${'+905314863404'}`}
              className="btn-cta btn-cta--primary"
              id={`modal-order-${item.id}`}
              aria-label={CALL_LABELS[lang]}
            >
              {CALL_LABELS[lang]}
            </a>
          </div>

          {/* Close */}
          <button
            className="btn-cta btn-cta--ghost"
            style={{ width: '100%', marginTop: 12 }}
            onClick={handleClose}
            id="modal-close-btn"
          >
            {CLOSE_LABELS[lang]}
          </button>
        </div>
      </div>
    </div>
  );
}
