'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useLang } from '@/context/LangContext';
import { menuItems, menuCategories, quickFilters } from '@/data/menuData';
import Header from '@/components/Header';
import DishCard from '@/components/DishCard';
import DishModal from '@/components/DishModal';
import CartDrawer from '@/components/CartDrawer';
import TrendingBar from '@/components/TrendingBar';

export default function MenuPage() {
  const { lang, tUI, dir } = useLang();
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  
  const categoryScrollRef = useRef(null);
  const menuGridRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll on category bar
  const checkCatScroll = useCallback(() => {
    const el = categoryScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  }, []);

  useEffect(() => {
    checkCatScroll();
    const el = categoryScrollRef.current;
    if (el) el.addEventListener('scroll', checkCatScroll);
    return () => el?.removeEventListener('scroll', checkCatScroll);
  }, [checkCatScroll]);

  const scrollCategories = (dirVal) => {
    categoryScrollRef.current?.scrollBy({ left: dirVal * 160, behavior: 'smooth' });
  };

  const scrollToGrid = () => {
    menuGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Center active category tab
  useEffect(() => {
    const el = categoryScrollRef.current;
    if (!el) return;
    const activeBtn = el.querySelector(`[data-cat="${activeCategory}"]`);
    if (activeBtn) {
      const containerRect = el.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const offset = btnRect.left - containerRect.left - (containerRect.width / 2) + (btnRect.width / 2);
      el.scrollBy({ left: offset, behavior: 'smooth' });
    }
  }, [activeCategory]);

  // First image per category cache
  const categoryImages = useMemo(() => {
    const map = {};
    for (const cat of menuCategories) {
      const match = menuItems.find(
        (item) => item.category === cat.id && item.image && item.image !== '/images/placeholder.jpg'
      );
      if (match) {
        map[cat.id] = match.image;
      }
    }
    return map;
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    let items = menuItems.filter((item) => item.category === activeCategory);

    if (activeFilter !== 'all') {
      const categoryMatches = items.filter((item) => item.tags?.includes(activeFilter));
      if (categoryMatches.length > 0) {
        return categoryMatches;
      }
      // Fallback: show all menu dishes matching the filter if none in this category
      return menuItems.filter((item) => item.tags?.includes(activeFilter));
    }

    return items;
  }, [activeFilter, activeCategory]);

  // Labels
  const labels = {
    exploreMenu: { tr: 'Menüyü Keşfet', en: 'Explore Menu', ar: 'استكشف القائمة', zh: '探索菜单' },
    noResults: {
      tr: 'Seçilen filtreye uygun ürün bulunamadı.',
      en: 'No dishes match the selected filter.',
      ar: 'لم يتم العثور على أطباق مطابقة للفلتر المحدد.',
      zh: '未找到符合所选条件的菜品。'
    }
  };

  const l = (key) => labels[key]?.[lang] || labels[key]?.en || '';

  return (
    <>
      <Header />

      <main className="menu-main" style={{ background: '#EDE3CE', minHeight: '100vh', paddingBottom: '32px' }}>
        
        {/* ── 1. Best Sellers Trending Showcase (Kardeshler compact style) ── */}
        <div style={{ paddingTop: '8px' }}>
          <TrendingBar onOpen={(item) => setSelectedItem(item)} />
        </div>

        {/* ── 4. Sticky Header for Categories & Smart Filters ── */}
        <div 
          style={{
            position: 'sticky',
            top: 'var(--header-h)',
            zIndex: 40,
            background: '#F7F2E7',
            borderBottom: '1px solid rgba(185, 148, 82, 0.25)',
            padding: '4px 0 2px 0',
            boxShadow: '0 2px 8px rgba(52, 43, 37, 0.05)'
          }}
        >
          {/* Categories Card (Always visible) */}
          <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '0 var(--page-pad)' }}>
            <div className="kardeshler-cat-box">
              <div className="kardeshler-cat-title">
                {l('exploreMenu')}
              </div>

              <div style={{ position: 'relative' }}>
                {/* Left Scroll Arrow */}
                {canScrollLeft && (
                  <button
                    onClick={() => scrollCategories(-1)}
                    aria-label="Scroll left"
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      zIndex: 10,
                      width: '28px',
                      background: 'linear-gradient(to right, #FAF7F0 60%, transparent)',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#2B2620',
                      fontWeight: 'bold',
                      fontSize: '16px'
                    }}
                  >
                    ‹
                  </button>
                )}

                {/* Right Scroll Arrow */}
                {canScrollRight && (
                  <button
                    onClick={() => scrollCategories(1)}
                    aria-label="Scroll right"
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      bottom: 0,
                      zIndex: 10,
                      width: '28px',
                      background: 'linear-gradient(to left, #FAF7F0 60%, transparent)',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#2B2620',
                      fontWeight: 'bold',
                      fontSize: '16px'
                    }}
                  >
                    ›
                  </button>
                )}

                {/* Horizontal Categories Scroll */}
                <div
                  ref={categoryScrollRef}
                  style={{
                    display: 'flex',
                    gap: '8px',
                    overflowX: 'auto',
                    padding: '2px 4px 4px 4px',
                    scrollbarWidth: 'none',
                    WebkitOverflowScrolling: 'touch'
                  }}
                >
                  {menuCategories.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    const catName = cat[`label_${lang}`] || cat.label_en;
                    const catImg = categoryImages[cat.id];

                    return (
                      <button
                        key={cat.id}
                        data-cat={cat.id}
                        className={`kardeshler-cat-item ${isActive ? 'active' : ''}`}
                        onClick={() => {
                          setActiveCategory(cat.id);
                          scrollToGrid();
                        }}
                      >
                        <div className="kardeshler-cat-thumb">
                          {catImg ? (
                            <Image
                              src={catImg}
                              alt=""
                              fill
                              sizes="54px"
                              style={{ objectFit: 'cover' }}
                            />
                          ) : (
                            <span style={{ fontSize: '1.2rem', color: '#B99452' }}>
                              {cat.icon}
                            </span>
                          )}
                        </div>
                        <span className="kardeshler-cat-label">
                          {catName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Filters Row */}
          <div className="kardeshler-filter-row">
            {quickFilters.map((filter) => {
              const isActive = activeFilter === filter.id;
              const filterName = filter[`label_${lang}`] || filter.label_en;
              return (
                <button
                  key={filter.id}
                  onClick={() => {
                    if (filter.id === 'all') {
                      setActiveFilter('all');
                    } else {
                      setActiveFilter(isActive ? 'all' : filter.id);
                    }
                    scrollToGrid();
                  }}
                  className={`kardeshler-filter-pill ${isActive ? 'active' : ''}`}
                >
                  <span>{filterName}</span>
                  {isActive && filter.id !== 'all' && (
                    <span style={{ fontSize: '11px', opacity: 0.85 }}>✕</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scroll anchor */}
        <div ref={menuGridRef} style={{ height: '8px' }} />

        {/* ── 5. Products Grid (Kardeshler horizontal cards) ── */}
        <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '6px var(--page-pad) 24px var(--page-pad)' }}>
          {filteredItems.length > 0 ? (
            <div className="kardeshler-products-grid">
              {filteredItems.map((item) => (
                <DishCard
                  key={item.id}
                  item={item}
                  onClick={() => setSelectedItem(item)}
                />
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#796D60',
              background: '#FAF7F0',
              borderRadius: '12px',
              border: '1px solid rgba(185, 148, 82, 0.25)'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🥢</div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#2B2620', marginBottom: '8px' }}>
                {l('noResults')}
              </h3>
              <button
                onClick={() => setActiveFilter('all')}
                style={{
                  marginTop: '8px',
                  padding: '8px 18px',
                  borderRadius: '8px',
                  background: '#4E5F4C',
                  color: 'white',
                  border: 'none',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                {tUI('nav_menu')}
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Selected Item Modal */}
      {selectedItem && (
        <DishModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {/* Shopping Cart Drawer */}
      <CartDrawer />
    </>
  );
}
