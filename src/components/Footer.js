'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '@/context/LangContext';
import { restaurantInfo } from '@/data/menuData';
import { FaInstagram, FaTiktok, FaFacebookF, FaXTwitter, FaThreads, FaYoutube } from 'react-icons/fa6';

export default function Footer() {
  const { lang, t, tUI } = useLang();

  const labels = {
    phone: { tr: 'Telefon', en: 'Phone', ar: 'الهاتف', zh: '电话', ru: 'Телефон', fa: 'تلفن', fr: 'Téléphone' },
    email: { tr: 'E-posta', en: 'Email', ar: 'البريد الإلكتروني', zh: '邮箱', ru: 'Эл. почта', fa: 'ایمیل', fr: 'E-mail' },
    hq: { tr: 'Merkez', en: 'Headquarters', ar: 'المقر الرئيسي', zh: '总店', ru: 'Главный филиал', fa: 'شعبه مرکزی', fr: 'Siège' },
    orderMenu: { tr: 'Sipariş Ver / Menü', en: 'Order / Menu', ar: 'اطلب / القائمة', zh: '下单 / 菜单', ru: 'Заказ / Меню', fa: 'سفارش / منو', fr: 'Commander / Menu' },
    aboutUs: { tr: 'Hakkımızda', en: 'About Us', ar: 'من نحن', zh: '关于我们', ru: 'О нас', fa: 'درباره ما', fr: 'À propos' },
    branches: { tr: 'Şubelerimiz / İletişim', en: 'Branches / Contact', ar: 'فروعنا / اتصل بنا', zh: '分店 / 联系', ru: 'Филиалы / Контакты', fa: 'شعبات / تماس', fr: 'Nos Adresses / Contact' },
    rights: { tr: 'Tüm hakları saklıdır.', en: 'All rights reserved.', ar: 'جميع الحقوق محفوظة.', zh: '版权所有。', ru: 'Все права защищены.', fa: 'تمامی حقوق محفوظ است.', fr: 'Tous droits réservés.' },
  };

  const l = (key) => labels[key]?.[lang] || labels[key]?.en || '';

  return (
    <footer className="main-footer" role="contentinfo">
      <div className="main-footer__inner">
        {/* Column 1: Logo */}
        <div className="main-footer__col main-footer__col--logo">
          <Link href="/" aria-label="Lucky Sushi Chinese Home">
            <Image 
              src="/logo-dark-mode.png" 
              alt="Lucky Sushi Chinese Logo"
              width={160}
              height={110}
              className="main-footer__logo-img"
            />
          </Link>
        </div>

        {/* Column 2: Links */}
        <div className="main-footer__col main-footer__col--links">
          <Link href="/" className="main-footer__link">{tUI('nav_home')}</Link>
          <Link href="/menu" className="main-footer__link">{l('orderMenu')}</Link>
          <Link href="/about" className="main-footer__link">{l('aboutUs')}</Link>
          <Link href="/contact" className="main-footer__link">{l('branches')}</Link>
        </div>

        {/* Column 3: Contact Info */}
        <div className="main-footer__col main-footer__col--contact">
          <div className="main-footer__info-block">
            <h4>{l('phone')}</h4>
            <p>
              <a href={`tel:${restaurantInfo.phone.replace(/[^0-9+]/g, '')}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                {restaurantInfo.phone}
              </a>
            </p>
          </div>
          <div className="main-footer__info-block">
            <h4>{l('email')}</h4>
            <p>
              <a href="mailto:info@luckysushichinese.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                info@luckysushichinese.com
              </a>
            </p>
          </div>
          <div className="main-footer__info-block">
            <h4>{l('hq')}</h4>
            <p>{t(restaurantInfo, 'address')}</p>
          </div>
        </div>

        {/* Column 4: Store Image & Socials */}
        <div className="main-footer__col main-footer__col--store">
          <div className="main-footer__store-img-wrap">
            <Image 
              src="/images/floter.jpg" 
              alt="Lucky Sushi Chinese Store"
              width={350}
              height={200}
              className="main-footer__store-img"
            />
          </div>
          <div className="main-footer__socials" role="group" aria-label="Social media">
            <a href="https://instagram.com/lucky.sushi_chinese" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://tiktok.com/@lucky.sushi_chinese" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><FaTiktok /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"><FaXTwitter /></a>
            <a href="https://threads.net" target="_blank" rel="noopener noreferrer" aria-label="Threads"><FaThreads /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="main-footer__bottom">
        <p>© {new Date().getFullYear()} Lucky Sushi Chinese. {l('rights')}</p>
      </div>
    </footer>
  );
}
