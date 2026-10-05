const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, '../src/app/page.js');

const newHomePageContent = `'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  FaWhatsapp, FaMoon, FaStar, FaMotorcycle, FaFire, 
  FaFish, FaBookOpen, FaLocationDot, FaHouse, 
  FaPhone, FaMapLocationDot, FaClock, FaBagShopping
} from 'react-icons/fa6';
import { GiChopsticks, GiSushis } from 'react-icons/gi';
import { useLang } from '@/context/LangContext';
import { restaurantInfo, menuItems } from '@/data/menuData';
import Header from '@/components/Header';
import RotatingDishShowcase from '@/components/RotatingDishShowcase';
import DishCard from '@/components/DishCard';
import DishModal from '@/components/DishModal';
import CartDrawer from '@/components/CartDrawer';

// 6 Curated Iconic Bestsellers
const CURATED_BESTSELLER_IDS = [
  'set-canada',
  'set-salmon-lovers',
  'sr-california-8',
  'sr-ebi-tempura',
  'soup-karides-ramen',
  'chicken-general-tso',
];

export default function HomePage() {
  const { lang, t, tUI, dir } = useLang();
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.documentElement.style.setProperty('--scroll-y', \`\${scrollY * 0.35}px\`);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phoneClean = restaurantInfo.phone.replace(/[^0-9]/g, '');

  const whatsappGreetings = {
    tr: 'Merhaba Lucky Sushi & Chinese, menüden sipariş vermek istiyorum.',
    en: 'Hello Lucky Sushi & Chinese, I would like to place an order from the menu.',
    ar: 'مرحباً لاكي سوشي صيني، أود تقديم طلب من المنيو.',
    ru: 'Здравствуйте, Lucky Sushi & Chinese! Хочу сделать заказ по меню.',
    zh: '您好 Lucky Sushi & Chinese，我想根据菜单点餐。',
  };
  const waHeroText = encodeURIComponent(whatsappGreetings[lang] || whatsappGreetings.tr);

  // Retrieve curated products
  const bestsellers = CURATED_BESTSELLER_IDS
    .map((id) => menuItems.find((item) => item.id === id))
    .filter(Boolean);

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
                  alt="Lucky Sushi & Chinese Official Logo"
                  width={140}
                  height={100}
                  className="home-hero__logo-img"
                  priority
                />
              </div>
            </div>

            <p className="home-hero__tag">{tUI('home_hero_tag')}</p>
            <h1 className="home-hero__title">
              Lucky <span>Sushi</span> & Chinese
            </h1>
            <p className="home-hero__sub">{tUI('home_hero_sub')}</p>

            <div className="home-hero__cta-group">
              <Link href="/menu" className="btn-hero-primary" id="hero-menu-cta">
                <GiSushis aria-hidden="true" />
                <span>{tUI('explore_menu_btn')}</span>
                <span aria-hidden="true">{dir === 'rtl' ? '←' : '→'}</span>
              </Link>

              <a
                href={\`https://wa.me/\${phoneClean}?text=\${waHeroText}\`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero-secondary"
                id="hero-whatsapp-cta"
              >
                <FaWhatsapp aria-hidden="true" />
                <span>{tUI('order_now_btn')}</span>
              </a>

              <a
                href={restaurantInfo.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero-tertiary"
                id="hero-map-cta"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  borderRadius: 'var(--btn-radius)',
                  color: 'var(--color-brand-light)',
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'background var(--transition-fast)'
                }}
              >
                <FaMapLocationDot aria-hidden="true" />
                <span>{tUI('home_hero_location_cta')}</span>
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
            {[...Array(3)].map((_, i) => (
              <div key={i} className="home-marquee-item">
                <GiSushis />
                <span>PREMIUM SUSHI</span>
                <FaFire />
                <span>HOT WOK & RAMEN</span>
                <FaMoon />
                <span>OPEN UNTIL 04:00</span>
                <FaStar />
                <span>GOOD FOOD · GOOD FORTUNE</span>
                <FaFish />
                <span>FRESH EVERY DAY</span>
                <GiChopsticks />
                <span>LUCKY SUSHI & CHINESE</span>
                <FaMotorcycle />
                <span>LATE NIGHT ASIAN FLAVORS</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4. Rotating Dish Showcase ── */}
        <RotatingDishShowcase onOpen={setSelectedItem} />

        {/* ── 5. Curated Bestsellers Grid (4-6 Products with Direct Add-to-Cart) ── */}
        <section className="home-bestsellers-section" style={{ maxWidth: '1100px', margin: '0 auto', padding: 'var(--sp-8) var(--page-pad)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--sp-6)' }}>
            <span className="home-section-badge">
              <FaStar style={{ marginInlineEnd: '6px' }} aria-hidden="true" />
              {tUI('bestsellers_section_title')}
            </span>
            <h2 className="home-section-title" style={{ marginTop: '8px' }}>
              {tUI('bestsellers_section_title')}
            </h2>
            <p className="home-section-sub" style={{ maxWidth: '640px', margin: '8px auto 0' }}>
              {tUI('bestsellers_section_sub')}
            </p>
          </div>

          <div className="kardeshler-products-grid" style={{ marginBottom: 'var(--sp-6)' }}>
            {bestsellers.map((item) => (
              <DishCard
                key={item.id}
                item={item}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--sp-4)' }}>
            <Link
              href="/menu"
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 28px',
                fontSize: '0.95rem',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              <GiSushis size={18} />
              <span>{tUI('bestsellers_view_all')}</span>
              <span aria-hidden="true">{dir === 'rtl' ? '←' : '→'}</span>
            </Link>
          </div>
        </section>

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

        {/* ── 7. Story Section (Authentic Brand Manifesto) ────────────────────── */}
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
                  alt="Lucky Sushi & Chinese Heritage"
                  width={220}
                  height={160}
                  className="home-story-logo-art"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. Location & Order Channels ──────────────── */}
        <section className="home-visit-section" id="locations">
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
              const branchBadge = branch[\`badge_\${lang}\`] || branch.badge_tr;
              
              return (
                <div key={branch.id} className="home-visit-card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="home-visit-icon" aria-hidden="true"><FaHouse /></span>
                    <span style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      background: 'rgba(40, 122, 63, 0.1)',
                      color: 'var(--color-brand-primary)',
                      padding: '3px 8px',
                      borderRadius: '4px'
                    }}>
                      {branchBadge}
                    </span>
                  </div>
                  <h3 className="home-visit-name">{branch.name}</h3>
                  <p className="home-visit-text" style={{ flex: 1, marginBottom: 'var(--sp-3)' }}>{branch.address}</p>
                  
                  <div className="home-visit-actions" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <a
                      href={\`https://wa.me/\${whatsappClean}?text=\${waHeroText}\`}
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
                        href={\`tel:\${branchPhoneClean}\`}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                          border: '1px solid var(--color-border)', background: 'var(--color-surface)',
                          color: 'var(--color-text-primary)', padding: '9px', borderRadius: 'var(--btn-radius)',
                          textAlign: 'center', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none'
                        }}
                      >
                        <FaPhone aria-hidden="true" /> {tUI('branch_call_btn') || 'Ara'}
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
                        <FaMapLocationDot aria-hidden="true" /> {tUI('branch_map_btn') || 'Harita'}
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
`;

fs.writeFileSync(pagePath, newHomePageContent, 'utf8');
console.log('Successfully updated src/app/page.js with curated bestsellers and refined positioning.');
