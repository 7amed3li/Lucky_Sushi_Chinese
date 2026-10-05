const fs = require('fs');
const path = require('path');

const headerPath = path.join(__dirname, '../src/components/Header.js');
let header = fs.readFileSync(headerPath, 'utf8');

// Replace logo text
header = header.replace(/<span className="header__logo-sushi">Sushi · Chinese<\/span>/g, '<span className="header__logo-sushi">Sushi & Chinese</span>');

// Replace hardcoded Turkish WhatsApp message in mobile drawer
const oldWaBlock = `        {/* WhatsApp Direct Order CTA */}
        <a
          href={\`https://wa.me/\${phoneClean}?text=\${encodeURIComponent('Merhaba! Menüden sipariş vermek istiyorum.')}\`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMobile}
          className="mobile-drawer__order-btn"
        >
          <span>{tUI('order_now_btn')} (WhatsApp)</span>
        </a>`;

const newWaBlock = `        {/* WhatsApp Direct Order CTA */}
        <a
          href={\`https://wa.me/\${phoneClean}?text=\${encodeURIComponent(
            lang === 'ar' ? 'مرحباً لاكي سوشي صيني، أود تقديم طلب من المنيو.' :
            lang === 'en' ? 'Hello Lucky Sushi & Chinese, I would like to place an order from the menu.' :
            lang === 'ru' ? 'Здравствуйте, Lucky Sushi & Chinese! Хочу сделать заказ по меню.' :
            lang === 'zh' ? '您好 Lucky Sushi & Chinese，我想根据菜单点餐。' :
            'Merhaba Lucky Sushi & Chinese, menüden sipariş vermek istiyorum.'
          )}\`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMobile}
          className="mobile-drawer__order-btn"
        >
          <span>{tUI('order_now_btn')} (WhatsApp)</span>
        </a>`;

header = header.replace(oldWaBlock, newWaBlock);
fs.writeFileSync(headerPath, header, 'utf8');
console.log('Successfully updated Header.js with brand name and locale-aware WhatsApp message.');
