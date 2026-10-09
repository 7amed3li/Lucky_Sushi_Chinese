'use client';

import { Link } from '@/i18n/navigation';
import { usePathname } from '@/i18n/navigation';
import { GiSushis } from 'react-icons/gi';
import { FaWhatsapp, FaMapLocationDot, FaBagShopping } from 'react-icons/fa6';
import { useLang } from '@/context/LangContext';
import { useCart } from '@/context/CartContext';
import { useBranch } from '@/context/BranchContext';
import { restaurantInfo } from '@/data/menuData';

export default function MobileBottomBar() {
  const pathname = usePathname();
  const { lang, tUI } = useLang();
  const { cartCount, setIsCartOpen } = useCart();
  const { selectedBranch, openBranchModal } = useBranch();

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    if (!selectedBranch) {
      openBranchModal((branch) => {
        const clean = (branch.whatsapp || branch.phone).replace(/[^0-9]/g, '');
        const branchTitle = branch[`name_${lang}`] || branch.name_tr;
        const msg = encodeURIComponent(
          lang === 'ar' ? `مرحباً لاكي سوشي صيني (${branchTitle})، أود تقديم طلب من المنيو.` :
          lang === 'en' ? `Hello Lucky Sushi & Chinese (${branchTitle}), I would like to place an order from the menu.` :
          lang === 'ru' ? `Здравствуйте, Lucky Sushi & Chinese (${branchTitle})! Хочу сделать заказ по меню.` :
          lang === 'zh' ? `您好 Lucky Sushi & Chinese (${branchTitle})，我想根据菜单点餐。` :
          `Merhaba Lucky Sushi & Chinese (${branchTitle}), menüden sipariş vermek istiyorum.`
        );
        window.open(`https://wa.me/${clean}?text=${msg}`, '_blank');
      });
    } else {
      const clean = (selectedBranch.whatsapp || selectedBranch.phone).replace(/[^0-9]/g, '');
      const branchTitle = selectedBranch[`name_${lang}`] || selectedBranch.name_tr;
      const msg = encodeURIComponent(
        lang === 'ar' ? `مرحباً لاكي سوشي صيني (${branchTitle})، أود تقديم طلب من المنيو.` :
        lang === 'en' ? `Hello Lucky Sushi & Chinese (${branchTitle}), I would like to place an order from the menu.` :
        lang === 'ru' ? `Здравствуйте, Lucky Sushi & Chinese (${branchTitle})! Хочу сделать заказ по меню.` :
        lang === 'zh' ? `您好 Lucky Sushi & Chinese (${branchTitle})，我想根据菜单点餐。` :
        `Merhaba Lucky Sushi & Chinese (${branchTitle}), menüden sipariş vermek istiyorum.`
      );
      window.open(`https://wa.me/${clean}?text=${msg}`, '_blank');
    }
  };

  const getMapHref = () => {
    if (selectedBranch && selectedBranch.map) {
      return selectedBranch.map;
    }
    return '/branches';
  };

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

      {/* 3. WhatsApp Order (Branch-aware) */}
      <button
        type="button"
        onClick={handleWhatsAppClick}
        className="mobile-bottom-bar__item mobile-bottom-bar__item--whatsapp"
        aria-label="Order via WhatsApp"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <FaWhatsapp size={20} aria-hidden="true" />
        <span>WhatsApp</span>
      </button>

      {/* 4. Google Maps / Branches */}
      {selectedBranch && selectedBranch.map ? (
        <a
          href={selectedBranch.map}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-bottom-bar__item"
          aria-label={tUI('bar_map') || 'Location'}
        >
          <FaMapLocationDot size={18} aria-hidden="true" />
          <span>{tUI('bar_map') || 'Konum'}</span>
        </a>
      ) : (
        <Link
          href="/branches"
          className={`mobile-bottom-bar__item ${pathname === '/branches' ? 'active' : ''}`}
          aria-label={tUI('bar_map') || 'Branches'}
        >
          <FaMapLocationDot size={18} aria-hidden="true" />
          <span>{tUI('bar_map') || 'Şubeler'}</span>
        </Link>
      )}
    </nav>
  );
}
