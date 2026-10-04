'use client';

import Image from 'next/image';
import { useLang } from '@/context/LangContext';
import { useCart } from '@/context/CartContext';

const BADGE_MAP = {
  'bestseller':        { label_tr: 'Çok Satan', label_en: 'Best Seller', label_ar: 'الأكثر طلباً', label_zh: '热卖', bg: 'var(--color-brand-primary)', color: '#FFFFFF' },
  'chefs-pick':        { label_tr: 'Şef Seçimi', label_en: "Chef's Pick", label_ar: 'اختيار الشيف', label_zh: '主厨推荐', bg: 'var(--color-accent)', color: '#FFFFFF' },
  'beginner-friendly': { label_tr: 'Yeni Başlayan', label_en: 'Beginner', label_ar: 'للمبتدئين', label_zh: '新手', bg: 'var(--color-surface-secondary)', color: 'var(--color-text-primary)' },
  'cooked':            { label_tr: 'Pişmiş', label_en: 'Cooked', label_ar: 'مطهو', label_zh: '熟食', bg: 'var(--color-brand-primary)', color: '#FFFFFF' },
  'spicy':             { label_tr: 'Acılı', label_en: 'Spicy', label_ar: 'حار', label_zh: '辣', bg: 'var(--color-accent)', color: '#FFFFFF' },
  'vegetarian':        { label_tr: 'Vejetaryen', label_en: 'Vejetaryen', label_ar: 'نباتي', label_zh: '素食', bg: 'var(--color-brand-primary)', color: '#FFFFFF' },
};

const BADGE_PRIORITY = ['chefs-pick', 'bestseller', 'spicy', 'cooked', 'vegetarian', 'beginner-friendly'];

function getBadge(tags, lang) {
  for (const key of BADGE_PRIORITY) {
    if (tags?.includes(key)) {
      const badge = BADGE_MAP[key];
      return {
        label: badge[`label_${lang}`] || badge.label_en,
        bg: badge.bg,
        color: badge.color,
      };
    }
  }
  return null;
}

export default function DishCard({ item, onClick }) {
  const { lang, t, tUI } = useLang();
  const { addToCart, removeFromCart, getItemQuantity } = useCart();

  const name = t(item, 'name');
  const desc = t(item, 'description');
  const badge = getBadge(item.tags, lang);
  const hasImage = item.image && item.image !== '/images/placeholder.jpg';
  const qty = getItemQuantity ? getItemQuantity(item.id) : 0;

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(item, 1);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    removeFromCart(item.id);
  };

  return (
    <article
      className="kardeshler-food-card"
      onClick={() => onClick?.(item)}
      role="button"
      tabIndex={0}
      aria-label={name}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick?.(item); }}
    >
      {/* Image Section */}
      <div className="kardeshler-food-card__img-wrap">
        {hasImage ? (
          <Image
            src={item.image}
            alt={name}
            fill
            sizes="(max-width: 640px) 120px, 140px"
            loading="lazy"
            className="kardeshler-food-card__img"
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              color: 'var(--color-brand-primary)',
              opacity: 0.6,
            }}
            aria-hidden="true"
          >
            🥢
          </div>
        )}

        {/* Price Tag in top-start */}
        {item.price != null && (
          <div className="kardeshler-food-card__price-badge">
            {item.price.toLocaleString('tr-TR')} ₺
          </div>
        )}

        {/* Tag badge in bottom-start */}
        {badge && (
          <div
            className="kardeshler-food-card__tag-badge"
            style={{ backgroundColor: badge.bg, color: badge.color }}
          >
            {badge.label}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="kardeshler-food-card__content">
        <div>
          <div className="kardeshler-food-card__header">
            <h3 className="kardeshler-food-card__title">{name}</h3>
            <div className="kardeshler-food-card__chevron" aria-hidden="true">
              ›
            </div>
          </div>
          {desc && <p className="kardeshler-food-card__desc">{desc}</p>}
        </div>

        {/* Footer with pieces and + button / inline counter */}
        <div className="kardeshler-food-card__footer">
          <span className="kardeshler-food-card__pieces">
            {item.portion_or_pieces || ''}
          </span>

          {qty === 0 ? (
            <button
              type="button"
              className="kardeshler-food-card__add-btn"
              onClick={handleAdd}
              aria-label={`${tUI('dish_add_aria')} ${name}`}
            >
              +
            </button>
          ) : (
            <div
              className="kardeshler-food-card__qty-group"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="kardeshler-food-card__qty-btn"
                onClick={handleRemove}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="kardeshler-food-card__qty-num">{qty}</span>
              <button
                type="button"
                className="kardeshler-food-card__qty-btn"
                onClick={handleAdd}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
