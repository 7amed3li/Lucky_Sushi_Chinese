'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLang } from '@/context/LangContext';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { restaurantInfo } from '@/data/menuData';

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

const ADDRESS_STORAGE_KEY = 'lucky_customer_address';

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

  // Customer Delivery Address state (persisted in localStorage)
  // Fields: name, city (İl), district (İlçe), neighborhood (Mahalle), street (Cadde/Sokak), buildingNo (Bina No), floor (Kat), apartmentNo (Daire No), note (Not), phone (Telefon)
  const initialAddressState = {
    name: '',
    city: 'İstanbul',
    district: '',
    neighborhood: '',
    street: '',
    buildingNo: '',
    floor: '',
    apartmentNo: '',
    note: '',
    phone: '',
    address: '',
  };

  const [customerAddress, setCustomerAddress] = useState(initialAddressState);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState(initialAddressState);

  const phoneClean = restaurantInfo.phone.replace(/[^0-9]/g, '');

  // Load saved address from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(ADDRESS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          const merged = { ...initialAddressState, ...parsed };
          setCustomerAddress(merged);
          setAddressForm(merged);
        }
      }
    } catch (_) {}
  }, []);

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
    // Address labels
    addressTitle: {
      tr: 'Teslimat Adresi',
      en: 'Delivery Address',
      ar: 'عنوان التوصيل (Teslimat Adresi)',
      ru: 'Адрес доставки',
      zh: '送餐地址',
    },
    addressAddPrompt: {
      tr: '+ Teslimat Adresi Ekle',
      en: '+ Add Delivery Address',
      ar: '+ إضافة عنوان التوصيل',
      ru: '+ Добавить адрес доставки',
      zh: '+ 添加送餐地址',
    },
    addressEdit: {
      tr: 'Değiştir',
      en: 'Change',
      ar: 'تعديل',
      ru: 'Изменить',
      zh: '修改',
    },
    addressNamePlaceholder: {
      tr: 'Ad Soyad',
      en: 'Full Name',
      ar: 'الاسم (Ad Soyad)',
      ru: 'Имя Фамилия',
      zh: '姓名',
    },
    cityLabel: { tr: 'Şehir / İl', en: 'City (İl)', ar: 'المدينة (İl / Şehir)', ru: 'Город', zh: '城市' },
    districtLabel: { tr: 'İlçe', en: 'District (İlçe)', ar: 'المنطقة (İlçe)', ru: 'Район', zh: '区/县' },
    neighborhoodLabel: { tr: 'Mahalle', en: 'Neighborhood (Mahalle)', ar: 'الحي (Mahalle)', ru: 'Микрорайон', zh: '街区' },
    streetLabel: { tr: 'Cadde / Sokak', en: 'Street (Cadde/Sokak)', ar: 'الشارع (Cadde / Sokak)', ru: 'Улица', zh: '街道' },
    buildingLabel: { tr: 'Bina No', en: 'Building No', ar: 'رقم المبنى (Bina No)', ru: 'Дом', zh: '楼号' },
    floorLabel: { tr: 'Kat', en: 'Floor (Kat)', ar: 'الدور / الطابق (Kat)', ru: 'Этаж', zh: '楼层' },
    aptLabel: { tr: 'Daire No', en: 'Apt No (Daire)', ar: 'رقم الشقة (Daire No)', ru: 'Квартира', zh: '门牌号' },
    noteLabel: { tr: 'Sipariş / Adres Notu', en: 'Note', ar: 'ملاحظة (Not)', ru: 'Примечания', zh: '备注' },
    phoneLabel: { tr: 'Telefon Numarası', en: 'Phone', ar: 'رقم الهاتف (Telefon)', ru: 'Телефон', zh: '电话' },
    addressSave: {
      tr: 'Adresi Kaydet',
      en: 'Save Address',
      ar: 'حفظ العنوان',
      ru: 'Сохранить адрес',
      zh: '保存地址',
    },
    addressCancel: {
      tr: 'Vazgeç',
      en: 'Cancel',
      ar: 'إلغاء',
      ru: 'Отмена',
      zh: '取消',
    },
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

  // Helper: check if valid address exists
  const hasSavedAddress = Boolean(
    (customerAddress.district && customerAddress.district.trim()) ||
    (customerAddress.street && customerAddress.street.trim()) ||
    (customerAddress.address && customerAddress.address.trim())
  );

  // Save address handler
  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!addressForm.district?.trim() && !addressForm.street?.trim() && !addressForm.address?.trim()) {
      return;
    }
    setCustomerAddress(addressForm);
    setIsEditingAddress(false);
    try {
      localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(addressForm));
    } catch (_) {}
  };

  const handleCancelAddress = () => {
    setAddressForm(customerAddress);
    setIsEditingAddress(false);
  };

  // Locale-aware WhatsApp order message with Turkish delivery address format
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

    // Append Turkish structured customer delivery address if saved
    if (hasSavedAddress) {
      msg += `\n\n📍 Teslimat Adresi:`;
      if (customerAddress.name && customerAddress.name.trim()) {
        msg += `\n👤 İsim: ${customerAddress.name.trim()}`;
      }
      if (customerAddress.city && customerAddress.city.trim()) {
        msg += `\n🏙️ Şehir: ${customerAddress.city.trim()}`;
      }
      if (customerAddress.district && customerAddress.district.trim()) {
        msg += `\n📍 İlçe: ${customerAddress.district.trim()}`;
      }
      if (customerAddress.neighborhood && customerAddress.neighborhood.trim()) {
        msg += `\n🏘️ Mahalle: ${customerAddress.neighborhood.trim()}`;
      }
      if (customerAddress.street && customerAddress.street.trim()) {
        msg += `\n🛣️ Cadde / Sokak: ${customerAddress.street.trim()}`;
      }
      if (customerAddress.buildingNo && customerAddress.buildingNo.trim()) {
        msg += `\n🏠 Bina No: ${customerAddress.buildingNo.trim()}`;
      }
      if (customerAddress.floor && customerAddress.floor.trim()) {
        msg += `\n🪜 Kat: ${customerAddress.floor.trim()}`;
      }
      if (customerAddress.apartmentNo && customerAddress.apartmentNo.trim()) {
        msg += `\n🚪 Daire No: ${customerAddress.apartmentNo.trim()}`;
      }
      // If legacy single address exists
      if (customerAddress.address && customerAddress.address.trim() && !customerAddress.street && !customerAddress.district) {
        msg += `\n🏠 Adres: ${customerAddress.address.trim()}`;
      }
      const finalNote = (customerAddress.note || customerAddress.buildingNote || '').trim();
      if (finalNote) {
        msg += `\n📝 Not: ${finalNote}`;
      }
      if (customerAddress.phone && customerAddress.phone.trim()) {
        msg += `\n📞 Tel: ${customerAddress.phone.trim()}`;
      }
    }

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
        {/* Waiter Banner */}
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

              {/* Show saved address if customer visits empty cart */}
              {hasSavedAddress && (
                <div style={{
                  marginTop: '20px',
                  padding: '12px 14px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(246, 241, 232, 0.1)',
                  borderRadius: '8px',
                  textAlign: isRtl ? 'right' : 'left',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>📍</span>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--color-brand-light)' }}>
                        {l('addressTitle')}
                      </strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsEditingAddress(true)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-accent, #D4A373)',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      {l('addressEdit')}
                    </button>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--mist-beige)', lineHeight: 1.4 }}>
                    {customerAddress.name && <div style={{ color: '#fff', fontWeight: 600 }}>{customerAddress.name}</div>}
                    <div>{customerAddress.address}</div>
                    {customerAddress.buildingNote && <div style={{ opacity: 0.8, fontSize: '0.76rem' }}>{customerAddress.buildingNote}</div>}
                  </div>
                </div>
              )}
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
            {/* Delivery Address Section */}
            <div style={{ marginBottom: '14px' }}>
              {isEditingAddress ? (
                /* Address Edit Form - Detailed Turkish Structure */
                <form
                  onSubmit={handleSaveAddress}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(246, 241, 232, 0.15)',
                    borderRadius: '8px',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <span>📍</span>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--color-brand-light)' }}>
                      {l('addressTitle')}
                    </strong>
                  </div>

                  {/* Name */}
                  <input
                    type="text"
                    placeholder={l('addressNamePlaceholder')}
                    value={addressForm.name || ''}
                    onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                    style={{
                      background: 'rgba(255, 255, 255, 0.07)',
                      border: '1px solid rgba(246, 241, 232, 0.15)',
                      borderRadius: '6px',
                      padding: '7px 10px',
                      color: '#ffffff',
                      fontSize: '0.82rem',
                      outline: 'none',
                    }}
                  />

                  {/* Şehir (İl) & İlçe */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder={l('cityLabel')}
                      value={addressForm.city || ''}
                      onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                      style={{
                        background: 'rgba(255, 255, 255, 0.07)',
                        border: '1px solid rgba(246, 241, 232, 0.15)',
                        borderRadius: '6px',
                        padding: '7px 10px',
                        color: '#ffffff',
                        fontSize: '0.82rem',
                        outline: 'none',
                      }}
                    />
                    <input
                      type="text"
                      placeholder={l('districtLabel')}
                      value={addressForm.district || ''}
                      required
                      onChange={(e) => setAddressForm({ ...addressForm, district: e.target.value })}
                      style={{
                        background: 'rgba(255, 255, 255, 0.07)',
                        border: '1px solid rgba(246, 241, 232, 0.15)',
                        borderRadius: '6px',
                        padding: '7px 10px',
                        color: '#ffffff',
                        fontSize: '0.82rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Mahalle & Cadde/Sokak */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder={l('neighborhoodLabel')}
                      value={addressForm.neighborhood || ''}
                      onChange={(e) => setAddressForm({ ...addressForm, neighborhood: e.target.value })}
                      style={{
                        background: 'rgba(255, 255, 255, 0.07)',
                        border: '1px solid rgba(246, 241, 232, 0.15)',
                        borderRadius: '6px',
                        padding: '7px 10px',
                        color: '#ffffff',
                        fontSize: '0.82rem',
                        outline: 'none',
                      }}
                    />
                    <input
                      type="text"
                      placeholder={l('streetLabel')}
                      value={addressForm.street || ''}
                      required
                      onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                      style={{
                        background: 'rgba(255, 255, 255, 0.07)',
                        border: '1px solid rgba(246, 241, 232, 0.15)',
                        borderRadius: '6px',
                        padding: '7px 10px',
                        color: '#ffffff',
                        fontSize: '0.82rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Bina No, Kat, Daire No */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder={l('buildingLabel')}
                      value={addressForm.buildingNo || ''}
                      onChange={(e) => setAddressForm({ ...addressForm, buildingNo: e.target.value })}
                      style={{
                        background: 'rgba(255, 255, 255, 0.07)',
                        border: '1px solid rgba(246, 241, 232, 0.15)',
                        borderRadius: '6px',
                        padding: '7px 10px',
                        color: '#ffffff',
                        fontSize: '0.82rem',
                        outline: 'none',
                      }}
                    />
                    <input
                      type="text"
                      placeholder={l('floorLabel')}
                      value={addressForm.floor || ''}
                      onChange={(e) => setAddressForm({ ...addressForm, floor: e.target.value })}
                      style={{
                        background: 'rgba(255, 255, 255, 0.07)',
                        border: '1px solid rgba(246, 241, 232, 0.15)',
                        borderRadius: '6px',
                        padding: '7px 10px',
                        color: '#ffffff',
                        fontSize: '0.82rem',
                        outline: 'none',
                      }}
                    />
                    <input
                      type="text"
                      placeholder={l('aptLabel')}
                      value={addressForm.apartmentNo || ''}
                      onChange={(e) => setAddressForm({ ...addressForm, apartmentNo: e.target.value })}
                      style={{
                        background: 'rgba(255, 255, 255, 0.07)',
                        border: '1px solid rgba(246, 241, 232, 0.15)',
                        borderRadius: '6px',
                        padding: '7px 10px',
                        color: '#ffffff',
                        fontSize: '0.82rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Note */}
                  <input
                    type="text"
                    placeholder={l('noteLabel')}
                    value={addressForm.note || addressForm.buildingNote || ''}
                    onChange={(e) => setAddressForm({ ...addressForm, note: e.target.value, buildingNote: e.target.value })}
                    style={{
                      background: 'rgba(255, 255, 255, 0.07)',
                      border: '1px solid rgba(246, 241, 232, 0.15)',
                      borderRadius: '6px',
                      padding: '7px 10px',
                      color: '#ffffff',
                      fontSize: '0.82rem',
                      outline: 'none',
                    }}
                  />

                  {/* Phone */}
                  <input
                    type="tel"
                    placeholder={l('phoneLabel')}
                    value={addressForm.phone || ''}
                    onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                    style={{
                      background: 'rgba(255, 255, 255, 0.07)',
                      border: '1px solid rgba(246, 241, 232, 0.15)',
                      borderRadius: '6px',
                      padding: '7px 10px',
                      color: '#ffffff',
                      fontSize: '0.82rem',
                      outline: 'none',
                    }}
                  />

                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    <button
                      type="submit"
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        background: '#3e5343',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                      }}
                    >
                      {l('addressSave')}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelAddress}
                      style={{
                        padding: '8px 12px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        color: 'var(--mist-beige)',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                      }}
                    >
                      {l('addressCancel')}
                    </button>
                  </div>
                </form>
              ) : hasSavedAddress ? (
                /* Saved Address Display Card */
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(246, 241, 232, 0.12)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.95rem' }}>📍</span>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--color-brand-light)' }}>
                        {l('addressTitle')}
                      </strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsEditingAddress(true)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-accent, #D4A373)',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        fontWeight: 600,
                        textDecoration: 'underline',
                      }}
                    >
                      {l('addressEdit')}
                    </button>
                  </div>

                  <div style={{ fontSize: '0.82rem', color: 'var(--mist-beige)', lineHeight: 1.45 }}>
                    {customerAddress.name && (
                      <div style={{ color: '#fff', fontWeight: 600 }}>👤 {customerAddress.name}</div>
                    )}
                    <div>
                      {[
                        customerAddress.district && `${customerAddress.district}`,
                        customerAddress.city && `${customerAddress.city}`,
                      ].filter(Boolean).join(' / ')}
                    </div>
                    <div>
                      {[
                        customerAddress.neighborhood && `${customerAddress.neighborhood} Mah.`,
                        customerAddress.street && `${customerAddress.street}`,
                      ].filter(Boolean).join(', ')}
                    </div>
                    {(customerAddress.buildingNo || customerAddress.floor || customerAddress.apartmentNo) && (
                      <div style={{ fontSize: '0.78rem', opacity: 0.9 }}>
                        {[
                          customerAddress.buildingNo && `Bina: ${customerAddress.buildingNo}`,
                          customerAddress.floor && `Kat: ${customerAddress.floor}`,
                          customerAddress.apartmentNo && `Daire: ${customerAddress.apartmentNo}`,
                        ].filter(Boolean).join(' • ')}
                      </div>
                    )}
                    {customerAddress.address && !customerAddress.street && (
                      <div style={{ wordBreak: 'break-word' }}>{customerAddress.address}</div>
                    )}
                    {(customerAddress.note || customerAddress.buildingNote) && (
                      <div style={{ fontSize: '0.76rem', color: '#ffd166', marginTop: '2px' }}>
                        📝 {customerAddress.note || customerAddress.buildingNote}
                      </div>
                    )}
                    {customerAddress.phone && (
                      <div style={{ fontSize: '0.76rem', opacity: 0.85, marginTop: '2px' }}>
                        📞 {customerAddress.phone}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Add Address Prompt Button */
                <button
                  type="button"
                  onClick={() => setIsEditingAddress(true)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '9px 12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px dashed rgba(246, 241, 232, 0.25)',
                    borderRadius: '8px',
                    color: 'var(--color-brand-light)',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span style={{ fontSize: '0.95rem' }}>📍</span>
                  <span>{l('addressAddPrompt')}</span>
                </button>
              )}
            </div>

            {/* Subtotal */}
            <div className="cart-drawer__subtotal">
              <span className="cart-drawer__subtotal-label">{l('subtotal')}</span>
              <span className="cart-drawer__subtotal-value">{formatPrice(cartSubtotal)}</span>
            </div>

            {/* WhatsApp Checkout */}
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
