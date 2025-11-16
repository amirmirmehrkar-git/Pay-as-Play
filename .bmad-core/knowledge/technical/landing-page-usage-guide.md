# 🚀 راهنمای استفاده از Landing Page - Play and Pay

**پروژه:** Pay as Play  
**تاریخ ایجاد:** 2025-11-04  
**ورژن:** 1.0

---

## 📋 روش‌های نمایش Landing Page

### روش 1: Data URL (سریع‌ترین)

#### استفاده مستقیم:
کپی کنید و در Address Bar مرورگر Paste کنید:

```
data:text/html;base64,PCFET0NUWVBFIGh0bWw+...
```

#### یا از لینک استفاده کنید:
```html
<a href="data:text/html;base64,...">باز کردن Landing Page</a>
```

#### محدودیت‌ها:
- برخی مرورگرها ممکن است Data URL را مسدود کنند
- طول URL محدود است (حدود 2MB)
- نیاز به اینترنت برای Fonts و Tailwind CDN

---

### روش 2: فایل HTML محلی (توصیه می‌شود)

#### مراحل:
1. فایل `landing-page-standalone.html` را دانلود کنید
2. روی فایل دوبار کلیک کنید
3. در مرورگر پیش‌فرض باز می‌شود

#### مزایا:
- ✅ بدون نیاز به سرور
- ✅ کار می‌کند حتی بدون اینترنت (بعد از اولین بار)
- ✅ بدون محدودیت طول
- ✅ قابل ویرایش

---

### روش 3: Host آنلاین (برای اشتراک‌گذاری)

#### گزینه‌های رایگان:
1. **GitHub Pages**
   - آپلود فایل در Repository
   - فعال‌سازی GitHub Pages
   - دسترسی از `username.github.io/repo/landing-page.html`

2. **Netlify Drop**
   - Drag & Drop فایل HTML
   - دریافت لینک فوری
   - بدون نیاز به ثبت‌نام

3. **Vercel**
   - آپلود فایل
   - دریافت لینک فوری
   - CDN خودکار

4. **CodePen / JSFiddle**
   - Paste کد HTML
   - دریافت لینک Share
   - قابل ویرایش آنلاین

---

## 🔧 راه‌حل مشکلات

### مشکل: Data URL باز نمی‌شود

#### راه‌حل 1: استفاده از فایل HTML
```bash
# دانلود فایل
wget landing-page-standalone.html

# یا کپی فایل و باز کردن
open landing-page-standalone.html  # Mac
start landing-page-standalone.html  # Windows
xdg-open landing-page-standalone.html  # Linux
```

#### راه‌حل 2: استفاده از Local Server
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# سپس باز کنید:
# http://localhost:8000/landing-page-standalone.html
```

---

### مشکل: فونت‌ها لود نمی‌شوند

#### راه‌حل: استفاده از فونت‌های محلی
```html
<!-- اضافه کردن در <head> -->
<link rel="preload" href="fonts/IRANSansX-Regular.woff2" as="font" type="font/woff2" crossorigin>
```

---

### مشکل: Tailwind CDN کار نمی‌کند

#### راه‌حل: استفاده از Tailwind Build
```bash
# نصب Tailwind
npm install -D tailwindcss

# Build CSS
npx tailwindcss -i ./input.css -o ./output.css

# استفاده در HTML
<link href="./output.css" rel="stylesheet">
```

---

## 📱 تست در دستگاه‌های مختلف

### Desktop
- ✅ Chrome/Edge (Windows/Mac/Linux)
- ✅ Firefox
- ✅ Safari (Mac)
- ✅ Opera

### Mobile
- ✅ Chrome Mobile
- ✅ Safari Mobile (iOS)
- ✅ Firefox Mobile
- ✅ Samsung Internet

### Tablet
- ✅ iPad Safari
- ✅ Android Chrome

---

## 🎨 ویژگی‌های Landing Page

### ✅ دو‌زبانه
- فارسی (RTL) - پیش‌فرض
- English (LTR)
- سوییچ لحظه‌ای

### ✅ Light/Dark Mode
- Light Mode - پیش‌فرض
- Dark Mode
- سوییچ لحظه‌ای
- ذخیره در Local Storage (اختیاری)

### ✅ Responsive
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)
- Large Desktop (1440px+)

### ✅ Animations
- Hover Effects
- Smooth Transitions
- Button Interactions

---

## 🔄 Customization

### تغییر رنگ‌ها
```css
:root {
  --color-primary-start: #7C8CF8;  /* تغییر رنگ شروع */
  --color-primary-end: #2DE1C2;    /* تغییر رنگ پایان */
}
```

### تغییر متن‌ها
```javascript
const texts = {
  fa: {
    heroTitle: "متن جدید...",
    // ...
  },
  en: {
    heroTitle: "New text...",
    // ...
  }
};
```

### اضافه کردن بخش جدید
```html
<section class="py-12 px-4">
  <h2>عنوان جدید</h2>
  <p>محتوا...</p>
</section>
```

---

## 📦 فایل‌های موجود

### HTML Files
- `landing-page-standalone.html` - نسخه کامل و مستقل
- `landing-page-html.html` - نسخه با Tailwind CDN
- `about-page.html` - صفحه "درباره ما" سه‌زبانه (FA/EN/DE) ⭐

### React Files
- `landing-page-react.jsx` - React Component
- `landing-page-index.css` - CSS برای React

### Config Files
- `tailwind-config-production-react.js` - Tailwind Config
- `design-tokens-production.css` - Design Tokens

---

## ✅ Checklist استفاده

### قبل از استفاده
- [ ] فایل HTML دانلود شده
- [ ] مرورگر به‌روز است
- [ ] اتصال اینترنت برای Fonts و Tailwind (اولین بار)

### تست
- [ ] Language Switcher کار می‌کند
- [ ] Theme Switcher کار می‌کند
- [ ] Responsive در Mobile تست شده
- [ ] Responsive در Desktop تست شده
- [ ] RTL در فارسی درست نمایش داده می‌شود

---

## 🆘 پشتیبانی

### سوالات متداول

**Q: چرا Data URL کار نمی‌کند؟**  
A: برخی مرورگرها Data URL را برای امنیت مسدود می‌کنند. از فایل HTML استفاده کنید.

**Q: چطور فایل را Host کنم؟**  
A: از GitHub Pages، Netlify، یا Vercel استفاده کنید.

**Q: چطور فونت‌ها را محلی کنم؟**  
A: فونت‌ها را دانلود کنید و در پوشه `fonts/` قرار دهید، سپس لینک را در HTML تغییر دهید.

---

## 📚 مستندات مرتبط

- **Tailwind Config:** `tailwind-config-readme.md`
- **Design Tokens:** `design-tokens-production.css`
- **Component Library:** `../references/figma-component-library.md`

---

**آماده برای استفاده! 🚀**

**تاریخ:** 2025-11-04  
**ورژن:** 1.0

