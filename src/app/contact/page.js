'use client';

import { useLang } from '@/context/LangContext';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import { restaurantInfo } from '@/data/menuData';

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

      <main style={{ background: 'var(--warm-cream)', minHeight: '100vh', paddingBottom: 'var(--sp-12)' }}>
        
        {/* Header Section */}
        <section style={{ padding: 'var(--sp-8) var(--page-pad)', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--roasted-cacao)', marginBottom: 'var(--sp-2)' }}>
            {l('title')}
          </h1>
          <p style={{ color: 'var(--soft-taupe)', maxWidth: '600px', margin: '0 auto' }}>
            {l('subtitle')}
          </p>
        </section>

        {/* Global Menu Link */}
        <div className="container" style={{ marginBottom: 'var(--sp-8)' }}>
          <div style={{ 
            background: 'var(--aged-champagne)', 
            borderRadius: 'var(--card-radius)', 
            padding: 'var(--sp-4)',
            textAlign: 'center',
            color: 'white',
            boxShadow: '0 8px 32px rgba(185, 148, 82, 0.2)'
          }}>
            <h2 style={{ color: 'white', marginBottom: 'var(--sp-2)', fontSize: '1.5rem' }}>
              {l('mainMenu')}
            </h2>
            <a 
              href={restaurantInfo.menu_url} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'white',
                color: 'var(--roasted-cacao)',
                padding: '12px 32px',
                borderRadius: 'var(--btn-radius)',
                fontWeight: 600,
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span>🍣</span> {l('order')} (menu.sepettakip.com)
            </a>
          </div>
        </div>

        {/* Branches Grid */}
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: 'var(--sp-4)' 
          }}>
            {restaurantInfo.branches.map((branch) => {
              const whatsappClean = branch.whatsapp.replace(/[^0-9]/g, '');
              const phoneClean = branch.phone.replace(/[^0-9]/g, '');
              
              return (
                <div key={branch.id} style={{
                  background: 'white',
                  borderRadius: 'var(--card-radius)',
                  padding: 'var(--sp-5)',
                  border: '1px solid rgba(185, 148, 82, 0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'box-shadow 0.3s, transform 0.3s',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(52, 43, 37, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--aged-champagne)' }} />
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--sp-3)' }}>
                    <div style={{ 
                      width: '48px', height: '48px', 
                      borderRadius: '50%', background: 'var(--rice-paper)', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.5rem', color: 'var(--aged-champagne)'
                    }}>
                      📍
                    </div>
                    <h3 style={{ fontSize: '1.4rem', color: 'var(--roasted-cacao)' }}>{branch.name}</h3>
                  </div>

                  <p style={{ color: 'var(--soft-taupe)', marginBottom: 'var(--sp-4)', flex: 1 }}>
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
                        fontSize: '0.95rem'
                      }}
                    >
                      💬 WhatsApp: {branch.whatsapp}
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
                          padding: '10px',
                          borderRadius: 'var(--btn-radius)',
                          fontWeight: 500,
                          fontSize: '0.85rem'
                        }}
                      >
                        📞 {l('call')}
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
                          padding: '10px',
                          borderRadius: 'var(--btn-radius)',
                          fontWeight: 500,
                          fontSize: '0.85rem'
                        }}
                      >
                        🗺️ {l('map')}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Info */}
        <section className="container" style={{ marginTop: 'var(--sp-10)' }}>
          <div style={{ 
            background: 'var(--nori-black)', 
            borderRadius: 'var(--card-radius)', 
            padding: 'var(--sp-6)',
            color: 'var(--rice-white)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--sp-6)',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h3 style={{ color: 'var(--aged-champagne)', marginBottom: '8px', fontSize: '1.2rem' }}>Çalışma Saatleri</h3>
              <p style={{ color: 'var(--mist-beige)' }}>{t(restaurantInfo, 'hours')}</p>
            </div>
            <div>
              <h3 style={{ color: 'var(--aged-champagne)', marginBottom: '8px', fontSize: '1.2rem' }}>Sosyal Medya</h3>
              <a href="https://instagram.com/lucky.sushi_chinese" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--mist-beige)' }}>
                📸 {restaurantInfo.instagram}
              </a>
            </div>
          </div>
        </section>

      </main>

      <CartDrawer />
    </>
  );
}
