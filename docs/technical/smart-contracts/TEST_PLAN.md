# 🧪 Smart Contract Test Plan
## Play and Pay — Sprint 1 Task 1.4

**Date:** 2025-11-16  
**Status:** 🟡 Ready (after deployment)

---

## 📋 Test Cases

### Test 1: Billing Transaction
**Objective:** Verify billing transaction works correctly

**Steps:**
1. User has PLY tokens
2. User is opted in to contract
3. Send billing transaction (1 minute, 2 PLY minor)
4. Verify transaction succeeds
5. Check balances:
   - User balance decreased
   - Provider received payment
   - Platform received fee

**Expected Result:**
- ✅ Transaction confirmed
- ✅ User balance: -2 PLY minor
- ✅ Provider balance: +1.9 PLY minor (95%)
- ✅ Platform balance: +0.1 PLY minor (5%)

---

### Test 2: Fee Distribution
**Objective:** Verify fee distribution is accurate

**Steps:**
1. Send billing transaction with known amount
2. Calculate expected fees:
   - Gross: 2 PLY minor
   - Fee (5%): 0.1 PLY minor
   - Provider (95%): 1.9 PLY minor
3. Verify actual balances match expected

**Expected Result:**
- ✅ Fee calculation correct
- ✅ Provider receives correct amount
- ✅ Platform receives correct fee

---

### Test 3: Idempotency
**Objective:** Verify idempotency prevents double-charges

**Steps:**
1. Send billing transaction with tick_id = "test-001"
2. Send same transaction again with same tick_id
3. Verify second transaction is rejected

**Expected Result:**
- ✅ First transaction succeeds
- ✅ Second transaction rejected (idempotency check)
- ✅ User only charged once

---

### Test 4: Rate Validation
**Objective:** Verify rate validation works

**Test 4a: Minimum Rate**
- Send transaction with rate < MIN_RATE
- Verify transaction rejected

**Test 4b: Maximum Rate**
- Send transaction with rate > MAX_RATE
- Verify transaction rejected

**Test 4c: Valid Rate**
- Send transaction with rate within range
- Verify transaction succeeds

**Expected Result:**
- ✅ Min rate validation works
- ✅ Max rate validation works
- ✅ Valid rates accepted

---

### Test 5: Multiple Ticks
**Objective:** Verify multiple billing ticks work

**Steps:**
1. Send tick 1 (1 minute)
2. Send tick 2 (1 minute)
3. Send tick 3 (1 minute)
4. Verify all ticks processed
5. Check total charges

**Expected Result:**
- ✅ All ticks processed
- ✅ Total charge = 3 × 2 = 6 PLY minor
- ✅ All transactions confirmed

---

## 🧪 Test Execution

### Prerequisites

1. **Accounts Funded:**
   ```bash
   node check-balances.js
   ```

2. **ASA Created:**
   ```bash
   node ../testnet-tools/asa-create.js
   ```

3. **Contract Deployed:**
   ```bash
   node complete-deployment.js
   ```

4. **Accounts Opted In:**
   - User opted in to ASA
   - User opted in to contract

### Run Tests

```bash
# Run all tests
node test-contract.js

# Or run individual test cases
# (modify test-contract.js to run specific tests)
```

---

## 📊 Test Results Template

```
Test Results - [Date]

Test 1: Billing Transaction
  Status: ✅ PASS / ❌ FAIL
  Transaction ID: [txId]
  Notes: [any issues]

Test 2: Fee Distribution
  Status: ✅ PASS / ❌ FAIL
  Expected: Provider 1.9, Platform 0.1
  Actual: Provider [X], Platform [Y]
  Notes: [any issues]

Test 3: Idempotency
  Status: ✅ PASS / ❌ FAIL
  First Transaction: [txId]
  Second Transaction: [rejected/reason]
  Notes: [any issues]

Test 4: Rate Validation
  Status: ✅ PASS / ❌ FAIL
  Min Rate Test: ✅ / ❌
  Max Rate Test: ✅ / ❌
  Valid Rate Test: ✅ / ❌
  Notes: [any issues]

Test 5: Multiple Ticks
  Status: ✅ PASS / ❌ FAIL
  Ticks Processed: [count]
  Total Charge: [amount]
  Notes: [any issues]

Overall: ✅ PASS / ❌ FAIL
```

---

## 🐛 Troubleshooting

### Issue: "User not opted in"
**Solution:**
```bash
# Opt in user to contract
goal app optin --app-id $APP_ID --from $USER_ADDR --net testnet
```

### Issue: "Insufficient balance"
**Solution:**
- Fund user account with PLY tokens
- Check balance: `node check-balances.js`

### Issue: "Transaction rejected"
**Solution:**
- Check transaction on Explorer
- Verify contract parameters
- Check rate validation

---

## 📚 Related Documentation

- **Contract README:** [`README.md`](./README.md)
- **Deployment Guide:** [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md)
- **Test Script:** [`test-contract.js`](./test-contract.js)

---

**Last Updated:** 2025-11-16  
**Status:** 🟡 Ready (after deployment)

