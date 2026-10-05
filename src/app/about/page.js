'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/context/LangContext';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import { restaurantInfo } from '@/data/menuData';
import { GiSushis, GiChopsticks } from 'react-icons/gi';
import { FaMoon, FaStar, FaFire, FaFish, FaHeart } from 'react-icons/fa6';

export default function AboutPage() {
  const { lang, t, dir } = useLang();

  const labels = {
    badge: { tr: 'Lucky Sushi Chinese Hikayesi', en: 'The Lucky Sushi Chinese Story', ar: 'قصة لاكي سوشي الصينية', zh: '品牌故事', ru: 'История Lucky Sushi Chinese', fa: 'داستان ما', fr: 'Notre Histoire' },
    title: { tr: 'Geleneksel Ustalık, Çağdaş Asya Ruhu', en: 'Traditional Craft, Contemporary Asian Spirit', ar: 'حِرفة أصيلة، وروح آسيوية عصرية', zh: '传统匠心，当代亚洲风味', ru: 'Традиционное мастерство, современный азиатский дух', fa: 'هنر سنتی، روح معاصر آسیایی', fr: 'Savoir-faire Traditionnel, Esprit Asiatique Contemporain' },
    tagline: { 
      tr: 'İstanbul\'da gece yarısından sabaha uzanan, taze sushi ve wok ateşinde pişen sıcak lezzetlerin buluşma noktası.', 
      en: 'Where fresh sushi meets fiery wok artistry, serving Istanbul with passion until the early morning.',
      ar: 'ملتقى السوشي الطازج وفنون الووك الساخنة في إسطنبول، نخدمكم بشغف حتى ساعات الفجر الأولى.',
      zh: '新鲜寿司与热烈炒锅艺术的融合，在伊斯坦布尔为您提供深夜美味。',
      ru: 'Где свежие суши встречаются с искусством огненного вока, открыты в Стамбуле до поздней ночи.',
      fa: 'تلاقی سوشی تازه و هنر وک در استانبول تا پاسی از شب.',
      fr: 'Où le sushi frais rencontre l\'art du wok ardent, ouvert à Istanbul jusqu\'à l\'aube.'
    },
    craftTitle: { tr: 'Tazelik & Zanaat', en: 'Freshness & Culinary Craft', ar: 'الطزاجة والإتقان', zh: '新鲜与工艺', ru: 'Свежесть и мастерство', fa: 'تازگی و مهارت', fr: 'Fraîcheur & Artisanat' },
    craftP1: {
      tr: 'Lucky Sushi Chinese olarak sushi sanatını bir tutku olarak görüyoruz. Norveç somonundan özenle seçilen deniz mahsullerine, taze avokadolardan özel soslarımıza kadar her malzeme mutfağımıza günlük olarak ulaşır.',
      en: 'At Lucky Sushi Chinese, we view sushi as a true craft. From prime Norwegian salmon to hand-selected seafood, fresh avocados, and house-blended sauces, every ingredient arrives daily.',
      ar: 'في لاكي سوشي الصينية، نرى السوشي كفن وحرفة حقيقية. من سلمون النرويج الفاخر إلى المأكولات البحرية المختارة بعناية والأفوكادو الطازج وصلصاتنا الخاصة، كل مكوّن يصل يومياً.',
      zh: '在 Lucky Sushi Chinese，我们将寿司视为一门真正的艺术。从挪威三文鱼到严选海鲜、新鲜牛油果和自制酱汁，所有食材均每日新鲜送达。',
      ru: 'В Lucky Sushi Chinese мы относимся к суши как к истинному искусству. От премиального норвежского лосося до отборных морепродуктов — все ингредиенты поступают ежедневно.',
      fa: 'در لاکی سوشی، سوشی را هنری اصیل می‌دانیم. تمام مواد اولیه از جمله سالمون نروژی روزانه تهیه می‌شوند.',
      fr: 'Chez Lucky Sushi Chinese, le sushi est un art véritable. Du saumon norvégien aux fruits de mer sélectionnés, tous nos ingrédients arrivent chaque jour.'
    },
    wokTitle: { tr: 'Wok Ateşinin Gücü', en: 'The Fire of the Wok', ar: 'لهيب مقلاة الووك', zh: '锅气之韵', ru: 'Сила огня вок', fa: 'شعله وک چینی', fr: 'Le Feu du Wok' },
    wokP1: {
      tr: 'Geleneksel Çin ve Asya mutfağının vazgeçilmezi olan wok tavalarında, yüksek ısıda hızla sotelenen etler, taze sebzeler ve el yapımı noodle\'lar lezzetin özünü hapseder.',
      en: 'In our high-heat wok station, tender meats, crisp vegetables, and handcrafted noodles are flash-seared to capture authentic wok hei and deep flavors.',
      ar: 'في محطة الووك ذات الحرارة العالية، يتم تحمير اللحوم الطرية والخضار المقرمشة والنودلز يدوياً لاحتجاز النكهات الغنية والمميزة.',
      zh: '在我们的大火炒锅台上，嫩肉、爽脆蔬菜与手工面条迅速爆炒，锁住纯正镬气与深厚风味。',
      ru: 'На раскаленном воке сочное мясо, свежие овощи и лапша мгновенно обжариваются, сохраняя аутентичный аромат wok hei.',
      fa: 'در ایستگاه وک با حرارت بالا، گوشت‌های تازه و نودل‌های دست‌ساز با طعمی اصیل تفت داده می‌شوند.',
      fr: 'Sur notre wok à feu vif, viandes tendres, légumes croquants et nouilles maison sont saisis pour capturer toute la saveur.'
    },
    nightTitle: { tr: 'İstanbul Asla Uyumaz — Gece 04:00\'e Kadar', en: 'Istanbul Never Sleeps — Open Until 04:00', ar: 'إسطنبول لا تنام — حتى الرابعة فجراً', zh: '不夜伊斯坦布尔 — 营业至凌晨04:00', ru: 'Стамбул никогда не спит — до 04:00', fa: 'استانبول بیدار — تا ۰۴:۰۰ صبح', fr: 'Istanbul Ne Dort Jamais — Jusqu\'à 04:00' },
    nightP1: {
      tr: 'Şehrin en geç saatlerinde bile taze ve sıcak bir tabak bulabilmeniz için mutfağımız aralıksız çalışır. Gece acıktığınızda ya da geç saatte eve dönerken Lucky her zaman yanınızda.',
      en: 'Our kitchen runs without pause so you can enjoy freshly prepared sushi and hot wok delicacies deep into the night, whenever craving strikes.',
      ar: 'يعمل مطبخنا دون توقف حتى تتمكن من الاستمتاع بالسوشي الطازج وأطباق الووك الساخنة في أواخر ساعات الليل.',
      zh: '我们的厨房持续运转，确保在深夜时分您依然能够享用到新鲜调制的寿司和热气腾腾的炒锅美馔。',
      ru: 'Наша кухня работает без перерывов, чтобы вы могли насладиться свежими суши и горячими блюдами даже глубокой ночью.',
      fa: 'آشپزخانه ما پیوسته فعال است تا حتی در نیمه‌های شب بتوانید از سوشی تازه و غذای گرم لذت ببرید.',
      fr: 'Notre cuisine est active en continu pour vous offrir des sushis frais et des mets chauds jusqu\'aux premières heures du jour.'
    },
    menuCta: { tr: 'Menüyü Keşfedin', en: 'Explore The Menu', ar: 'تصفح المنيو', zh: '探索菜单', ru: 'Посмотреть меню', fa: 'مشاهده منو', fr: 'Explorer le Menu' },
    contactCta: { tr: 'Şubelerimizi Görün', en: 'View Our Locations', ar: 'فروعنا ومواقعنا', zh: '查看门店', ru: 'Наши филиалы', fa: 'شعبات ما', fr: 'Nos Adresses' },
    statFresh: { tr: 'Taze Deniz Mahsulü', en: 'Fresh Seafood', ar: 'مأكولات بحرية طازجة', ru: 'Свежие морепродукты', zh: '新鲜海鲜' },
    statDishes: { tr: 'Özgün Lezzet Çeşidi', en: 'Curated Menu Items', ar: 'طبقاً آسيوياً مميزاً', ru: 'Разнообразных блюд', zh: '精选特色料理' },
    statReviews: { tr: 'Google Değerlendirmesi', en: 'Google Reviews (4.6★)', ar: 'تقييمات غوغل (4.6★)', ru: 'Отзывов в Google (4.6★)', zh: '谷歌真实好评 (4.6★)' },
    galleryBadge: { tr: 'Gastronomi Galerisi', en: 'Culinary Showcase', ar: 'معرض النكهات', ru: 'Галерея вкуса', zh: '美食展' },
    galleryTitle: { tr: 'Usta Ellerden Masanıza', en: 'Handcrafted From Kitchen to Table', ar: 'من أيدي الطهاة إلى مائدتكم', ru: 'От мастеров к вашему столу', zh: '从大厨之手到您的餐桌' },
  };

  const l = (key) => labels[key]?.[lang] || labels[key]?.en || '';

  return (
    <>
      <Header />

      <main style={{ background: 'var(--color-background)', minHeight: '100vh', paddingBottom: 'var(--sp-12)' }}>
        
        {/* ── 1. Hero: Controlled Dark Atmosphere ────────────────── */}
        <section style={{ 
          position: 'relative', 
          minHeight: '480px',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'var(--color-brand-dark)',
          overflow: 'hidden',
          padding: 'var(--sp-12) var(--page-pad)',
          textAlign: 'center'
        }}>
          {/* Subtle warm glow overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, rgba(40, 122, 63, 0.12) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} aria-hidden="true" />
          
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '780px', margin: '0 auto' }}>
            <span style={{ 
              color: 'var(--color-brand-primary)', 
              fontSize: '0.82rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.22em', 
              fontWeight: 700,
              display: 'inline-block',
              marginBottom: 'var(--sp-2)'
            }}>
              {l('badge')}
            </span>
            
            <h1 style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)', 
              color: 'var(--color-brand-light)',
              lineHeight: 1.15,
              marginBottom: 'var(--sp-4)',
              fontWeight: 700
            }}>
              {l('title')}
            </h1>

            <p style={{ 
              color: 'var(--mist-beige)', 
              maxWidth: '620px', 
              margin: '0 auto', 
              fontSize: '1.05rem', 
              lineHeight: 1.8 
            }}>
              {l('tagline')}
            </p>
          </div>
        </section>

        {/* ── 2. Editorial Section: Real Restaurant Environment ── */}
        <section className="container" style={{ paddingTop: 'var(--sp-10)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--sp-8)',
            alignItems: 'center',
            marginBottom: 'var(--sp-12)'
          }}>
            {/* Visual: Real Storefront */}
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--color-border-light)',
              position: 'relative',
              aspectRatio: '4 / 3',
              background: 'var(--color-surface-secondary)'
            }}>
              <Image
                src="/images/floter.jpg"
                alt="Lucky Sushi Chinese Restaurant Istanbul"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 550px"
                priority
              />
            </div>

            {/* Text: Craft & Identity */}
            <div>
              <span className="home-section-badge">
                <GiSushis style={{ marginInlineEnd: '6px' }} aria-hidden="true" />
                {l('craftTitle')}
              </span>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--sp-3)'
              }}>
                {l('craftTitle')}
              </h2>
              <p style={{
                color: 'var(--color-text-secondary)',
                fontSize: '1rem',
                lineHeight: 1.8,
                marginBottom: 'var(--sp-4)'
              }}>
                {l('craftP1')}
              </p>
              <div style={{
                display: 'flex',
                gap: 'var(--sp-4)',
                borderTop: '1px solid var(--color-border)',
                paddingTop: 'var(--sp-4)',
                flexWrap: 'wrap'
              }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-brand-primary)', fontWeight: 700 }}>100%</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{l('statFresh')}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-brand-primary)', fontWeight: 700 }}>140+</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{l('statDishes')}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-brand-primary)', fontWeight: 700 }}>800+</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{l('statReviews')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 3. Editorial Section: Wok Fire & Kitchen Art ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--sp-8)',
            alignItems: 'center',
            marginBottom: 'var(--sp-12)'
          }}>
            {/* Text: Wok */}
            <div style={{ order: 1 }}>
              <span className="home-section-badge">
                <FaFire style={{ marginInlineEnd: '6px' }} aria-hidden="true" />
                {l('wokTitle')}
              </span>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--sp-3)'
              }}>
                {l('wokTitle')}
              </h2>
              <p style={{
                color: 'var(--color-text-secondary)',
                fontSize: '1rem',
                lineHeight: 1.8,
                marginBottom: 'var(--sp-4)'
              }}>
                {l('wokP1')}
              </p>
              <Link href="/menu" className="btn-primary" style={{ display: 'inline-flex' }}>
                <GiChopsticks style={{ marginInlineEnd: '6px' }} />
                <span>{l('menuCta')}</span>
              </Link>
            </div>

            {/* Visual: Wok & Food Art */}
            <div style={{
              order: 2,
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--color-border-light)',
              position: 'relative',
              aspectRatio: '4 / 3',
              background: 'var(--color-surface-secondary)'
            }}>
              <Image
                src="/images/beef-gyoza.jpg"
                alt="Lucky Sushi Chinese Handcrafted Dumplings"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 550px"
              />
            </div>
          </div>
        </section>

        {/* ── 4. Controlled Dark Section: Nocturnal Dining 04:00 ── */}
        <section style={{
          background: 'var(--color-brand-dark)',
          color: 'var(--color-brand-light)',
          padding: 'var(--sp-12) var(--page-pad)',
          margin: 'var(--sp-10) 0'
        }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '780px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(40, 122, 63, 0.15)',
              color: 'var(--color-brand-primary)',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '0.82rem',
              fontWeight: 700,
              marginBottom: 'var(--sp-3)'
            }}>
              <FaMoon aria-hidden="true" /> 04:00
            </span>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              color: 'var(--color-brand-light)',
              marginBottom: 'var(--sp-4)'
            }}>
              {l('nightTitle')}
            </h2>
            <p style={{
              color: 'var(--mist-beige)',
              fontSize: '1.05rem',
              lineHeight: 1.8,
              marginBottom: 'var(--sp-8)'
            }}>
              {l('nightP1')}
            </p>
            <div style={{ display: 'flex', gap: 'var(--sp-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/menu" className="btn-hero-primary">
                {l('menuCta')}
              </Link>
              <Link href="/contact" className="btn-hero-secondary">
                {l('contactCta')}
              </Link>
            </div>
          </div>
        </section>

        {/* ── 5. Signature Gallery Grid ── */}
        <section className="container" style={{ paddingTop: 'var(--sp-6)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--sp-8)' }}>
            <span className="home-section-badge">
              <FaStar style={{ marginInlineEnd: '6px' }} aria-hidden="true" />
              {l('galleryBadge')}
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-text-primary)' }}>
              {l('galleryTitle')}
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--sp-4)'
          }}>
            {[
              { src: '/images/salmon-lovers.jpg', title: 'Salmon Lovers Set' },
              { src: '/images/dragon-roll.jpg', title: 'Signature Dragon Roll' },
              { src: '/images/bento-1.jpg', title: 'Bento Box Craft' },
              { src: '/images/canada-set.jpg', title: 'Canada Prestige Selection' },
            ].map((dish, idx) => (
              <div
                key={idx}
                style={{
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative',
                  aspectRatio: '1 / 1'
                }}
              >
                <Image
                  src={dish.src}
                  alt={dish.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 640px) 50vw, 280px"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      <CartDrawer />
    </>
  );
}
