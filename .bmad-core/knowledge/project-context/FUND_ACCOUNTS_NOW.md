# 💰 Fund TestNet Accounts — Next Step
## Play and Pay — Sprint 1

**Date:** 2025-11-16  
**Status:** 🟡 Ready to Fund

---

## 📋 Accounts Created

✅ **4 TestNet accounts have been created!**

### Account Details:

1. **Creator Account** (for deploying contracts)
   - Address: `N644J6E3WXJOF47TDR5UGX57KKOGTP4K3ZEX6I4LLVMYCXJWPRBKEDLFKQ`
   - Needs: ~0.1 ALGO for deployment fees

2. **Provider Account** (receives payments)
   - Address: `KUVDAR32J7YZJCFMEDUCYSH2KC423IME3VRYOK7DT62YMW3R7CZZHHANVE`
   - Needs: ~0.01 ALGO for transaction fees

3. **Platform Account** (receives fees)
   - Address: `JT76AN7TNX3UFAGURWNK5RINRLWNURQMRDV5UY2WZVONNFCDXTS2OZ56UA`
   - Needs: ~0.01 ALGO for transaction fees

4. **User Account** (for testing)
   - Address: `NMY7IKV4VGUNE2P3SJAPIESGR4TRBFF2TFPVVM2LK45DUC6EPJHKOSEL5Y`
   - Needs: ~0.1 ALGO for testing

---

## 🚀 How to Fund Accounts

### Step 1: Go to TestNet Faucet

**URL:** https://bank.testnet.algorand.network

### Step 2: Request ALGO for Each Account

1. **Creator Account:**
   - Paste: `N644J6E3WXJOF47TDR5UGX57KKOGTP4K3ZEX6I4LLVMYCXJWPRBKEDLFKQ`
   - Click "Dispense"
   - Wait for confirmation

2. **Provider Account:**
   - Paste: `KUVDAR32J7YZJCFMEDUCYSH2KC423IME3VRYOK7DT62YMW3R7CZZHHANVE`
   - Click "Dispense"
   - Wait for confirmation

3. **Platform Account:**
   - Paste: `JT76AN7TNX3UFAGURWNK5RINRLWNURQMRDV5UY2WZVONNFCDXTS2OZ56UA`
   - Click "Dispense"
   - Wait for confirmation

4. **User Account:**
   - Paste: `NMY7IKV4VGUNE2P3SJAPIESGR4TRBFF2TFPVVM2LK45DUC6EPJHKOSEL5Y`
   - Click "Dispense"
   - Wait for confirmation

---

## ✅ Verify Balances

After funding, verify balances:

```bash
cd C:\Amir\pay-as-play-project\.bmad-core\knowledge\technical\smart-contracts
node check-balances.js
```

**Expected Output:**
- Each account should show balance > 0 ALGO
- Total balance should be > 0.2 ALGO

---

## 🔄 Next Steps After Funding

1. ✅ Verify balances: `node check-balances.js`
2. Create ASA (PlayCoin): `node ../testnet-tools/asa-create.js`
3. Update .env with ASA_ID
4. Deploy Smart Contract: `./deploy-contract.sh`
5. Update .env with APP_ID

---

## 📝 Quick Copy-Paste Addresses

**For Faucet (one at a time):**

```
N644J6E3WXJOF47TDR5UGX57KKOGTP4K3ZEX6I4LLVMYCXJWPRBKEDLFKQ
```

```
KUVDAR32J7YZJCFMEDUCYSH2KC423IME3VRYOK7DT62YMW3R7CZZHHANVE
```

```
JT76AN7TNX3UFAGURWNK5RINRLWNURQMRDV5UY2WZVONNFCDXTS2OZ56UA
```

```
NMY7IKV4VGUNE2P3SJAPIESGR4TRBFF2TFPVVM2LK45DUC6EPJHKOSEL5Y
```

---

## 🔗 Links

- **TestNet Faucet:** https://bank.testnet.algorand.network
- **TestNet Explorer:** https://testnet.explorer.algorand.org
- **Setup Guide:** [`SETUP_TESTNET.md`](../technical/smart-contracts/SETUP_TESTNET.md)

---

**Ready to Fund!** 💰

