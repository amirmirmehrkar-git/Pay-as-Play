# 📦 Play and Pay Tailwind Config Pack

**پروژه:** Pay as Play  
**تاریخ ایجاد:** 2025-11-04  
**ورژن:** 1.0

---

## 📋 Overview

این بسته شامل پیکربندی Tailwind CSS برای پروژه Play and Pay است که بر اساس Design Tokens برند ساخته شده است.

---

## 📁 ساختار بسته

```
Play_and_Pay_Tailwind_Config_v1/
│
├── 📁 Demo/
│   ├── tailwind.config.react.js
│   ├── tailwind.config.vue.js
│   └── tailwind.config.flutter.js
│
├── 📁 Production/
│   ├── tailwind.config.react.js
│   ├── tailwind.config.vue.js
│   └── tailwind.config.flutter.js
│
└── 📁 Design_Tokens_CSS/
    ├── design-tokens-demo.css
    └── design-tokens-production.css
```

---

## 🎨 ویژگی‌ها

### ✅ Design Tokens
- **رنگ‌ها:** Primary Gradient, Background, Surface, Text, Semantic
- **تایپوگرافی:** Inter (EN) + IRANSansX (FA)
- **Spacing:** Base 4px system
- **Border Radius:** 4px - 24px
- **Shadows:** 4 سطح Elevation
- **Gradients:** Primary + Inverse

### ✅ Light + Dark Mode
- **Light Mode:** پس‌زمینه سفید–خاکستری
- **Dark Mode:** پس‌زمینه سرمه‌ای–ذغالی
- **Gradient Inversion:** در Dark Mode

### ✅ RTL Support
- **فارسی:** IRANSansX font, RTL direction
- **English:** Inter font, LTR direction
- **Auto-switching:** بر اساس زبان

---

## 🚀 نحوه استفاده

### React

#### 1. نصب Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### 2. Import Config
```javascript
// tailwind.config.js
module.exports = require('./Play_and_Pay_Tailwind_Config_v1/Production/tailwind.config.react.js')
```

#### 3. Import Design Tokens
```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@import './Play_and_Pay_Design_Tokens_CSS_v1/Production/design-tokens-production.css';
```

### Vue

```javascript
// tailwind.config.js
module.exports = require('./Play_and_Pay_Tailwind_Config_v1/Production/tailwind.config.vue.js')
```

### Flutter

```yaml
# pubspec.yaml
dependencies:
  tailwindcss: ^1.0.0
```

---

## 📐 Custom Components

### Buttons
```html
<button class="btn-primary">Primary Button</button>
<button class="btn-secondary">Secondary Button</button>
```

### Cards
```html
<div class="card">
  <!-- Card content -->
</div>
```

### Gradients
```html
<div class="bg-gradient-primary">Gradient Background</div>
<h1 class="text-gradient-primary">Gradient Text</h1>
```

---

## 🎨 Color Usage

### Light Mode
```css
.bg-bg-light        /* White background */
.bg-surface-light   /* Light gray surface */
.text-text-light    /* Dark text */
```

### Dark Mode
```css
.bg-bg-dark         /* Dark background */
.bg-surface-dark    /* Dark surface */
.text-text-dark     /* Light text */
```

---

## 🔤 Typography

### English (LTR)
```html
<div class="font-body">English Text</div>
<div class="font-heading">English Heading</div>
```

### Persian (RTL)
```html
<div dir="rtl" class="font-persian">متن فارسی</div>
```

---

## 📱 Responsive

```html
<div class="text-base md:text-lg lg:text-xl">
  Responsive Text
</div>
```

---

## 🌓 Theme Switching

### HTML
```html
<html data-theme="light">
  <!-- Light mode -->
</html>

<html data-theme="dark">
  <!-- Dark mode -->
</html>
```

### JavaScript
```javascript
document.documentElement.setAttribute('data-theme', 'dark');
```

---

## 📦 فایل‌های موجود

### Tailwind Configs
- `tailwind-config-demo-react.js` - Demo version for React
- `tailwind-config-production-react.js` - Production version for React

### Design Tokens
- `design-tokens-production.css` - Production CSS variables

### Landing Page
- `landing-page-react.jsx` - React component
- `landing-page-html.html` - HTML version
- `landing-page-index.css` - CSS file

---

## ✅ Checklist

### Setup
- [ ] Install Tailwind CSS
- [ ] Copy config file
- [ ] Import design tokens CSS
- [ ] Setup fonts (Inter + IRANSansX)

### Testing
- [ ] Test Light Mode
- [ ] Test Dark Mode
- [ ] Test RTL (Persian)
- [ ] Test LTR (English)
- [ ] Test Responsive

---

## 📚 مستندات مرتبط

- **Component Library:** `references/figma-component-library.md`
- **Design System:** `references/design-system.md`
- **Complete Design Brief:** `references/complete-design-brief.md`

---

**آماده برای استفاده! 🚀**

**تاریخ:** 2025-11-04  
**ورژن:** 1.0

