'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useLang } from '@/context/LangContext';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useBranch } from '@/context/BranchContext';
import { formatPortion } from '@/lib/formatPortion';
import { translateIngredientsList } from '@/lib/translateIngredient';
import DishCard from '@/components/DishCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { 
  FaStar, FaWhatsapp, FaBagShopping, FaCheck,
  FaShareNodes, FaArrowLeft, FaArrowRight, FaShieldHalved,
  FaFire, FaLeaf, FaClock, FaMotorcycle
} from 'react-icons/fa6';
import { GiSushis, GiChopsticks } from 'react-icons/gi';
import { LuChefHat, LuSparkles, LuFish } from 'react-icons/lu';

export default function ProductDetailClient({
  item,
  dishName,
  dishDescription,
  categoryLabel,
  categorySlug,
  relatedDishes = [],
}) {
  const { lang, dir, tUI } = useLang();
  const { addToCart, getItemQuantity } = useCart();
  const { formatPrice } = useCurrency();
  const { selectedBranch, openBranchModal } = useBranch();
  
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isRtl = dir === 'rtl';
  const cartQty = getItemQuantity ? getItemQuantity(item.id) : 0;
  const ingredientsText = dishDescription || (item.ingredients?.length > 0 ? translateIngredientsList(item.ingredients, lang) : '');

  // Multilingual dynamic UI labels
  const UI_TEXT = {
    bestBadge: {
      ar: '★ الاختيار رقم 1 في إسطنبول',
      tr: '★ İstanbul\'un 1 Numaralı Tercihi',
      en: '★ #1 Choice in Istanbul',
      ru: '★ Выбор №1 в Стамбуле',
      zh: '★ 伊斯坦布尔第一优选',
    },
    ratingLabel: {
      ar: '4.9 ★★★★★ (840+ تقييم معتمد من جوجل وياندكس)',
      tr: '4.9 ★★★★★ (840+ Google & Yandex doğrulanmış puan)',
      en: '4.9 ★★★★★ (840+ Verified Google & Yandex ratings)',
      ru: '4.9 ★★★★★ (840+ отзывов в Google и Яндекс)',
      zh: '4.9 ★★★★★ (840+ 谷歌与Yandex真实好评)',
    },
    orderWhatsapp: {
      ar: 'اطلب الآن عبر واتساب',
      tr: 'WhatsApp ile Hızlı Sipariş',
      en: 'Order via WhatsApp Now',
      ru: 'Заказать через WhatsApp',
      zh: '通过 WhatsApp 立即点单',
    },
    addToCart: {
      ar: 'إضافة إلى السلة',
      tr: 'Sepete Ekle',
      en: 'Add to Cart',
      ru: 'Добавить в корзину',
      zh: '加入购物车',
    },
    addedSuccess: {
      ar: 'تمت الإضافة للسلة بنجاح!',
      tr: 'Sepete Eklendi!',
      en: 'Added to Cart!',
      ru: 'Добавлено в корзину!',
      zh: '已成功添加！',
    },
    share: {
      ar: 'مشاركة هذا الطبق',
      tr: 'Bu Lezzeti Paylaş',
      en: 'Share this dish',
      ru: 'Поделиться блюдом',
      zh: '分享此美食',
    },
    copied: {
      ar: 'تم نسخ الرابط!',
      tr: 'Bağlantı Kopyalandı!',
      en: 'Link Copied!',
      ru: 'Ссылка скопирована!',
      zh: '链接已复制！',
    },
    ingredients: {
      ar: 'المكونات والنكهات الطازجة',
      tr: 'Taze Malzemeler & İçerik',
      en: 'Fresh Ingredients & Flavors',
      ru: 'Свежие ингредиенты и состав',
      zh: '新鲜食材与原料配方',
    },
    whyBestTitle: {
      ar: 'لماذا هذا الطبق هو الأفضل بلا منازع في إسطنبول؟',
      tr: 'Neden İstanbul\'un En İyisi?',
      en: 'Why is this Istanbul\'s Absolute Best?',
      ru: 'Почему это лучшее блюдо в Стамбуле?',
      zh: '为什么这道菜是伊斯坦布尔的不二之选？',
    },
    usps: [
      {
        icon: <LuFish />,
        title: { ar: 'سمك نرويجي طازج يومياً', tr: 'Günlük Taze Norveç Somonu', en: 'Daily Fresh Norwegian Salmon', ru: 'Свежий норвежский лосось', zh: '每日直运新鲜挪威三文鱼' },
        desc: { ar: 'ننتقي يومياً أعلى درجات السمك الطازج لضمان الطعم الغني والملمس المخملي الأصيل.', tr: 'Her sabah özenle seçilen birinci sınıf balıklarla otantik sushi lezzeti.', en: 'Premium-grade fish selected daily for genuine, velvety, melt-in-mouth taste.', ru: 'Высочайшее качество рыбы каждое утро для истинного вкуса суши.', zh: '每天清晨严选高品质鱼鲜，确保浓郁正宗的细腻口感。' }
      },
      {
        icon: <LuChefHat />,
        title: { ar: 'شيفات متخصصون في السوشي والووك', tr: 'Usta Asya & Sushi Şefleri', en: 'Specialist Sushi & Asian Chefs', ru: 'Мастера суши и азиатской кухни', zh: '专业日式寿司与亚洲大厨' },
        desc: { ar: 'أكثر من 12 عاماً من الخبرة في لف الرولز وطهي نودلز الووك بنكهتها اليابانية والصينية الحقيقية.', tr: 'Geleneksel Japon pirinç pişirme ve wok ateşinde ustalıkla hazırlanır.', en: 'Handcrafted with traditional Japanese sushi rice seasoning and sizzling wok mastery.', ru: 'Традиционные японские рецепты и мастерство приготовления на воке.', zh: '以传统日式调味与娴熟镬气工艺精心现点现做。' }
      },
      {
        icon: <FaClock />,
        title: { ar: 'خدمة وتوصيل حتى 04:00 فجراً', tr: 'Gece 04:00\'e Kadar Açık & Paket Servis', en: 'Open & Delivery Until 04:00 AM', ru: 'Открыто и доставка до 04:00 утра', zh: '深夜外送服务营业至凌晨04:00' },
        desc: { ar: 'جائع في وقت متأخر؟ نوصل لك أطباقك ساخنة وطازجة بعلب حرارية محكمة في أي وقت من الليل.', tr: 'İstanbul Eyüpsultan, Kağıthane, Sarıyer ve çevresine gece geç saatte express teslimat.', en: 'Late night cravings? Hand-delivered fresh and securely packaged across Istanbul.', ru: 'Экспресс-доставка в ночные часы в термоупаковке по Стамбулу.', zh: '深夜馋了？专用保温包装安全极速送达伊斯坦布尔各区。' }
      },
      {
        icon: <FaShieldHalved />,
        title: { ar: 'معايير جودة ونظافة مضمونة 100%', tr: '%100 Hijyen & Güven Sertifikalı', en: '100% Certified Hygiene & Quality', ru: '100% гигиена и контроль качества', zh: '100% 严苛卫生与品质保障' },
        desc: { ar: 'تغليف آمن يشمل أعواد طعام يابانية فاخرة، وصوص الصويا والواسابي والزنجبيل مجاناً.', tr: 'Özel sushi kutusu, taze wasabi, zencefil ve soya sosu ikramımız ile eksiksiz servis.', en: 'Thermal hygiene-sealed box with complimentary chopsticks, wasabi, ginger, and soy sauce.', ru: 'Герметичные боксы с бесплатным имбирем, васаби, соевым соусом и палочками.', zh: '专业密封打包盒，随餐附赠精美筷子、现磨青芥、寿司姜片与酱油。' }
      }
    ],
    relatedTitle: {
      ar: 'أطباق أخرى مقترحة من نفس التشكيلة',
      tr: 'Bu Kategoriye Ait Diğer Özel Lezzetler',
      en: 'Other Handpicked Favorites in this Category',
      ru: 'Другие популярные блюда из этой категории',
      zh: '同类别其他精选推荐美食',
    },
    backToMenu: {
      ar: '← العودة إلى قائمة الطعام الكاملة',
      tr: '← Tüm Menüyü İncele',
      en: '← Back to Full Menu',
      ru: '← Вернуться ко всему меню',
      zh: '← 返回完整菜单列表',
    },
    home: {
      ar: 'الرئيسية',
      tr: 'Ana Sayfa',
      en: 'Home',
      ru: 'Главная',
      zh: '首页',
    },
    menu: {
      ar: 'القائمة',
      tr: 'Menü',
      en: 'Menu',
      ru: 'Меню',
      zh: '菜单',
    },
  };

  const l = (obj) => obj[lang] || obj.en || obj.tr || '';

  const handleAddToCart = () => {
    addToCart(item, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  const handleWhatsAppOrder = () => {
    const branch = selectedBranch;
    const phone = branch?.whatsapp || branch?.phone || '+90 531 486 34 04';
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const branchName = branch ? (branch[`name_${lang}`] || branch.name_tr) : 'Lucky Sushi & Chinese';

    const msg = encodeURIComponent(
      lang === 'ar'
        ? `مرحباً ${branchName}، أود طلب طبق: ${dishName} (العدد: ${quantity}) بسعر إجمالي ${item.price * quantity} TL. هل التوصيل متاح لموقعي؟`
        : lang === 'en'
        ? `Hello ${branchName}, I would like to order: ${dishName} (Qty: ${quantity}) for ${item.price * quantity} TL. Is delivery available to my address?`
        : lang === 'ru'
        ? `Здравствуйте, ${branchName}! Хочу заказать блюдо: ${dishName} (кол-во: ${quantity}) на сумму ${item.price * quantity} TL. Возможна ли доставка?`
        : lang === 'zh'
        ? `您好 ${branchName}，我想订购：${dishName}（数量：${quantity}），总计 ${item.price * quantity} TL。请问支持外送到我的地址吗？`
        : `Merhaba ${branchName}, menüden ${dishName} (Adet: ${quantity}, Tutar: ${item.price * quantity} TL) siparişi vermek istiyorum. Paket servisiniz mevcut mu?`
    );

    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  const handleShare = async () => {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: dishName,
          text: `${dishName} — Lucky Sushi & Chinese`,
          url,
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <>
      <Header />

      <main 
        id="main-content" 
        style={{ 
          background: 'var(--color-background)', 
          minHeight: '100vh', 
          padding: '24px 0 64px 0' 
        }}
      >
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 var(--page-pad)' }}>
          
          {/* ── Breadcrumb Navigation ── */}
          <nav 
            aria-label="Breadcrumb" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              fontSize: '0.85rem', 
              color: 'var(--color-text-secondary)',
              marginBottom: '20px',
              flexWrap: 'wrap'
            }}
          >
            <Link href="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
              {l(UI_TEXT.home)}
            </Link>
            <span aria-hidden="true" style={{ opacity: 0.5 }}>{isRtl ? '‹' : '›'}</span>
            <Link href="/menu" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
              {l(UI_TEXT.menu)}
            </Link>
            {categoryLabel && (
              <>
                <span aria-hidden="true" style={{ opacity: 0.5 }}>{isRtl ? '‹' : '›'}</span>
                <Link 
                  href={`/menu?category=${categorySlug || item.category}`} 
                  style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}
                >
                  {categoryLabel}
                </Link>
              </>
            )}
            <span aria-hidden="true" style={{ opacity: 0.5 }}>{isRtl ? '‹' : '›'}</span>
            <span style={{ color: 'var(--color-brand-primary)', fontWeight: '600' }} aria-current="page">
              {dishName}
            </span>
          </nav>

          {/* ── Main Product Card Grid (2 Columns on Desktop) ── */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '36px',
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border-light)',
              padding: 'clamp(20px, 4vw, 36px)',
              boxShadow: 'var(--shadow-md)',
              alignItems: 'start'
            }}
          >
            {/* ── Left Column: Dish Hero Image & Visual Badges ── */}
            <div style={{ position: 'relative' }}>
              <div 
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1 / 1',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  background: 'var(--color-surface-secondary)',
                  border: '1px solid var(--color-border-light)',
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.04)'
                }}
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={dishName}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 520px"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '4rem', color: 'var(--color-brand-primary)' }}>
                    <GiSushis />
                  </div>
                )}

                {/* Top-Start Tag Badge */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '14px',
                    insetInlineStart: '14px',
                    background: 'var(--color-brand-primary)',
                    color: '#FFFFFF',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    letterSpacing: '0.3px'
                  }}
                >
                  <LuSparkles aria-hidden="true" />
                  <span>{l(UI_TEXT.bestBadge)}</span>
                </div>

                {/* Top-End Portion Badge */}
                {item.portion_or_pieces && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: '14px',
                      insetInlineEnd: '14px',
                      background: 'rgba(25, 23, 21, 0.85)',
                      backdropFilter: 'blur(8px)',
                      color: '#FFFFFF',
                      padding: '6px 12px',
                      borderRadius: '999px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}
                  >
                    {formatPortion(item.portion_or_pieces, lang)}
                  </div>
                )}
              </div>

              {/* Quick Trust Strip Under Image */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  marginTop: '16px',
                  padding: '12px 14px',
                  background: 'var(--color-surface-secondary)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.82rem',
                  color: 'var(--color-text-secondary)',
                  textAlign: 'center',
                  gap: '8px'
                }}
              >
                <div>
                  <LuFish style={{ fontSize: '1.2rem', color: 'var(--color-brand-primary)', margin: '0 auto 2px' }} />
                  <div>100% Taze</div>
                </div>
                <div style={{ width: '1px', height: '24px', background: 'var(--color-border-light)' }} />
                <div>
                  <FaMotorcycle style={{ fontSize: '1.2rem', color: 'var(--color-brand-primary)', margin: '0 auto 2px' }} />
                  <div>04:00 AM Gece Servisi</div>
                </div>
                <div style={{ width: '1px', height: '24px', background: 'var(--color-border-light)' }} />
                <div>
                  <FaStar style={{ fontSize: '1.2rem', color: '#EAB308', margin: '0 auto 2px' }} />
                  <div>4.9 / 5 Puan</div>
                </div>
              </div>
            </div>

            {/* ── Right Column: Title, Price, Description & Actions ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Category & Rating */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <span 
                  style={{
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontWeight: '700',
                    color: 'var(--color-brand-primary)',
                  }}
                >
                  {categoryLabel || item.category}
                </span>

                <div 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '4px', 
                    fontSize: '0.85rem',
                    color: '#B45309',
                    fontWeight: '600'
                  }}
                >
                  <FaStar style={{ color: '#EAB308' }} />
                  <span>{l(UI_TEXT.ratingLabel)}</span>
                </div>
              </div>

              {/* Main H1 Title */}
              <h1 
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
                  fontWeight: '800',
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.25,
                  margin: 0
                }}
              >
                {dishName}
              </h1>

              {/* Price Banner */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'baseline', 
                  gap: '12px',
                  padding: '14px 18px',
                  background: 'var(--color-surface-secondary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border-light)'
                }}
              >
                <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--color-brand-primary)', lineHeight: 1 }}>
                  {formatPrice(item.price)}
                </div>
                {item.portion_or_pieces && (
                  <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>
                    / {formatPortion(item.portion_or_pieces, lang)}
                  </div>
                )}
              </div>

              {/* Description & Ingredients */}
              {ingredientsText && (
                <div>
                  <h2 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                    {l(UI_TEXT.ingredients)}
                  </h2>
                  <p 
                    style={{ 
                      fontSize: '0.95rem', 
                      color: 'var(--color-text-secondary)', 
                      lineHeight: 1.65,
                      margin: 0
                    }}
                  >
                    {ingredientsText}
                  </p>
                </div>
              )}

              {/* Dietary Tags & Allergens */}
              {(item.tags?.length > 0 || item.allergens?.length > 0) && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '4px' }}>
                  {item.tags?.map((tag) => (
                    <span 
                      key={tag}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: '600',
                        background: 'var(--color-surface-secondary)',
                        color: 'var(--color-text-primary)',
                        border: '1px solid var(--color-border-light)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  {item.allergens?.map((allergen) => (
                    <span 
                      key={allergen}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: '500',
                        background: '#FEF2F2',
                        color: '#991B1B',
                        border: '1px solid #FEE2E2'
                      }}
                    >
                      Allergen: {allergen}
                    </span>
                  ))}
                </div>
              )}

              {/* Quantity Selector & Action CTAs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* Quantity Counter */}
                  <div 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      background: 'var(--color-surface-secondary)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border-light)',
                      padding: '4px'
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      style={{
                        width: '38px',
                        height: '38px',
                        border: 'none',
                        background: 'transparent',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        color: 'var(--color-text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span style={{ minWidth: '36px', textAlign: 'center', fontWeight: '700', fontSize: '1rem', color: 'var(--color-text-primary)' }}>
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      style={{
                        width: '38px',
                        height: '38px',
                        border: 'none',
                        background: 'transparent',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        color: 'var(--color-text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    style={{
                      flex: 1,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      padding: '14px 24px',
                      minHeight: '48px',
                      borderRadius: 'var(--radius-md)',
                      background: addedAnimation ? '#15803D' : 'var(--color-brand-primary)',
                      color: '#FFFFFF',
                      fontSize: '0.98rem',
                      fontWeight: '700',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease, transform 0.1s ease',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    {addedAnimation ? (
                      <>
                        <FaCheck aria-hidden="true" />
                        <span>{l(UI_TEXT.addedSuccess)}</span>
                      </>
                    ) : (
                      <>
                        <FaBagShopping aria-hidden="true" />
                        <span>{l(UI_TEXT.addToCart)} ({formatPrice(item.price * quantity)})</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Direct WhatsApp Order Button */}
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  style={{
                    width: '100%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '14px 24px',
                    minHeight: '48px',
                    borderRadius: 'var(--radius-md)',
                    background: '#25D366',
                    color: '#FFFFFF',
                    fontSize: '0.98rem',
                    fontWeight: '700',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
                    transition: 'transform 0.15s ease'
                  }}
                >
                  <FaWhatsapp style={{ fontSize: '1.3rem' }} aria-hidden="true" />
                  <span>{l(UI_TEXT.orderWhatsapp)}</span>
                </button>

                {/* Share Link Button */}
                <button
                  type="button"
                  onClick={handleShare}
                  style={{
                    alignSelf: 'center',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'transparent',
                    border: 'none',
                    fontSize: '0.85rem',
                    color: 'var(--color-text-secondary)',
                    cursor: 'pointer',
                    padding: '6px 12px',
                    marginTop: '4px'
                  }}
                >
                  <FaShareNodes aria-hidden="true" />
                  <span>{copied ? l(UI_TEXT.copied) : l(UI_TEXT.share)}</span>
                </button>
              </div>

            </div>
          </div>

          {/* ── "Why this dish is #1 in Istanbul" Section ── */}
          <section 
            style={{ 
              marginTop: '48px',
              padding: 'clamp(24px, 4vw, 40px)',
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border-light)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 32px auto' }}>
              <span 
                style={{ 
                  color: 'var(--color-brand-primary)', 
                  fontWeight: '700', 
                  fontSize: '0.82rem', 
                  textTransform: 'uppercase',
                  letterSpacing: '1px' 
                }}
              >
                LUCKY SUSHI & CHINESE DIFFERENCE
              </span>
              <h2 
                style={{ 
                  fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', 
                  fontWeight: '800', 
                  color: 'var(--color-text-primary)',
                  marginTop: '8px'
                }}
              >
                {l(UI_TEXT.whyBestTitle)}
              </h2>
            </div>

            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '24px'
              }}
            >
              {UI_TEXT.usps.map((usp, idx) => (
                <div 
                  key={idx}
                  style={{
                    padding: '20px',
                    background: 'var(--color-surface-secondary)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border-light)'
                  }}
                >
                  <div 
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'var(--color-brand-primary)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      marginBottom: '14px'
                    }}
                  >
                    {usp.icon}
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                    {l(usp.title)}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {l(usp.desc)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Related Dishes from Same Category ── */}
          {relatedDishes.length > 0 && (
            <section style={{ marginTop: '54px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <h2 style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)', fontWeight: '800', color: 'var(--color-text-primary)', margin: 0 }}>
                  {l(UI_TEXT.relatedTitle)}
                </h2>
                <Link 
                  href={`/menu?category=${categorySlug || item.category}`}
                  style={{
                    color: 'var(--color-brand-primary)',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>{l(UI_TEXT.backToMenu)}</span>
                </Link>
              </div>

              <div className="lucky-products-grid">
                {relatedDishes.map((relItem) => (
                  <Link 
                    key={relItem.id} 
                    href={`/menu/${relItem.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <DishCard item={relItem} />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ── Back to Menu Link ── */}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link 
              href="/menu"
              className="btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 28px',
                fontSize: '0.95rem',
                textDecoration: 'none'
              }}
            >
              <span>{l(UI_TEXT.backToMenu)}</span>
            </Link>
          </div>

        </div>
      </main>

      <Footer />
      <CartDrawer />
    </>
  );
}

