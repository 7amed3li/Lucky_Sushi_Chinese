'use client';

import React from 'react';
import { Link } from '@/i18n/navigation';
import { LuCode, LuMail, LuArrowRight, LuArrowLeft } from 'react-icons/lu';
import { FaWhatsapp } from 'react-icons/fa6';

export default function DeveloperProfile({ content, isRTL, lang }) {
  const { hero, proof, services, whyMe, process: workProcess, cta } = content;

  const trackEvent = (eventName) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: eventName });
    }
  };

  const returnHomeText = {
    tr: 'Lucky Sushi & Chinese Ana Sayfasına Dön',
    en: 'Return to Lucky Sushi & Chinese',
    ar: 'العودة إلى الصفحة الرئيسية لـ Lucky Sushi & Chinese',
    ru: 'Вернуться на главную Lucky Sushi & Chinese',
    zh: '返回 Lucky Sushi & Chinese 首页',
  };

  const ArrowIcon = isRTL ? LuArrowLeft : LuArrowRight;

  return (
    <div
      className={`developer-profile ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text-primary)',
        minHeight: '100vh',
        padding: 'clamp(40px, 6vw, 72px) var(--page-pad) clamp(60px, 8vw, 96px)',
      }}
    >
      <div
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(44px, 6vw, 64px)',
        }}
      >
        {/* 1. HERO SECTION */}
        <section style={{ textAlign: 'center', paddingTop: '8px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(40, 122, 63, 0.1)',
              border: '1px solid rgba(40, 122, 63, 0.25)',
              color: 'var(--color-brand-primary)',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '20px',
            }}
          >
            <LuCode size={14} />
            <span>{hero.role}</span>
          </div>

          <h1
            style={{
              fontFamily: isRTL ? 'var(--font-ar-serif)' : 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 800,
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
              margin: '0 0 16px 0',
              lineHeight: 1.18,
            }}
          >
            {hero.name}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
              color: 'var(--color-text-secondary)',
              maxWidth: '720px',
              margin: '0 auto 28px auto',
              lineHeight: 1.65,
              fontWeight: 500,
            }}
          >
            {hero.headline}
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px',
              justifyContent: 'center',
            }}
          >
            <a
              href={cta.whatsappLink}
              onClick={() => trackEvent('cta_whatsapp_click')}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px 28px',
                backgroundColor: 'var(--color-brand-primary)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.98rem',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(40, 122, 63, 0.25)',
                transition: 'all 0.2s ease',
              }}
            >
              {hero.ctaQuote}
            </a>

            <a
              href={cta.portfolioLink}
              onClick={() => trackEvent('cta_portfolio_click')}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 28px',
                backgroundColor: 'transparent',
                border: '2px solid var(--color-brand-primary)',
                color: 'var(--color-brand-primary)',
                fontWeight: 700,
                fontSize: '0.98rem',
                borderRadius: '12px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <span>{hero.ctaWork}</span>
            </a>
          </div>
        </section>

        {/* 2. REAL PROOF (Case Study Style) */}
        <section
          style={{
            backgroundColor: 'var(--color-brand-dark)',
            color: 'var(--color-brand-light)',
            borderRadius: '24px',
            padding: 'clamp(28px, 5vw, 44px)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {/* Subtle brand glow overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '280px',
              height: '280px',
              background: 'radial-gradient(circle, rgba(40, 122, 63, 0.22) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          />

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <span
                style={{
                  color: 'var(--color-brand-primary)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                {proof.title}
              </span>
              <h2
                style={{
                  fontFamily: isRTL ? 'var(--font-ar-serif)' : 'var(--font-serif)',
                  fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
                  fontWeight: 700,
                  color: 'var(--color-brand-light)',
                  lineHeight: 1.35,
                  margin: 0,
                }}
              >
                {proof.subtitle}
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '20px 32px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(246, 241, 232, 0.1)',
              }}
            >
              {proof.points.map((point, index) => (
                <div key={index} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <span
                    style={{
                      color: 'var(--color-brand-primary)',
                      fontWeight: 800,
                      fontSize: '1.15rem',
                      lineHeight: 1,
                      paddingTop: '3px',
                      flexShrink: 0,
                    }}
                  >
                    0{index + 1}
                  </span>
                  <p
                    style={{
                      fontSize: '0.92rem',
                      fontWeight: 400,
                      lineHeight: 1.65,
                      margin: 0,
                      color: 'rgba(246, 241, 232, 0.88)',
                    }}
                  >
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. SERVICES */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <h2
            style={{
              fontFamily: isRTL ? 'var(--font-ar-serif)' : 'var(--font-serif)',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              textAlign: 'center',
              margin: 0,
            }}
          >
            {services.title}
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {services.items.map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  padding: '24px',
                  borderRadius: '16px',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'border-color 0.2s ease, transform 0.2s ease',
                }}
              >
                <div
                  style={{
                    color: 'var(--color-brand-primary)',
                    fontWeight: 800,
                    fontSize: '1.25rem',
                    marginBottom: '12px',
                    borderBottom: '1px solid rgba(40, 122, 63, 0.2)',
                    paddingBottom: '6px',
                    display: 'inline-block',
                  }}
                >
                  0{index + 1}
                </div>
                <h3
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    margin: '0 0 8px 0',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. WHY ME */}
        <section
          style={{
            borderTop: '1px solid var(--color-border)',
            borderBottom: '1px solid var(--color-border)',
            padding: '36px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <h2
            style={{
              fontFamily: isRTL ? 'var(--font-ar-serif)' : 'var(--font-serif)',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              textAlign: 'center',
              margin: 0,
            }}
          >
            {whyMe.title}
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              maxWidth: '680px',
              margin: '0 auto',
              width: '100%',
            }}
          >
            {whyMe.items.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  backgroundColor: 'var(--color-surface)',
                  padding: '18px 22px',
                  borderRadius: '12px',
                  border: '1px solid rgba(216, 206, 192, 0.7)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-brand-primary)',
                    flexShrink: 0,
                    marginTop: '8px',
                  }}
                />
                <p
                  style={{
                    fontSize: '0.98rem',
                    color: 'var(--color-text-primary)',
                    fontWeight: 500,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. THE PROCESS */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <h2
            style={{
              fontFamily: isRTL ? 'var(--font-ar-serif)' : 'var(--font-serif)',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              textAlign: 'center',
              margin: 0,
            }}
          >
            {workProcess.title}
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '20px',
            }}
          >
            {workProcess.items.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '12px',
                  backgroundColor: 'var(--color-surface)',
                  padding: '22px 16px',
                  borderRadius: '16px',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-brand-dark)',
                    color: 'var(--color-brand-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  {index + 1}
                </div>
                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    margin: 0,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.55,
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. FINAL CTA */}
        <section
          style={{
            backgroundColor: 'var(--color-brand-dark)',
            color: 'var(--color-brand-light)',
            borderRadius: '24px',
            padding: 'clamp(32px, 6vw, 48px)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            alignItems: 'center',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <h2
            style={{
              fontFamily: isRTL ? 'var(--font-ar-serif)' : 'var(--font-serif)',
              fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
              fontWeight: 700,
              color: 'var(--color-brand-light)',
              maxWidth: '640px',
              margin: 0,
              lineHeight: 1.35,
            }}
          >
            {cta.title}
          </h2>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px',
              justifyContent: 'center',
            }}
          >
            <a
              href={cta.whatsappLink}
              onClick={() => trackEvent('cta_whatsapp_click')}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                backgroundColor: '#25D366',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.98rem',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 6px 18px rgba(37, 211, 102, 0.25)',
                transition: 'all 0.2s ease',
              }}
            >
              <FaWhatsapp size={19} />
              <span>{cta.whatsapp}</span>
            </a>

            <a
              href={cta.emailLink}
              onClick={() => trackEvent('cta_email_click')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'var(--color-brand-light)',
                fontWeight: 700,
                fontSize: '0.98rem',
                borderRadius: '12px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <LuMail size={19} />
              <span>{cta.email}</span>
            </a>
          </div>

          <div style={{ paddingTop: '8px' }}>
            <a
              href={cta.portfolioLink}
              onClick={() => trackEvent('cta_portfolio_click')}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--color-brand-primary)',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                fontSize: '0.94rem',
                fontWeight: 600,
                transition: 'opacity 0.2s ease',
              }}
            >
              <span>{cta.portfolio}</span>
            </a>
          </div>
        </section>

        {/* Return to home link */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.92rem',
              color: 'var(--color-text-secondary)',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'color 0.2s ease',
            }}
          >
            <ArrowIcon size={16} />
            <span>{returnHomeText[lang] || returnHomeText.tr}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
