'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { useLang } from '@/context/LangContext';
import { useCart } from '@/context/CartContext';
import { restaurantInfo } from '@/data/menuData';

/* ── SVG Logo Symbol (Lucky four-petal clover + rice grain center) ── */
function LogoSymbol({ color = 'var(--aged-champagne)', size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Four petals */}
      <ellipse cx="20" cy="12" rx="6" ry="9" fill={color} opacity="0.85" />
      <ellipse cx="20" cy="28" rx="6" ry="9" fill={color} opacity="0.85" />
      <ellipse cx="12" cy="20" rx="9" ry="6" fill={color} opacity="0.85" />
      <ellipse cx="28" cy="20" rx="9" ry="6" fill={color} opacity="0.85" />
      {/* Center rice grain */}
      <ellipse cx="20" cy="20" rx="3.5" ry="4.5" fill="white" transform="rotate(-30 20 20)" />
      {/* Subtle chopstick lines */}
      <line x1="14" y1="6" x2="26" y2="34" stroke={color} strokeWidth="0.7" opacity="0.3" />
      <line x1="16" y1="5" x2="28" y2="33" stroke={color} strokeWidth="0.7" opacity="0.3" />
    </svg>
  );
}

export default function Header() {
  const { lang, switchLang, tUI, dir, SUPPORTED_LANGS } = useLang();
  const { cartCount, setIsCartOpen } = useCart();
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
      if (!e.target.closest('.lang-dropdown-container')) {
        setLangOpen(false);
      }
    };
    if (langOpen) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [langOpen]);

  const langLabels = { tr: '🇹🇷 TR', en: '🇬🇧 EN', ar: '🇸🇦 AR', zh: '🇨🇳 ZH' };

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`} role="banner">
        <div className="header__inner">
          {/* Logo */}
          <Link href="/" className="header__logo" aria-label="Lucky Sushi Chinese — Home">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src="/logo-icon.png" alt="Logo" width={36} height={36} style={{ objectFit: 'contain' }} />
              <div className="header__logo-text" style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="header__logo-lucky" style={{ fontFamily: 'var(--font-heading-en)', fontSize: '1.2rem', color: 'var(--roasted-cacao)' }}>Lucky</span>
                <span className="header__logo-sushi" style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--soft-taupe)', whiteSpace: 'nowrap' }}>Sushi · Chinese</span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="header__nav" aria-label="Main navigation">
            <Link href="/" className="header__nav-link">{tUI('nav_home')}</Link>
            <Link href="/menu" className="header__nav-link">{tUI('nav_menu')}</Link>
            <Link href="/about" className="header__nav-link">{tUI('nav_about')}</Link>
            <Link href="/contact" className="header__nav-link">{tUI('nav_contact')}</Link>
          </nav>

          {/* Actions */}
          <div className="header__actions">
            {/* Language Switcher (Dropdown) */}
            <div className="lang-dropdown-container" style={{ position: 'relative' }}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'var(--rice-paper)',
                  border: '1px solid rgba(185,148,82,0.2)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: 'var(--roasted-cacao)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body-en)'
                }}
              >
                {langLabels[lang]}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: langOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {langOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  background: 'white',
                  border: '1px solid rgba(185,148,82,0.15)',
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(52, 43, 37, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  minWidth: '100px',
                  overflow: 'hidden',
                  zIndex: 100
                }}>
                  {SUPPORTED_LANGS.map((code) => (
                    <button
                      key={code}
                      onClick={() => { switchLang(code); setLangOpen(false); }}
                      style={{
                        padding: '10px 16px',
                        background: lang === code ? 'var(--aged-champagne)' : 'transparent',
                        color: lang === code ? 'white' : 'var(--roasted-cacao)',
                        border: 'none',
                        borderBottom: '1px solid rgba(185,148,82,0.05)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: lang === code ? '700' : '500',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      {langLabels[code]}
                      {lang === code && <span style={{ fontSize: '0.8rem' }}>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart */}
            <button
              className="header__cart-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Cart (${cartCount} items)`}
              style={{
                position: 'relative',
                background: 'none',
                border: 'none',
                color: 'var(--roasted-cacao)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px'
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: '0', right: '0',
                  background: 'var(--aged-champagne)', color: 'white',
                  fontSize: '0.65rem', fontWeight: 'bold',
                  width: '18px', height: '18px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>{cartCount}</span>
              )}
            </button>

            {/* Mobile Toggle (Hamburger) */}
            <button
              className="header__menu-toggle"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--roasted-cacao)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div 
        className={`mobile-menu${mobileOpen ? ' open' : ''}`} 
        role="dialog" 
        aria-modal="true" 
        aria-label="Mobile navigation"
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '320px',
          background: 'var(--warm-cream)', zIndex: 1000,
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: mobileOpen ? '-10px 0 30px rgba(0,0,0,0.1)' : 'none',
          padding: '24px', display: 'flex', flexDirection: 'column'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <img src="/logo-icon.png" alt="Lucky Sushi" width={40} height={40} style={{ objectFit: 'contain' }} />
          <button onClick={closeMobile} aria-label="Close menu" style={{ background: 'var(--rice-paper)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
          <Link href="/" onClick={closeMobile} style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--roasted-cacao)', textDecoration: 'none', padding: '12px 0', borderBottom: '1px solid rgba(185,148,82,0.1)' }}>{tUI('nav_home')}</Link>
          <Link href="/menu" onClick={closeMobile} style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--roasted-cacao)', textDecoration: 'none', padding: '12px 0', borderBottom: '1px solid rgba(185,148,82,0.1)' }}>{tUI('nav_menu')}</Link>
          <Link href="/about" onClick={closeMobile} style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--roasted-cacao)', textDecoration: 'none', padding: '12px 0', borderBottom: '1px solid rgba(185,148,82,0.1)' }}>{tUI('nav_about')}</Link>
          <Link href="/contact" onClick={closeMobile} style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--roasted-cacao)', textDecoration: 'none', padding: '12px 0', borderBottom: '1px solid rgba(185,148,82,0.1)' }}>{tUI('nav_contact')}</Link>
        </nav>

        {/* Mobile Language Switcher */}
        <div style={{ marginTop: '32px' }}>
          <h4 style={{ fontSize: '0.8rem', color: 'var(--mist-beige)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
            {tUI('nav_language') || 'Language'}
          </h4>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '8px'
          }}>
            {SUPPORTED_LANGS.map((code) => {
              const isActive = lang === code;
              return (
                <button
                  key={code}
                  onClick={() => { switchLang(code); closeMobile(); }}
                  style={{
                    fontSize: '1rem',
                    fontWeight: isActive ? '700' : '500',
                    padding: '12px',
                    borderRadius: '12px',
                    background: isActive ? 'var(--aged-champagne)' : 'white',
                    color: isActive ? 'white' : 'var(--roasted-cacao)',
                    border: '1px solid rgba(185,148,82,0.2)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: isActive ? '0 4px 12px rgba(185,148,82,0.2)' : 'none'
                  }}
                >
                  {langLabels[code]}
                  {isActive && <span>✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        <a
          href={`https://wa.me/${phoneClean}?text=${encodeURIComponent('Merhaba! Menüden sipariş vermek istiyorum.')}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMobile}
          style={{
            marginTop: '24px', background: 'var(--roasted-cacao)', color: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none', display: 'block'
          }}
        >
          {tUI('order_now_btn')} — WhatsApp
        </a>
      </div>
      
      {/* Overlay for mobile menu */}
      {mobileOpen && (
        <div 
          onClick={closeMobile}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 999, backdropFilter: 'blur(2px)' }}
        />
      )}
    </>
  );
}
