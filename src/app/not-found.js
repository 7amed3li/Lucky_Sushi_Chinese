import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <html lang="tr">
      <body style={{
        margin: 0,
        padding: '20px',
        background: '#141416',
        color: '#FAF8F5',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '480px' }}>
          <h1 style={{ fontSize: '4rem', margin: '0 0 12px', color: '#D4A373' }}>404</h1>
          <h2 style={{ fontSize: '1.4rem', margin: '0 0 12px', fontWeight: 600 }}>Sayfa Bulunamadı / Page Not Found</h2>
          <p style={{ fontSize: '0.95rem', margin: '0 0 24px', color: '#9CA3AF', lineHeight: 1.5 }}>
            Aradığınız sayfa bulunamadı. Lütfen ana sayfaya dönün.
          </p>
          <Link
            href="/tr/menu"
            style={{
              display: 'inline-block',
              background: '#b91c1c',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              boxShadow: '0 4px 12px rgba(185, 28, 28, 0.4)'
            }}
          >
            Menüye Dön / Go to Menu
          </Link>
        </div>
      </body>
    </html>
  );
}
