'use client';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useLang } from '@/context/LangContext';
import { restaurantInfo } from '@/data/menuData';
import { FaInstagram, FaWhatsapp, FaMapLocationDot, FaPhone, FaClock } from 'react-icons/fa6';

export default function Footer() {
  const { lang, t, tUI } = useLang();

  const labels = {
    phone: { tr: 'Telefon & Sipariş', en: 'Phone & Order', ar: 'الهاتف والطلب', zh: '电话与订餐', ru: 'Телефон и заказ' },
    hours: { tr: 'Çalışma Saatleri', en: 'Working Hours', ar: 'أوقات العمل', zh: '营业时间', ru: 'Часы работы' },
    hq: { tr: 'Merkez Şube (Eyüpsultan)', en: 'Main Branch (Eyüpsultan)', ar: 'الفرع الرئيسي (أيوب سلطان)', zh: '总店 (欧普苏丹)', ru: 'Главный филиал (Эйюпсултан)' },
    orderMenu: { tr: 'Menü & Sipariş', en: 'Menu & Order', ar: 'القائمة والطلب', zh: '菜单与下单', ru: 'Меню и заказ' },
    aboutUs: { tr: 'Hakkımızda', en: 'About Us', ar: 'من نحن', zh: '关于我们', ru: 'О нас' },
    branches: { tr: 'Şubelerimiz & İletişim', en: 'Branches & Contact', ar: 'فروعنا وتواصل معنا', zh: '分店与联系', ru: 'Филиалы и контакты' },
    maps: { tr: 'Google Haritalar', en: 'Google Maps', ar: 'خرائط جوجل', zh: '谷歌地图', ru: 'Google Карты' },
    rights: { tr: 'Tüm hakları saklıdır.', en: 'All rights reserved.', ar: 'جميع الحقوق محفوظة.', zh: '版权所有。', ru: 'Все права защищены.' },
    tagline: { 
      tr: 'Eyüpsultan’ın Asya Gece Mutfağı. Taze sushi ve sıcak Asya lezzetleri gece 04:00’e kadar.',
      en: "Eyüpsultan's Asian Night Kitchen. Fresh sushi and hot Asian flavors until 04:00 AM.",
      ar: 'مطبخ إسطنبول الآسيوي الليلي. سوشي طازج ونكهات آسيوية حتى 04:00 فجراً.',
      zh: '欧普苏丹深夜亚洲厨房。新鲜寿司与热烈风味相伴至凌晨04:00。',
      ru: 'Азиатская ночная кухня в Эйюпсултане. Свежие суши и горячие блюда до 04:00 утра.'
    }
  };

  const l = (key) => labels[key]?.[lang] || labels[key]?.en || labels[key]?.tr || '';
  const phoneClean = restaurantInfo.phone.replace(/[^0-9]/g, '');

  return (
    <footer className="main-footer" role="contentinfo">
      <div className="main-footer__inner">
        {/* Column 1: Logo & Brand Manifesto */}
        <div className="main-footer__col main-footer__col--logo">
          <Link href="/" aria-label="Lucky Sushi & Chinese Home">
            <Image 
              src="/logo-dark-mode.png" 
              alt="Lucky Sushi & Chinese Official Logo"
              width={160}
              height={110}
              className="main-footer__logo-img"
            />
          </Link>
          <p style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--mist-beige)', lineHeight: 1.5, maxWidth: '280px' }}>
            {l('tagline')}
          </p>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="main-footer__col main-footer__col--links">
          <Link href="/" className="main-footer__link">{tUI('nav_home')}</Link>
          <Link href="/menu" className="main-footer__link">{l('orderMenu')}</Link>
          <Link href="/branches" className="main-footer__link">{tUI('nav_branches') || l('branches')}</Link>
          <Link href="/about" className="main-footer__link">{l('aboutUs')}</Link>
          <Link href="/kvkk" className="main-footer__link">{lang === 'ar' ? 'الخصوصية (KVKK)' : lang === 'tr' ? 'Gizlilik & KVKK' : 'Privacy & KVKK'}</Link>
        </div>

        {/* Column 3: Contact & Hours */}
        <div className="main-footer__col main-footer__col--contact">
          <div className="main-footer__info-block">
            <h4>{l('phone')}</h4>
            <p>
              <a href={`tel:${phoneClean}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                {restaurantInfo.phone}
              </a>
            </p>
          </div>
          <div className="main-footer__info-block">
            <h4>{l('hours')}</h4>
            <p style={{ color: '#4ade80', fontWeight: 600 }}>
              {t(restaurantInfo, 'hours')}
            </p>
          </div>
          <div className="main-footer__info-block">
            <h4>{l('hq')}</h4>
            <p>{t(restaurantInfo, 'address')}</p>
          </div>
        </div>

        {/* Column 4: Store Image & Verified Socials */}
        <div className="main-footer__col main-footer__col--store">
          <div className="main-footer__store-img-wrap">
            <Image 
              src="/images/floter.jpg" 
              alt="Lucky Sushi & Chinese Restaurant Alibeyköy Eyüpsultan"
              width={350}
              height={200}
              className="main-footer__store-img"
            />
          </div>
          <div className="main-footer__socials" role="group" aria-label="Social media & direct channels">
            <a 
              href="https://www.instagram.com/lucky.sushi_chinese/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Lucky Sushi & Chinese Instagram"
              title="Instagram @lucky.sushi_chinese"
            >
              <FaInstagram />
            </a>
            <a 
              href={`https://wa.me/${phoneClean}?text=${encodeURIComponent('Merhaba Lucky Sushi & Chinese, sipariş vermek istiyorum.')}`}
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Order on WhatsApp"
              title="WhatsApp Sipariş"
              style={{ color: '#22c55e' }}
            >
              <FaWhatsapp />
            </a>
            <a 
              href={restaurantInfo.google_maps_url || restaurantInfo.branches[0].map}
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Google Maps Location"
              title="Google Haritalar"
            >
              <FaMapLocationDot />
            </a>
            <a 
              href={`tel:${phoneClean}`}
              aria-label="Call Directly"
              title="Doğrudan Ara"
            >
              <FaPhone />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="main-footer__bottom">
        <p>© {new Date().getFullYear()} Lucky Sushi & Chinese. {l('rights')}</p>
      </div>
    </footer>
  );
}
