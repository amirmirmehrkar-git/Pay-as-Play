# 🧪 Phase 1 Testing Guide

**تاریخ:** 2025-11-16  
**وضعیت:** Testing Phase 1 Features

---

## 📋 چک‌لیست تست

### ✅ 1. Onboarding Flow

**تست 1.1: نمایش Onboarding برای کاربران جدید**
- [ ] باز کردن صفحه اصلی (`/`)
- [ ] بررسی نمایش Onboarding Flow
- [ ] بررسی Splash Screen با Logo و Tagline

**تست 1.2: Navigation در Onboarding**
- [ ] کلیک روی "Next" برای رفتن به Slide بعدی
- [ ] بررسی Progress Bar
- [ ] بررسی Dots Indicator
- [ ] کلیک روی "Skip" برای رد کردن Onboarding

**تست 1.3: Sign-in Options**
- [ ] بررسی نمایش Sign-in Modal
- [ ] تست Wallet Connect
- [ ] بررسی Email Sign-in (Placeholder)
- [ ] بررسی Google Sign-in (Placeholder)

**تست 1.4: ذخیره وضعیت**
- [ ] تکمیل Onboarding
- [ ] بررسی ذخیره `onboarding_completed` در localStorage
- [ ] Refresh صفحه و بررسی عدم نمایش مجدد Onboarding

---

### ✅ 2. Low Balance Warning & Auto-top-up

**تست 2.1: Low Balance Warning**
- [ ] اتصال Wallet
- [ ] بررسی موجودی (اگر کمتر از 10 PLY باشد)
- [ ] بررسی نمایش Warning Modal
- [ ] بررسی دکمه "Top Up Now"
- [ ] بررسی دکمه "Later"

**تست 2.2: Auto-top-up Settings**
- [ ] رفتن به Settings Page (`/settings`)
- [ ] بررسی بخش "Payment & Wallet"
- [ ] فعال کردن Auto-top-up Toggle
- [ ] بررسی نمایش فیلدهای Top-up Amount و Threshold
- [ ] تنظیم مقادیر و Save
- [ ] بررسی ذخیره در localStorage

**تست 2.3: Low Balance Threshold**
- [ ] تنظیم Low Balance Alert Threshold
- [ ] Save Settings
- [ ] بررسی اعمال Threshold در Warning

---

### ✅ 3. Withdraw Functionality

**تست 3.1: باز کردن Withdraw Modal**
- [ ] رفتن به Wallet Page (`/wallet`)
- [ ] کلیک روی "Withdraw PLY"
- [ ] بررسی باز شدن Modal

**تست 3.2: Validation**
- [ ] تست با Amount خالی
- [ ] تست با Amount بیشتر از Balance
- [ ] تست با Destination Address خالی
- [ ] تست با Destination Address نامعتبر

**تست 3.3: Withdraw Process**
- [ ] وارد کردن Amount معتبر
- [ ] وارد کردن Destination Address معتبر
- [ ] کلیک روی "Max" برای انتخاب کل موجودی
- [ ] کلیک روی "Withdraw"
- [ ] بررسی نمایش Loading State
- [ ] بررسی نمایش پیام موفقیت/خطا

---

### ✅ 4. Charts in Analytics

**تست 4.1: نمایش Charts**
- [ ] رفتن به Analytics Page (`/analytics`)
- [ ] بررسی نمایش Charts Section
- [ ] بررسی Line Chart (Time Watched Over Time)
- [ ] بررسی Bar Chart (Cost per Content)
- [ ] بررسی Area Chart (Monthly Spend)

**تست 4.2: Chart Rendering**
- [ ] بررسی Grid Lines
- [ ] بررسی Labels
- [ ] بررسی Data Points
- [ ] بررسی Colors

---

## 🔍 تست‌های Integration

### تست 1: Onboarding → Home → Wallet
1. شروع با Onboarding
2. تکمیل Onboarding
3. رفتن به Home
4. رفتن به Wallet
5. بررسی عملکرد صحیح

### تست 2: Low Balance Warning → Settings
1. کاهش موجودی به زیر Threshold
2. بررسی نمایش Warning
3. کلیک روی "Top Up Now"
4. رفتن به Settings
5. تنظیم Auto-top-up

### تست 3: Analytics → Charts
1. رفتن به Analytics
2. بررسی Summary Cards
3. بررسی Charts
4. بررسی Media History
5. بررسی Coupons

---

## 🐛 مشکلات احتمالی

### مشکل 1: Onboarding نمایش داده نمی‌شود
**راه حل:**
- بررسی localStorage برای `onboarding_completed`
- بررسی `OnboardingWrapper` در `app/layout.tsx`
- بررسی `usePathname` برای Skip Pages

### مشکل 2: Low Balance Warning نمایش داده نمی‌شود
**راه حل:**
- بررسی موجودی Wallet
- بررسی Threshold در Settings
- بررسی `LowBalanceWarning` در `app/layout.tsx`

### مشکل 3: Withdraw Modal باز نمی‌شود
**راه حل:**
- بررسی Import `WithdrawButton` در `app/wallet/page.tsx`
- بررسی `WithdrawModal` component
- بررسی Console برای خطاها

### مشکل 4: Charts نمایش داده نمی‌شوند
**راه حل:**
- بررسی Import `AnalyticsCharts` در `app/analytics/page.tsx`
- بررسی Canvas Rendering
- بررسی Console برای خطاها

---

## 📊 نتایج تست

### Onboarding Flow
- [ ] ✅ Pass
- [ ] ❌ Fail
- **یادداشت:**

### Low Balance Warning
- [ ] ✅ Pass
- [ ] ❌ Fail
- **یادداشت:**

### Withdraw Functionality
- [ ] ✅ Pass
- [ ] ❌ Fail
- **یادداشت:**

### Charts in Analytics
- [ ] ✅ Pass
- [ ] ❌ Fail
- **یادداشت:**

---

## 🚀 دستورات تست

### 1. اجرای Development Server
```bash
cd C:\Amir\pay-as-play-project
npm run dev
```

### 2. باز کردن Browser
- URL: `http://localhost:3000`

### 3. تست Onboarding
- Clear localStorage: `localStorage.clear()`
- Refresh صفحه

### 4. تست Low Balance Warning
- تنظیم موجودی کم در Wallet
- یا تغییر Threshold در Settings

---

**تاریخ تست:** 2025-11-16  
**تست کننده:** -  
**وضعیت:** ⏳ در حال تست

