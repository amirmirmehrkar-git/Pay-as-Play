# Story 4.4: Analytics Charts Implementation

**Epic:** Epic 4 - User Experience Enhancements  
**Status:** Draft  
**Priority:** Medium  
**Story Points:** 8  
**Assignee:** TBD

---

## Story

**As a** User (Mario, Sophie, Ian, all users)  
**I want to** see visual charts of my usage and spending  
**So that** I can better understand my consumption patterns and costs

---

## Acceptance Criteria

1. **Charts Section in Analytics:**
   - [ ] Add charts section to `/analytics` page
   - [ ] Replace placeholder charts with real implementations
   - [ ] Responsive chart layout

2. **Time Watched Over Time Chart:**
   - [ ] Line chart showing time watched per day/week/month
   - [ ] X-axis: Date range (last 30 days default)
   - [ ] Y-axis: Minutes watched
   - [ ] Tooltip on hover showing exact value
   - [ ] Date range selector: Last 7 days, Last 30 days, Last 90 days, Custom
   - [ ] Toggle: Show by Day/Week/Month

3. **Cost per Content Chart:**
   - [ ] Bar chart showing cost per content item
   - [ ] X-axis: Content items (top 10-20)
   - [ ] Y-axis: Amount spent (EUR)
   - [ ] Tooltip on hover showing:
     - [ ] Content name
     - [ ] Total amount
     - [ ] Time watched
     - [ ] Cost per minute
   - [ ] Sortable: By amount, by name
   - [ ] Filterable: By platform, by date range

4. **Monthly Spend Chart:**
   - [ ] Area chart showing monthly spending
   - [ ] X-axis: Months (last 6-12 months)
   - [ ] Y-axis: Amount spent (EUR)
   - [ ] Tooltip on hover showing:
     - [ ] Month
     - [ ] Total amount
     - [ ] Number of sessions
     - [ ] Average cost per session
   - [ ] Color gradient for visual appeal

5. **Spending by Platform Chart:**
   - [ ] Pie or donut chart showing spending distribution by platform
   - [ ] Each slice shows:
     - [ ] Platform name
     - [ ] Amount spent
     - [ ] Percentage of total
   - [ ] Tooltip on hover
   - [ ] Legend with platform names
   - [ ] Click on slice to filter other charts

6. **Content Type Distribution:**
   - [ ] Pie chart showing spending by content type (Video, Audio, Learning)
   - [ ] Each slice shows:
     - [ ] Content type
     - [ ] Amount spent
     - [ ] Percentage
   - [ ] Tooltip on hover

7. **Interactive Features:**
   - [ ] Click on chart element to filter other charts
   - [ ] Zoom and pan (for line/area charts)
   - [ ] Export chart as image (PNG, SVG)
   - [ ] Print chart

8. **Chart Customization:**
   - [ ] Toggle chart visibility
   - [ ] Change chart type (if applicable)
   - [ ] Adjust date range
   - [ ] Save chart preferences

9. **Loading States:**
   - [ ] Skeleton loaders for charts
   - [ ] Loading spinner during data fetch
   - [ ] Progressive loading (show data as it arrives)

10. **Error Handling:**
    - [ ] Error message if data fetch fails
    - [ ] Retry button
    - [ ] Empty state: "No data available for selected period"

11. **Responsive Design:**
    - [ ] Charts responsive (scale on mobile)
    - [ ] Horizontal scroll on mobile if needed
    - [ ] Touch-friendly interactions
    - [ ] Charts stack vertically on mobile

12. **Performance:**
    - [ ] Lazy load charts (load when visible)
    - [ ] Optimize for large datasets
    - [ ] Use virtualization if needed

---

## Tasks / Subtasks

- [ ] **Task 1: Install Chart Library** (AC: 1)
  - [ ] Install Recharts or Chart.js
  - [ ] Install dependencies
  - [ ] Set up chart configuration

- [ ] **Task 2: Time Watched Chart** (AC: 2)
  - [ ] Create `components/TimeWatchedChart.tsx`
  - [ ] Implement line chart
  - [ ] Add date range selector
  - [ ] Add day/week/month toggle
  - [ ] Add tooltips

- [ ] **Task 3: Cost per Content Chart** (AC: 3)
  - [ ] Create `components/CostPerContentChart.tsx`
  - [ ] Implement bar chart
  - [ ] Add sorting and filtering
  - [ ] Add tooltips

- [ ] **Task 4: Monthly Spend Chart** (AC: 4)
  - [ ] Create `components/MonthlySpendChart.tsx`
  - [ ] Implement area chart
  - [ ] Add tooltips
  - [ ] Add color gradient

- [ ] **Task 5: Spending by Platform Chart** (AC: 5)
  - [ ] Create `components/SpendingByPlatformChart.tsx`
  - [ ] Implement pie/donut chart
  - [ ] Add legend
  - [ ] Add click-to-filter functionality

- [ ] **Task 6: Content Type Distribution Chart** (AC: 6)
  - [ ] Create `components/ContentTypeDistributionChart.tsx`
  - [ ] Implement pie chart
  - [ ] Add tooltips

- [ ] **Task 7: Interactive Features** (AC: 7)
  - [ ] Implement click-to-filter
  - [ ] Add zoom and pan
  - [ ] Add export functionality
  - [ ] Add print functionality

- [ ] **Task 8: Chart Customization** (AC: 8)
  - [ ] Add toggle visibility
  - [ ] Add chart preferences
  - [ ] Save preferences to localStorage

- [ ] **Task 9: API Integration** (AC: 2-6)
  - [ ] Integrate with `GET /api/analytics/time-watched`
  - [ ] Integrate with `GET /api/analytics/cost-per-content`
  - [ ] Integrate with `GET /api/analytics/monthly-spend`
  - [ ] Integrate with `GET /api/analytics/spending-by-platform`
  - [ ] Handle date range parameters

- [ ] **Task 10: Performance Optimization** (AC: 12)
  - [ ] Implement lazy loading
  - [ ] Optimize data processing
  - [ ] Use virtualization if needed

- [ ] **Task 11: Testing** (All ACs)
  - [ ] Unit tests for chart components
  - [ ] Integration tests for API calls
  - [ ] E2E test for analytics charts

---

## Dev Notes

### Relevant Source Tree:
```
components/
  ├── TimeWatchedChart.tsx                # Time watched chart (NEW)
  ├── CostPerContentChart.tsx            # Cost per content chart (NEW)
  ├── MonthlySpendChart.tsx              # Monthly spend chart (NEW)
  ├── SpendingByPlatformChart.tsx        # Spending by platform chart (NEW)
  └── ContentTypeDistributionChart.tsx   # Content type chart (NEW)

app/analytics/
  └── page.tsx                           # Analytics page (UPDATE)
```

### Technical Details:

**Chart Library:**
- Recommended: Recharts (React-friendly, responsive)
- Alternative: Chart.js with react-chartjs-2
- Use `ResponsiveContainer` from Recharts for responsiveness

**API Integration:**
- Time Watched: `GET /api/analytics/time-watched?startDate=&endDate=&groupBy=day|week|month`
- Cost per Content: `GET /api/analytics/cost-per-content?startDate=&endDate=&platform=`
- Monthly Spend: `GET /api/analytics/monthly-spend?months=6`
- Spending by Platform: `GET /api/analytics/spending-by-platform?startDate=&endDate=`

**Data Format:**
- Time series data: `{ date: string, value: number }[]`
- Categorical data: `{ name: string, value: number }[]`

**Performance:**
- Use `React.memo` for chart components
- Debounce date range changes
- Cache chart data

### Testing Standards:

**Test File Location:**
- Unit tests: `components/__tests__/TimeWatchedChart.test.tsx`
- Integration tests: `app/analytics/__tests__/page.test.tsx`

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-01-XX | 1.0 | Initial story creation | PM |

---

## Dev Agent Record
_TBD_

---

## QA Results
_TBD_

