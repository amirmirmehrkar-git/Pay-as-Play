# 🎨 Frontend Enhancement Plan
## Play and Pay — Based on Figma Designs

**تاریخ:** 2025-11-16  
**وضعیت:** 🟡 Planning

---

## 📋 بررسی فایل‌های Figma

### صفحات موجود در Figma Design Specs:

1. ✅ **Splash & Onboarding** - موجود در Figma
2. ✅ **Sign-in / Wallet Setup** - موجود در Figma
3. ✅ **Home Dashboard** - موجود در Figma
4. ✅ **Player Screen** - موجود در Figma (پیاده‌سازی شده)
5. ✅ **Wallet & Transactions** - موجود در Figma
6. ✅ **Analytics Dashboard** - موجود در Figma (نیاز به پیاده‌سازی)
7. ✅ **Settings** - موجود در Figma (نیاز به پیاده‌سازی)

### صفحات موجود در POC Wireframe:

1. ✅ **Home / Content Selection** - پیاده‌سازی شده
2. ✅ **Live Session** - پیاده‌سازی شده
3. ✅ **Usage Summary** - پیاده‌سازی شده
4. ✅ **Add Credit** - نیاز به پیاده‌سازی
5. ✅ **Partner Dashboard** - نیاز به پیاده‌سازی

---

## 🎯 صفحات مورد نیاز برای اضافه شدن

### 1. Dashboard (User Dashboard) ⭐
**از Figma Design Specs:**
- Home Dashboard با:
  - Top Bar (Logo, Language Switcher, Balance)
  - Navigation Tabs (Watch, Listen, Learn, Wallet)
  - Hero Section (Featured Content)
  - Currently Watching Widget
  - Content Grid
  - Search Bar

**وضعیت فعلی:**
- ✅ Home page موجود است اما ساده است
- ❌ Navigation Tabs نداریم
- ❌ Currently Watching Widget نداریم
- ❌ Search Bar نداریم

---

### 2. Analytics Dashboard ⭐⭐⭐
**از Figma Design Specs:**
- Summary Cards:
  - Time Watched
  - Total Spent
  - Content Count
- Charts:
  - Time Watched Over Time (Line chart)
  - Cost per Content (Bar chart)
  - Monthly Spend (Area chart)
- Export Options:
  - Export as CSV
  - Share with Partner Dashboard
  - Download PDF Report
- Content Breakdown:
  - Top Content list

**وضعیت فعلی:**
- ❌ Analytics Dashboard وجود ندارد
- ❌ Charts نداریم
- ❌ Export functionality نداریم

---

### 3. Wallet & Transactions ⭐⭐
**از Figma Design Specs:**
- Balance Card
- Action Buttons (Top-up, Withdraw)
- Transaction History:
  - Filter (All, Top-up, Payment, Withdrawal)
  - Transaction cards
  - Transaction details

**وضعیت فعلی:**
- ✅ WalletConnect component موجود است
- ❌ Transaction History نداریم
- ❌ Top-up/Withdraw UI نداریم

---

### 4. Settings ⭐
**از Figma Design Specs:**
- Account section
- Payment & Wallet settings
- Notifications settings
- Preferences (Language, Currency Display)
- Legal & Privacy
- About
- Danger Zone

**وضعیت فعلی:**
- ❌ Settings page وجود ندارد

---

### 5. Partner Dashboard ⭐⭐⭐
**از POC Wireframe:**
- Partner Dashboard (Home):
  - Active Users Today
  - Total Revenue (Month)
  - Average Session Time
  - View Detailed Analytics button
- Analytics:
  - Revenue charts
  - User statistics
  - Content performance
  - Settlement reports

**وضعیت فعلی:**
- ❌ Partner Dashboard وجود ندارد

---

## 📋 Plan برای پیاده‌سازی

### Phase 1: Core User Features (اولویت بالا)

#### Task 1.1: Enhanced Home Dashboard
- [ ] Navigation Tabs (Watch, Listen, Learn, Wallet)
- [ ] Currently Watching Widget
- [ ] Search Bar
- [ ] Content Grid بهبود یافته
- [ ] Featured Content section

**Files:**
- `app/page.tsx` - بهبود Home page
- `components/NavigationTabs.tsx` - جدید
- `components/CurrentlyWatching.tsx` - جدید
- `components/SearchBar.tsx` - جدید

---

#### Task 1.2: Analytics Dashboard
- [ ] Analytics page
- [ ] Summary Cards component
- [ ] Charts (Line, Bar, Area)
- [ ] Export functionality
- [ ] Content Breakdown

**Files:**
- `app/analytics/page.tsx` - جدید
- `components/AnalyticsSummary.tsx` - جدید
- `components/Charts/LineChart.tsx` - جدید
- `components/Charts/BarChart.tsx` - جدید
- `components/Charts/AreaChart.tsx` - جدید
- `components/ContentBreakdown.tsx` - جدید

---

#### Task 1.3: Wallet & Transactions
- [ ] Wallet page
- [ ] Transaction History
- [ ] Transaction filters
- [ ] Top-up UI
- [ ] Withdraw UI

**Files:**
- `app/wallet/page.tsx` - جدید
- `components/TransactionHistory.tsx` - جدید
- `components/TopUpModal.tsx` - جدید
- `components/WithdrawModal.tsx` - جدید

---

### Phase 2: Settings & Preferences

#### Task 2.1: Settings Page
- [ ] Settings page
- [ ] Account section
- [ ] Payment & Wallet settings
- [ ] Notifications settings
- [ ] Preferences
- [ ] Legal & Privacy

**Files:**
- `app/settings/page.tsx` - جدید
- `components/SettingsSections/Account.tsx` - جدید
- `components/SettingsSections/Payment.tsx` - جدید
- `components/SettingsSections/Notifications.tsx` - جدید
- `components/SettingsSections/Preferences.tsx` - جدید

---

### Phase 3: Partner Features

#### Task 3.1: Partner Dashboard
- [ ] Partner Dashboard page
- [ ] Revenue charts
- [ ] User statistics
- [ ] Content performance
- [ ] Settlement reports

**Files:**
- `app/partner/page.tsx` - جدید
- `app/partner/analytics/page.tsx` - جدید
- `components/PartnerDashboard.tsx` - جدید
- `components/PartnerCharts.tsx` - جدید

---

## 🎨 Design System

### Navigation Structure

```
Home (/)
├── Watch Tab
├── Listen Tab
├── Learn Tab
└── Wallet Tab

Player (/player)
Summary (/summary)
Analytics (/analytics) ⭐ NEW
Wallet (/wallet) ⭐ NEW
Settings (/settings) ⭐ NEW
Partner Dashboard (/partner) ⭐ NEW
```

---

## 📊 Priority Matrix

| Feature | Priority | Effort | Impact |
|---------|----------|--------|--------|
| Analytics Dashboard | ⭐⭐⭐ | High | High |
| Wallet & Transactions | ⭐⭐ | Medium | High |
| Enhanced Home Dashboard | ⭐ | Low | Medium |
| Settings | ⭐ | Medium | Medium |
| Partner Dashboard | ⭐⭐⭐ | High | High |

---

## 🚀 Next Steps

1. **شروع با Analytics Dashboard** (اولویت بالا)
2. **Wallet & Transactions** (اولویت متوسط)
3. **Enhanced Home Dashboard** (اولویت پایین)
4. **Settings** (اولویت پایین)
5. **Partner Dashboard** (بعد از User features)

---

**Status:** 🟡 Ready for Implementation

