'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useLang } from '@/context/LangContext';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import { restaurantInfo } from '@/data/menuData';
import { 
  FaWhatsapp, FaPhone, FaMapLocationDot, FaLocationDot, 
  FaUtensils, FaMotorcycle, FaKitchenSet, FaCircleInfo, FaArrowRight, FaClock
} from 'react-icons/fa6';
import { GiSushis } from 'react-icons/gi';

export default function BranchesPage() {
  const { lang, t, dir } = useLang();

  const labels = {
    badge: {
      tr: 'İstanbul Lokasyonlarımız',
      en: 'Our Istanbul Locations',
      ar: 'فروعنا في إسطنبول',
      zh: '伊斯坦布尔分店指南',
      ru: 'Наши филиалы в Стамбуле',
    },
    title: {
      tr: 'Lucky Sushi & Chinese Şubeleri',
      en: 'Lucky Sushi & Chinese Branches',
      ar: 'فروع لاكي سوشي الصينية',
      zh: 'Lucky Sushi & Chinese 分店一览',
      ru: 'Филиалы Lucky Sushi & Chinese',
    },
    subtitle: {
      tr: 'İstanbul’da canınız taze sushi ve sıcak Asya lezzetleri çektiğinde size en yakın şubemizden sipariş verebilir veya bizi ziyaret edebilirsiniz.',
      en: 'Whenever you crave fresh sushi and sizzling Asian dishes in Istanbul, order from your nearest branch or visit us in person.',
      ar: 'أينما كنتم في إسطنبول، يمكنكم الاستمتاع بأشهى أطباق السوشي والنكهات الآسيوية الساخنة عبر الطلب من أقرب فرع أو زيارتنا.',
      zh: '在伊斯坦布尔，无论何时想品尝新鲜寿司与正宗亚洲风味，都可以前往就近分店或直接在线订餐。',
      ru: 'Когда вам захочется свежих суши и горячих азиатских блюд в Стамбуле, закажите в ближайшем филиале или посетите нас.',
    },
    serviceType: {
      tr: 'Hizmet Türü',
      en: 'Service Type',
      ar: 'نوع الخدمة',
      zh: '服务类型',
      ru: 'Тип обслуживания',
    },
    addressLabel: {
      tr: 'Adres',
      en: 'Address',
      ar: 'العنوان',
      zh: '地址',
      ru: 'Адрес',
    },
    callBtn: {
      tr: 'Ara',
      en: 'Call',
      ar: 'اتصال',
      zh: '致电',
      ru: 'Позвонить',
    },
    whatsappBtn: {
      tr: 'WhatsApp ile Sipariş Ver',
      en: 'Order via WhatsApp',
      ar: 'اطلب عبر واتساب',
      zh: 'WhatsApp 下单',
      ru: 'Заказ через WhatsApp',
    },
    whatsappDeliveryBtn: {
      tr: 'Paket Servis Siparişi (WhatsApp)',
      en: 'Delivery Order (WhatsApp)',
      ar: 'طلب توصيل عبر واتساب',
      zh: '外送下单 (WhatsApp)',
      ru: 'Заказать доставку (WhatsApp)',
    },
    directionsBtn: {
      tr: 'Yol Tarifi Al',
      en: 'Get Directions',
      ar: 'الاتجاهات',
      zh: '导航路线',
      ru: 'Маршрут',
    },
    deliveryOnlyNotice: {
      tr: 'Bu şube yalnızca paket servis mutfağıdır; oturma ve masa servisi bulunmamaktadır. Siparişlerinizi WhatsApp veya telefon ile iletebilirsiniz.',
      en: 'This location is exclusively a delivery kitchen with no dine-in seating. Please place your delivery orders via WhatsApp or phone.',
      ar: 'هذا الفرع عبارة عن مطبخ توصيل فقط ولا يحتوي على صالة للجلوس. يرجى الطلب عبر واتساب أو الاتصال للاستفسار والتوصيل.',
      zh: '此分店仅为外送厨房，不设堂食坐席。请通过WhatsApp或电话进行订餐外送。',
      ru: 'Этот филиал работает исключительно как кухня доставки (без посадочных мест). Заказывайте через WhatsApp или по телефону.',
    },
    viewMenuBtn: {
      tr: 'Menüyü İncele',
      en: 'View Menu',
      ar: 'تصفح المنيو',
      zh: '浏览菜单',
      ru: 'Смотреть меню',
    },
  };

  const l = (key) => labels[key]?.[lang] || labels[key]?.en || labels[key]?.tr || '';

  // Type helper for semantic badges & icons
  const getTypeMeta = (branch) => {
    if (branch.type === 'restaurant') {
      return {
        icon: <FaUtensils aria-hidden="true" />,
        badgeColor: 'rgba(40, 122, 63, 0.12)',
        textColor: '#4ade80',
        borderColor: 'rgba(74, 222, 128, 0.3)',
      };
    }
    if (branch.type === 'pickup-delivery') {
      return {
        icon: <FaMotorcycle aria-hidden="true" />,
        badgeColor: 'rgba(212, 163, 115, 0.12)',
        textColor: '#e9c46a',
        borderColor: 'rgba(233, 196, 106, 0.3)',
      };
    }
    // delivery-only
    return {
      icon: <FaKitchenSet aria-hidden="true" />,
      badgeColor: 'rgba(230, 57, 70, 0.12)',
      textColor: '#f28482',
      borderColor: 'rgba(242, 132, 130, 0.3)',
    };
  };

  return (
    <>
      <Header />

      <main style={{ background: 'var(--color-background)', minHeight: '100vh', paddingBottom: 'var(--sp-12)' }}>
        
        {/* ── 1. Page Hero Header ── */}
        <section style={{ padding: 'var(--sp-10) var(--page-pad) var(--sp-6)', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '820px', margin: '0 auto' }}>
            <span className="home-section-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <FaLocationDot aria-hidden="true" />
              <span>{l('badge')}</span>
            </span>
            <h1 style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: 'clamp(2.1rem, 4.8vw, 3.2rem)', 
              color: 'var(--color-text-primary)', 
              marginBottom: 'var(--sp-3)',
              lineHeight: 1.2
            }}>
              {l('title')}
            </h1>
            <p style={{ 
              color: 'var(--color-text-secondary)', 
              fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', 
              lineHeight: 1.7, 
              margin: '0 auto',
              maxWidth: '640px'
            }}>
              {l('subtitle')}
            </p>
          </div>
        </section>

        {/* ── 2. Branches Directory Grid ── */}
        <section className="container" style={{ padding: '0 var(--page-pad)', marginTop: 'var(--sp-4)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--sp-8)',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {restaurantInfo.branches.map((branch, index) => {
              const whatsappClean = branch.whatsapp.replace(/[^0-9]/g, '');
              const phoneClean = branch.phone.replace(/[^0-9]/g, '');
              const typeMeta = getTypeMeta(branch);
              const branchBadge = branch[`badge_${lang}`] || branch.badge_tr;
              const branchDesc = branch[`desc_${lang}`] || branch.desc_tr;
              const branchAddress = branch[`address_${lang}`] || branch.address;

              const whatsappGreeting = `Merhaba Lucky Sushi & Chinese (${branch.name}), sipariş vermek istiyorum.`;

              return (
                <article
                  key={branch.id}
                  id={`branch-${branch.id}`}
                  style={{
                    background: 'var(--color-surface)',
                    borderRadius: '16px',
                    border: '1px solid var(--color-border)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'var(--shadow-md, 0 8px 24px rgba(0,0,0,0.18))',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                  }}
                >
                  {/* Branch Image with Clean Overlay Badge */}
                  <div style={{ position: 'relative', width: '100%', height: '220px', background: 'rgba(255,255,255,0.02)' }}>
                    <Image
                      src={branch.image || '/images/floter.jpg'}
                      alt={`${branch.name} - Lucky Sushi & Chinese`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      priority={index === 0}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(17, 24, 39, 0.85) 0%, rgba(17, 24, 39, 0.2) 60%, transparent 100%)',
                      }}
                    />

                    {/* Service Type Badge on Image */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '14px',
                        insetInlineStart: '14px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '7px',
                        padding: '6px 12px',
                        background: 'rgba(15, 23, 42, 0.85)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '20px',
                        border: `1px solid ${typeMeta.borderColor}`,
                        color: typeMeta.textColor,
                        fontSize: '0.8rem',
                        fontWeight: 700,
                      }}
                    >
                      {typeMeta.icon}
                      <span>{branchBadge}</span>
                    </div>

                    {/* Branch Number Indicator */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '14px',
                        insetInlineEnd: '14px',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(15, 23, 42, 0.85)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                      }}
                    >
                      {index + 1}
                    </div>
                  </div>

                  {/* Branch Body Content */}
                  <div style={{ padding: 'var(--sp-6)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    {/* Branch Title & Hours */}
                    <div style={{ marginBottom: '12px' }}>
                      <h2 style={{ 
                        fontFamily: 'var(--font-serif)', 
                        fontSize: '1.4rem', 
                        color: 'var(--color-text-primary)',
                        marginBottom: '6px'
                      }}>
                        {branch.name}
                      </h2>
                      {branch.hours && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4ade80', fontSize: '0.84rem', fontWeight: 600 }}>
                          <FaClock size={13} aria-hidden="true" />
                          <span>{branch.hours}</span>
                        </div>
                      )}
                    </div>

                    {/* Service Description */}
                    <p style={{ 
                      color: 'var(--color-text-secondary)', 
                      fontSize: '0.9rem', 
                      lineHeight: 1.55, 
                      marginBottom: '16px' 
                    }}>
                      {branchDesc}
                    </p>

                    {/* Delivery-Only Banner (Clear notice for Reşitpaşa) */}
                    {!branch.allowDirections && (
                      <div
                        style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          border: '1.5px solid #ef4444',
                          borderRadius: '8px',
                          padding: '11px 13px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          marginBottom: '16px',
                        }}
                      >
                        <FaCircleInfo style={{ color: '#dc2626', marginTop: '2px', flexShrink: 0 }} size={17} />
                        <span style={{ fontSize: '0.84rem', color: '#b91c1c', fontWeight: 600, lineHeight: 1.5 }}>
                          {l('deliveryOnlyNotice')}
                        </span>
                      </div>
                    )}

                    {/* Address Block */}
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '8px',
                        padding: '10px 12px',
                        marginBottom: '18px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                      }}
                    >
                      <FaLocationDot style={{ color: 'var(--color-brand-primary)', marginTop: '3px', flexShrink: 0 }} size={15} />
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                        <strong style={{ color: 'var(--color-text-primary)', display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em', opacity: 0.8 }}>
                          {l('addressLabel')}
                        </strong>
                        <span>{branchAddress}</span>
                      </div>
                    </div>

                    {/* Spacer to align buttons at bottom */}
                    <div style={{ marginTop: 'auto' }} />

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {/* WhatsApp Primary Order Button */}
                      <a
                        href={`https://wa.me/${whatsappClean}?text=${encodeURIComponent(whatsappGreeting)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          padding: '12px 14px',
                          fontSize: '0.92rem',
                          fontWeight: 700,
                          textDecoration: 'none',
                          borderRadius: '8px',
                          background: '#25D366',
                          color: '#ffffff',
                          boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)',
                        }}
                      >
                        <FaWhatsapp size={19} aria-hidden="true" />
                        <span>{branch.allowDirections ? l('whatsappBtn') : l('whatsappDeliveryBtn')}</span>
                      </a>

                      {/* Secondary Buttons Row: Call & Directions (if applicable) */}
                      <div style={{ display: 'grid', gridTemplateColumns: branch.allowDirections ? '1fr 1fr' : '1fr', gap: '10px' }}>
                        <a
                          href={`tel:${phoneClean}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '7px',
                            padding: '10px 12px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--color-border)',
                            borderRadius: '8px',
                            color: 'var(--color-text-primary)',
                            fontSize: '0.86rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <FaPhone size={14} aria-hidden="true" />
                          <span>{l('callBtn')} ({branch.phone})</span>
                        </a>

                        {branch.allowDirections && (
                          <a
                            href={branch.map}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '7px',
                              padding: '10px 12px',
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid var(--color-border)',
                              borderRadius: '8px',
                              color: 'var(--color-text-primary)',
                              fontSize: '0.86rem',
                              fontWeight: 600,
                              textDecoration: 'none',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            <FaMapLocationDot size={15} aria-hidden="true" />
                            <span>{l('directionsBtn')}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* ── 3. Unified Contact & Hours Bar ── */}
          <div style={{ marginTop: 'var(--sp-10)' }}>
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
              border: '1px solid var(--color-border-light)',
              maxWidth: '1200px',
              margin: '0 auto',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(40, 122, 63, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-primary)', fontSize: '1.2rem' }}>
                  <FaClock />
                </div>
                <div>
                  <h3 style={{ color: 'var(--color-text-primary)', marginBottom: '2px', fontSize: '1.05rem', fontFamily: 'var(--font-serif)' }}>
                    {lang === 'ar' ? 'ساعات العمل الرسمية' : lang === 'tr' ? 'Çalışma Saatleri' : 'Working Hours'}
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{t(restaurantInfo, 'hours')}</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(40, 122, 63, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-primary)', fontSize: '1.2rem' }}>
                  <FaWhatsapp />
                </div>
                <div>
                  <h3 style={{ color: 'var(--color-text-primary)', marginBottom: '2px', fontSize: '1.05rem', fontFamily: 'var(--font-serif)' }}>
                    {lang === 'ar' ? 'المركز الرئيسي' : lang === 'tr' ? 'Merkez Şube' : 'Headquarters'}
                  </h3>
                  <a
                    href={`tel:${restaurantInfo.phone.replace(/[^0-9]/g, '')}`}
                    style={{ color: 'var(--color-brand-primary)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}
                  >
                    {restaurantInfo.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Menu Navigation CTA */}
          <div style={{ textAlign: 'center', marginTop: 'var(--sp-10)' }}>
            <Link
              href="/menu"
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                fontSize: '1rem',
                fontWeight: 700,
                textDecoration: 'none',
                borderRadius: '8px',
              }}
            >
              <GiSushis size={22} aria-hidden="true" />
              <span>{l('viewMenuBtn')}</span>
              <FaArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <CartDrawer />
    </>
  );
}
