# 🚀 Chrome Extension Setup Guide

## 📦 نصب افزونه

### مرحله 1: آماده‌سازی

1. پوشه `chrome-extension` را بررسی کنید
2. فایل‌های زیر باید موجود باشند:
   - `manifest.json`
   - `popup.html`
   - `popup.css`
   - `popup.js`
   - `background.js`
   - `content.js`
   - `content.css`

### مرحله 2: ایجاد آیکون‌ها

آیکون‌های افزونه را در پوشه `chrome-extension/icons/` قرار دهید:

- `icon16.png` - 16x16 pixels
- `icon48.png` - 48x48 pixels
- `icon128.png` - 128x128 pixels

**نکته:** می‌توانید از یک تصویر SVG استفاده کنید و آن را به PNG تبدیل کنید.

### مرحله 3: نصب در Chrome

1. Chrome را باز کنید
2. به `chrome://extensions/` بروید
3. "Developer mode" را در گوشه بالا-راست فعال کنید
4. روی "Load unpacked" کلیک کنید
5. پوشه `chrome-extension` را انتخاب کنید

### مرحله 4: تست

1. روی آیکون افزونه در toolbar کلیک کنید
2. Popup باید باز شود
3. "Connect Wallet" را کلیک کنید
4. باید به `http://localhost:3000` هدایت شوید

## 🎨 ویژگی‌های UI

### Popup Design
- ✅ Gradient background
- ✅ Modern card design
- ✅ Smooth animations
- ✅ Responsive layout

### Content Script
- ✅ Floating badge indicator
- ✅ Click to open popup
- ✅ Connection status indicator

## 🔧 Development

### Hot Reload

برای reload کردن افزونه بعد از تغییرات:

1. به `chrome://extensions/` بروید
2. روی آیکون "Reload" کلیک کنید

### Debug

- **Popup:** راست کلیک روی آیکون → "Inspect popup"
- **Background:** `chrome://extensions/` → "Service worker"
- **Content Script:** DevTools در صفحه

## 📱 Responsive Design

افزونه در تمام اندازه‌های صفحه کار می‌کند:

- Desktop: Full popup (360px)
- Tablet: Responsive layout
- Mobile: Compact view

## 🔐 Permissions

افزونه به این permissions نیاز دارد:

- `storage` - ذخیره وضعیت Wallet
- `activeTab` - دسترسی به تب فعلی
- `scripting` - اجرای Scripts

## 🚀 Deployment

برای انتشار در Chrome Web Store:

1. فایل‌ها را ZIP کنید
2. به [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole) بروید
3. "New Item" را کلیک کنید
4. ZIP file را آپلود کنید
5. اطلاعات را تکمیل کنید
6. Submit کنید

## 📝 Notes

- افزونه با `http://localhost:3000` کار می‌کند
- برای production، URL را در `manifest.json` تغییر دهید
- آیکون‌ها را اضافه کنید

## ✅ Checklist

- [ ] فایل‌های افزونه ایجاد شدند
- [ ] آیکون‌ها اضافه شدند
- [ ] افزونه در Chrome نصب شد
- [ ] Popup کار می‌کند
- [ ] Wallet connection کار می‌کند
- [ ] Content script کار می‌کند
- [ ] Responsive design تست شد

