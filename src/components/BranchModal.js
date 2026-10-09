'use client';

import Image from 'next/image';
import { useEffect, useCallback } from 'react';
import { useBranch } from '@/context/BranchContext';
import { useLang } from '@/context/LangContext';
import { 
  FaUtensils, FaMotorcycle, FaKitchenSet, FaClock, 
  FaLocationDot, FaPhone, FaCheck, FaXmark, FaCircleInfo
} from 'react-icons/fa6';

export default function BranchModal() {
  const { branches, selectedBranchId, selectBranch, isBranchModalOpen, closeBranchModal } = useBranch();
  const { lang } = useLang();

  const labels = {
    modalTitle: {
      tr: 'Sipariş Vereceğiniz Şubeyi Seçin',
      en: 'Select Your Ordering Branch',
      ar: 'اختر الفرع لتقديم الطلب',
      ru: 'Выберите филиал для заказа',
      zh: '请选择您的点餐分店',
    },
    modalSub: {
      tr: 'Siparişinizin en hızlı ve taze şekilde ulaşması için size en yakın şubeyi seçiniz.',
      en: 'Please select your nearest branch for the fastest preparation and delivery.',
      ar: 'يرجى اختيار الفرع الأقرب إليك لضمان سرعة التجهيز والتوصيل الطازج.',
      ru: 'Выберите ближайший филиал для максимально быстрой доставки.',
      zh: '请选择离您最近的分店，以确保最快的外送与最新鲜的品质。',
    },
    selectedBadge: {
      tr: 'Seçili Şube',
      en: 'Selected',
      ar: 'الفرع المختار',
      ru: 'Выбрано',
      zh: '已选择',
    },
    selectBtn: {
      tr: 'Bu Şubeden Sipariş Ver',
      en: 'Order From This Branch',
      ar: 'اطلب من هذا الفرع',
      ru: 'Заказать из этого филиала',
      zh: '从此分店点餐',
    },
    deliveryOnlyNotice: {
      tr: 'Sadece paket servis mutfağıdır; oturma ve masa servisi yoktur.',
      en: 'Delivery kitchen only; no dine-in seating.',
      ar: 'مطبخ توصيل فقط؛ لا توجد صالة للجلوس.',
      ru: 'Только доставка; зал обслуживания отсутствует.',
      zh: '仅限外送厨房，不设堂食。',
    },
    coverageLabel: {
      tr: 'Teslimat Bölgesi:',
      en: 'Delivery Areas:',
      ar: 'مناطق التغطية والتوصيل:',
      ru: 'Зона доставки:',
      zh: '配送区域:',
    },
    hoursLabel: {
      tr: 'Çalışma Saatleri:',
      en: 'Hours:',
      ar: 'أوقات العمل:',
      ru: 'Часы работы:',
      zh: '营业时间:',
    },
  };

  const l = (key) => labels[key]?.[lang] || labels[key]?.tr || '';

  // Close on Escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') closeBranchModal();
  }, [closeBranchModal]);

  useEffect(() => {
    if (isBranchModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isBranchModalOpen, handleKeyDown]);

  if (!isBranchModalOpen) return null;

  const isRtl = lang === 'ar';

  return (
    <div
      className="branch-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeBranchModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="branch-modal-title"
      dir={isRtl ? 'rtl' : 'ltr'}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 13, 19, 0.82)',
        backdropFilter: 'blur(8px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto',
      }}
    >
      <div
        className="branch-modal-container"
        style={{
          background: 'var(--color-surface, #FFFCF7)',
          borderRadius: '16px',
          border: '1px solid var(--color-border, #D8CEC0)',
          boxShadow: '0 24px 48px rgba(22, 20, 26, 0.25)',
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'modalSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '18px 22px',
            borderBottom: '1px solid var(--color-border, #D8CEC0)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '12px',
            background: 'var(--color-surface-secondary, #EEE7DC)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <FaLocationDot size={18} aria-hidden="true" />
              <h2
                id="branch-modal-title"
                style={{
                  fontFamily: isRtl ? 'var(--font-ar-serif, serif)' : 'var(--font-serif, serif)',
                  fontSize: 'clamp(1.15rem, 3vw, 1.35rem)',
                  fontWeight: 700,
                  color: 'var(--color-text-primary, #17151A)',
                  margin: 0,
                }}
              >
                {l('modalTitle')}
              </h2>
            </div>
            <p
              style={{
                fontSize: '0.86rem',
                color: 'var(--color-text-secondary, #625B57)',
                margin: 0,
                lineHeight: 1.45,
              }}
            >
              {l('modalSub')}
            </p>
          </div>

          <button
            type="button"
            onClick={closeBranchModal}
            aria-label="Close branch selector"
            style={{
              background: 'rgba(23, 21, 26, 0.06)',
              border: '1px solid var(--color-border, #D8CEC0)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-primary, #17151A)',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'background 0.15s ease',
            }}
          >
            <FaXmark size={16} />
          </button>
        </div>

        {/* Modal Body: 3 Branch Cards */}
        <div
          style={{
            padding: '18px 20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            background: 'var(--color-surface, #FFFCF7)',
          }}
        >
          {branches.map((branch) => {
            const isSelected = selectedBranchId === branch.id;
            const branchName = branch[`name_${lang}`] || branch.name_tr || branch.id;
            const branchBadge = branch[`badge_${lang}`] || branch.badge_tr;
            const branchCoverage = branch[`coverage_${lang}`] || branch.coverage_tr;
            const branchHours = branch[`hours_${lang}`] || branch.hours_tr;
            const branchAddress = branch[`address_${lang}`] || branch.address;

            // Type theme
            const isDeliveryOnly = branch.type === 'delivery-only';
            const isPickupOnly = branch.type === 'pickup-delivery';

            let typeIcon = <FaUtensils size={13} />;
            let badgeBg = 'rgba(40, 122, 63, 0.12)';
            let badgeColor = '#1F6333';
            let badgeBorder = 'rgba(40, 122, 63, 0.25)';

            if (isPickupOnly) {
              typeIcon = <FaMotorcycle size={13} />;
              badgeBg = 'rgba(217, 119, 6, 0.12)';
              badgeColor = '#92400E';
              badgeBorder = 'rgba(217, 119, 6, 0.25)';
            } else if (isDeliveryOnly) {
              typeIcon = <FaKitchenSet size={13} />;
              badgeBg = 'rgba(165, 58, 50, 0.12)';
              badgeColor = '#991B1B';
              badgeBorder = 'rgba(165, 58, 50, 0.25)';
            }

            return (
              <div
                key={branch.id}
                onClick={() => selectBranch(branch.id)}
                style={{
                  background: isSelected ? 'rgba(40, 122, 63, 0.05)' : '#FFFFFF',
                  border: isSelected
                    ? '2px solid var(--color-brand-primary, #287A3F)'
                    : '1px solid var(--color-border, #D8CEC0)',
                  borderRadius: '12px',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  boxShadow: isSelected ? '0 4px 14px rgba(40, 122, 63, 0.12)' : '0 2px 6px rgba(0, 0, 0, 0.04)',
                }}
              >
                {/* Top Row: Name, Badge, Selection Indicator */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        background: isSelected ? 'var(--color-brand-primary, #287A3F)' : 'var(--color-surface-secondary, #EEE7DC)',
                        color: isSelected ? '#FFFFFF' : 'var(--color-text-primary, #17151A)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        flexShrink: 0,
                        border: isSelected ? 'none' : '1px solid var(--color-border, #D8CEC0)',
                      }}
                    >
                      {isSelected ? <FaCheck size={13} /> : branch.name_tr[0]}
                    </span>
                    <h3
                      style={{
                        fontSize: '1.08rem',
                        fontWeight: 700,
                        color: 'var(--color-text-primary, #17151A)',
                        margin: 0,
                      }}
                    >
                      {branchName}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: badgeBg,
                        color: badgeColor,
                        border: `1px solid ${badgeBorder}`,
                        padding: '4px 10px',
                        borderRadius: '16px',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                      }}
                    >
                      {typeIcon}
                      <span>{branchBadge}</span>
                    </span>

                    {isSelected && (
                      <span
                        style={{
                          background: 'var(--color-brand-primary, #287A3F)',
                          color: '#FFFFFF',
                          padding: '3px 9px',
                          borderRadius: '12px',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        ✓ {l('selectedBadge')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Delivery Only Warning for Reşitpaşa */}
                {isDeliveryOnly && (
                  <div
                    style={{
                      background: 'rgba(165, 58, 50, 0.08)',
                      border: '1px solid rgba(165, 58, 50, 0.28)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.8rem',
                      color: '#8E2822',
                      fontWeight: 600,
                    }}
                  >
                    <FaCircleInfo size={14} style={{ flexShrink: 0, color: '#A53A32' }} />
                    <span>{l('deliveryOnlyNotice')}</span>
                  </div>
                )}

                {/* Address & Hours Details */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '10px',
                    fontSize: '0.84rem',
                    color: 'var(--color-text-secondary, #625B57)',
                    background: 'var(--color-background, #F6F1E8)',
                    padding: '10px 12px',
                    borderRadius: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <FaLocationDot size={14} style={{ marginTop: '2px', color: 'var(--color-accent, #A53A32)', flexShrink: 0 }} />
                    <div>
                      <strong style={{ color: 'var(--color-text-primary, #17151A)' }}>{branchAddress}</strong>
                      {branchCoverage && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary, #625B57)', marginTop: '2px' }}>
                          <span style={{ fontWeight: 700, color: '#92400E' }}>{l('coverageLabel')}</span> {branchCoverage}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <FaClock size={14} style={{ marginTop: '2px', color: 'var(--color-brand-primary, #287A3F)', flexShrink: 0 }} />
                    <div>
                      <span style={{ color: 'var(--color-brand-primary, #287A3F)', fontWeight: 700 }}>{branchHours}</span>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-primary, #17151A)', marginTop: '2px', fontWeight: 600 }}>
                        <FaPhone size={12} aria-hidden="true" /> {branch.phone}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Select Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      selectBranch(branch.id);
                    }}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '8px',
                      border: isSelected ? 'none' : '1px solid var(--color-border, #D8CEC0)',
                      background: isSelected ? 'var(--color-brand-primary, #287A3F)' : 'var(--color-surface-secondary, #EEE7DC)',
                      color: isSelected ? '#FFFFFF' : 'var(--color-text-primary, #17151A)',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>{isSelected ? `✓ ${l('selectedBadge')}` : l('selectBtn')}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
