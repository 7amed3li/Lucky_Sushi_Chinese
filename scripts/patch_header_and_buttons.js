const fs = require('fs');

// 1. Update Header.js
let header = fs.readFileSync('src/components/Header.js', 'utf8');

// Replace language button inside header__actions
const oldLangBtn = `<button
                type="button"
                className="header__lang-btn"
                onClick={() => setLangOpen(!langOpen)}
                aria-label="Select language"
                aria-expanded={langOpen}
              >
                <span>{getLocale(lang)?.flag} {getLocale(lang)?.displayName || lang.toUpperCase()}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>`;

const newLangBtn = `<button
                type="button"
                className="header__lang-btn"
                onClick={() => setLangOpen(!langOpen)}
                aria-label="Select language"
                aria-expanded={langOpen}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ opacity: 0.85 }}
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span className="header__lang-code">{lang.toUpperCase()}</span>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>`;

header = header.replace(oldLangBtn, newLangBtn);

// Also replace menu items inside dropdown so flag emojis don't break
const oldMenuItem = `<span>{getLocale(code)?.flag} {getLocale(code)?.nativeName || code.toUpperCase()}</span>`;
const newMenuItem = `<span>{getLocale(code)?.nativeName || code.toUpperCase()} ({code.toUpperCase()})</span>`;
header = header.replace(oldMenuItem, newMenuItem);

// Replace mobile drawer lang button text
const oldMobileLangBtn = `{getLocale(code)?.flag} {getLocale(code)?.displayName || code.toUpperCase()}`;
const newMobileLangBtn = `{getLocale(code)?.nativeName || code.toUpperCase()} ({code.toUpperCase()})`;
header = header.replace(oldMobileLangBtn, newMobileLangBtn);

fs.writeFileSync('src/components/Header.js', header, 'utf8');
console.log('src/components/Header.js patched successfully!');

// 2. Update globals.css for header buttons and mobile cart elimination
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// Replace header button styles
const oldHeaderBtnCSS = `/* Header Button Common */
.header__cart-btn,
.header__menu-toggle {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-primary);
  transition: all var(--transition-fast);
  position: relative;
  cursor: pointer;
}`;

const newHeaderBtnCSS = `/* Header Button Common */
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

/* On mobile, remove the duplicated cart button from header since MobileBottomBar handles it */
@media (max-width: 768px) {
  .header__cart-btn {
    display: none !important;
  }
}`;

css = css.replace(oldHeaderBtnCSS, newHeaderBtnCSS);

// Update .header__lang-btn style
const oldLangBtnCSS = `.header__lang-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  height: 38px;
  padding: 0 12px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-primary);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: all var(--transition-fast);
}`;

const newLangBtnCSS = `.header__lang-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
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

.header__lang-code {
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1;
}`;

css = css.replace(oldLangBtnCSS, newLangBtnCSS);

fs.writeFileSync('src/app/globals.css', css, 'utf8');
console.log('src/app/globals.css patched successfully!');
