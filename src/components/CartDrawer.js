'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useLang } from '@/context/LangContext';
import { useCart } from '@/context/CartContext';
import { restaurantInfo } from '@/data/menuData';

export default function CartDrawer() {
  const { lang, t, tUI } = useLang();
  const {
    cart, isCartOpen, setIsCartOpen,
    addToCart, removeFromCart, deleteItem, clearCart,
    cartCount, cartSubtotal, isMinDeliveryReached, minDeliveryTl,
  } = useCart();

  const phoneClean = restaurantInfo.phone.replace(/[^0-9]/g, '');

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen]);

  const labels = {
    title: { tr: 'Sepetiniz', en: 'Your Cart', ar: 'سلة الطلب', ru: 'Ваша корзина', zh: '购物车' },
    empty: { tr: 'Sepetiniz boş', en: 'Your cart is empty', ar: 'سلتك فارغة', ru: 'Корзина пуста', zh: '购物车为空' },
    emptyHint: { tr: 'Lezzetleri keşfetmeye başlayın', en: 'Start exploring our dishes', ar: 'ابدأ باستكشاف أطباقنا', ru: 'Начните выбирать блюда', zh: '开始探索美食' },
    subtotal: { tr: 'Ara Toplam', en: 'Subtotal', ar: 'المجموع الفرعي', ru: 'Итого', zh: '小计' },
    checkout: { tr: 'WhatsApp ile Sipariş Ver', en: 'Order via WhatsApp', ar: 'اطلب عبر واتساب', ru: 'Заказ через WhatsApp', zh: 'WhatsApp下单' },
    minNotice: { tr: `Minimum paket servis tutarı: ${minDeliveryTl} ₺`, en: `Minimum delivery order: ${minDeliveryTl} ₺`, ar: `الحد الأدنى لطلب التوصيل: ${minDeliveryTl} ₺`, ru: `Минимальная сумма доставки: ${minDeliveryTl} ₺`, zh: `最低外送金额: ${minDeliveryTl} ₺` },
    remove: { tr: 'Kaldır', en: 'Remove', ar: 'حذف', ru: 'Удалить', zh: '删除' },
    clear: { tr: 'Tümünü Temizle', en: 'Clear All', ar: 'مسح الكل', ru: 'Очистить всё', zh: '清空' },
  };

  const l = (key) => labels[key]?.[lang] || labels[key]?.en || '';

  // Locale-aware WhatsApp order message
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
      const name = t(item, 'name');
      msg += `• ${quantity}x ${name} — ${(item.price * quantity).toLocaleString('tr-TR')} ₺\n`;
    });
    msg += `\n💰 ${l('subtotal')}: ${cartSubtotal.toLocaleString('tr-TR')} ₺`;
    return msg;
  };

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
      >
        {/* Header */}
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">{l('title')} ({cartCount})</h2>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {cart.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                style={{ fontSize: '0.75rem', color: 'var(--color-accent)', opacity: 0.85, cursor: 'pointer' }}
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
              const name = t(item, 'name');
              const hasImg = item.image && item.image !== '/images/placeholder.jpg';
              return (
                <div key={item.id} className="cart-item">
                  <div className="cart-item__img">
                    {hasImg ? (
                      <Image src={item.image} alt={name} width={64} height={64} style={{ objectFit: 'contain' }} />
                    ) : (
                      <div style={{
                        width: '100%', height: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(246, 241, 232, 0.08)', fontSize: '1.4rem', color: 'var(--color-brand-primary)'
                      }}>🥢</div>
                    )}
                  </div>
                  <div className="cart-item__info">
                    <span className="cart-item__name">{name}</span>
                    <span className="cart-item__price">{(item.price * quantity).toLocaleString('tr-TR')} ₺</span>
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
              <span className="cart-drawer__subtotal-value">{cartSubtotal.toLocaleString('tr-TR')} ₺</span>
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
