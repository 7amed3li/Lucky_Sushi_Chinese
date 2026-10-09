'use client';

import { FaShieldHalved, FaXmark, FaTriangleExclamation } from 'react-icons/fa6';
import { useLang } from '@/context/LangContext';

export default function KVKKModal({ isOpen, onClose }) {
  const { lang } = useLang();
  if (!isOpen) return null;

  const isRtl = lang === 'ar';

  return (
    <div
      className="kvkk-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      dir={isRtl ? 'rtl' : 'ltr'}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 13, 19, 0.82)',
        backdropFilter: 'blur(8px)',
        zIndex: 11000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        style={{
          background: 'var(--color-surface, #FFFCF7)',
          borderRadius: '16px',
          border: '1px solid var(--color-border, #D8CEC0)',
          boxShadow: '0 24px 48px rgba(22, 20, 26, 0.25)',
          width: '100%',
          maxWidth: '620px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          color: 'var(--color-text-primary, #17151A)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--color-border, #D8CEC0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--color-surface-secondary, #EEE7DC)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaShieldHalved style={{ color: 'var(--color-brand-primary, #287A3F)' }} size={18} />
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontFamily: isRtl ? 'var(--font-ar-serif, serif)' : 'var(--font-serif, serif)', color: 'var(--color-text-primary, #17151A)' }}>
              {lang === 'ar' ? 'إشعار الخصوصية والطلب (KVKK)' : lang === 'tr' ? 'Gizlilik & KVKK Aydınlatma Metni' : 'Privacy & Order Notice (KVKK)'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(23, 21, 26, 0.06)',
              border: '1px solid var(--color-border, #D8CEC0)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-primary, #17151A)',
              cursor: 'pointer',
            }}
          >
            <FaXmark size={16} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '18px 20px', overflowY: 'auto', fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--color-text-secondary, #625B57)', background: 'var(--color-surface, #FFFCF7)' }}>
          <div
            style={{
              background: 'rgba(165, 58, 50, 0.08)',
              border: '1px solid rgba(165, 58, 50, 0.28)',
              borderRadius: '8px',
              padding: '10px 12px',
              marginBottom: '14px',
              display: 'flex',
              gap: '8px',
              fontSize: '0.8rem',
              color: '#8E2822',
            }}
          >
            <FaTriangleExclamation size={14} style={{ flexShrink: 0, marginTop: '2px', color: '#A53A32' }} />
            <span>
              <strong>TODO (Taslak Metin):</strong> Şirket ticari unvanı ve MERSİS bilgileri restoran sahibi tarafından teyit edilecektir.
            </span>
          </div>

          <p style={{ color: 'var(--color-text-primary, #17151A)' }}>
            <strong>Lucky Sushi & Chinese</strong> olarak kişisel verilerinizi 6698 sayılı KVKK kapsamında yalnızca siparişinizin hazırlanması, kurye ile doğru adrese ulaştırılması ve WhatsApp üzerinden seçtiğiniz şubeye iletilmesi amacıyla işlemekteyiz.
          </p>

          <p style={{ marginTop: '10px' }}>
            <strong style={{ color: 'var(--color-text-primary, #17151A)' }}>Toplanan Bilgiler:</strong>
            <br />
            • Ad Soyad (Teslim alacak kişi)
            <br />
            • Telefon Numarası (Kurye irtibatı)
            <br />
            • Teslimat Adresi (İlçe, Mahalle, Sokak, Bina/Kat/Daire)
            <br />
            • Sipariş ve adres notları
          </p>

          <p style={{ marginTop: '10px' }}>
            Verileriniz üçüncü taraflarla reklam veya pazarlama amacıyla paylaşılmaz. Siparişi tamamlayarak WhatsApp mesajı gönderdiğinizde, bu verilerin sipariş teslimatı amacıyla işlenmesini kabul etmiş sayılırsınız.
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '12px 20px',
            borderTop: '1px solid var(--color-border, #D8CEC0)',
            display: 'flex',
            justifyContent: 'flex-end',
            background: 'var(--color-surface-secondary, #EEE7DC)',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'var(--color-brand-primary, #287A3F)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 20px',
              fontWeight: 700,
              fontSize: '0.86rem',
              cursor: 'pointer',
            }}
          >
            {lang === 'ar' ? 'فهمت' : lang === 'tr' ? 'Anladım' : 'I Understand'}
          </button>
        </div>
      </div>
    </div>
  );
}
