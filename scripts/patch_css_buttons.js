const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

css = css.replace(
  /\/\* Header Button Common \*\/[\s\S]*?cursor: pointer;\r?\n\}/,
  `/* Header Button Common */
.header__cart-btn,
.header__menu-toggle {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-primary);
  transition: all var(--transition-fast);
  position: relative;
  cursor: pointer;
}

/* On mobile (<= 768px), hide the cart button in the header because MobileBottomBar provides the cart action */
@media (max-width: 768px) {
  .header__cart-btn {
    display: none !important;
  }
}`
);

css = css.replace(
  /\.header__lang-btn \{[\s\S]*?transition: all var\(--transition-fast\);\r?\n\}/,
  `.header__lang-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 38px;
  padding: 0 14px;
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

.header__lang-code {
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1;
}`
);

fs.writeFileSync('src/app/globals.css', css, 'utf8');
console.log('src/app/globals.css successfully updated with pill buttons and mobile cart deduplication!');
