'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLang } from '@/context/LangContext';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useBranch } from '@/context/BranchContext';
import { restaurantInfo } from '@/data/menuData';
import KVKKModal from '@/components/KVKKModal';
import { FaShieldHalved, FaLocationDot, FaCircleInfo, FaRotate, FaTriangleExclamation, FaGlobe, FaPhone } from 'react-icons/fa6';
import { GiSushis } from 'react-icons/gi';

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
  const { selectedBranch, selectedBranchId, openBranchModal } = useBranch();
  const {
    cart, isCartOpen, setIsCartOpen,
    addToCart, removeFromCart, deleteItem, clearCart,
    cartCount, cartSubtotal, isMinDeliveryReached, minDeliveryTl,
  } = useCart();

  // Cart language state
  const [cartLang, setCartLang] = useState('tr');
  const [isKvkkOpen, setIsKvkkOpen] = useState(false);

  // Customer Delivery Address state
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
  const [isAddressExpanded, setIsAddressExpanded] = useState(false);
  const [addressForm, setAddressForm] = useState(initialAddressState);

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
      ru: 'Покажите этот список официانту или закажите через WhatsApp',
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
    branchTitle: {
      tr: 'Sipariş Şubesi',
      en: 'Ordering Branch',
      ar: 'فرع الطلب والتوصيل',
      ru: 'Филиал заказа',
      zh: '订餐分店',
    },
    branchSelectPrompt: {
      tr: 'Lütfen Önce Şube Seçin (Zorunlu)',
      en: 'Please Select Branch (Required)',
      ar: 'يرجى اختيار الفرع أولاً (إجباري)',
      ru: 'Пожалуйста, выберите филиал (обязательно)',
      zh: '请先选择分店（必选）',
    },
    branchChange: {
      tr: 'Değiştir',
      en: 'Change',
      ar: 'تعديل',
      ru: 'Изменить',
      zh: '修改',
    },
    // Address labels
    addressTitle: {
      tr: 'Teslimat Adresi',
      en: 'Delivery Address',
      ar: 'عنوان التوصيل (Teslimat Adresi)',
      ru: 'Адрес доставки',
      zh: '送餐地址',
    },
    addressRequiredNotice: {
      tr: 'Sipariş vermeden önce lütfen teslimat adresinizi girin',
      en: 'Please add your delivery address before ordering',
      ar: 'يرجى إدخال عنوان التوصيل أولاً قبل إرسال الطلب',
      ru: 'Пожалуйста, введите адрес доставки перед заказом',
      zh: '下单前请输入送餐地址',
    },
    addressAddPrompt: {
      tr: 'Teslimat Adresi Girin (Zorunlu)',
      en: 'Add Delivery Address (Required)',
      ar: 'إضافة عنوان التوصيل (إجباري للطلب)',
      ru: 'Введите адрес доставки (обязательно)',
      zh: '添加送餐地址（必填）',
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
    kvkkNotice: {
      tr: 'Verileriniz KVKK kapsamında yalnızca sipariş teslimatı için kullanılır; WhatsApp üzerinden seçtiğiniz şubeye iletilir.',
      en: 'Your data is solely processed for delivery and forwarded directly to your chosen branch via WhatsApp.',
      ar: 'تُستخدم بياناتكم حصراً لتجهيز الطلب وتوصيله وتُرسل مباشرة للفرع المختار عبر واتساب.',
      ru: 'Ваши данные используются исключительно для доставки и передаются в выбранный филиал через WhatsApp.',
      zh: '您的信息仅用于餐品配送，并通过WhatsApp直接发送至您所选的分店。',
    },
    kvkkLink: {
      tr: 'Aydınlatma Metni & Gizlilik Bildirimi (KVKK)',
      en: 'Privacy Notice (KVKK)',
      ar: 'إشعار الخصوصية وحماية البيانات (KVKK)',
      ru: 'Положение о конфиденциальности',
      zh: '隐私保护声明 (KVKK)',
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

  // WhatsApp order message with selected branch name and Turkish Lira (₺)
  const buildWhatsAppMsg = () => {
    const branchName = selectedBranch ? selectedBranch.name_tr : 'Alibeyköy (Merkez)';
    let msg = `Merhaba Lucky Sushi & Chinese (${branchName}), yeni bir sipariş vermek istiyorum:\n\n`;
    cart.forEach(({ item, quantity }) => {
      const trName = getItemName(item, 'tr');
      const itemTotalTl = (item.price * quantity).toFixed(0);
      msg += `• ${quantity}x ${trName} — ${itemTotalTl} ₺\n`;
    });
    msg += `\n💰 Toplam Tutar: ${cartSubtotal.toFixed(0)} ₺`;

    // Append branch details
    if (selectedBranch) {
      msg += `\nSeçilen Şube: ${selectedBranch.name_tr} (${selectedBranch.badge_tr})`;
    }

    // Append Turkish structured customer delivery address if saved
    if (hasSavedAddress) {
      msg += `\n\nTeslimat Adresi:`;
      if (customerAddress.name && customerAddress.name.trim()) {
        msg += `\n👤 İsim: ${customerAddress.name.trim()}`;
      }
      if (customerAddress.city && customerAddress.city.trim()) {
        msg += `\n🏙️ Şehir: ${customerAddress.city.trim()}`;
      }
      if (customerAddress.district && customerAddress.district.trim()) {
        msg += `\nİlçe: ${customerAddress.district.trim()}`;
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
      if (customerAddress.address && customerAddress.address.trim() && !customerAddress.street && !customerAddress.district) {
        msg += `\n🏠 Adres: ${customerAddress.address.trim()}`;
      }
      const finalNote = (customerAddress.note || customerAddress.buildingNote || '').trim();
      if (finalNote) {
        msg += `\n📝 Not: ${finalNote}`;
      }
      if (customerAddress.phone && customerAddress.phone.trim()) {
        msg += `\nTel: ${customerAddress.phone.trim()}`;
      }
    }

    return msg;
  };

  const handleCheckoutClick = (e) => {
    e.preventDefault();
    if (!selectedBranch) {
      openBranchModal((branch) => {
        const cleanPhone = (branch.whatsapp || branch.phone).replace(/[^0-9]/g, '');
        const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(buildWhatsAppMsg())}`;
        window.open(url, '_blank');
      });
      return;
    }

    if (!hasSavedAddress) {
      setIsEditingAddress(true);
      return;
    }

    const cleanPhone = (selectedBranch.whatsapp || selectedBranch.phone).replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(buildWhatsAppMsg())}`;
    window.open(url, '_blank');
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
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '100vh',
        }}
      >
        {/* Waiter / Online Banner */}
        <div
          style={{
            background: '#3e5343',
            color: '#FFFFFF',
            padding: '10px 16px',
            fontSize: '0.86rem',
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
              <FaGlobe size={15} aria-hidden="true" />
              <span>{LANG_NAMES[lang] || lang.toUpperCase()}</span>
            </button>
          </div>
        )}

        {/* Body */}
        <div className="cart-drawer__body" style={{ flex: 1, overflowY: 'auto' }}>
          {cart.length === 0 ? (
            <div className="cart-drawer__empty">
              <div className="cart-drawer__empty-icon"><GiSushis aria-hidden="true" /></div>
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
                      <FaLocationDot size={14} style={{ color: 'var(--color-accent, #D4A373)', flexShrink: 0 }} aria-hidden="true" />
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
                      }}><GiSushis aria-hidden="true" /></div>
                    )}
                  </div>
                  <div className="cart-item__info">
                    <span className="cart-item__name" style={{ fontWeight: 600, color: 'var(--color-brand-light)' }}>
                      {primaryName}
                    </span>

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
          <div className="cart-drawer__footer" style={{ paddingBottom: 'calc(20px + env(safe-area-inset-bottom, 0px))' }}>
            
            {/* ── 1. Selected Branch Indicator / Prompt ── */}
            <div style={{ marginBottom: '10px' }}>
              {selectedBranch ? (
                <div
                  style={{
                    background: 'rgba(45, 106, 79, 0.16)',
                    border: '1px solid #2D6A4F',
                    borderRadius: '8px',
                    padding: '9px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaLocationDot size={15} style={{ color: '#4ade80', flexShrink: 0 }} aria-hidden="true" />
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#4ade80' }}>
                        {selectedBranch[`name_${lang}`] || selectedBranch.name_tr}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--mist-beige)', opacity: 0.85 }}>
                        {selectedBranch[`badge_${lang}`] || selectedBranch.badge_tr}
                        {selectedBranch.type === 'delivery-only' && ' • (Sadece Paket Servis)'}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => openBranchModal()}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-accent, #D4A373)',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      padding: 0,
                    }}
                  >
                    {l('branchChange')}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => openBranchModal()}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '10px 12px',
                    background: 'rgba(212, 163, 115, 0.16)',
                    border: '1.5px dashed #D4A373',
                    borderRadius: '8px',
                    color: '#ffd166',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  <span>{l('branchSelectPrompt')}</span>
                </button>
              )}
            </div>

            {/* ── 2. Delivery Address Section ── */}
            <div style={{ marginBottom: '10px' }}>
              {isEditingAddress ? (
                /* Address Edit Form */
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
                    <FaLocationDot size={14} style={{ color: 'var(--color-accent, #D4A373)', flexShrink: 0 }} aria-hidden="true" />
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
                      width: '100%',
                      boxSizing: 'border-box',
                      background: 'rgba(255, 255, 255, 0.07)',
                      border: '1px solid rgba(246, 241, 232, 0.15)',
                      borderRadius: '6px',
                      padding: '7px 10px',
                      color: '#ffffff',
                      fontSize: '0.82rem',
                      outline: 'none',
                    }}
                  />

                  {/* City & District */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', width: '100%', boxSizing: 'border-box' }}>
                    <input
                      type="text"
                      placeholder={l('cityLabel')}
                      value={addressForm.city || ''}
                      onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                      style={{
                        width: '100%',
                        minWidth: 0,
                        boxSizing: 'border-box',
                        background: 'rgba(255, 255, 255, 0.07)',
                        border: '1px solid rgba(246, 241, 232, 0.15)',
                        borderRadius: '6px',
                        padding: '7px 8px',
                        color: '#ffffff',
                        fontSize: '0.8rem',
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
                        width: '100%',
                        minWidth: 0,
                        boxSizing: 'border-box',
                        background: 'rgba(255, 255, 255, 0.07)',
                        border: '1px solid rgba(246, 241, 232, 0.15)',
                        borderRadius: '6px',
                        padding: '7px 8px',
                        color: '#ffffff',
                        fontSize: '0.8rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Neighborhood & Street */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', width: '100%', boxSizing: 'border-box' }}>
                    <input
                      type="text"
                      placeholder={l('neighborhoodLabel')}
                      value={addressForm.neighborhood || ''}
                      onChange={(e) => setAddressForm({ ...addressForm, neighborhood: e.target.value })}
                      style={{
                        width: '100%',
                        minWidth: 0,
                        boxSizing: 'border-box',
                        background: 'rgba(255, 255, 255, 0.07)',
                        border: '1px solid rgba(246, 241, 232, 0.15)',
                        borderRadius: '6px',
                        padding: '7px 8px',
                        color: '#ffffff',
                        fontSize: '0.8rem',
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
                        width: '100%',
                        minWidth: 0,
                        boxSizing: 'border-box',
                        background: 'rgba(255, 255, 255, 0.07)',
                        border: '1px solid rgba(246, 241, 232, 0.15)',
                        borderRadius: '6px',
                        padding: '7px 8px',
                        color: '#ffffff',
                        fontSize: '0.8rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Building No, Floor, Apt No */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', width: '100%', boxSizing: 'border-box' }}>
                    <input
                      type="text"
                      placeholder={l('buildingLabel')}
                      value={addressForm.buildingNo || ''}
                      onChange={(e) => setAddressForm({ ...addressForm, buildingNo: e.target.value })}
                      style={{
                        width: '100%',
                        minWidth: 0,
                        boxSizing: 'border-box',
                        background: 'rgba(255, 255, 255, 0.07)',
                        border: '1px solid rgba(246, 241, 232, 0.15)',
                        borderRadius: '6px',
                        padding: '7px 6px',
                        color: '#ffffff',
                        fontSize: '0.78rem',
                        outline: 'none',
                        textAlign: 'center',
                      }}
                    />
                    <input
                      type="text"
                      placeholder={l('floorLabel')}
                      value={addressForm.floor || ''}
                      onChange={(e) => setAddressForm({ ...addressForm, floor: e.target.value })}
                      style={{
                        width: '100%',
                        minWidth: 0,
                        boxSizing: 'border-box',
                        background: 'rgba(255, 255, 255, 0.07)',
                        border: '1px solid rgba(246, 241, 232, 0.15)',
                        borderRadius: '6px',
                        padding: '7px 6px',
                        color: '#ffffff',
                        fontSize: '0.78rem',
                        outline: 'none',
                        textAlign: 'center',
                      }}
                    />
                    <input
                      type="text"
                      placeholder={l('aptLabel')}
                      value={addressForm.apartmentNo || ''}
                      onChange={(e) => setAddressForm({ ...addressForm, apartmentNo: e.target.value })}
                      style={{
                        width: '100%',
                        minWidth: 0,
                        boxSizing: 'border-box',
                        background: 'rgba(255, 255, 255, 0.07)',
                        border: '1px solid rgba(246, 241, 232, 0.15)',
                        borderRadius: '6px',
                        padding: '7px 6px',
                        color: '#ffffff',
                        fontSize: '0.78rem',
                        outline: 'none',
                        textAlign: 'center',
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
                      width: '100%',
                      boxSizing: 'border-box',
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
                      width: '100%',
                      boxSizing: 'border-box',
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
                /* Collapsible Saved Address Card */
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(246, 241, 232, 0.14)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div
                    onClick={() => setIsAddressExpanded(!isAddressExpanded)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 12px',
                      cursor: 'pointer',
                      userSelect: 'none',
                      background: isAddressExpanded ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FaLocationDot size={15} style={{ color: 'var(--color-accent, #D4A373)', flexShrink: 0 }} aria-hidden="true" />
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <strong style={{ fontSize: '0.84rem', color: 'var(--color-brand-light)' }}>
                          {l('addressTitle')}
                        </strong>
                        {!isAddressExpanded && (
                          <span style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.6)', maxWidth: '210px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {[customerAddress.district, customerAddress.city].filter(Boolean).join(', ')}
                            {customerAddress.street ? ` • ${customerAddress.street}` : ''}
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsEditingAddress(true);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--color-accent, #D4A373)',
                          fontSize: '0.78rem',
                          cursor: 'pointer',
                          fontWeight: 600,
                          textDecoration: 'underline',
                          padding: 0,
                        }}
                      >
                        {l('addressEdit')}
                      </button>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--mist-beige)',
                          transition: 'transform 0.2s ease',
                          transform: isAddressExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                          display: 'inline-block',
                        }}
                      >
                        ▼
                      </span>
                    </div>
                  </div>

                  {isAddressExpanded && (
                    <div
                      style={{
                        padding: '8px 12px 12px 12px',
                        borderTop: '1px solid rgba(246, 241, 232, 0.08)',
                        fontSize: '0.82rem',
                        color: 'var(--mist-beige)',
                        lineHeight: 1.45,
                      }}
                    >
                      {customerAddress.name && (
                        <div style={{ color: '#fff', fontWeight: 600, marginBottom: '2px' }}>
                          👤 {customerAddress.name}
                        </div>
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
                        <div style={{ fontSize: '0.78rem', opacity: 0.9, marginTop: '2px' }}>
                          {[
                            customerAddress.buildingNo && `Bina: ${customerAddress.buildingNo}`,
                            customerAddress.floor && `Kat: ${customerAddress.floor}`,
                            customerAddress.apartmentNo && `Daire: ${customerAddress.apartmentNo}`,
                          ].filter(Boolean).join(' • ')}
                        </div>
                      )}
                      {(customerAddress.note || customerAddress.buildingNote) && (
                        <div style={{ fontSize: '0.76rem', color: '#ffd166', marginTop: '3px' }}>
                          📝 {customerAddress.note || customerAddress.buildingNote}
                        </div>
                      )}
                      {customerAddress.phone && (
                        <div style={{ fontSize: '0.76rem', opacity: 0.85, marginTop: '3px' }}>
                          <FaPhone aria-hidden="true" /> {customerAddress.phone}
                        </div>
                      )}
                    </div>
                  )}
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
                    padding: '11px 12px',
                    background: 'rgba(230, 57, 70, 0.12)',
                    border: '1.5px dashed rgba(230, 57, 70, 0.55)',
                    borderRadius: '8px',
                    color: '#ffb4a2',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>{l('addressAddPrompt')}</span>
                </button>
              )}
            </div>

            {/* ── 3. KVKK / Privacy Notice Link ── */}
            <div
              style={{
                marginBottom: '12px',
                fontSize: '0.74rem',
                color: 'var(--mist-beige)',
                lineHeight: 1.4,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '6px',
                opacity: 0.88,
              }}
            >
              <FaShieldHalved size={13} style={{ color: '#4ade80', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <span>{l('kvkkNotice')} </span>
                <button
                  type="button"
                  onClick={() => setIsKvkkOpen(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ffd166',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    padding: 0,
                    fontSize: 'inherit',
                    fontWeight: 600,
                  }}
                >
                  {l('kvkkLink')}
                </button>
              </div>
            </div>

            {/* Subtotal */}
            <div className="cart-drawer__subtotal">
              <span className="cart-drawer__subtotal-label">{l('subtotal')}</span>
              <span className="cart-drawer__subtotal-value">{formatPrice(cartSubtotal)}</span>
            </div>

            {/* WhatsApp Checkout Button */}
            <button
              type="button"
              onClick={handleCheckoutClick}
              className="cart-drawer__checkout"
              style={{
                width: '100%',
                cursor: 'pointer',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
                padding: '12px 14px',
                borderRadius: '8px',
                background: '#25D366',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.95rem',
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)',
              }}
            >
              <span>{l('checkout')}</span>
              {!selectedBranch ? (
                <span style={{ fontSize: '0.72rem', opacity: 0.95, color: '#fef08a' }}>
                  <FaTriangleExclamation aria-hidden="true" /> {l('branchSelectPrompt')}
                </span>
              ) : !hasSavedAddress ? (
                <span style={{ fontSize: '0.72rem', opacity: 0.95, color: '#ffccd5' }}>
                  <FaTriangleExclamation aria-hidden="true" /> {l('addressRequiredNotice')}
                </span>
              ) : (
                <span style={{ fontSize: '0.72rem', opacity: 0.95 }}>
                  <FaLocationDot style={{ color: '#4ade80' }} aria-hidden="true" /> {selectedBranch.name_tr} ({selectedBranch.phone})
                </span>
              )}
            </button>

            {!isMinDeliveryReached && (
              <p className="cart-drawer__min-notice">{l('minNotice')}</p>
            )}
          </div>
        )}
      </aside>

      {/* KVKK Modal */}
      <KVKKModal isOpen={isKvkkOpen} onClose={() => setIsKvkkOpen(false)} />
    </>
  );
}
