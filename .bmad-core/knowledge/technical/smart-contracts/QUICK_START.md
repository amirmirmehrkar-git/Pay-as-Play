# ⚡ Quick Start — Complete Deployment
## Play and Pay — Sprint 1

**After funding accounts, run one command to deploy everything!**

---

## 🚀 One-Command Deployment

### Step 1: Fund Accounts

Go to: **https://bank.testnet.algorand.network**

Fund these 4 accounts:
1. `N644J6E3WXJOF47TDR5UGX57KKOGTP4K3ZEX6I4LLVMYCXJWPRBKEDLFKQ`
2. `KUVDAR32J7YZJCFMEDUCYSH2KC423IME3VRYOK7DT62YMW3R7CZZHHANVE`
3. `JT76AN7TNX3UFAGURWNK5RINRLWNURQMRDV5UY2WZVONNFCDXTS2OZ56UA`
4. `NMY7IKV4VGUNE2P3SJAPIESGR4TRBFF2TFPVVM2LK45DUC6EPJHKOSEL5Y`

---

### Step 2: Run Complete Deployment

```bash
cd C:\Amir\pay-as-play-project\.bmad-core\knowledge\technical\smart-contracts
node complete-deployment.js
```

**This script will automatically:**
1. ✅ Check account balances
2. ✅ Create ASA (PlayCoin)
3. ✅ Opt-in all accounts to ASA
4. ✅ Deploy Smart Contract
5. ✅ Opt-in user to contract
6. ✅ Update .env file with ASA_ID and APP_ID

---

## 📋 What You'll Get

After running the script:

- **ASA ID:** Asset ID for PlayCoin (e.g., `1234567`)
- **App ID:** Smart Contract App ID (e.g., `789`)
- **.env updated:** With ASA_ID and APP_ID
- **All accounts opted in:** Ready for testing

---

## ✅ Verify Deployment

**Check on TestNet Explorer:**
- ASA: `https://testnet.explorer.algorand.org/asset/ASA_ID`
- Contract: `https://testnet.explorer.algorand.org/app/APP_ID`

**Test Contract:**
```bash
node test-contract.js
```

---

## 🐛 Troubleshooting

### "Accounts not funded"
- Fund accounts from Faucet first
- Wait a few seconds for confirmation
- Run script again

### "TEAL files not found"
- Run: `python usage-contract.py` first
- Then run: `node complete-deployment.js`

### "Insufficient balance"
- Fund Creator account with at least 0.1 ALGO
- Fund other accounts with at least 0.01 ALGO each

---

## 📚 Full Documentation

- **Deployment Guide:** [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md)
- **Setup Guide:** [`SETUP_TESTNET.md`](./SETUP_TESTNET.md)
- **Execution Log:** [`../../project-context/SPRINT1_EXECUTION_LOG.md`](../../project-context/SPRINT1_EXECUTION_LOG.md)

---

**Ready to Deploy!** 🚀

