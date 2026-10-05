'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GiSushis } from 'react-icons/gi';
import { FaWhatsapp, FaMapLocationDot, FaBagShopping } from 'react-icons/fa6';
import { useLang } from '@/context/LangContext';
import { useCart } from '@/context/CartContext';
import { restaurantInfo } from '@/data/menuData';

export default function MobileBottomBar() {
  const pathname = usePathname();
  const { lang, tUI } = useLang();
  const { cartCount, setIsCartOpen } = useCart();

  const phoneClean = restaurantInfo.phone.replace(/[^0-9]/g, '');

  const whatsappGreetings = {
    tr: 'Merhaba Lucky Sushi & Chinese, menüden sipariş vermek istiyorum.',
    en: 'Hello Lucky Sushi & Chinese, I would like to place an order from the menu.',
    ar: 'مرحباً لاكي سوشي صيني، أود تقديم طلب من المنيو.',
    ru: 'Здравствуйте, Lucky Sushi & Chinese! Хочу сделать заказ по меню.',
    zh: '您好 Lucky Sushi & Chinese，我想根据菜单点餐。',
  };
  const waText = encodeURIComponent(whatsappGreetings[lang] || whatsappGreetings.tr);

  return (
    <nav className="mobile-bottom-bar" aria-label="Mobile quick actions">
      {/* 1. Menu */}
      <Link
        href="/menu"
        className={`mobile-bottom-bar__item ${pathname === '/menu' ? 'active' : ''}`}
        aria-label={tUI('bar_menu') || 'Menu'}
      >
        <GiSushis size={20} aria-hidden="true" />
        <span>{tUI('bar_menu') || 'Menü'}</span>
      </Link>

      {/* 2. Cart / Order */}
      <button
        type="button"
        className="mobile-bottom-bar__item mobile-bottom-bar__item--cart"
        onClick={() => setIsCartOpen(true)}
        aria-label={`${tUI('bar_order') || 'Cart'} (${cartCount})`}
      >
        <FaBagShopping size={18} aria-hidden="true" />
        <span>{tUI('bar_order') || 'Sepet'}</span>
        {cartCount > 0 && (
          <span className="mobile-bottom-bar__badge">{cartCount}</span>
        )}
      </button>

      {/* 3. WhatsApp Order */}
      <a
        href={`https://wa.me/${phoneClean}?text=${waText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-bottom-bar__item mobile-bottom-bar__item--whatsapp"
        aria-label="Order via WhatsApp"
      >
        <FaWhatsapp size={20} aria-hidden="true" />
        <span>WhatsApp</span>
      </a>

      {/* 4. Google Maps */}
      <a
        href={restaurantInfo.google_maps_url || restaurantInfo.branches[0].map}
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-bottom-bar__item"
        aria-label={tUI('bar_map') || 'Location'}
      >
        <FaMapLocationDot size={18} aria-hidden="true" />
        <span>{tUI('bar_map') || 'Konum'}</span>
      </a>
    </nav>
  );
}
