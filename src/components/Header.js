'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useLang } from '@/context/LangContext';
import { useCart } from '@/context/CartContext';
import LangSwitcher from '@/components/LangSwitcher';

export default function Header({ onSearch, searchValue }) {
  const { lang, tUI, dir } = useLang();
  const { cartCount, setIsCartOpen } = useCart();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const searchPlaceholder = {
    tr: 'Menüde ara... Dynamite, Ramen...',
    en: 'Search menu... Dynamite, Ramen...',
    ar: 'ابحث في المنيو... ديناميت، رامن...',
    zh: '搜索菜单... 炸弹虾、拉面...',
  };

  const navLinks = [
    { href: '/', labelKey: 'nav_home' },
    { href: '/menu', labelKey: 'nav_menu' },
    { href: '/about', labelKey: 'nav_about' },
    { href: '/contact', labelKey: 'nav_contact' },
  ];

  const isMenuPage = pathname === '/menu';

  return (
    <header className="header" role="banner">
      <div className="header__inner">
        {/* Logo Section */}
        <Link href="/" className="logo" id="site-logo" aria-label="Lucky Sushi Chinese — Home">
          <div className="logo__badge">
            <Image
              src="/logo-full-badge.png"
              alt="Lucky Sushi Chinese"
              width={72}
              height={52}
              className="logo__img"
              priority
            />
          </div>
          <div className="logo__text">
            <span className="logo__name">Lucky Sushi</span>
            <span className="logo__sub">Chinese · Eyüpsultan</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="header__nav" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link${isActive ? ' nav-link--active' : ''}`}
              >
                {tUI(link.labelKey)}
              </Link>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="header__actions">
          {/* Search bar on menu page */}
          {isMenuPage && onSearch && (
            <div className="search-bar" role="search">
              <svg
                className="search-bar__icon"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                id="menu-search"
                type="search"
                placeholder={searchPlaceholder[lang] || searchPlaceholder.en}
                value={searchValue || ''}
                onChange={(e) => onSearch(e.target.value)}
                aria-label="Search menu"
              />
              {searchValue && (
                <button
                  type="button"
                  className="search-bar__clear"
                  onClick={() => onSearch('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          )}

          {/* Quick Menu Button if on another page */}
          {!isMenuPage && (
            <Link href="/menu" className="btn-header-menu">
              <span>🍣</span>
              <span className="btn-header-menu__text">{tUI('nav_menu')}</span>
            </Link>
          )}

          {/* Active Cart Button */}
          {cartCount > 0 && (
            <button
              type="button"
              className="btn-header-cart"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Cart (${cartCount})`}
            >
              <span aria-hidden="true">🛒</span>
              <span className="btn-header-cart__count">{cartCount}</span>
            </button>
          )}

          {/* Language Switcher */}
          <LangSwitcher />

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className={`hamburger-bar${mobileMenuOpen ? ' hamburger-bar--open-1' : ''}`} />
            <span className={`hamburger-bar${mobileMenuOpen ? ' hamburger-bar--open-2' : ''}`} />
            <span className={`hamburger-bar${mobileMenuOpen ? ' hamburger-bar--open-3' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" dir={dir}>
          <div className="mobile-drawer__overlay" onClick={() => setMobileMenuOpen(false)} />
          <div className="mobile-drawer__content">
            <div className="mobile-drawer__header">
              <div className="logo">
                <div className="logo__badge">
                  <Image
                    src="/logo-full-badge.png"
                    alt="Lucky Sushi Chinese"
                    width={60}
                    height={44}
                    className="logo__img"
                  />
                </div>
                <div className="logo__text">
                  <span className="logo__name">Lucky Sushi</span>
                  <span className="logo__sub">Chinese · Eyüpsultan</span>
                </div>
              </div>
              <button
                type="button"
                className="mobile-drawer__close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="mobile-drawer__nav">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`mobile-drawer__link${isActive ? ' mobile-drawer__link--active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {tUI(link.labelKey)}
                  </Link>
                );
              })}
            </nav>

            <div className="mobile-drawer__footer">
              <a href="tel:+905314863404" className="mobile-drawer__phone-btn">
                <span>📞</span>
                <span>+90 531 486 34 04</span>
              </a>
              <p className="mobile-drawer__hours">
                🕐 {lang === 'tr' ? 'Her gün: 10:00 — 04:00' : lang === 'ar' ? 'يوميًا: 10:00 صباحًا — 04:00 فجرًا' : 'Daily: 10:00 AM — 4:00 AM'}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
