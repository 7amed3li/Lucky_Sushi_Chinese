const fs = require('fs');

let fileContent = fs.readFileSync('src/app/contact/page.js', 'utf8');

// Add nightBadge to labels
fileContent = fileContent.replace(
  "hoursTitle: { tr: 'Çalışma Saatleri',",
  `nightBadge: { tr: "Gece 04:00'e Kadar Açık", en: 'Open Until 04:00 AM', ar: 'مفتوح حتى الرابعة فجراً', ru: 'Открыто до 04:00', zh: '营业至凌晨04:00' },
    hoursTitle: { tr: 'Çalışma Saatleri',`
);

// Replace late night badge text
fileContent = fileContent.replace(
  "<FaMoon aria-hidden=\"true\" /> Gece 04:00'e Kadar Açık",
  "<FaMoon aria-hidden=\"true\" /> {l('nightBadge')}"
);

// Replace branch status badge and whatsapp message
const oldBranchInner = `                  <div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-text-primary)' }}>
                        {branch.name}
                      </h3>
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-brand-primary)', fontWeight: 600 }}>
                        ● Aktif Hizmet
                      </span>
                    </div>
                  </div>

                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--sp-6)', flex: 1, lineHeight: 1.6, fontSize: '0.92rem' }}>
                    {branch.address}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a 
                      href={\`https://wa.me/\${whatsappClean}?text=\${encodeURIComponent('Merhaba! Sipariş vermek istiyorum.')}\`}`;

const newBranchInner = `                  <div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-text-primary)' }}>
                        {branch.name}
                      </h3>
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-brand-primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-brand-primary)' }} />
                        {branch[\`badge_\${lang}\`] || branch.badge_en || branch.badge_tr}
                      </span>
                    </div>
                  </div>

                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--sp-6)', flex: 1, lineHeight: 1.6, fontSize: '0.92rem' }}>
                    {branch.address}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a 
                      href={\`https://wa.me/\${whatsappClean}?text=\${encodeURIComponent(
                        lang === 'tr' ? \`Merhaba! \${branch.name} şubenizden sipariş vermek istiyorum.\` :
                        lang === 'ar' ? \`مرحباً! أود تقديم طلب من فرع \${branch.name}.\` :
                        lang === 'ru' ? \`Здравствуйте! Я хочу сделать заказ из филиала \${branch.name}.\` :
                        lang === 'zh' ? \`您好！我想在 \${branch.name} 分店订餐。\` :
                        \`Hello! I would like to place an order from \${branch.name}.\`
                      )}\`}`;

fileContent = fileContent.replace(oldBranchInner, newBranchInner);

fs.writeFileSync('src/app/contact/page.js', fileContent, 'utf8');
console.log('src/app/contact/page.js updated successfully!');
