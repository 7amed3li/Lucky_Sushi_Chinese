'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useLang } from '@/context/LangContext';
import { menuItems, menuCategories, quickFilters, restaurantInfo } from '@/data/menuData';
import Header from '@/components/Header';
import DishCard from '@/components/DishCard';
import DishModal from '@/components/DishModal';
import TrendingBar from '@/components/TrendingBar';
import CartDrawer from '@/components/CartDrawer';

// ── Category Navigation Bar ───────────────────────
function CategoryNav({ activeCategory, onSelect, categoryCounts }) {
  const { t, tUI, dir } = useLang();

  const scrollNav = (direction) => {
    const el = document.getElementById('cat-scroll-container');
    if (!el) return;
    const sign = dir === 'rtl' ? -1 : 1;
    el.scrollBy({ left: sign * direction * 220, behavior: 'smooth' });
  };

  return (
    <nav className="category-nav" aria-label={tUI('categories_title')}>
      <div className="category-nav__inner">
        <div className="category-nav__header">
          <div className="category-nav__label">
            <span className="category-nav__icon" aria-hidden="true">📑</span>
            <span className="category-nav__title">{tUI('categories_title')}</span>
          </div>

          <div className="category-nav__arrows" aria-hidden="true">
            <button
              type="button"
              className="cat-arrow"
              onClick={() => scrollNav(-1)}
              aria-label={tUI('scroll_left')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d={dir === 'rtl' ? 'm9 18 6-6-6-6' : 'm15 18-6-6 6-6'} />
              </svg>
            </button>
            <button
              type="button"
              className="cat-arrow"
              onClick={() => scrollNav(1)}
              aria-label={tUI('scroll_right')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d={dir === 'rtl' ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'} />
              </svg>
            </button>
          </div>
        </div>

        <div className="category-nav__scroll no-scrollbar" id="cat-scroll-container" role="tablist">
          {menuCategories.map((cat) => {
            const count = categoryCounts[cat.id] ?? 0;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                id={`cat-tab-${cat.id}`}
                className={`cat-tab${isActive ? ' cat-tab--active' : ''}`}
                onClick={() => onSelect(cat.id)}
                role="tab"
                aria-selected={isActive}
                aria-controls={`section-${cat.id}`}
              >
                <span className="cat-tab__emoji" aria-hidden="true">{cat.emoji}</span>
                <span className="cat-tab__text">{t(cat, 'label')}</span>
                {count > 0 && <span className="cat-tab__count">{count}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

// ── Product Filters Component ─────────────────────
function ProductFilters({
  activeFilters,
  onToggle,
  onClearAll,
  resultsCount,
  isFiltering,
  searchQuery,
  onClearSearch,
}) {
  const { t, tUI } = useLang();

  const filterList = useMemo(() => {
    return quickFilters.filter((f) => f.id !== 'all');
  }, []);

  const isAllActive = activeFilters.length === 0;

  return (
    <section className="product-filters-section" aria-label={tUI('filters_title')}>
      <div className="product-filters-container">
        {/* Header row: Title, Hint, and Clear Button */}
        <div className="product-filters-header">
          <div className="product-filters-heading">
            <div className="product-filters-title-row">
              <span className="product-filters-icon" aria-hidden="true">🎛️</span>
              <h2 className="product-filters-title">{tUI('filters_title')}</h2>
            </div>
            <p className="product-filters-hint">{tUI('filter_multi_hint')}</p>
          </div>

          {isFiltering && (
            <button
              type="button"
              className="btn-clear-filters"
              onClick={onClearAll}
              id="clear-filters-btn"
              aria-label={tUI('clear_all')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              <span>{tUI('clear_filters')}</span>
            </button>
          )}
        </div>

        {/* Filter Chips Bar */}
        <div className="filter-chips-wrap" role="group" aria-label={tUI('filters_title')}>
          {/* 'All' Chip */}
          <button
            type="button"
            id="filter-chip-all"
            className={`filter-chip${isAllActive ? ' filter-chip--active' : ''}`}
            onClick={onClearAll}
            aria-pressed={isAllActive}
          >
            <span className="filter-chip__emoji" aria-hidden="true">✨</span>
            <span className="filter-chip__label">{tUI('filter_all')}</span>
          </button>

          {/* Tag Chips */}
          {filterList.map((f) => {
            const isActive = activeFilters.includes(f.id);

            return (
              <button
                key={f.id}
                type="button"
                id={`filter-chip-${f.id}`}
                className={`filter-chip${isActive ? ' filter-chip--active' : ''}`}
                onClick={() => onToggle(f.id)}
                aria-pressed={isActive}
              >
                <span className="filter-chip__emoji" aria-hidden="true">{f.emoji}</span>
                <span className="filter-chip__label">{t(f, 'label')}</span>
                {isActive && (
                  <span className="filter-chip__check" aria-hidden="true">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Live Results Bar */}
        <div className="results-bar" role="status" aria-live="polite">
          <div className="results-bar__info">
            <span className="results-bar__count">
              {isFiltering ? (
                <>
                  <strong className="results-bar__num">{resultsCount}</strong> {tUI('results_found')}
                </>
              ) : (
                <>
                  <strong className="results-bar__num">{resultsCount}</strong> {tUI('results_all')}
                </>
              )}
            </span>

            {/* Active Filters Badges */}
            {activeFilters.length > 0 && (
              <div className="results-bar__tags">
                {activeFilters.map((fId) => {
                  const filterObj = quickFilters.find((q) => q.id === fId);
                  if (!filterObj) return null;

                  return (
                    <button
                      key={fId}
                      type="button"
                      className="active-tag-badge"
                      onClick={() => onToggle(fId)}
                      title={`Remove filter: ${t(filterObj, 'label')}`}
                      aria-label={`Remove filter: ${t(filterObj, 'label')}`}
                    >
                      <span>{filterObj.emoji} {t(filterObj, 'label')}</span>
                      <span className="active-tag-badge__close" aria-hidden="true">✕</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Active Search Badge */}
            {searchQuery && (
              <button
                type="button"
                className="active-tag-badge active-tag-badge--search"
                onClick={onClearSearch}
                title={`Clear search: "${searchQuery}"`}
                aria-label={`Clear search: "${searchQuery}"`}
              >
                <span>🔍 &ldquo;{searchQuery}&rdquo;</span>
                <span className="active-tag-badge__close" aria-hidden="true">✕</span>
              </button>
            )}
          </div>

          {isFiltering && (
            <button
              type="button"
              className="results-bar__reset-text"
              onClick={onClearAll}
            >
              {tUI('show_all_menu')}
            </button>
          )}
        </div>
      </div>
    </section>
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
        <div className="section-title-wrap">
          <span className="section-emoji" aria-hidden="true">{category.emoji}</span>
          <h2 className="section-title" id={`heading-${category.id}`}>
            {t(category, 'label')}
          </h2>
        </div>
        {badge && <span className="section-badge">{badge}</span>}
        <span className="section-count">{items.length}</span>
      </div>

      <div className={`menu-grid${category.id === 'sushi-sets' ? ' menu-grid--featured' : ''}`}>
        {items.map((item, i) => (
          <DishCard
            key={item.id}
            item={item}
            onOpen={onOpen}
            style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}
          />
        ))}
      </div>
    </section>
  );
}

// ── Empty State ───────────────────────────────────
function EmptyState({ onReset }) {
  const { tUI } = useLang();

  return (
    <div className="empty-state" role="status" aria-live="polite">
      <div className="empty-state__icon-wrap">
        <span className="empty-state__icon" aria-hidden="true">🥢🔍</span>
      </div>
      <h3 className="empty-state__title">{tUI('no_results_title')}</h3>
      <p className="empty-state__desc">{tUI('no_results_desc')}</p>
      <button
        type="button"
        className="empty-state__btn"
        onClick={onReset}
        id="empty-state-reset-btn"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
        <span>{tUI('clear_all')}</span>
      </button>
    </div>
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
// DEDICATED MENU PAGE — NO GREETING/HERO BANNERS
// ══════════════════════════════════════════════════
export default function MenuPage() {
  const [activeFilters, setActiveFilters] = useState([]);
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  // ── Multi-filter + Search logic (AND logic) ───
  const filteredItems = useMemo(() => {
    let items = menuItems;

    // 1. Multiple Active Filters (AND logic: dish must match ALL active filters)
    if (activeFilters.length > 0) {
      items = items.filter((item) =>
        activeFilters.every((tagId) => item.tags && item.tags.includes(tagId))
      );
    }

    // 2. Search query in tandem with active filters
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      items = items.filter((item) =>
        item.name_tr?.toLowerCase().includes(q) ||
        item.name_en?.toLowerCase().includes(q) ||
        item.name_ar?.toLowerCase().includes(q) ||
        item.name_zh?.toLowerCase().includes(q) ||
        item.description_tr?.toLowerCase().includes(q) ||
        item.description_en?.toLowerCase().includes(q) ||
        item.description_ar?.toLowerCase().includes(q) ||
        item.description_zh?.toLowerCase().includes(q) ||
        item.ingredients?.some((i) => i.toLowerCase().includes(q))
      );
    }

    return items;
  }, [activeFilters, searchQuery]);

  // ── Group by category ─────────────────────────
  const groupedItems = useMemo(() => {
    const groups = {};
    menuCategories.forEach((cat) => {
      groups[cat.id] = filteredItems.filter((item) => item.category === cat.id);
    });
    return groups;
  }, [filteredItems]);

  // ── Category item counts ───────────────────────
  const categoryCounts = useMemo(() => {
    const counts = {};
    menuCategories.forEach((cat) => {
      counts[cat.id] = groupedItems[cat.id]?.length || 0;
    });
    return counts;
  }, [groupedItems]);

  // ── Scroll to category section ─────────────────
  const handleCategorySelect = useCallback((catId) => {
    setActiveCategory(catId);
    const el = document.getElementById(`section-${catId}`);
    if (el) {
      const headerOffset = 118; // sticky header + category bar height
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  // ── Intersection observer for active cat ───────
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
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
    );

    menuCategories.forEach((cat) => {
      const el = document.getElementById(`section-${cat.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [groupedItems]);

  // ── Toggle individual filter (AND logic) ──────
  const handleToggleFilter = useCallback((filterId) => {
    setActiveFilters((prev) => {
      if (prev.includes(filterId)) {
        return prev.filter((id) => id !== filterId);
      } else {
        return [...prev, filterId];
      }
    });
  }, []);

  // ── Clear all filters and search ───────────────
  const handleClearAll = useCallback(() => {
    setActiveFilters([]);
    setSearchQuery('');
  }, []);

  // ── Visible categories (have items) ───────────
  const visibleCategories = useMemo(
    () => menuCategories.filter((cat) => groupedItems[cat.id]?.length > 0),
    [groupedItems]
  );

  const isFiltering = activeFilters.length > 0 || searchQuery.trim().length > 0;
  const isEmpty = filteredItems.length === 0;

  return (
    <>
      {/* Header with Search and Language Switcher */}
      <Header onSearch={setSearchQuery} searchValue={searchQuery} />

      <main id="main-content" className="menu-page-main">
        {/* 1. Trending / Most Popular Bar — Starts directly with food */}
        <div className="menu-page-top-spacer" />
        <TrendingBar onOpen={setSelectedItem} />

        {/* 2. Sticky Category Navigation Bar */}
        <CategoryNav
          activeCategory={activeCategory}
          onSelect={handleCategorySelect}
          categoryCounts={categoryCounts}
        />

        {/* 3. Product Filters (Separated, Multi-Select AND Logic, Live Counts) */}
        <ProductFilters
          activeFilters={activeFilters}
          onToggle={handleToggleFilter}
          onClearAll={handleClearAll}
          resultsCount={filteredItems.length}
          isFiltering={isFiltering}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />

        {/* 4. Menu Items or Empty State */}
        {isEmpty ? (
          <EmptyState onReset={handleClearAll} />
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

      {/* Shopping Cart Drawer & Floating Checkout Bar */}
      <CartDrawer />
    </>
  );
}
