# Story 4.5: Export Functionality (CSV, PDF)

**Epic:** Epic 4 - User Experience Enhancements  
**Status:** Draft  
**Priority:** Medium  
**Story Points:** 5  
**Assignee:** TBD

---

## Story

**As a** User (Mario, Sophie, Ian, all users)  
**I want to** export my analytics data and transaction history  
**So that** I can analyze my usage offline or share with others

---

## Acceptance Criteria

1. **Export Options in Analytics:**
   - [ ] "Export Data" button in Analytics page
   - [ ] Dropdown menu with options:
     - [ ] Export as CSV
     - [ ] Export as PDF
     - [ ] Share with Partner (if applicable)
   - [ ] Export button in AnalyticsCharts component

2. **CSV Export:**
   - [ ] Export analytics data as CSV
   - [ ] Include:
     - [ ] Date range
     - [ ] Time watched per day
     - [ ] Cost per content item
     - [ ] Monthly spending
     - [ ] Transaction history
   - [ ] CSV file name: `analytics-YYYY-MM-DD.csv`
   - [ ] Download starts automatically
   - [ ] Success notification: "CSV exported successfully"

3. **PDF Export:**
   - [ ] Export analytics report as PDF
   - [ ] PDF includes:
     - [ ] Cover page with user info and date range
     - [ ] Summary cards (time watched, total spent, etc.)
     - [ ] Charts (as images)
     - [ ] Transaction table
     - [ ] Footer with export date
   - [ ] PDF file name: `analytics-report-YYYY-MM-DD.pdf`
   - [ ] Download starts automatically
   - [ ] Success notification: "PDF exported successfully"

4. **Export Settings:**
   - [ ] Date range selector for export
   - [ ] Options:
     - [ ] Include charts
     - [ ] Include transactions
     - [ ] Include summary
   - [ ] "Export" button

5. **Share with Partner:**
   - [ ] "Share with Partner" option (if user has connected platforms)
   - [ ] Select partner(s) to share with
   - [ ] Add message (optional)
   - [ ] "Share" button
   - [ ] Success notification: "Data shared successfully"
   - [ ] Partner receives email with link to view data

6. **Export Progress:**
   - [ ] Loading spinner during export
   - [ ] Progress indicator for large exports
   - [ ] "Preparing export..." message

7. **Error Handling:**
   - [ ] Error message if export fails
   - [ ] Retry button
   - [ ] Error message if data too large

8. **Export History (Optional):**
   - [ ] Display list of recent exports
   - [ ] Each export shows:
     - [ ] Export date
     - [ ] Export type (CSV, PDF)
     - [ ] Date range
     - [ ] "Download" link (if stored)

9. **Responsive Design:**
   - [ ] Mobile-friendly export menu
   - [ ] Touch-friendly buttons

---

## Tasks / Subtasks

- [ ] **Task 1: Export Button Component** (AC: 1)
  - [ ] Create `components/ExportButton.tsx`
  - [ ] Add dropdown menu
  - [ ] Add export options
  - [ ] Integrate with Analytics page

- [ ] **Task 2: CSV Export** (AC: 2)
  - [ ] Create `utils/exportCSV.ts`
  - [ ] Format data as CSV
  - [ ] Generate CSV file
  - [ ] Trigger download
  - [ ] Add success notification

- [ ] **Task 3: PDF Export** (AC: 3)
  - [ ] Install PDF library (`jspdf` or `react-pdf`)
  - [ ] Create `utils/exportPDF.ts`
  - [ ] Generate PDF with:
     - [ ] Cover page
     - [ ] Summary cards
     - [ ] Charts (convert to images)
     - [ ] Transaction table
  - [ ] Trigger download
  - [ ] Add success notification

- [ ] **Task 4: Export Settings Modal** (AC: 4)
  - [ ] Create `components/ExportSettingsModal.tsx`
  - [ ] Add date range selector
  - [ ] Add export options checkboxes
  - [ ] Add "Export" button

- [ ] **Task 5: Share with Partner** (AC: 5)
  - [ ] Create `components/ShareWithPartnerModal.tsx`
  - [ ] Display connected partners
  - [ ] Add partner selection
  - [ ] Add message input
  - [ ] Integrate with share API

- [ ] **Task 6: Export Progress** (AC: 6)
  - [ ] Add loading spinner
  - [ ] Add progress indicator
  - [ ] Add "Preparing export..." message

- [ ] **Task 7: API Integration** (AC: 2, 3, 5)
  - [ ] Integrate with `GET /api/analytics/export/csv`
  - [ ] Integrate with `GET /api/analytics/export/pdf`
  - [ ] Integrate with `POST /api/analytics/share`
  - [ ] Handle date range parameters

- [ ] **Task 8: Chart to Image Conversion** (AC: 3)
  - [ ] Convert charts to images for PDF
  - [ ] Use `html2canvas` or similar
  - [ ] Embed images in PDF

- [ ] **Task 9: Testing** (All ACs)
  - [ ] Unit tests for export utilities
  - [ ] Integration tests for export API
  - [ ] E2E test for export flow

---

## Dev Notes

### Relevant Source Tree:
```
components/
  ├── ExportButton.tsx                    # Export button (NEW)
  ├── ExportSettingsModal.tsx             # Export settings (NEW)
  └── ShareWithPartnerModal.tsx           # Share modal (NEW)

utils/
  ├── exportCSV.ts                        # CSV export utility (NEW)
  └── exportPDF.ts                        # PDF export utility (NEW)
```

### Technical Details:

**CSV Export:**
- Use `papaparse` or native CSV generation
- Format: `Date,Content,Time Watched,Amount`
- Download using `Blob` and `URL.createObjectURL`

**PDF Export:**
- Use `jspdf` for PDF generation
- Use `html2canvas` to convert charts to images
- Layout: Cover page, summary, charts, transactions

**Share API:**
- Endpoint: `POST /api/analytics/share`
- Request body: `{ partnerIds: string[], message?: string, dateRange: { start, end } }`
- Response: Share link

**Chart to Image:**
- Use `html2canvas` to capture chart elements
- Convert to base64 image
- Embed in PDF

### Testing Standards:

**Test File Location:**
- Unit tests: `utils/__tests__/exportCSV.test.ts`
- Unit tests: `utils/__tests__/exportPDF.test.ts`
- Integration tests: `components/__tests__/ExportButton.test.tsx`

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

