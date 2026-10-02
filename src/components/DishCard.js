'use client';

import { useState, useCallback, useEffect } from 'react';
import { useLang } from '@/context/LangContext';

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

function ImagePlaceholder({ name, emoji = '🍣' }) {
  return (
    <div className="dish-card__img-placeholder" aria-hidden="true">
      {emoji}
    </div>
  );
}

const CATEGORY_EMOJI = {
  'best-sellers': '🔥',
  'sushi-sets': '🎁',
  'special-rolls': '🍣',
  'bento-sets': '🍱',
  'ramen-soups': '🍜',
  'noodles-udon': '🍝',
  'chinese-favorites': '🥡',
  starters: '🥟',
  desserts: '🍡',
  drinks: '🍹',
};

export default function DishCard({ item, onOpen }) {
  const { lang, t } = useLang();
  const [imgError, setImgError] = useState(false);

  const primaryBadges = item.tags
    .filter((tag) => ['bestseller', 'chefs-pick', 'new'].includes(tag))
    .slice(0, 1);

  const infoBadges = item.tags
    .filter((tag) => ['spicy', 'vegan', 'raw', 'cooked'].includes(tag))
    .slice(0, 2);

  const allBadges = [...primaryBadges, ...infoBadges];
  const emoji = CATEGORY_EMOJI[item.category] ?? '🍱';

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
          <ImagePlaceholder name={t(item, 'name')} emoji={emoji} />
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
          <button
            className="btn-add"
            aria-label={`View ${t(item, 'name')}`}
            onClick={(e) => { e.stopPropagation(); onOpen(item); }}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}
