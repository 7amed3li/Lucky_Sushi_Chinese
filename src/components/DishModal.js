'use client';

import Image from 'next/image';
import { useEffect, useCallback, useState } from 'react';
import { FaExpand, FaXmark } from 'react-icons/fa6';
import { useLang } from '@/context/LangContext';
import { useCart } from '@/context/CartContext';

const ALLERGEN_LABELS = {
  gluten:    { tr: 'Glüten', en: 'Gluten', ar: 'جلوتين', zh: '麸质' },
  fish:      { tr: 'Balık', en: 'Fish', ar: 'سمك', zh: '鱼' },
  shellfish: { tr: 'Kabuklu', en: 'Shellfish', ar: 'محار', zh: '贝壳' },
  dairy:     { tr: 'Süt', en: 'Dairy', ar: 'ألبان', zh: '乳制品' },
  egg:       { tr: 'Yumurta', en: 'Egg', ar: 'بيض', zh: '蛋' },
  soy:       { tr: 'Soya', en: 'Soy', ar: 'صويا', zh: '大豆' },
  sesame:    { tr: 'Susam', en: 'Sesame', ar: 'سمسم', zh: '芝麻' },
  peanuts:   { tr: 'Fıstık', en: 'Peanuts', ar: 'فول سوداني', zh: '花生' },
  nuts:      { tr: 'Kuruyemiş', en: 'Nuts', ar: 'مكسرات', zh: '坚果' },
};

const TAG_LABELS = {
  raw:     { tr: 'Çiğ', en: 'Raw', ar: 'نيء', zh: '生食' },
  cooked:  { tr: 'Pişmiş', en: 'Cooked', ar: 'مطهو', zh: '熟食' },
  spicy:   { tr: 'Acılı', en: 'Spicy', ar: 'حار', zh: '辣' },
  vegan:   { tr: 'Vegan', en: 'Vegan', ar: 'نباتي', zh: '纯素' },
  vegetarian: { tr: 'Vejetaryen', en: 'Vegetarian', ar: 'نباتي', zh: '素食' },
  sharing: { tr: 'Paylaşım', en: 'Sharing', ar: 'للمشاركة', zh: '分享' },
};

export default function DishModal({ item, onClose }) {
  const { lang, t } = useLang();
  const { addToCart } = useCart();
  const [isZoomed, setIsZoomed] = useState(false);

  const name = t(item, 'name');
  const desc = t(item, 'description');
  const hasImage = item.image && item.image !== '/images/placeholder.jpg';

  // Close on escape
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleAdd = () => {
    addToCart(item, 1);
    onClose();
  };

  // Get display tags
  const displayTags = (item.tags || [])
    .filter((tag) => TAG_LABELS[tag])
    .map((tag) => TAG_LABELS[tag][lang] || TAG_LABELS[tag].en);

  const addLabel = {
    tr: 'Sepete Ekle',
    en: 'Add to Cart',
    ar: 'أضف للسلة',
    zh: '加入购物车',
  };

  const ingredientsLabel = {
    tr: 'İçindekiler',
    en: 'Ingredients',
    ar: 'المكونات',
    zh: '配料',
  };

  const allergensLabel = {
    tr: 'Alerjenler',
    en: 'Allergens',
    ar: 'مسببات الحساسية',
    zh: '过敏原',
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-label={name}>
      <div className="modal-panel">
        {/* Image */}
        <div className="modal-panel__img-wrap" style={{ position: 'relative', background: 'var(--color-surface-secondary)' }}>
          {hasImage ? (
            <>
              <Image
                src={item.image}
                alt={name}
                width={520}
                height={390}
                style={{ objectFit: 'contain' }}
                priority
              />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '36px',
                  height: '36px',
                  background: 'rgba(255, 252, 247, 0.95)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer',
                  color: 'var(--color-text-primary)',
                  fontSize: '1.1rem',
                  zIndex: 10
                }}
                aria-label="Close modal"
              >
                <FaXmark />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(true);
                }}
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  width: '36px',
                  height: '36px',
                  background: 'rgba(255, 252, 247, 0.95)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer',
                  color: 'var(--color-text-primary)',
                  fontSize: '1.1rem',
                  zIndex: 10
                }}
                aria-label="Enlarge image"
              >
                <FaExpand />
              </button>
            </>
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--color-surface-secondary)',
              fontSize: '3.5rem',
              color: 'var(--color-brand-primary)',
              opacity: 0.5,
            }}>
              🥢
            </div>
          )}
          <button className="modal-panel__close" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="modal-panel__body">
          <h2 className="modal-panel__name">{name}</h2>
          {desc && <p className="modal-panel__desc">{desc}</p>}

          {/* Meta Tags */}
          {displayTags.length > 0 && (
            <div className="modal-panel__meta">
              {displayTags.map((tag, i) => (
                <span key={i} className="modal-panel__meta-tag">{tag}</span>
              ))}
              {item.portion_or_pieces && (
                <span className="modal-panel__meta-tag">{item.portion_or_pieces}</span>
              )}
            </div>
          )}

          {/* Ingredients */}
          {item.ingredients?.length > 0 && (
            <p className="modal-panel__ingredients">
              <strong>{ingredientsLabel[lang] || ingredientsLabel.en}:</strong>{' '}
              {item.ingredients.join(' · ')}
            </p>
          )}

          {/* Allergens */}
          {item.allergens?.length > 0 && (
            <div>
              <p className="modal-panel__ingredients" style={{ marginBottom: '8px' }}>
                <strong>{allergensLabel[lang] || allergensLabel.en}:</strong>
              </p>
              <div className="modal-panel__allergens">
                {item.allergens.map((a, i) => (
                  <span key={i} className="modal-panel__allergen">
                    {ALLERGEN_LABELS[a]?.[lang] || ALLERGEN_LABELS[a]?.en || a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="modal-panel__footer">
            <span className="modal-panel__price">
              {item.price?.toLocaleString('tr-TR')} ₺
            </span>
            <button className="modal-panel__add-btn" onClick={handleAdd}>
              <span>+</span>
              <span>{addLabel[lang] || addLabel.en}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Overlay */}
      {isZoomed && hasImage && (
        <div 
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(false);
          }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(22, 20, 26, 0.95)',
            backdropFilter: 'blur(10px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            cursor: 'zoom-out'
          }}
        >
          <button 
            onClick={() => setIsZoomed(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'var(--color-surface)',
              border: 'none',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.3rem',
              color: 'var(--color-text-primary)',
              cursor: 'pointer',
              zIndex: 10000,
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <FaXmark />
          </button>
          <div style={{ position: 'relative', width: '100%', height: '100%', maxWidth: '1000px', maxHeight: '90vh' }}>
            <Image
              src={item.image}
              alt={name}
              fill
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 1000px) 100vw, 1000px"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
