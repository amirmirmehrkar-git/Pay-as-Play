# 🎨 Design Specifications - Phase 2

**تاریخ ایجاد:** 2025-11-17  
**وضعیت:** Draft  
**برای:** Frontend Development Team & Designers

---

## 📋 فهرست Design Specifications

1. [Integration Wizard Design](#integration-wizard-design)
2. [Settlement Dashboard Design](#settlement-dashboard-design)
3. [LMS Integration UI Design](#lms-integration-ui-design)
4. [Design System Reference](#design-system-reference)

---

## 🧙 Integration Wizard Design

### Overview

The Integration Wizard is a 4-step process that guides partners through platform integration. It should feel modern, intuitive, and trustworthy.

### Layout Structure

```
┌─────────────────────────────────────────┐
│  Progress Indicator (Top)                │
│  [✓] Step 1  [✓] Step 2  [●] Step 3  [ ] Step 4 │
├─────────────────────────────────────────┤
│                                          │
│         Wizard Content Card              │
│         (Centered, Max-width: 800px)     │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │  Step Content                    │   │
│  │                                  │   │
│  │  [Form Fields / Instructions]    │   │
│  │                                  │   │
│  └──────────────────────────────────┘   │
│                                          │
│  Navigation Buttons (Bottom)            │
│  [Cancel]                    [Next →]   │
│                                          │
└─────────────────────────────────────────┘
```

### Step 1: Platform Selection

**Layout:**
- Platform Type Selection: Grid of 4 cards (2x2 on desktop, 1x4 on mobile)
- Platform Name Input: Full-width text input
- Platform Description: Full-width textarea

**Platform Type Cards:**
```
┌──────────────┐  ┌──────────────┐
│  🎬 Video    │  │  🎵 Audio    │
│              │  │              │
│  Netflix,    │  │  Spotify,    │
│  YouTube...  │  │  Audible...  │
└──────────────┘  └──────────────┘
┌──────────────┐  ┌──────────────┐
│  📚 Learning │  │  🎮 Games   │
│              │  │              │
│  Coursera,   │  │  Steam,      │
│  Udemy...    │  │  Twitch...   │
└──────────────┘  └──────────────┘
```

**Card States:**
- **Default:** White background, border-2 border-zinc-200, rounded-xl
- **Hover:** border-blue-400, shadow-md
- **Selected:** border-blue-500, bg-blue-50, shadow-lg
- **Icon:** 32x32px emoji or SVG icon

**Form Fields:**
- Platform Name: 
  - Input: `rounded-xl border-2 border-zinc-200 px-4 py-3`
  - Focus: `focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20`
  - Error: `border-red-500`
- Platform Description:
  - Textarea: Same styling as input
  - Character counter: `text-sm text-zinc-500` (bottom-right)

### Step 2: SDK Installation

**Layout:**
- Package Manager Tabs: Horizontal tabs (npm, yarn, pnpm)
- Code Snippet: Dark-themed code block with copy button
- SDK Information: Cards with version, requirements, links

**Code Snippet Design:**
```
┌─────────────────────────────────────────┐
│  [npm] [yarn] [pnpm]  [📋 Copy]         │
├─────────────────────────────────────────┤
│  $ npm install playandpay-sdk           │
│                                         │
│  ✓ Installing...                        │
│  ✓ Installed v1.2.3                    │
└─────────────────────────────────────────┘
```

**Code Block Styling:**
- Background: `bg-zinc-900`
- Text: `text-zinc-100 font-mono`
- Border: `border border-zinc-700 rounded-lg`
- Padding: `p-4`
- Syntax highlighting: Dark theme (atomDark or vs2015)

**Copy Button:**
- Position: Top-right corner of code block
- Icon: Copy icon (📋 or SVG)
- Hover: Scale-105, bg-zinc-800
- Toast: "Copied to clipboard!" (bottom-right, 2s auto-dismiss)

### Step 3: API Key Generation

**Layout:**
- Generate Button: Large, gradient button
- API Key Display: Card with masked/unmasked toggle
- Security Warning: Alert box with icon
- API Key Info: Metadata cards

**API Key Display:**
```
┌─────────────────────────────────────────┐
│  API Key                                │
│  ┌───────────────────────────────────┐   │
│  │  PP-****-****-ABCD  [👁️ Show]   │   │
│  └───────────────────────────────────┘   │
│  [📋 Copy]                               │
│                                          │
│  ⚠️ Keep your API key secret. It will    │
│     not be shown again.                 │
│                                          │
│  [✓] I've saved my API key              │
└─────────────────────────────────────────┘
```

**API Key Card:**
- Background: `bg-zinc-50 dark:bg-zinc-800`
- Border: `border-2 border-zinc-200 dark:border-zinc-700`
- Padding: `p-4`
- Font: `font-mono text-lg`

**Show/Hide Toggle:**
- Icon: Eye icon (👁️ or SVG)
- Text: "Show" / "Hide"
- Position: Right side of API key display

**Security Warning:**
- Background: `bg-yellow-50 dark:bg-yellow-900/20`
- Border: `border-2 border-yellow-400`
- Icon: ⚠️ (exclamation mark)
- Text: `text-yellow-800 dark:text-yellow-200`

### Step 4: Code Integration

**Layout:**
- Framework Tabs: React, Vue, Vanilla JS
- Code Examples: Syntax-highlighted code blocks
- Test Connection: Button with status indicator

**Framework Tabs:**
```
[React] [Vue] [Vanilla JS]
```

**Code Example:**
```typescript
import { PlayAndPay } from 'playandpay-sdk';

const sdk = new PlayAndPay({
  apiKey: 'PP-4X8Y-2211-ABCD',
  platformId: 'pp_abc123'
});

// Start a session
const session = await sdk.startSession({
  contentId: 'content_123',
  userId: 'user_456'
});
```

**Test Connection Button:**
- Style: Gradient button (blue to cyan)
- Loading: Spinner + "Testing..."
- Success: Green checkmark + "Connected!"
- Error: Red X + "Connection failed"

### Progress Indicator

**Design:**
- Horizontal bar with 4 steps
- Active step: Blue circle with number, connected line
- Completed step: Green checkmark, connected line
- Upcoming step: Gray circle with number, dashed line

**Visual:**
```
[✓] ─── [✓] ─── [●] ─── [○]
Step 1  Step 2  Step 3  Step 4
```

**Styling:**
- Container: `flex items-center justify-between`
- Step circle: `w-10 h-10 rounded-full`
- Active: `bg-blue-500 text-white`
- Completed: `bg-green-500 text-white`
- Upcoming: `bg-zinc-200 text-zinc-500`

### Navigation Buttons

**Cancel Button:**
- Style: `border-2 border-red-200 text-red-600`
- Hover: `hover:bg-red-50 hover:border-red-300`
- Position: Left side

**Back Button:**
- Style: `border-2 border-zinc-200 text-zinc-600`
- Hover: `hover:bg-zinc-50`
- Position: Left side (when not on Step 1)

**Next Button:**
- Style: `bg-gradient-to-r from-blue-500 to-cyan-500 text-white`
- Hover: `hover:from-blue-600 hover:to-cyan-600`
- Disabled: `opacity-50 cursor-not-allowed`
- Position: Right side

**Complete Button:**
- Style: Same as Next button
- Text: "Complete Integration"
- Position: Right side (Step 4)

---

## 💰 Settlement Dashboard Design

### Overview

The Settlement Dashboard provides partners with comprehensive revenue and payment information. It should be data-rich but easy to understand.

### Layout Structure

```
┌─────────────────────────────────────────┐
│  Header: "Settlement Dashboard"        │
├─────────────────────────────────────────┤
│  Summary Cards (Grid: 4 columns)        │
│  [Total Revenue] [Pending] [Completed] [Next Date] │
├─────────────────────────────────────────┤
│  Revenue Chart (Line Chart)            │
│  [Last 6 Months Revenue Trend]         │
├─────────────────────────────────────────┤
│  Settlement History Table               │
│  [Filters] [Table] [Pagination]        │
└─────────────────────────────────────────┘
```

### Summary Cards

**Card Design:**
```
┌─────────────────────┐
│  Total Revenue      │
│  €12,500.50         │
│  ↗ +15% vs last month│
└─────────────────────┘
```

**Styling:**
- Background: `bg-gradient-to-br from-white to-blue-50`
- Border: `border-2 border-blue-200`
- Padding: `p-6`
- Shadow: `shadow-lg`
- Hover: `hover:shadow-xl transition-shadow`

**Card Content:**
- Title: `text-sm font-semibold text-zinc-600`
- Value: `text-3xl font-bold text-zinc-900`
- Change: `text-sm text-green-600` (positive) or `text-red-600` (negative)

### Revenue Chart

**Chart Design:**
- Type: Line chart
- X-axis: Months (last 6 months)
- Y-axis: Revenue (EUR)
- Tooltip: Show exact value on hover
- Grid: Light gray lines
- Line: Blue gradient, 3px width
- Points: Blue circles, 8px radius

**Styling:**
- Container: `bg-white rounded-xl border-2 border-zinc-200 p-6`
- Chart area: `h-64` (256px height)
- Responsive: Scales on mobile

### Settlement History Table

**Table Design:**
```
┌─────────────────────────────────────────────────────┐
│  Filters: [Status ▼] [Date Range] [Search] [Export] │
├─────────────────────────────────────────────────────┤
│  Date        Amount    Status      Transaction ID   │
│  ───────────────────────────────────────────────────│
│  2025-11-01  €3,200.75 Completed  tx_xyz789        │
│  2025-10-01  €2,850.00 Completed  tx_abc123        │
│  2025-09-01  €2,100.50 Pending    tx_def456        │
└─────────────────────────────────────────────────────┘
│  [← Previous]  Page 1 of 5  [Next →]              │
```

**Table Styling:**
- Header: `bg-zinc-100 font-semibold text-zinc-700`
- Rows: `border-b border-zinc-200 hover:bg-zinc-50`
- Status badges:
  - Completed: `bg-green-100 text-green-700`
  - Pending: `bg-yellow-100 text-yellow-700`
  - Failed: `bg-red-100 text-red-700`

**Filters:**
- Dropdown: `border-2 border-zinc-200 rounded-lg px-4 py-2`
- Date Range: Date picker component
- Search: Input with search icon
- Export: Button with download icon

### Settlement Details Modal

**Modal Design:**
```
┌─────────────────────────────────────────┐
│  Settlement Details          [× Close] │
├─────────────────────────────────────────┤
│  Settlement ID: st_abc123               │
│  Date: 2025-11-01                       │
│  Amount: €3,200.75                      │
│  Status: Completed                      │
│                                          │
│  Breakdown:                             │
│  ┌───────────────────────────────────┐  │
│  │  Total Sessions: 1,250           │  │
│  │  Platform Fee: €320.08           │  │
│  │  Net Revenue: €2,880.67           │  │
│  └───────────────────────────────────┘  │
│                                          │
│  Sessions Table:                        │
│  [Table with session details]           │
│                                          │
│  [Download Invoice PDF]                 │
└─────────────────────────────────────────┘
```

**Modal Styling:**
- Overlay: `bg-black/50 backdrop-blur-sm`
- Modal: `bg-white rounded-2xl shadow-2xl max-w-4xl`
- Close button: Top-right, `text-zinc-400 hover:text-zinc-600`

---

## 🎓 LMS Integration UI Design

### LMS Settings Page

**Layout:**
```
┌─────────────────────────────────────────┐
│  LMS Integration Settings               │
├─────────────────────────────────────────┤
│  Supported LMS Platforms:              │
│  ┌──────────┐  ┌──────────┐            │
│  │  Moodle  │  │  Canvas  │            │
│  │  [Connect]│  │  [Connect]│            │
│  └──────────┘  └──────────┘            │
│  ┌──────────┐  ┌──────────┐            │
│  │Blackboard│  │  Custom  │            │
│  │  [Connect]│  │  [Connect]│            │
│  └──────────┘  └──────────┘            │
├─────────────────────────────────────────┤
│  Connected LMS:                        │
│  ┌───────────────────────────────────┐  │
│  │  Moodle - lms.example.com        │  │
│  │  Status: Connected ✓             │  │
│  │  Last Sync: 2025-11-17 10:00     │  │
│  │  [Sync Now] [Disconnect]         │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Connection Modal

**Modal Design:**
```
┌─────────────────────────────────────────┐
│  Connect LMS                [× Close]   │
├─────────────────────────────────────────┤
│  LMS Type: [Moodle ▼]                  │
│                                          │
│  LMS URL:                                │
│  [https://lms.example.com        ]      │
│                                          │
│  API Key:                                │
│  [lms_api_key_here              ]       │
│                                          │
│  [Test Connection]                      │
│                                          │
│  [Cancel]              [Connect]        │
└─────────────────────────────────────────┘
```

**Form Fields:**
- LMS Type: Dropdown with LMS options
- LMS URL: Text input with validation
- API Key: Password input (masked)
- Test Connection: Button with loading state

### Course Sync Section

**Layout:**
```
┌─────────────────────────────────────────┐
│  Synced Courses                         │
│  [Sync Now] [Auto-sync: Daily ▼]      │
├─────────────────────────────────────────┤
│  Course Name          Status    Last Sync│
│  ──────────────────────────────────────│
│  JavaScript Basics    ✓ Synced  10:00  │
│  React Advanced       ✓ Synced  10:00  │
│  Node.js Fundamentals ✓ Synced  10:00  │
└─────────────────────────────────────────┘
```

---

## 🎨 Design System Reference

### Colors

**Primary:**
- Blue: `#3b82f6` (blue-500)
- Cyan: `#06b6d4` (cyan-500)
- Gradient: `from-blue-500 to-cyan-500`

**Status:**
- Success: `#10b981` (green-500)
- Warning: `#f59e0b` (yellow-500)
- Error: `#ef4444` (red-500)
- Info: `#3b82f6` (blue-500)

**Neutral:**
- Zinc-50: `#fafafa`
- Zinc-100: `#f4f4f5`
- Zinc-200: `#e4e4e7`
- Zinc-600: `#52525b`
- Zinc-900: `#18181b`

### Typography

**Headings:**
- H1: `text-4xl font-bold`
- H2: `text-3xl font-bold`
- H3: `text-2xl font-semibold`
- H4: `text-xl font-semibold`

**Body:**
- Default: `text-base text-zinc-900`
- Secondary: `text-sm text-zinc-600`
- Muted: `text-xs text-zinc-500`

**Monospace:**
- Code: `font-mono text-sm`
- API Keys: `font-mono text-lg`

### Spacing

**Container:**
- Max-width: `max-w-4xl` (896px) for wizards
- Max-width: `max-w-7xl` (1280px) for dashboards
- Padding: `p-6` or `px-6 py-8`

**Gaps:**
- Small: `gap-2` (8px)
- Medium: `gap-4` (16px)
- Large: `gap-6` (24px)

### Shadows

- Small: `shadow-sm`
- Medium: `shadow-md`
- Large: `shadow-lg`
- Extra Large: `shadow-xl`
- 2XL: `shadow-2xl`

### Borders

- Default: `border-2 border-zinc-200`
- Focus: `border-blue-500`
- Error: `border-red-500`
- Radius: `rounded-xl` (12px) or `rounded-2xl` (16px)

### Buttons

**Primary:**
- Style: `bg-gradient-to-r from-blue-500 to-cyan-500 text-white`
- Hover: `hover:from-blue-600 hover:to-cyan-600`
- Padding: `px-6 py-3`
- Radius: `rounded-xl`

**Secondary:**
- Style: `border-2 border-zinc-200 text-zinc-600`
- Hover: `hover:bg-zinc-50`

**Danger:**
- Style: `border-2 border-red-200 text-red-600`
- Hover: `hover:bg-red-50`

---

## 📱 Responsive Design

### Breakpoints

- Mobile: `< 640px` (sm)
- Tablet: `640px - 1024px` (md, lg)
- Desktop: `> 1024px` (xl, 2xl)

### Mobile Adaptations

**Wizard:**
- Stack steps vertically
- Full-width cards
- Larger touch targets (min 44x44px)

**Dashboard:**
- Stack summary cards (1 column)
- Horizontal scroll for tables
- Collapsible filters

**Tables:**
- Card layout on mobile
- Hide less important columns
- Expandable rows for details

---

## ♿ Accessibility

### Requirements

- **ARIA Labels:** All interactive elements
- **Keyboard Navigation:** Tab order, Enter/Space for buttons
- **Focus Indicators:** Visible focus rings
- **Color Contrast:** WCAG AA minimum (4.5:1)
- **Screen Readers:** Semantic HTML, alt text for icons

### Focus Management

- Focus trap in modals
- Focus return after modal close
- Focus on first input in forms
- Skip links for navigation

---

**تاریخ آخرین به‌روزرسانی:** 2025-11-17  
**وضعیت:** Draft - نیاز به Review از Design Team

