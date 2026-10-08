'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import { useLang } from '@/context/LangContext';

export default function NotFound() {
  const { lang, dir } = useLang();

  const labels = {
    title: {
      tr: 'Sayfa Bulunamadı',
      en: 'Page Not Found',
      ar: 'الصفحة غير موجودة',
      ru: 'Страница не найдена',
      zh: '页面未找到'
    },
    desc: {
      tr: 'Aradığınız sayfa mevcut değil veya taşınmış olabilir. Taze lezzetlerimizi menümüzden keşfedebilirsiniz.',
      en: 'The page you are looking for does not exist or has been moved. Discover our fresh sushi and Asian specialties in the menu.',
      ar: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها. تفضل باكتشاف أشهى أطباق السوشي والمأكولات الآسيوية في قائمتنا.',
      ru: 'Страница, которую вы ищете, не существует или была перемещена. Ознакомьтесь со свежими суши и азиатскими блюдами в нашем меню.',
      zh: '您查找的页面不存在或已被移除。欢迎在我们的菜单中探索新鲜寿司与亚洲风味。'
    },
    home: {
      tr: 'Ana Sayfa',
      en: 'Home',
      ar: 'الرئيسية',
      ru: 'Главная',
      zh: '首页'
    },
    menu: {
      tr: 'Menüyü İncele',
      en: 'Explore Menu',
      ar: 'تصفح المنيو',
      ru: 'Посмотреть меню',
      zh: '查看菜单'
    }
  };

  const l = (key) => labels[key]?.[lang] || labels[key]?.tr || '';

  return (
    <>
      <Header />
      <main
        id="main-content"
        dir={dir}
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
          {l('title')}
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
          {l('desc')}
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link
            href="/"
            className="btn-primary"
            style={{ display: 'inline-flex' }}
          >
            {l('home')}
          </Link>
          <Link
            href="/menu"
            className="btn-secondary"
            style={{ display: 'inline-flex' }}
          >
            {l('menu')}
          </Link>
        </div>
      </main>
    </>
  );
}
