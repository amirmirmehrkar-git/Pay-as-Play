# Story 4.2: Auto-top-up Feature

**Epic:** Epic 4 - User Experience Enhancements  
**Status:** Draft  
**Priority:** High  
**Story Points:** 8  
**Assignee:** TBD

---

## Story

**As a** User (Sophie, Klaus, Anna, Mario)  
**I want to** set up automatic top-up when my balance is low  
**So that** I never run out of credits and my content playback is never interrupted

---

## Acceptance Criteria

1. **Auto-top-up Settings Page:**
   - [ ] Route: `/settings/wallet/auto-topup` or section in Wallet settings
   - [ ] Page title: "Auto-top-up Settings"
   - [ ] Toggle: "Enable Auto-top-up"
   - [ ] Settings visible only when enabled

2. **Top-up Amount:**
   - [ ] Input field for top-up amount (EUR)
   - [ ] Preset options: 10, 20, 50, 100 EUR
   - [ ] Custom amount option
   - [ ] Validation: Minimum 5 EUR, Maximum 1000 EUR
   - [ ] Display estimated content time for amount

3. **Trigger Threshold:**
   - [ ] Input field for trigger threshold (EUR)
   - [ ] Help text: "Top-up will trigger when balance falls below this amount"
   - [ ] Default: 5 EUR
   - [ ] Validation: Must be less than top-up amount
   - [ ] Preset options: 2, 5, 10 EUR

4. **Payment Method:**
   - [ ] Select payment method for auto-top-up:
     - [ ] Credit Card
     - [ ] PayPal
     - [ ] Bank Account (SEPA)
     - [ ] Crypto Wallet (Algorand)
   - [ ] Display saved payment methods
   - [ ] "Add Payment Method" button if none saved
   - [ ] Link to payment method settings

5. **Payment Method Details:**
   - [ ] For Credit Card:
     - [ ] Card number (masked)
     - [ ] Expiry date
     - [ ] Cardholder name
     - [ ] "Update Card" button
   - [ ] For PayPal:
     - [ ] PayPal email
     - [ ] "Update PayPal" button
   - [ ] For Bank Account:
     - [ ] IBAN (masked)
     - [ ] Account holder name
     - [ ] "Update Bank Account" button
   - [ ] For Crypto:
     - [ ] Wallet address
     - [ ] "Update Wallet" button

6. **Auto-top-up History:**
   - [ ] Display list of auto-top-up transactions
   - [ ] Each transaction shows:
     - [ ] Date and time
     - [ ] Amount
     - [ ] Trigger balance
     - [ ] Status (Success, Failed, Pending)
   - [ ] Link to transaction details

7. **Notifications:**
   - [ ] Toggle: "Notify me before auto-top-up"
   - [ ] Toggle: "Notify me after auto-top-up"
   - [ ] Email notification option
   - [ ] In-app notification option

8. **Security:**
   - [ ] Confirmation required to enable auto-top-up
   - [ ] Two-factor authentication for payment method changes
   - [ ] Display security badge: "Your payment information is encrypted"

9. **Status Display:**
   - [ ] Display auto-top-up status on Wallet page
   - [ ] Status: Enabled/Disabled
   - [ ] Next trigger threshold
   - [ ] Last top-up date
   - [ ] Quick toggle to enable/disable

10. **Error Handling:**
    - [ ] Display error if auto-top-up fails
    - [ ] Retry button
    - [ ] Notification if payment method expired
    - [ ] "Update Payment Method" prompt

11. **Loading States:**
    - [ ] Loading spinner when saving settings
    - [ ] Loading state during auto-top-up process

12. **Responsive Design:**
    - [ ] Mobile-friendly form layout
    - [ ] Touch-friendly inputs and buttons

---

## Tasks / Subtasks

- [ ] **Task 1: Create Auto-top-up Settings Page** (AC: 1)
  - [ ] Create `app/settings/wallet/auto-topup/page.tsx` or add to Wallet settings
  - [ ] Add toggle for enable/disable
  - [ ] Add settings form

- [ ] **Task 2: Top-up Amount Component** (AC: 2)
  - [ ] Create input field with validation
  - [ ] Add preset options
  - [ ] Add custom amount option
  - [ ] Display estimated content time

- [ ] **Task 3: Trigger Threshold Component** (AC: 3)
  - [ ] Create input field with validation
  - [ ] Add preset options
  - [ ] Add help text
  - [ ] Validate against top-up amount

- [ ] **Task 4: Payment Method Selection** (AC: 4, 5)
  - [ ] Create `components/AutoTopupPaymentMethod.tsx`
  - [ ] Display saved payment methods
  - [ ] Add "Add Payment Method" functionality
  - [ ] Display payment method details (masked)

- [ ] **Task 5: Auto-top-up History** (AC: 6)
  - [ ] Create `components/AutoTopupHistory.tsx`
  - [ ] Display transaction list
  - [ ] Add link to transaction details

- [ ] **Task 6: Notifications** (AC: 7)
  - [ ] Add notification toggles
  - [ ] Integrate with notification system
  - [ ] Send email notifications

- [ ] **Task 7: Security** (AC: 8)
  - [ ] Add confirmation dialog
  - [ ] Integrate 2FA if enabled
  - [ ] Display security badge

- [ ] **Task 8: Status Display** (AC: 9)
  - [ ] Add auto-top-up status to Wallet page
  - [ ] Display status information
  - [ ] Add quick toggle

- [ ] **Task 9: API Integration** (AC: 1-10)
  - [ ] Integrate with `GET /api/wallet/auto-topup/settings`
  - [ ] Integrate with `PUT /api/wallet/auto-topup/settings`
  - [ ] Integrate with `GET /api/wallet/auto-topup/history`
  - [ ] Integrate with payment processing API

- [ ] **Task 10: Backend Auto-top-up Logic** (AC: 1-10)
  - [ ] Implement auto-top-up trigger logic
  - [ ] Monitor balance in real-time
  - [ ] Process payment when threshold reached
  - [ ] Send notifications

- [ ] **Task 11: Testing** (All ACs)
  - [ ] Unit tests for components
  - [ ] Integration tests for API calls
  - [ ] E2E test for auto-top-up flow
  - [ ] Test auto-top-up trigger logic

---

## Dev Notes

### Relevant Source Tree:
```
app/settings/wallet/
  └── auto-topup/
      └── page.tsx                       # Auto-top-up settings (NEW)

components/
  ├── AutoTopupPaymentMethod.tsx         # Payment method (NEW)
  └── AutoTopupHistory.tsx               # History (NEW)
```

### Technical Details:

**API Integration:**
- Get Settings: `GET /api/wallet/auto-topup/settings`
- Update Settings: `PUT /api/wallet/auto-topup/settings`
- Get History: `GET /api/wallet/auto-topup/history`
- Process Payment: `POST /api/wallet/auto-topup/process` (backend)

**Backend Auto-top-up Logic:**
- Monitor user balance in real-time
- Trigger when balance < threshold
- Process payment using saved payment method
- Update wallet balance
- Send notifications
- Log transaction

**Payment Processing:**
- Integrate with payment gateway (Stripe, PayPal, etc.)
- Handle payment failures gracefully
- Retry logic for failed payments

### Testing Standards:

**Test File Location:**
- Unit tests: `components/__tests__/AutoTopupPaymentMethod.test.tsx`
- Integration tests: `app/settings/wallet/auto-topup/__tests__/page.test.tsx`
- Backend tests: `backend/__tests__/auto-topup.test.ts`

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

