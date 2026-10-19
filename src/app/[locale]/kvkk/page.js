'use client';

import Header from '@/components/Header';
import { Link } from '@/i18n/navigation';
import { useLang } from '@/context/LangContext';
import { FaShieldHalved, FaArrowLeft } from 'react-icons/fa6';
import { restaurantInfo } from '@/data/menuData';

export default function KVKKPage() {
  const { lang } = useLang();
  const isRtl = lang === 'ar';

  const content = {
    tr: {
      back: 'Ana Sayfaya Dön',
      title: 'Kişisel Verilerin Korunması ve Gizlilik Bildirimi (KVKK)',
      updated: 'Son Güncelleme: Ekim 2026',
      s1_title: '1. Veri Sorumlusu',
      s1_text: '6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, Lucky Sushi & Chinese olarak sipariş ve teslimat süreçlerinde bizimle paylaştığınız kişisel verilerinizi özenle ve güvenle koruyoruz.',
      s1_address: 'Adres: Alibeyköy, Çırçır Cd. 25 A, 34060 Eyüpsultan/İstanbul',
      s2_title: '2. Hangi Kişisel Verileri Topluyoruz?',
      s2_intro: 'Sadece siparişinizin hazırlanması ve adresinize teslim edilmesi için zorunlu olan minimum verileri topluyoruz:',
      s2_items: [
        'Kimlik Bilgisi: Ad ve Soyad (Siparişi teslim alacak kişi).',
        'İletişim Bilgisi: Telefon Numarası (Kurye irtibatı ve sipariş teyidi için).',
        'Teslimat Lokasyon Bilgisi: İlçe, Mahalle, Cadde/Sokak, Bina No, Kat, Daire No ve Adres Notu.',
        'Sipariş İçeriği: Seçilen ürünler, miktar ve sipariş tercihleri.',
      ],
      s3_title: '3. Verilerin İşlenme Amacı ve Güvenliği',
      s3_intro: 'Toplanan verileriniz yalnızca;',
      s3_items: [
        'Yemek siparişinizin mutfakta doğru şekilde hazırlanması,',
        'Kurye aracılığıyla belirtilen teslimat adresine zamanında ulaştırılması,',
        'Sipariş detaylarının WhatsApp iletişim kanalı üzerinden seçtiğiniz şubemize doğrudan iletilmesi,',
      ],
      s3_outro: 'amaçlarıyla işlenir. Verileriniz reklam amacıyla üçüncü taraflarla kesinlikle paylaşılmaz ve satılmaz.',
      s4_title: '4. WhatsApp Üzerinden Sipariş İletimi',
      s4_text: 'Web sitemizde oluşturduğunuz sipariş özeti, kullanım kolaylığı sağlamak amacıyla WhatsApp mesajı formatına dönüştürülerek doğrudan seçtiğiniz şubemizin resmi işletme hattına iletilir. Bu süreçte WhatsApp kullanım ve gizlilik koşulları geçerlidir.',
      s5_title: '5. KVKK Madde 11 Kapsamındaki Haklarınız',
      s5_text: 'KVKK\'nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, silinmesini veya düzeltilmesini isteme haklarına sahipsiniz. Başvurularınız için şubelerimizle veya resmi telefon hatlarımızla irtibata geçebilirsiniz.',
    },
    en: {
      back: 'Back to Home',
      title: 'Privacy & Personal Data Protection Notice (KVKK)',
      updated: 'Last Updated: October 2026',
      s1_title: '1. Data Controller',
      s1_text: 'In accordance with Law No. 6698 on the Protection of Personal Data ("KVKK"), Lucky Sushi & Chinese carefully safeguards your personal data shared during order and delivery processes.',
      s1_address: 'Address: Alibeyköy, Çırçır Cd. 25 A, 34060 Eyüpsultan/Istanbul',
      s2_title: '2. Personal Data We Collect',
      s2_intro: 'We only collect the minimum information necessary to prepare and deliver your order:',
      s2_items: [
        'Identity Data: Full Name (recipient of the order).',
        'Contact Data: Phone Number (for delivery coordination and order confirmation).',
        'Delivery Address: District, Neighborhood, Street, Building/Apt Number, and Delivery Notes.',
        'Order Details: Selected menu items, quantities, and culinary preferences.',
      ],
      s3_title: '3. Purpose of Processing & Data Security',
      s3_intro: 'Your data is processed strictly for:',
      s3_items: [
        'Accurate preparation of your food order in our kitchen,',
        'Timely courier delivery to your specified address,',
        'Direct WhatsApp transmission of order items to your chosen branch,',
      ],
      s3_outro: 'Your information is never sold or shared with third parties for marketing or advertising purposes.',
      s4_title: '4. Order Transmission via WhatsApp',
      s4_text: 'For your convenience, your selected cart and delivery details are formatted into a WhatsApp message directly routed to the official branch line. Standard WhatsApp privacy terms apply during this exchange.',
      s5_title: '5. Your Rights Under Data Protection Law',
      s5_text: 'Under Article 11 of the KVKK, you have the right to inquire about your data, request corrections, or request deletion at any time by contacting our official branch phone lines.',
    },
    ar: {
      back: 'العودة للرئيسية',
      title: 'إشعار الخصوصية وحماية البيانات الشخصية (KVKK)',
      updated: 'آخر تحديث: أكتوبر 2026',
      s1_title: '1. الجهة المسؤولة عن البيانات',
      s1_text: 'وفقاً للقانون التركي رقم 6698 بشأن حماية البيانات الشخصية ("KVKK")، نلتزم في لاكي سوشي صيني بحماية بياناتكم الشخصية التي تشاركونها معنا أثناء إتمام وتوصيل الطلبات بكل أمان وخصوصية.',
      s1_address: 'العنوان: أليبي كوي، شارع تشيرتشير 25 أ، 34060 أيوب سلطان/إسطنبول',
      s2_title: '2. البيانات التي نقوم بجمعها',
      s2_intro: 'نقوم بجمع الحد الأدنى الضروري من البيانات فقط لإعداد طلبك وإيصاله إلى عنوانك:',
      s2_items: [
        'بيانات الهوية: الاسم واللقب (اسم مستلم الطلب).',
        'بيانات الاتصال: رقم الهاتف (للتواصل مع السائق وتأكيد الطلب).',
        'بيانات التوصيل: الحي، الشارع، رقم المبنى والشقة، وأي ملاحظات تفصيلية للعنوان.',
        'تفاصيل الطلب: الأصناف المختارة والكميات وتفضيلات الوجبات.',
      ],
      s3_title: '3. الغرض من معالجة البيانات وأمانها',
      s3_intro: 'تُعالج البيانات حصرياً من أجل:',
      s3_items: [
        'تحضير طلب الطعام في المطبخ بالدقة المطلوبة،',
        'إيصال الطلب عبر مندوب التوصيل إلى العنوان المحدد في أسرع وقت،',
        'إرسال تفاصيل الطلب مباشرة عبر الواتساب إلى الفرع الذي تم اختياره،',
      ],
      s3_outro: 'لا يتم إطلاقاً مشاركة أو بيع بياناتكم لأي أطراف ثالثة لأغراض إعلانية أو ترويجية.',
      s4_title: '4. إرسال الطلبات عبر تطبيق واتساب',
      s4_text: 'لتسهيل التجربة، يتم تحويل سلة الطلبات وعنوانك إلى رسالة واتساب منسقة تُرسل مباشرة للرقم المعتمد للفرع. تسري شروط وسياسة خصوصية واتساب أثناء هذا الإرسال.',
      s5_title: '5. حقوقك بموجب قانون حماية البيانات (KVKK)',
      s5_text: 'يحق لك في أي وقت الاستفسار عن بياناتك الشخصية أو طلب تعديلها أو حذفها بالتواصل المباشر مع فروعنا أو عبر أرقام هواتفنا الرسمية.',
    },
  };

  const c = content[lang] || content.en || content.tr;

  return (
    <>
      <Header />
      <main
        style={{
          background: 'var(--color-background, #F6F1E8)',
          minHeight: '100vh',
          padding: 'var(--sp-10, 40px) var(--page-pad, 20px) var(--sp-12, 60px)',
        }}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="container" style={{ maxWidth: '840px', margin: '0 auto' }}>
          
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '24px',
              color: 'var(--color-text-secondary)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            <FaArrowLeft size={13} style={{ transform: isRtl ? 'rotate(180deg)' : 'none' }} />
            <span>{c.back}</span>
          </Link>

          {/* Legal Document Card */}
          <article
            style={{
              background: 'var(--color-surface, #FFFFFF)',
              borderRadius: '16px',
              padding: 'clamp(20px, 4vw, 36px)',
              border: '1px solid var(--color-border, #E6DEC9)',
              boxShadow: 'var(--shadow-sm, 0 4px 12px rgba(0,0,0,0.06))',
              color: 'var(--color-text-primary, #16141A)',
              lineHeight: 1.7,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'rgba(45, 106, 79, 0.1)',
                  color: 'var(--color-brand-primary, #2D6A4F)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  flexShrink: 0,
                }}
              >
                <FaShieldHalved />
              </div>
              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.4rem, 3.2vw, 1.85rem)',
                  margin: 0,
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.3,
                }}
              >
                {c.title}
              </h1>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
              {c.updated}
            </p>

            <section style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.15rem', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                {c.s1_title}
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', margin: '0 0 6px 0' }}>
                {c.s1_text}
              </p>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-accent, #B07D4F)', margin: 0, fontWeight: 600 }}>
                {c.s1_address}
              </p>
            </section>

            <section style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.15rem', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                {c.s2_title}
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                {c.s2_intro}
              </p>
              <ul style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', paddingInlineStart: '24px', margin: 0 }}>
                {c.s2_items.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>{item}</li>
                ))}
              </ul>
            </section>

            <section style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.15rem', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                {c.s3_title}
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                {c.s3_intro}
              </p>
              <ul style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', paddingInlineStart: '24px', margin: 0 }}>
                {c.s3_items.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>{item}</li>
                ))}
              </ul>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', marginTop: '8px', marginBottom: 0 }}>
                {c.s3_outro}
              </p>
            </section>

            <section style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.15rem', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                {c.s4_title}
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                {c.s4_text}
              </p>
            </section>

            <section style={{ marginBottom: '10px' }}>
              <h2 style={{ fontSize: '1.15rem', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                {c.s5_title}
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                {c.s5_text}
              </p>
            </section>

          </article>
        </div>
      </main>
    </>
  );
}
