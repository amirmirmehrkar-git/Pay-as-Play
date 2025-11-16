# 🎨 Design System - Play and Pay

**پروژه:** Pay as Play  
**تاریخ ایجاد:** 2025-11-04  
**آخرین به‌روزرسانی:** 2025-11-04  
**ورژن:** 1.0

---

## 🎨 Brand Identity

### Color Palette

#### Primary Gradient
- **From:** `#7C8CF8` (Purple-Blue)
- **To:** `#2DE1C2` (Cyan-Green)
- **Usage:** Hero sections, buttons, brand elements

#### Primary Colors
- **Primary Purple:** `#7C8CF8`
- **Primary Cyan:** `#2DE1C2`
- **Primary Dark:** `#1A1F3A` (Text, Headers)
- **Primary Light:** `#F8F9FA` (Backgrounds)

#### Semantic Colors
- **Success:** `#10B981` (Green)
- **Warning:** `#F59E0B` (Orange)
- **Error:** `#EF4444` (Red)
- **Info:** `#3B82F6` (Blue)

#### Neutral Colors
- **Gray 50:** `#F9FAFB`
- **Gray 100:** `#F3F4F6`
- **Gray 200:** `#E5E7EB`
- **Gray 300:** `#D1D5DB`
- **Gray 400:** `#9CA3AF`
- **Gray 500:** `#6B7280`
- **Gray 600:** `#4B5563`
- **Gray 700:** `#374151`
- **Gray 800:** `#1F2937`
- **Gray 900:** `#111827`

---

## 📝 Typography

### Font Families

#### Primary (English/Latin)
- **Font:** Inter
- **Weights:** 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- **Usage:** Body text, UI elements, English content

#### Secondary (Persian/Arabic)
- **Font:** IRANSans
- **Weights:** 400 (Regular), 500 (Medium), 600 (Bold), 700 (ExtraBold)
- **Usage:** Persian/Arabic text, RTL layouts

### Type Scale

#### Headings
- **H1:** 32px / 40px (2rem / 2.5rem) - Bold
- **H2:** 24px / 32px (1.5rem / 2rem) - SemiBold
- **H3:** 20px / 28px (1.25rem / 1.75rem) - SemiBold
- **H4:** 18px / 24px (1.125rem / 1.5rem) - Medium
- **H5:** 16px / 22px (1rem / 1.375rem) - Medium
- **H6:** 14px / 20px (0.875rem / 1.25rem) - Medium

#### Body Text
- **Large:** 18px / 28px (1.125rem / 1.75rem) - Regular
- **Base:** 16px / 24px (1rem / 1.5rem) - Regular
- **Small:** 14px / 20px (0.875rem / 1.25rem) - Regular
- **Tiny:** 12px / 16px (0.75rem / 1rem) - Regular

#### UI Elements
- **Button Large:** 16px / 24px - Medium
- **Button Base:** 14px / 20px - Medium
- **Button Small:** 12px / 16px - Medium
- **Label:** 14px / 20px - Medium
- **Caption:** 12px / 16px - Regular

---

## 🧱 Spacing System

### Base Unit: 4px

- **0:** 0px
- **1:** 4px (0.25rem)
- **2:** 8px (0.5rem)
- **3:** 12px (0.75rem)
- **4:** 16px (1rem)
- **5:** 20px (1.25rem)
- **6:** 24px (1.5rem)
- **8:** 32px (2rem)
- **10:** 40px (2.5rem)
- **12:** 48px (3rem)
- **16:** 64px (4rem)
- **20:** 80px (5rem)

---

## 🔲 Border Radius

- **None:** 0px
- **Small:** 4px (0.25rem)
- **Base:** 8px (0.5rem)
- **Medium:** 12px (0.75rem)
- **Large:** 16px (1rem)
- **XLarge:** 24px (1.5rem)
- **Full:** 9999px (Circle)

**Default:** 8-12px for cards, buttons, and containers

---

## 🎭 Shadows

### Elevation Levels

- **None:** `none`
- **Small:** `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- **Base:** `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)`
- **Medium:** `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
- **Large:** `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
- **XLarge:** `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`

---

## 🔘 Buttons

### Primary Button
- **Background:** Gradient (`#7C8CF8` to `#2DE1C2`)
- **Text Color:** White (`#FFFFFF`)
- **Padding:** 12px 24px
- **Border Radius:** 12px
- **Font:** Medium, 14px
- **Shadow:** Base
- **Hover:** Slightly darker gradient
- **Active:** Pressed state (scale 0.98)

### Secondary Button
- **Background:** Transparent
- **Border:** 2px solid `#7C8CF8`
- **Text Color:** `#7C8CF8`
- **Padding:** 12px 24px
- **Border Radius:** 12px
- **Font:** Medium, 14px
- **Hover:** Background `#7C8CF8` with 10% opacity

### Tertiary Button
- **Background:** `#F3F4F6`
- **Text Color:** `#1F2937`
- **Padding:** 12px 24px
- **Border Radius:** 12px
- **Font:** Medium, 14px
- **Hover:** Background `#E5E7EB`

### Icon Button
- **Size:** 40px × 40px
- **Border Radius:** 12px
- **Background:** Transparent or `#F3F4F6`
- **Icon Size:** 20px

---

## 📦 Cards

### Default Card
- **Background:** White (`#FFFFFF`)
- **Border Radius:** 12px
- **Padding:** 24px
- **Shadow:** Base
- **Border:** None (or 1px `#E5E7EB` for subtle separation)

### Elevated Card
- **Background:** White (`#FFFFFF`)
- **Border Radius:** 12px
- **Padding:** 24px
- **Shadow:** Medium
- **Hover:** Shadow Large

---

## 🎯 Icons

### Icon Library
- **Style:** Minimal, outlined or filled
- **Size:** 16px, 20px, 24px, 32px
- **Stroke Width:** 1.5px (outlined), 2px (filled)
- **Color:** Inherit from parent or use semantic colors

### Key Icons
- **Watch:** 📺 / 🎬
- **Listen:** 🎵 / 🎧
- **Learn:** 📚 / 🎓
- **Wallet:** 💰 / 🏦
- **Play:** ▶️
- **Pause:** ⏸️
- **Stop:** ⏹️
- **Settings:** ⚙️
- **Analytics:** 📊
- **Transaction:** 💳

---

## 📱 Responsive Breakpoints

- **Mobile:** 320px - 767px
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px - 1439px
- **Large Desktop:** 1440px+

### Container Max Widths
- **Mobile:** Full width (with 16px padding)
- **Tablet:** 768px
- **Desktop:** 1200px
- **Large Desktop:** 1440px

---

## 🎬 Animations

### Transitions
- **Fast:** 150ms ease-in-out
- **Base:** 200ms ease-in-out
- **Slow:** 300ms ease-in-out

### Common Animations
- **Fade In:** `opacity: 0 → 1` (200ms)
- **Slide Up:** `transform: translateY(10px) → translateY(0)` (200ms)
- **Scale:** `transform: scale(0.95) → scale(1)` (200ms)
- **Gradient Shift:** Background gradient position shift (300ms)

### Micro-interactions
- **Button Hover:** Scale 1.02, shadow increase
- **Button Active:** Scale 0.98
- **Card Hover:** Shadow increase, slight lift
- **Icon Hover:** Scale 1.1, color change

---

## 🌐 Internationalization (i18n)

### Supported Languages
- **English (en):** LTR (Left-to-Right)
- **Persian/Farsi (fa):** RTL (Right-to-Left)

### RTL Support
- **Library:** `tailwindcss-rtl` for RTL utilities
- **Direction Classes:**
  - `rtl:` prefix for RTL-specific styles
  - `ltr:` prefix for LTR-specific styles
- **Layout:** Automatic direction switching based on locale

### Language Switcher
- **Location:** Settings page, top navigation
- **Options:** English | فارسی
- **Icon:** Globe icon (🌐)
- **Behavior:** Instant switch, no page reload

### Typography per Language
- **English:** Inter (Latin characters)
- **Persian:** IRANSans (Persian/Arabic characters)
- **Mixed Content:** Both fonts loaded, automatic selection

---

## 🌓 Dark Mode (Future)

### Dark Theme Colors
- **Background:** `#0F172A`
- **Surface:** `#1E293B`
- **Text Primary:** `#F1F5F9`
- **Text Secondary:** `#CBD5E1`
- **Border:** `#334155`

---

## 🎨 Brand Tone

### Visual Style
- **Clean:** Minimal, uncluttered
- **Futuristic:** Modern gradients, smooth animations
- **Fair:** Transparent, honest, trustworthy

### Tagline
**"Every second counts — pay fair, play free."**

### Design Principles
1. **Transparency:** Clear information, no hidden costs
2. **Fairness:** Equal treatment, honest pricing
3. **Simplicity:** Easy to understand, easy to use
4. **Elegance:** Beautiful, polished, professional

---

## 📐 Layout Guidelines

### Grid System
- **Columns:** 12 columns
- **Gutter:** 24px (desktop), 16px (mobile)
- **Margin:** 24px (desktop), 16px (mobile)

### Spacing Rules
- **Between Sections:** 48px (desktop), 32px (mobile)
- **Between Cards:** 24px (desktop), 16px (mobile)
- **Within Cards:** 24px padding
- **Between Form Elements:** 16px

---

## ♿ Accessibility

### Color Contrast
- **Text on Background:** Minimum 4.5:1 (WCAG AA)
- **Large Text:** Minimum 3:1 (WCAG AA)

### Interactive Elements
- **Minimum Touch Target:** 44px × 44px
- **Focus States:** Clear, visible outline
- **Keyboard Navigation:** Full support

---

**تاریخ آخرین به‌روزرسانی:** 2025-11-04  
**ورژن:** 1.0

