'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useLang } from '@/context/LangContext';
import { restaurantInfo, menuItems } from '@/data/menuData';
import Header from '@/components/Header';
import TrendingBar from '@/components/TrendingBar';
import DishModal from '@/components/DishModal';
import CartDrawer from '@/components/CartDrawer';

export default function HomePage() {
  const { lang, t, tUI, dir } = useLang();
  const [selectedItem, setSelectedItem] = useState(null);

  const phoneClean = restaurantInfo.phone.replace(/[^0-9]/g, '');

  const popularSets = menuItems
    .filter((item) => item.category === 'sushi-sets')
    .slice(0, 4);

  return (
    <>
      <Header />

      <main id="main-content" className="home-main">
        {/* ── 1. Hero Section ────────────────────────────── */}
        <section className="home-hero" aria-label="Welcome">
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

            <p className="home-hero__tag">{tUI('home_hero_tag')}</p>
            <h1 className="home-hero__title">
              Lucky <span>Sushi</span> Chinese
            </h1>
            <p className="home-hero__sub">{tUI('home_hero_sub')}</p>

            <div className="home-hero__cta-group">
              <Link href="/menu" className="btn-hero-primary" id="hero-menu-cta">
                <span>🍣</span>
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
                <span>💬</span>
                <span>{tUI('order_now_btn')} (WhatsApp)</span>
              </a>
            </div>

            {/* Stats Strip */}
            <div className="home-stats-strip">
              <div className="home-stat-item">
                <span className="home-stat-icon" aria-hidden="true">🌙</span>
                <span className="home-stat-val">{tUI('home_stats_hours')}</span>
              </div>
              <div className="home-stat-divider" aria-hidden="true" />
              <div className="home-stat-item">
                <span className="home-stat-icon" aria-hidden="true">🥢</span>
                <span className="home-stat-val">{tUI('home_stats_dishes')}</span>
              </div>
              <div className="home-stat-divider" aria-hidden="true" />
              <div className="home-stat-item">
                <span className="home-stat-icon" aria-hidden="true">⭐</span>
                <span className="home-stat-val">{tUI('home_stats_rating')}</span>
              </div>
              <div className="home-stat-divider" aria-hidden="true" />
              <div className="home-stat-item">
                <span className="home-stat-icon" aria-hidden="true">🛵</span>
                <span className="home-stat-val">{tUI('home_stats_delivery')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Trending Dishes Showcase ───────────────── */}
        <section className="home-trending-section">
          <div className="home-trending-header">
            <div>
              <span className="home-section-badge">🔥 {tUI('trending_badge')}</span>
              <h2 className="home-section-title">{tUI('trending_title')}</h2>
              <p className="home-section-sub">{tUI('trending_sub')}</p>
            </div>
            <Link href="/menu" className="btn-link-all">
              <span>{tUI('nav_menu')}</span>
              <span aria-hidden="true">{dir === 'rtl' ? '←' : '→'}</span>
            </Link>
          </div>
          <TrendingBar onOpen={setSelectedItem} />
        </section>

        {/* ── 3. Why Choose Us (3 Feature Pillars) ──────── */}
        <section className="home-features-section">
          <div className="home-features-header">
            <span className="home-section-badge">✨ {tUI('home_features_title')}</span>
            <h2 className="home-section-title">{tUI('home_features_title')}</h2>
            <p className="home-section-sub">{tUI('home_features_sub')}</p>
          </div>

          <div className="home-features-grid">
            <div className="home-feature-card">
              <span className="home-feature-icon" aria-hidden="true">🐟</span>
              <h3 className="home-feature-title">{tUI('feature_fresh_title')}</h3>
              <p className="home-feature-desc">{tUI('feature_fresh_desc')}</p>
            </div>

            <div className="home-feature-card">
              <span className="home-feature-icon" aria-hidden="true">🔥</span>
              <h3 className="home-feature-title">{tUI('feature_wok_title')}</h3>
              <p className="home-feature-desc">{tUI('feature_wok_desc')}</p>
            </div>

            <div className="home-feature-card">
              <span className="home-feature-icon" aria-hidden="true">🌙</span>
              <h3 className="home-feature-title">{tUI('feature_night_title')}</h3>
              <p className="home-feature-desc">{tUI('feature_night_desc')}</p>
            </div>
          </div>
        </section>

        {/* ── 4. Story Teaser Section ────────────────────── */}
        <section className="home-story-teaser">
          <div className="home-story-teaser__inner">
            <div className="home-story-teaser__content">
              <span className="home-section-badge">📖 {tUI('nav_about')}</span>
              <h2 className="home-section-title">{tUI('home_story_teaser_title')}</h2>
              <p className="home-story-teaser__p">{tUI('home_story_teaser_p1')}</p>
              <p className="home-story-teaser__p">{tUI('home_story_teaser_p2')}</p>
              <Link href="/about" className="btn-story-cta">
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
                <div className="home-story-stats">
                  <div className="home-story-stat-box">
                    <span className="home-story-stat-num">04:00</span>
                    <span className="home-story-stat-lbl">AM Midnight</span>
                  </div>
                  <div className="home-story-stat-box">
                    <span className="home-story-stat-num">140+</span>
                    <span className="home-story-stat-lbl">Dishes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. Location & Order Channels ──────────────── */}
        <section className="home-visit-section">
          <div className="home-visit-header">
            <span className="home-section-badge">📍 {tUI('nav_contact')}</span>
            <h2 className="home-section-title">{tUI('visit_us_title')}</h2>
          </div>

          <div className="home-visit-grid">
            {/* Address & Hours Card */}
            <div className="home-visit-card">
              <span className="home-visit-icon" aria-hidden="true">🏠</span>
              <h3 className="home-visit-name">{restaurantInfo.name}</h3>
              <p className="home-visit-text">{t(restaurantInfo, 'address')}</p>
              <p className="home-visit-hours">
                🕐 <strong>{restaurantInfo[`hours_${lang}`] || restaurantInfo.hours_en}</strong>
              </p>
              <div className="home-visit-actions">
                <a
                  href={`tel:${phoneClean}`}
                  className="btn-visit-action btn-visit-action--phone"
                >
                  <span>📞 {restaurantInfo.phone}</span>
                </a>
                <Link href="/contact" className="btn-visit-action btn-visit-action--map">
                  <span>🗺️ {tUI('nav_contact')}</span>
                </Link>
              </div>
            </div>

            {/* Delivery Platforms Card */}
            <div className="home-visit-card">
              <span className="home-visit-icon" aria-hidden="true">🛵</span>
              <h3 className="home-visit-name">
                {lang === 'tr' ? 'Online Sipariş Platformları' : lang === 'ar' ? 'منصات التوصيل السريع' : 'Fast Delivery Platforms'}
              </h3>
              <p className="home-visit-text">
                {lang === 'tr'
                  ? 'Yemeksepeti, Trendyol Yemek ve Getir üzerinden kapınıza sıcacık sipariş verin.'
                  : lang === 'ar'
                  ? 'اطلب مباشرة عبر منصات التوصيل المعتمدة أو اتصل بنا لتوصيل فوري.'
                  : 'Order hot and fresh right to your doorstep through your favorite delivery platforms.'}
              </p>
              <div className="delivery-pills">
                <span className="delivery-pill">⭐ Yemeksepeti (4.6)</span>
                <span className="delivery-pill">⚡ Trendyol Yemek</span>
                <span className="delivery-pill">🛵 Getir Yemek</span>
              </div>
              <a
                href={`https://wa.me/${phoneClean}?text=${encodeURIComponent('Merhaba! Menüden doğrudan sipariş vermek istiyorum.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-order-card"
              >
                <span>💬 WhatsApp Sipariş Hattı</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="footer" role="contentinfo">
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="footer__logo-wrap">
              <div className="logo__badge" style={{ display: 'inline-flex' }}>
                <Image
                  src="/logo-full-badge.png"
                  alt="Lucky Sushi Chinese"
                  width={64}
                  height={46}
                  className="logo__img"
                />
              </div>
            </div>
            <p className="footer__name">Lucky Sushi Chinese</p>
            <p className="footer__tagline">{restaurantInfo[`tagline_${lang}`] || restaurantInfo.tagline_en}</p>
            <p className="footer__info">
              {restaurantInfo[`address_${lang}`] || restaurantInfo.address_en}<br />
              {restaurantInfo[`hours_${lang}`] || restaurantInfo.hours_en}<br />
              <a href={`tel:${phoneClean}`} style={{ color: 'var(--color-red)' }}>{restaurantInfo.phone}</a>
            </p>
          </div>
          <div>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-muted)', lineHeight: 2.2 }}>
              <a href="https://instagram.com/lucky.sushi_chinese" target="_blank" rel="noopener noreferrer">
                📸 {restaurantInfo.instagram}
              </a><br />
              <span>⭐ {restaurantInfo.ratings.yemeksepeti.score}/5 · Yemeksepeti</span><br />
              <span>⭐ {restaurantInfo.ratings.yandex.score}/5 · Yandex</span>
            </p>
          </div>
        </div>
        <p className="footer__copy">
          © {new Date().getFullYear()} Lucky Sushi Chinese — Eyüpsultan, İstanbul · All prices in TL.
        </p>
      </footer>

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
