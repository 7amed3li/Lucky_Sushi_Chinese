'use client';

import React from 'react';
import { Link } from '@/i18n/navigation';
import { 
  FaCode, FaWhatsapp, FaEnvelope, FaArrowRight, FaArrowLeft, 
  FaCheck, FaMobileScreen, FaBolt, FaGlobe, FaArrowUpRightFromSquare
} from 'react-icons/fa6';

export default function DeveloperProfile({ content, isRTL, lang }) {
  const { hero, proof, services, whyMe, process: workProcess, cta } = content;

  return (
    <div
      style={{
        backgroundColor: '#0a0a0c',
        color: '#f5f5f5',
        minHeight: '100vh',
        padding: '3rem 1.25rem 5rem 1.25rem',
      }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div style={{ maxWidth: '920px', margin: '0 auto' }}>
        
        {/* 1. HERO SECTION */}
        <section style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: '1rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 1.1rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(234, 179, 8, 0.12)',
              border: '1px solid rgba(234, 179, 8, 0.35)',
              color: '#eab308',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '1.25rem',
            }}
          >
            <FaCode size={13} />
            <span>{hero.role}</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              margin: '0 0 1rem 0',
              lineHeight: 1.15,
            }}
          >
            {hero.name}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
              color: '#a3a3a3',
              maxWidth: '720px',
              margin: '0 auto 2.2rem auto',
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            {hero.headline}
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
            }}
          >
            <a
              href={cta.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.85rem 1.8rem',
                backgroundColor: '#22c55e',
                color: '#000000',
                fontWeight: 800,
                fontSize: '0.95rem',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(34, 197, 94, 0.25)',
                transition: 'transform 0.15s ease',
              }}
            >
              <FaWhatsapp size={18} />
              <span>{hero.ctaQuote}</span>
            </a>

            <a
              href={cta.portfolioLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.85rem 1.8rem',
                backgroundColor: '#17171a',
                border: '1.5px solid #eab308',
                color: '#eab308',
                fontWeight: 700,
                fontSize: '0.95rem',
                borderRadius: '12px',
                textDecoration: 'none',
                transition: 'background-color 0.15s ease',
              }}
            >
              <span>{hero.ctaWork}</span>
              <FaArrowUpRightFromSquare size={13} />
            </a>
          </div>
        </section>

        {/* 2. REAL PROOF (Case Study Badge) */}
        <section
          style={{
            background: 'linear-gradient(135deg, #18221b 0%, #121814 100%)',
            border: '1.5px solid #2d6a4f',
            borderRadius: '20px',
            padding: '2.5rem 2rem',
            marginBottom: '4rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span
              style={{
                display: 'inline-block',
                color: '#4ade80',
                fontSize: '0.8rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '0.5rem',
              }}
            >
              {proof.title}
            </span>

            <h2
              style={{
                fontSize: 'clamp(1.4rem, 3vw, 1.85rem)',
                fontWeight: 800,
                color: '#ffffff',
                margin: '0 0 1.8rem 0',
                lineHeight: 1.35,
              }}
            >
              {proof.subtitle}
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.5rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                paddingTop: '1.5rem',
              }}
            >
              {proof.points.map((point, index) => (
                <div key={index} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <span
                    style={{
                      color: '#eab308',
                      fontWeight: 900,
                      fontSize: '1.1rem',
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >
                    0{index + 1}
                  </span>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.9rem',
                      color: '#d4d4d8',
                      lineHeight: 1.55,
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
        <section style={{ marginBottom: '4rem' }}>
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              fontWeight: 800,
              color: '#ffffff',
              textAlign: 'center',
              marginBottom: '2rem',
            }}
          >
            {services.title}
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {services.items.map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#141417',
                  border: '1px solid #27272a',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  transition: 'border-color 0.2s ease, transform 0.2s ease',
                }}
              >
                <div
                  style={{
                    color: '#eab308',
                    fontWeight: 900,
                    fontSize: '1.2rem',
                    marginBottom: '0.85rem',
                    paddingBottom: '0.4rem',
                    borderBottom: '1px solid rgba(234, 179, 8, 0.2)',
                    display: 'inline-block',
                  }}
                >
                  0{index + 1}
                </div>
                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    margin: '0 0 0.5rem 0',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.88rem',
                    color: '#a1a1aa',
                    lineHeight: 1.55,
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
            borderTop: '1px solid #27272a',
            borderBottom: '1px solid #27272a',
            padding: '3rem 0',
            marginBottom: '4rem',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              fontWeight: 800,
              color: '#ffffff',
              textAlign: 'center',
              marginBottom: '2rem',
            }}
          >
            {whyMe.title}
          </h2>

          <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {whyMe.items.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid #26262a',
                  borderRadius: '12px',
                  padding: '1.25rem 1.4rem',
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(34, 197, 94, 0.15)',
                    color: '#22c55e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  <FaCheck size={11} />
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.95rem',
                    color: '#e4e4e7',
                    lineHeight: 1.55,
                    fontWeight: 500,
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. THE PROCESS */}
        <section style={{ marginBottom: '4rem' }}>
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              fontWeight: 800,
              color: '#ffffff',
              textAlign: 'center',
              marginBottom: '2.5rem',
            }}
          >
            {workProcess.title}
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {workProcess.items.map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#141417',
                  border: '1px solid #27272a',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#eab308',
                    color: '#000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '1.1rem',
                    marginBottom: '1rem',
                  }}
                >
                  {index + 1}
                </div>
                <h3
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    margin: '0 0 0.4rem 0',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.82rem',
                    color: '#a1a1aa',
                    lineHeight: 1.5,
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
            background: 'linear-gradient(135deg, #1c1917 0%, #0c0a09 100%)',
            border: '1.5px solid #eab308',
            borderRadius: '24px',
            padding: '3rem 2rem',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(234, 179, 8, 0.1)',
            marginBottom: '3rem',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.3rem)',
              fontWeight: 900,
              color: '#ffffff',
              maxWidth: '650px',
              margin: '0 auto 2rem auto',
              lineHeight: 1.3,
            }}
          >
            {cta.title}
          </h2>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
              marginBottom: '1.5rem',
            }}
          >
            <a
              href={cta.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.95rem 2rem',
                backgroundColor: '#22c55e',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '1rem',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(34, 197, 94, 0.3)',
              }}
            >
              <FaWhatsapp size={20} />
              <span>{cta.whatsapp}</span>
            </a>

            <a
              href={cta.emailLink}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.95rem 2rem',
                backgroundColor: '#26262a',
                border: '1px solid #3f3f46',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '1rem',
                borderRadius: '12px',
                textDecoration: 'none',
              }}
            >
              <FaEnvelope size={18} />
              <span>{cta.email}</span>
            </a>
          </div>

          <div>
            <a
              href={cta.portfolioLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#eab308',
                fontSize: '0.9rem',
                fontWeight: 700,
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              }}
            >
              {cta.portfolio}
            </a>
          </div>
        </section>

        {/* 7. RETURN TO HOME */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              color: '#a1a1aa',
              fontSize: '0.92rem',
              fontWeight: 600,
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
            }}
          >
            {isRTL ? <FaArrowRight size={14} /> : <FaArrowLeft size={14} />}
            <span>{content.returnHome}</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
