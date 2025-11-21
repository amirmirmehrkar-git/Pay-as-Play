# Integration Tests Execution Guide

**Date:** 2025-01-XX  
**Status:** Ready for Execution

---

## 📋 Prerequisites

### Required:
- Database connected (Story 9.1 ✅)
- Dev server can run
- Playwright installed
- All dependencies installed

---

## 🚀 Execution Steps

### Step 1: Start Dev Server

```bash
npm run dev
```

Keep this running in one terminal.

---

### Step 2: Run Integration Tests

In another terminal:

```bash
# Run all tests
npm run test:e2e

# Run with UI (recommended for first time)
npm run test:e2e:ui

# Run specific test file
npm run test:e2e tests/integration/wallet.spec.ts

# Debug mode
npm run test:e2e:debug
```

---

### Step 3: Review Results

- Check test results
- Fix any failing tests
- Update test mocks if needed
- Verify all flows work

---

## 🧪 Test Suites

### 1. Onboarding Flow Tests
- File: `tests/integration/onboarding.spec.ts`
- Tests: Splash screen, slides, sign-in, guest access

### 2. Integration Wizard Tests
- File: `tests/integration/integration-wizard.spec.ts`
- Tests: Wizard flow, platform creation, API key

### 3. Wallet Management Tests
- File: `tests/integration/wallet.spec.ts`
- Tests: Balance display, warnings, navigation

### 4. Notification Flow Tests
- File: `tests/integration/notifications.spec.ts`
- Tests: Notification center, display, actions

### 5. Settlement Flow Tests
- File: `tests/integration/settlement.spec.ts`
- Tests: Settlement overview, history, filters

### 6. LMS Integration Tests
- File: `tests/integration/lms.spec.ts`
- Tests: LMS connection, sync, testing

---

## 🐛 Troubleshooting

### Tests Timeout:
- Check if dev server is running
- Increase timeout in `playwright.config.ts`
- Check network connectivity

### Tests Fail:
- Check if database is connected
- Verify mock APIs are working
- Check browser console for errors

### Element Not Found:
- Update test selectors
- Add `data-testid` attributes
- Use more specific selectors

---

## ✅ Test Execution Checklist

- [ ] Dev server running
- [ ] Database connected
- [ ] All tests run
- [ ] Failing tests fixed
- [ ] All tests pass
- [ ] Test results documented

---

**Integration Tests Execution Guide** ✅

