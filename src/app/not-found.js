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
          minHeight: '75vh',
          padding: 'var(--sp-8) var(--page-pad)',
          textAlign: 'center',
          background: 'var(--color-background)',
        }}
      >
        <div
          style={{ fontSize: '4.5rem', marginBottom: 'var(--sp-3)', color: 'var(--color-brand-primary)' }}
          aria-hidden="true"
        >
          🥢
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--sp-3)',
          }}
        >
          Sayfa Bulunamadı
        </h1>
        <p
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: '1.05rem',
            maxWidth: '480px',
            marginBottom: 'var(--sp-6)',
            lineHeight: 1.6,
          }}
        >
          Aradığınız sayfa mevcut değil veya taşınmış olabilir. Taze lezzetlerimizi menümüzden keşfedebilirsiniz.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link
            href="/"
            className="btn-primary"
            style={{ display: 'inline-flex' }}
          >
            Ana Sayfa
          </Link>
          <Link
            href="/menu"
            className="btn-secondary"
            style={{ display: 'inline-flex' }}
          >
            Menüyü İncele
          </Link>
        </div>
      </main>
    </>
  );
}
