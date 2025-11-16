# ⚙️ App Configuration - Play and Pay

**پروژه:** Pay as Play  
**تاریخ ایجاد:** 2025-11-04  
**آخرین به‌روزرسانی:** 2025-11-04  
**ورژن:** 1.0

---

## 📋 تنظیمات نهایی پیش از ساخت

این سند شامل تنظیمات نهایی و تصمیم‌گیری‌های کلیدی برای ساخت اپلیکیشن Play and Pay است.

---

## 🌐 زبان رابط کاربری (UI Language)

### ✅ انتخاب: دو‌زبانه (فارسی / انگلیسی با قابلیت سوییچ)

**توضیحات:**
- پشتیبانی کامل از دو زبان: فارسی (RTL) و انگلیسی (LTR)
- قابلیت سوییچ بین زبان‌ها در Settings
- زبان پیش‌فرض: بر اساس تنظیمات دستگاه کاربر
- ذخیره‌سازی انتخاب کاربر در Local Storage

**پیاده‌سازی:**
- استفاده از `next-intl` برای Internationalization
- ساختار Routing با `[locale]` pattern
- فایل‌های ترجمه در `locales/fa/` و `locales/en/`
- RTL Support با `tailwindcss-rtl`

**صفحات نیازمند ترجمه:**
- تمام صفحات UI
- پیام‌های خطا
- Notifications
- Email Templates
- Legal Documents (Terms, Privacy Policy)

**مستندات مرتبط:**
- `technical/i18n-implementation.md`
- `technical/tech-stack.md` (بخش Internationalization)

---

## 📱 پلتفرم هدف طراحی

### ✅ انتخاب: موبایل (iOS / Android) + وب اپلیکیشن (Responsive)

#### موبایل (iOS / Android)

**ویژگی‌ها:**
- Native App یا Progressive Web App (PWA)
- طراحی Mobile-First
- Touch-friendly interactions
- Push Notifications
- Offline Support (برای مشاهده محتوای دانلود شده)

**اندازه‌های هدف:**
- iPhone: 375px × 812px (iPhone 13 Pro)
- Android: 360px × 640px (حداقل)
- Tablet: 768px × 1024px (iPad)

**محدودیت‌ها:**
- حداقل Touch Target: 44px × 44px
- فونت حداقل: 14px برای خوانایی
- Navigation: Bottom Tab Bar (Mobile)

#### وب اپلیکیشن (Responsive)

**ویژگی‌ها:**
- Responsive Design برای تمام اندازه‌های صفحه
- Desktop-optimized layout
- Keyboard Navigation Support
- Hover States برای Desktop

**Breakpoints:**
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1439px
- Large Desktop: 1440px+

**Layout:**
- Mobile: Single column, stacked elements
- Tablet: 2-column grid
- Desktop: Multi-column layout with sidebar

**مستندات مرتبط:**
- `references/design-system.md` (بخش Responsive Breakpoints)
- `references/figma-design-specs.md` (بخش Responsive Design)

---

## 💰 نوع پرداخت پیش‌فرض در نسخه دمو

### ✅ انتخاب: PlayCoin (PLY – Algorand ASA)

**توضیحات:**
- در نسخه دمو، پرداخت‌ها با PlayCoin (PLY) انجام می‌شود
- PLY یک Algorand Standard Asset (ASA) است
- استفاده از Algorand TestNet برای تست
- نمایش قیمت‌ها در PLY (نه EUR)

**نمایش در UI:**
- Balance: "50 PLY" (نه "€1.00")
- Cost Tracker: "0.01 PLY/min" (نه "€0.01/min")
- Transaction History: تمام مبالغ در PLY
- Top-up: "Add PLY" (نه "Add Credit")

**تبدیل ارز (برای نمایش):**
- در Settings: امکان نمایش معادل EUR (فقط برای نمایش)
- Exchange Rate: 1 EUR = 50 PLY (قابل تنظیم)
- نمایش: "50 PLY (≈ €1.00)" در صورت نیاز

**Algorand Integration:**
- استفاده از Algorand TestNet
- Wallet Connection: Pera Wallet, MyAlgo, یا Wallet Connect
- Smart Contracts: برای مدیریت Session و Payment
- Transaction Fees: بسیار پایین (Algorand)

**مستندات مرتبط:**
- `technical/tech-stack.md` (بخش PlayCoin و Algorand)
- `technical/make-automation-flows.md` (بخش Algorand Integration)

---

## 🎯 تصمیم‌گیری‌های کلیدی

### 1. زبان رابط کاربری
**تصمیم:** دو‌زبانه (فارسی / انگلیسی)  
**دلیل:** بازار هدف شامل کاربران فارسی‌زبان و انگلیسی‌زبان است  
**پیاده‌سازی:** next-intl با [locale] routing

### 2. پلتفرم هدف
**تصمیم:** موبایل + وب (Responsive)  
**دلیل:** دسترسی بیشتر کاربران، استفاده در تمام دستگاه‌ها  
**اولویت:** Mobile-First Design

### 3. نوع پرداخت دمو
**تصمیم:** PlayCoin (PLY)  
**دلیل:** تمرکز بر روی blockchain-based payment، تست کامل Algorand integration  
**نکته:** امکان اضافه کردن EUR در نسخه Production

---

## 📐 تأثیر بر طراحی

### Design System
- **Typography:** Inter (EN) + IRANSans (FA)
- **Direction:** RTL Support برای فارسی
- **Spacing:** یکسان برای هر دو زبان
- **Icons:** Universal (بدون متن)

### Figma Design
- **Frames:** ایجاد برای هر دو زبان
- **Components:** قابل استفاده برای هر دو جهت
- **Prototype:** سوییچ بین زبان‌ها در Settings

### Responsive Design
- **Mobile:** اولویت اصلی
- **Desktop:** بهینه‌سازی برای استفاده با ماوس و کیبورد
- **Tablet:** ترکیبی از Mobile و Desktop

---

## 🔄 تغییرات در مستندات

### فایل‌های به‌روزرسانی شده:
1. ✅ `references/app-configuration.md` (این فایل)
2. ✅ `references/design-system.md` (اضافه شدن RTL Support)
3. ✅ `references/figma-design-specs.md` (اضافه شدن Language Switcher)
4. ✅ `technical/tech-stack.md` (تأیید PlayCoin و i18n)

---

## ✅ Checklist پیاده‌سازی

### Internationalization
- [ ] Setup next-intl
- [ ] ایجاد فایل‌های ترجمه (fa, en)
- [ ] پیاده‌سازی Language Switcher
- [ ] تست RTL Layout
- [ ] ترجمه تمام متن‌های UI

### Responsive Design
- [ ] Mobile-First CSS
- [ ] تست در اندازه‌های مختلف
- [ ] بهینه‌سازی Touch Targets
- [ ] Keyboard Navigation
- [ ] Hover States (Desktop)

### PlayCoin Integration
- [ ] Setup Algorand TestNet
- [ ] ایجاد PlayCoin (PLY) ASA
- [ ] Wallet Connection
- [ ] Smart Contract Development
- [ ] Payment Flow Testing

---

## 📞 سوالات و تصمیم‌گیری‌های آینده

### سوالات باز:
1. **Native App vs PWA:** آیا نیاز به Native App داریم یا PWA کافی است؟
2. **Dark Mode:** آیا در MVP نیاز است؟
3. **Offline Support:** چه سطحی از Offline Support نیاز است؟
4. **Push Notifications:** آیا در MVP نیاز است؟

### تصمیم‌گیری‌های آینده:
- اضافه کردن زبان سوم (Deutsch) در صورت نیاز
- اضافه کردن EUR Payment در Production
- Smart TV Support (در صورت نیاز)

---

**تاریخ آخرین به‌روزرسانی:** 2025-11-04  
**ورژن:** 1.0

