# 🔄 FigJam Flows - Play and Pay

**پروژه:** Pay as Play  
**تاریخ ایجاد:** 2025-11-04  
**آخرین به‌روزرسانی:** 2025-11-04  
**ورژن:** 1.0

---

## 📋 Overview

این سند شامل مسیرهای کامل کاربر (User Journeys) و منطق پرداخت (Payment Logic) برای ترسیم در FigJam است.

---

## 🎯 User Journey Flow

### Flow 1: Onboarding Journey

```
[Start] → [Splash Screen]
           ↓
    [Logo Animation]
           ↓
    [Tagline Display]
           ↓
    [Onboarding Slide 1: Transparency]
           ↓
    [Onboarding Slide 2: Fairness]
           ↓
    [Onboarding Slide 3: Wallet Connection]
           ↓
    [Get Started Button]
           ↓
    [Sign-in Options]
           ├─→ [Email + Password]
           ├─→ [Google Sign-in]
           └─→ [Algorand Wallet Connect]
           ↓
    [Wallet Setup]
           ├─→ [Create Wallet]
           └─→ [Top-up PlayCoin (PLY)]
           ↓
    [Home Dashboard]
           ↓
    [End]
```

### Flow 2: Content Consumption Journey

```
[Home Dashboard]
    ↓
[Browse Content]
    ├─→ [Watch Tab]
    ├─→ [Listen Tab]
    ├─→ [Learn Tab]
    └─→ [Wallet Tab]
    ↓
[Select Content]
    ↓
[Check Balance]
    ├─→ [Sufficient] → [Start Playback]
    └─→ [Insufficient] → [Top-up Flow]
    ↓
[Player Screen]
    ↓
[Real-time Billing]
    ↓
[Pause/Stop]
    ├─→ [Pause] → [Stop Billing] → [Resume]
    └─→ [Stop] → [Usage Summary]
    ↓
[Return to Home]
```

### Flow 3: Wallet Management Journey

```
[Home Dashboard]
    ↓
[Tap Balance Indicator]
    ↓
[Wallet Screen]
    ├─→ [View Balance]
    ├─→ [Top-up]
    │    ├─→ [Enter Amount]
    │    ├─→ [Select Payment Method]
    │    │    ├─→ [Credit Card]
    │    │    ├─→ [PayPal]
    │    │    ├─→ [Crypto]
    │    │    └─→ [Bank Transfer]
    │    ├─→ [Confirm Payment]
    │    ├─→ [Algorand Transaction]
    │    └─→ [Mint PLY Tokens]
    ├─→ [Withdraw]
    │    ├─→ [Enter Amount]
    │    ├─→ [Select Destination]
    │    ├─→ [Confirm]
    │    └─→ [Algorand Transaction]
    └─→ [Transaction History]
         ├─→ [Filter Transactions]
         └─→ [View Details]
```

### Flow 4: Analytics Journey

```
[Home Dashboard]
    ↓
[Settings]
    ↓
[Analytics Dashboard]
    ├─→ [View Summary Cards]
    │    ├─→ [Time Watched]
    │    ├─→ [Total Spent]
    │    └─→ [Content Count]
    ├─→ [View Charts]
    │    ├─→ [Time Watched Over Time]
    │    ├─→ [Cost per Content]
    │    └─→ [Monthly Spend]
    ├─→ [Export Data]
    │    ├─→ [CSV Export]
    │    ├─→ [PDF Report]
    │    └─→ [Share with Partner]
    └─→ [Content Breakdown]
         └─→ [View Top Content]
```

---

## 💳 Payment Logic Flow

### Flow 5: Payment Initialization

```
[User Starts Playback]
    ↓
[Check Wallet Balance]
    ├─→ [Sufficient Balance]
    │    ↓
    │    [Initialize Session]
    │    ├─→ [Create Session ID]
    │    ├─→ [Get Content Rate]
    │    │    ├─→ [Rate: 0.02 PLY/min]
    │    │    └─→ [Rate: €0.02/min]
    │    ├─→ [Start Timer]
    │    └─→ [Log Session Start]
    │    ↓
    │    [Algorand Smart Contract]
    │    ├─→ [Deploy Session Contract]
    │    ├─→ [Set User Wallet]
    │    ├─→ [Set Provider Wallet]
    │    ├─→ [Set Rate per Minute]
    │    └─→ [Initialize Billing Timer]
    │    ↓
    │    [Backend API]
    │    ├─→ [POST /sessions/start]
    │    ├─→ [Store Session Data]
    │    └─→ [Return Session ID]
    │    ↓
    │    [Player Screen]
    │    └─→ [Display Cost Tracker]
    │
    └─→ [Insufficient Balance]
         ↓
         [Low Balance Warning]
         ├─→ [Show Warning Banner]
         ├─→ [Offer Top-up]
         └─→ [Block Playback]
```

### Flow 6: Real-time Billing Loop

```
[Active Session]
    ↓
[Timer: Every 10 seconds]
    ↓
[Calculate Elapsed Time]
    ├─→ [Get Start Time]
    ├─→ [Get Current Time]
    └─→ [Calculate: Current - Start]
    ↓
[Calculate Payment Amount]
    ├─→ [Elapsed Minutes = Elapsed Seconds / 60]
    ├─→ [Amount PLY = Elapsed Minutes × Rate PLY/min]
    ├─→ [Amount EUR = Elapsed Minutes × Rate EUR/min]
    └─→ [Total Amount = Previous + Current]
    ↓
[Check User Balance]
    ├─→ [Balance >= Amount]
    │    ↓
    │    [Execute Payment]
    │    ├─→ [Algorand Smart Contract]
    │    │    ├─→ [Transfer PLY: User → Provider]
    │    │    ├─→ [Calculate Fee]
    │    │    └─→ [Confirm Transaction]
    │    ├─→ [Backend API]
    │    │    ├─→ [POST /algorand/transfer]
    │    │    ├─→ [Update Session]
    │    │    └─→ [Log Transaction]
    │    ├─→ [Google Sheets]
    │    │    ├─→ [Add Transaction Row]
    │    │    └─→ [Update Session Total]
    │    └─→ [Update UI]
    │         ├─→ [Update Cost Tracker]
    │         ├─→ [Update Balance]
    │         └─→ [Pulse Animation]
    │
    └─→ [Balance < Amount]
         ↓
         [Low Balance Alert]
         ├─→ [Show Warning]
         ├─→ [Pause Playback]
         ├─→ [Stop Billing]
         └─→ [Offer Top-up]
```

### Flow 7: Payment Termination

```
[User Pauses/Stops]
    ↓
[Stop Timer]
    ↓
[Calculate Final Amount]
    ├─→ [Get Total Elapsed Time]
    ├─→ [Calculate Final Payment]
    └─→ [Get Previous Payments]
    ↓
[Execute Final Payment]
    ├─→ [Algorand Smart Contract]
    │    ├─→ [Finalize Session]
    │    ├─→ [Transfer Remaining Amount]
    │    └─→ [Terminate Contract]
    ├─→ [Backend API]
    │    ├─→ [POST /sessions/stop]
    │    ├─→ [Update Session Status: completed]
    │    └─→ [Log Final Transaction]
    └─→ [Google Sheets]
         ├─→ [Move to Completed Sessions]
         └─→ [Delete from Active Sessions]
    ↓
[Usage Summary Screen]
    ├─→ [Display Total Time]
    ├─→ [Display Total Cost]
    │    ├─→ [PLY Amount]
    │    └─→ [EUR Equivalent]
    ├─→ [Display Remaining Balance]
    └─→ [Action Buttons]
         ├─→ [Add Credit]
         └─→ [Return to Home]
```

### Flow 8: Hybrid Payment (PLY + EUR)

```
[Payment Calculation]
    ↓
[Check Payment Method]
    ├─→ [PlayCoin (PLY)]
    │    ├─→ [Calculate in PLY]
    │    ├─→ [Check PLY Balance]
    │    ├─→ [Transfer PLY Tokens]
    │    └─→ [Display: "0.24 PLY"]
    │
    └─→ [EUR (Fiat)]
         ├─→ [Calculate in EUR]
         ├─→ [Check EUR Balance]
         ├─→ [Process Fiat Payment]
         └─→ [Display: "€0.24"]
    ↓
[Display Both (Default)]
    ├─→ [Primary: PLY Amount]
    ├─→ [Secondary: EUR Equivalent]
    └─→ [Format: "0.24 PLY (≈ €0.24)"]
    ↓
[Settings Toggle]
    ├─→ [Show Both] → Display both currencies
    └─→ [Show PLY Only] → Display only PLY
```

### Flow 9: Settlement Flow

```
[End of Session]
    ↓
[Calculate Total Revenue]
    ├─→ [Sum All Payments]
    ├─→ [Calculate Platform Fee]
    │    ├─→ [Fee: 5% of total]
    │    └─→ [Fee Amount]
    └─→ [Calculate Provider Share]
         └─→ [Total - Fee]
    ↓
[Algorand Settlement]
    ├─→ [Transfer to Platform Wallet]
    │    └─→ [Fee Amount]
    ├─→ [Transfer to Provider Wallet]
    │    └─→ [Provider Share]
    └─→ [Confirm Settlement]
    ↓
[Backend API]
    ├─→ [POST /settlements/create]
    ├─→ [Log Settlement]
    └─→ [Update Provider Dashboard]
    ↓
[Google Sheets]
    ├─→ [Add Settlement Row]
    └─→ [Update Provider Analytics]
```

---

## 🔔 Notification Flow

### Flow 10: Notification Triggers

```
[Event Triggers]
    ├─→ [Low Balance]
    │    ├─→ [Balance < 1 PLY]
    │    ├─→ [Show In-app Banner]
    │    ├─→ [Push Notification]
    │    └─→ [Email Alert]
    │
    ├─→ [Payment Confirmed]
    │    ├─→ [Transaction Success]
    │    ├─→ [In-app Toast]
    │    └─→ [Update Balance]
    │
    ├─→ [Daily Summary]
    │    ├─→ [Every 24h at 23:00]
    │    ├─→ [Calculate Daily Stats]
    │    ├─→ [Push Notification]
    │    └─→ [Email Summary]
    │
    └─→ [Session Ended]
         ├─→ [User Stops Playback]
         ├─→ [Show Usage Summary]
         └─→ [In-app Notification]
```

---

## 🎨 Visual Flow Elements

### Node Types

#### Start/End Nodes
- **Shape:** Rounded Rectangle
- **Color:** Green (Start), Red (End)
- **Icon:** Play (Start), Stop (End)

#### Process Nodes
- **Shape:** Rectangle
- **Color:** Blue (`#7C8CF8`)
- **Border:** 2px solid

#### Decision Nodes
- **Shape:** Diamond
- **Color:** Orange (`#F59E0B`)
- **Branches:** Yes/No or Multiple options

#### API/Backend Nodes
- **Shape:** Hexagon
- **Color:** Purple (`#7C8CF8`)
- **Icon:** API symbol

#### Blockchain Nodes
- **Shape:** Octagon
- **Color:** Cyan (`#2DE1C2`)
- **Icon:** Blockchain symbol

#### Database Nodes
- **Shape:** Cylinder
- **Color:** Gray (`#6B7280`)
- **Icon:** Database symbol

#### UI/Display Nodes
- **Shape:** Rounded Rectangle
- **Color:** Light Blue (`#E0E7FF`)
- **Icon:** Screen symbol

---

### Connection Types

#### Primary Flow
- **Style:** Solid arrow
- **Color:** Blue (`#3B82F6`)
- **Width:** 2px

#### Conditional Flow
- **Style:** Dashed arrow
- **Color:** Orange (`#F59E0B`)
- **Width:** 2px
- **Label:** Condition text

#### Error Flow
- **Style:** Dotted arrow
- **Color:** Red (`#EF4444`)
- **Width:** 2px

#### Parallel Flow
- **Style:** Double arrow
- **Color:** Green (`#10B981`)
- **Width:** 2px

---

## 📊 Flow Grouping

### Group 1: User Journeys
- Onboarding Journey
- Content Consumption Journey
- Wallet Management Journey
- Analytics Journey

### Group 2: Payment Logic
- Payment Initialization
- Real-time Billing Loop
- Payment Termination
- Hybrid Payment
- Settlement Flow

### Group 3: System Flows
- Notification Triggers
- Error Handling
- Data Synchronization

---

## 🔄 Loop Indicators

### Billing Loop
```
[Start Loop: Every 10 seconds]
    ↓
[Calculate Payment]
    ↓
[Execute Payment]
    ↓
[Update UI]
    ↓
[Wait 10 seconds]
    ↓
[Repeat Loop]
```

### Condition: Continue Loop
- **If:** Session Active AND Balance Sufficient
- **Then:** Continue Loop
- **Else:** Exit Loop

---

## 📝 Flow Labels

### Action Labels
- "Start Playback"
- "Calculate Payment"
- "Transfer Tokens"
- "Update Balance"
- "Show Notification"

### Condition Labels
- "Balance Sufficient?"
- "Session Active?"
- "Payment Method?"
- "Error Occurred?"

### Data Labels
- "Session ID: {id}"
- "Amount: {amount} PLY"
- "Balance: {balance} PLY"
- "Time: {time} seconds"

---

## 🎯 Flow Annotations

### Important Notes
- **Payment Loop:** Runs every 10 seconds while session is active
- **Balance Check:** Performed before each payment
- **Settlement:** Occurs at end of session or daily batch
- **Notifications:** Real-time for critical events, daily for summaries

### Error Handling
- **Insufficient Balance:** Pause playback, show warning
- **Network Error:** Retry 3 times, then show error
- **Transaction Failed:** Rollback, notify user
- **Session Timeout:** Auto-terminate after 24h inactivity

---

**تاریخ آخرین به‌روزرسانی:** 2025-11-04  
**ورژن:** 1.0

