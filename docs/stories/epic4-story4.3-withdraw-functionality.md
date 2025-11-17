# Story 4.3: Withdraw Functionality

**Epic:** Epic 4 - User Experience Enhancements  
**Status:** Draft  
**Priority:** Medium  
**Story Points:** 8  
**Assignee:** TBD

---

## Story

**As a** User (Mario, Sophie, Ian, all users)  
**I want to** withdraw my wallet balance  
**So that** I can transfer my unused credits back to my bank account or wallet

---

## Acceptance Criteria

1. **Withdraw Page:**
   - [ ] Route: `/wallet/withdraw` or section in Wallet page
   - [ ] Page title: "Withdraw Funds"
   - [ ] Link from Wallet page
   - [ ] Display current balance

2. **Withdraw Amount:**
   - [ ] Input field for withdraw amount (EUR)
   - [ ] "Withdraw All" button (withdraws available balance)
   - [ ] Preset options: 10, 25, 50, 100 EUR (if balance allows)
   - [ ] Validation:
     - [ ] Minimum: 10 EUR
     - [ ] Maximum: Available balance
     - [ ] Must be less than or equal to available balance
   - [ ] Display available balance
   - [ ] Display fees (if applicable)

3. **Withdrawal Method:**
   - [ ] Select withdrawal method:
     - [ ] Bank Transfer (SEPA)
     - [ ] PayPal
     - [ ] Crypto Wallet (Algorand)
   - [ ] Display saved withdrawal methods
   - [ ] "Add Withdrawal Method" button if none saved

4. **Bank Transfer Details:**
   - [ ] IBAN input (required)
   - [ ] BIC/SWIFT input (required)
   - [ ] Account holder name (required)
   - [ ] Bank name (optional)
   - [ ] IBAN validation
   - [ ] Save for future withdrawals (checkbox)

5. **PayPal Details:**
   - [ ] PayPal email input (required)
   - [ ] Email validation
   - [ ] Save for future withdrawals (checkbox)

6. **Crypto Wallet Details:**
   - [ ] Algorand wallet address input (required)
   - [ ] Address validation
   - [ ] Save for future withdrawals (checkbox)

7. **Withdrawal Summary:**
   - [ ] Display:
     - [ ] Withdraw amount
     - [ ] Fees (if applicable)
     - [ ] Net amount (amount - fees)
     - [ ] Withdrawal method
     - [ ] Estimated processing time
   - [ ] "Confirm Withdrawal" button

8. **Confirmation:**
   - [ ] Confirmation modal before processing
   - [ ] Modal shows withdrawal summary
   - [ ] "Cancel" and "Confirm" buttons
   - [ ] Security: Require password or 2FA for confirmation

9. **Processing:**
   - [ ] Loading state during processing
   - [ ] Progress indicator
   - [ ] Success message: "Withdrawal request submitted"
   - [ ] Display withdrawal ID
   - [ ] Estimated processing time

10. **Withdrawal History:**
    - [ ] Display list of withdrawal requests
    - [ ] Each withdrawal shows:
      - [ ] Withdrawal ID
      - [ ] Date and time
      - [ ] Amount
      - [ ] Status (Pending, Processing, Completed, Failed)
      - [ ] Withdrawal method
    - [ ] Link to withdrawal details

11. **Status Updates:**
    - [ ] Email notification when withdrawal status changes
    - [ ] In-app notification
    - [ ] Status badge on withdrawal history

12. **Error Handling:**
    - [ ] Error message if withdrawal fails
    - [ ] Error message if insufficient balance
    - [ ] Error message if payment method invalid
    - [ ] Retry button (if applicable)

13. **Loading States:**
    - [ ] Loading spinner during processing
    - [ ] Disable form during processing

14. **Responsive Design:**
    - [ ] Mobile-friendly form layout
    - [ ] Touch-friendly inputs and buttons

---

## Tasks / Subtasks

- [ ] **Task 1: Create Withdraw Page** (AC: 1)
  - [ ] Create `app/wallet/withdraw/page.tsx` or add to Wallet page
  - [ ] Add page layout with header
  - [ ] Display current balance

- [ ] **Task 2: Withdraw Amount Component** (AC: 2)
  - [ ] Create input field with validation
  - [ ] Add "Withdraw All" button
  - [ ] Add preset options
  - [ ] Display available balance
  - [ ] Display fees

- [ ] **Task 3: Withdrawal Method Selection** (AC: 3)
  - [ ] Create `components/WithdrawalMethodSelector.tsx`
  - [ ] Display saved methods
  - [ ] Add "Add Method" functionality

- [ ] **Task 4: Bank Transfer Form** (AC: 4)
  - [ ] Create form for bank transfer details
  - [ ] Add IBAN validation
  - [ ] Add BIC validation
  - [ ] Add save checkbox

- [ ] **Task 5: PayPal Form** (AC: 5)
  - [ ] Create form for PayPal details
  - [ ] Add email validation
  - [ ] Add save checkbox

- [ ] **Task 6: Crypto Wallet Form** (AC: 6)
  - [ ] Create form for crypto wallet
  - [ ] Add address validation
  - [ ] Add save checkbox

- [ ] **Task 7: Withdrawal Summary** (AC: 7)
  - [ ] Create `components/WithdrawalSummary.tsx`
  - [ ] Display withdrawal details
  - [ ] Calculate fees
  - [ ] Display net amount

- [ ] **Task 8: Confirmation Modal** (AC: 8)
  - [ ] Create confirmation modal
  - [ ] Display withdrawal summary
  - [ ] Add password/2FA requirement
  - [ ] Add cancel and confirm buttons

- [ ] **Task 9: Processing Flow** (AC: 9)
  - [ ] Implement loading state
  - [ ] Display success message
  - [ ] Display withdrawal ID
  - [ ] Display processing time

- [ ] **Task 10: Withdrawal History** (AC: 10)
  - [ ] Create `components/WithdrawalHistory.tsx`
  - [ ] Display withdrawal list
  - [ ] Add status badges
  - [ ] Add link to details

- [ ] **Task 11: Status Updates** (AC: 11)
  - [ ] Integrate with notification system
  - [ ] Send email notifications
  - [ ] Send in-app notifications

- [ ] **Task 12: API Integration** (AC: 1-12)
  - [ ] Integrate with `POST /api/wallet/withdraw`
  - [ ] Integrate with `GET /api/wallet/withdraw/history`
  - [ ] Integrate with `GET /api/wallet/withdraw/:withdrawalId`
  - [ ] Handle validation errors

- [ ] **Task 13: Testing** (All ACs)
  - [ ] Unit tests for components
  - [ ] Integration tests for API calls
  - [ ] E2E test for withdrawal flow

---

## Dev Notes

### Relevant Source Tree:
```
app/wallet/
  └── withdraw/
      └── page.tsx                       # Withdraw page (NEW)

components/
  ├── WithdrawalMethodSelector.tsx        # Method selector (NEW)
  ├── WithdrawalSummary.tsx              # Summary (NEW)
  └── WithdrawalHistory.tsx               # History (NEW)
```

### Technical Details:

**API Integration:**
- Create Withdrawal: `POST /api/wallet/withdraw`
- Get History: `GET /api/wallet/withdraw/history`
- Get Details: `GET /api/wallet/withdraw/:withdrawalId`
- Request body: See API_SPECIFICATIONS.md

**IBAN Validation:**
- Use library like `iban` or `iban.js`
- Validate format and checksum

**Crypto Address Validation:**
- Validate Algorand address format
- Use Algorand SDK for validation

**Fees:**
- Display fees if applicable
- Calculate net amount (amount - fees)
- Show fee breakdown

### Testing Standards:

**Test File Location:**
- Unit tests: `components/__tests__/WithdrawalMethodSelector.test.tsx`
- Integration tests: `app/wallet/withdraw/__tests__/page.test.tsx`

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

