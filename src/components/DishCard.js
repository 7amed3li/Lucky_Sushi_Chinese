'use client';

import Image from 'next/image';
import { useLang } from '@/context/LangContext';
import { useCart } from '@/context/CartContext';

/**
 * Dark nori-black product card with:
 * - Large image (1:1)
 * - Single badge max
 * - Name in Rice White
 * - Description in Mist Beige (2 line clamp)
 * - Portion/pieces
 * - Price in Sake Gold
 * - Gold + button
 */

const BADGE_MAP = {
  'bestseller':        { label_tr: 'Çok Satan', label_en: 'Best Seller', label_ar: 'الأكثر طلباً', label_zh: '热卖', cls: 'product-card__badge--bestseller' },
  'chefs-pick':        { label_tr: 'Şef Seçimi', label_en: "Chef's Pick", label_ar: 'اختيار الشيف', label_zh: '主厨推荐', cls: 'product-card__badge--chef' },
  'beginner-friendly': { label_tr: 'Yeni Başlayan', label_en: 'Beginner', label_ar: 'للمبتدئين', label_zh: '新手', cls: 'product-card__badge--beginner' },
  'cooked':            { label_tr: 'Pişmiş', label_en: 'Cooked', label_ar: 'مطهو', label_zh: '熟食', cls: 'product-card__badge--cooked' },
  'spicy':             { label_tr: 'Acılı', label_en: 'Spicy', label_ar: 'حار', label_zh: '辣', cls: 'product-card__badge--spicy' },
};

// Priority order for badge selection (show only one)
const BADGE_PRIORITY = ['bestseller', 'chefs-pick', 'beginner-friendly', 'spicy', 'cooked'];

function getBadge(tags, lang) {
  for (const key of BADGE_PRIORITY) {
    if (tags?.includes(key)) {
      const badge = BADGE_MAP[key];
      return {
        label: badge[`label_${lang}`] || badge.label_en,
        cls: badge.cls,
      };
    }
  }
  return null;
}

export default function DishCard({ item, onClick }) {
  const { lang, t } = useLang();
  const { addToCart } = useCart();

  const name = t(item, 'name');
  const desc = t(item, 'description');
  const badge = getBadge(item.tags, lang);
  const hasImage = item.image && item.image !== '/images/placeholder.jpg';

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(item, 1);
  };

  return (
    <article
      className="product-card"
      onClick={() => onClick?.(item)}
      role="button"
      tabIndex={0}
      aria-label={name}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick?.(item); }}
    >
      {/* Image */}
      <div className="product-card__img-wrap">
        {hasImage ? (
          <Image
            src={item.image}
            alt={name}
            width={400}
            height={400}
            loading="lazy"
            style={{ objectFit: 'contain', background: 'var(--warm-cream)' }}
          />
        ) : (
          <div className="product-card__no-img" aria-hidden="true">
            🍣
          </div>
        )}

        {/* Single badge */}
        {badge && (
          <span className={`product-card__badge ${badge.cls}`}>
            {badge.label}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="product-card__body">
        <h3 className="product-card__name">{name}</h3>
        {desc && <p className="product-card__desc">{desc}</p>}
        {item.portion_or_pieces && (
          <span className="product-card__pieces">{item.portion_or_pieces}</span>
        )}

        <div className="product-card__footer">
          <span className="product-card__price">
            {item.price?.toLocaleString('tr-TR')} ₺
          </span>
          <button
            className="product-card__add"
            onClick={handleAdd}
            aria-label={`${lang === 'ar' ? 'أضف' : lang === 'tr' ? 'Ekle' : 'Add'} ${name}`}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}
