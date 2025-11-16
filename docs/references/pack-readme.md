# 📦 Play and Pay Modular Design & Automation Pack

**پروژه:** Pay as Play  
**تاریخ ایجاد:** 2025-11-04  
**ورژن:** 1.0

---

## 🎯 Overview

این بسته شامل تمام فایل‌های لازم برای طراحی، توسعه و اتوماسیون اپلیکیشن **Play and Pay** است.

---

## ✅ ویژگی‌های بسته

### 🎨 طراحی
- ✅ **Light Mode** - پس‌زمینه سفید–خاکستری با گرادیان فیروزه‌ای–آبی
- ✅ **Dark Mode** - پس‌زمینه سرمه‌ای–ذغالی با متن سفید و گرادیان معکوس
- ✅ **دو‌زبانه** - فارسی (RTL) + English (LTR)
- ✅ **Responsive** - موبایل (iOS/Android) + وب‌اپ

### 💰 پرداخت
- ✅ **هیبریدی** - PlayCoin (PLY) + EUR (Fiat)
- ✅ **Real-time Billing** - پرداخت لحظه‌ای
- ✅ **Algorand Integration** - Smart Contracts

### 📦 ساختار
- ✅ **ماژولار** - 3 ماژول جداگانه (Onboarding, Player, Analytics)
- ✅ **قابل Import** - Figma, FigJam, Uizard, v0.design, Make

---

## 📁 ساختار بسته

```
Play_and_Pay_Modular_Pack.zip
│
├── 📁 FigJam_Flows/          # User Journeys + Payment Logic
├── 📁 Figma_Component_Library/  # Design System (Demo + Production)
├── 📁 UI_Modules/            # 3 ماژول UI (Onboarding, Player, Analytics)
├── 📁 Make_Automation/       # 3 سناریو Make (Onboarding, Payment, Analytics)
└── 📄 README.md              # این فایل
```

---

## 🚀 نحوه استفاده

### برای Designers

#### Figma
1. باز کردن `Figma_Component_Library/`
2. Import Components در Figma Design System
3. ایجاد Variants برای Light/Dark Mode
4. استفاده از Components در UI Modules

#### FigJam
1. باز کردن `FigJam_Flows/`
2. Import Flows در FigJam
3. ترسیم User Journeys
4. مستندسازی Payment Logic

#### Uizard / v0.design
1. باز کردن `UI_Modules/`
2. Import هر ماژول به صورت جداگانه
3. تست مستقل هر ماژول
4. ترکیب در پروژه نهایی

### برای Developers

#### Make (Integromat)
1. باز کردن `Make_Automation/`
2. Import `*.json` files در Make
3. Configure API Keys
4. Test Automation Flows

#### Backend Integration
1. مطالعه `Make_Automation/*_Documentation.md`
2. پیاده‌سازی API Endpoints
3. اتصال به Algorand TestNet

---

## 📋 محتوای بسته

### FigJam Flows (3 فایل)
- User Journey Flows
- Payment Logic Flows
- System Flows

### Figma Component Library (8 فایل)
- Demo Version (4 فایل)
- Production Version (4 فایل)
- شامل: Colors, Typography, Spacing, Components

### UI Modules (15 فایل)
- **Onboarding_UI:** Splash, Login, Wallet Setup
- **Player_UI:** Player, Cost Tracker, Controls
- **Analytics_UI:** Dashboard, Charts, Settings
- هر ماژول: Light/Dark + English/Persian

### Make Automation (6 فایل)
- **Onboarding_Flow:** User registration + Wallet creation
- **Payment_Flow:** Real-time billing + Hybrid payment
- **Analytics_Flow:** Transaction logging + Daily reports

---

## 🎨 Design Tokens

### Colors
- **Light Mode:** White/Gray backgrounds, Dark text
- **Dark Mode:** Dark Slate backgrounds, Light text
- **Gradient:** `#7C8CF8` → `#2DE1C2` (Light) / Inverted (Dark)

### Typography
- **English:** Inter (400, 500, 600, 700)
- **Persian:** IRANSans (400, 500, 600, 700)

### Spacing
- **Base Unit:** 4px
- **Common:** 8px, 16px, 24px, 32px

### Components
- Buttons (Primary, Secondary, Tertiary)
- Cards (Default, Elevated, Gradient)
- Forms (Input, Select, Checkbox, Switch)
- Navigation (Tab Bar, Top Bar, Bottom Sheet)

---

## 💳 Payment System

### Hybrid Payment
- **Primary:** PlayCoin (PLY) - Algorand ASA
- **Secondary:** EUR (Fiat)
- **Display:** "50 PLY (≈ €1.00)" - نمایش هر دو

### Real-time Billing
- **Interval:** Every 10 seconds
- **Calculation:** Rate per minute × Elapsed time
- **Display:** Live cost tracker in Player

### Algorand Integration
- **Network:** TestNet (Demo) / MainNet (Production)
- **Smart Contracts:** Session management + Payment
- **Wallets:** Pera, MyAlgo, Wallet Connect

---

## 📱 Platforms

### Mobile
- **iOS:** iPhone 13 Pro (375px × 812px)
- **Android:** Minimum 360px × 640px
- **Tablet:** iPad (768px × 1024px)

### Web
- **Responsive:** 320px - 1440px+
- **Breakpoints:** Mobile, Tablet, Desktop, Large Desktop

---

## 🌐 Languages

### English (LTR)
- Font: Inter
- Direction: Left-to-Right
- All UI elements translated

### Persian/Farsi (RTL)
- Font: IRANSans
- Direction: Right-to-Left
- Full RTL support
- All UI elements translated

---

## ⚙️ Automation Flows

### Onboarding Flow
- User registration
- Wallet creation
- Initial top-up
- Algorand wallet connection

### Payment Flow
- Session initialization
- Real-time billing loop
- Payment execution
- Settlement

### Analytics Flow
- Transaction logging
- Daily summaries
- Notifications
- Report generation

---

## 📚 مستندات

### Design
- `figma-component-library.md` - Component Library کامل
- `figjam-flows.md` - User Journeys + Payment Logic
- `complete-design-brief.md` - سند جامع طراحی

### Technical
- `make-automation-flows.md` - Automation Flows
- `app-configuration.md` - تنظیمات نهایی

### Structure
- `modular-pack-structure.md` - ساختار کامل بسته

---

## ✅ Checklist

### قبل از استفاده
- [ ] Figma/FigJam/Uizard نصب شده
- [ ] Make (Integromat) Account فعال
- [ ] Algorand TestNet Wallet آماده
- [ ] Backend API Endpoints پیاده‌سازی شده

### Import
- [ ] FigJam Flows import شده
- [ ] Component Library import شده
- [ ] UI Modules import شده
- [ ] Make Scenarios import شده

### Testing
- [ ] Light/Dark Mode تست شده
- [ ] دو‌زبانه (FA/EN) تست شده
- [ ] Responsive Design تست شده
- [ ] Payment Flow تست شده

---

## 🆘 Support

### سوالات متداول
- **Q:** چگونه Component Library را در Figma import کنم؟
- **A:** از فایل `Figma_Component_Library/Component_Library.md` استفاده کنید و Components را به صورت دستی ایجاد کنید.

- **Q:** چگونه Make Scenarios را import کنم؟
- **A:** فایل‌های `*.json` را در Make import کنید و API Keys را configure کنید.

- **Q:** آیا می‌توانم فقط یک ماژول را استفاده کنم؟
- **A:** بله، هر ماژول در `UI_Modules/` به صورت مستقل قابل استفاده است.

---

## 📝 تغییرات

### Version 1.0 (2025-11-04)
- ✅ ایجاد بسته کامل
- ✅ Light + Dark Mode
- ✅ دو‌زبانه (FA/EN)
- ✅ پرداخت هیبریدی (PLY + EUR)
- ✅ ساختار ماژولار
- ✅ FigJam Flows
- ✅ Component Library
- ✅ Make Automation

---

## 📄 License

این بسته برای استفاده در پروژه Play and Pay ایجاد شده است.

---

**آماده برای استفاده! 🚀**

**تاریخ:** 2025-11-04  
**ورژن:** 1.0

