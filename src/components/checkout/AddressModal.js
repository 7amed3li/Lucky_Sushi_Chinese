'use client';

import { useEffect, useCallback } from 'react';
import AddressSelector from './AddressSelector';
import { useDelivery } from '@/context/DeliveryContext';
import { FaLocationDot, FaXmark, FaCheck } from 'react-icons/fa6';

export default function AddressModal({ isOpen, onClose, lang = 'tr' }) {
  const { validationState, streetDetails } = useDelivery();

  const isRtl = lang === 'ar';

  const labels = {
    title: {
      tr: 'Teslimat Adresinizi Belirleyin',
      en: 'Set Your Delivery Address',
      ar: 'تحديد عنوان التوصيل',
      ru: 'Укажите адрес доставки',
      zh: '设置您的送餐地址',
    },
    sub: {
      tr: 'Siparişinizin hangi şubemizden en hızlı ve taze ulaşacağını belirlemek için bölgenizi seçiniz.',
      en: 'Select your area to determine the fastest branch delivery for your order.',
      ar: 'اختر منطقتك لتحديد أقرب فرع يضمن وصول وجبتك طازجة وسريعة.',
      ru: 'Выберите ваш район для максимально быстрой доставки свежих блюд.',
      zh: '请选择您的区域，以匹配最快送达的分店。',
    },
    saveBtn: {
      tr: 'Adresi Onayla',
      en: 'Confirm Address',
      ar: 'تأكيد العنوان',
      ru: 'Подтвердить адрес',
      zh: '确认地址',
    },
    cancelBtn: {
      tr: 'Vazgeç',
      en: 'Cancel',
      ar: 'إلغاء',
      ru: 'Отмена',
      zh: '取消',
    },
  };

  const l = (key) => labels[key]?.[lang] || labels[key]?.tr || '';

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const isComplete = Boolean(
    validationState?.isValid &&
    streetDetails?.street?.trim() &&
    streetDetails?.buildingNo?.trim() &&
    streetDetails?.name?.trim() &&
    streetDetails?.phone?.trim()
  );

  return (
    <div
      className="address-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      dir={isRtl ? 'rtl' : 'ltr'}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 10001,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto',
      }}
    >
      <div
        className="address-modal-container"
        style={{
          background: '#141414',
          borderRadius: '16px',
          border: '1px solid #2a2a2a',
          boxShadow: '0 24px 50px rgba(0, 0, 0, 0.85)',
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'modalSlideUp 0.22s ease-out',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #262626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#1a1a1a',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'rgba(234, 179, 8, 0.15)',
                color: '#eab308',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <FaLocationDot size={18} />
            </div>
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: '#ffffff',
                }}
              >
                {l('title')}
              </h2>
              <p
                style={{
                  margin: '2px 0 0 0',
                  fontSize: '0.75rem',
                  color: '#a3a3a3',
                }}
              >
                {l('sub')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'none',
              border: 'none',
              color: '#a3a3a3',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FaXmark size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div
          style={{
            padding: '16px 20px',
            overflowY: 'auto',
            flex: 1,
          }}
        >
          <AddressSelector lang={lang} isRtl={isRtl} />
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '14px 20px',
            borderTop: '1px solid #262626',
            background: '#171717',
            display: 'flex',
            gap: '10px',
            justifyContent: 'flex-end',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '10px 18px',
              backgroundColor: '#262626',
              border: '1px solid #3b3b3b',
              borderRadius: '8px',
              color: '#d4d4d4',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {l('cancelBtn')}
          </button>

          <button
            type="button"
            onClick={onClose}
            disabled={!isComplete}
            style={{
              padding: '10px 22px',
              backgroundColor: isComplete ? '#22c55e' : '#333333',
              border: 'none',
              borderRadius: '8px',
              color: isComplete ? '#000000' : '#737373',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: isComplete ? 'pointer' : 'not-allowed',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease',
            }}
          >
            <FaCheck size={13} />
            <span>{l('saveBtn')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
