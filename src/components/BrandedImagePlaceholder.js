'use client';

import {
  FaBowlFood,
  FaBowlRice,
  FaBottleWater,
  FaFish,
  FaGlassWater,
  FaKitchenSet,
  FaMugHot,
  FaPlateWheat,
  FaShrimp,
  FaUtensils,
} from 'react-icons/fa6';
import { GiNoodles, GiSushis } from 'react-icons/gi';

const CATEGORY_ICONS = {
  'sushi-sets': GiSushis,
  'special-rolls': GiSushis,
  'crunchy-cooked': FaPlateWheat,
  maki: GiSushis,
  'nigiri-sashimi': FaFish,
  'bento-sets': FaBowlRice,
  'poke-bowls': FaBowlFood,
  'ramen-soups': FaMugHot,
  'noodles-udon': GiNoodles,
  'meat-chicken': FaKitchenSet,
  seafood: FaShrimp,
  starters: FaUtensils,
  'rice-salads': FaBowlRice,
  desserts: FaPlateWheat,
  drinks: FaGlassWater,
  sauces: FaBottleWater,
};

export default function BrandedImagePlaceholder({ category, className = '' }) {
  const CategoryIcon = CATEGORY_ICONS[category] || GiSushis;

  return (
    <div className={`branded-placeholder ${className}`} aria-hidden="true">
      <div className="branded-placeholder__glow" />
      <div className="branded-placeholder__circle">
        <CategoryIcon className="branded-placeholder__icon" />
      </div>
      <span className="branded-placeholder__watermark">LUCKY SUSHI</span>
    </div>
  );
}
