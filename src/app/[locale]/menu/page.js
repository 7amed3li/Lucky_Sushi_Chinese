'use client';

import { useState, useMemo, useEffect, useRef, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useLang } from '@/context/LangContext';
import { menuItems, menuCategories, quickFilters } from '@/data/menuData';
import trProducts from '../../../i18n/messages/tr/products.json';
import enProducts from '../../../i18n/messages/en/products.json';
import arProducts from '../../../i18n/messages/ar/products.json';
import ruProducts from '../../../i18n/messages/ru/products.json';
import zhProducts from '../../../i18n/messages/zh/products.json';
import Header from '@/components/Header';
import DishCard from '@/components/DishCard';
import DishModal from '@/components/DishModal';
import CartDrawer from '@/components/CartDrawer';
import TrendingBar from '@/components/TrendingBar';
import { GiSushis } from 'react-icons/gi';
import { FaMagnifyingGlass } from 'react-icons/fa6';

// Multilingual synonym map for cross-lingual restaurant search
const MULTILINGUAL_SYNONYMS = [
  ['somon', 'salmon', 'лосось', 'سلمون', '三文鱼', 'sake'],
  ['tuna', 'ton', 'тунец', 'تونا', '金枪鱼', 'maguro'],
  ['tavuk', 'chicken', 'курица', 'دجاج', '鸡肉'],
  ['et', 'dana', 'beef', 'говядина', 'мясо', 'لحم', 'بقر', '牛肉'],
  ['karides', 'shrimp', 'prawn', 'ebi', 'креветки', 'креветка', 'جمبري', 'روبيان', '虾'],
  ['yengec', 'yengeç', 'crab', 'kani', 'краб', 'سلطعون', 'كابوريا', '蟹'],
  ['kalamar', 'calamari', 'squid', 'кальмар', 'حبار', '鱿鱼'],
  ['ramen', 'рамен', 'رامن', '拉面'],
  ['udon', 'удон', 'أودون', '乌冬'],
  ['noodle', 'eriste', 'erişte', 'лапша', 'نودلز', '面'],
  ['wok', 'вок', 'ووك', '炒锅', '炒面'],
  ['avokado', 'avocado', 'авокадо', 'افوكادو', 'أفوكادو', '牛油果'],
  ['acili', 'acılı', 'spicy', 'hot', 'chili', 'острое', 'острый', 'حار', 'سبايسي', '辣'],
  ['vejetaryen', 'vegetarian', 'vegan', 'вегетарианский', 'веган', 'نباتي', '素食'],
  ['pismis', 'pişmiş', 'cooked', 'приготовленное', 'запеченный', 'مطهو', 'مطبوخ', '熟食', '熟'],
  ['citir', 'çıtır', 'crunchy', 'crispy', 'tempura', 'хрустящий', 'темпура', 'كرانشي', 'مقرمش', 'تمبورا', '脆'],
  ['tatli', 'tatlı', 'dessert', 'sweet', 'десерт', 'حلوى', 'حلويات', '甜点'],
  ['corba', 'çorba', 'soup', 'суп', 'شوربة', 'حساء', '汤'],
  ['pilav', 'pirinc', 'pirinç', 'rice', 'рис', 'ارز', 'أرز', '米饭'],
  ['salata', 'salad', 'салат', 'سلطة', '沙拉'],
  ['set', 'menu', 'menü', 'combo', 'сет', 'набор', 'طقم', 'وجبة', '套餐'],
];

function MenuContent() {
  const { lang, tUI, dir } = useLang();
  const searchParams = useSearchParams();

  const paramCat = searchParams.get('category') || searchParams.get('cat');
  const paramFilter = searchParams.get('filter');
  const paramQuery = searchParams.get('q') || searchParams.get('search');
  const paramDishId = searchParams.get('dish');

  const initialDish = useMemo(() => {
    if (!paramDishId) return null;
    return menuItems.find((item) => item.id === paramDishId) || null;
  }, [paramDishId]);

  const initialCategory = useMemo(() => {
    if (paramCat && menuCategories.some((c) => c.id === paramCat)) return paramCat;
    if (initialDish?.category) return initialDish.category;
    return menuCategories[0].id;
  }, [paramCat, initialDish]);

  const initialFilter = useMemo(() => {
    if (paramFilter && (paramFilter === 'all' || quickFilters.some((qf) => qf.id === paramFilter))) {
      return paramFilter;
    }
    return 'all';
  }, [paramFilter]);

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [searchQuery, setSearchQuery] = useState(paramQuery || '');
  const [selectedItem, setSelectedItem] = useState(initialDish);

  // Sync state if searchParams change
  useEffect(() => {
    const cat = searchParams.get('category') || searchParams.get('cat');
    const f = searchParams.get('filter');
    const q = searchParams.get('q') || searchParams.get('search');
    const dishId = searchParams.get('dish');

    if (cat && menuCategories.some((c) => c.id === cat)) {
      setActiveCategory(cat);
    }
    if (f && (f === 'all' || quickFilters.some((qf) => qf.id === f))) {
      setActiveFilter(f);
    }
    if (q !== null && q !== undefined) {
      setSearchQuery(q);
    }
    if (dishId) {
      const match = menuItems.find((item) => item.id === dishId);
      if (match) setSelectedItem(match);
    } else {
      setSelectedItem(null);
    }
  }, [searchParams]);

  // URL sync helper: updates browser address bar without reload
  const updateUrl = useCallback((cat, filter, search, dish) => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);

    if (cat) {
      url.searchParams.set('category', cat);
    } else {
      url.searchParams.delete('category');
    }
    url.searchParams.delete('cat');

    if (filter && filter !== 'all') {
      url.searchParams.set('filter', filter);
    } else {
      url.searchParams.delete('filter');
    }

    if (search && search.trim()) {
      url.searchParams.set('q', search.trim());
    } else {
      url.searchParams.delete('q');
      url.searchParams.delete('search');
    }

    if (dish) {
      const dishId = typeof dish === 'string' ? dish : dish.id;
      url.searchParams.set('dish', dishId);
    } else {
      url.searchParams.delete('dish');
    }

    const qs = url.searchParams.toString();
    const newPath = url.pathname + (qs ? `?${qs}` : '') + url.hash;
    window.history.replaceState(null, '', newPath);
  }, []);

  // Listen to browser Back/Forward (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const dishId = params.get('dish');
      if (dishId) {
        const match = menuItems.find((item) => item.id === dishId);
        setSelectedItem(match || null);
      } else {
        setSelectedItem(null);
      }

      const cat = params.get('category') || params.get('cat');
      if (cat && menuCategories.some((c) => c.id === cat)) {
        setActiveCategory(cat);
      } else {
        setActiveCategory(menuCategories[0].id);
      }

      const f = params.get('filter');
      if (f && (f === 'all' || quickFilters.some((qf) => qf.id === f))) {
        setActiveFilter(f);
      } else {
        setActiveFilter('all');
      }

      const q = params.get('q') || params.get('search');
      setSearchQuery(q || '');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectCategory = (catId) => {
    setSearchQuery('');
    setActiveCategory(catId);
    updateUrl(catId, activeFilter, '', selectedItem);
    scrollToGrid();
  };

  const handleSelectFilter = (filterId) => {
    const nextFilter = filterId === 'all' ? 'all' : (activeFilter === filterId ? 'all' : filterId);
    setActiveFilter(nextFilter);
    updateUrl(activeCategory, nextFilter, searchQuery, selectedItem);
    scrollToGrid();
  };

  const handleOpenDish = (dish) => {
    setSelectedItem(dish);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('dish', dish.id);
      const qs = url.searchParams.toString();
      window.history.pushState({ dish: dish.id }, '', url.pathname + (qs ? `?${qs}` : '') + url.hash);
    }
  };

  const handleCloseDish = () => {
    setSelectedItem(null);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('dish');
      const qs = url.searchParams.toString();
      window.history.replaceState(null, '', url.pathname + (qs ? `?${qs}` : '') + url.hash);
    }
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    updateUrl(activeCategory, activeFilter, val, selectedItem);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    updateUrl(activeCategory, activeFilter, '', selectedItem);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveFilter('all');
    updateUrl(activeCategory, 'all', '', selectedItem);
  };
  
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        (item) => item.category === cat.id && item.image && !item.image?.includes('placeholder')
      );
      if (match) {
        map[cat.id] = match.image;
      }
    }
    return map;
  }, []);

  // Filter items with multilingual synonym expansion
  const filteredItems = useMemo(() => {
    let items = menuItems;

    if (searchQuery.trim()) {
      const rawQ = searchQuery.toLowerCase().trim();

      // Find all expanded synonym terms
      const searchTerms = [rawQ];
      MULTILINGUAL_SYNONYMS.forEach(group => {
        if (group.some(term => rawQ.includes(term) || term.includes(rawQ))) {
          group.forEach(term => {
            if (!searchTerms.includes(term)) searchTerms.push(term);
          });
        }
      });

      return items.filter((item) => {
        // Collect full localized metadata
        const trName = trProducts[item.id]?.name?.toLowerCase() || item.name_tr?.toLowerCase() || '';
        const enName = enProducts[item.id]?.name?.toLowerCase() || item.name_en?.toLowerCase() || '';
        const arName = arProducts[item.id]?.name?.toLowerCase() || item.name_ar?.toLowerCase() || '';
        const ruName = ruProducts[item.id]?.name?.toLowerCase() || '';
        const zhName = zhProducts[item.id]?.name?.toLowerCase() || item.name_zh?.toLowerCase() || '';

        const trDesc = trProducts[item.id]?.description?.toLowerCase() || item.description_tr?.toLowerCase() || '';
        const enDesc = enProducts[item.id]?.description?.toLowerCase() || item.description_en?.toLowerCase() || '';
        const arDesc = arProducts[item.id]?.description?.toLowerCase() || item.description_ar?.toLowerCase() || '';
        const ruDesc = ruProducts[item.id]?.description?.toLowerCase() || '';
        const zhDesc = zhProducts[item.id]?.description?.toLowerCase() || item.description_zh?.toLowerCase() || '';

        const combinedText = `${trName} ${enName} ${arName} ${ruName} ${zhName} ${trDesc} ${enDesc} ${arDesc} ${ruDesc} ${zhDesc} ${(item.ingredients || []).join(' ')} ${(item.tags || []).join(' ')} ${item.category}`;

        return searchTerms.some(term => combinedText.includes(term));
      });
    }

    items = items.filter((item) => item.category === activeCategory);

    if (activeFilter !== 'all') {
      const categoryMatches = items.filter((item) => item.tags?.includes(activeFilter));
      if (categoryMatches.length > 0) {
        return categoryMatches;
      }
      return menuItems.filter((item) => item.tags?.includes(activeFilter));
    }

    return items;
  }, [searchQuery, activeFilter, activeCategory]);

  // Labels
  const labels = {
    exploreMenu: { tr: 'Menüyü Keşfet', en: 'Explore Menu', ar: 'استكشف القائمة', zh: '探索菜单', ru: 'Наше меню', fa: 'کاوش منو', fr: 'Explorer le Menu' },
    searchPlaceholder: { tr: 'Sushi, ramen, wok veya içerik ara...', en: 'Search sushi, ramen, wok or ingredients...', ar: 'ابحث عن سوشي، رامين، ووك، أو مكونات...', zh: '搜索寿司、拉面、炒锅或食材配料...', ru: 'Поиск суши, рамена, вока или ингредиентов...', fa: 'جستجوی سوشی، رامن...', fr: 'Rechercher sushi, ramen, wok...' },
    noResults: {
      tr: 'Seçilen kritere uygun ürün bulunamadı.',
      en: 'No dishes match the selected criteria.',
      ar: 'لم يتم العثور على أطباق مطابقة للبحث.',
      zh: '未找到符合条件的菜品。',
      ru: 'Блюд по вашему запросу не найдено.',
      fa: 'موردی یافت نشد.',
      fr: 'Aucun plat ne correspond à votre recherche.'
    },
    clearSearch: { tr: 'Filtreyi Sıfırla', en: 'Reset Filters', ar: 'إعادة ضبط', zh: '重置筛选', ru: 'Сбросить фильтры', fa: 'بازنشانی', fr: 'Réinitialiser' }
  };

  const l = (key) => labels[key]?.[lang] || labels[key]?.en || '';

  return (
    <>
      <Header />

      <main className="menu-main" style={{ background: 'var(--color-background)', minHeight: '100vh', paddingBottom: '48px' }}>
        
        {/* ── 1. Best Sellers Trending Showcase ── */}
        <div style={{ paddingTop: '10px' }}>
          <TrendingBar onOpen={handleOpenDish} />
        </div>

        {/* ── 2. Sticky Header for Categories & Filters ── */}
        <div 
          style={{
            position: 'sticky',
            top: 'var(--header-h)',
            zIndex: 40,
            background: 'var(--color-background)',
            borderBottom: '1px solid var(--color-border-light)',
            padding: '4px 0 2px 0',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {/* Categories Box */}
          <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '0 var(--page-pad)' }}>
            <div className="lucky-cat-box">
              <div className="lucky-cat-title">
                {l('exploreMenu')}
              </div>

              <div style={{ position: 'relative' }}>
                {/* Left Scroll Arrow */}
                {canScrollLeft && (
                  <button
                    type="button"
                    onClick={() => scrollCategories(-1)}
                    aria-label="Scroll left"
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      zIndex: 10,
                      width: '28px',
                      background: 'linear-gradient(to right, var(--color-surface) 65%, transparent)',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-text-primary)',
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
                    type="button"
                    onClick={() => scrollCategories(1)}
                    aria-label="Scroll right"
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      bottom: 0,
                      zIndex: 10,
                      width: '28px',
                      background: 'linear-gradient(to left, var(--color-surface) 65%, transparent)',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-text-primary)',
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
                    const isActive = activeCategory === cat.id && !searchQuery;
                    const catName = cat[`label_${lang}`] || cat.label_en;
                    const catImg = categoryImages[cat.id];

                    return (
                      <button
                        key={cat.id}
                        data-cat={cat.id}
                        type="button"
                        className={`lucky-cat-item ${isActive ? 'active' : ''}`}
                        onClick={() => handleSelectCategory(cat.id)}
                      >
                        <div className="lucky-cat-thumb">
                          {catImg ? (
                            <Image
                              src={catImg}
                              alt=""
                              fill
                              sizes="54px"
                              style={{ objectFit: 'cover' }}
                            />
                          ) : (
                            <span style={{ fontSize: '1.2rem', color: 'var(--color-brand-primary)' }}>
                              {cat.icon}
                            </span>
                          )}
                        </div>
                        <span className="lucky-cat-label">
                          {catName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Search with Multilingual Support */}
          <div className="menu-search-wrap">
            <FaMagnifyingGlass className="menu-search-icon" aria-hidden="true" />
            <input
              type="text"
              className="menu-search-input"
              placeholder={l('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              aria-label={l('searchPlaceholder')}
            />
            {searchQuery && (
              <button
                type="button"
                className="menu-search-clear"
                onClick={handleClearSearch}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Filters Row (All, Bestseller, Vegetarian, Cooked, Spicy) */}
          {!searchQuery && (
            <div className="lucky-filter-row">
              {quickFilters.map((filter) => {
                const isActive = activeFilter === filter.id;
                const filterName = filter[`label_${lang}`] || filter.label_en;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => handleFilterSelect(filter.id)}
                    className={`lucky-filter-pill ${isActive ? 'active' : ''}`}
                  >
                    <span>{filterName}</span>
                    {isActive && filter.id !== 'all' && (
                      <span style={{ fontSize: '11px', opacity: 0.85 }} aria-hidden="true">✕</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── 3. Products Grid (Light/Hybrid Cards) ── */}
        <div
          ref={menuGridRef}
          style={{ maxWidth: '1024px', margin: '0 auto', padding: '6px var(--page-pad) 24px var(--page-pad)' }}
        >
          {filteredItems.length > 0 ? (
            <div className="lucky-products-grid">
              {filteredItems.map((item) => (
                <DishCard
                  key={item.id}
                  item={item}
                  onClick={() => handleOpenDish(item)}
                />
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: 'var(--color-text-secondary)',
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border-light)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px', color: 'var(--color-brand-primary)' }} aria-hidden="true"><GiSushis /></div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                {l('noResults')}
              </h3>
              <button
                type="button"
                onClick={handleResetFilters}
                className="btn-primary"
                style={{
                  marginTop: '12px',
                  padding: '10px 22px',
                  minHeight: '40px',
                  fontSize: '0.85rem'
                }}
              >
                {l('clearSearch')}
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Selected Item Modal */}
      {selectedItem && (
        <DishModal
          item={selectedItem}
          onClose={handleCloseDish}
        />
      )}

      {/* Shopping Cart Drawer */}
      <CartDrawer />
    </>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={null}>
      <MenuContent />
    </Suspense>
  );
}
