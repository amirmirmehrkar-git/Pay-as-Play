# Icon Generation Guide

## روش 1: استفاده از SVG (توصیه می‌شود)

فایل‌های SVG در این پوشه موجود هستند. Chrome Extension می‌تواند از SVG استفاده کند.

## روش 2: تبدیل SVG به PNG

### استفاده از ImageMagick:
```bash
convert icon16.svg -resize 16x16 icon16.png
convert icon48.svg -resize 48x48 icon48.png
convert icon128.svg -resize 128x128 icon128.png
```

### استفاده از Online Converter:
1. به https://convertio.co/svg-png/ بروید
2. فایل SVG را آپلود کنید
3. اندازه را تنظیم کنید
4. PNG را دانلود کنید

### استفاده از Node.js Script:
```bash
node generate-icons.js
```

## روش 3: استفاده از Icon Generator HTML

1. فایل `create-icons.html` را در مرورگر باز کنید
2. روی دکمه‌های "Generate" کلیک کنید
3. فایل‌های PNG به صورت خودکار دانلود می‌شوند

## اندازه‌های مورد نیاز:

- **icon16.png** - 16x16 pixels (toolbar)
- **icon48.png** - 48x48 pixels (extensions page)
- **icon128.png** - 128x128 pixels (Chrome Web Store)

## طراحی آیکون:

- Background: Gradient (Blue → Purple)
- Icon: 💰 (Money bag emoji)
- Style: Modern, rounded corners
- Colors: #667eea to #764ba2

