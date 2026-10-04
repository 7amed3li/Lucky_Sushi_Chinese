'use client';

import Link from 'next/link';
import Header from '@/components/Header';

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          padding: 'var(--sp-8) var(--page-pad)',
          textAlign: 'center',
          background: 'var(--warm-cream)',
        }}
      >
        <div
          style={{ fontSize: '5rem', marginBottom: 'var(--sp-4)', opacity: 0.6 }}
          aria-hidden="true"
        >
          🥢
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-heading-en)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: 'var(--roasted-cacao)',
            marginBottom: 'var(--sp-3)',
          }}
        >
          Sayfa Bulunamadı
        </h1>
        <p
          style={{
            color: 'var(--soft-taupe)',
            fontSize: '1.1rem',
            maxWidth: '500px',
            marginBottom: 'var(--sp-6)',
            lineHeight: 1.6,
          }}
        >
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link
            href="/"
            className="btn-hero-primary"
            style={{ display: 'inline-flex', padding: '12px 28px' }}
          >
            Ana Sayfa
          </Link>
          <Link
            href="/menu"
            className="btn-hero-secondary"
            style={{ display: 'inline-flex', padding: '12px 28px' }}
          >
            Menüyü İncele
          </Link>
        </div>
      </main>
    </>
  );
}
