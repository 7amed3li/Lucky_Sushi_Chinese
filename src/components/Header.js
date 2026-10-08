'use client';

import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { usePathname } from '@/i18n/navigation';
import { useState, useEffect, useCallback } from 'react';
import { useLang } from '@/context/LangContext';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import CurrencySwitcher from '@/components/CurrencySwitcher';
import SvgFlag from '@/components/SvgFlag';
import { restaurantInfo } from '@/data/menuData';



export default function Header() {
  const pathname = usePathname();
  const { lang, switchLang, tUI, dir, SUPPORTED_LANGS, getLocale } = useLang();
  const { cartCount, setIsCartOpen } = useCart();
  const { currency, changeCurrency, currencies } = useCurrency();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const phoneClean = restaurantInfo.phone.replace(/[^0-9]/g, '');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Set dir attribute on HTML
  useEffect(() => {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
  }, [dir, lang]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Close lang dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.header__lang-container')) {
        setLangOpen(false);
      }
    };
    if (langOpen) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [langOpen]);

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`} role="banner">
        <div className="header__inner">
          {/* Brand Logo */}
          <Link href="/" className="header__logo" aria-label="Lucky Sushi Chinese — Home">
            <Image
              src="/logo-icon.png"
              alt="Lucky Sushi Chinese"
              width={38}
              height={38}
              priority
              style={{ objectFit: 'contain' }}
            />
            <div className="header__logo-text">
              <span className="header__logo-lucky">Lucky</span>
              <span className="header__logo-sushi">Sushi & Chinese</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="header__nav" aria-label="Main navigation">
            <Link
              href="/"
              className={`header__nav-link ${pathname === '/' ? 'active' : ''}`}
            >
              {tUI('nav_home')}
            </Link>
            <Link
              href="/menu"
              className={`header__nav-link ${pathname === '/menu' ? 'active' : ''}`}
            >
              {tUI('nav_menu')}
            </Link>
            <Link
              href="/branches"
              className={`header__nav-link ${pathname === '/branches' || pathname === '/contact' ? 'active' : ''}`}
            >
              {tUI('nav_branches')}
            </Link>
            <Link
              href="/about"
              className={`header__nav-link ${pathname === '/about' ? 'active' : ''}`}
            >
              {tUI('nav_about')}
            </Link>
          </nav>

          {/* Actions */}
          <div className="header__actions">
            {/* Minimal Language Dropdown */}
            <CurrencySwitcher />
            <div className="header__lang-container">
              <button
                type="button"
                className="header__lang-btn"
                onClick={() => setLangOpen(!langOpen)}
                aria-label="Select language"
                aria-expanded={langOpen}
              >
                <span className="header__lang-flag" aria-hidden="true">
                  <SvgFlag code={lang} size={15} />
                </span>
                <span className="header__lang-code">{lang.toUpperCase()}</span>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {langOpen && (
                <div className="header__lang-menu" role="menu">
                  {SUPPORTED_LANGS.map((code) => (
                    <button
                      key={code}
                      type="button"
                      role="menuitem"
                      className={`header__lang-item ${lang === code ? 'active' : ''}`}
                      onClick={() => {
                        switchLang(code);
                        setLangOpen(false);
                      }}
                    >
                      <span className="header__lang-item-main">
                        <SvgFlag code={code} size={15} />
                        <span>{getLocale(code)?.nativeName || code.toUpperCase()}</span>
                      </span>
                      <span className="header__lang-item-code">{code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              type="button"
              className="header__cart-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Cart (${cartCount} items)`}
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="header__cart-count">{cartCount}</span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              className="header__menu-toggle"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`mobile-drawer-overlay${mobileOpen ? ' open' : ''}`}
        onClick={closeMobile}
        role="presentation"
        aria-hidden={!mobileOpen}
      />

      {/* Mobile Drawer */}
      <aside
        className={`mobile-drawer${mobileOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="mobile-drawer__header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Image
              src="/logo-icon.png"
              alt="Lucky Sushi Chinese"
              width={34}
              height={34}
              style={{ objectFit: 'contain' }}
            />
            <div className="header__logo-text">
              <span className="header__logo-lucky" style={{ fontSize: '1.1rem' }}>Lucky</span>
              <span className="header__logo-sushi">Sushi & Chinese</span>
            </div>
          </div>
          <button
            type="button"
            className="mobile-drawer__close"
            onClick={closeMobile}
            aria-label="Close menu"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="mobile-drawer__nav" aria-label="Mobile menu">
          <Link
            href="/"
            onClick={closeMobile}
            className={`mobile-drawer__link ${pathname === '/' ? 'active' : ''}`}
          >
            {tUI('nav_home')}
          </Link>
          <Link
            href="/menu"
            onClick={closeMobile}
            className={`mobile-drawer__link ${pathname === '/menu' ? 'active' : ''}`}
          >
            {tUI('nav_menu')}
          </Link>
          <Link
            href="/branches"
            onClick={closeMobile}
            className={`mobile-drawer__link ${pathname === '/branches' || pathname === '/contact' ? 'active' : ''}`}
          >
            {tUI('nav_branches')}
          </Link>
          <Link
            href="/about"
            onClick={closeMobile}
            className={`mobile-drawer__link ${pathname === '/about' ? 'active' : ''}`}
          >
            {tUI('nav_about')}
          </Link>
        </nav>

        {/* Mobile Language Switcher */}
        <div className="mobile-drawer__section-title">
          {tUI('nav_language') || 'Language'}
        </div>
        <div className="mobile-drawer__lang-grid">
          {SUPPORTED_LANGS.map((code) => {
            const isActive = lang === code;
            return (
              <button
                key={code}
                type="button"
                className={`mobile-drawer__lang-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  switchLang(code);
                  closeMobile();
                }}
              >
                <span className="mobile-drawer__lang-flag"><SvgFlag code={code} size={15} /></span>
                <span>{getLocale(code)?.nativeName || code.toUpperCase()}</span>
              </button>
            );
          })}
        </div>

                {/* Mobile Currency Switcher */}
        <div className="mobile-drawer__section-title">
          Döviz / Currency
        </div>
        <div className="mobile-drawer__lang-grid">
          {currencies.map((c) => {
            const isSelected = currency === c.code;
            return (
              <button
                key={c.code}
                type="button"
                className={`mobile-drawer__lang-btn ${isSelected ? 'active' : ''}`}
                onClick={() => {
                  changeCurrency(c.code);
                  closeMobile();
                }}
              >
                {c.symbol} {c.code}
              </button>
            );
          })}
        </div>

        {/* WhatsApp Direct Order CTA */}
        <a
          href={`https://wa.me/${phoneClean}?text=${encodeURIComponent(
            lang === 'ar' ? 'مرحباً لاكي سوشي صيني، أود تقديم طلب من المنيو.' :
            lang === 'en' ? 'Hello Lucky Sushi & Chinese, I would like to place an order from the menu.' :
            lang === 'ru' ? 'Здравствуйте, Lucky Sushi & Chinese! Хочу сделать заказ по меню.' :
            lang === 'zh' ? '您好 Lucky Sushi & Chinese，我想根据菜单点餐。' :
            'Merhaba Lucky Sushi & Chinese, menüden sipariş vermek istiyorum.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMobile}
          className="mobile-drawer__order-btn"
        >
          <span>{tUI('order_now_btn')} (WhatsApp)</span>
        </a>
      </aside>
    </>
  );
}
