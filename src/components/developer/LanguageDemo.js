'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaGlobe } from 'react-icons/fa6';

const languageOptions = [
  { id: 'tr', label: 'TR', name: 'Türkçe', dir: 'ltr' },
  { id: 'en', label: 'EN', name: 'English', dir: 'ltr' },
  { id: 'ar', label: 'ع', name: 'العربية', dir: 'rtl' },
  { id: 'ru', label: 'RU', name: 'Русский', dir: 'ltr' },
  { id: 'zh', label: '中', name: '中文', dir: 'ltr' },
];

const copy = {
  tr: {
    eyebrow: 'LUCKY SUSHI & CHINESE · İSTANBUL',
    title: 'Gece acıkınca, Lucky hâlâ açık.',
    body: 'Sana en yakın şubeyi seç. Menüden sevdiğini bul.',
    action: 'Menüyü keşfet',
    note: 'Arapça seçildiğinde arayüz yönü de RTL olarak değişir.',
    kicker: 'DİL ÖNİZLEMESİ',
  },
  en: {
    eyebrow: 'LUCKY SUSHI & CHINESE · ISTANBUL',
    title: 'Craving something late? Lucky is still open.',
    body: 'Choose the nearest branch. Find your next favourite.',
    action: 'Explore menu',
    note: 'When Arabic is selected, the layout orientation automatically flips to RTL.',
    kicker: 'LANGUAGE PREVIEW',
  },
  ar: {
    eyebrow: 'لاكي سوشي آند تشاينيز · إسطنبول',
    title: 'جعت متأخر؟ لاكي لسه فاتح.',
    body: 'اختار أقرب فرع ليك، واكتشف أكلك المفضل.',
    action: 'اكتشف القائمة',
    note: 'عند اختيار اللغة العربية، يتحول اتجاه كامل الواجهة تلقائياً إلى اليمين (RTL).',
    kicker: 'معاينة اللغات التفاعلية',
  },
  ru: {
    eyebrow: 'LUCKY SUSHI & CHINESE · СТАМБУЛ',
    title: 'Проголодались поздно? Lucky ещё открыт.',
    body: 'Выберите ближайший филиал и найдите любимое блюдо.',
    action: 'Открыть меню',
    note: 'При выборе арабского языка направление интерфейса меняется на RTL.',
    kicker: 'ПРЕДПРОСМОТР ЯЗЫКОВ',
  },
  zh: {
    eyebrow: 'LUCKY SUSHI & CHINESE · 伊斯坦布尔',
    title: '深夜饿了？Lucky 依然营业。',
    body: '选择离你最近的门店，找到喜欢的美食。',
    action: '浏览菜单',
    note: '选择阿拉伯语时，界面排版方向会自动无缝切换为 RTL 从右到左。',
    kicker: '多语言动态预览',
  },
};

export default function LanguageDemo({ initialLang = 'tr' }) {
  const [active, setActive] = useState(
    languageOptions.some((l) => l.id === initialLang) ? initialLang : 'tr'
  );
  const current = languageOptions.find((l) => l.id === active) || languageOptions[0];
  const t = copy[active] || copy.tr;
  const menuHref = active === 'tr' ? '/menu' : `/${active}/menu`;

  return (
    <div className="language-demo" aria-label="Multilingual experience demo">
      <div className="language-demo__topline">
        <span className="demo-kicker">
          <FaGlobe className="demo-kicker-icon" size={12} /> {t.kicker}
        </span>
        <span className="demo-index">05 / 05</span>
      </div>

      <div className="language-tabs" role="tablist" aria-label="Select preview language">
        {languageOptions.map((language) => (
          <button
            key={language.id}
            type="button"
            role="tab"
            aria-selected={active === language.id}
            aria-label={`Switch to ${language.name}`}
            className={`language-tab${active === language.id ? ' is-active' : ''}`}
            onClick={() => setActive(language.id)}
          >
            {language.label}
          </button>
        ))}
      </div>

      <div
        className="language-preview"
        dir={current.dir}
        lang={active}
        key={active}
      >
        <p className="language-preview__eyebrow">{t.eyebrow}</p>
        <h3>{t.title}</h3>
        <p className="language-preview__body">{t.body}</p>
        <Link className="language-preview__action" href={menuHref}>
          {t.action}
          <span aria-hidden="true"> ↗</span>
        </Link>
      </div>

      <p className="language-demo__note">{t.note}</p>
    </div>
  );
}
