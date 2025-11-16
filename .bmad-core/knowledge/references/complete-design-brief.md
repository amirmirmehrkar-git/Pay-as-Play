# 🎨 Complete Design Brief - Play and Pay

**پروژه:** Pay as Play  
**تاریخ ایجاد:** 2025-11-04  
**آخرین به‌روزرسانی:** 2025-11-04  
**ورژن:** 1.0

---

## 🎯 Project Goal

Design and prototype a cross-platform app called **Play and Pay**, a blockchain-based OTT/VOD and audio streaming platform that enables **Pay-as-you-Use micro-payments** per second or minute of content consumption. Integrate design automation and logic flows for payments, wallets, and analytics via **Algorand blockchain + PlayCoin (PLY)**.

---

## 🎨 Design Requirements

### Visual Style
- **Theme:** Modern, minimalist, and intuitive
- **Gradient:** Light gradient from `#7C8CF8` to `#2DE1C2`
- **Typography:** 
  - English: Inter
  - Persian: IRANSans
- **Spacing:** Clean, airy spacing
- **Border Radius:** 8–12px for rounded corners
- **Icons:** Minimal and consistent
- **Animations:** Subtle, smooth transitions

### Brand Tone
- **Clean:** Minimal, uncluttered design
- **Futuristic:** Modern gradients, smooth animations
- **Fair:** Transparent, honest, trustworthy

### Tagline
**"Every second counts — pay fair, play free."**

---

## 📱 App Structure (7 Screens)

### 1. 🎬 Splash & Onboarding

#### Splash Screen
- **Brand Logo:** Animated logo (fade in + scale, 300ms)
- **Tagline:** "Watch what you love, pay only for what you use."
  - Font: Inter, SemiBold, 24px
  - Color: White (`#FFFFFF`)
  - Animation: Fade in (400ms delay)

#### Onboarding Slides (3 slides)

**Slide 1: Transparency**
- **Icon:** 📊 Analytics icon (80px)
- **Title:** "Complete Transparency"
- **Description:** "See exactly what you pay for every second"

**Slide 2: Fairness**
- **Icon:** ⚖️ Balance icon (80px)
- **Title:** "Fair Pricing"
- **Description:** "Pay only for what you actually consume"

**Slide 3: Wallet Connection**
- **Icon:** 💰 Wallet icon (80px)
- **Title:** "Easy Wallet Setup"
- **Description:** "Connect your Algorand wallet or create a new one"
- **CTA:** "Get Started" button

---

### 2. 🔐 Sign-in / Wallet Setup

#### Sign-in Options
1. **Email + Password**
   - Input fields: Email, Password
   - Button: "Sign In" (Primary gradient)
   - Link: "Forgot Password?"

2. **Google Sign-in**
   - Google branded button
   - Google logo icon (24px)

3. **Algorand Wallet Connect**
   - Button: "Connect Algorand Wallet" (Secondary)
   - Icon: Algorand logo (24px)
   - Description: "Connect using Pera Wallet, MyAlgo, or other Algorand wallets"

#### Wallet Setup
- **Create Wallet Button:** Primary gradient button
- **Top-up PlayCoin (PLY) Button:** Secondary button
  - Text: "Add PLY to your wallet"
  - Opens: Top-up modal

#### Language Selector
- **Options:** English | فارسی
- **Icon:** Globe icon (🌐)
- **Behavior:** Instant switch, updates all UI

---

### 3. 🏠 Home Dashboard

#### Top Bar
- **Logo:** Left (LTR) / Right (RTL), 40px × 40px
- **Language Switcher:** Right (LTR) / Left (RTL)
  - Icon: Globe (🌐)
  - Options: English | فارسی
- **Balance Indicator:** Right (LTR) / Left (RTL)
  - **Format:** "50 PLY (≈ €1.00)" - Shows both PLY and EUR equivalent
  - Background: Gradient card
  - Tap: Opens Wallet screen

#### Navigation Tabs
- **Tabs:** Watch | Listen | Learn | Wallet
- **Icons:** 📺 🎵 📚 💰
- **Active Tab:** Gradient underline
- **RTL Support:** Automatic direction switching

#### Hero Section
- **Title:** "Featured Content"
- **Content Thumbnails:** Horizontal scroll
  - Size: 160px × 240px (Mobile), 200px × 300px (Desktop)
  - Border Radius: 12px
  - Overlay: Price per minute (e.g., "0.02 PLY/min" or "€0.02/min")
  - Play Button: Overlay on hover/tap

#### Currently Watching Widget
- **Position:** Sticky bottom bar (if active)
- **Content:**
  - Thumbnail: 60px × 90px
  - Title: Content name
  - Timer: "00:05:23"
  - Cost: "0.10 PLY" or "€0.10"
  - Pause Button: Icon button
- **Background:** White card with shadow
- **Tap:** Opens Player screen

#### Content Grid
- **Layout:** 2 columns (Mobile), 4 columns (Desktop)
- **Card:**
  - Thumbnail: Full width, 16:9 aspect ratio
  - Title: Below thumbnail
  - Price: "0.02 PLY/min" or "€0.02/min" badge
  - Duration: "45 min" badge
  - Play Button: Overlay on hover

#### Search Bar
- **Position:** Below tabs
- **Placeholder:** "Search content..." / "جستجوی محتوا..."
- **Icon:** Search icon (20px)

---

### 4. ▶️ Player Screen

#### Video/Audio Player
- **Aspect Ratio:** 16:9
- **Controls:** Standard video controls (play, pause, seek, volume, fullscreen)
- **Position:** Center of screen
- **Background:** Black (`#000000`)

#### Live Cost Tracker
- **Position:** Top right overlay (LTR) / Top left overlay (RTL)
- **Background:** Semi-transparent dark (`rgba(0, 0, 0, 0.7)`)
- **Border Radius:** 12px
- **Padding:** 12px 16px
- **Content:**
  - Label: "Cost" / "هزینه"
  - Value: "0.01 PLY/min" or "€0.01/min" (updates in real-time)
  - Total: "0.24 PLY" or "€0.24" (cumulative)
- **Animation:** Pulse on update

#### Pause = Stop Billing Button
- **Position:** Below video player, center
- **Style:** Primary gradient button
- **Text:** "Pause = Stop billing instantly" / "توقف = توقف فوری پرداخت"
- **Icon:** Pause icon (20px)
- **Action:** Pauses video and stops billing immediately

#### Transparency Overlay
- **Position:** Bottom overlay (collapsible)
- **Background:** Semi-transparent dark
- **Content:**
  - Title: "Payment Summary" / "خلاصه پرداخت"
  - Line: "You've paid 0.24 PLY (≈ €0.24) for this content" / "شما 0.24 PLY (≈ €0.24) برای این محتوا پرداخت کرده‌اید"
  - Breakdown:
    - Time watched: "12:34" / "زمان تماشا: 12:34"
    - Rate: "0.02 PLY/min" or "€0.02/min" / "نرخ: 0.02 PLY/دقیقه"
    - Total: "0.24 PLY" or "€0.24" / "مجموع: 0.24 PLY"
- **Toggle:** Arrow icon to expand/collapse

#### Low Balance Warning
- **Position:** Top center banner
- **Background:** Warning color (`#F59E0B`)
- **Text:** "Low balance: 25 PLY (≈ €0.50) remaining" / "موجودی کم: 25 PLY (≈ €0.50) باقی مانده"
- **CTA:** "Add Credit" / "افزودن اعتبار" button
- **Auto-dismiss:** After 5 seconds or on tap

#### Exit Button
- **Position:** Top left (LTR) / Top right (RTL)
- **Icon:** Close/X icon (24px)
- **Action:** Returns to Home, shows Usage Summary

---

### 5. 💰 Wallet & Transactions

#### Header
- **Title:** "My Wallet" / "کیف پول من"
- **Back Button:** Top left (LTR) / Top right (RTL)

#### Balance Card
- **Background:** Gradient (`#7C8CF8` to `#2DE1C2`)
- **Border Radius:** 16px
- **Padding:** 24px
- **Content:**
  - Label: "Total Balance" / "موجودی کل"
  - Amount: "50 PLY" (Large, bold)
  - Equivalent: "≈ €1.00" (shows EUR equivalent)
  - Icon: Wallet icon (32px)

#### Action Buttons
- **Top-up Button:** Primary gradient button
  - Text: "Add PLY" / "افزودن PLY"
- **Withdraw Button:** Secondary button
  - Text: "Withdraw PLY" / "برداشت PLY"
- **Layout:** Horizontal, equal width

#### Transaction History
- **Section Title:** "Recent Transactions" / "تراکنش‌های اخیر"
- **Filter:** Dropdown (All, Top-up, Payment, Withdrawal)
- **List:**
  - Card per transaction
  - Date/Time: "Today, 14:30" / "امروز، 14:30"
  - Type: Icon + label (Top-up, Payment, etc.)
  - Amount: "+10.00 PLY (≈ €0.20)" or "-0.24 PLY (≈ €0.05)"
  - Status: "Confirmed" / "تأیید شده" badge
  - Tap: Opens transaction details

#### Smart Contract Confirmation Pop-up
- **Trigger:** On transaction initiation
- **Background:** Modal overlay (dark, 80% opacity)
- **Content:**
  - Title: "Confirm Transaction" / "تأیید تراکنش"
  - Details:
    - Amount: "0.24 PLY (≈ €0.24)"
    - To: "Content Provider" / "ارائه‌دهنده محتوا"
    - Network: "Algorand TestNet"
    - Fee: "0.001 ALGO"
  - Buttons:
    - "Confirm" / "تأیید" (Primary)
    - "Cancel" / "لغو" (Secondary)
- **Animation:** Slide up from bottom

---

### 6. 📊 Analytics Dashboard

#### Header
- **Title:** "Analytics" / "تحلیل‌ها"
- **Date Range Selector:** Dropdown (Today, Week, Month, Year)

#### Summary Cards (3 cards, horizontal scroll on mobile)
1. **Time Watched**
   - Value: "24h 30m"
   - Change: "+12% vs last month"
   - Icon: Clock icon
   - Background: White card

2. **Total Spent**
   - Value: "48.50 PLY (≈ €0.97)"
   - Change: "+8% vs last month"
   - Icon: Euro/PLY icon
   - Background: White card

3. **Content Count**
   - Value: "156"
   - Change: "+23 vs last month"
   - Icon: Play icon
   - Background: White card

#### Charts Section

**Chart 1: Time Watched Over Time**
- **Type:** Line chart
- **X-axis:** Dates (last 30 days)
- **Y-axis:** Hours
- **Color:** Gradient (`#7C8CF8` to `#2DE1C2`)

**Chart 2: Cost per Content**
- **Type:** Bar chart
- **X-axis:** Content titles (top 10)
- **Y-axis:** Cost (PLY or EUR)
- **Color:** `#7C8CF8`

**Chart 3: Monthly Spend**
- **Type:** Area chart
- **X-axis:** Months (last 12 months)
- **Y-axis:** Total spend (PLY or EUR)
- **Color:** Gradient fill

#### Export Options
- **Button:** "Export Data" / "خروجی داده"
- **Options:**
  - "Export as CSV"
  - "Share with Partner Dashboard" / "اشتراک با داشبورد پارتنر"
  - "Download PDF Report"

#### Content Breakdown
- **Section Title:** "Top Content" / "محتوای برتر"
- **List:**
  - Content thumbnail (60px × 90px)
  - Title
  - Time watched: "5h 30m"
  - Cost: "12.50 PLY (≈ €0.25)"
  - Tap: Opens content details

---

### 7. ⚙️ Settings

#### Header
- **Title:** "Settings" / "تنظیمات"
- **Back Button:** Top left (LTR) / Top right (RTL)

#### Settings Sections

**Account**
- **Profile Picture:** 80px × 80px, circular
- **Name:** User name
- **Email:** User email
- **Edit Button:** Secondary button

**Payment & Wallet**
- **Auto Top-up Toggle:** Switch
  - Label: "Auto top-up when balance is low" / "شارژ خودکار هنگام موجودی کم"
  - Description: "Automatically add 10 PLY (≈ €0.20) when balance drops below 1 PLY"
- **Default Payment Method:** Dropdown
- **Wallet Address:** Copy button
  - Shows: Algorand wallet address (truncated)
  - Action: Copies to clipboard

**Notifications**
- **Push Notifications Toggle:** Switch
- **Email Notifications Toggle:** Switch
- **Low Balance Alert Toggle:** Switch
- **Transaction Alerts Toggle:** Switch

**Preferences**
- **Language:** Dropdown (English, فارسی)
  - Default: Based on device settings
  - Instant switch, updates all UI
- **Currency Display:** Toggle (Show EUR equivalent)
  - Default: ON (shows both PLY and EUR)
  - When on: Shows "50 PLY (≈ €1.00)"
  - When off: Shows only "50 PLY"
- **Dark/Light Mode:** Toggle (Future)

**Legal & Privacy**
- **GDPR Policy:** Link button
- **AML Policy:** Link button
- **KYC Policy:** Link button
- **Terms of Service:** Link button
- **Privacy Policy:** Link button

**About**
- **App Version:** "v1.0.0"
- **Support:** Link button
- **Feedback:** Link button

**Danger Zone**
- **Delete Account:** Red button
  - Confirmation modal required

---

## ⚙️ Make (Automation) Logic

### Flow 1: User Starts Playback
1. **Trigger:** "User starts playback" event in app
2. **Action:** Send session data (userID, contentID, startTime) to backend
3. **Backend:** Calls Algorand smart contract to start micro-payment timer
4. **Storage:** Log session in Google Sheets

### Flow 2: Micro-Payment Loop
1. **Trigger:** Every X seconds (10 seconds recommended)
2. **Action:** Deduct PLY tokens from user wallet, credit provider wallet
3. **Storage:** Write usage data (time watched, amount, contentID) to Google Sheets
4. **Condition:** Check user balance before each deduction

### Flow 3: Pause/Stop Event
1. **Trigger:** User clicks "Pause" or "Stop"
2. **Action:** Terminate smart contract session
3. **Storage:** Log final transaction
4. **Notification:** Optional confirmation

### Flow 4: Daily Summary
1. **Trigger:** Every 24h (scheduled)
2. **Action:** Summarize wallet activity
3. **Notification:** Send push/email "You spent 0.48 PLY (≈ €0.48) today"
4. **Analytics:** Update dashboard chart

### Flow 5: Wallet Top-up
1. **Trigger:** User initiates top-up
2. **Action:** Process payment, mint/transfer PLY to user wallet
3. **Storage:** Log transaction
4. **Notification:** Confirmation

---

## 🧩 Integrations

### Required
- **Algorand SDK:** Wallet + transactions
- **Google Sheets:** Usage logs
- **Backend API:** Node.js + Algorand SDK

### Optional
- **Firebase Auth:** Login/session
- **Notion DB:** Alternative to Google Sheets
- **Chart.js API:** Visual analytics in Figma prototype
- **OneSignal:** Push notifications
- **Make Email Module:** Email notifications

---

## 📐 Responsive Design

### Mobile (Primary Target)
- **Size:** 375px × 812px (iPhone 13 Pro)
- **Layout:** Single column, stacked elements
- **Touch Targets:** Minimum 44px × 44px
- **Navigation:** Bottom tab bar

### Tablet
- **Size:** 768px × 1024px (iPad)
- **Layout:** 2-column grid
- **Touch Targets:** Larger

### Desktop
- **Size:** 1440px × 900px
- **Layout:** Multi-column layout
- **Interactions:** Hover states, keyboard navigation

### RTL Support
- **Automatic:** Direction switching based on language
- **Layout:** Full RTL support for Persian
- **Typography:** IRANSans for Persian text

---

## 🎨 Design Tokens

### Colors
- **Gradient Start:** `#7C8CF8`
- **Gradient End:** `#2DE1C2`
- **Background:** `#F8F9FA`
- **Text:** `#1A1F3A`

### Typography
- **English:** Inter (400, 500, 600, 700)
- **Persian:** IRANSans (400, 500, 600, 700)

### Spacing
- **Base Unit:** 4px
- **Common:** 8px, 16px, 24px, 32px

### Border Radius
- **Default:** 8-12px
- **Cards:** 12px
- **Buttons:** 12px

---

## ✅ Implementation Checklist

### Design Phase
- [ ] Create Design System in Figma
- [ ] Design all 7 screens
- [ ] Add RTL layouts for Persian
- [ ] Create prototype interactions
- [ ] Test responsive breakpoints

### Development Phase
- [ ] Setup next-intl for i18n
- [ ] Implement Algorand wallet connection
- [ ] Create PlayCoin (PLY) ASA
- [ ] Build backend API
- [ ] Setup Make automation flows

### Integration Phase
- [ ] Connect Figma prototype to backend
- [ ] Test payment flow
- [ ] Setup Google Sheets integration
- [ ] Configure notifications
- [ ] Test analytics dashboard

---

## 📚 Related Documents

- **Design System:** `references/design-system.md`
- **Figma Specs:** `references/figma-design-specs.md`
- **App Configuration:** `references/app-configuration.md`
- **Make Automation:** `technical/make-automation-flows.md`
- **Tech Stack:** `technical/tech-stack.md`

---

**تاریخ آخرین به‌روزرسانی:** 2025-11-04  
**ورژن:** 1.0

