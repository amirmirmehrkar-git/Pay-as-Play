# Story 4.1: Low Balance Warning & Notifications

**Epic:** Epic 4 - User Experience Enhancements  
**Status:** Draft  
**Priority:** High  
**Story Points:** 5  
**Assignee:** TBD

---

## Story

**As a** User (Sophie, Klaus, Anna, Thomas, Julia, Felix)  
**I want to** receive warnings when my balance is low  
**So that** I can top up before my content playback is interrupted

---

## Acceptance Criteria

1. **Low Balance Detection:**
   - [ ] Monitor wallet balance in real-time
   - [ ] Trigger warning when balance < threshold (e.g., 5 EUR or 10 minutes of content)
   - [ ] Calculate threshold based on current content pricing

2. **Warning Modal:**
   - [ ] Modal appears when low balance detected
   - [ ] Modal shows:
     - [ ] Current balance
     - [ ] Estimated time remaining (based on current content)
     - [ ] "Top Up Now" button
     - [ ] "Continue Watching" button (dismisses modal)
     - [ ] "Set Auto-top-up" link
   - [ ] Modal can be dismissed (but reappears if balance still low)

3. **In-Player Warning:**
   - [ ] Warning banner in video/audio player when balance low
   - [ ] Banner shows:
     - [ ] "Low balance: X EUR remaining"
     - [ ] "Top Up" button
     - [ ] Can be dismissed (collapsible)
   - [ ] Banner reappears if balance still low after dismissal

4. **Notification Settings:**
   - [ ] Settings page: `/settings/notifications`
   - [ ] Toggle: "Low balance warnings"
   - [ ] Threshold setting: Minimum balance before warning (EUR or minutes)
   - [ ] Notification method: In-app, Email, Push (if available)

5. **Email Notifications (Optional):**
   - [ ] Email sent when balance drops below threshold
   - [ ] Email includes:
     - [ ] Current balance
     - [ ] Link to top up
     - [ ] Link to set auto-top-up

6. **Context-Aware Warnings:**
   - [ ] Warning appears before starting new content if balance insufficient
   - [ ] Warning appears during playback if balance running low
   - [ ] Warning appears when balance reaches critical level (e.g., < 2 minutes of content)

7. **Auto-top-up Prompt:**
   - [ ] "Set Auto-top-up" link in warning modal
   - [ ] Opens auto-top-up settings
   - [ ] Quick setup flow from warning

8. **Loading States:**
   - [ ] Loading spinner when checking balance
   - [ ] Loading state when opening top-up modal

9. **Error Handling:**
   - [ ] Error message if balance check fails
   - [ ] Retry button
   - [ ] Fallback: Show warning based on last known balance

10. **Responsive Design:**
    - [ ] Modal is mobile-friendly
    - [ ] Banner responsive on all screen sizes
    - [ ] Touch-friendly buttons

---

## Tasks / Subtasks

- [ ] **Task 1: Low Balance Detection** (AC: 1)
  - [ ] Create `hooks/useLowBalanceWarning.ts`
  - [ ] Monitor balance in real-time
  - [ ] Calculate threshold based on content pricing
  - [ ] Trigger warning when threshold reached

- [ ] **Task 2: Warning Modal Component** (AC: 2)
  - [ ] Create `components/LowBalanceWarningModal.tsx`
  - [ ] Display current balance
  - [ ] Calculate and display estimated time remaining
  - [ ] Add "Top Up Now" button
  - [ ] Add "Continue Watching" button
  - [ ] Add "Set Auto-top-up" link

- [ ] **Task 3: In-Player Warning Banner** (AC: 3)
  - [ ] Create `components/LowBalanceBanner.tsx`
  - [ ] Display in video/audio player
  - [ ] Add "Top Up" button
  - [ ] Make collapsible/dismissible
  - [ ] Integrate with VideoPlayer component

- [ ] **Task 4: Notification Settings** (AC: 4)
  - [ ] Add notification settings to Settings page
  - [ ] Add toggle for low balance warnings
  - [ ] Add threshold setting
  - [ ] Add notification method selection

- [ ] **Task 5: Email Notifications** (AC: 5)
  - [ ] Integrate with email service
  - [ ] Create email template
  - [ ] Send email when threshold reached

- [ ] **Task 6: Context-Aware Warnings** (AC: 6)
  - [ ] Add warning before starting content
  - [ ] Add warning during playback
  - [ ] Add critical level warning

- [ ] **Task 7: Auto-top-up Integration** (AC: 7)
  - [ ] Add "Set Auto-top-up" link
  - [ ] Open auto-top-up settings
  - [ ] Quick setup flow

- [ ] **Task 8: API Integration** (AC: 1, 2, 3)
  - [ ] Integrate with balance API
  - [ ] Integrate with content pricing API
  - [ ] Calculate estimated time remaining

- [ ] **Task 9: Testing** (All ACs)
  - [ ] Unit tests for low balance detection
  - [ ] Unit tests for warning components
  - [ ] Integration tests for warning flow
  - [ ] E2E test for low balance warning

---

## Dev Notes

### Relevant Source Tree:
```
components/
  ├── LowBalanceWarningModal.tsx         # Warning modal (NEW)
  └── LowBalanceBanner.tsx               # In-player banner (NEW)

hooks/
  └── useLowBalanceWarning.ts            # Low balance hook (NEW)

app/settings/
  └── notifications/
      └── page.tsx                       # Notification settings (NEW or update)
```

### Technical Details:

**Balance Monitoring:**
- Poll balance every 30 seconds during active session
- Or use WebSocket for real-time updates
- Calculate threshold: `currentContentPrice * 10` (10 minutes buffer)

**Threshold Calculation:**
- Based on current content pricing
- Minimum: 5 EUR or equivalent
- User-configurable in settings

**State Management:**
- Use React Query for balance data
- Use context or Zustand for warning state

### Testing Standards:

**Test File Location:**
- Unit tests: `hooks/__tests__/useLowBalanceWarning.test.ts`
- Unit tests: `components/__tests__/LowBalanceWarningModal.test.tsx`
- Integration tests: `components/__tests__/LowBalanceBanner.test.tsx`

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

