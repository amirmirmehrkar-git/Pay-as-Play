# 🚀 TestNet Account Setup Guide
## Play and Pay — Smart Contract Deployment

**Date:** 2025-11-16  
**Network:** Algorand TestNet

---

## 📋 Quick Start

### Step 1: Generate TestNet Accounts

```bash
cd technical/smart-contracts
npm install algosdk dotenv
node setup-testnet-account.js
```

This will:
- ✅ Generate 4 TestNet accounts (Creator, Provider, Platform, User)
- ✅ Create `.env` file with all account details
- ✅ Save account details to `testnet-accounts.json`

---

### Step 2: Fund Accounts from Faucet

1. **Go to Algorand TestNet Faucet:**
   - URL: https://bank.testnet.algorand.network

2. **Request ALGO for each account:**
   - Creator Account (for deploying contracts)
   - Provider Account (receives payments)
   - Platform Account (receives fees)
   - User Account (for testing)

3. **Wait for confirmation** (usually instant)

---

### Step 3: Verify Balances

```bash
node check-balances.js
```

This will show:
- Balance for each account
- Assets (if any)
- Total balance across all accounts

---

## 📝 Account Details

After running `setup-testnet-account.js`, you'll have:

### 1. Creator Account
- **Purpose:** Deploy Smart Contracts
- **Needs:** ~0.1 ALGO for deployment fees
- **Usage:** Contract creation and updates

### 2. Provider Account
- **Purpose:** Receive payments from users
- **Needs:** ~0.01 ALGO for transaction fees
- **Usage:** Receives net payment after platform fee

### 3. Platform Account
- **Purpose:** Receive platform fees
- **Needs:** ~0.01 ALGO for transaction fees
- **Usage:** Receives fee portion of each payment

### 4. User Account
- **Purpose:** Test user transactions
- **Needs:** ~0.1 ALGO for testing
- **Usage:** Simulates end-user payments

---

## 🔒 Security Notes

### ⚠️ Important Warnings

1. **TestNet Only:**
   - These accounts are for TESTNET ONLY
   - NEVER use these mnemonics on MainNet

2. **Keep Secure:**
   - Keep `.env` file secure
   - Never commit `.env` to git
   - Add `.env` to `.gitignore`

3. **Account Details:**
   - `testnet-accounts.json` contains sensitive data
   - Keep it secure
   - Don't share publicly

---

## 📁 Files Created

After setup, you'll have:

- `.env` - Environment variables (account details)
- `testnet-accounts.json` - Account details backup
- `.gitignore` - Git ignore rules

---

## 🔄 Next Steps

After accounts are funded:

1. **Create ASA (PlayCoin):**
   ```bash
   node ../testnet-tools/asa-create.js
   ```

2. **Update .env with ASA_ID:**
   ```env
   ASA_ID=1234567
   ```

3. **Deploy Smart Contract:**
   ```bash
   ./deploy-contract.sh
   # Or manually with goal CLI
   ```

4. **Update .env with APP_ID:**
   ```env
   APP_ID=789
   ```

---

## 🐛 Troubleshooting

### Issue: "Account not found"

**Solution:**
- Account needs to be funded from Faucet first
- Even 0.001 ALGO is enough to create the account

### Issue: "Insufficient balance"

**Solution:**
- Request more ALGO from Faucet
- Minimum needed: ~0.1 ALGO per account

### Issue: ".env file not found"

**Solution:**
- Run `setup-testnet-account.js` first
- Or copy `.env.example` to `.env` and fill manually

---

## 📚 Related Documentation

- **Smart Contract README:** [`README.md`](./README.md)
- **Deployment Guide:** [`deploy-contract.sh`](./deploy-contract.sh)
- **Test Script:** [`test-contract.js`](./test-contract.js)
- **ASA Creation:** [`../testnet-tools/asa-create.js`](../testnet-tools/asa-create.js)

---

## 🔗 Useful Links

- **TestNet Faucet:** https://bank.testnet.algorand.network
- **TestNet Explorer:** https://testnet.explorer.algorand.org
- **Algorand Docs:** https://developer.algorand.org/docs/

---

**Last Updated:** 2025-11-16  
**Status:** ✅ Ready to Use

