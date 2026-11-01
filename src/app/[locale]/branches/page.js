'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useLang } from '@/context/LangContext';
import { useBranch } from '@/context/BranchContext';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import { branchesData } from '@/data/branchesData';
import { 
  FaWhatsapp, FaPhone, FaMapLocationDot, FaLocationDot,
  FaArrowRight, FaCheck
} from 'react-icons/fa6';
import { GiSushis } from 'react-icons/gi';
import { LuStore, LuBike, LuChefHat, LuClock, LuMapPin, LuInfo, LuPhoneCall } from 'react-icons/lu';

export default function BranchesPage() {
  const { lang, dir } = useLang();
  const { selectedBranchId, selectBranch } = useBranch();
  const isRtl = dir === 'rtl';

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
      tr: 'İstanbul’da taze sushi ve sıcak Asya lezzetleri için size en yakın şubemizden sipariş verebilir veya bizi ziyaret edebilirsiniz.',
      en: 'Whenever you crave fresh sushi and sizzling Asian dishes in Istanbul, order from your nearest branch or visit us in person.',
      ar: 'أينما كنتم في إسطنبول، يمكنكم الاستمتاع بأشهى أطباق السوشي والنكهات الآسيوية الساخنة عبر الطلب من أقرب فرع أو زيارتنا.',
      zh: '在伊斯坦布尔，无论何时想品尝新鲜寿司与正宗亚洲风味，都可以前往就近分店或直接在线订餐。',
      ru: 'Когда вам захочется свежих суши и горячих азиатских блюд в Стамбуле, закажите в ближайшем филиале или посетите нас.',
    },
    addressLabel: {
      tr: 'Adres',
      en: 'Address',
      ar: 'العنوان',
      zh: '地址',
      ru: 'Адрес',
    },
    hoursLabel: {
      tr: 'Çalışma Saatleri',
      en: 'Working Hours',
      ar: 'ساعات العمل',
      zh: '营业时间',
      ru: 'Часы работы',
    },
    coverageLabel: {
      tr: 'Teslimat Bölgesi',
      en: 'Delivery Coverage',
      ar: 'نطاق التوصيل',
      zh: '外送范围',
      ru: 'Зона доставки',
    },
    callOrderBtn: {
      tr: 'Sipariş Hattı',
      en: 'Direct Call',
      ar: 'اتصال مباشر',
      zh: '直拨热线',
      ru: 'Звонок в филиал',
    },
    landlineBtn: {
      tr: 'Sabit Hat (Danışma)',
      en: 'Landline (Info)',
      ar: 'الهاتف الأرضي (استفسارات)',
      zh: '座机电话 (咨询)',
      ru: 'Городской (Справка)',
    },
    whatsappBtn: {
      tr: 'WhatsApp ile Sipariş Ver',
      en: 'Order via WhatsApp',
      ar: 'اطلب عبر واتساب',
      zh: 'WhatsApp 下单',
      ru: 'Заказ через WhatsApp',
    },
    selectBranchBtn: {
      tr: 'Bu Şubeyi Sipariş İçin Seç',
      en: 'Select for Ordering',
      ar: 'اختر هذا الفرع للطلب',
      zh: '选择此分店点餐',
      ru: 'Выбрать филиал для заказа',
    },
    selectedBadge: {
      tr: 'Seçili Şube',
      en: 'Selected Branch',
      ar: 'الفرع المختار حالياً',
      zh: '已选择该分店',
      ru: 'Выбранный филиал',
    },
    mapDirectionsBtn: {
      tr: 'Haritada Gör & Yol Tarifi',
      en: 'View on Map & Directions',
      ar: 'الموقع على الخريطة والاتجاهات',
      zh: '地图定位与路线',
      ru: 'На карте и маршрут',
    },
    menuDishNote: {
      tr: 'Fotoğraf: Şube Menü Sunumu',
      en: 'Photo: Menu Presentation',
      ar: 'صورة توضيحية: تقديم من المنيو',
      zh: '示意图：特色餐品呈现',
      ru: 'Фото: Блюдо из меню филиала',
    },
    locationPhotoNote: {
      tr: 'Fotoğraf: Restoran Girişi',
      en: 'Photo: Restaurant Storefront',
      ar: 'صورة: واجهة المطعم',
      zh: '照片：餐厅实景门头',
      ru: 'Фото: Фасад ресторана',
    },
  };

  const l = (key) => labels[key]?.[lang] || labels[key]?.en || labels[key]?.tr || '';

  const getTypeMeta = (branch) => {
    if (branch.type === 'restaurant') {
      return {
        icon: <LuStore aria-hidden="true" />,
        badgeBg: 'rgba(40, 122, 63, 0.14)',
        textColor: '#1f5d30',
        borderColor: 'rgba(40, 122, 63, 0.35)',
      };
    }
    if (branch.type === 'pickup-delivery') {
      return {
        icon: <LuBike aria-hidden="true" />,
        badgeBg: 'rgba(180, 83, 9, 0.12)',
        textColor: '#92400e',
        borderColor: 'rgba(180, 83, 9, 0.3)',
      };
    }
    return {
      icon: <LuChefHat aria-hidden="true" />,
      badgeBg: 'rgba(190, 24, 93, 0.12)',
      textColor: '#9d174d',
      borderColor: 'rgba(190, 24, 93, 0.3)',
    };
  };

  return (
    <>
      <Header />
      <CartDrawer />

      <main style={{ background: 'var(--color-background, #F6F1E8)', minHeight: '100vh', paddingBottom: 'var(--sp-12, 60px)' }}>
        
        {/* ── 1. Page Hero Header ── */}
        <section style={{ padding: 'var(--sp-10, 40px) var(--page-pad, 20px) var(--sp-6, 24px)', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '820px', margin: '0 auto' }}>
            <span className="home-section-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <FaLocationDot aria-hidden="true" />
              <span>{l('badge')}</span>
            </span>
            <h1 style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: 'clamp(2rem, 4.5vw, 3rem)', 
              color: 'var(--color-text-primary)', 
              marginBottom: 'var(--sp-3, 12px)',
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
        <section className="container" style={{ padding: '0 var(--page-pad, 20px)', marginTop: 'var(--sp-4, 16px)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--sp-8, 30px)',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {branchesData.map((branch, index) => {
              const whatsappClean = branch.whatsapp.replace(/[^0-9]/g, '');
              const phoneClean = branch.phoneClean || branch.phone.replace(/[^0-9]/g, '');
              const landlineClean = branch.landlineClean;
              const typeMeta = getTypeMeta(branch);
              const branchBadge = branch[`badge_${lang}`] || branch.badge_tr;
              const branchDesc = branch[`desc_${lang}`] || branch.desc_tr;
              const branchAddress = branch[`address_${lang}`] || branch.address;
              const branchName = branch[`name_${lang}`] || branch.name_tr;
              const branchHours = branch[`hours_${lang}`] || branch.hours_tr;
              const branchCoverage = branch[`coverage_${lang}`] || branch.coverage_tr;
              const isSelected = selectedBranchId === branch.id;

              const whatsappGreeting = encodeURIComponent(
                lang === 'ar' ? `مرحباً لاكي سوشي صيني (${branchName})، أود تقديم طلب من المنيو.` :
                lang === 'en' ? `Hello Lucky Sushi & Chinese (${branchName}), I would like to place an order from the menu.` :
                lang === 'ru' ? `Здравствуйте, Lucky Sushi & Chinese (${branchName})! Хочу сделать заказ по меню.` :
                lang === 'zh' ? `您好 Lucky Sushi & Chinese (${branchName})，我想根据菜单点餐。` :
                `Merhaba Lucky Sushi & Chinese (${branchName}), menüden sipariş vermek istiyorum.`
              );

              return (
                <article
                  key={branch.id}
                  id={`branch-${branch.id}`}
                  style={{
                    background: 'var(--color-surface, #FFFFFF)',
                    borderRadius: '16px',
                    border: isSelected ? '2px solid #287A3F' : '1px solid var(--color-border, #E6DEC9)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: isSelected ? '0 10px 28px rgba(40, 122, 63, 0.2)' : 'var(--shadow-md, 0 6px 20px rgba(0,0,0,0.06))',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {/* Branch Visual Banner */}
                  <div style={{ position: 'relative', width: '100%', height: '200px', background: 'rgba(0,0,0,0.05)' }}>
                    <Image
                      src={branch.image || '/images/floter.jpg'}
                      alt={`${branchName} - Lucky Sushi & Chinese`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      priority={index === 0}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(22, 20, 26, 0.8) 0%, rgba(22, 20, 26, 0.2) 60%, transparent 100%)',
                      }}
                    />

                    {/* Image Caption Note: Distinguish restaurant storefront from dish presentation */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        insetInlineStart: '12px',
                        fontSize: '0.72rem',
                        color: 'rgba(255, 255, 255, 0.9)',
                        background: 'rgba(0, 0, 0, 0.55)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      {branch.imageType === 'location' ? l('locationPhotoNote') : l('menuDishNote')}
                    </div>

                    {/* Active Selected Pill */}
                    {isSelected && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          insetInlineEnd: '12px',
                          background: '#287A3F',
                          color: '#FFFFFF',
                          padding: '5px 12px',
                          borderRadius: '20px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        }}
                      >
                        <FaCheck size={11} />
                        <span>{l('selectedBadge')}</span>
                      </div>
                    )}
                  </div>

                  {/* Standardized 5-Tier Content Body */}
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, gap: '14px' }}>
                    
                    {/* 1. Branch Name & Service Type Badge */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                        <h2 style={{ 
                          fontFamily: 'var(--font-serif)', 
                          fontSize: '1.35rem', 
                          color: 'var(--color-text-primary)',
                          margin: 0,
                          lineHeight: 1.2
                        }}>
                          {branchName}
                        </h2>
                        
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '4px 9px',
                            background: typeMeta.badgeBg,
                            borderRadius: '6px',
                            border: `1px solid ${typeMeta.borderColor}`,
                            color: typeMeta.textColor,
                            fontSize: '0.76rem',
                            fontWeight: 700,
                          }}
                        >
                          {typeMeta.icon}
                          <span>{branchBadge}</span>
                        </span>
                      </div>

                      <p style={{ 
                        color: 'var(--color-text-secondary)', 
                        fontSize: '0.86rem', 
                        lineHeight: 1.5, 
                        margin: 0 
                      }}>
                        {branchDesc}
                      </p>
                    </div>

                    {/* 2. Working Hours (Standardized with Next Day Notice) */}
                    <div style={{
                      background: 'rgba(40, 122, 63, 0.06)',
                      border: '1px solid rgba(40, 122, 63, 0.18)',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '9px',
                      color: '#1f5d30',
                    }}>
                      <LuClock size={16} style={{ flexShrink: 0 }} aria-hidden="true" />
                      <div>
                        <span style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700, opacity: 0.85 }}>
                          {l('hoursLabel')}
                        </span>
                        <span style={{ fontSize: '0.86rem', fontWeight: 700, lineHeight: 1.3 }}>
                          {branchHours}
                        </span>
                      </div>
                    </div>

                    {/* 3. Address */}
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.025)',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      border: '1px solid var(--color-border-light, #EDE6D8)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '9px',
                    }}>
                      <LuMapPin style={{ color: 'var(--color-brand-primary, #287A3F)', marginTop: '2px', flexShrink: 0 }} size={16} />
                      <div style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>
                        <strong style={{ color: 'var(--color-text-primary)', display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.04em', opacity: 0.8, marginBottom: '2px' }}>
                          {l('addressLabel')}
                        </strong>
                        <span>{branchAddress}</span>
                      </div>
                    </div>

                    {/* 4. Delivery Coverage Area (When Available) */}
                    {branchCoverage && (
                      <div style={{
                        background: 'rgba(180, 83, 9, 0.05)',
                        border: '1px solid rgba(180, 83, 9, 0.18)',
                        borderRadius: '8px',
                        padding: '9px 12px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '0.82rem',
                        color: 'var(--color-text-secondary)',
                      }}>
                        <LuBike size={15} style={{ color: '#b45309', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                        <div>
                          <strong style={{ color: '#92400e', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '2px' }}>
                            {l('coverageLabel')}
                          </strong>
                          <span>{branchCoverage}</span>
                        </div>
                      </div>
                    )}

                    {/* Spacer */}
                    <div style={{ marginTop: 'auto' }} />

                    {/* 5. Standardized Unified Action Buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '6px' }}>
                      
                      {/* Select This Branch */}
                      <button
                        type="button"
                        onClick={() => selectBranch(branch.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          padding: '10px',
                          borderRadius: '8px',
                          border: isSelected ? '1.5px solid #287A3F' : '1px solid var(--color-border)',
                          background: isSelected ? 'rgba(40, 122, 63, 0.12)' : 'rgba(0, 0, 0, 0.03)',
                          color: isSelected ? '#1f5d30' : 'var(--color-text-primary)',
                          fontWeight: 700,
                          fontSize: '0.86rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {isSelected ? <FaCheck size={13} /> : <LuMapPin size={14} aria-hidden="true" />}
                        <span>{isSelected ? l('selectedBadge') : l('selectBranchBtn')}</span>
                      </button>

                      {/* Primary WhatsApp Order Button */}
                      <a
                        href={`https://wa.me/${whatsappClean}?text=${whatsappGreeting}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => selectBranch(branch.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          padding: '11px 14px',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          textDecoration: 'none',
                          borderRadius: '8px',
                          background: '#25D366',
                          color: '#ffffff',
                          boxShadow: '0 3px 10px rgba(37, 211, 102, 0.25)',
                        }}
                      >
                        <FaWhatsapp size={18} aria-hidden="true" />
                        <span>{l('whatsappBtn')}</span>
                      </a>

                      {/* Phone Lines Block: Clear distinction between Direct Order & General Info */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <a
                          href={`tel:${phoneClean}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '9px 12px',
                            background: 'rgba(0, 0, 0, 0.03)',
                            border: '1px solid var(--color-border)',
                            borderRadius: '8px',
                            color: 'var(--color-text-primary)',
                            fontSize: '0.84rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                          }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <FaPhone size={13} style={{ color: 'var(--color-brand-primary)' }} aria-hidden="true" />
                            <span>{l('callOrderBtn')}</span>
                          </span>
                          <span style={{ fontFamily: 'monospace', fontWeight: 700, direction: 'ltr' }}>{branch.phone}</span>
                        </a>

                        {branch.landline && (
                          <a
                            href={`tel:${landlineClean}`}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '8px 12px',
                              background: 'transparent',
                              border: '1px dashed var(--color-border)',
                              borderRadius: '8px',
                              color: 'var(--color-text-secondary)',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              textDecoration: 'none',
                            }}
                          >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <LuPhoneCall size={13} aria-hidden="true" />
                              <span>{l('landlineBtn')}</span>
                            </span>
                            <span style={{ fontFamily: 'monospace', fontWeight: 700, direction: 'ltr' }}>{branch.landline}</span>
                          </a>
                        )}
                      </div>

                      {/* Map Location Link (Active and available for all branches including Reşitpaşa) */}
                      {branch.map && (
                        <a
                          href={branch.map}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '7px',
                            padding: '9px 12px',
                            background: 'rgba(40, 122, 63, 0.06)',
                            border: '1px solid rgba(40, 122, 63, 0.25)',
                            borderRadius: '8px',
                            color: '#1f5d30',
                            fontSize: '0.84rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <FaMapLocationDot size={15} aria-hidden="true" />
                          <span>{l('mapDirectionsBtn')}</span>
                        </a>
                      )}

                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        </section>

      </main>
    </>
  );
}
