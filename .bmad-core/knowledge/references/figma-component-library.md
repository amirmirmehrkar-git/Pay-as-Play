# 🎨 Figma Component Library - Play and Pay

**پروژه:** Pay as Play  
**تاریخ ایجاد:** 2025-11-04  
**آخرین به‌روزرسانی:** 2025-11-04  
**ورژن:** 1.0

---

## 📦 ساختار Component Library

این سند شامل تمام کامپوننت‌های قابل استفاده مجدد برای سیستم طراحی Play and Pay است.

---

## 🎨 Color & Theme Tokens

### Light Mode Colors

#### Primary Gradient
- **Gradient Start:** `#7C8CF8` (Purple-Blue)
- **Gradient End:** `#2DE1C2` (Cyan-Green)
- **Usage:** Buttons, Hero sections, Brand elements

#### Background Colors
- **Background Primary:** `#FFFFFF` (White)
- **Background Secondary:** `#F8F9FA` (Light Gray)
- **Background Tertiary:** `#F3F4F6` (Gray 100)

#### Surface Colors
- **Surface Primary:** `#FFFFFF` (White)
- **Surface Secondary:** `#F9FAFB` (Gray 50)
- **Surface Elevated:** `#FFFFFF` with Shadow

#### Text Colors
- **Text Primary:** `#1A1F3A` (Dark Blue)
- **Text Secondary:** `#6B7280` (Gray 600)
- **Text Tertiary:** `#9CA3AF` (Gray 400)
- **Text Inverse:** `#FFFFFF` (White)

#### Semantic Colors
- **Success:** `#10B981` (Green)
- **Warning:** `#F59E0B` (Orange)
- **Error:** `#EF4444` (Red)
- **Info:** `#3B82F6` (Blue)

#### Border Colors
- **Border Primary:** `#E5E7EB` (Gray 200)
- **Border Secondary:** `#D1D5DB` (Gray 300)
- **Border Focus:** `#7C8CF8` (Primary Purple)

---

### Dark Mode Colors

#### Primary Gradient (Inverted)
- **Gradient Start:** `#2DE1C2` (Cyan-Green)
- **Gradient End:** `#7C8CF8` (Purple-Blue)
- **Usage:** Buttons, Hero sections (inverted gradient)

#### Background Colors
- **Background Primary:** `#0F172A` (Slate 900)
- **Background Secondary:** `#1E293B` (Slate 800)
- **Background Tertiary:** `#334155` (Slate 700)

#### Surface Colors
- **Surface Primary:** `#1E293B` (Slate 800)
- **Surface Secondary:** `#334155` (Slate 700)
- **Surface Elevated:** `#1E293B` with Dark Shadow

#### Text Colors
- **Text Primary:** `#F1F5F9` (Slate 100)
- **Text Secondary:** `#CBD5E1` (Slate 300)
- **Text Tertiary:** `#94A3B8` (Slate 400)
- **Text Inverse:** `#0F172A` (Dark)

#### Semantic Colors (Same as Light)
- **Success:** `#10B981` (Green)
- **Warning:** `#F59E0B` (Orange)
- **Error:** `#EF4444` (Red)
- **Info:** `#3B82F6` (Blue)

#### Border Colors
- **Border Primary:** `#334155` (Slate 700)
- **Border Secondary:** `#475569` (Slate 600)
- **Border Focus:** `#2DE1C2` (Primary Cyan)

---

## 🔠 Typography Tokens

### Font Families

#### English (LTR)
- **Primary:** Inter
- **Weights:** 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

#### Persian (RTL)
- **Primary:** IRANSans
- **Weights:** 400 (Regular), 500 (Medium), 600 (Bold), 700 (ExtraBold)

### Type Scale

#### Headings
- **H1:** 32px / 40px line-height, Bold
- **H2:** 24px / 32px line-height, SemiBold
- **H3:** 20px / 28px line-height, SemiBold
- **H4:** 18px / 24px line-height, Medium
- **H5:** 16px / 22px line-height, Medium
- **H6:** 14px / 20px line-height, Medium

#### Body Text
- **Large:** 18px / 28px line-height, Regular
- **Base:** 16px / 24px line-height, Regular
- **Small:** 14px / 20px line-height, Regular
- **Tiny:** 12px / 16px line-height, Regular

#### UI Elements
- **Button Large:** 16px / 24px line-height, Medium
- **Button Base:** 14px / 20px line-height, Medium
- **Button Small:** 12px / 16px line-height, Medium
- **Label:** 14px / 20px line-height, Medium
- **Caption:** 12px / 16px line-height, Regular

---

## 🧱 Spacing & Radius Tokens

### Spacing Scale (Base: 4px)
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

### Border Radius
- **None:** 0px
- **Small:** 4px (0.25rem)
- **Base:** 8px (0.5rem)
- **Medium:** 12px (0.75rem) - **Default**
- **Large:** 16px (1rem)
- **XLarge:** 24px (1.5rem)
- **Full:** 9999px (Circle)

### Padding Tokens
- **Button Padding:** 12px 24px
- **Card Padding:** 24px
- **Input Padding:** 12px 16px
- **Icon Padding:** 8px

### Margin Tokens
- **Section Margin:** 48px (Desktop), 32px (Mobile)
- **Card Margin:** 24px (Desktop), 16px (Mobile)
- **Element Margin:** 16px

---

## ⚙️ Component Tokens

### Buttons

#### Primary Button
- **Background:** Gradient (`#7C8CF8` to `#2DE1C2`)
- **Text Color:** White (`#FFFFFF`)
- **Padding:** 12px 24px
- **Border Radius:** 12px
- **Font:** Medium, 14px
- **Shadow:** Base shadow
- **Hover:** Slightly darker gradient, scale 1.02
- **Active:** Scale 0.98
- **Disabled:** Opacity 0.5

#### Secondary Button
- **Background:** Transparent
- **Border:** 2px solid `#7C8CF8`
- **Text Color:** `#7C8CF8`
- **Padding:** 12px 24px
- **Border Radius:** 12px
- **Font:** Medium, 14px
- **Hover:** Background `#7C8CF8` with 10% opacity
- **Dark Mode:** Border `#2DE1C2`, Text `#2DE1C2`

#### Tertiary Button
- **Background:** `#F3F4F6` (Light) / `#334155` (Dark)
- **Text Color:** `#1F2937` (Light) / `#F1F5F9` (Dark)
- **Padding:** 12px 24px
- **Border Radius:** 12px
- **Font:** Medium, 14px
- **Hover:** Background `#E5E7EB` (Light) / `#475569` (Dark)

#### Icon Button
- **Size:** 40px × 40px
- **Border Radius:** 12px
- **Background:** Transparent or `#F3F4F6` (Light) / `#334155` (Dark)
- **Icon Size:** 20px
- **Hover:** Background with 10% opacity

#### Text Button
- **Background:** Transparent
- **Text Color:** `#7C8CF8` (Light) / `#2DE1C2` (Dark)
- **Padding:** 8px 16px
- **Font:** Medium, 14px
- **Hover:** Underline

---

### Cards

#### Default Card
- **Background:** White (Light) / `#1E293B` (Dark)
- **Border Radius:** 12px
- **Padding:** 24px
- **Shadow:** Base shadow (Light) / Dark shadow (Dark)
- **Border:** None (or 1px `#E5E7EB` for Light / `#334155` for Dark)

#### Elevated Card
- **Background:** White (Light) / `#1E293B` (Dark)
- **Border Radius:** 12px
- **Padding:** 24px
- **Shadow:** Medium shadow (Light) / Dark medium shadow (Dark)
- **Hover:** Shadow Large (Light) / Dark large shadow (Dark)

#### Gradient Card
- **Background:** Gradient (`#7C8CF8` to `#2DE1C2`)
- **Border Radius:** 16px
- **Padding:** 24px
- **Text Color:** White
- **Shadow:** Medium shadow

#### Content Card
- **Background:** White (Light) / `#1E293B` (Dark)
- **Border Radius:** 12px
- **Padding:** 16px
- **Shadow:** Small shadow
- **Thumbnail:** 16:9 aspect ratio, rounded top corners

---

### Navigation Components

#### Tab Bar
- **Background:** White (Light) / `#1E293B` (Dark)
- **Height:** 56px
- **Border Top:** 1px `#E5E7EB` (Light) / `#334155` (Dark)
- **Tab Padding:** 12px 16px
- **Active Indicator:** Gradient underline, 2px height
- **Icon Size:** 24px
- **Text:** Medium, 12px

#### Top Navigation Bar
- **Background:** Transparent or White (Light) / `#1E293B` (Dark)
- **Height:** 64px
- **Padding:** 16px 24px
- **Shadow:** Small shadow (when scrolled)

#### Bottom Sheet
- **Background:** White (Light) / `#1E293B` (Dark)
- **Border Radius:** 24px (top corners)
- **Handle:** 4px × 40px, `#D1D5DB` (Light) / `#475569` (Dark)
- **Padding:** 24px

---

### Form Components

#### Input Field
- **Background:** White (Light) / `#1E293B` (Dark)
- **Border:** 1px `#E5E7EB` (Light) / `#334155` (Dark)
- **Border Radius:** 8px
- **Padding:** 12px 16px
- **Font:** Regular, 16px
- **Focus:** Border `#7C8CF8` (Light) / `#2DE1C2` (Dark), 2px
- **Error:** Border `#EF4444`, Error message below
- **Placeholder:** `#9CA3AF` (Light) / `#94A3B8` (Dark)

#### Textarea
- **Same as Input Field**
- **Min Height:** 100px
- **Resize:** Vertical

#### Select/Dropdown
- **Same as Input Field**
- **Icon:** Chevron down, 20px
- **Options:** Dropdown menu with hover states

#### Checkbox
- **Size:** 20px × 20px
- **Border:** 2px `#D1D5DB` (Light) / `#475569` (Dark)
- **Border Radius:** 4px
- **Checked:** Gradient background, white checkmark
- **Hover:** Border color change

#### Switch/Toggle
- **Width:** 44px
- **Height:** 24px
- **Border Radius:** 12px
- **Background Off:** `#D1D5DB` (Light) / `#475569` (Dark)
- **Background On:** Gradient
- **Thumb:** 20px × 20px, White, Circle

---

### Display Components

#### Badge
- **Padding:** 4px 12px
- **Border Radius:** 12px
- **Font:** Medium, 12px
- **Variants:**
  - **Primary:** Gradient background, white text
  - **Secondary:** `#F3F4F6` (Light) / `#334155` (Dark) background
  - **Success:** `#10B981` background, white text
  - **Warning:** `#F59E0B` background, white text
  - **Error:** `#EF4444` background, white text

#### Avatar
- **Size:** 40px, 60px, 80px
- **Border Radius:** Full (Circle)
- **Border:** 2px White (Light) / `#1E293B` (Dark)
- **Placeholder:** Gradient background, initials

#### Progress Bar
- **Height:** 4px
- **Background:** `#E5E7EB` (Light) / `#334155` (Dark)
- **Fill:** Gradient
- **Border Radius:** 2px

#### Skeleton Loader
- **Background:** `#F3F4F6` (Light) / `#334155` (Dark)
- **Animation:** Shimmer effect
- **Border Radius:** 8px

---

### Overlay Components

#### Modal
- **Background Overlay:** `rgba(0, 0, 0, 0.5)` (Light) / `rgba(0, 0, 0, 0.8)` (Dark)
- **Modal Background:** White (Light) / `#1E293B` (Dark)
- **Border Radius:** 16px
- **Padding:** 24px
- **Max Width:** 500px
- **Shadow:** XLarge shadow

#### Toast/Notification
- **Background:** White (Light) / `#1E293B` (Dark)
- **Border Radius:** 12px
- **Padding:** 16px 20px
- **Shadow:** Large shadow
- **Position:** Top right (LTR) / Top left (RTL)
- **Variants:** Success, Warning, Error, Info

#### Tooltip
- **Background:** `#1F2937` (Light) / `#F1F5F9` (Dark)
- **Text Color:** White (Light) / `#0F172A` (Dark)
- **Padding:** 8px 12px
- **Border Radius:** 8px
- **Font:** Regular, 12px
- **Arrow:** 8px triangle

---

### Player Components

#### Video Player
- **Aspect Ratio:** 16:9
- **Background:** Black
- **Controls:** Semi-transparent overlay
- **Border Radius:** 12px (container)

#### Cost Tracker
- **Background:** `rgba(0, 0, 0, 0.7)`
- **Border Radius:** 12px
- **Padding:** 12px 16px
- **Text Color:** White
- **Font:** Medium, 14px
- **Animation:** Pulse on update

#### Play/Pause Button
- **Size:** 64px × 64px
- **Background:** `rgba(0, 0, 0, 0.6)`
- **Border Radius:** Full (Circle)
- **Icon:** White, 24px
- **Hover:** Scale 1.1

---

### Wallet Components

#### Balance Card
- **Background:** Gradient (`#7C8CF8` to `#2DE1C2`)
- **Border Radius:** 16px
- **Padding:** 24px
- **Text Color:** White
- **Shadow:** Medium shadow

#### Transaction Item
- **Background:** White (Light) / `#1E293B` (Dark)
- **Padding:** 16px
- **Border Radius:** 12px
- **Border Bottom:** 1px `#E5E7EB` (Light) / `#334155` (Dark)
- **Icon:** 40px × 40px, rounded
- **Hover:** Background `#F9FAFB` (Light) / `#334155` (Dark)

---

## 🎭 Shadow Tokens

### Light Mode Shadows
- **None:** `none`
- **Small:** `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- **Base:** `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)`
- **Medium:** `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
- **Large:** `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
- **XLarge:** `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`

### Dark Mode Shadows
- **None:** `none`
- **Small:** `0 1px 2px 0 rgba(0, 0, 0, 0.3)`
- **Base:** `0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)`
- **Medium:** `0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)`
- **Large:** `0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)`
- **XLarge:** `0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)`

---

## 🔄 Animation Tokens

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
- **Card Hover:** Shadow increase, slight lift (translateY -2px)
- **Icon Hover:** Scale 1.1, color change
- **Pulse:** Scale 1 → 1.05 → 1 (for cost tracker updates)

---

## 📐 Layout Tokens

### Grid System
- **Columns:** 12 columns
- **Gutter:** 24px (Desktop), 16px (Mobile)
- **Margin:** 24px (Desktop), 16px (Mobile)

### Container Max Widths
- **Mobile:** Full width (with 16px padding)
- **Tablet:** 768px
- **Desktop:** 1200px
- **Large Desktop:** 1440px

### Breakpoints
- **Mobile:** 320px - 767px
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px - 1439px
- **Large Desktop:** 1440px+

---

## 🌐 RTL Support Tokens

### Direction Classes
- **LTR:** Left-to-Right (English)
- **RTL:** Right-to-Left (Persian)

### Alignment
- **Text Align:** Auto (based on direction)
- **Flex Direction:** Row (LTR) / Row-reverse (RTL)
- **Margin/Padding:** Auto-flip based on direction

### Icons
- **Arrow Icons:** Flip horizontally in RTL
- **Navigation Icons:** Mirror positions

---

## 📱 Responsive Tokens

### Mobile
- **Font Scale:** 0.875x (14px base)
- **Spacing Scale:** 0.75x
- **Touch Targets:** Minimum 44px × 44px

### Tablet
- **Font Scale:** 1x (16px base)
- **Spacing Scale:** 1x
- **Touch Targets:** 48px × 48px

### Desktop
- **Font Scale:** 1x (16px base)
- **Spacing Scale:** 1.25x
- **Hover States:** Enabled
- **Keyboard Navigation:** Full support

---

## 🎨 Theme Switching

### Light Mode
- **Primary:** Use Light Mode color tokens
- **Gradient:** `#7C8CF8` → `#2DE1C2`
- **Background:** White/Gray
- **Text:** Dark

### Dark Mode
- **Primary:** Use Dark Mode color tokens
- **Gradient:** `#2DE1C2` → `#7C8CF8` (Inverted)
- **Background:** Dark Slate
- **Text:** Light

### Theme Toggle
- **Location:** Settings page
- **Type:** Switch/Toggle component
- **Behavior:** Instant switch, no page reload
- **Storage:** Local Storage or User Preference

---

## 📦 Component Variants

### Button Variants
- Primary (Gradient)
- Secondary (Outline)
- Tertiary (Ghost)
- Icon Only
- Text Only
- Sizes: Large, Base, Small

### Card Variants
- Default
- Elevated
- Gradient
- Content Card
- Transaction Card

### Badge Variants
- Primary (Gradient)
- Secondary (Gray)
- Success (Green)
- Warning (Orange)
- Error (Red)

---

**تاریخ آخرین به‌روزرسانی:** 2025-11-04  
**ورژن:** 1.0

