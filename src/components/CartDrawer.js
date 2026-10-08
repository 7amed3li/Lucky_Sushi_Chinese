'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLang } from '@/context/LangContext';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { restaurantInfo } from '@/data/menuData';
import { formatPortion } from '@/lib/formatPortion';

import trProducts from '@/i18n/messages/tr/products.json';
import enProducts from '@/i18n/messages/en/products.json';
import arProducts from '@/i18n/messages/ar/products.json';
import ruProducts from '@/i18n/messages/ru/products.json';
import zhProducts from '@/i18n/messages/zh/products.json';

const CATALOGS = {
  tr: trProducts,
  en: enProducts,
  ar: arProducts,
  ru: ruProducts,
  zh: zhProducts,
};

const LANG_NAMES = {
  tr: 'Türkçe',
  ar: 'العربية',
  en: 'English',
  ru: 'Русский',
  zh: '中文',
};

export default function CartDrawer() {
  const { lang, tUI } = useLang();
  const { formatPrice } = useCurrency();
  const {
    cart, isCartOpen, setIsCartOpen,
    addToCart, removeFromCart, deleteItem, clearCart,
    cartCount, cartSubtotal, isMinDeliveryReached, minDeliveryTl,
  } = useCart();

  // Cart language state: defaults to 'tr' so the waiter in the restaurant can read it immediately
  // Can be toggled on-the-fly without page reload
  const [cartLang, setCartLang] = useState('tr');

  const phoneClean = restaurantInfo.phone.replace(/[^0-9]/g, '');

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen]);

  const labels = {
    banner: {
      tr: 'Siparişinizi vermek için bu listeyi garsona gösterin veya WhatsApp ile sipariş verin',
      en: 'Show this list to the waiter or order via WhatsApp',
      ar: 'اعرض هذه القائمة للنادل لتقديم طلبك أو اطلب عبر واتساب',
      ru: 'Покажите этот список официанту или закажите через WhatsApp',
      zh: '请向服务员出示此清单或通过WhatsApp下单',
    },
    title: { tr: 'Siparişiniz', en: 'Your Cart', ar: 'سلة الطلب', ru: 'Ваша корзина', zh: '购物车' },
    empty: { tr: 'Sepetiniz boş', en: 'Your cart is empty', ar: 'سلتك فارغة', ru: 'Корзина пуста', zh: '购物车为空' },
    emptyHint: { tr: 'Lezzetleri keşfetmeye başlayın', en: 'Start exploring our dishes', ar: 'ابدأ باستكشاف أطباقنا', ru: 'Начните выбирать блюда', zh: '开始探索美食' },
    subtotal: { tr: 'Toplam Tutar', en: 'Total', ar: 'المجموع الكلي', ru: 'Итого', zh: '合计' },
    checkout: { tr: 'WhatsApp ile Sipariş Ver', en: 'Order via WhatsApp', ar: 'اطلب عبر واتساب', ru: 'Заказ через WhatsApp', zh: 'WhatsApp下单' },
    minNotice: {
      tr: `Minimum paket servis tutarı: ${formatPrice(minDeliveryTl)}`,
      en: `Minimum delivery order: ${formatPrice(minDeliveryTl)}`,
      ar: `الحد الأدنى لطلب التوصيل: ${formatPrice(minDeliveryTl)}`,
      ru: `Минимальная сумма доставки: ${formatPrice(minDeliveryTl)}`,
      zh: `最低外送金额: ${formatPrice(minDeliveryTl)}`,
    },
    remove: { tr: 'Kaldır', en: 'Remove', ar: 'حذف', ru: 'Удалить', zh: '删除' },
    clear: { tr: 'Tümünü Temizle', en: 'Clear All', ar: 'مسح الكل', ru: 'Очистить всё', zh: '清空' },
  };

  const l = (key) => labels[key]?.[cartLang] || labels[key]?.tr || '';

  // Get product name in specified language
  const getItemName = (item, targetLang) => {
    const catalog = CATALOGS[targetLang];
    if (catalog && catalog[item.id]?.name) {
      return catalog[item.id].name;
    }
    return item[`name_${targetLang}`] || item.name_tr || item.name_en || item.name || '';
  };

  // Locale-aware WhatsApp order message with both Turkish and client names
  const buildWhatsAppMsg = () => {
    const greetings = {
      tr: 'Merhaba Lucky Sushi & Chinese, yeni bir sipariş vermek istiyorum:',
      en: 'Hello Lucky Sushi & Chinese, I would like to place an order:',
      ar: 'مرحباً لاكي سوشي صيني، أود تقديم طلب جديد:',
      ru: 'Здравствуйте, Lucky Sushi & Chinese! Хочу сделать заказ:',
      zh: '您好 Lucky Sushi & Chinese，我想点单：',
    };
    const greeting = greetings[lang] || greetings.tr;
    let msg = `🍣 ${greeting}\n\n`;
    cart.forEach(({ item, quantity }) => {
      const trName = getItemName(item, 'tr');
      const clientName = lang !== 'tr' ? getItemName(item, lang) : '';
      const nameLine = clientName && clientName !== trName
        ? `${trName} (${clientName})`
        : trName;
      msg += `• ${quantity}x ${nameLine} — ${formatPrice(item.price * quantity)}\n`;
    });
    msg += `\n💰 ${l('subtotal')}: ${formatPrice(cartSubtotal)}`;
    return msg;
  };

  const isRtl = cartLang === 'ar';

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay${isCartOpen ? ' open' : ''}`}
        onClick={() => setIsCartOpen(false)}
        aria-hidden={!isCartOpen}
      />

      {/* Drawer */}
      <aside
        className={`cart-drawer${isCartOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={l('title')}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Waiter Banner (Image 2 style) */}
        <div
          style={{
            background: '#3e5343',
            color: '#FFFFFF',
            padding: '10px 16px',
            fontSize: '0.88rem',
            fontWeight: 700,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            letterSpacing: '0.01em',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
          }}
        >
          <span style={{ fontSize: '1rem' }} aria-hidden="true">📋</span>
          <span>{l('banner')}</span>
        </div>

        {/* Header */}
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">{l('title')} ({cartCount})</h2>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {cart.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                style={{ fontSize: '0.75rem', color: 'var(--color-accent)', opacity: 0.85, cursor: 'pointer', background: 'none', border: 'none' }}
              >
                {l('clear')}
              </button>
            )}
            <button
              type="button"
              className="cart-drawer__close"
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Instant Language Switcher (No Reload) */}
        {lang !== 'tr' && (
          <div
            style={{
              display: 'flex',
              gap: '6px',
              padding: '8px 12px',
              background: 'rgba(255, 255, 255, 0.04)',
              borderBottom: '1px solid rgba(246, 241, 232, 0.08)',
            }}
          >
            <button
              type="button"
              onClick={() => setCartLang('tr')}
              style={{
                flex: 1,
                padding: '6px 10px',
                fontSize: '0.82rem',
                fontWeight: cartLang === 'tr' ? 700 : 500,
                borderRadius: '6px',
                border: cartLang === 'tr' ? '1px solid #4a6850' : '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                background: cartLang === 'tr' ? '#3e5343' : 'rgba(255, 255, 255, 0.05)',
                color: '#FFFFFF',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <span>🇹🇷</span>
              <span>Garson Modu (Türkçe)</span>
            </button>

            <button
              type="button"
              onClick={() => setCartLang(lang)}
              style={{
                flex: 1,
                padding: '6px 10px',
                fontSize: '0.82rem',
                fontWeight: cartLang === lang ? 700 : 500,
                borderRadius: '6px',
                border: cartLang === lang ? '1px solid #4a6850' : '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                background: cartLang === lang ? '#3e5343' : 'rgba(255, 255, 255, 0.05)',
                color: '#FFFFFF',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <span>🌐</span>
              <span>{LANG_NAMES[lang] || lang.toUpperCase()}</span>
            </button>
          </div>
        )}

        {/* Body */}
        <div className="cart-drawer__body">
          {cart.length === 0 ? (
            <div className="cart-drawer__empty">
              <div className="cart-drawer__empty-icon">🥢</div>
              <p style={{ fontSize: '1rem', color: 'var(--color-brand-light)', marginBottom: '4px', fontWeight: 600 }}>
                {l('empty')}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--mist-beige)' }}>
                {l('emptyHint')}
              </p>
            </div>
          ) : (
            cart.map(({ item, quantity }) => {
              const primaryName = getItemName(item, cartLang);
              const secondaryName = cartLang !== lang ? getItemName(item, lang) : (cartLang !== 'tr' ? getItemName(item, 'tr') : null);
              const hasImg = item.image && item.image !== '/images/placeholder.jpg';

              return (
                <div key={item.id} className="cart-item">
                  <div className="cart-item__img">
                    {hasImg ? (
                      <Image src={item.image} alt={primaryName} width={64} height={64} style={{ objectFit: 'contain' }} />
                    ) : (
                      <div style={{
                        width: '100%', height: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(246, 241, 232, 0.08)', fontSize: '1.4rem', color: 'var(--color-brand-primary)'
                      }}>🥢</div>
                    )}
                  </div>
                  <div className="cart-item__info">
                    <span className="cart-item__name" style={{ fontWeight: 600, color: 'var(--color-brand-light)' }}>
                      {primaryName}
                    </span>

                    {/* Show secondary language for clear understanding by both waiter and customer */}
                    {secondaryName && secondaryName !== primaryName && (
                      <span style={{ fontSize: '0.78rem', color: 'var(--mist-beige)', opacity: 0.75, display: 'block', marginTop: '1px' }}>
                        {secondaryName}
                      </span>
                    )}

                    <span className="cart-item__price">{formatPrice(item.price * quantity)}</span>
                    <div className="cart-item__controls">
                      <button type="button" className="cart-item__qty-btn" onClick={() => removeFromCart(item.id)} aria-label="Decrease">−</button>
                      <span className="cart-item__qty">{quantity}</span>
                      <button type="button" className="cart-item__qty-btn" onClick={() => addToCart(item, 1)} aria-label="Increase">+</button>
                    </div>
                    <button type="button" className="cart-item__remove" onClick={() => deleteItem(item.id)}>
                      {l('remove')}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__subtotal">
              <span className="cart-drawer__subtotal-label">{l('subtotal')}</span>
              <span className="cart-drawer__subtotal-value">{formatPrice(cartSubtotal)}</span>
            </div>

            <a
              href={`https://wa.me/${phoneClean}?text=${encodeURIComponent(buildWhatsAppMsg())}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cart-drawer__checkout"
            >
              {l('checkout')}
            </a>

            {!isMinDeliveryReached && (
              <p className="cart-drawer__min-notice">{l('minNotice')}</p>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
