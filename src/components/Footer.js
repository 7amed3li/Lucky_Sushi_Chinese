'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '@/context/LangContext';
import { restaurantInfo } from '@/data/menuData';
import { FaInstagram, FaTiktok, FaFacebookF, FaXTwitter, FaThreads, FaYoutube } from 'react-icons/fa6';

export default function Footer() {
  const { tUI } = useLang();
  
  return (
    <footer className="main-footer">
      <div className="main-footer__inner">
        {/* Column 1: Logo */}
        <div className="main-footer__col main-footer__col--logo">
          <Image 
            src="/logo-full-badge.png" 
            alt="Lucky Sushi Chinese Logo"
            width={200}
            height={150}
            className="main-footer__logo-img"
          />
        </div>

        {/* Column 2: Links */}
        <div className="main-footer__col main-footer__col--links">
          <Link href="/" className="main-footer__link">{tUI('nav_home')}</Link>
          <Link href="/menu" className="main-footer__link">Sipariş Ver / {tUI('nav_menu')}</Link>
          <Link href="/about" className="main-footer__link">Hakkımızda</Link>
          <Link href="/contact" className="main-footer__link">Şubelerimiz / İletişim</Link>
        </div>

        {/* Column 3: Contact Info */}
        <div className="main-footer__col main-footer__col--contact">
          <div className="main-footer__info-block">
            <h4>Telefon</h4>
            <p>{restaurantInfo.phone}</p>
          </div>
          <div className="main-footer__info-block">
            <h4>E-mail</h4>
            <p>info@luckysushichinese.com</p>
          </div>
          <div className="main-footer__info-block">
            <h4>Merkez</h4>
            <p>{restaurantInfo.branches[0].address}</p>
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
          <div className="main-footer__socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
            <a href="https://threads.net" target="_blank" rel="noopener noreferrer"><FaThreads /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
