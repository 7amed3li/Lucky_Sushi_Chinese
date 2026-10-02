'use client';

import Image from 'next/image';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useLang } from '@/context/LangContext';
import { menuItems, menuCategories, quickFilters, restaurantInfo } from '@/data/menuData';
import LangSwitcher from '@/components/LangSwitcher';
import DishCard from '@/components/DishCard';
import DishModal from '@/components/DishModal';

// ── Header ───────────────────────────────────────
function Header({ onSearch, searchValue }) {
  const { lang, t } = useLang();
  const searchPlaceholder = {
    tr: 'Ara... Dynamite, Ramen...',
    en: 'Search... Dynamite, Ramen...',
    ar: 'ابحث... ديناميت، رامن...',
    zh: '搜索... 炸弹虾、拉面...',
  };

  return (
    <header className="header">
      <div className="header__inner">
        <a href="/" className="logo" id="site-logo" aria-label="Lucky Sushi Chinese — Home">
          <Image
            src="/logo.png"
            alt="Lucky Sushi Chinese logo"
            width={56}
            height={56}
            className="logo__img"
            priority
          />
          <div className="logo__text">
            <span className="logo__name">Lucky Sushi Chinese</span>
            <span className="logo__sub">Eyüpsultan, İstanbul · Open until 4AM</span>
          </div>
        </a>

        <div className="header__actions">
          <div className="search-bar" role="search">
            <svg className="search-bar__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              id="menu-search"
              type="search"
              placeholder={searchPlaceholder[lang]}
              value={searchValue}
              onChange={(e) => onSearch(e.target.value)}
              aria-label="Search menu"
            />
          </div>
          <LangSwitcher />
        </div>
      </div>
    </header>
  );
}

// ── Hero ─────────────────────────────────────────
function Hero() {
  const { lang, t } = useLang();
  const info = restaurantInfo;

  const ratingLabel = {
    tr: 'değerlendirme', en: 'reviews', ar: 'تقييم', zh: '评价',
  };
  const deliveryLabel = {
    tr: `Min. ${info.delivery_min_tl} TL sepet`, en: `Min. ${info.delivery_min_tl} TL order`,
    ar: `حد أدنى ${info.delivery_min_tl} ل.ت`, zh: `最低 ${info.delivery_min_tl} TL`,
  };
  const openLabel = {
    tr: 'Saat 04:00\'a kadar açık', en: 'Open until 4AM', ar: 'مفتوح حتى 04:00', zh: '营业至凌晨4点',
  };

  return (
    <section className="hero" aria-label="Restaurant info">
      <p className="hero__label">
        <span aria-hidden="true">🥢</span>
        {lang === 'tr' ? 'Asya Mutfağı' : lang === 'ar' ? 'مطبخ آسيوي' : lang === 'zh' ? '亚洲美食' : 'Asian Cuisine'}
      </p>
      <h1 className="hero__title">
        Lucky <span>Sushi</span> Chinese
      </h1>
      <p className="hero__tagline">{t(info, 'tagline')}</p>

      <div className="hero__meta">
        <span className="rating-badge" aria-label="Yemeksepeti rating">
          <span className="rating-badge__star" aria-hidden="true">★</span>
          {info.ratings.yemeksepeti.score}
          <span className="rating-badge__count">({info.ratings.yemeksepeti.count} {ratingLabel[lang]})</span>
        </span>
        <span className="hero__meta-item">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          {t(info, 'address').split(',')[0]}
        </span>
        <span className="hero__meta-item">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
          </svg>
          {openLabel[lang]}
        </span>
        <span className="hero__meta-item">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="m5 12 7-7 7 7"/><path d="M12 5v14"/>
          </svg>
          {deliveryLabel[lang]}
        </span>
      </div>
    </section>
  );
}

// ── Info Banner ───────────────────────────────────
function InfoBanner() {
  const { lang } = useLang();
  const items = [
    {
      icon: '📞',
      label: { tr: 'Sipariş', en: 'Order', ar: 'طلب', zh: '订餐' },
      value: restaurantInfo.phone,
      href: `tel:${restaurantInfo.phone.replace(/\s/g, '')}`,
    },
    {
      icon: '📍',
      label: { tr: 'Adres', en: 'Address', ar: 'العنوان', zh: '地址' },
      value: { tr: 'Çırçır Cad. No:25, Eyüpsultan', en: 'Çırçır St. No:25, Eyüpsultan', ar: 'شارع تشيرتشير 25', zh: '奇尔奇尔25号' }[lang],
    },
    {
      icon: '🕐',
      label: { tr: 'Saat', en: 'Hours', ar: 'الساعات', zh: '营业时间' },
      value: restaurantInfo[`hours_${lang}`] || restaurantInfo.hours_en,
    },
    {
      icon: '📸',
      label: { tr: 'Instagram', en: 'Instagram', ar: 'إنستغرام', zh: 'Instagram' },
      value: restaurantInfo.instagram,
      href: `https://instagram.com/lucky.sushi_chinese`,
    },
  ];

  return (
    <div className="info-banner" role="complementary" aria-label="Restaurant details">
      {items.map((item) => (
        <div key={item.icon} className="info-banner__item">
          <span className="info-banner__icon" aria-hidden="true">{item.icon}</span>
          <span>
            <strong>{item.label[lang]}: </strong>
            {item.href ? (
              <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                {item.value}
              </a>
            ) : item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Quick Filters ─────────────────────────────────
function QuickFilters({ active, onChange }) {
  const { lang, t } = useLang();
  return (
    <div className="filter-section" aria-label="Quick filters">
      <div className="filter-scroll" role="group">
        {quickFilters.map((f) => (
          <button
            key={f.id}
            id={`filter-${f.id}`}
            className={`filter-chip${active === f.id ? ' filter-chip--active' : ''}`}
            onClick={() => onChange(f.id)}
            aria-pressed={active === f.id}
          >
            <span className="filter-chip__emoji" aria-hidden="true">{f.emoji}</span>
            {t(f, 'label')}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Category Nav ──────────────────────────────────
function CategoryNav({ activeCategory, onSelect }) {
  const { lang, t } = useLang();
  const scrollRef = useRef(null);

  // Scroll active tab into view
  useEffect(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current.querySelector('.cat-tab--active');
    if (el) el.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }, [activeCategory]);

  return (
    <nav className="category-nav" aria-label="Menu categories">
      <div className="category-nav__scroll" ref={scrollRef} role="tablist">
        {menuCategories.map((cat) => (
          <button
            key={cat.id}
            id={`cat-tab-${cat.id}`}
            className={`cat-tab${activeCategory === cat.id ? ' cat-tab--active' : ''}`}
            onClick={() => onSelect(cat.id)}
            role="tab"
            aria-selected={activeCategory === cat.id}
          >
            <span aria-hidden="true">{cat.emoji} </span>
            {t(cat, 'label')}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ── Menu Section ──────────────────────────────────
function MenuSection({ category, items, onOpen }) {
  const { lang, t } = useLang();
  if (!items.length) return null;

  const SECTION_BADGE = {
    'sushi-sets': { tr: 'Paylaşım', en: 'Sharing', ar: 'مشترك', zh: '分享' },
    'special-rolls': { tr: 'Şef Favorisi', en: "Chef's Pick", ar: 'اختيار الشيف', zh: '主厨推荐' },
    'crunchy-cooked': { tr: 'Başlangıç İçin', en: 'Beginner Friendly', ar: 'للمبتدئين', zh: '新手友好' },
    'ramen-soups': { tr: 'Sıcak & Doyurucu', en: 'Hot & Hearty', ar: 'ساخن ومشبع', zh: '热食饱腹' },
    desserts: { tr: 'Tatlı Bitişler', en: 'Sweet Endings', ar: 'نهايات حلوة', zh: '甜蜜收尾' },
  };

  const badge = SECTION_BADGE[category.id]?.[lang];

  return (
    <section
      className="menu-section"
      id={`section-${category.id}`}
      aria-labelledby={`heading-${category.id}`}
    >
      <div className="section-header">
        <h2 className="section-title" id={`heading-${category.id}`}>
          <span aria-hidden="true">{category.emoji} </span>
          {t(category, 'label')}
        </h2>
        {badge && <span className="section-badge">{badge}</span>}
        <span className="section-count">{items.length}</span>
      </div>

      <div className={`menu-grid${category.id === 'sushi-sets' ? ' menu-grid--featured' : ''}`}>
        {items.map((item, i) => (
          <DishCard
            key={item.id}
            item={item}
            onOpen={onOpen}
            style={{ animationDelay: `${i * 40}ms` }}
          />
        ))}
      </div>
    </section>
  );
}

// ── Scroll-to-top ─────────────────────────────────
function ScrollTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <button
      className={`scroll-top${visible ? ' scroll-top--visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      id="scroll-top-btn"
    >
      ↑
    </button>
  );
}

// ── Footer ────────────────────────────────────────
function Footer() {
  const { lang } = useLang();
  const info = restaurantInfo;
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        <div className="footer__brand">
          <p className="footer__name">🥢 Lucky Sushi Chinese</p>
          <p className="footer__tagline">{info[`tagline_${lang}`] || info.tagline_en}</p>
          <p className="footer__info">
            {info[`address_${lang}`] || info.address_en}<br />
            {info[`hours_${lang}`] || info.hours_en}<br />
            <a href={`tel:${info.phone.replace(/\s/g, '')}`} style={{ color: 'var(--color-red)' }}>{info.phone}</a>
          </p>
        </div>
        <div>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', lineHeight: 2 }}>
            <a href={`https://instagram.com/lucky.sushi_chinese`} target="_blank" rel="noopener noreferrer">
              📸 {info.instagram}
            </a><br />
            <span>⭐ {info.ratings.yemeksepeti.score}/5 · Yemeksepeti</span><br />
            <span>⭐ {info.ratings.yandex.score}/5 · Yandex</span>
          </p>
        </div>
      </div>
      <p className="footer__copy">
        © {new Date().getFullYear()} Lucky Sushi Chinese — Eyüpsultan, İstanbul · All prices in TL · Confirm prices before ordering.
      </p>
    </footer>
  );
}

// ══════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════
export default function MenuPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const sectionRefs = useRef({});

  // ── Filter + Search logic ─────────────────────
  const filteredItems = useMemo(() => {
    let items = menuItems;

    // Quick filter
    if (activeFilter !== 'all') {
      items = items.filter((item) => item.tags.includes(activeFilter));
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((item) =>
        item.name_tr?.toLowerCase().includes(q) ||
        item.name_en?.toLowerCase().includes(q) ||
        item.name_ar?.toLowerCase().includes(q) ||
        item.name_zh?.toLowerCase().includes(q) ||
        item.description_en?.toLowerCase().includes(q) ||
        item.ingredients?.some((i) => i.toLowerCase().includes(q))
      );
    }

    return items;
  }, [activeFilter, searchQuery]);

  // ── Group by category ─────────────────────────
  const groupedItems = useMemo(() => {
    const groups = {};
    menuCategories.forEach((cat) => {
      groups[cat.id] = filteredItems.filter((item) => item.category === cat.id);
    });
    return groups;
  }, [filteredItems]);

  // ── Scroll to section on cat click ───────────
  const handleCategorySelect = useCallback((catId) => {
    setActiveCategory(catId);
    setActiveFilter('all');
    setSearchQuery('');
    const el = document.getElementById(`section-${catId}`);
    if (el) {
      const offset = 64 + 48; // header + cat nav
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  // ── Intersection observer for active cat ─────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace('section-', '');
            setActiveCategory(id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    menuCategories.forEach((cat) => {
      const el = document.getElementById(`section-${cat.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ── Handle filter change ──────────────────────
  const handleFilterChange = useCallback((filterId) => {
    setActiveFilter(filterId);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // ── Visible categories (have items) ──────────
  const visibleCategories = useMemo(
    () => menuCategories.filter((cat) => groupedItems[cat.id]?.length > 0),
    [groupedItems]
  );

  const isEmpty = filteredItems.length === 0;

  return (
    <>
      <Header onSearch={setSearchQuery} searchValue={searchQuery} />
      <CategoryNav activeCategory={activeCategory} onSelect={handleCategorySelect} />

      <main id="main-content">
        <Hero />
        <InfoBanner />

        <QuickFilters active={activeFilter} onChange={handleFilterChange} />

        {isEmpty ? (
          <div className="empty-state" role="status" aria-live="polite">
            <p className="empty-state__icon">🔍</p>
            <p className="empty-state__text">
              {activeFilter !== 'all' || searchQuery
                ? `No results for "${searchQuery || activeFilter}"`
                : 'No items available'}
            </p>
          </div>
        ) : (
          visibleCategories.map((cat) => (
            <MenuSection
              key={cat.id}
              category={cat}
              items={groupedItems[cat.id]}
              onOpen={setSelectedItem}
            />
          ))
        )}

        <div style={{ height: 60 }} aria-hidden="true" />
      </main>

      <Footer />
      <ScrollTop />

      {selectedItem && (
        <DishModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}
