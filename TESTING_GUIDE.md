# 🧪 Testing Guide - Phase 2 Frontend
## Play and Pay

**تاریخ:** 2025-11-16

---

## ✅ Build Status

**Build موفق بود!** ✅

```
✓ Compiled successfully in 22.5s
✓ Generating static pages (6/6) in 3.0s

Routes:
- / (Home)
- /player (Video Player)
- /summary (Usage Summary)
```

---

## 🚀 Testing Steps

### 1. Development Server

```bash
cd C:\Amir\pay-as-play-project
npm run dev
```

**URL:** http://localhost:3000

---

### 2. Test Scenarios

#### Test 1: Wallet Connection
1. باز کردن http://localhost:3000
2. کلیک روی "Connect Pera Wallet"
3. تایید در Pera Wallet extension
4. بررسی نمایش Wallet Address و Balance

**Expected:**
- ✅ Wallet connected
- ✅ Address نمایش داده می‌شود
- ✅ Balance نمایش داده می‌شود

---

#### Test 2: Content Selection
1. بعد از Wallet Connection
2. مشاهده لیست Content
3. کلیک روی "Start Now" برای یک Content

**Expected:**
- ✅ لیست Content نمایش داده می‌شود
- ✅ Navigation به `/player` انجام می‌شود

---

#### Test 3: Video Player
1. در صفحه `/player`
2. کلیک روی "Start Watching"
3. مشاهده Timer و Charge
4. کلیک روی "Stop"

**Expected:**
- ✅ Session شروع می‌شود
- ✅ Timer شروع می‌شود
- ✅ Charge به‌روزرسانی می‌شود
- ✅ Navigation به `/summary` انجام می‌شود

---

#### Test 4: Usage Summary
1. در صفحه `/summary`
2. مشاهده Session Details
3. مشاهده Total Charge
4. مشاهده Remaining Balance

**Expected:**
- ✅ Session Details نمایش داده می‌شود
- ✅ Total Charge صحیح است
- ✅ Balance به‌روزرسانی شده است

---

## 🔧 Troubleshooting

### مشکل 1: SDK Import Error

**خطا:**
```
Cannot find module '../playandpay-sdk/src/index.js'
```

**راه‌حل:**
```bash
# بررسی نصب SDK
cd playandpay-sdk
npm install

# بررسی path
ls src/index.js
```

---

### مشکل 2: Wallet Connection Error

**خطا:**
```
Pera Wallet not found
```

**راه‌حل:**
1. نصب Pera Wallet extension
2. بررسی که extension فعال است
3. Refresh صفحه

---

### مشکل 3: Build Error

**خطا:**
```
Module not found
```

**راه‌حل:**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

---

## 📋 Checklist

### Functional Tests
- [ ] Wallet Connection
- [ ] Content Selection
- [ ] Video Player Start/Stop
- [ ] Timer functionality
- [ ] Billing calculation
- [ ] Usage Summary
- [ ] Navigation

### UI/UX Tests
- [ ] Responsive design
- [ ] Loading states
- [ ] Error messages
- [ ] Dark mode support

### Integration Tests
- [ ] SDK initialization
- [ ] Wallet operations
- [ ] Billing operations
- [ ] Session management

---

## 🎯 Next Steps

بعد از تست موفق:
1. Fix کردن bugs
2. بهبود Error handling
3. بهبود Loading states
4. UI/UX polish

---

**Status:** 🟢 Ready for Testing

