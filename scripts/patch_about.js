const fs = require('fs');

let fileContent = fs.readFileSync('src/app/about/page.js', 'utf8');

// Let's add gallery and stats labels to the labels object:
const additionalLabels = `    statFresh: { tr: 'Taze Deniz Mahsulü', en: 'Fresh Seafood', ar: 'مأكولات بحرية طازجة', ru: 'Свежие морепродукты', zh: '新鲜海鲜' },
    statDishes: { tr: 'Özgün Lezzet Çeşidi', en: 'Curated Menu Items', ar: 'طبقاً آسيوياً مميزاً', ru: 'Разнообразных блюд', zh: '精选特色料理' },
    statReviews: { tr: 'Google Değerlendirmesi', en: 'Google Reviews (4.6★)', ar: 'تقييمات غوغل (4.6★)', ru: 'Отзывов в Google (4.6★)', zh: '谷歌真实好评 (4.6★)' },
    galleryBadge: { tr: 'Gastronomi Galerisi', en: 'Culinary Showcase', ar: 'معرض النكهات', ru: 'Галерея вкуса', zh: '美食展' },
    galleryTitle: { tr: 'Usta Ellerden Masanıza', en: 'Handcrafted From Kitchen to Table', ar: 'من أيدي الطهاة إلى مائدتكم', ru: 'От мастеров к вашему столу', zh: '从大厨之手到您的餐桌' },`;

// Replace inside labels definition
fileContent = fileContent.replace(
  "contactCta: { tr: 'Şubelerimizi Görün', en: 'View Our Locations', ar: 'فروعنا ومواقعنا', zh: '查看门店', ru: 'Наши филиалы', fa: 'شعبات ما', fr: 'Nos Adresses' }",
  `contactCta: { tr: 'Şubelerimizi Görün', en: 'View Our Locations', ar: 'فروعنا ومواقعنا', zh: '查看门店', ru: 'Наши филиалы', fa: 'شعبات ما', fr: 'Nos Adresses' },\n${additionalLabels}`
);

// Replace stats block
const oldStatsBlock = `                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-brand-primary)', fontWeight: 700 }}>100%</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Taze Deniz Mahsulü</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-brand-primary)', fontWeight: 700 }}>80+</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Özgün Lezzet Çeşidi</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-brand-primary)', fontWeight: 700 }}>4.9★</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Misafir Memnuniyeti</div>
                </div>`;

const newStatsBlock = `                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-brand-primary)', fontWeight: 700 }}>100%</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{l('statFresh')}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-brand-primary)', fontWeight: 700 }}>140+</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{l('statDishes')}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-brand-primary)', fontWeight: 700 }}>800+</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{l('statReviews')}</div>
                </div>`;

fileContent = fileContent.replace(oldStatsBlock, newStatsBlock);

// Replace gallery block
const oldGalleryBlock = `            <span className="home-section-badge">
              <FaStar style={{ marginInlineEnd: '6px' }} aria-hidden="true" />
              Gastronomi Galerisi
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-text-primary)' }}>
              Usta Ellerden Masanıza
            </h2>`;

const newGalleryBlock = `            <span className="home-section-badge">
              <FaStar style={{ marginInlineEnd: '6px' }} aria-hidden="true" />
              {l('galleryBadge')}
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-text-primary)' }}>
              {l('galleryTitle')}
            </h2>`;

fileContent = fileContent.replace(oldGalleryBlock, newGalleryBlock);

fs.writeFileSync('src/app/about/page.js', fileContent, 'utf8');
console.log('src/app/about/page.js updated successfully!');
