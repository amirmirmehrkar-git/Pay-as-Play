# 🤖 Auto Deploy — Wait and Deploy
## Play and Pay — Sprint 1

**After funding, this script will automatically deploy everything!**

---

## 🚀 Quick Start

### Option 1: Auto-Monitor and Deploy (Recommended)

**Run this command and leave it running:**

```bash
cd C:\Amir\pay-as-play-project\.bmad-core\knowledge\technical\smart-contracts
node wait-and-deploy.js
```

**What it does:**
- ⏳ Checks account balances every 10 seconds
- ✅ When all accounts are funded, automatically runs deployment
- 🚀 Creates ASA, opts-in accounts, deploys contract
- ✅ Exits after successful deployment

**While it's running:**
1. Go to: https://bank.testnet.algorand.network
2. Fund the 4 accounts
3. Script will automatically detect and deploy!

---

### Option 2: Manual Deploy (After Funding)

**After funding accounts manually:**

```bash
cd C:\Amir\pay-as-play-project\.bmad-core\knowledge\technical\smart-contracts
node complete-deployment.js
```

---

## 📋 Accounts to Fund

**Faucet:** https://bank.testnet.algorand.network

1. **Creator:** `N644J6E3WXJOF47TDR5UGX57KKOGTP4K3ZEX6I4LLVMYCXJWPRBKEDLFKQ`
2. **Provider:** `KUVDAR32J7YZJCFMEDUCYSH2KC423IME3VRYOK7DT62YMW3R7CZZHHANVE`
3. **Platform:** `JT76AN7TNX3UFAGURWNK5RINRLWNURQMRDV5UY2WZVONNFCDXTS2OZ56UA`
4. **User:** `NMY7IKV4VGUNE2P3SJAPIESGR4TRBFF2TFPVVM2LK45DUC6EPJHKOSEL5Y`

---

## ✅ What Happens After Deployment

1. **ASA Created** → Asset ID recorded in .env
2. **Accounts Opted In** → All 4 accounts opted in to ASA
3. **Contract Deployed** → App ID recorded in .env
4. **User Opted In** → User account opted in to contract
5. **Ready for Testing** → Can run test-contract.js

---

## 🔄 Workflow

```
Funding Accounts
      ↓
wait-and-deploy.js (monitoring)
      ↓
All accounts funded detected
      ↓
complete-deployment.js (runs automatically)
      ↓
ASA Created
      ↓
Accounts Opted In
      ↓
Contract Deployed
      ↓
User Opted In
      ↓
✅ Ready for Testing
```

---

## 📊 Status Display

While monitoring, you'll see:

```
[Check 1] Creator: 0.0000 ALGO  Provider: 0.0000 ALGO  Platform: 0.0000 ALGO  User: 0.0000 ALGO  Total: 0.0000 ALGO
[Check 2] Creator: 0.0000 ALGO  Provider: 0.0000 ALGO  Platform: 0.0000 ALGO  User: 0.0000 ALGO  Total: 0.0000 ALGO
...
[Check 5] Creator: 0.1000 ALGO  Provider: 0.1000 ALGO  Platform: 0.1000 ALGO  User: 0.1000 ALGO  Total: 0.4000 ALGO

✅ All accounts funded!
   Total Balance: 0.4000 ALGO

⏳ Waiting 2 seconds for transactions to confirm...

🚀 Starting deployment...
```

---

## 🎯 Success Criteria

Deployment is successful when:

- [x] All accounts funded (total > 0.2 ALGO)
- [ ] ASA created (ASA_ID in .env)
- [ ] All accounts opted in to ASA
- [ ] Contract deployed (APP_ID in .env)
- [ ] User opted in to contract

---

## 🐛 Troubleshooting

### Script keeps waiting

**Check:**
- Are accounts actually funded?
- Run: `node check-balances.js`
- Verify on Explorer: https://testnet.explorer.algorand.org

### Deployment fails

**Check:**
- Creator account has enough ALGO (> 0.1 ALGO)
- TEAL files exist (run: `python usage-contract.py`)
- Network connection is stable

### Cancel monitoring

**Press:** `Ctrl+C`

Then run manually: `node complete-deployment.js`

---

## 📚 Related Files

- **Complete Deployment:** [`complete-deployment.js`](./complete-deployment.js)
- **Quick Start:** [`QUICK_START.md`](./QUICK_START.md)
- **Deployment Guide:** [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md)

---

**Ready to Auto-Deploy!** 🤖

