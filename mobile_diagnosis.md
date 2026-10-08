# Mobile Layout Diagnosis

## Summary Table

| المشكلة                               | الملف                                                                                                                         | السبب الجذري                                                                                                             | الخطورة           |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| viewport / safe area                  | [src/app/layout.js](src/app/layout.js#L88)                                                                                    | `viewport` موجود لكن بدون `viewportFit: 'cover'`، ومع `env(safe-area-inset-bottom)` قد لا يتصرف بثبات على بعض الموبايلات | متوسطة            |
| الشريط الأبيض يمين + زر القائمة مقصوص | [src/components/Header.js](src/components/Header.js#L107) + [src/app/globals.css](src/app/globals.css#L287)                   | الهيدر يرص عناصر متعددة في صف واحد بدون تقليص كافٍ، مع `nowrap` و`flex-shrink: 0`، والدرج مخفي بـ `translateX` فقط       | عالية             |
| الشريط السفلي يغطي آخر المحتوى        | [src/components/MobileBottomBar.js](src/components/MobileBottomBar.js#L28) + [src/app/globals.css](src/app/globals.css#L3076) | البار `fixed` وأسفله `body padding-bottom` ثابت 64px فقط، بينما ارتفاعه الفعلي قد يزيد                                   | عالية             |
| الهيرو والـ CTA تحت البار السفلي      | [src/app/page.js](src/app/page.js#L72) + [src/app/globals.css](src/app/globals.css#L827)                                      | `min-height: 90vh` مع `padding: var(--sp-12)` و`margin-bottom: var(--sp-12)` للأزرار بدون override موبايل                | عالية             |
| الشرائط الأفقية                       | [src/app/menu/page.js](src/app/menu/page.js#L198) + [src/app/globals.css](src/app/globals.css#L1914)                          | الشرائط نفسها scroll containers صحيحة، ولا يظهر overflow أفقي واضح منها                                                  | منخفضة / غير مؤكد |
| عناصر `vw` الكبيرة                    | [src/app/globals.css](src/app/globals.css#L867) + [src/app/globals.css](src/app/globals.css#L2645)                            | يوجد `120vw` في glow للهيرو و`86vw/90vw` في الـ drawers؛ قد تساهم فقط إذا حدث clipping من animation/shadow               | متوسطة            |

## A. الـ viewport

الموجود فعليًا في [src/app/layout.js](src/app/layout.js#L88) هو:

```js
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F6F1E8",
};
```

لا يوجد `viewportFit: 'cover'`.

## B. سبب الشريط الأبيض على اليمين

في [src/components/Header.js](src/components/Header.js#L107) ترتيب الأزرار داخل صف واحد هو:

```jsx
<div className="header__actions">
  <CurrencySwitcher />
  <div className="header__lang-container">...</div>
  <button className="header__menu-toggle" ... />
</div>
```

وفي [src/app/globals.css](src/app/globals.css#L287) و[src/app/globals.css](src/app/globals.css#L373) و[src/app/globals.css](src/app/globals.css#L446) و[src/app/globals.css](src/app/globals.css#L564) يوجد:

```css
.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.header__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  flex-shrink: 0;
  min-width: 0;
}

.header__lang-btn,
.header__currency-btn {
  min-width: 0;
  flex-shrink: 0;
}

.header__lang-btn {
  white-space: nowrap;
}

@media (max-width: 900px) {
  .header__nav {
    display: none;
  }
  .header__menu-toggle {
    display: flex;
  }
}
```

السبب العملي: على عرض 360–400px الشعار + العملة + اللغة + زر القائمة لا يملكون مساحة كافية، ولا يوجد collapse حقيقي للهيدر، لذلك زر ☰ ينقص أو يُقص.

الـ drawers ليست hidden بـ `display:none`; هي فقط متحركة خارج الشاشة:

```css
.mobile-drawer {
  position: fixed;
  width: min(340px, 86vw);
  transform: translateX(100%);
  box-shadow: var(--shadow-lg);
}

.cart-drawer {
  position: fixed;
  width: min(420px, 90vw);
  transform: translateX(100%);
  box-shadow: -8px 0 40px rgba(22, 20, 26, 0.2);
}
```

والـ `body` عنده `overflow-x: hidden;` في [src/app/globals.css](src/app/globals.css#L145).

## C. الشرايط الأفقية

في صفحة المنيو، الشريطين الأفقيين معمولة لهم scroll بشكل صحيح:

```css
.trending__scroll {
  display: flex;
  overflow-x: auto;
}
.kardeshler-filter-row {
  display: flex;
  overflow-x: auto;
}
```

وفي [src/app/menu/page.js](src/app/menu/page.js#L198) و[src/app/menu/page.js](src/app/menu/page.js#L340) هما داخل wrappers بعرض محدود.

لا أرى هنا سببًا مباشرًا للشريط الأبيض يمين الصفحة. التشخيص: **غير مؤكد / منخفض الخطورة**.

## D. الهيدر

المشكلة ليست في زر واحد، بل في هندسة الصف كله.

الشهادات المباشرة:

```css
.header__logo-text {
  white-space: nowrap;
}
.header__actions {
  flex-shrink: 0;
  gap: 10px;
}
.header__lang-btn {
  white-space: nowrap;
}
.header__menu-toggle {
  width: 38px;
  height: 38px;
}
```

ومع JSX في [src/components/Header.js](src/components/Header.js#L107) إلى [src/components/Header.js](src/components/Header.js#L191)، كل شيء موضوع أفقيًا بدون نسخة mobile compact للهيدر.

لهذا زر القائمة هو أول عنصر يتقص لما العرض يضيق.

## E. الشريط السفلي

في [src/components/MobileBottomBar.js](src/components/MobileBottomBar.js#L28) البار ثابت في أسفل الشاشة:

```jsx
<nav className="mobile-bottom-bar" aria-label="Mobile quick actions">
```

وفي [src/app/globals.css](src/app/globals.css#L3076) و[src/app/globals.css](src/app/globals.css#L3135):

```css
.mobile-bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 6px 4px calc(6px + env(safe-area-inset-bottom, 0px)) 4px;
  z-index: 90;
}

body {
  padding-bottom: calc(64px + env(safe-area-inset-bottom, 0px)) !important;
}
```

المشكلة: padding-bottom ثابت 64px، لكن ارتفاع البار الفعلي يمكن أن يزيد على ذلك حسب حجم الخط أو safe area.

يوجد أيضًا خطأ CSS واضح:

```css
.mobile-bottom-bar__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justifycontent: center;
}
```

`justifyContent` هنا غير صحيحة في CSS، وبالتالي المحاذاة العمودية المطلوبة لا تُطبق.

## F. الهيرو

في [src/app/page.js](src/app/page.js#L72) إلى [src/app/page.js](src/app/page.js#L99) الهيرو فيه فيديو + overlay + glow + CTA group.

وفي [src/app/globals.css](src/app/globals.css#L827) و[src/app/globals.css](src/app/globals.css#L934):

```css
.home-hero {
  min-height: 90vh;
  padding: var(--sp-12) var(--page-pad);
  overflow: hidden;
}

.home-hero__cta-group {
  display: flex;
  gap: var(--sp-3);
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: var(--sp-12);
}
```

هذا يعني أن الهيرو طويل جدًا على شاشة 360–400px، والـ CTA group قريب جدًا من أسفل الشاشة، لذلك fixed bottom bar يغطيه.

التدرج المعتم موجود فعلًا:

```css
.home-hero__video-overlay {
  background: linear-gradient(
    to bottom,
    rgba(22, 20, 26, 0.45) 0%,
    rgba(22, 20, 26, 0.72) 100%
  );
}
```

لون النصوص داخل الهيرو:

```css
.home-hero__tag {
  color: var(--color-brand-primary);
}
.home-hero__title {
  color: var(--color-brand-light);
}
.home-hero__sub {
  color: var(--mist-beige);
}
```

بخصوص نص `EYÜPSULTAN'IN ASYA GECE MUTFAĞI`: هذا ليس في الهيرو، بل في الـ footer داخل [src/components/Footer.js](src/components/Footer.js#L46) ويُعرض هكذا:

```jsx
<p
  style={{
    marginTop: "12px",
    fontSize: "0.85rem",
    color: "var(--mist-beige)",
    lineHeight: 1.5,
    maxWidth: "280px",
  }}
>
  {l("tagline")}
</p>
```

والـ footer نفسه داكن في [src/app/footer.css](src/app/footer.css#L4).

## G. 100vw / w-screen / h-screen

بحثت داخل `app` و`components` ولم أجد `w-screen` أو `h-screen` كأنماط layout.

الـ hits الخاصة بـ `100vw` كانت فقط `sizes="100vw"` في صور، وهذا لا يسبب overflow layout.

العناصر الواسعة الفعلية التي وجدتها:

- `home-hero__glow` بعرض/ارتفاع `120vw` في [src/app/globals.css](src/app/globals.css#L867)
- `mobile-drawer` بعرض `min(340px, 86vw)` في [src/app/globals.css](src/app/globals.css#L589)
- `cart-drawer` بعرض `min(420px, 90vw)` في [src/app/globals.css](src/app/globals.css#L2645)

هذه ليست بالضرورة خاطئة، لكن إن كان هناك overflow أفقي، فهي أول أماكن أراجعها في DevTools لأن كلا الدرجين يعتمد على `translateX` وليس إخفاء كامل.

## ترتيب مقترح للإصلاح

1. اختصر الهيدر على الموبايل: أخفِ أو اختصر جزءًا من `CurrencySwitcher`/اللغة أو اجعل زر القائمة ينزل لسطر منفصل على الشاشات الضيقة.
2. ارفع `padding-bottom` في `body` أو أعطه قيمة محسوبة من ارتفاع الـ bottom bar الفعلي بدل 64px ثابتة.
3. أضف mobile override للهيرو: خفّض `min-height` و`padding` و`margin-bottom` للـ CTA group على 360–400px.
4. صحّح `justifyContent` إلى `justify-content` في `.mobile-bottom-bar__item`.
5. أضف `viewportFit: 'cover'` إذا كانت المشكلة تظهر بوضوح على iPhone/Notch devices.
6. إذا ظل الشريط الأبيض موجودًا، افحص في DevTools `header__actions` و`document.documentElement.scrollWidth` مقابل `innerWidth` لمعرفة العنصر المتسبب فعلًا.
