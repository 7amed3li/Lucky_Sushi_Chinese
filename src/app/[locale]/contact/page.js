'use client';

import React from 'react';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import { useLang } from '@/context/LangContext';
import { branchesData } from '@/data/branchesData';
import { restaurantInfo } from '@/data/menuData';
import { Link } from '@/i18n/navigation';
import { FaPhone, FaWhatsapp, FaInstagram, FaMapLocationDot, FaArrowRight, FaClock } from 'react-icons/fa6';
import { LuStore, LuBike } from 'react-icons/lu';

export default function ContactPage() {
  const { lang, dir } = useLang();

  const labels = {
    badge: {
      tr: 'Hızlı İletişim & Sipariş',
      en: 'Quick Contact & Orders',
      ar: 'تواصل سريع وطلب',
      zh: '快捷联系与订餐',
      ru: 'Быстрая связь и заказы',
    },
    title: {
      tr: 'İletişim & Şube Hatlarımız',
      en: 'Contact & Branch Phone Lines',
      ar: 'معلومات التواصل وخطوط الفروع',
      zh: '联系方式与分店热线',
      ru: 'Контакты и телефоны филиалов',
    },
    subtitle: {
      tr: 'Sipariş vermek, soru sormak veya şubelerimize ulaşmak için doğrudan telefon veya WhatsApp üzerinden bizimle iletişime geçebilirsiniz.',
      en: 'Get in touch directly via phone or WhatsApp to place an order, ask questions, or reach our locations.',
      ar: 'تواصل معنا مباشرة عبر الهاتف أو الواتساب لتقديم طلب أو الاستفسار أو زيارة فروعنا.',
      zh: '您可以通过电话或 WhatsApp 直接与我们联系，以便在线订餐、咨询或获取分店信息。',
      ru: 'Свяжитесь с нами напрямую по телефону или WhatsApp, чтобы сделать заказ или задать вопрос.',
    },
    callNow: {
      tr: 'Hemen Ara',
      en: 'Call Now',
      ar: 'اتصل الآن',
      zh: '立即拨打',
      ru: 'Позвонить',
    },
    whatsappOrder: {
      tr: 'WhatsApp ile Sipariş Ver',
      en: 'Order via WhatsApp',
      ar: 'اطلب عبر واتساب',
      zh: '通过 WhatsApp 订餐',
      ru: 'Заказ в WhatsApp',
    },
    directions: {
      tr: 'Yol Tarifi Al',
      en: 'Get Directions',
      ar: 'الاتجاهات على الخريطة',
      zh: '获取路线',
      ru: 'Маршрут на карте',
    },
    viewBranches: {
      tr: 'Şube Detayları & Teslimat Haritası →',
      en: 'Branch Details & Delivery Map →',
      ar: 'تفاصيل الفروع وخريطة التوصيل ←',
      zh: '查看所有分店详情与配送地图 →',
      ru: 'Подробности филиалов и зона доставки →',
    },
    generalInquiry: {
      tr: 'Genel İletişim & Sosyal Medya',
      en: 'General Inquiries & Social Media',
      ar: 'استفسارات عامة والتواصل الاجتماعي',
      zh: '综合咨询与社交媒体',
      ru: 'Общие вопросы и соцсети',
    },
  };

  const l = (key) => labels[key]?.[lang] || labels[key]?.en || labels[key]?.tr || '';

  return (
    <>
      <Header />
      <CartDrawer />
      <main id="main-content" style={{ minHeight: '80vh', backgroundColor: 'var(--color-background)', padding: 'clamp(40px, 6vw, 64px) var(--page-pad)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          
          {/* Header Block */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(212, 163, 115, 0.15)',
              color: 'var(--color-accent, #D4A373)',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}>
              {l('badge')}
            </span>
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 800,
              color: 'var(--color-text-primary)',
              margin: '0 0 14px 0',
              lineHeight: 1.25,
            }}>
              {l('title')}
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              color: 'var(--color-text-secondary)',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}>
              {l('subtitle')}
            </p>
          </div>

          {/* Branch Contact Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '40px',
          }}>
            {branchesData.map((branch) => {
              const name = branch[`name_${lang}`] || branch.name_tr;
              const badge = branch[`badge_${lang}`] || branch.badge_tr;
              const address = branch[`address_${lang}`] || branch.address_tr;
              const hours = branch[`hours_${lang}`] || branch.hours_tr;
              const phoneClean = branch.phone.replace(/[^0-9]/g, '');

              return (
                <article
                  key={branch.id}
                  style={{
                    backgroundColor: 'var(--color-brand-dark, #1B1813)',
                    color: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(212, 163, 115, 0.2)',
                        color: 'var(--color-accent, #D4A373)',
                      }}>
                        {badge}
                      </span>
                      {branch.type === 'restaurant' ? <LuStore size={18} color="var(--color-accent, #D4A373)" /> : <LuBike size={18} color="var(--color-accent, #D4A373)" />}
                    </div>

                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 10px 0', color: '#F6F1E8' }}>
                      {name}
                    </h2>

                    <p style={{ fontSize: '0.88rem', color: 'rgba(246, 241, 232, 0.75)', lineHeight: 1.5, margin: '0 0 12px 0' }}>
                      {address}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--color-accent, #D4A373)', marginBottom: '20px' }}>
                      <FaClock size={13} />
                      <span>{hours}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a
                      href={`tel:${branch.phone}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                      }}
                    >
                      <FaPhone size={14} />
                      <span>{branch.phone}</span>
                    </a>

                    <a
                      href={`https://wa.me/${phoneClean}?text=${encodeURIComponent(
                        lang === 'ar' ? 'مرحباً، أود الاستفسار والطلب من لاكي سوشي صيني.' :
                        lang === 'en' ? 'Hello, I would like to place an order or ask a question.' :
                        lang === 'ru' ? 'Здравствуйте, хочу сделать заказ или задать вопрос.' :
                        lang === 'zh' ? '您好，我想咨询点餐。' :
                        'Merhaba, bilgi almak veya sipariş vermek istiyorum.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px',
                        borderRadius: '8px',
                        backgroundColor: '#25D366',
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                      }}
                    >
                      <FaWhatsapp size={16} />
                      <span>{l('whatsappOrder')}</span>
                    </a>

                    {branch.allowDirections && branch.map && (
                      <a
                        href={branch.map}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          padding: '8px',
                          color: 'var(--color-accent, #D4A373)',
                          textDecoration: 'none',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                        }}
                      >
                        <FaMapLocationDot size={13} />
                        <span>{l('directions')}</span>
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Secondary General Info & Social */}
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.03)',
            borderRadius: '16px',
            padding: '24px 30px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
          }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 6px 0', color: 'var(--color-text-primary)' }}>
                {l('generalInquiry')}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                Instagram: <a href={restaurantInfo.instagram_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent, #D4A373)', fontWeight: 600 }}>{restaurantInfo.instagram}</a>
                {' · '}
                Tel: <a href="tel:+902124276097" style={{ color: 'var(--color-text-primary)', textDecoration: 'none', fontWeight: 600 }}>+90 (212) 427 60 97</a>
              </p>
            </div>

            <Link
              href="/branches"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--color-brand-primary, #C8102E)',
                fontWeight: 700,
                fontSize: '0.92rem',
                textDecoration: 'none',
              }}
            >
              <span>{l('viewBranches')}</span>
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}
