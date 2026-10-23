'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLang } from '@/context/LangContext';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useBranch } from '@/context/BranchContext';
import { useDelivery } from '@/context/DeliveryContext';
import AddressModal from '@/components/checkout/AddressModal';
import { validateCartPrices, buildWhatsAppOrderUrl } from '@/services/orderValidationService';
import { restaurantInfo } from '@/data/menuData';
import KVKKModal from '@/components/KVKKModal';
import { FaShieldHalved, FaLocationDot, FaCircleInfo, FaRotate, FaTriangleExclamation, FaGlobe, FaPhone, FaClipboardList, FaUser, FaPen } from 'react-icons/fa6';
import { GiSushis } from 'react-icons/gi';
import SvgFlag from '@/components/SvgFlag';

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
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // Delivery Context state
  const {
    districtId,
    neighborhoodId,
    streetDetails,
    validationState,
  } = useDelivery();

  const [checkoutNotice, setCheckoutNotice] = useState('');

  const hasValidDeliveryAddress = Boolean(
    validationState?.isValid &&
    streetDetails?.street?.trim() &&
    streetDetails?.buildingNo?.trim() &&
    streetDetails?.name?.trim() &&
    streetDetails?.phone?.trim()
  );

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

  const handleCheckoutClick = (e) => {
    e.preventDefault();
    setCheckoutNotice('');

    // 1. Minimum order check (500 TL)
    if (cartSubtotal < minDeliveryTl) {
      setCheckoutNotice(
        cartLang === 'ar' ? `الحد الأدنى لطلب التوصيل هو ${formatPrice(minDeliveryTl)}` :
        cartLang === 'en' ? `Minimum delivery order is ${formatPrice(minDeliveryTl)}` :
        cartLang === 'ru' ? `Минимальная сумма доставки: ${formatPrice(minDeliveryTl)}` :
        cartLang === 'zh' ? `最低外送金额为 ${formatPrice(minDeliveryTl)}` :
        `Minimum paket servis tutarı: ${formatPrice(minDeliveryTl)}`
      );
      return;
    }

    // 2. Branch selection
    if (!selectedBranch) {
      openBranchModal();
      return;
    }

    // 3. Delivery Address validation
    if (!hasValidDeliveryAddress) {
      setIsAddressModalOpen(true);
      return;
    }

    // 5. Price freshness verification
    const { isFresh } = validateCartPrices(cart);
    if (!isFresh) {
      setCheckoutNotice(
        cartLang === 'ar' ? 'تم تحديث أسعار المنتجات في القائمة. يرجى مراجعة الإجمالي ثم إرسال الطلب.' :
        cartLang === 'en' ? 'Product prices were updated. Please review the total and order again.' :
        cartLang === 'ru' ? 'Цены меню обновились. Проверьте итоговую сумму и отправьте заказ снова.' :
        cartLang === 'zh' ? '菜单价格已更新，请确认新总额后再次下单。' :
        'Menü fiyatlarımız güncellendi. Lütfen yeni toplamı kontrol edip siparişi tekrar gönderiniz.'
      );
      return;
    }

    // 6. Build WhatsApp URL and handoff
    const deliveryAddress = {
      name: streetDetails?.name,
      phone: streetDetails?.phone,
      city: 'İstanbul',
      district: districtId,
      neighborhood: validationState?.neighborhoodName,
      street: streetDetails?.street,
      buildingNo: streetDetails?.buildingNo,
      floor: streetDetails?.floor,
      apartmentNo: streetDetails?.apartmentNo,
      note: streetDetails?.note,
    };

    const url = buildWhatsAppOrderUrl({
      branch: selectedBranch,
      cart,
      cartSubtotal,
      deliveryAddress,
      paymentMethod: 'Kapıda Nakit',
    });

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
          className="cart-drawer__banner"
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
          <FaClipboardList size={16} aria-hidden="true" />
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
              <SvgFlag code="tr" size={15} />
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
              {hasValidDeliveryAddress && (
                <div style={{
                  marginTop: '20px',
                  padding: '12px 14px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(246, 241, 232, 0.1)',
                  borderRadius: '8px',
                  textAlign: isRtl ? 'right' : 'left',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <FaLocationDot size={14} style={{ color: 'var(--color-accent, #D4A373)', flexShrink: 0 }} aria-hidden="true" />
                    <strong style={{ fontSize: '0.85rem', color: 'var(--color-brand-light)' }}>
                      {l('addressTitle')}
                    </strong>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--mist-beige)', lineHeight: 1.4 }}>
                    {streetDetails?.name && <div style={{ color: '#fff', fontWeight: 600 }}>{streetDetails.name}</div>}
                    <div>{[validationState?.neighborhoodName, districtId, 'İstanbul'].filter(Boolean).join(', ')}</div>
                    <div>{[streetDetails?.street, streetDetails?.buildingNo && `No: ${streetDetails.buildingNo}`].filter(Boolean).join(' ')}</div>
                    {streetDetails?.note && <div style={{ opacity: 0.8, fontSize: '0.76rem' }}>{streetDetails.note}</div>}
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
                    <div className="cart-item__actions">
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
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="cart-drawer__footer" style={{ paddingBottom: 'calc(20px + env(safe-area-inset-bottom, 0px))' }}>
            
            {/* ── 1. Selected Branch Indicator / Prompt ── */}
            <div className="cart-drawer__branch-section" style={{ marginBottom: '10px' }}>
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

            {/* ── 2. Compact Delivery Address Card ── */}
            <div className="cart-drawer__address-section" style={{ marginBottom: '8px' }}>
              {hasValidDeliveryAddress ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    backgroundColor: 'rgba(34, 197, 94, 0.08)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: '8px',
                    gap: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                    <FaLocationDot size={14} style={{ color: '#22c55e', flexShrink: 0 }} />
                    <div style={{ minWidth: 0, fontSize: '0.8rem', lineHeight: 1.3 }}>
                      <div style={{ fontWeight: 700, color: '#f5f5f5', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {validationState?.neighborhoodName || districtId}
                      </div>
                      <div style={{ color: '#a3a3a3', fontSize: '0.74rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {streetDetails?.street} No: {streetDetails?.buildingNo}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAddressModalOpen(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-accent, #D4A373)',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      flexShrink: 0,
                    }}
                  >
                    {l('addressEdit')}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(true)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '9px 12px',
                    backgroundColor: 'rgba(234, 179, 8, 0.12)',
                    border: '1.5px dashed rgba(234, 179, 8, 0.5)',
                    borderRadius: '8px',
                    color: '#ffd166',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  <FaLocationDot size={13} />
                  <span>{l('addressAddPrompt')}</span>
                </button>
              )}
            </div>

            {/* ── 3. Payment Method Badge ── */}
            <div
              className="cart-drawer__payment"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 10px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '6px',
                marginBottom: '8px',
                fontSize: '0.76rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f5f5f5' }}>
                <span style={{ color: '#22c55e', fontWeight: 600 }}>💵 Kapıda Nakit</span>
                <span style={{ fontSize: '0.68rem', backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '1px 5px', borderRadius: '3px' }}>Aktif</span>
              </div>
              <span style={{ color: '#737373', fontSize: '0.72rem' }}>🔒 Online Kart (Yakında)</span>
            </div>

            {/* ── 3. KVKK / Privacy Notice Link ── */}
            <div
              className="cart-drawer__privacy"
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
            <div className="cart-drawer__order-total">
              <div className="cart-drawer__subtotal" style={{ marginBottom: '6px' }}>
                <span className="cart-drawer__subtotal-label">{l('subtotal')}</span>
                <span className="cart-drawer__subtotal-value">{formatPrice(cartSubtotal)}</span>
              </div>
              <span className="cart-drawer__delivery-summary">
                {cartLang === 'ar' ? 'التوصيل مجاني' : cartLang === 'en' ? 'Free delivery' : cartLang === 'ru' ? 'Бесплатная доставка' : cartLang === 'zh' ? '免费配送' : 'Ücretsiz teslimat'}
              </span>
            </div>

            {/* Free Delivery Status Row */}
            <div
              className="cart-drawer__delivery-row"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '6px 12px',
                background: 'rgba(34, 197, 94, 0.08)',
                border: '1px solid rgba(34, 197, 94, 0.25)',
                borderRadius: '6px',
                marginBottom: '10px',
                fontSize: '0.82rem',
              }}
            >
              <span style={{ color: '#a3a3a3' }}>
                {cartLang === 'ar' ? 'رسوم التوصيل:' :
                 cartLang === 'en' ? 'Delivery Fee:' :
                 cartLang === 'ru' ? 'Стоимость доставки:' :
                 cartLang === 'zh' ? '配送费:' :
                 'Teslimat Ücreti:'}
              </span>
              <span style={{ color: '#22c55e', fontWeight: 700 }}>
                {cartLang === 'ar' ? 'مجاني (0 ₺)' :
                 cartLang === 'en' ? 'FREE (0 ₺)' :
                 cartLang === 'ru' ? 'БЕСПЛАТНО (0 ₺)' :
                 cartLang === 'zh' ? '免费 (0 ₺)' :
                 'ÜCRETSİZ (0 ₺)'}
              </span>
            </div>

            {/* Validation Notice Banner */}
            {checkoutNotice && (
              <div
                style={{
                  padding: '8px 12px',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  borderRadius: '8px',
                  marginBottom: '10px',
                  color: '#fca5a5',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  lineHeight: 1.35,
                }}
              >
                <FaTriangleExclamation size={14} style={{ flexShrink: 0, color: '#ef4444' }} />
                <span>{checkoutNotice}</span>
              </div>
            )}

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
                background: cartSubtotal < minDeliveryTl ? '#4b5563' : '#25D366',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.95rem',
                boxShadow: cartSubtotal < minDeliveryTl ? 'none' : '0 4px 12px rgba(37, 211, 102, 0.25)',
                opacity: cartSubtotal < minDeliveryTl ? 0.75 : 1,
              }}
            >
              <span>{l('checkout')}</span>
              {!selectedBranch ? (
                <span style={{ fontSize: '0.72rem', opacity: 0.95, color: '#fef08a' }}>
                  <FaTriangleExclamation aria-hidden="true" /> {l('branchSelectPrompt')}
                </span>
              ) : !hasValidDeliveryAddress ? (
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
              <p className="cart-drawer__min-notice">
                {l('minNotice')}
                <span style={{ display: 'block', fontSize: '0.76rem', color: '#eab308', marginTop: '2px' }}>
                  {cartLang === 'ar' ? `أضف بقيمة ${formatPrice(minDeliveryTl - cartSubtotal)} للوصول للحد الأدنى (500 ₺)` :
                   cartLang === 'en' ? `Add ${formatPrice(minDeliveryTl - cartSubtotal)} more to reach minimum (500 ₺)` :
                   cartLang === 'ru' ? `Добавьте еще ${formatPrice(minDeliveryTl - cartSubtotal)} до минимума (500 ₺)` :
                   cartLang === 'zh' ? `还需添加 ${formatPrice(minDeliveryTl - cartSubtotal)} 达到起送额 (500 ₺)` :
                   `Minimum 500 ₺ için ${formatPrice(minDeliveryTl - cartSubtotal)} daha ekleyin`}
                </span>
              </p>
            )}
          </div>
        )}
      </aside>

      {/* KVKK Modal */}
      <KVKKModal isOpen={isKvkkOpen} onClose={() => setIsKvkkOpen(false)} />

      {/* Delivery Address Modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        lang={cartLang}
      />
    </>
  );
}
