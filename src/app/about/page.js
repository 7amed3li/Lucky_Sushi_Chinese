'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/context/LangContext';
import { restaurantInfo } from '@/data/menuData';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';

export default function AboutPage() {
  const { lang, tUI, dir } = useLang();
  const phoneClean = restaurantInfo.phone.replace(/[^0-9]/g, '');

  return (
    <>
      <Header />

      <main id="main-content" className="about-main">
        {/* ── Hero ─────────────────────────────────────── */}
        <section className="about-hero">
          <div className="about-hero__glow" aria-hidden="true" />
          <div className="about-hero__inner">
            <div className="about-hero__logo-box">
              <Image
                src="/logo-full-badge.png"
                alt="Lucky Sushi Chinese Emblem"
                width={120}
                height={86}
                className="about-hero__logo"
                priority
              />
            </div>
            <p className="about-hero__tag">{tUI('about_hero_tag')}</p>
            <h1 className="about-hero__title">{tUI('about_hero_title')}</h1>
            <p className="about-hero__sub">{tUI('about_hero_sub')}</p>
          </div>
        </section>

        {/* ── Pillars of Craft ──────────────────────────── */}
        <section className="about-content">
          <div className="about-container">
            {/* 1. Sushi Craft */}
            <article className="about-story-row">
              <div className="about-story-text">
                <div className="about-story-badge">
                  <span aria-hidden="true">🍣</span>
                  <span>Artisan Sushi</span>
                </div>
                <h2 className="about-story-title">{tUI('about_craft_title')}</h2>
                <p className="about-story-p">{tUI('about_craft_p')}</p>
              </div>
              <div className="about-story-visual">
                <div className="about-visual-card">
                  <span className="about-visual-icon" aria-hidden="true">🥢</span>
                  <p className="about-visual-quote">
                    &ldquo;Her pirinç tanesinde denge, her dilimde tazelik.&rdquo;
                  </p>
                </div>
              </div>
            </article>

            {/* 2. Wok & Chinese */}
            <article className="about-story-row about-story-row--reverse">
              <div className="about-story-text">
                <div className="about-story-badge">
                  <span aria-hidden="true">🔥</span>
                  <span>Wok Heritage</span>
                </div>
                <h2 className="about-story-title">{tUI('about_wok_title')}</h2>
                <p className="about-story-p">{tUI('about_wok_p')}</p>
              </div>
              <div className="about-story-visual">
                <div className="about-visual-card about-visual-card--fire">
                  <span className="about-visual-icon" aria-hidden="true">🥡</span>
                  <p className="about-visual-quote">
                    &ldquo;Yüksek ateşin enerjisi ve asırlık Çin lezzetleri.&rdquo;
                  </p>
                </div>
              </div>
            </article>

            {/* 3. Midnight Service */}
            <article className="about-story-row">
              <div className="about-story-text">
                <div className="about-story-badge">
                  <span aria-hidden="true">🌙</span>
                  <span>04:00 AM Midnight</span>
                </div>
                <h2 className="about-story-title">{tUI('about_midnight_title')}</h2>
                <p className="about-story-p">{tUI('about_midnight_p')}</p>
              </div>
              <div className="about-story-visual">
                <div className="about-visual-card about-visual-card--night">
                  <span className="about-visual-icon" aria-hidden="true">🍜</span>
                  <p className="about-visual-quote">
                    &ldquo;Gecenin en geç saatinde bile sıcacık ve taze.&rdquo;
                  </p>
                </div>
              </div>
            </article>

            {/* Call to Action Banner */}
            <div className="about-cta-box">
              <h3 className="about-cta-title">
                {lang === 'tr' ? 'Bu Lezzetleri Keşfetmeye Hazır mısınız?' : lang === 'ar' ? 'هل أنت مستعد لتجربة هذه النكهات؟' : 'Ready to Experience Our Flavors?'}
              </h3>
              <p className="about-cta-p">
                {lang === 'tr'
                  ? '140\'tan fazla taze sushi, çıtır tempura ve sıcak wok yemeği sizi bekliyor.'
                  : lang === 'ar'
                  ? 'أكثر من 140 صنفاً طازجاً من السوشي وأطباق الووك بانتظارك الآن.'
                  : 'Over 140 fresh sushi, crispy tempura, and fiery wok dishes await you.'}
              </p>
              <div className="about-cta-btns">
                <Link href="/menu" className="btn-hero-primary">
                  <span>🍣</span>
                  <span>{tUI('explore_menu_btn')}</span>
                  <span aria-hidden="true">{dir === 'rtl' ? '←' : '→'}</span>
                </Link>
                <Link href="/contact" className="btn-hero-secondary">
                  <span>📍</span>
                  <span>{tUI('nav_contact')}</span>
                </Link>
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
