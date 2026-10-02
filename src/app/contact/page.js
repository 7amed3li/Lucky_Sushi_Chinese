'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/context/LangContext';
import { restaurantInfo } from '@/data/menuData';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';

export default function ContactPage() {
  const { lang, t, tUI, dir } = useLang();
  const phoneClean = restaurantInfo.phone.replace(/[^0-9]/g, '');

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Lucky Sushi Chinese Çırçır Caddesi No:25 Eyüpsultan İstanbul'
  )}`;

  const whatsappUrl = `https://wa.me/${phoneClean}?text=${encodeURIComponent(
    'Merhaba! Lucky Sushi Chinese hakkında bilgi almak / sipariş vermek istiyorum.'
  )}`;

  return (
    <>
      <Header />

      <main id="main-content" className="contact-main">
        {/* ── Hero ─────────────────────────────────────── */}
        <section className="contact-hero">
          <div className="contact-hero__glow" aria-hidden="true" />
          <div className="contact-hero__inner">
            <div className="contact-hero__logo-box">
              <Image
                src="/logo-full-badge.png"
                alt="Lucky Sushi Chinese"
                width={120}
                height={86}
                className="contact-hero__logo"
                priority
              />
            </div>
            <p className="contact-hero__tag">{tUI('contact_hero_tag')}</p>
            <h1 className="contact-hero__title">{tUI('contact_hero_title')}</h1>
            <p className="contact-hero__sub">{tUI('contact_hero_sub')}</p>
          </div>
        </section>

        {/* ── Contact Grid ─────────────────────────────── */}
        <section className="contact-section">
          <div className="contact-container">
            <div className="contact-cards-grid">
              {/* Card 1: Phone */}
              <div className="contact-card">
                <div className="contact-card__icon" aria-hidden="true">📞</div>
                <h3 className="contact-card__title">{tUI('contact_phone_title')}</h3>
                <p className="contact-card__val">
                  <a href={`tel:${phoneClean}`} className="contact-link">
                    {restaurantInfo.phone}
                  </a>
                </p>
                <p className="contact-card__hint">
                  {lang === 'tr' ? 'Doğrudan telefon ile sipariş ve bilgi hattı' : 'Direct phone order and inquiry line'}
                </p>
                <a href={`tel:${phoneClean}`} className="btn-contact-action btn-contact-action--phone">
                  <span>📞</span>
                  <span>{tUI('call_direct_btn')}</span>
                </a>
              </div>

              {/* Card 2: WhatsApp */}
              <div className="contact-card">
                <div className="contact-card__icon" aria-hidden="true">💬</div>
                <h3 className="contact-card__title">WhatsApp Sipariş & Destek</h3>
                <p className="contact-card__val">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="contact-link">
                    +90 531 486 34 04
                  </a>
                </p>
                <p className="contact-card__hint">
                  {lang === 'tr' ? 'Hızlı sipariş, menü desteği ve canlı konum' : 'Fast ordering, menu questions, and live support'}
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-contact-action btn-contact-action--whatsapp"
                >
                  <span>💬</span>
                  <span>WhatsApp ile Yazın</span>
                </a>
              </div>

              {/* Card 3: Address & Directions */}
              <div className="contact-card">
                <div className="contact-card__icon" aria-hidden="true">📍</div>
                <h3 className="contact-card__title">{tUI('contact_address_title')}</h3>
                <p className="contact-card__val">
                  {t(restaurantInfo, 'address')}
                </p>
                <p className="contact-card__hint">
                  {lang === 'tr' ? 'Alibeyköy, Eyüpsultan / İstanbul' : 'Alibeykoy, Eyupsultan / Istanbul'}
                </p>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-contact-action btn-contact-action--maps"
                >
                  <span>🗺️</span>
                  <span>{tUI('open_in_google_maps')}</span>
                </a>
              </div>

              {/* Card 4: Hours */}
              <div className="contact-card">
                <div className="contact-card__icon" aria-hidden="true">🕐</div>
                <h3 className="contact-card__title">{tUI('contact_hours_title')}</h3>
                <p className="contact-card__val">
                  {restaurantInfo[`hours_${lang}`] || restaurantInfo.hours_en}
                </p>
                <p className="contact-card__hint">
                  {lang === 'tr' ? 'Haftanın her günü gece 04:00\'e kadar kesintisiz' : 'Open 7 days a week continuously until 4:00 AM'}
                </p>
                <div className="open-badge">
                  <span className="open-badge__dot" aria-hidden="true" />
                  <span>{lang === 'tr' ? 'Gece 04:00\'e kadar Açık' : 'Open Until 04:00 AM'}</span>
                </div>
              </div>
            </div>

            {/* Delivery Platforms Section */}
            <div className="contact-delivery-box">
              <h3 className="contact-delivery-title">
                {lang === 'tr' ? '🛵 Online Paket Servis Platformlarımız' : '🛵 Online Delivery Platforms'}
              </h3>
              <p className="contact-delivery-sub">
                {lang === 'tr'
                  ? 'Dilediğiniz sipariş uygulamasından Lucky Sushi Chinese lezzetlerine anında ulaşabilirsiniz:'
                  : 'You can order your favorite Lucky Sushi Chinese dishes directly through top food apps:'}
              </p>
              <div className="contact-delivery-grid">
                <div className="delivery-card">
                  <span className="delivery-card__icon">⭐</span>
                  <div>
                    <h4 className="delivery-card__title">Yemeksepeti</h4>
                    <p className="delivery-card__score">4.6 / 5 ({restaurantInfo.ratings.yemeksepeti.count}+ değerlendirme)</p>
                  </div>
                </div>
                <div className="delivery-card">
                  <span className="delivery-card__icon">⚡</span>
                  <div>
                    <h4 className="delivery-card__title">Trendyol Yemek</h4>
                    <p className="delivery-card__score">Hızlı teslimat & puan fırsatı</p>
                  </div>
                </div>
                <div className="delivery-card">
                  <span className="delivery-card__icon">🛵</span>
                  <div>
                    <h4 className="delivery-card__title">Getir Yemek</h4>
                    <p className="delivery-card__score">Sıcak & taze teslimat</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Visual Box */}
            <div className="contact-map-card">
              <div className="contact-map-info">
                <span className="contact-map-badge">📍 Eyüpsultan, İstanbul</span>
                <h3 className="contact-map-heading">Lucky Sushi Chinese Restaurant</h3>
                <p className="contact-map-desc">
                  Çırçır Cad. No:25, Eyüpsultan / İstanbul (Alibeyköy)
                </p>
                <div className="contact-map-buttons">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-hero-primary"
                  >
                    <span>🗺️</span>
                    <span>{tUI('open_in_google_maps')}</span>
                    <span aria-hidden="true">{dir === 'rtl' ? '←' : '→'}</span>
                  </a>
                  <Link href="/menu" className="btn-hero-secondary">
                    <span>🍣</span>
                    <span>{tUI('nav_menu')}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer" role="contentinfo">
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="logo__badge" style={{ display: 'inline-flex', marginBottom: 12 }}>
              <Image
                src="/logo-full-badge.png"
                alt="Lucky Sushi Chinese"
                width={64}
                height={46}
                className="logo__img"
              />
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

      <CartDrawer />
    </>
  );
}
