'use client';

const CATEGORY_EMOJIS = {
  'sushi-sets': '🎁',
  'special-rolls': '🍣',
  'crunchy-cooked': '✨',
  maki: '🥢',
  'nigiri-sashimi': '🐟',
  'bento-sets': '🍱',
  'poke-bowls': '🥣',
  'ramen-soups': '🍜',
  'noodles-udon': '🍝',
  'meat-chicken': '🥩',
  seafood: '🦐',
  starters: '🥟',
  'rice-salads': '🍚',
  desserts: '🍡',
  drinks: '🥤',
  sauces: '🫙',
};

export default function BrandedImagePlaceholder({ category, className = '' }) {
  const emoji = CATEGORY_EMOJIS[category] || '🥢';

  return (
    <div className={`branded-placeholder ${className}`} aria-hidden="true">
      <div className="branded-placeholder__glow" />
      <div className="branded-placeholder__circle">
        <span className="branded-placeholder__icon">{emoji}</span>
      </div>
      <span className="branded-placeholder__watermark">LUCKY SUSHI</span>
    </div>
  );
}
