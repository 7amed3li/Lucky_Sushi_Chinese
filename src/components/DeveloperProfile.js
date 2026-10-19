'use client';

import React from 'react';
import { Link } from '@/i18n/navigation';
import { LuCode, LuMail, LuArrowRight, LuArrowLeft, LuCheck, LuLayers, LuShieldCheck, LuCpu } from 'react-icons/lu';
import { FaWhatsapp } from 'react-icons/fa6';

export default function DeveloperProfile({ content, isRTL, lang }) {
  const { hero, story, project, principles, technologies, cta } = content;

  const trackEvent = (eventName) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: eventName });
    }
  };

  const returnHomeText = {
    tr: '← Lucky Sushi & Chinese Ana Sayfasına Dön',
    en: '← Return to Lucky Sushi & Chinese Home',
    ar: 'العودة إلى الصفحة الرئيسية لـ Lucky Sushi & Chinese →',
    ru: '← Вернуться на главную Lucky Sushi & Chinese',
    zh: '← 返回 Lucky Sushi & Chinese 首页',
  };

  const ArrowIcon = isRTL ? LuArrowLeft : LuArrowRight;

  return (
    <div
      className={`developer-profile ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{
        backgroundColor: 'var(--color-background, #FDFBF7)',
        color: 'var(--color-text-primary, #1B1813)',
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
          gap: 'clamp(40px, 5vw, 60px)',
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
              backgroundColor: 'rgba(212, 163, 115, 0.15)',
              border: '1px solid rgba(212, 163, 115, 0.3)',
              color: 'var(--color-accent, #B07D4F)',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '20px',
            }}
          >
            <LuCode size={15} />
            <span>{hero.badge || hero.role}</span>
          </div>

          <h1
            style={{
              fontFamily: isRTL ? 'var(--font-ar-serif, serif)' : 'var(--font-serif, serif)',
              fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
              fontWeight: 800,
              color: 'var(--color-text-primary, #1B1813)',
              letterSpacing: '-0.02em',
              margin: '0 0 12px 0',
              lineHeight: 1.18,
            }}
          >
            {hero.name}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.1rem, 2.2vw, 1.25rem)',
              color: 'var(--color-brand-primary, #C8102E)',
              fontWeight: 700,
              margin: '0 0 18px 0',
            }}
          >
            {hero.role}
          </p>

          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.12rem)',
              color: 'var(--color-text-secondary, #5C5549)',
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
                padding: '13px 26px',
                backgroundColor: '#25D366',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.96rem',
                borderRadius: '10px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(37, 211, 102, 0.25)',
                transition: 'transform 0.2s ease',
              }}
            >
              <FaWhatsapp size={17} />
              <span>{hero.ctaContact || cta.whatsapp}</span>
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
                padding: '13px 26px',
                backgroundColor: 'transparent',
                border: '1.5px solid var(--color-text-primary, #1B1813)',
                color: 'var(--color-text-primary, #1B1813)',
                fontWeight: 700,
                fontSize: '0.96rem',
                borderRadius: '10px',
                textDecoration: 'none',
                transition: 'background 0.2s ease',
              }}
            >
              <span>{hero.ctaPortfolio || cta.portfolio}</span>
            </a>
          </div>
        </section>

        {/* 2. STORY & BACKGROUND */}
        {story && (
          <section
            style={{
              backgroundColor: 'var(--color-surface, #FFFFFF)',
              borderRadius: '20px',
              padding: 'clamp(28px, 4vw, 38px)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
            }}
          >
            <h2
              style={{
                fontFamily: isRTL ? 'var(--font-ar-serif, serif)' : 'var(--font-serif, serif)',
                fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
                fontWeight: 700,
                color: 'var(--color-text-primary, #1B1813)',
                margin: '0 0 16px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <LuCpu size={22} color="var(--color-accent, #B07D4F)" />
              <span>{story.title}</span>
            </h2>

            <p
              style={{
                fontSize: '1.02rem',
                fontWeight: 600,
                color: 'var(--color-text-primary, #1B1813)',
                lineHeight: 1.6,
                marginBottom: '16px',
              }}
            >
              {story.intro}
            </p>

            {story.paragraphs && story.paragraphs.map((p, idx) => (
              <p
                key={idx}
                style={{
                  fontSize: '0.96rem',
                  color: 'var(--color-text-secondary, #5C5549)',
                  lineHeight: 1.7,
                  margin: '0 0 14px 0',
                }}
              >
                {p}
              </p>
            ))}
          </section>
        )}

        {/* 3. THE PROJECT — REAL ARCHITECTURE DECISIONS */}
        {project && (
          <section
            style={{
              backgroundColor: 'var(--color-brand-dark, #1B1813)',
              color: '#F6F1E8',
              borderRadius: '20px',
              padding: 'clamp(28px, 5vw, 40px)',
              boxShadow: '0 6px 24px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <span
                style={{
                  color: 'var(--color-accent, #D4A373)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                LUCKY SUSHI CHINESE
              </span>
              <h2
                style={{
                  fontFamily: isRTL ? 'var(--font-ar-serif, serif)' : 'var(--font-serif, serif)',
                  fontSize: 'clamp(1.4rem, 2.8vw, 1.9rem)',
                  fontWeight: 700,
                  margin: '0 0 8px 0',
                  color: '#FFFFFF',
                }}
              >
                {project.title}
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'rgba(246, 241, 232, 0.75)', margin: 0 }}>
                {project.subtitle}
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '20px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {project.items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div
                    style={{
                      color: 'var(--color-accent, #D4A373)',
                      fontWeight: 800,
                      fontSize: '1rem',
                      marginBottom: '8px',
                    }}
                  >
                    0{index + 1}
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 8px 0', color: '#FFFFFF' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'rgba(246, 241, 232, 0.8)', lineHeight: 1.6, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. PRINCIPLES */}
        {principles && (
          <section
            style={{
              backgroundColor: 'var(--color-surface, #FFFFFF)',
              borderRadius: '20px',
              padding: 'clamp(28px, 4vw, 36px)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
            }}
          >
            <h2
              style={{
                fontFamily: isRTL ? 'var(--font-ar-serif, serif)' : 'var(--font-serif, serif)',
                fontSize: 'clamp(1.3rem, 2.4vw, 1.7rem)',
                fontWeight: 700,
                color: 'var(--color-text-primary, #1B1813)',
                margin: '0 0 20px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <LuShieldCheck size={22} color="var(--color-accent, #B07D4F)" />
              <span>{principles.title}</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {principles.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <LuCheck size={18} color="var(--color-brand-primary, #C8102E)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <p style={{ fontSize: '0.94rem', color: 'var(--color-text-primary, #1B1813)', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. TECHNOLOGIES — CLEARLY SEPARATED */}
        {technologies && (
          <section
            style={{
              backgroundColor: 'var(--color-surface, #FFFFFF)',
              borderRadius: '20px',
              padding: 'clamp(28px, 4vw, 36px)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
            }}
          >
            <h2
              style={{
                fontFamily: isRTL ? 'var(--font-ar-serif, serif)' : 'var(--font-serif, serif)',
                fontSize: 'clamp(1.3rem, 2.4vw, 1.7rem)',
                fontWeight: 700,
                color: 'var(--color-text-primary, #1B1813)',
                margin: '0 0 20px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <LuLayers size={22} color="var(--color-accent, #B07D4F)" />
              <span>{technologies.title}</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h3 style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--color-text-secondary, #5C5549)', margin: '0 0 10px 0' }}>
                  {technologies.projectTitle}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {technologies.projectItems.map((tech, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(200, 16, 46, 0.08)',
                        color: 'var(--color-brand-primary, #C8102E)',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        border: '1px solid rgba(200, 16, 46, 0.2)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--color-text-secondary, #5C5549)', margin: '0 0 10px 0' }}>
                  {technologies.broaderTitle}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {technologies.broaderItems.map((tech, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        color: 'var(--color-text-primary, #1B1813)',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 6. CONTACT & CONNECT */}
        <section
          style={{
            backgroundColor: 'var(--color-brand-dark, #1B1813)',
            color: '#FFFFFF',
            borderRadius: '20px',
            padding: 'clamp(28px, 5vw, 42px)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: isRTL ? 'var(--font-ar-serif, serif)' : 'var(--font-serif, serif)',
              fontSize: 'clamp(1.3rem, 2.8vw, 1.8rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              margin: 0,
            }}
          >
            {cta.title}
          </h2>

          <p style={{ fontSize: '0.94rem', color: 'rgba(246, 241, 232, 0.75)', margin: 0, maxWidth: '580px' }}>
            {cta.subtitle}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
            <a
              href={cta.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                backgroundColor: '#25D366',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.94rem',
                borderRadius: '10px',
                textDecoration: 'none',
              }}
            >
              <FaWhatsapp size={18} />
              <span>{cta.whatsapp}</span>
            </a>

            <a
              href={cta.emailLink}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.94rem',
                borderRadius: '10px',
                textDecoration: 'none',
              }}
            >
              <LuMail size={18} />
              <span>{cta.email}</span>
            </a>
          </div>

          <div style={{ paddingTop: '6px' }}>
            <a
              href={cta.portfolioLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--color-accent, #D4A373)',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                fontSize: '0.92rem',
                fontWeight: 600,
              }}
            >
              <span>{cta.portfolio}</span>
            </a>
          </div>
        </section>

        {/* 7. RETURN TO RESTAURANT HOMEPAGE */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '8px' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.94rem',
              color: 'var(--color-brand-primary, #C8102E)',
              textDecoration: 'none',
              fontWeight: 700,
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: 'rgba(200, 16, 46, 0.06)',
            }}
          >
            <span>{returnHomeText[lang] || returnHomeText.tr}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
