'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  FaWhatsapp, FaMoon, FaStar, FaMotorcycle, FaFire, 
  FaFish, FaBookOpen, FaLocationDot, FaHouse, 
  FaPhone, FaMapLocationDot, FaClock
} from 'react-icons/fa6';
import { GiChopsticks, GiSushis } from 'react-icons/gi';
import { useLang } from '@/context/LangContext';
import { restaurantInfo, menuItems } from '@/data/menuData';
import Header from '@/components/Header';
import RotatingDishShowcase from '@/components/RotatingDishShowcase';
import DishModal from '@/components/DishModal';
import CartDrawer from '@/components/CartDrawer';

export default function HomePage() {
  const { lang, t, tUI, dir } = useLang();
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.documentElement.style.setProperty('--scroll-y', `${scrollY * 0.35}px`);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phoneClean = restaurantInfo.phone.replace(/[^0-9]/g, '');

  return (
    <>
      <Header />

      <main id="main-content" className="home-main">
        {/* ── 1. Hero Section (Controlled Dark Moment) ────────────────────────────── */}
        <section className="home-hero" aria-label="Welcome">
          {/* Video Background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="home-hero__video-bg"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="home-hero__video-overlay" aria-hidden="true" />
          
          <div className="home-hero__glow" aria-hidden="true" />
          <div className="home-hero__inner">
            <div className="home-hero__badge-wrap">
              <div className="home-hero__logo-box">
                <Image
                  src="/logo-full-badge.png"
                  alt="Lucky Sushi Chinese Official Logo"
                  width={140}
                  height={100}
                  className="home-hero__logo-img"
                  priority
                />
              </div>
            </div>

            <p className="home-hero__tag">{tUI('home_hero_tag') || 'Contemporary Asian Dining · Istanbul'}</p>
            <h1 className="home-hero__title">
              Lucky <span>Sushi</span> Chinese
            </h1>
            <p className="home-hero__sub">{tUI('home_hero_sub')}</p>

            <div className="home-hero__cta-group">
              <Link href="/menu" className="btn-hero-primary" id="hero-menu-cta">
                <GiSushis aria-hidden="true" />
                <span>{tUI('explore_menu_btn')}</span>
                <span aria-hidden="true">{dir === 'rtl' ? '←' : '→'}</span>
              </Link>

              <a
                href={`https://wa.me/${phoneClean}?text=${encodeURIComponent('Merhaba! Menüden sipariş vermek istiyorum.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero-secondary"
                id="hero-whatsapp-cta"
              >
                <FaWhatsapp aria-hidden="true" />
                <span>{tUI('order_now_btn')} (WhatsApp)</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── 2. Stats Strip (Sleek Bridge Overlap) ────────────────────────── */}
        <div className="home-stats-wrapper">
          <div className="home-stats-strip">
            <div className="home-stat-item">
              <span className="home-stat-icon" aria-hidden="true"><FaMoon /></span>
              <span className="home-stat-val">{tUI('home_stats_hours')}</span>
            </div>
            <div className="home-stat-divider" aria-hidden="true" />
            <div className="home-stat-item">
              <span className="home-stat-icon" aria-hidden="true"><GiChopsticks /></span>
              <span className="home-stat-val">{tUI('home_stats_dishes')}</span>
            </div>
            <div className="home-stat-divider" aria-hidden="true" />
            <div className="home-stat-item">
              <span className="home-stat-icon" aria-hidden="true"><FaStar /></span>
              <span className="home-stat-val">{tUI('home_stats_rating')}</span>
            </div>
            <div className="home-stat-divider" aria-hidden="true" />
            <div className="home-stat-item">
              <span className="home-stat-icon" aria-hidden="true"><FaMotorcycle /></span>
              <span className="home-stat-val">{tUI('home_stats_delivery')}</span>
            </div>
          </div>
        </div>

        {/* ── 3. Marquee Ticker ───────────────────────────── */}
        <div className="home-marquee-wrap" aria-hidden="true">
          <div className="home-marquee-track">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="home-marquee-item">
                <GiSushis />
                <span>PREMIUM SUSHI</span>
                <FaMoon />
                <span>ASYA HİÇ UYUMAZ</span>
                <FaFire />
                <span>GERÇEK ASYA LEZZETLERİ</span>
                <FaStar />
                <span>LUCKY CHINESE</span>
                <FaMotorcycle />
                <span>GECE 04:00'A KADAR AÇIK</span>
                <GiChopsticks />
                <span>{tUI('trending_badge') || 'ÖNE ÇIKANLAR'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4. Best Sellers Circular Dish Showcase (Merged & Space-Optimized) ── */}
        <RotatingDishShowcase onOpen={setSelectedItem} />

        {/* ── 6. Why Choose Us (3 Feature Pillars) ──────── */}
        <section className="home-features-section">
          <div className="home-features-header">
            <span className="home-section-badge">
              <FaStar style={{ marginInlineEnd: '6px' }} aria-hidden="true" />
              {tUI('home_features_title')}
            </span>
            <h2 className="home-section-title">{tUI('home_features_title')}</h2>
            <p className="home-section-sub">{tUI('home_features_sub')}</p>
          </div>

          <div className="home-features-grid">
            <div className="home-feature-card">
              <span className="home-feature-icon" aria-hidden="true"><FaFish /></span>
              <h3 className="home-feature-title">{tUI('feature_fresh_title')}</h3>
              <p className="home-feature-desc">{tUI('feature_fresh_desc')}</p>
            </div>

            <div className="home-feature-card">
              <span className="home-feature-icon" aria-hidden="true"><FaFire /></span>
              <h3 className="home-feature-title">{tUI('feature_wok_title')}</h3>
              <p className="home-feature-desc">{tUI('feature_wok_desc')}</p>
            </div>

            <div className="home-feature-card">
              <span className="home-feature-icon" aria-hidden="true"><FaMoon /></span>
              <h3 className="home-feature-title">{tUI('feature_night_title')}</h3>
              <p className="home-feature-desc">{tUI('feature_night_desc')}</p>
            </div>
          </div>
        </section>

        {/* ── 7. Story Section (Atmospheric Dark Editorial) ────────────────────── */}
        <section className="home-story-section">
          <div className="home-story-grid">
            <div>
              <span className="home-section-badge">
                <FaBookOpen style={{ marginInlineEnd: '6px' }} aria-hidden="true" />
                {tUI('nav_about')}
              </span>
              <h2 className="home-story-title">{tUI('home_story_teaser_title')}</h2>
              <p className="home-story-desc">{tUI('home_story_teaser_p1')}</p>
              <p className="home-story-desc">{tUI('home_story_teaser_p2')}</p>
              <Link href="/about" className="btn-hero-secondary" style={{ marginTop: 'var(--sp-4)', display: 'inline-flex' }}>
                <span>{tUI('read_full_story')}</span>
                <span aria-hidden="true">{dir === 'rtl' ? '←' : '→'}</span>
              </Link>
            </div>

            <div className="home-story-teaser__media">
              <div className="home-story-card-visual">
                <Image
                  src="/logo-full-badge.png"
                  alt="Lucky Sushi Chinese Heritage"
                  width={220}
                  height={160}
                  className="home-story-logo-art"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. Location & Order Channels ──────────────── */}
        <section className="home-visit-section">
          <div className="home-visit-header">
            <span className="home-section-badge">
              <FaLocationDot style={{ marginInlineEnd: '6px' }} aria-hidden="true" />
              {tUI('nav_contact')}
            </span>
            <h2 className="home-section-title">{tUI('visit_us_title')}</h2>
          </div>

          <div className="home-visit-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--sp-4)' }}>
            {restaurantInfo.branches.map((branch) => {
              const whatsappClean = branch.whatsapp.replace(/[^0-9]/g, '');
              const branchPhoneClean = branch.phone.replace(/[^0-9]/g, '');
              
              return (
                <div key={branch.id} className="home-visit-card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="home-visit-icon" aria-hidden="true"><FaHouse /></span>
                  <h3 className="home-visit-name">{branch.name}</h3>
                  <p className="home-visit-text" style={{ flex: 1, marginBottom: 'var(--sp-3)' }}>{branch.address}</p>
                  
                  <div className="home-visit-actions" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <a
                      href={`https://wa.me/${whatsappClean}?text=${encodeURIComponent('Merhaba! Sipariş vermek istiyorum.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        background: 'var(--color-brand-primary)', color: 'white', padding: '11px', borderRadius: 'var(--btn-radius)',
                        fontWeight: 600, fontSize: '0.88rem', textDecoration: 'none', transition: 'background var(--transition-fast)'
                      }}
                    >
                      <FaWhatsapp aria-hidden="true" /> WhatsApp
                    </a>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <a
                        href={`tel:${branchPhoneClean}`}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                          border: '1px solid var(--color-border)', background: 'var(--color-surface)',
                          color: 'var(--color-text-primary)', padding: '9px', borderRadius: 'var(--btn-radius)',
                          textAlign: 'center', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none'
                        }}
                      >
                        <FaPhone aria-hidden="true" /> Ara
                      </a>
                      <a
                        href={branch.map}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                          border: '1px solid var(--color-border)', background: 'var(--color-surface)',
                          color: 'var(--color-text-primary)', padding: '9px', borderRadius: 'var(--btn-radius)',
                          textAlign: 'center', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none'
                        }}
                      >
                        <FaMapLocationDot aria-hidden="true" /> Harita
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Selected Item Modal */}
      {selectedItem && (
        <DishModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {/* Shopping Cart Drawer */}
      <CartDrawer />
    </>
  );
}
