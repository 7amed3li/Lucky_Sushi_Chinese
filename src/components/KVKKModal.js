'use client';

import { FaShieldHalved, FaXmark } from 'react-icons/fa6';
import { useLang } from '@/context/LangContext';

export default function KVKKModal({ isOpen, onClose }) {
  const { lang } = useLang();
  if (!isOpen) return null;

  const isRtl = lang === 'ar';

  const modalContent = {
    tr: {
      title: 'Gizlilik ve Sipariş Verileri Aydınlatma Metni (KVKK)',
      p1: 'Lucky Sushi & Chinese olarak kişisel verilerinizi 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında yalnızca siparişinizin mutfakta hazırlanması, kurye ile adresinize ulaştırılması ve seçtiğiniz şubemize WhatsApp üzerinden güvenle iletilmesi amacıyla işlemekteyiz.',
      dataTitle: 'Toplanan Sipariş Bilgileri:',
      items: [
        'Ad Soyad (Siparişi teslim alacak kişi)',
        'Telefon Numarası (Kurye irtibatı ve sipariş teyidi)',
        'Teslimat Adresi (İlçe, Mahalle, Sokak, Bina No, Kat ve Daire No)',
        'Sipariş İçeriği ve Adres Notları',
      ],
      p2: 'Toplanan verileriniz hiçbir surette üçüncü taraflara ticari reklam veya pazarlama amacıyla aktarılmaz veya satılmaz. Siparişinizi tamamlayarak WhatsApp mesajı gönderdiğinizde, bu verilerin sipariş teslimatı amacıyla işlenmesini kabul etmiş sayılırsınız.',
      btn: 'Anladım',
    },
    en: {
      title: 'Privacy & Personal Data Protection Notice (KVKK)',
      p1: 'At Lucky Sushi & Chinese, in compliance with Turkish Law No. 6698 on the Protection of Personal Data (KVKK), we process your personal data strictly for kitchen food preparation, courier delivery to your address, and direct routing to your selected branch via WhatsApp.',
      dataTitle: 'Order Information Collected:',
      items: [
        'Full Name (Recipient of the order)',
        'Phone Number (Courier coordination and order updates)',
        'Delivery Address (District, Neighborhood, Street, Building, Floor & Apt)',
        'Order Contents & Delivery Notes',
      ],
      p2: 'Your data is never shared with or sold to third parties for commercial advertising or marketing purposes. By placing your order and sending the WhatsApp message, you consent to the processing of this data for delivery fulfillment.',
      btn: 'I Understand',
    },
    ar: {
      title: 'إشعار الخصوصية وحماية بيانات الطلب (KVKK)',
      p1: 'نلتزم في لاكي سوشي صيني (Lucky Sushi & Chinese) بموجب قانون حماية البيانات الشخصية التركي رقم 6698 (KVKK) بمعالجة بياناتكم الشخصية حصرياً لغرض تحضير الطلب في المطبخ، وتوصيله بواسطة السائق إلى عنوانكم بدقة، وإرساله للفرع المختار عبر واتساب.',
      dataTitle: 'البيانات التي تُجمع لإتمام الطلب:',
      items: [
        'الاسم واللقب (مستلم الطلب)',
        'رقم الهاتف (للتنسيق مع سائق التوصيل وتأكيد الطلب)',
        'عنوان التوصيل (الحي، الشارع، رقم المبنى، الطابق، ورقم الشقة)',
        'محتوى الطلب وملاحظات العنوان',
      ],
      p2: 'لا يتم إطلاقاً بيع أو مشاركة بياناتكم مع أي أطراف ثالثة لأغراض دعائية أو تسويقية. بإتمامك للطلب وإرسال رسالة الواتساب، فإنك توافق على معالجة هذه البيانات لغرض تنفيذ وتوصيل طلبك.',
      btn: 'فهمت ذلك',
    },
    ru: {
      title: 'Уведомление о конфиденциальности и обработке данных (KVKK)',
      p1: 'В Lucky Sushi & Chinese в соответствии с Законом Турции № 6698 о защите персональных данных (KVKK) мы обрабатываем ваши данные исключительно для приготовления блюд, курьерской доставки по адресу и связи с выбранным филиалом через WhatsApp.',
      dataTitle: 'Собираемые данные для заказа:',
      items: [
        'Имя и фамилия (Получатель заказа)',
        'Номер телефона (Для связи с курьером и подтверждения)',
        'Адрес доставки (Район, улица, дом, этаж, квартира)',
        'Содержимое заказа и примечания к адресу',
      ],
      p2: 'Ваши данные никогда не продаются и не передаются третьим лицам в маркетинговых целях. Оформляя заказ и отправляя сообщение в WhatsApp, вы подтверждаете согласие на обработку данных для доставки заказа.',
      btn: 'Понятно',
    },
    zh: {
      title: '隐私保护与订单个人信息告知书 (KVKK)',
      p1: '在 Lucky Sushi & Chinese，根据土耳其第6698号《个人数据保护法》(KVKK)，我们仅为了厨房制作美馔、骑手准时配送至您的地址以及通过 WhatsApp 顺畅发送至所选分店而处理您的必要信息。',
      dataTitle: '订餐所收集的信息：',
      items: [
        '姓名 (订餐收货人)',
        '联系电话 (配送骑手沟通与订单确认)',
        '配送地址 (区、街区、街道、门牌号、楼层与房号)',
        '订单菜品详情与地址备注',
      ],
      p2: '我们绝不会将您的个人信息出售或共享给任何第三方用于商业营销。当您完成点餐并通过 WhatsApp 发送消息时，即代表您同意我们为履约配送而处理上述数据。',
      btn: '我已了解',
    },
  };

  const c = modalContent[lang] || modalContent.en || modalContent.tr;

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
            <h3 style={{ margin: 0, fontSize: '1.02rem', fontFamily: isRtl ? 'var(--font-ar-serif, serif)' : 'var(--font-serif, serif)', color: 'var(--color-text-primary, #17151A)' }}>
              {c.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
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
        <div style={{ padding: '20px 22px', overflowY: 'auto', fontSize: '0.88rem', lineHeight: 1.65, color: 'var(--color-text-secondary, #625B57)', background: 'var(--color-surface, #FFFCF7)' }}>
          <p style={{ color: 'var(--color-text-primary, #17151A)', marginTop: 0 }}>
            {c.p1}
          </p>

          <div style={{ marginTop: '14px', background: 'rgba(0, 0, 0, 0.03)', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--color-border, #E6DEC9)' }}>
            <strong style={{ color: 'var(--color-text-primary, #17151A)', display: 'block', marginBottom: '6px' }}>
              {c.dataTitle}
            </strong>
            <ul style={{ margin: 0, paddingInlineStart: '18px' }}>
              {c.items.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '4px' }}>{item}</li>
              ))}
            </ul>
          </div>

          <p style={{ marginTop: '14px', marginBottom: 0 }}>
            {c.p2}
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
              padding: '9px 24px',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
            }}
          >
            {c.btn}
          </button>
        </div>
      </div>
    </div>
  );
}
