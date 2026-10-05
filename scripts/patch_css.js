const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../src/app/globals.css');
let css = fs.readFileSync(cssPath, 'utf8');

const rtlEnhancements = `
/* ═══════════════════════════════════════════════════
   RTL & INTERNATIONAL TYPOGRAPHY ENHANCEMENTS
   ═══════════════════════════════════════════════════ */
[dir="rtl"],
[lang="ar"],
[lang="ar"] body {
  font-family: var(--font-ar) !important;
}

[dir="rtl"] h1, [dir="rtl"] h2, [dir="rtl"] h3, [dir="rtl"] h4, [dir="rtl"] h5, [dir="rtl"] h6,
[lang="ar"] h1, [lang="ar"] h2, [lang="ar"] h3, [lang="ar"] h4, [lang="ar"] h5, [lang="ar"] h6 {
  font-family: var(--font-ar-serif) !important;
  letter-spacing: normal !important;
  line-height: 1.35;
}

/* In Arabic cursive script, letter-spacing breaks ligature glyphs */
[dir="rtl"] *, [lang="ar"] * {
  letter-spacing: normal;
}
[dir="rtl"] .home-section-badge,
[dir="rtl"] .home-hero__tag,
[dir="rtl"] .home-marquee-item,
[dir="rtl"] .kardeshler-food-card__tag-badge,
[dir="rtl"] .kardeshler-food-card__price-badge,
[lang="ar"] .home-section-badge,
[lang="ar"] .home-hero__tag,
[lang="ar"] .home-marquee-item,
[lang="ar"] .kardeshler-food-card__tag-badge,
[lang="ar"] .kardeshler-food-card__price-badge {
  letter-spacing: 0 !important;
}

/* Chinese Typography */
[lang="zh"], [lang="zh"] body {
  font-family: var(--font-zh), -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif !important;
}

[dir="rtl"] .home-hero__cta-group,
[dir="rtl"] .home-visit-actions,
[dir="rtl"] .home-features-grid,
[dir="rtl"] .header__nav {
  direction: rtl;
}

[dir="rtl"] .header__lang-menu {
  left: 0;
  right: auto;
}

[dir="rtl"] .cart-drawer {
  left: 0;
  right: auto;
  transform: translateX(-100%);
}
[dir="rtl"] .cart-drawer.open {
  transform: translateX(0);
}

[dir="rtl"] .menu-search-input {
  text-align: right;
  padding-left: 36px;
  padding-right: 42px;
}
[dir="rtl"] .menu-search-icon {
  right: 14px;
  left: auto;
}
[dir="rtl"] .menu-search-clear {
  left: 12px;
  right: auto;
}

[dir="rtl"] .btn-hero-primary span:last-child {
  transform: scaleX(-1);
}

/* Mobile Sticky Action Bar */
.mobile-bottom-bar {
  display: none;
}
@media (max-width: 768px) {
  .mobile-bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 90;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background: rgba(22, 20, 26, 0.95);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-top: 1px solid rgba(216, 206, 192, 0.15);
    padding: 6px 4px calc(6px + env(safe-area-inset-bottom, 0px)) 4px;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.35);
  }
  .mobile-bottom-bar__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justifyContent: center;
    gap: 3px;
    padding: 6px 2px;
    color: var(--color-brand-light);
    text-decoration: none;
    font-size: 0.72rem;
    font-weight: 600;
    transition: color 0.15s ease;
    border: none;
    background: transparent;
    cursor: pointer;
  }
  .mobile-bottom-bar__item:hover,
  .mobile-bottom-bar__item.active {
    color: #4ade80;
  }
  .mobile-bottom-bar__item--cart {
    position: relative;
    color: #facc15;
  }
  .mobile-bottom-bar__item--whatsapp {
    color: #22c55e;
  }
  .mobile-bottom-bar__badge {
    position: absolute;
    top: 2px;
    inset-inline-end: 22%;
    background: var(--color-accent);
    color: white;
    font-size: 9px;
    font-weight: 800;
    padding: 1px 5px;
    border-radius: 999px;
    line-height: 1.2;
  }
  body {
    padding-bottom: calc(64px + env(safe-area-inset-bottom, 0px)) !important;
  }
}
`;

if (!css.includes('RTL & INTERNATIONAL TYPOGRAPHY ENHANCEMENTS')) {
  css += rtlEnhancements;
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('Successfully appended RTL & international typography enhancements to globals.css');
} else {
  console.log('Already enhanced in globals.css');
}
