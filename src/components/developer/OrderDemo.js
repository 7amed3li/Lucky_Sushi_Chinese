'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaSignal, FaWifi, FaBatteryFull, FaClock, FaClover } from 'react-icons/fa6';

const orderDemoData = {
  tr: {
    branches: [
      { id: 'alibeykoy', name: 'Alibeyköy', hours: '10:45 — 04:00' },
      { id: 'zeytinburnu', name: 'Zeytinburnu', hours: '11:00 — 03:00' },
      { id: 'sariyer', name: 'Reşitpaşa · Sarıyer', hours: '11:00 — 03:00' },
    ],
    products: [
      { id: 'canada', name: 'Canada Set', detail: '32 parça · sushi seti', image: '/images/set-canada.webp' },
      { id: 'ramen', name: 'Karidesli Ramen', detail: 'Sıcak mutfak · 1 kase', image: '/images/shrimp-ramen.webp' },
    ],
    branchLabel: 'SİPARİŞ ŞUBESİ',
    selectLabel: 'Size en yakın mutfağı seçin',
    hoursPrefix: 'Günlük servis saatleri ·',
    chefPick: 'ŞEFİN SEÇİMİ',
    nightFavs: 'Gece favorileri',
    menuLink: 'MENÜ ↗',
    disclaimer: 'Bu bir arayüz demosudur; gerçek sipariş göndermez.',
    viewMenu: 'Canlı menüye göz at',
  },
  en: {
    branches: [
      { id: 'alibeykoy', name: 'Alibeyköy', hours: '10:45 — 04:00' },
      { id: 'zeytinburnu', name: 'Zeytinburnu', hours: '11:00 — 03:00' },
      { id: 'sariyer', name: 'Reşitpaşa · Sarıyer', hours: '11:00 — 03:00' },
    ],
    products: [
      { id: 'canada', name: 'Canada Set', detail: '32 pcs · Sushi combo set', image: '/images/set-canada.webp' },
      { id: 'ramen', name: 'Shrimp Ramen', detail: 'Hot kitchen · 1 bowl', image: '/images/shrimp-ramen.webp' },
    ],
    branchLabel: 'ORDER BRANCH',
    selectLabel: 'Choose kitchen closest to you',
    hoursPrefix: 'Daily service hours ·',
    chefPick: "CHEF'S PICK",
    nightFavs: 'Late-night favourites',
    menuLink: 'MENU ↗',
    disclaimer: 'This is an interactive UI demo; it does not submit real orders.',
    viewMenu: 'Explore live menu',
  },
  ar: {
    branches: [
      { id: 'alibeykoy', name: 'علي بي كوي', hours: '10:45 — 04:00' },
      { id: 'zeytinburnu', name: 'زيتون بورنو', hours: '11:00 — 03:00' },
      { id: 'sariyer', name: 'رشيد باشا · ساريير', hours: '11:00 — 03:00' },
    ],
    products: [
      { id: 'canada', name: 'طقم كندا', detail: '32 قطعة · تشكيلة سوشي', image: '/images/set-canada.webp' },
      { id: 'ramen', name: 'رامن الجمبري', detail: 'مطبخ ساخن · وعاء واحد', image: '/images/shrimp-ramen.webp' },
    ],
    branchLabel: 'فرع الطلب',
    selectLabel: 'اختر المطبخ الأقرب إليك',
    hoursPrefix: 'ساعات العمل اليومية ·',
    chefPick: 'اختيار الشيف',
    nightFavs: 'مفضلات السهرة',
    menuLink: 'المنيو ↗',
    disclaimer: 'هذا نموذج محاكاة تفاعلي؛ لا يرسل طلباً حقيقياً.',
    viewMenu: 'تصفح قائمة الطعام الحية',
  },
  ru: {
    branches: [
      { id: 'alibeykoy', name: 'Алибейкёй', hours: '10:45 — 04:00' },
      { id: 'zeytinburnu', name: 'Зейтинбурну', hours: '11:00 — 03:00' },
      { id: 'sariyer', name: 'Решитпаша · Сарыер', hours: '11:00 — 03:00' },
    ],
    products: [
      { id: 'canada', name: 'Канада Сет', detail: '32 шт · набор суши', image: '/images/set-canada.webp' },
      { id: 'ramen', name: 'Рамен с креветками', detail: 'Горячая кухня · 1 порция', image: '/images/shrimp-ramen.webp' },
    ],
    branchLabel: 'ФИЛИАЛ ЗАКАЗА',
    selectLabel: 'Выберите ближайшую кухню',
    hoursPrefix: 'Часы работы филиала ·',
    chefPick: 'ВЫБОР ШЕФА',
    nightFavs: 'Ночные фавориты',
    menuLink: 'МЕНЮ ↗',
    disclaimer: 'Это интерактивное демо интерфейса; реальный заказ не отправляется.',
    viewMenu: 'Перейти в онлайн меню',
  },
  zh: {
    branches: [
      { id: 'alibeykoy', name: 'Alibeyköy 分店', hours: '10:45 — 04:00' },
      { id: 'zeytinburnu', name: 'Zeytinburnu 分店', hours: '11:00 — 03:00' },
      { id: 'sariyer', name: 'Reşitpaşa · Sarıyer', hours: '11:00 — 03:00' },
    ],
    products: [
      { id: 'canada', name: '加拿大套餐', detail: '32件装 · 招牌寿司拼盘', image: '/images/set-canada.webp' },
      { id: 'ramen', name: '鲜虾拉面', detail: '热厨料理 · 1碗', image: '/images/shrimp-ramen.webp' },
    ],
    branchLabel: '取餐或配送门店',
    selectLabel: '选择离您最近的餐厅',
    hoursPrefix: '每日营业时间 ·',
    chefPick: '主厨精选',
    nightFavs: '深夜人气之选',
    menuLink: '菜单 ↗',
    disclaimer: '此为界面交互演示，不会发送真实订单。',
    viewMenu: '查看在线真实菜单',
  },
};

export default function OrderDemo({ lang = 'tr' }) {
  const t = orderDemoData[lang] || orderDemoData.tr;
  const [branch, setBranch] = useState(t.branches[0]);
  const [selected, setSelected] = useState([]);

  function toggleProduct(id) {
    const exists = selected.includes(id);
    setSelected(exists ? selected.filter((item) => item !== id) : [...selected, id]);
  }

  const menuUrl = lang === 'tr' ? '/menu' : `/${lang}/menu`;

  return (
    <div className="phone-shell" aria-label="Interactive mobile ordering preview">
      <div className="phone-notch" aria-hidden="true" />
      <div className="phone-screen">
        <div className="phone-status">
          <span>21:41</span>
          <span className="phone-status-icons">
            <FaSignal size={10} />
            <FaWifi size={10} />
            <FaBatteryFull size={11} />
          </span>
        </div>
        <div className="phone-brand-row">
          <span className="phone-brand-mark" aria-label="Lucky clover logo">
            <FaClover className="phone-brand-clover" />
          </span>
          <div>
            <b>Lucky</b>
            <small>SUSHI &amp; CHINESE</small>
          </div>
          <span className="phone-cart">
            {selected.length} <span aria-hidden="true">＋</span>
          </span>
        </div>

        <div className="phone-branch-label">{t.branchLabel}</div>
        <label className="branch-select-label" htmlFor="case-branch-select">
          {t.selectLabel}
        </label>
        <select
          id="case-branch-select"
          className="branch-select"
          value={branch.id}
          onChange={(event) =>
            setBranch(t.branches.find((item) => item.id === event.target.value) || t.branches[0])
          }
        >
          {t.branches.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <div className="phone-hours">
          <FaClock className="phone-hours-icon" size={11} /> {t.hoursPrefix} {branch.hours}
        </div>

        <div className="phone-menu-heading">
          <div>
            <small>{t.chefPick}</small>
            <h3>{t.nightFavs}</h3>
          </div>
          <Link href={menuUrl} className="phone-menu-badge">
            {t.menuLink}
          </Link>
        </div>

        {t.products.map((product) => {
          const isSelected = selected.includes(product.id);
          return (
            <div
              className={`phone-product${isSelected ? ' is-selected' : ''}`}
              key={product.id}
            >
              <div className="product-thumb">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={48}
                  height={48}
                  className="product-thumb-img"
                />
              </div>
              <div className="phone-product__copy">
                <b>{product.name}</b>
                <small>{product.detail}</small>
              </div>
              <button
                type="button"
                aria-label={`${product.name} ${isSelected ? 'remove' : 'add'}`}
                className="add-product"
                onClick={() => toggleProduct(product.id)}
              >
                {isSelected ? '✓' : '+'}
              </button>
            </div>
          );
        })}

        <div className="phone-demo-disclaimer">{t.disclaimer}</div>
        <Link className="phone-order-link" href={menuUrl}>
          <span>{t.viewMenu}</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  );
}
