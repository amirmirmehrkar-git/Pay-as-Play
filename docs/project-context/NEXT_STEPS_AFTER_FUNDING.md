# 📋 Next Steps After Funding
## Play and Pay — Sprint 1 Task 1.3

**Date:** 2025-11-16  
**Status:** 🟡 Ready (after funding accounts)

---

## ✅ Completed So Far

- [x] Task 1.1: Smart Contract code complete
- [x] Task 1.2: Contract compiled (TEAL files created)
- [x] TestNet accounts created (4 accounts)
- [x] .env file configured
- [x] Setup scripts created

---

## 🔄 Current Status

**Accounts Status:** ⏳ Need funding from Faucet

**Faucet URL:** https://bank.testnet.algorand.network

**Accounts to Fund:**
1. Creator: `N644J6E3WXJOF47TDR5UGX57KKOGTP4K3ZEX6I4LLVMYCXJWPRBKEDLFKQ`
2. Provider: `KUVDAR32J7YZJCFMEDUCYSH2KC423IME3VRYOK7DT62YMW3R7CZZHHANVE`
3. Platform: `JT76AN7TNX3UFAGURWNK5RINRLWNURQMRDV5UY2WZVONNFCDXTS2OZ56UA`
4. User: `NMY7IKV4VGUNE2P3SJAPIESGR4TRBFF2TFPVVM2LK45DUC6EPJHKOSEL5Y`

---

## 📝 Step-by-Step Workflow

### Step 1: Fund Accounts

**Manual Funding (Recommended):**
1. Go to: https://bank.testnet.algorand.network
2. Paste each address one by one
3. Click "Dispense"
4. Wait for confirmation

**Or Auto-Fund (if available):**
```bash
node fund-from-faucet.js
```

**Verify:**
```bash
node check-balances.js
```

**Expected:** Each account should have > 0 ALGO

---

### Step 2: Create ASA (PlayCoin)

**Command:**
```bash
cd C:\Amir\pay-as-play-project\.bmad-core\knowledge\technical\testnet-tools
node asa-create.js
```

**Output:**
- Asset ID (e.g., `1234567`)
- Transaction ID

**Update .env:**
```env
ASA_ID=1234567
```

---

### Step 3: Opt-in Accounts to ASA

**For each account:**

```bash
# Creator
export USER_MNEMONIC="$CREATOR_MNEMONIC"
export ASA_ID=1234567
node opt-in.js

# Provider
export USER_MNEMONIC="$PROVIDER_MNEMONIC"
export ASA_ID=1234567
node opt-in.js

# Platform
export USER_MNEMONIC="$PLATFORM_MNEMONIC"
export ASA_ID=1234567
node opt-in.js

# User
export USER_MNEMONIC="$USER_MNEMONIC"
export ASA_ID=1234567
node opt-in.js
```

---

### Step 4: Deploy Smart Contract

**Option A: Using Node.js (Recommended if goal CLI not available)**

```bash
cd C:\Amir\pay-as-play-project\.bmad-core\knowledge\technical\smart-contracts
node deploy-contract-node.js
```

**Option B: Using deployment script (if goal CLI available)**

```bash
./deploy-contract.sh
```

**Output:**
- App ID (e.g., `789`)
- Transaction ID

**Update .env:**
```env
APP_ID=789
```

---

### Step 5: Opt-in User to Smart Contract

**For testing:**

```bash
# Using Node.js script (create if needed)
# Or using goal CLI:
goal app optin --app-id $APP_ID --from $USER_ADDR --net testnet
```

---

### Step 6: Test Contract

```bash
node test-contract.js
```

---

### Step 7: Update Execution Log

Update `SPRINT1_EXECUTION_LOG.md` with:
- App ID
- Deployment transaction ID
- Test results

---

## 📊 Progress Tracking

**After each step, update:**

- [ ] Accounts funded
- [ ] ASA created (ASA_ID recorded)
- [ ] Accounts opted in to ASA
- [ ] Contract deployed (APP_ID recorded)
- [ ] User opted in to contract
- [ ] Contract tested

---

## 🔗 Quick Links

- **Faucet:** https://bank.testnet.algorand.network
- **TestNet Explorer:** https://testnet.explorer.algorand.org
- **Deployment Guide:** [`DEPLOYMENT_GUIDE.md`](../technical/smart-contracts/DEPLOYMENT_GUIDE.md)
- **Setup Guide:** [`SETUP_TESTNET.md`](../technical/smart-contracts/SETUP_TESTNET.md)

---

## 🎯 Success Criteria

Task 1.3 is complete when:

- [x] Accounts funded
- [ ] ASA created
- [ ] Contract deployed
- [ ] App ID recorded
- [ ] Contract verified on Explorer

---

**Last Updated:** 2025-11-16  
**Status:** 🟡 Ready (after funding)

