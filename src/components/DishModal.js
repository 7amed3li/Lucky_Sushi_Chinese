'use client';

import { useEffect, useCallback, useState } from 'react';
import { useLang } from '@/context/LangContext';
import { useCart } from '@/context/CartContext';
import BrandedImagePlaceholder from './BrandedImagePlaceholder';

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

export default function DishModal({ item, onClose }) {
  const { lang, t, dir } = useLang();
  const { addToCart, getItemQuantity, setIsCartOpen } = useCart();
  const [imgError, setImgError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const existingQty = item ? getItemQuantity(item.id) : 0;

  // Initialize quantity
  useEffect(() => {
    if (item) {
      setQuantity(existingQty > 0 ? existingQty : 1);
    }
  }, [item, existingQty]);

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
    setLightboxOpen(false);
    setTimeout(onClose, 350);
  }, [onClose]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) {
          setLightboxOpen(false);
        } else {
          handleClose();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose, lightboxOpen]);

  if (!item) return null;

  const displayBadges = item.tags.filter((t) => BADGE_MAP[t]).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(item, quantity - existingQty > 0 ? quantity - existingQty : quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      handleClose();
      setIsCartOpen(true);
    }, 400);
  };

  const handleZoomIn = (e) => {
    e.stopPropagation();
    setZoomScale((prev) => Math.min(prev + 0.4, 3));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setZoomScale((prev) => Math.max(prev - 0.4, 1));
  };

  const handleZoomReset = (e) => {
    e.stopPropagation();
    setZoomScale(1);
  };

  const labels = {
    add_to_cart: { tr: 'Sepete Ekle', en: 'Add to Cart', ar: 'إضافة إلى السلة', zh: '加入购物车' },
    update_cart: { tr: 'Sepeti Güncelle', en: 'Update Cart', ar: 'تحديث السلة', zh: '更新购物车' },
    added: { tr: 'Eklendi! ✓', en: 'Added! ✓', ar: 'تمت الإضافة! ✓', zh: '已添加! ✓' },
    zoom_hint: { tr: 'Büyüt', en: 'Zoom', ar: 'تكبير', zh: '放大' },
    zoom_in: { tr: 'Yakınlaştır (+)', en: 'Zoom In (+)', ar: 'تكبير (+)', zh: '放大 (+)' },
    zoom_out: { tr: 'Uzaklaştır (-)', en: 'Zoom Out (-)', ar: 'تصغير (-)', zh: '缩小 (-)' },
    zoom_reset: { tr: 'Sıfırla', en: 'Reset', ar: 'إعادة ضبط', zh: '重置' },
    close: { tr: 'Kapat', en: 'Close', ar: 'إغلاق', zh: '关闭' },
    portion: { tr: 'Porsiyon', en: 'Portion', ar: 'الحجم', zh: '分量' },
    ingredients: { tr: 'İçindekiler', en: 'Ingredients', ar: 'المكونات', zh: '食材' },
    allergens: { tr: 'Alerjenler', en: 'Allergens', ar: 'مسببات الحساسية', zh: '过敏原' },
  };

  const getL = (key) => labels[key]?.[lang] || labels[key]?.en || '';

  const subtotal = item.price * quantity;

  return (
    <>
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
          dir={dir}
        >
          {/* Drag handle */}
          <div className="modal-sheet__drag" aria-hidden="true" />

          {/* Image Container with Zoom overlay */}
          <div className="modal-img-wrap">
            {!imgError && item.image ? (
              <>
                <img
                  src={item.image}
                  alt={t(item, 'name')}
                  className="modal-img modal-img--contain"
                  onError={() => setImgError(true)}
                  onClick={() => {
                    setZoomScale(1);
                    setLightboxOpen(true);
                  }}
                  title={getL('zoom_hint')}
                />
                <button
                  type="button"
                  className="modal-zoom-btn"
                  onClick={() => {
                    setZoomScale(1);
                    setLightboxOpen(true);
                  }}
                  aria-label={getL('zoom_hint')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                  <span>{getL('zoom_hint')}</span>
                </button>
              </>
            ) : (
              <div className="modal-img-placeholder" aria-hidden="true">
                <BrandedImagePlaceholder category={item.category} />
              </div>
            )}
          </div>

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
                  <span className="modal-detail-label">{getL('portion')}</span>
                  <span className="modal-detail-value">{item.portion_or_pieces}</span>
                </div>
              )}
              {item.ingredients && item.ingredients.length > 0 && (
                <div className="modal-detail-row" style={{ alignItems: 'flex-start' }}>
                  <span className="modal-detail-label">{getL('ingredients')}</span>
                  <span className="modal-detail-value" style={{ textAlign: dir === 'rtl' ? 'left' : 'right', maxWidth: '65%', lineHeight: 1.5 }}>
                    {item.ingredients.join(' · ')}
                  </span>
                </div>
              )}
            </div>

            {/* Allergens */}
            {item.allergens && item.allergens.length > 0 && (
              <div style={{ marginBottom: 18 }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-subtle)', marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {getL('allergens')}
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

            {/* Price & Quantity Selector */}
            <div className="modal-cart-control-box">
              <div className="modal-price-calc">
                <span className="modal-unit-price">
                  {item.price.toLocaleString()} {item.currency} / {getL('portion').toLowerCase()}
                </span>
                <span className="modal-total-price">
                  {subtotal.toLocaleString()} {item.currency}
                </span>
              </div>

              {/* Quantity Counter */}
              <div className="modal-qty-selector">
                <button
                  type="button"
                  className="modal-qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="modal-qty-value">{quantity}</span>
                <button
                  type="button"
                  className="modal-qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="modal-action-row">
              <button
                type="button"
                className={`btn-modal-add${addedAnimation ? ' btn-modal-add--added' : ''}`}
                onClick={handleAddToCart}
                id="modal-add-to-cart-btn"
              >
                <span>🛒</span>
                <span>
                  {addedAnimation
                    ? getL('added')
                    : existingQty > 0
                    ? `${getL('update_cart')} (${subtotal.toLocaleString()} ${item.currency})`
                    : `${getL('add_to_cart')} (${subtotal.toLocaleString()} ${item.currency})`}
                </span>
              </button>

              <button
                type="button"
                className="btn-modal-close"
                onClick={handleClose}
                id="modal-close-btn"
              >
                {getL('close')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Lightbox with Zoom Controls */}
      {lightboxOpen && item.image && (
        <div
          className="fullscreen-lightbox"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${t(item, 'name')} - Full Image View`}
        >
          <div className="lightbox-bar" onClick={(e) => e.stopPropagation()}>
            <span className="lightbox-title">{t(item, 'name')}</span>
            <div className="lightbox-controls">
              <button
                type="button"
                className="lightbox-btn"
                onClick={handleZoomIn}
                title={getL('zoom_in')}
                aria-label={getL('zoom_in')}
              >
                +
              </button>
              <button
                type="button"
                className="lightbox-btn"
                onClick={handleZoomOut}
                title={getL('zoom_out')}
                aria-label={getL('zoom_out')}
              >
                −
              </button>
              <button
                type="button"
                className="lightbox-btn lightbox-btn--text"
                onClick={handleZoomReset}
                title={getL('zoom_reset')}
                aria-label={getL('zoom_reset')}
              >
                {Math.round(zoomScale * 100)}%
              </button>
              <button
                type="button"
                className="lightbox-btn lightbox-btn--close"
                onClick={() => setLightboxOpen(false)}
                title={getL('close')}
                aria-label={getL('close')}
              >
                ✕
              </button>
            </div>
          </div>

          <div
            className="lightbox-viewport"
            onClick={(e) => {
              if (e.target === e.currentTarget) setLightboxOpen(false);
            }}
          >
            <img
              src={item.image}
              alt={t(item, 'name')}
              className="lightbox-img"
              style={{
                transform: `scale(${zoomScale})`,
                transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}
