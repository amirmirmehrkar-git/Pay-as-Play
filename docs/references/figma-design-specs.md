# 🖌️ Figma Design Specifications - Play and Pay

**پروژه:** Pay as Play  
**تاریخ ایجاد:** 2025-11-04  
**آخرین به‌روزرسانی:** 2025-11-04  
**ورژن:** 1.0

---

## 📱 App Structure & Screens

### Screen List

1. **Splash & Onboarding**
2. **Sign-in / Wallet Setup**
3. **Home Dashboard**
4. **Player Screen**
5. **Wallet & Transactions**
6. **Analytics Dashboard**
7. **Settings**

---

## 1. 🎬 Splash & Onboarding

### Frame Specifications
- **Size:** 375px × 812px (iPhone 13 Pro) / 1440px × 900px (Desktop)
- **Background:** Gradient (`#7C8CF8` to `#2DE1C2`)
- **Layout:** Vertical, centered

### Elements

#### Splash Screen
- **Brand Logo:** 
  - Size: 120px × 120px
  - Position: Center, top 40%
  - Animation: Fade in + scale (300ms)
- **Tagline:**
  - Text: "Watch what you love, pay only for what you use."
  - Font: Inter, SemiBold, 24px
  - Color: White (`#FFFFFF`)
  - Position: Below logo, center
  - Animation: Fade in (400ms delay)

#### Onboarding Slides (3 slides)

**Slide 1: Transparency**
- **Icon:** 📊 (Analytics icon, 80px)
- **Title:** "Complete Transparency"
- **Description:** "See exactly what you pay for every second"
- **Background:** White card with gradient border

**Slide 2: Fairness**
- **Icon:** ⚖️ (Balance icon, 80px)
- **Title:** "Fair Pricing"
- **Description:** "Pay only for what you actually consume"
- **Background:** White card with gradient border

**Slide 3: Wallet Connection**
- **Icon:** 💰 (Wallet icon, 80px)
- **Title:** "Easy Wallet Setup"
- **Description:** "Connect your Algorand wallet or create a new one"
- **Background:** White card with gradient border
- **CTA Button:** "Get Started" (Primary gradient button)

### Navigation
- **Progress Dots:** 3 dots, active state with gradient
- **Skip Button:** Top right, text "Skip"
- **Next/Previous:** Swipe gestures or arrow buttons

---

## 2. 🔐 Sign-in / Wallet Setup

### Frame Specifications
- **Size:** 375px × 812px (Mobile) / 600px × 800px (Desktop Modal)
- **Background:** White (`#FFFFFF`)
- **Layout:** Vertical, centered

### Elements

#### Header
- **Logo:** 60px × 60px, top center
- **Title:** "Welcome to Play and Pay"
- **Subtitle:** "Connect your wallet to get started"

#### Sign-in Options
1. **Email + Password**
   - Input fields: Email, Password
   - Button: "Sign In" (Primary)
   - Link: "Forgot Password?"

2. **Google Sign-in**
   - Button: Google branded button
   - Icon: Google logo (24px)

3. **Algorand Wallet Connect**
   - Button: "Connect Algorand Wallet" (Secondary)
   - Icon: Algorand logo (24px)
   - Description: "Connect using Pera Wallet, MyAlgo, or other Algorand wallets"

#### Wallet Setup Section
- **Title:** "New to Play and Pay?"
- **Create Wallet Button:** Primary gradient button
- **Top-up PlayCoin (PLY) Button:** Secondary button
  - Shows: "Add PLY to your wallet"
  - Opens: Top-up modal

#### Footer
- **Legal Links:** Terms, Privacy Policy, GDPR
- **Language Selector:** Dropdown (English, فارسی)
  - **Default:** Based on device settings
  - **Options:** English | فارسی
  - **Icon:** Globe icon (🌐)
  - **Behavior:** Instant switch, updates all UI text

---

## 3. 🏠 Home Dashboard

### Frame Specifications
- **Size:** 375px × 812px (Mobile) / 1440px × 900px (Desktop)
- **Background:** `#F8F9FA`
- **Layout:** Scrollable, vertical

### Elements

#### Top Bar
- **Logo:** Left (LTR) / Right (RTL), 40px × 40px
- **Language Switcher:** Right (LTR) / Left (RTL)
  - Icon: Globe (🌐)
  - Options: English | فارسی
- **Balance Indicator:** Right (LTR) / Left (RTL)
  - Format: "50 PLY (≈ €1.00)" - Shows both PLY and EUR equivalent
  - Background: Gradient card
  - Tap: Opens Wallet screen

#### Navigation Tabs
- **Tabs:** Watch | Listen | Learn | Wallet
- **Active Tab:** Gradient underline
- **Icons:** 📺 🎵 📚 💰

#### Hero Section
- **Title:** "Featured Content"
- **Content Thumbnails:** Horizontal scroll
  - Size: 160px × 240px (Mobile), 200px × 300px (Desktop)
  - Border Radius: 12px
  - Overlay: Price per minute (e.g., "€0.02/min")
  - Play Button: Overlay on hover

#### Currently Watching Widget
- **Position:** Sticky bottom bar (if active)
- **Content:**
  - Thumbnail: 60px × 90px
  - Title: Content name
  - Timer: "00:05:23"
  - Cost: "€0.10"
  - Pause Button: Icon button
- **Background:** White card with shadow
- **Tap:** Opens Player screen

#### Content Grid
- **Layout:** 2 columns (Mobile), 4 columns (Desktop)
- **Card:**
  - Thumbnail: Full width, 16:9 aspect ratio
  - Title: Below thumbnail
  - Price: "€0.02/min" badge
  - Duration: "45 min" badge
  - Play Button: Overlay on hover

#### Search Bar
- **Position:** Below tabs
- **Placeholder:** "Search content..."
- **Icon:** Search icon (20px)

---

## 4. ▶️ Player Screen

### Frame Specifications
- **Size:** Full screen (Mobile) / 16:9 aspect ratio (Desktop)
- **Background:** Black (`#000000`)
- **Layout:** Video player centered

### Elements

#### Video Player
- **Aspect Ratio:** 16:9
- **Controls:** Standard video controls (play, pause, seek, volume, fullscreen)
- **Position:** Center of screen

#### Cost Tracker (Live)
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
- **Text:** "Pause = Stop billing instantly"
- **Icon:** Pause icon (20px)
- **Action:** Pauses video and stops billing

#### Transparency Overlay
- **Position:** Bottom overlay (collapsible)
- **Background:** Semi-transparent dark
- **Content:**
  - Title: "Payment Summary" / "خلاصه پرداخت"
  - Line: "You've paid 0.24 PLY (≈ €0.24) for this content" / "شما 0.24 PLY (≈ €0.24) برای این محتوا پرداخت کرده‌اید"
  - Breakdown:
    - Time watched: "12:34" / "زمان تماشا: 12:34"
    - Rate: "0.02 PLY/min" / "نرخ: 0.02 PLY/دقیقه"
    - Total: "0.24 PLY" / "مجموع: 0.24 PLY"
- **Toggle:** Arrow icon to expand/collapse

#### Low Balance Warning
- **Position:** Top center banner
- **Background:** Warning color (`#F59E0B`)
- **Text:** "Low balance: €0.50 remaining"
- **CTA:** "Add Credit" button
- **Auto-dismiss:** After 5 seconds or on tap

#### Exit Button
- **Position:** Top left
- **Icon:** Close/X icon (24px)
- **Action:** Returns to Home, shows Usage Summary

---

## 5. 💰 Wallet & Transactions

### Frame Specifications
- **Size:** 375px × 812px (Mobile) / 800px × 900px (Desktop)
- **Background:** `#F8F9FA`
- **Layout:** Scrollable, vertical

### Elements

#### Header
- **Title:** "My Wallet"
- **Back Button:** Top left

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
- **Section Title:** "Recent Transactions"
- **Filter:** Dropdown (All, Top-up, Payment, Withdrawal)
- **List:**
  - Card per transaction
  - Date/Time: "Today, 14:30"
  - Type: Icon + label (Top-up, Payment, etc.)
  - Amount: "+€10.00" or "-€0.24"
  - Status: "Confirmed" badge
  - Tap: Opens transaction details

#### Smart Contract Confirmation Pop-up
- **Trigger:** On transaction initiation
- **Background:** Modal overlay (dark, 80% opacity)
- **Content:**
  - Title: "Confirm Transaction"
  - Details:
    - Amount: "€0.24"
    - To: "Content Provider"
    - Network: "Algorand TestNet"
    - Fee: "0.001 ALGO"
  - Buttons:
    - "Confirm" (Primary)
    - "Cancel" (Secondary)
- **Animation:** Slide up from bottom

---

## 6. 📊 Analytics Dashboard

### Frame Specifications
- **Size:** 375px × 812px (Mobile) / 1440px × 900px (Desktop)
- **Background:** `#F8F9FA`
- **Layout:** Scrollable, vertical

### Elements

#### Header
- **Title:** "Analytics"
- **Date Range Selector:** Dropdown (Today, Week, Month, Year)

#### Summary Cards (3 cards, horizontal scroll on mobile)
1. **Time Watched**
   - Value: "24h 30m"
   - Change: "+12% vs last month"
   - Icon: Clock icon
   - Background: White card

2. **Total Spent**
   - Value: "€48.50"
   - Change: "+8% vs last month"
   - Icon: Euro icon
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
- **Y-axis:** Cost (€)
- **Color:** `#7C8CF8`

**Chart 3: Monthly Spend**
- **Type:** Area chart
- **X-axis:** Months (last 12 months)
- **Y-axis:** Total spend (€)
- **Color:** Gradient fill

#### Export Options
- **Button:** "Export Data"
- **Options:**
  - "Export as CSV"
  - "Share with Partner Dashboard"
  - "Download PDF Report"

#### Content Breakdown
- **Section Title:** "Top Content"
- **List:**
  - Content thumbnail (60px × 90px)
  - Title
  - Time watched: "5h 30m"
  - Cost: "€12.50"
  - Tap: Opens content details

---

## 7. ⚙️ Settings

### Frame Specifications
- **Size:** 375px × 812px (Mobile) / 600px × 800px (Desktop)
- **Background:** `#F8F9FA`
- **Layout:** Scrollable, vertical

### Elements

#### Header
- **Title:** "Settings"
- **Back Button:** Top left

#### Settings Sections

**Account**
- **Profile Picture:** 80px × 80px, circular
- **Name:** User name
- **Email:** User email
- **Edit Button:** Secondary button

**Payment & Wallet**
- **Auto Top-up Toggle:** Switch
  - Label: "Auto top-up when balance is low"
  - Description: "Automatically add €10 when balance drops below €1"
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

## 🎨 Design Tokens for Figma

### Colors (as Variables)
```
Primary Gradient Start: #7C8CF8
Primary Gradient End: #2DE1C2
Primary Dark: #1A1F3A
Primary Light: #F8F9FA
Success: #10B981
Warning: #F59E0B
Error: #EF4444
Info: #3B82F6
```

### Typography (as Text Styles)
```
H1: Inter, Bold, 32px
H2: Inter, SemiBold, 24px
H3: Inter, SemiBold, 20px
Body: Inter, Regular, 16px
Caption: Inter, Regular, 12px
```

### Spacing (as Layout Grid)
```
Base Unit: 4px
Gutter: 24px (Desktop), 16px (Mobile)
```

### Effects (as Styles)
```
Shadow Base: 0 1px 3px rgba(0,0,0,0.1)
Shadow Medium: 0 4px 6px rgba(0,0,0,0.1)
Gradient Primary: Linear 135deg #7C8CF8 to #2DE1C2
```

---

## 🔄 Prototype Interactions

### Navigation
- **Tap/Click:** Navigate to next screen
- **Swipe:** Navigate between onboarding slides
- **Back Button:** Return to previous screen

### Animations
- **Page Transitions:** Slide left/right (200ms)
- **Modal Open:** Fade in + scale up (300ms)
- **Button Press:** Scale down (100ms) → scale up (100ms)
- **Loading:** Spinner animation

### Micro-interactions
- **Button Hover:** Scale 1.02, shadow increase
- **Card Hover:** Shadow increase, slight lift
- **Input Focus:** Border color change to gradient
- **Balance Update:** Pulse animation

---

## 📐 Responsive Breakpoints

### Mobile (375px) - Primary Target
- Single column layout
- Stacked elements
- Full-width buttons
- Bottom navigation
- Touch-friendly (44px minimum targets)
- Mobile-first design approach

### Tablet (768px)
- 2-column grid
- Side-by-side elements
- Larger touch targets
- Hybrid mobile/desktop layout

### Desktop (1440px)
- Multi-column layout
- Hover states
- Keyboard navigation
- Larger spacing
- Desktop-optimized interactions

### RTL Support
- **Mobile:** Automatic direction switching
- **Tablet:** RTL layout support
- **Desktop:** Full RTL support with proper alignment

---

**تاریخ آخرین به‌روزرسانی:** 2025-11-04  
**ورژن:** 1.0

