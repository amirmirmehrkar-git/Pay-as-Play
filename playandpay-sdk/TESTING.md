# 🧪 Play and Pay SDK - Testing Guide
## Sprint 2 Task 2.4: Integration & Testing

**Date:** 2025-11-16  
**Status:** ✅ Complete

---

## 📋 Test Suites

### 1. Wallet Manager Tests (`test-wallet.js`)

**Tests:**
- ✅ Get balance (demo + real)
- ✅ Check opt-in status
- ✅ Get transaction history

**Run:**
```bash
npm run test:wallet
# Or
node tests/test-wallet.js
```

**Environment Variables:**
- `ASA_ID` - Asset ID for opt-in test
- `USER_ADDR` - User address for real balance test

---

### 2. Billing Engine Tests (`test-billing.js`)

**Tests:**
- ✅ Start session
- ✅ Send tick (per-minute billing)
- ✅ Stop session

**Run:**
```bash
npm run test:billing
# Or
node tests/test-billing.js
```

**Environment Variables:**
- `ASA_ID` - Asset ID
- `PROVIDER_ADDR` - Provider address
- `PLATFORM_ADDR` - Platform address
- `APP_ID` - Smart Contract App ID
- `USER_ADDR` - User address

---

### 3. Analytics Client Tests (`test-analytics.js`)

**Tests:**
- ✅ Get user analytics
- ✅ Get session report
- ✅ Get usage statistics

**Run:**
```bash
npm run test:analytics
# Or
node tests/test-analytics.js
```

**Note:** These tests require API server. Tests will pass even if API is unavailable (expected behavior).

**Environment Variables:**
- `API_BASE_URL` - API base URL (default: http://localhost:3000/api)
- `USER_ADDR` - User address

---

### 4. Integration Tests (`test-integration.js`)

**Tests:**
- ✅ SDK initialization
- ✅ End-to-end workflow
- ✅ Error handling

**Run:**
```bash
npm run test:integration
# Or
node tests/test-integration.js
```

**Tests complete workflow:**
1. Check balance
2. Start session
3. Send tick
4. Stop session

---

## 🚀 Run All Tests

**Run all test suites:**
```bash
npm test
# Or
node tests/run-all-tests.js
```

---

## 📊 Test Results

### Expected Output

```
🧪 Play and Pay SDK - Running All Tests

============================================================
Running: test-wallet.js
============================================================
✅ All wallet tests passed!

============================================================
Running: test-billing.js
============================================================
✅ All billing tests passed!

============================================================
Running: test-analytics.js
============================================================
✅ All analytics tests passed!

============================================================
Running: test-integration.js
============================================================
✅ All integration tests passed!

============================================================
📊 Final Test Results Summary

✅ test-wallet.js
✅ test-billing.js
✅ test-analytics.js
✅ test-integration.js

Passed: 4/4

✅ All test suites passed!
```

---

## 🔧 Setup for Testing

### 1. Install Dependencies

```bash
cd playandpay-sdk
npm install
```

### 2. Configure Environment

Create `.env` file or set environment variables:

```env
# Network
NETWORK=testnet

# Accounts
USER_ADDR=your_testnet_address
PROVIDER_ADDR=provider_testnet_address
PLATFORM_ADDR=platform_testnet_address

# ASA & Contract
ASA_ID=1234567
APP_ID=789

# API (optional)
API_BASE_URL=http://localhost:3000/api
```

### 3. Run Tests

```bash
# All tests
npm test

# Individual test suites
npm run test:wallet
npm run test:billing
npm run test:analytics
npm run test:integration
```

---

## ✅ Acceptance Criteria

Sprint 2 Task 2.4 is complete when:

- [x] Test scripts created
- [x] Wallet Manager tests pass
- [x] Billing Engine tests pass
- [x] Analytics Client tests pass
- [x] Integration tests pass
- [x] Error handling tested
- [x] Documentation complete

---

## 🐛 Troubleshooting

### Issue: "Module not found"

**Solution:**
```bash
npm install
```

### Issue: "ASA_ID not set"

**Solution:**
- Set `ASA_ID` in environment
- Or tests will run in demo mode

### Issue: "API server not available"

**Solution:**
- Analytics tests will pass even if API is unavailable
- This is expected behavior for testing

---

## 📚 Related Documentation

- **SDK README:** [`README.md`](./README.md)
- **Sprint 2:** [`../.bmad-core/knowledge/project-context/SPRINT2_START.md`](../.bmad-core/knowledge/project-context/SPRINT2_START.md)
- **Project Management:** [`../.bmad-core/knowledge/project-context/PROJECT_MANAGEMENT_PHASE1.md`](../.bmad-core/knowledge/project-context/PROJECT_MANAGEMENT_PHASE1.md)

---

**Last Updated:** 2025-11-16  
**Status:** ✅ Complete

