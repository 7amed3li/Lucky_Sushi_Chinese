'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useLang } from '@/context/LangContext';
import { restaurantInfo } from '@/data/menuData';

export default function CartDrawer() {
  const {
    cart,
    addToCart,
    removeFromCart,
    deleteItem,
    clearCart,
    cartCount,
    cartSubtotal,
    isMinDeliveryReached,
    minDeliveryTl,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const { lang, t, dir } = useLang();
  const [orderType, setOrderType] = useState('delivery'); // delivery, takeaway, dinein
  const [address, setAddress] = useState('');
  const [orderNote, setOrderNote] = useState('');

  const labels = {
    cart_title: { tr: 'Sipariş Sepetiniz', en: 'Your Order Cart', ar: 'سلة طلباتك', zh: '您的购物车' },
    items_count: { tr: 'ürün', en: 'items', ar: 'أصناف', zh: '件商品' },
    empty_cart: { tr: 'Sepetiniz henüz boş.', en: 'Your cart is empty.', ar: 'سلة طلباتك فارغة حالياً.', zh: '您的购物车还是空的。' },
    subtotal: { tr: 'Ara Toplam', en: 'Subtotal', ar: 'المجموع الفرعي', zh: '小计' },
    total: { tr: 'Toplam Tutar', en: 'Total Amount', ar: 'الإجمالي الكلي', zh: '总计' },
    min_alert: {
      tr: `Paket servis için minimum sepet ${minDeliveryTl} TL'dir. (${minDeliveryTl - cartSubtotal} TL daha ekleyin)`,
      en: `Min. order for delivery is ${minDeliveryTl} TL. (Add ${minDeliveryTl - cartSubtotal} TL more)`,
      ar: `الحد الأدنى لطلب التوصيل هو ${minDeliveryTl} ل.ت (أضف ${minDeliveryTl - cartSubtotal} ل.ت)`,
      zh: `起送金额为 ${minDeliveryTl} TL (还差 ${minDeliveryTl - cartSubtotal} TL)`,
    },
    order_type_delivery: { tr: '🛵 Paket Servis', en: '🛵 Delivery', ar: '🛵 توصيل', zh: '🛵 外卖配送' },
    order_type_takeaway: { tr: '🥡 Gel-Al', en: '🥡 Takeaway', ar: '🥡 استلام', zh: '🥡 到店自取' },
    order_type_dinein: { tr: '🥢 Masada', en: '🥢 Dine-in', ar: '🥢 داخل المطعم', zh: '🥢 堂食' },
    address_placeholder: {
      tr: 'Adresinizi veya masa numaranızı girin...',
      en: 'Enter your delivery address or table number...',
      ar: 'أدخل عنوان التوصيل أو رقم الطاولة...',
      zh: '请输入送餐地址或桌号...',
    },
    notes_placeholder: {
      tr: 'Sipariş notunuz (ör. Bol soya sosu, zencefil rica ederiz)...',
      en: 'Order notes (e.g. Extra soy sauce, please)...',
      ar: 'ملاحظات الطلب (مثال: صوص صويا إضافي من فضلك)...',
      zh: '订单备注 (如：多要酱油、生姜等)...',
    },
    send_whatsapp: { tr: 'WhatsApp ile Siparişi Gönder', en: 'Send Order via WhatsApp', ar: 'إرسال الطلب عبر واتساب', zh: '通过 WhatsApp 确认点餐' },
    call_order: { tr: 'Telefonla Sipariş Ver', en: 'Order by Phone', ar: 'طلب عبر الهاتف', zh: '电话致电订餐' },
    clear_all: { tr: 'Sepeti Temizle', en: 'Clear Cart', ar: 'إفراغ السلة', zh: '清空购物车' },
    view_cart_btn: { tr: 'Sepeti Gör', en: 'View Cart', ar: 'عرض السلة', zh: '查看购物车' },
  };

  const getLabel = (key) => labels[key]?.[lang] || labels[key]?.en || '';

  // Generate WhatsApp order message URL
  const handleWhatsAppOrder = () => {
    let msg = `🥢 *Lucky Sushi Chinese Siparişi* 🍣\n`;
    msg += `━━━━━━━━━━━━━━━━━━━\n`;
    cart.forEach((entry) => {
      const itemName = t(entry.item, 'name');
      const itemPrice = entry.item.price * entry.quantity;
      msg += `• ${entry.quantity}x ${itemName} — ${itemPrice.toLocaleString()} TL\n`;
    });
    msg += `━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*Toplam Tutar:* ${cartSubtotal.toLocaleString()} TL\n`;
    msg += `*Sipariş Türü:* ${
      orderType === 'delivery'
        ? 'Paket Servis (Teslimat)'
        : orderType === 'takeaway'
        ? 'Gel-Al (Takeaway)'
        : 'Masada (Dine-in)'
    }\n`;
    if (address.trim()) {
      msg += `*Adres/Masa:* ${address.trim()}\n`;
    }
    if (orderNote.trim()) {
      msg += `*Not:* ${orderNote.trim()}\n`;
    }

    const phoneClean = restaurantInfo.phone.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${phoneClean}?text=${encoded}`, '_blank');
  };

  return (
    <>
      {/* Floating Bottom Cart Bar */}
      {cartCount > 0 && !isCartOpen && (
        <aside
          className="floating-cart-bar"
          onClick={() => setIsCartOpen(true)}
          role="button"
          tabIndex={0}
          aria-label={`${cartCount} items in cart, total ${cartSubtotal} TL`}
        >
          <div className="floating-cart-bar__inner">
            <div className="floating-cart-bar__left">
              <span className="floating-cart-bar__icon" aria-hidden="true">🛒</span>
              <div className="floating-cart-bar__info">
                <span className="floating-cart-bar__count">
                  {cartCount} {getLabel('items_count')}
                </span>
                <span className="floating-cart-bar__total">
                  {cartSubtotal.toLocaleString()} TL
                </span>
              </div>
            </div>

            <button
              type="button"
              className="floating-cart-bar__btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsCartOpen(true);
              }}
            >
              <span>{getLabel('view_cart_btn')}</span>
              <span aria-hidden="true">{dir === 'rtl' ? '←' : '→'}</span>
            </button>
          </div>
        </aside>
      )}

      {/* Cart Drawer Modal */}
      {isCartOpen && (
        <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div
            className="cart-drawer"
            dir={dir}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={getLabel('cart_title')}
          >
            {/* Header */}
            <div className="cart-drawer__header">
              <div className="cart-drawer__title-wrap">
                <span className="cart-drawer__icon" aria-hidden="true">🥢🛒</span>
                <h2 className="cart-drawer__title">
                  {getLabel('cart_title')} <span className="cart-drawer__badge">({cartCount})</span>
                </h2>
              </div>
              <button
                type="button"
                className="cart-drawer__close"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="cart-drawer__body">
              {cart.length === 0 ? (
                <div className="cart-drawer__empty">
                  <span className="cart-drawer__empty-icon" aria-hidden="true">🍣</span>
                  <p>{getLabel('empty_cart')}</p>
                </div>
              ) : (
                <>
                  {/* Items List */}
                  <div className="cart-drawer__items">
                    {cart.map(({ item, quantity }) => (
                      <div key={item.id} className="cart-item">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={t(item, 'name')}
                            className="cart-item__img"
                          />
                        ) : (
                          <div className="cart-item__placeholder">🍣</div>
                        )}

                        <div className="cart-item__info">
                          <h4 className="cart-item__name">{t(item, 'name')}</h4>
                          <span className="cart-item__price">
                            {(item.price * quantity).toLocaleString()} {item.currency}
                          </span>
                        </div>

                        {/* Inline Counter */}
                        <div className="cart-item__counter">
                          <button
                            type="button"
                            className="cart-qty-btn"
                            onClick={() => removeFromCart(item.id)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="cart-qty-num">{quantity}</span>
                          <button
                            type="button"
                            className="cart-qty-btn"
                            onClick={() => addToCart(item, 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          className="cart-item__delete"
                          onClick={() => deleteItem(item.id)}
                          aria-label={`Remove ${t(item, 'name')}`}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Order Type Tabs */}
                  <div className="cart-order-type">
                    <button
                      type="button"
                      className={`cart-type-btn${orderType === 'delivery' ? ' cart-type-btn--active' : ''}`}
                      onClick={() => setOrderType('delivery')}
                    >
                      {getLabel('order_type_delivery')}
                    </button>
                    <button
                      type="button"
                      className={`cart-type-btn${orderType === 'takeaway' ? ' cart-type-btn--active' : ''}`}
                      onClick={() => setOrderType('takeaway')}
                    >
                      {getLabel('order_type_takeaway')}
                    </button>
                    <button
                      type="button"
                      className={`cart-type-btn${orderType === 'dinein' ? ' cart-type-btn--active' : ''}`}
                      onClick={() => setOrderType('dinein')}
                    >
                      {getLabel('order_type_dinein')}
                    </button>
                  </div>

                  {/* Address or Table Input */}
                  <div className="cart-input-wrap">
                    <input
                      type="text"
                      className="cart-text-input"
                      placeholder={getLabel('address_placeholder')}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  {/* Order Notes */}
                  <div className="cart-input-wrap">
                    <textarea
                      rows={2}
                      className="cart-text-input cart-text-input--textarea"
                      placeholder={getLabel('notes_placeholder')}
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                    />
                  </div>

                  {/* Delivery Min Alert */}
                  {orderType === 'delivery' && !isMinDeliveryReached && (
                    <div className="cart-min-alert" role="alert">
                      <span>⚠️</span>
                      <span>{getLabel('min_alert')}</span>
                    </div>
                  )}

                  {/* Summary & Checkout Actions */}
                  <div className="cart-drawer__summary">
                    <div className="cart-summary-row">
                      <span>{getLabel('subtotal')}</span>
                      <span>{cartSubtotal.toLocaleString()} TL</span>
                    </div>
                    <div className="cart-summary-row cart-summary-row--total">
                      <span>{getLabel('total')}</span>
                      <span>{cartSubtotal.toLocaleString()} TL</span>
                    </div>

                    <div className="cart-actions">
                      <button
                        type="button"
                        className="btn-cart-whatsapp"
                        onClick={handleWhatsAppOrder}
                      >
                        <span aria-hidden="true">💬</span>
                        <span>{getLabel('send_whatsapp')}</span>
                      </button>

                      <a
                        href={`tel:${restaurantInfo.phone.replace(/[^0-9]/g, '')}`}
                        className="btn-cart-phone"
                      >
                        <span aria-hidden="true">📞</span>
                        <span>{getLabel('call_order')}</span>
                      </a>
                    </div>

                    <button
                      type="button"
                      className="btn-cart-clear"
                      onClick={clearCart}
                    >
                      {getLabel('clear_all')}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
