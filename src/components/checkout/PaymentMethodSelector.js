'use client';

import { FaMoneyBillWave, FaCreditCard, FaLock, FaCheck } from 'react-icons/fa6';

export default function PaymentMethodSelector({ lang = 'tr', isRtl = false }) {
  const labels = {
    title: {
      tr: 'Ödeme Yöntemi',
      en: 'Payment Method',
      ar: 'طريقة الدفع',
      ru: 'Способ оплаты',
      zh: '支付方式',
    },
    cashTitle: {
      tr: 'Kapıda Nakit Ödeme',
      en: 'Cash on Delivery',
      ar: 'الدفع نقدًا عند الاستلام',
      ru: 'Оплата наличными при получении',
      zh: '货到现金付款',
    },
    cashDesc: {
      tr: 'Siparişinizi teslim alırken kuryemize güvenle nakit olarak ödeyebilirsiniz.',
      en: 'Pay securely in cash directly to our courier upon order arrival.',
      ar: 'ادفع نقدًا بأمان ومباشرة لسائق التوصيل عند استلام وجبتك.',
      ru: 'Оплатите заказ наличными курьеру при получении.',
      zh: '餐品送达时直接向配送员当面支付现金。',
    },
    cardTitle: {
      tr: 'Online Kredi Kartı',
      en: 'Online Card Payment',
      ar: 'الدفع الإلكتروني بالبطاقة',
      ru: 'Оплата картой онлайн',
      zh: '在线刷卡支付',
    },
    comingSoonBadge: {
      tr: 'Çok Yakında',
      en: 'Coming Soon',
      ar: 'قريبًا جدًا',
      ru: 'Скоро',
      zh: '即将上线',
    },
    cardDesc: {
      tr: 'Online kartla ödeme altyapımız yakında aktif edilecektir.',
      en: 'Online card payment gateway will be enabled soon.',
      ar: 'بوابة الدفع الإلكتروني ستكون متاحة قريباً.',
      ru: 'Онлайн-оплата картой станет доступна в ближайшее время.',
      zh: '线上银行卡支付通道即将开通。',
    },
  };

  const l = (key) => labels[key]?.[lang] || labels[key]?.tr || '';

  return (
    <div
      className="payment-method-selector"
      style={{
        marginTop: '1rem',
        marginBottom: '1rem',
        textAlign: isRtl ? 'right' : 'left',
      }}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.6rem',
        }}
      >
        <span
          style={{
            fontSize: '0.82rem',
            fontWeight: 700,
            color: '#a3a3a3',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {l('title')}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {/* Cash On Delivery (Active) */}
        <div
          role="radio"
          aria-checked="true"
          tabIndex={0}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.85rem',
            padding: '0.85rem 1rem',
            backgroundColor: 'rgba(34, 197, 94, 0.06)',
            border: '1.5px solid #22c55e',
            borderRadius: '10px',
            position: 'relative',
            cursor: 'default',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: 'rgba(34, 197, 94, 0.15)',
              color: '#22c55e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <FaMoneyBillWave size={18} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap',
                marginBottom: '0.2rem',
              }}
            >
              <span style={{ fontWeight: 600, color: '#f5f5f5', fontSize: '0.92rem' }}>
                {l('cashTitle')}
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  backgroundColor: 'rgba(34, 197, 94, 0.2)',
                  color: '#4ade80',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '4px',
                }}
              >
                <FaCheck size={10} /> Aktif / Active
              </span>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: '0.78rem',
                color: '#a3a3a3',
                lineHeight: 1.4,
              }}
            >
              {l('cashDesc')}
            </p>
          </div>
        </div>

        {/* Card Payment (Disabled / Coming Soon) */}
        <div
          role="radio"
          aria-checked="false"
          aria-disabled="true"
          tabIndex={-1}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.85rem',
            padding: '0.85rem 1rem',
            backgroundColor: '#171717',
            border: '1px dashed #333333',
            borderRadius: '10px',
            opacity: 0.65,
            cursor: 'not-allowed',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#262626',
              color: '#737373',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <FaCreditCard size={17} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap',
                marginBottom: '0.2rem',
              }}
            >
              <span style={{ fontWeight: 500, color: '#737373', fontSize: '0.92rem' }}>
                {l('cardTitle')}
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  backgroundColor: '#262626',
                  color: '#eab308',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '4px',
                  border: '1px solid rgba(234, 179, 8, 0.25)',
                }}
              >
                <FaLock size={9} /> {l('comingSoonBadge')}
              </span>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: '0.78rem',
                color: '#525252',
                lineHeight: 1.4,
              }}
            >
              {l('cardDesc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
