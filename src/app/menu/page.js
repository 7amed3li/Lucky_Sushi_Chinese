'use client';

import { useState, useMemo, useEffect } from 'react';
import { useLang } from '@/context/LangContext';
import { menuItems, menuCategories, quickFilters } from '@/data/menuData';
import Header from '@/components/Header';
import DishCard from '@/components/DishCard';
import DishModal from '@/components/DishModal';
import CartDrawer from '@/components/CartDrawer';
import TrendingBar from '@/components/TrendingBar';
import { FaFire } from 'react-icons/fa6';

export default function MenuPage() {
  const { lang, t, tUI, dir } = useLang();
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll listener for sticky category bar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    let items = menuItems;

    // Quick filter
    if (activeFilter !== 'all') {
      items = items.filter((item) => item.tags?.includes(activeFilter));
      // Ignore category if using a quick filter (other than all)
      return items;
    }

    // Category filter
    return items.filter((item) => item.category === activeCategory);
  }, [activeFilter, activeCategory, lang]);

  // Labels
  const labels = {
    title: { tr: 'Menü', en: 'Menu', ar: 'القائمة', zh: '菜单' },
    subtitle: { 
      tr: 'Özenle hazırlanmış uzak doğu lezzetleri.', 
      en: 'Carefully crafted Far East flavors.', 
      ar: 'نكهات الشرق الأقصى المحضرة بعناية.', 
      zh: '精心制作的远东风味。' 
    },
    searchPlaceholder: { 
      tr: 'Yemek veya içerik arayın...', 
      en: 'Search dishes or ingredients...', 
      ar: 'ابحث عن طبق أو مكون...', 
      zh: '搜索菜品或食材...' 
    },
    noResults: { tr: 'Sonuç bulunamadı.', en: 'No results found.', ar: 'لم يتم العثور على نتائج.', zh: '未找到结果。' }
  };

  const l = (key) => labels[key]?.[lang] || labels[key]?.en || '';

  return (
    <>
      <Header />

      <main className="menu-main" style={{ background: 'var(--warm-cream)', minHeight: '100vh', paddingBottom: 'var(--sp-12)' }}>
        
        {/* Best Sellers Trending Box */}
        {activeFilter === 'all' && (
          <div className="container" style={{ marginTop: 'var(--sp-4)' }}>
            <div style={{
              background: 'white',
              borderRadius: '24px',
              padding: 'var(--sp-4)',
              boxShadow: '0 8px 30px rgba(52, 43, 37, 0.05)',
              border: '1px solid rgba(185, 148, 82, 0.1)',
              marginBottom: 'var(--sp-6)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--sp-3)', paddingLeft: '8px' }}>
                <span style={{ fontSize: '1.3rem', color: 'var(--sake-gold)', display: 'flex' }}><FaFire /></span>
                <h2 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading-en)', color: 'var(--roasted-cacao)' }}>
                  {lang === 'ar' ? 'الأكثر مبيعاً' : lang === 'tr' ? 'Çok Satanlar' : 'Best Sellers'}
                </h2>
              </div>
              <TrendingBar onOpen={(item) => setSelectedItem(item)} />
            </div>
          </div>
        )}

        {/* Sticky Filters & Categories Container */}
        <div 
          className="menu-filters-wrapper"
          style={{
            position: 'sticky',
            top: 'var(--header-h)',
            zIndex: 90,
            background: 'rgba(255, 253, 248, 0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: isScrolled ? '1px solid rgba(185, 148, 82, 0.15)' : '1px solid transparent',
            transition: 'all 0.3s ease',
            padding: 'var(--sp-2) 0',
            boxShadow: isScrolled ? '0 4px 20px rgba(52, 43, 37, 0.05)' : 'none'
          }}
        >
          <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
            
            {/* Categories */}
            {activeFilter === 'all' && (
              <div 
                className="categories-scroll" 
                style={{ 
                  display: 'flex', 
                  gap: '16px', 
                  overflowX: 'auto', 
                  padding: '4px 4px 12px 4px', 
                  scrollbarWidth: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {menuCategories.map(cat => {
                  const isActive = activeCategory === cat.id;
                  const catName = cat[`label_${lang}`] || cat.label_en;
                  return (
                    <button
                      key={cat.id}
                      className={`premium-cat-box ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        window.scrollTo({ top: 100, behavior: 'smooth' });
                      }}
                    >
                      <div className="cat-icon">
                        {cat.icon}
                      </div>
                      <span className="cat-label">
                        {catName}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Quick Filters Row */}
            <div className="menu-search-row" style={{ borderTop: '1px solid rgba(185, 148, 82, 0.1)', paddingTop: '12px' }}>
              <div 
                className="menu-filters-col quick-filters"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                {quickFilters.map(filter => {
                  const isActive = activeFilter === filter.id;
                  const filterName = filter[`label_${lang}`] || filter.label_en;
                  return (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`quick-filter-btn ${isActive ? 'active' : ''}`}
                    >
                      <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center', fontSize: '1.1rem' }}>{filter.icon}</span>
                      {filterName}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>



        {/* Products Grid */}
        <div className="container" style={{ marginTop: activeFilter === 'all' ? '0' : 'var(--sp-6)' }}>
          {filteredItems.length > 0 ? (
            <div className="products-grid">
              {filteredItems.map(item => (
                <DishCard 
                  key={item.id} 
                  item={item} 
                  onClick={() => setSelectedItem(item)} 
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state__icon">🥢</div>
              <h3 className="empty-state__title">{l('noResults')}</h3>
              <button 
                className="btn-secondary" 
                onClick={() => setActiveFilter('all')}
                style={{ marginTop: 'var(--sp-3)' }}
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
