# 📺 Wireframe - OTT/VOD Pay-as-You-Use Platform

**پروژه:** Pay as Play  
**تاریخ ایجاد:** 2025-11-04  
**آخرین به‌روزرسانی:** 2025-11-04  
**ورژن:** 1.0

---

## 📋 Overview

این سند شامل Wireframe و User Flow برای پلتفرم OTT/VOD Pay-as-You-Use است.

---

## 🎬 User Flow (جریان کاربری)

### 1. Home/Browse Screen (صفحه اصلی/مرور)

**عناصر:**
- **Wallet Balance:** نمایش موجودی کیف پول (مثلاً € 5.00)
- **Content Preview:** نمایش محتوای ویدیو با قیمت هر دقیقه (مثلاً € 0.02/min)
- **Navigation:** دکمه‌های "Home", "My Wallet", "History"
- **Action:** دکمه "Watch Now" برای شروع پخش

**Flow:**
- کاربر محتوا را انتخاب می‌کند
- روی "Watch Now" کلیک می‌کند
- به صفحه Player منتقل می‌شود

---

### 2. Player Screen (صفحه پخش)

**عناصر:**
- **Video Player:** نمایش ویدیو
- **Cost Display:** نمایش هزینه Real-time (مثلاً "Minutes watched € 0.10")
- **Controls:** دکمه‌های "Pause" و "Add Credit"
- **Low Balance Warning:** هشدار زمانی که اعتبار کم می‌شود

**Flow:**
- کاربر ویدیو را تماشا می‌کند
- هزینه به صورت Real-time محاسبه و نمایش داده می‌شود
- اگر اعتبار کم شود، هشدار نمایش داده می‌شود
- کاربر می‌تواند "Pause" یا "Add Credit" را انتخاب کند
- با کلیک روی "Stop" به صفحه Usage Summary منتقل می‌شود

---

### 3. Usage Summary Screen (خلاصه مصرف)

**عناصر:**
- **Watch Time:** "You watched for 8 min."
- **Total Charge:** "Total charge: € 0.16"
- **Remaining Balance:** "Remaining balance € 4.84"
- **Action:** دکمه "Add Credit"

**Flow:**
- نمایش خلاصه مصرف و هزینه
- کاربر می‌تواند "Add Credit" را انتخاب کند
- یا "Return to Home" را انتخاب کند

---

### 4. Add Credit Screen (افزودن اعتبار)

**عناصر:**
- **Input Field:** "Enter amount to add"
- **Payment Methods:** 
  - Credit Card
  - PayPal
  - Crypto Option
  - Wallet
- **Action:** دکمه "Confirm Top Up"

**Flow:**
- کاربر مبلغ را وارد می‌کند
- روش پرداخت را انتخاب می‌کند
- "Confirm Top Up" را کلیک می‌کند
- اعتبار به کیف پول اضافه می‌شود

---

## 👥 Partner Flow (جریان پارتنر)

### 5. Partner Dashboard (داشبورد پارتنر)

**عناصر:**
- **Welcome Message:** "Welcome, [Partner Name]"
- **Metrics:**
  - Total Users
  - Active Sessions
  - Total Revenue
- **Chart:** "View time vs. income" (نمودار خطی)
- **Analytics:** "User engagement trends"
- **Action:** دکمه "View Detailed Analytics"

**Flow:**
- پارتنر وارد داشبورد می‌شود
- آمار و Analytics را مشاهده می‌کند
- می‌تواند به Analytics Detail برود

---

### 6. Analytics Overview (نمای کلی Analytics)

**عناصر:**
- **Header:** آیکون Analytics
- **Data Display:** نمایش داده‌ها و نمودارها
- **Action:** دکمه "Billing & Settings"

**Flow:**
- پارتنر Analytics را مشاهده می‌کند
- می‌تواند به Billing & Settings برود

---

### 7. Set Rate per Minute (تنظیم نرخ هر دقیقه)

**عناصر:**
- **Rate Input:** فیلد ورودی برای تنظیم نرخ (€)
- **Settlement Frequency:** "Choose Settlement Frequency"
- **Past Payouts:** "View Past Payouts"

**Flow:**
- پارتنر نرخ هر دقیقه را تنظیم می‌کند
- فرکانس تسویه را انتخاب می‌کند
- پرداخت‌های گذشته را مشاهده می‌کند

---

## 🔄 Complete User Journey

### User Journey (سفر کاربر):

1. **Home/Browse** → انتخاب محتوا
2. **Player** → تماشای ویدیو با پرداخت لحظه‌ای
3. **Usage Summary** → مشاهده خلاصه مصرف
4. **Add Credit** (در صورت نیاز) → افزودن اعتبار
5. **Return to Home** → بازگشت به صفحه اصلی

### Partner Journey (سفر پارتنر):

1. **Partner Dashboard** → مشاهده آمار کلی
2. **Analytics Overview** → مشاهده Analytics تفصیلی
3. **Set Rate per Minute** → تنظیم نرخ و تسویه

---

## 🎨 Design Principles

### Low Fidelity (سادگی):
- استفاده از Boxes و Placeholders
- تمرکز بر Layout و Flow
- بدون رنگ و Branding

### Key Screens:
1. Home/Browse
2. Player
3. Usage Summary
4. Add Credit
5. Partner Dashboard

### Flow Indicators:
- فلش‌ها برای نشان دادن جریان
- Label‌ها برای توضیح Actions
- Clear Navigation Paths

---

## 📱 Key Interactions

### User Interactions:
- **Click "Watch Now"** → Start Player
- **Click "Stop"** → Go to Usage Summary
- **Click "Add Credit"** → Go to Add Credit Screen
- **Low Balance** → Show Warning → Option to Add Credit

### Partner Interactions:
- **View Analytics** → See Detailed Analytics
- **Set Rate** → Configure Payment Settings
- **View Payouts** → See Settlement History

---

**تاریخ آخرین به‌روزرسانی:** 2025-11-04  
**ورژن:** 1.0

