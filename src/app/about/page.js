'use client';

import Image from 'next/image';
import { useLang } from '@/context/LangContext';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import { restaurantInfo } from '@/data/menuData';

export default function AboutPage() {
  const { lang, t, dir } = useLang();

  const labels = {
    title: { tr: 'Hikayemiz', en: 'Our Story', ar: 'قصتنا', zh: '我们的故事' },
    craft: { tr: 'Zanaat', en: 'The Craft', ar: 'الحرفة', zh: '工艺' },
    atmosphere: { tr: 'Atmosfer', en: 'Atmosphere', ar: 'الجو العام', zh: '氛围' }
  };

  const l = (key) => labels[key]?.[lang] || labels[key]?.en || '';

  return (
    <>
      <Header />

      <main style={{ background: 'var(--warm-cream)', minHeight: '100vh', paddingBottom: 'var(--sp-12)' }}>
        
        {/* Hero Section */}
        <section style={{ 
          position: 'relative', 
          height: '60vh', 
          minHeight: '400px',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'var(--nori-black)',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
            {/* Using a placeholder since we don't have a specific hero image */}
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--charcoal-green), var(--nori-black))' }} />
          </div>
          
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 var(--page-pad)' }}>
            <span style={{ 
              color: 'var(--aged-champagne)', 
              fontSize: '0.8rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.2em', 
              fontWeight: 600,
              display: 'block',
              marginBottom: 'var(--sp-2)'
            }}>
              {restaurantInfo.name}
            </span>
            <h1 style={{ 
              fontFamily: 'var(--font-heading-en)', 
              fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
              color: 'var(--rice-white)',
              marginBottom: 'var(--sp-4)'
            }}>
              {l('title')}
            </h1>
            <p style={{ 
              color: 'var(--mist-beige)', 
              maxWidth: '600px', 
              margin: '0 auto', 
              fontSize: '1.1rem', 
              lineHeight: 1.8 
            }}>
              {t(restaurantInfo, 'tagline')}
            </p>
          </div>
        </section>

        {/* Story Content */}
        <section className="container" style={{ paddingTop: 'var(--sp-10)' }}>
          <div style={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 'var(--sp-8)' 
          }}>
            
            {/* Block 1 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', color: 'var(--aged-champagne)', marginBottom: 'var(--sp-2)' }}>🍀</div>
              <h2 style={{ fontSize: '2rem', marginBottom: 'var(--sp-3)' }}>We Bring You Luck</h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--soft-taupe)', lineHeight: 1.8, marginBottom: 'var(--sp-3)' }}>
                {t(restaurantInfo, 'desc')}
              </p>
              <p style={{ fontSize: '1.05rem', color: 'var(--soft-taupe)', lineHeight: 1.8 }}>
                {lang === 'tr' && 'İstanbul\'un kalbinde, gece yarısına kadar uzanan lezzet yolculuğumuzda, her bir sipariş şans ve özenle hazırlanır. Geleneksel Asya tariflerini modern bir dokunuşla masanıza getiriyoruz.'}
                {lang === 'en' && 'In the heart of Istanbul, on our flavor journey that extends until midnight, every order is prepared with luck and care. We bring traditional Asian recipes to your table with a modern touch.'}
                {lang === 'ar' && 'في قلب إسطنبول، في رحلة النكهات التي تمتد حتى منتصف الليل، يتم إعداد كل طلب بالحظ والعناية. نقدم الوصفات الآسيوية التقليدية إلى طاولتك بلمسة عصرية.'}
                {lang === 'zh' && '在伊斯坦布尔的中心，在我们延续到午夜的风味之旅中，每一份订单都充满了幸运和关怀。我们以现代的触感将传统的亚洲食谱带到您的餐桌上。'}
              </p>
            </div>

            {/* Block 2 (Visual + Text) */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: 'var(--sp-6)', 
              alignItems: 'center',
              marginTop: 'var(--sp-4)',
              paddingTop: 'var(--sp-8)',
              borderTop: '1px solid rgba(185, 148, 82, 0.15)'
            }}>
              <div style={{ order: dir === 'rtl' ? 2 : 1 }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: 'var(--sp-2)' }}>{l('craft')}</h3>
                <p style={{ color: 'var(--soft-taupe)', lineHeight: 1.8 }}>
                  {lang === 'tr' && 'Usta şeflerimiz, en taze deniz ürünlerini ve özenle seçilmiş sebzeleri kullanarak her bir sushi rulosunu bir sanat eserine dönüştürüyor. Wok ateşinin harladığı sıcak yemeklerimiz, Asya mutfağının otantik ruhunu yansıtıyor.'}
                  {lang === 'en' && 'Our master chefs transform each sushi roll into a work of art using the freshest seafood and carefully selected vegetables. Our hot dishes, flared by the wok fire, reflect the authentic spirit of Asian cuisine.'}
                  {lang === 'ar' && 'يقوم الطهاة المحترفون لدينا بتحويل كل لفة سوشي إلى عمل فني باستخدام المأكولات البحرية الطازجة والخضروات المختارة بعناية. أطباقنا الساخنة، التي تشتعل بنار المقلاة، تعكس الروح الأصيلة للمطبخ الآسيوي.'}
                  {lang === 'zh' && '我们的大厨使用最新鲜的海鲜和精选的蔬菜，将每一个寿司卷变成一件艺术品。我们在炒锅中烹制的热菜，反映了亚洲美食的真正精神。'}
                </p>
              </div>
              <div style={{ 
                order: dir === 'rtl' ? 1 : 2, 
                aspectRatio: '1', 
                borderRadius: '50%', 
                overflow: 'hidden', 
                border: '1px solid rgba(185, 148, 82, 0.2)',
                background: 'var(--oat-beige)' 
              }}>
                <Image src="/images/sr-dragon.jpg" alt="Craft" width={400} height={400} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

          </div>
        </section>

      </main>
      
      <CartDrawer />
    </>
  );
}
