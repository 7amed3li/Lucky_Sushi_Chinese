'use client';

import Link from 'next/link';
import { useLang } from '@/context/LangContext';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import { restaurantInfo } from '@/data/menuData';
import { 
  FaWhatsapp, FaPhone, FaMapLocationDot, FaLocationDot, 
  FaInstagram, FaClock, FaBagShopping 
} from 'react-icons/fa6';
import { GiSushis } from 'react-icons/gi';

export default function ContactPage() {
  const { lang, t, dir } = useLang();

  const labels = {
    title: { tr: 'İletişim & Şubeler', en: 'Contact & Branches', ar: 'اتصل بنا وفروعنا', zh: '联系与分店' },
    subtitle: { 
      tr: 'Size en yakın Lucky Sushi Chinese şubesini bulun.', 
      en: 'Find the nearest Lucky Sushi Chinese branch to you.', 
      ar: 'ابحث عن أقرب فرع لـ Lucky Sushi Chinese إليك.', 
      zh: '找到离您最近的 Lucky Sushi Chinese 分店。' 
    },
    order: { tr: 'Sipariş Ver', en: 'Order Now', ar: 'اطلب الآن', zh: '立即下单' },
    map: { tr: 'Haritada Gör', en: 'View on Map', ar: 'عرض على الخريطة', zh: '在地图上查看' },
    call: { tr: 'Ara', en: 'Call', ar: 'اتصل', zh: '呼叫' },
    mainMenu: { tr: 'Ana Menü (Tüm Şubeler)', en: 'Main Menu (All Branches)', ar: 'القائمة الرئيسية (جميع الفروع)', zh: '主菜单（所有分店）' }
  };

  const l = (key) => labels[key]?.[lang] || labels[key]?.en || '';

  return (
    <>
      <Header />

      <main style={{ background: 'var(--rice-paper)', minHeight: '100vh', paddingBottom: 'var(--sp-12)' }}>
        
        {/* Header Section */}
        <section style={{ padding: 'var(--sp-10) var(--page-pad)', textAlign: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(185, 148, 82, 0.1)', color: 'var(--sake-gold)', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, marginBottom: 'var(--sp-4)' }}>
            <FaLocationDot /> {l('title')}
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading-en)', fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', color: 'var(--nori-black)', marginBottom: 'var(--sp-3)' }}>
            {l('title')}
          </h1>
          <p style={{ color: 'var(--soft-taupe)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            {l('subtitle')}
          </p>
        </section>

        {/* Global Menu Link */}
        <div className="container" style={{ marginBottom: 'var(--sp-12)' }}>
          <div style={{ 
            background: 'var(--nori-black)', 
            borderRadius: '24px', 
            padding: 'var(--sp-10)',
            textAlign: 'center',
            color: 'var(--rice-white)',
            boxShadow: '0 12px 40px rgba(52, 43, 37, 0.15)',
            border: '1px solid rgba(185, 148, 82, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <GiSushis style={{ position: 'absolute', top: '-15%', right: '-5%', fontSize: '20rem', color: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
            <h2 style={{ fontFamily: 'var(--font-heading-en)', color: 'var(--sake-gold)', marginBottom: 'var(--sp-3)', fontSize: '2.2rem' }}>
              {l('mainMenu')}
            </h2>
            <p style={{ color: 'var(--mist-beige)', marginBottom: 'var(--sp-6)', maxWidth: '500px', margin: '0 auto', fontSize: '1rem', lineHeight: 1.6 }}>
              Canınız nerede çekerse çeksin, tüm şubelerimiz için online sipariş verin.
            </p>
            <Link 
              href="/menu" 
              className="btn-hero-primary"
              style={{
                display: 'inline-flex',
                padding: '14px 32px',
                fontSize: '1.05rem',
                position: 'relative',
                zIndex: 2
              }}
            >
              <FaBagShopping style={{ marginRight: '8px' }} />
              <span>{l('order')}</span>
            </Link>
          </div>
        </div>

        {/* Branches Grid */}
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
                <div key={branch.id} style={{
                  background: 'white',
                  borderRadius: '24px',
                  padding: 'var(--sp-8)',
                  border: '1px solid rgba(185, 148, 82, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  position: 'relative',
                  boxShadow: '0 8px 30px rgba(52, 43, 37, 0.04)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 16px 50px rgba(185, 148, 82, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(185, 148, 82, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(52, 43, 37, 0.04)';
                  e.currentTarget.style.borderColor = 'rgba(185, 148, 82, 0.1)';
                }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: 'var(--sp-4)' }}>
                    <div style={{ 
                      width: '56px', height: '56px', 
                      borderRadius: '50%', background: 'var(--warm-cream)', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.5rem', color: 'var(--sake-gold)',
                      border: '1px solid rgba(185, 148, 82, 0.2)'
                    }}>
                      <FaLocationDot />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading-en)', fontSize: '1.5rem', color: 'var(--roasted-cacao)' }}>{branch.name}</h3>
                  </div>

                  <p style={{ color: 'var(--soft-taupe)', marginBottom: 'var(--sp-6)', flex: 1, lineHeight: 1.6 }}>
                    {branch.address}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <a 
                      href={`https://wa.me/${whatsappClean}?text=${encodeURIComponent('Merhaba! Sipariş vermek istiyorum.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        background: '#25D366',
                        color: 'white',
                        padding: '12px',
                        borderRadius: 'var(--btn-radius)',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        transition: 'opacity 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      <FaWhatsapp size={18} /> WhatsApp: {branch.whatsapp}
                    </a>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <a 
                        href={`tel:${phoneClean}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          border: '1px solid rgba(185, 148, 82, 0.3)',
                          color: 'var(--roasted-cacao)',
                          background: 'white',
                          padding: '10px',
                          borderRadius: 'var(--btn-radius)',
                          fontWeight: 500,
                          fontSize: '0.9rem',
                          transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--warm-cream)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
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
                          gap: '8px',
                          border: '1px solid rgba(185, 148, 82, 0.3)',
                          color: 'var(--roasted-cacao)',
                          background: 'white',
                          padding: '10px',
                          borderRadius: 'var(--btn-radius)',
                          fontWeight: 500,
                          fontSize: '0.9rem',
                          transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--warm-cream)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
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

        {/* Global Info */}
        <section className="container" style={{ marginTop: 'var(--sp-12)' }}>
          <div style={{ 
            background: 'white', 
            borderRadius: '24px', 
            padding: 'var(--sp-8)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--sp-6)',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 8px 30px rgba(52, 43, 37, 0.04)',
            border: '1px solid rgba(185, 148, 82, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--warm-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sake-gold)', fontSize: '1.2rem' }}>
                <FaClock />
              </div>
              <div>
                <h3 style={{ color: 'var(--roasted-cacao)', marginBottom: '4px', fontSize: '1.1rem', fontFamily: 'var(--font-heading-en)' }}>Çalışma Saatleri</h3>
                <p style={{ color: 'var(--soft-taupe)' }}>{t(restaurantInfo, 'hours')}</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--warm-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sake-gold)', fontSize: '1.2rem' }}>
                <FaInstagram />
              </div>
              <div>
                <h3 style={{ color: 'var(--roasted-cacao)', marginBottom: '4px', fontSize: '1.1rem', fontFamily: 'var(--font-heading-en)' }}>Sosyal Medya</h3>
                <a href="https://instagram.com/lucky.sushi_chinese" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--soft-taupe)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--sake-gold)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--soft-taupe)'}>
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
