'use client';

import Link from 'next/link';
import { useLang } from '@/context/LangContext';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import { restaurantInfo } from '@/data/menuData';
import { 
  FaWhatsapp, FaPhone, FaMapLocationDot, FaLocationDot, 
  FaInstagram, FaClock, FaBagShopping, FaMoon 
} from 'react-icons/fa6';
import { GiSushis } from 'react-icons/gi';

export default function ContactPage() {
  const { lang, t, dir } = useLang();

  const labels = {
    badge: { tr: 'İletişim & Lokasyon', en: 'Contact & Locations', ar: 'التواصل والمواقع', zh: '联系与分店', ru: 'Контакты и адреса', fa: 'تماس و شعبات', fr: 'Contact & Adresses' },
    title: { tr: 'Bize Ulaşın & Şubelerimiz', en: 'Contact Us & Branches', ar: 'تواصل معنا وفروعنا', zh: '联系我们与门店', ru: 'Свяжитесь с нами и филиалы', fa: 'تماس با ما و شعبات', fr: 'Nous Contacter & Adresses' },
    subtitle: { 
      tr: 'İstanbul\'da canınız taze sushi ve sıcak wok lezzeti çektiğinde en yakın Lucky Sushi Chinese şubesi yanı başınızda.', 
      en: 'Whenever you crave fresh sushi and wok specialties in Istanbul, your nearest Lucky Sushi Chinese is ready.', 
      ar: 'أينما اشتهيت السوشي الطازج ونكهات الووك الساخنة في إسطنبول، أقرب فرع لـ Lucky Sushi Chinese بجوارك.', 
      zh: '在伊斯坦布尔，无论何时渴望新鲜寿司和热烈炒锅风味，最近的 Lucky Sushi Chinese 都在您身边。',
      ru: 'Когда вам захочется свежих суши и горячего вока в Стамбуле, филиал Lucky Sushi Chinese всегда рядом.',
      fa: 'هر زمان که در استانبول هوس سوشی تازه یا غذای وک کردید، نزدیک‌ترین شعبه لاکی در کنار شماست.',
      fr: 'Pour toutes vos envies de sushis frais et de wok savoureux à Istanbul, votre Lucky Sushi Chinese vous accueille.'
    },
    order: { tr: 'Menüden Sipariş Ver', en: 'Order From Menu', ar: 'اطلب من القائمة', zh: '从菜单下单', ru: 'Заказать из меню', fa: 'سفارش از منو', fr: 'Commander du Menu' },
    map: { tr: 'Harita', en: 'Map', ar: 'الخريطة', zh: '地图', ru: 'Карта', fa: 'نقشه', fr: 'Carte' },
    call: { tr: 'Ara', en: 'Call', ar: 'اتصال', zh: '电话', ru: 'Позвонить', fa: 'تماس', fr: 'Appeler' },
    mainMenu: { tr: 'Gece Boyu Kesintisiz Paket Servis', en: 'Continuous Night Delivery Service', ar: 'خدمة توصيل مستمرة طوال الليل', zh: '全夜持续外卖配送', ru: 'Доставка всю ночь без перерывов', fa: 'ارسال شبانه بی‌وقفه', fr: 'Livraison Nocturne Continue' },
    mainMenuSub: { tr: 'Gece 04:00\'e kadar tüm İstanbul siparişleriniz özenle hazırlanıp kapınıza ulaştırılır.', en: 'Open until 04:00 AM — your orders are freshly crafted and delivered right to your door.', ar: 'مفتوح حتى الرابعة فجراً — تُعد طلباتكم طازجة وتصلكم أينما كنتم.', zh: '营业至凌晨04:00 — 您的订单现点现做，准时送达。', ru: 'Открыто до 04:00 — ваш заказ свежеприготовлен и доставлен до двери.', fa: 'فعال تا ۰۴:۰۰ صبح — سفارش‌های شما تازه آماده شده و ارسال می‌شوند.', fr: 'Ouvert jusqu\'à 04h00 — vos commandes préparées à la minute livrées chez vous.' },
    hoursTitle: { tr: 'Çalışma Saatleri', en: 'Working Hours', ar: 'ساعات العمل', zh: '营业时间', ru: 'Часы работы', fa: 'ساعات کاری', fr: 'Horaires' },
    socialTitle: { tr: 'Sosyal Medya', en: 'Social Media', ar: 'وسائل التواصل', zh: '社交媒体', ru: 'Социальные сети', fa: 'شبکه‌های اجتماعی', fr: 'Réseaux Sociaux' }
  };

  const l = (key) => labels[key]?.[lang] || labels[key]?.en || '';

  return (
    <>
      <Header />

      <main style={{ background: 'var(--color-background)', minHeight: '100vh', paddingBottom: 'var(--sp-12)' }}>
        
        {/* ── 1. Page Header ── */}
        <section style={{ padding: 'var(--sp-10) var(--page-pad)', textAlign: 'center' }}>
          <span className="home-section-badge">
            <FaLocationDot style={{ marginInlineEnd: '6px' }} aria-hidden="true" />
            {l('badge')}
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', color: 'var(--color-text-primary)', marginBottom: 'var(--sp-3)' }}>
            {l('title')}
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '620px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.7 }}>
            {l('subtitle')}
          </p>
        </section>

        {/* ── 2. Controlled Dark Moment: Late Night Delivery Card ── */}
        <div className="container" style={{ marginBottom: 'var(--sp-10)' }}>
          <div style={{ 
            background: 'var(--color-brand-dark)', 
            borderRadius: 'var(--radius-lg)', 
            padding: 'var(--sp-8) var(--sp-6)',
            textAlign: 'center',
            color: 'var(--color-brand-light)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid rgba(246, 241, 232, 0.08)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <GiSushis style={{ position: 'absolute', top: '-20%', right: '-5%', fontSize: '18rem', color: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
            
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(40, 122, 63, 0.15)', color: 'var(--color-brand-primary)', padding: '4px 14px', borderRadius: '16px', fontSize: '0.8rem', fontWeight: 700, marginBottom: 'var(--sp-2)' }}>
              <FaMoon aria-hidden="true" /> Gece 04:00'e Kadar Açık
            </div>

            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-brand-light)', marginBottom: 'var(--sp-2)', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)' }}>
              {l('mainMenu')}
            </h2>
            <p style={{ color: 'var(--mist-beige)', marginBottom: 'var(--sp-6)', maxWidth: '520px', margin: '0 auto var(--sp-6)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {l('mainMenuSub')}
            </p>
            <Link 
              href="/menu" 
              className="btn-hero-primary"
              style={{
                display: 'inline-flex',
                padding: '14px 32px',
                fontSize: '1rem',
                position: 'relative',
                zIndex: 2
              }}
            >
              <FaBagShopping style={{ marginInlineEnd: '8px' }} />
              <span>{l('order')}</span>
              <span aria-hidden="true">{dir === 'rtl' ? '←' : '→'}</span>
            </Link>
          </div>
        </div>

        {/* ── 3. Branches Grid: Porcelain Cards ── */}
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: 'var(--sp-6)' 
          }}>
            {restaurantInfo.branches.map((branch) => {
              const whatsappClean = branch.whatsapp.replace(/[^0-9]/g, '');
              const phoneClean = branch.phone.replace(/[^0-9]/g, '');
              
              return (
                <div
                  key={branch.id}
                  style={{
                    background: 'var(--color-surface)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--sp-8)',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: 'var(--sp-4)' }}>
                    <div style={{ 
                      width: '50px', height: '50px', 
                      borderRadius: '50%', background: 'rgba(40, 122, 63, 0.08)', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.3rem', color: 'var(--color-brand-primary)'
                    }}>
                      <FaLocationDot />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-text-primary)' }}>
                        {branch.name}
                      </h3>
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-brand-primary)', fontWeight: 600 }}>
                        ● Aktif Hizmet
                      </span>
                    </div>
                  </div>

                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--sp-6)', flex: 1, lineHeight: 1.6, fontSize: '0.92rem' }}>
                    {branch.address}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a 
                      href={`https://wa.me/${whatsappClean}?text=${encodeURIComponent('Merhaba! Sipariş vermek istiyorum.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px',
                        fontSize: '0.9rem',
                        textDecoration: 'none'
                      }}
                    >
                      <FaWhatsapp size={18} /> WhatsApp: {branch.whatsapp}
                    </a>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <a 
                        href={`tel:${phoneClean}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          border: '1px solid var(--color-border)',
                          color: 'var(--color-text-primary)',
                          background: 'var(--color-surface)',
                          padding: '10px',
                          borderRadius: 'var(--btn-radius)',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          textDecoration: 'none',
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        <FaPhone /> {l('call')}
                      </a>
                      <a 
                        href={branch.map}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          border: '1px solid var(--color-border)',
                          color: 'var(--color-text-primary)',
                          background: 'var(--color-surface)',
                          padding: '10px',
                          borderRadius: 'var(--btn-radius)',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          textDecoration: 'none',
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        <FaMapLocationDot /> {l('map')}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 4. Global Info Bar: Hours & Instagram ── */}
        <section className="container" style={{ marginTop: 'var(--sp-10)' }}>
          <div style={{ 
            background: 'var(--color-surface)', 
            borderRadius: 'var(--radius-lg)', 
            padding: 'var(--sp-6) var(--sp-8)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--sp-6)',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--color-border-light)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(40, 122, 63, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-primary)', fontSize: '1.2rem' }}>
                <FaClock />
              </div>
              <div>
                <h3 style={{ color: 'var(--color-text-primary)', marginBottom: '2px', fontSize: '1.05rem', fontFamily: 'var(--font-serif)' }}>{l('hoursTitle')}</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{t(restaurantInfo, 'hours')}</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(40, 122, 63, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-primary)', fontSize: '1.2rem' }}>
                <FaInstagram />
              </div>
              <div>
                <h3 style={{ color: 'var(--color-text-primary)', marginBottom: '2px', fontSize: '1.05rem', fontFamily: 'var(--font-serif)' }}>{l('socialTitle')}</h3>
                <a
                  href="https://instagram.com/lucky.sushi_chinese"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-brand-primary)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}
                >
                  {restaurantInfo.instagram}
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <CartDrawer />
    </>
  );
}
