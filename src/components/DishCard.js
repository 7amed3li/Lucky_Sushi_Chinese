'use client';

import { useState, useCallback } from 'react';
import { useLang } from '@/context/LangContext';
import { useCart } from '@/context/CartContext';
import BrandedImagePlaceholder from './BrandedImagePlaceholder';

const BADGE_LABELS = {
  bestseller: { tr: 'Çok Satan', en: 'Best Seller', ar: 'الأكثر مبيعًا', zh: '热卖' },
  'chefs-pick': { tr: 'Şef Seçimi', en: "Chef's Pick", ar: 'اختيار الشيف', zh: '主厨推荐' },
  new: { tr: 'Yeni', en: 'New', ar: 'جديد', zh: '新品' },
  spicy: { tr: '🌶 Acı', en: '🌶 Spicy', ar: '🌶 حار', zh: '🌶 辣' },
  vegan: { tr: 'Vegan', en: 'Vegan', ar: 'نباتي', zh: '纯素' },
  raw: { tr: 'Çiğ', en: 'Raw', ar: 'نيئ', zh: '生' },
  cooked: { tr: 'Pişmiş', en: 'Cooked', ar: 'مطهو', zh: '熟' },
};

function Badge({ tag, lang }) {
  const label = BADGE_LABELS[tag]?.[lang] ?? BADGE_LABELS[tag]?.en;
  if (!label) return null;
  const cls = `badge badge--${tag}`;
  return <span className={cls}>{label}</span>;
}

export default function DishCard({ item, onOpen }) {
  const { lang, t } = useLang();
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  const [imgError, setImgError] = useState(false);

  const quantity = getItemQuantity(item.id);

  const primaryBadges = item.tags
    .filter((tag) => ['bestseller', 'chefs-pick', 'new'].includes(tag))
    .slice(0, 1);

  const infoBadges = item.tags
    .filter((tag) => ['spicy', 'vegan', 'raw', 'cooked'].includes(tag))
    .slice(0, 2);

  const allBadges = [...primaryBadges, ...infoBadges];

  const handleClick = useCallback(() => onOpen(item), [item, onOpen]);
  const handleKey = useCallback(
    (e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(item); },
    [item, onOpen]
  );

  return (
    <article
      className="dish-card animate-fade-up"
      onClick={handleClick}
      onKeyDown={handleKey}
      tabIndex={0}
      role="button"
      aria-label={t(item, 'name')}
      id={`dish-${item.id}`}
    >
      {/* Image */}
      <div className="dish-card__img-wrap">
        {!imgError && item.image ? (
          <img
            src={item.image}
            alt={t(item, 'name')}
            className="dish-card__img"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <BrandedImagePlaceholder category={item.category} />
        )}

        {/* Badges */}
        {allBadges.length > 0 && (
          <div className="dish-card__badges">
            {allBadges.map((tag) => (
              <Badge key={tag} tag={tag} lang={lang} />
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="dish-card__body">
        <h3 className="dish-card__name">{t(item, 'name')}</h3>
        <p className="dish-card__desc">{t(item, 'description')}</p>
        {item.portion_or_pieces && (
          <p className="dish-card__portion">
            {item.portion_or_pieces}
          </p>
        )}
        <div className="dish-card__footer">
          <div>
            <span className="dish-card__price">
              {item.price.toLocaleString()} {item.currency}
            </span>
          </div>

          {/* Cart Interaction: Add (+) or Inline Counter ([-] qty [+]) */}
          {quantity > 0 ? (
            <div
              className="dish-card__counter"
              onClick={(e) => e.stopPropagation()}
              role="group"
              aria-label={`Cart quantity: ${quantity}`}
            >
              <button
                type="button"
                className="dish-card__qty-btn"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Decrease quantity of ${t(item, 'name')}`}
              >
                −
              </button>
              <span className="dish-card__qty-num">{quantity}</span>
              <button
                type="button"
                className="dish-card__qty-btn"
                onClick={() => addToCart(item, 1)}
                aria-label={`Increase quantity of ${t(item, 'name')}`}
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn-add"
              aria-label={`Add ${t(item, 'name')} to cart`}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(item, 1);
              }}
            >
              +
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
