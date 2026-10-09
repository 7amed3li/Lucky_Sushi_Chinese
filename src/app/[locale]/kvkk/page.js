'use client';

import Header from '@/components/Header';
import { Link } from '@/i18n/navigation';
import { useLang } from '@/context/LangContext';
import { FaShieldHalved, FaArrowLeft, FaTriangleExclamation } from 'react-icons/fa6';

export default function KVKKPage() {
  const { lang } = useLang();

  const isRtl = lang === 'ar';

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
            <span>{lang === 'ar' ? 'العودة للرئيسية' : lang === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Home'}</span>
          </Link>

          {/* Warning Banner for Restaurant Owner */}
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1.5px dashed #ef4444',
              borderRadius: '12px',
              padding: '16px 20px',
              marginBottom: '28px',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start',
            }}
          >
            <FaTriangleExclamation size={20} style={{ color: '#dc2626', flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.85rem', color: '#7f1d1d', lineHeight: 1.6 }}>
              <strong>TODO (Restoran Sahibi & Hukuk Danışmanı Dikkatine):</strong>
              <br />
              Bu metin sipariş süreçlerinde toplanan teslimat verileri (Ad, Telefon, Adres, Sipariş Notu) için hazırlanmış bir taslak aydınlatma metnidir. Şirketin resmi ticari unvanı, MERSİS numarası, Vergi Dairesi ve veri sorumlusu irtibat kişisi bilgileri yayından önce eklenmelidir.
            </div>
          </div>

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
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
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
                }}
              >
                <FaShieldHalved />
              </div>
              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
                  margin: 0,
                  color: 'var(--color-text-primary)',
                }}
              >
                {lang === 'ar'
                  ? 'إشعار الخصوصية وحماية البيانات الشخصية (KVKK)'
                  : lang === 'tr'
                  ? 'Kişisel Verilerin Korunması ve Gizlilik Bildirimi (KVKK)'
                  : 'Privacy & Personal Data Protection Notice (KVKK)'}
              </h1>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
              <strong>Son Güncelleme / Last Updated:</strong> Ekim 2026
            </p>

            <section style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.15rem', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                1. Veri Sorumlusu (TODO: Resmi Şirket Bilgileri Eklenecek)
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca, <strong>Lucky Sushi & Chinese</strong> (&quot;İşletme&quot;) olarak sipariş ve teslimat süreçlerinde bizimle paylaştığınız kişisel verilerinizi özenle koruyoruz.
                <br />
                <em>(TODO: Şirket Ticari Unvanı, Adres, Vergi No ve MERSİS No eklenecektir.)</em>
              </p>
            </section>

            <section style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.15rem', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                2. Hangi Kişisel Verileri Topluyoruz?
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                Sadece siparişinizin hazırlanması ve adresinize teslim edilmesi için zorunlu olan minimum verileri topluyoruz:
              </p>
              <ul style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', paddingInlineStart: '20px', marginTop: '6px' }}>
                <li><strong>Kimlik Bilgisi:</strong> Ad ve Soyad (Siparişi teslim alacak kişi).</li>
                <li><strong>İletişim Bilgisi:</strong> Telefon Numarası (Kurye irtibatı ve sipariş teyidi için).</li>
                <li><strong>Teslimat Lokasyon Bilgisi:</strong> İlçe, Mahalle, Cadde/Sokak, Bina No, Kat, Daire No ve Adres Notu.</li>
                <li><strong>Sipariş İçeriği:</strong> Seçilen ürünler, miktar ve sipariş tercihleri.</li>
              </ul>
            </section>

            <section style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.15rem', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                3. Verilerin İşlenme Amacı ve Aktarımı
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                Toplanan verileriniz;
              </p>
              <ul style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', paddingInlineStart: '20px', marginTop: '6px' }}>
                <li>Yemek siparişinizin mutfakta doğru şekilde hazırlanması,</li>
                <li>Kurye aracılığıyla belirtilen teslimat adresine zamanında ulaştırılması,</li>
                <li>Sipariş detaylarının WhatsApp iletişim kanalı üzerinden seçtiğiniz şubemize doğrudan iletilmesi,</li>
              </ul>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginTop: '8px' }}>
                amaçlarıyla işlenir. Verileriniz reklam amacıyla üçüncü taraflarla kesinlikle paylaşılmaz veya satılmaz.
              </p>
            </section>

            <section style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.15rem', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                4. WhatsApp Üzerinden Sipariş İletimi
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                Web sitemizde doldurduğunuz teslimat formu, kolaylık sağlamak amacıyla WhatsApp mesajı formatına dönüştürülerek doğrudan seçtiğiniz şubemizin resmi işletme hattına gönderilir. Bu süreçte WhatsApp kullanım koşulları ve gizlilik politikası geçerlidir.
              </p>
            </section>

            <section style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.15rem', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                5. KVKK Madde 11 Kapsamındaki Haklarınız
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                KVKK&apos;nın 11. maddesi uyarınca işletmemize başvurarak; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, silinmesini veya düzeltilmesini isteme haklarına sahipsiniz. İletişim için şubelerimizle veya belirtilen resmi telefon hatlarımızla irtibata geçebilirsiniz.
              </p>
            </section>

          </article>
        </div>
      </main>
    </>
  );
}
