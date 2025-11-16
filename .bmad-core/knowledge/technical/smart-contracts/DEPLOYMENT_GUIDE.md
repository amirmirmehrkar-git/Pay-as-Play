# 🚀 Deployment Guide — Complete Workflow
## Play and Pay — Sprint 1 Task 1.3

**Date:** 2025-11-16  
**Status:** 🟡 Ready (after funding)

---

## 📋 Complete Workflow

### Step 1: Fund Accounts (Manual)

**Go to:** https://bank.testnet.algorand.network

**Fund these accounts:**
1. Creator: `N644J6E3WXJOF47TDR5UGX57KKOGTP4K3ZEX6I4LLVMYCXJWPRBKEDLFKQ`
2. Provider: `KUVDAR32J7YZJCFMEDUCYSH2KC423IME3VRYOK7DT62YMW3R7CZZHHANVE`
3. Platform: `JT76AN7TNX3UFAGURWNK5RINRLWNURQMRDV5UY2WZVONNFCDXTS2OZ56UA`
4. User: `NMY7IKV4VGUNE2P3SJAPIESGR4TRBFF2TFPVVM2LK45DUC6EPJHKOSEL5Y`

**Verify:**
```bash
node check-balances.js
```

---

### Step 2: Create ASA (PlayCoin)

**Command:**
```bash
cd ../testnet-tools
node asa-create.js
```

**Or from smart-contracts directory:**
```bash
node ../testnet-tools/asa-create.js
```

**Expected Output:**
- Asset ID (e.g., `1234567`)
- Transaction ID

**Update .env:**
```env
ASA_ID=1234567
```

---

### Step 3: Opt-in Accounts to ASA

**For each account (Creator, Provider, Platform, User):**

```bash
cd ../testnet-tools
export USER_MNEMONIC="account_mnemonic_here"
export ASA_ID=1234567
node opt-in.js
```

**Or use the accounts from .env:**
```bash
# Creator opt-in
export USER_MNEMONIC="$CREATOR_MNEMONIC"
export ASA_ID=1234567
node opt-in.js

# Provider opt-in
export USER_MNEMONIC="$PROVIDER_MNEMONIC"
export ASA_ID=1234567
node opt-in.js

# Platform opt-in
export USER_MNEMONIC="$PLATFORM_MNEMONIC"
export ASA_ID=1234567
node opt-in.js

# User opt-in
export USER_MNEMONIC="$USER_MNEMONIC"
export ASA_ID=1234567
node opt-in.js
```

---

### Step 4: Deploy Smart Contract

**Option A: Using deployment script (recommended)**

```bash
cd ../smart-contracts
./deploy-contract.sh
```

**Option B: Manual deployment with goal CLI**

```bash
goal app create \
  --creator $CREATOR_ADDR \
  --approval-prog usage_contract_approval.teal \
  --clear-prog usage_contract_clear.teal \
  --global-byteslices 0 \
  --global-ints 5 \
  --local-byteslices 1 \
  --local-ints 0 \
  --app-arg addr:$PROVIDER_ADDR \
  --app-arg addr:$PLATFORM_ADDR \
  --app-arg int:500 \
  --app-arg int:1 \
  --app-arg int:1000 \
  --net testnet
```

**Option C: Using Node.js script (if goal not available)**

Create `deploy-contract-node.js` (see below)

**Expected Output:**
- App ID (e.g., `789`)

**Update .env:**
```env
APP_ID=789
```

---

### Step 5: Opt-in Users to Smart Contract

**For testing, opt-in User account:**

```bash
# Using goal CLI
goal app optin \
  --app-id $APP_ID \
  --from $USER_ADDR \
  --net testnet

# Or using Node.js (create script)
```

---

### Step 6: Verify Deployment

**Check contract on TestNet Explorer:**
- URL: https://testnet.explorer.algorand.org/app/$APP_ID

**Verify contract state:**
- Provider address set correctly
- Platform address set correctly
- Fee percentage: 5% (500 basis points)
- Min rate: 1 PLY minor
- Max rate: 1000 PLY minor

---

## 📝 Quick Reference

### Environment Variables (.env)

```env
# Accounts
CREATOR_ADDR=N644J6E3WXJOF47TDR5UGX57KKOGTP4K3ZEX6I4LLVMYCXJWPRBKEDLFKQ
CREATOR_MNEMONIC=team moon minute gesture...
PROVIDER_ADDR=KUVDAR32J7YZJCFMEDUCYSH2KC423IME3VRYOK7DT62YMW3R7CZZHHANVE
PLATFORM_ADDR=JT76AN7TNX3UFAGURWNK5RINRLWNURQMRDV5UY2WZVONNFCDXTS2OZ56UA
USER_ADDR=NMY7IKV4VGUNE2P3SJAPIESGR4TRBFF2TFPVVM2LK45DUC6EPJHKOSEL5Y

# ASA
ASA_ID=1234567

# Smart Contract
APP_ID=789

# Configuration
PLATFORM_FEE_BPS=500
MIN_RATE=1
MAX_RATE=1000
```

---

## 🔄 After Deployment

### Test Contract

```bash
node test-contract.js
```

### Update Execution Log

Update `SPRINT1_EXECUTION_LOG.md` with:
- App ID
- Deployment transaction ID
- Test results

---

## 🐛 Troubleshooting

### Issue: "Insufficient balance"

**Solution:**
- Fund accounts from Faucet
- Check balance: `node check-balances.js`

### Issue: "Account not opted in to ASA"

**Solution:**
- Run opt-in script for each account
- Verify: Check account assets

### Issue: "Contract deployment failed"

**Solution:**
- Check Creator account has enough ALGO (~0.1 ALGO)
- Verify TEAL files exist
- Check network connection

---

## 📚 Related Files

- **Setup Guide:** [`SETUP_TESTNET.md`](./SETUP_TESTNET.md)
- **Smart Contract README:** [`README.md`](./README.md)
- **Test Script:** [`test-contract.js`](./test-contract.js)
- **ASA Creation:** [`../testnet-tools/asa-create.js`](../testnet-tools/asa-create.js)

---

**Last Updated:** 2025-11-16  
**Status:** 🟡 Ready (after funding)

