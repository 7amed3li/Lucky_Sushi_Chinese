const fs = require('fs');

console.log('--- 1. Patching src/app/layout.js ---');
let layout = fs.readFileSync('src/app/layout.js', 'utf8');

if (!layout.includes('CurrencyProvider')) {
  layout = layout.replace(
    "import { CartProvider } from \"@/context/CartContext\";",
    "import { CartProvider } from \"@/context/CartContext\";\nimport { CurrencyProvider } from \"@/context/CurrencyContext\";"
  );
  layout = layout.replace(
    "<LangProvider defaultLang=\"tr\">\r\n          <CartProvider>",
    "<LangProvider defaultLang=\"tr\">\r\n          <CurrencyProvider>\r\n            <CartProvider>"
  );
  layout = layout.replace(
    "<LangProvider defaultLang=\"tr\">\n          <CartProvider>",
    "<LangProvider defaultLang=\"tr\">\n          <CurrencyProvider>\n            <CartProvider>"
  );
  layout = layout.replace(
    "</CartProvider>\r\n        </LangProvider>",
    "</CartProvider>\r\n          </CurrencyProvider>\r\n        </LangProvider>"
  );
  layout = layout.replace(
    "</CartProvider>\n        </LangProvider>",
    "</CartProvider>\n          </CurrencyProvider>\n        </LangProvider>"
  );
  fs.writeFileSync('src/app/layout.js', layout, 'utf8');
  console.log('src/app/layout.js updated with CurrencyProvider!');
}

console.log('--- 2. Patching src/components/Header.js ---');
let header = fs.readFileSync('src/components/Header.js', 'utf8');

if (!header.includes('CurrencySwitcher')) {
  header = header.replace(
    "import { useCart } from '@/context/CartContext';",
    "import { useCart } from '@/context/CartContext';\nimport { useCurrency } from '@/context/CurrencyContext';\nimport CurrencySwitcher from '@/components/CurrencySwitcher';"
  );

  header = header.replace(
    "const { cartCount, setIsCartOpen } = useCart();",
    "const { cartCount, setIsCartOpen } = useCart();\n  const { currency, changeCurrency, currencies } = useCurrency();"
  );

  // Add CurrencySwitcher right before header__lang-container
  header = header.replace(
    '<div className="header__lang-container">',
    '<CurrencySwitcher />\n            <div className="header__lang-container">'
  );

  // Add Currency selector in mobile drawer
  const mobileCurrencySection = `        {/* Mobile Currency Switcher */}
        <div className="mobile-drawer__section-title">
          Döviz / Currency
        </div>
        <div className="mobile-drawer__lang-grid">
          {currencies.map((c) => {
            const isSelected = currency === c.code;
            return (
              <button
                key={c.code}
                type="button"
                className={\`mobile-drawer__lang-btn \${isSelected ? 'active' : ''}\`}
                onClick={() => {
                  changeCurrency(c.code);
                  closeMobile();
                }}
              >
                {c.symbol} {c.code}
              </button>
            );
          })}
        </div>\n`;

  header = header.replace(
    '{/* WhatsApp Direct Order CTA */}',
    `${mobileCurrencySection}\n        {/* WhatsApp Direct Order CTA */}`
  );

  fs.writeFileSync('src/components/Header.js', header, 'utf8');
  console.log('src/components/Header.js updated with CurrencySwitcher!');
}

console.log('--- 3. Patching src/components/DishCard.js ---');
let dishCard = fs.readFileSync('src/components/DishCard.js', 'utf8');

if (!dishCard.includes('useCurrency')) {
  dishCard = dishCard.replace(
    "import { useCart } from '@/context/CartContext';",
    "import { useCart } from '@/context/CartContext';\nimport { useCurrency } from '@/context/CurrencyContext';"
  );
  dishCard = dishCard.replace(
    "const { cart, addToCart, removeFromCart } = useCart();",
    "const { cart, addToCart, removeFromCart } = useCart();\n  const { formatPrice } = useCurrency();"
  );
  dishCard = dishCard.replace(
    "{item.price.toLocaleString('tr-TR')} ₺",
    "{formatPrice(item.price)}"
  );
  fs.writeFileSync('src/components/DishCard.js', dishCard, 'utf8');
  console.log('src/components/DishCard.js updated with formatPrice!');
}

console.log('--- 4. Patching src/components/DishModal.js ---');
let dishModal = fs.readFileSync('src/components/DishModal.js', 'utf8');

if (!dishModal.includes('useCurrency')) {
  dishModal = dishModal.replace(
    "import { useCart } from '@/context/CartContext';",
    "import { useCart } from '@/context/CartContext';\nimport { useCurrency } from '@/context/CurrencyContext';"
  );
  dishModal = dishModal.replace(
    "const { addToCart } = useCart();",
    "const { addToCart } = useCart();\n  const { formatPrice } = useCurrency();"
  );
  dishModal = dishModal.replace(
    "{item.price?.toLocaleString('tr-TR')} ₺",
    "{formatPrice(item.price)}"
  );
  fs.writeFileSync('src/components/DishModal.js', dishModal, 'utf8');
  console.log('src/components/DishModal.js updated with formatPrice!');
}

console.log('--- 5. Patching src/components/CartDrawer.js ---');
let cartDrawer = fs.readFileSync('src/components/CartDrawer.js', 'utf8');

if (!cartDrawer.includes('useCurrency')) {
  cartDrawer = cartDrawer.replace(
    "import { useCart } from '@/context/CartContext';",
    "import { useCart } from '@/context/CartContext';\nimport { useCurrency } from '@/context/CurrencyContext';"
  );
  cartDrawer = cartDrawer.replace(
    "const { lang, t, dir, tUI } = useLang();",
    "const { lang, t, dir, tUI } = useLang();\n  const { currency, formatPrice } = useCurrency();"
  );
  // Item line price
  cartDrawer = cartDrawer.replace(
    "{(item.price * quantity).toLocaleString('tr-TR')} ₺",
    "{formatPrice(item.price * quantity)}"
  );
  // Subtotal in drawer footer
  cartDrawer = cartDrawer.replace(
    "{total.toLocaleString('tr-TR')} ₺",
    "{currency === 'TRY' ? `${total.toLocaleString('tr-TR')} ₺` : `${formatPrice(total)} (${total.toLocaleString('tr-TR')} ₺)`}"
  );

  fs.writeFileSync('src/components/CartDrawer.js', cartDrawer, 'utf8');
  console.log('src/components/CartDrawer.js updated with formatPrice!');
}

console.log('--- 6. Adding Currency CSS to src/app/globals.css ---');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

if (!css.includes('header__currency-container')) {
  const currencyCSS = `
/* ── Currency Selector (Kardeshler Exact Architecture) ── */
.header__currency-container {
  position: relative;
}

.header__currency-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: 38px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-primary);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  white-space: nowrap;
  line-height: 1;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.header__currency-btn:hover {
  background: var(--color-surface-secondary);
  border-color: var(--color-text-secondary);
}

.header__currency-symbol {
  color: var(--color-brand-primary);
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  font-size: 0.95rem;
}

.header__currency-code {
  font-weight: 700;
  letter-spacing: 0.05em;
  font-size: 0.8rem;
}

.header__currency-chevron {
  transition: transform 0.2s ease;
}

.header__currency-chevron.open {
  transform: rotate(180deg);
}

.header__currency-menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 175px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  padding: 6px;
  display: flex;
  flex-direction: column;
  z-index: var(--z-dropdown);
  animation: fadeIn 0.15s ease;
}

[dir="rtl"] .header__currency-menu {
  right: auto;
  left: 0;
}

.header__currency-header {
  padding: 4px 8px 6px 8px;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-brand-primary);
  font-weight: 800;
  border-bottom: 1px solid var(--color-border-light);
  margin-bottom: 4px;
}

.header__currency-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.header__currency-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-text-primary);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
  text-align: start;
}

.header__currency-item:hover {
  background: var(--color-surface-secondary);
}

.header__currency-item.active {
  background: var(--color-brand-primary);
  color: white;
}

.header__currency-item-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header__currency-icon-badge {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: rgba(40, 122, 63, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--color-brand-primary);
}

.header__currency-item.active .header__currency-icon-badge {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.header__currency-item-code {
  font-weight: 700;
  font-size: 0.82rem;
}

.header__currency-item-name {
  font-size: 0.72rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.header__currency-item.active .header__currency-item-name {
  color: rgba(255, 255, 255, 0.85);
}

.header__currency-check {
  font-weight: bold;
  font-size: 0.85rem;
}
`;

  fs.appendFileSync('src/app/globals.css', currencyCSS, 'utf8');
  console.log('Currency CSS appended to src/app/globals.css!');
}

console.log('✅ ALL CURRENCY INTEGRATIONS COMPLETED SUCCESSFULLY!');
