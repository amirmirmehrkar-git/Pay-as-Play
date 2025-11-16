# 💰 Fund Accounts & Deploy — Quick Guide
## Play and Pay — Sprint 1

**Status:** ⏳ Waiting for Funding

---

## 🚀 Quick Steps

### Step 1: Fund Accounts

**Go to:** https://bank.testnet.algorand.network

**Fund these 4 accounts (one by one):**

1. **Creator:**
   ```
   N644J6E3WXJOF47TDR5UGX57KKOGTP4K3ZEX6I4LLVMYCXJWPRBKEDLFKQ
   ```

2. **Provider:**
   ```
   KUVDAR32J7YZJCFMEDUCYSH2KC423IME3VRYOK7DT62YMW3R7CZZHHANVE
   ```

3. **Platform:**
   ```
   JT76AN7TNX3UFAGURWNK5RINRLWNURQMRDV5UY2WZVONNFCDXTS2OZ56UA
   ```

4. **User:**
   ```
   NMY7IKV4VGUNE2P3SJAPIESGR4TRBFF2TFPVVM2LK45DUC6EPJHKOSEL5Y
   ```

**How:**
1. Paste address in Faucet
2. Click "Dispense"
3. Wait for confirmation
4. Repeat for next account

---

### Step 2: Run Deployment

**After funding, run:**

```bash
cd C:\Amir\pay-as-play-project\.bmad-core\knowledge\technical\smart-contracts
node complete-deployment.js
```

**Or use auto-monitor:**

```bash
node wait-and-deploy.js
```

---

### Step 3: Test Contract

**After deployment:**

```bash
node test-contract.js
```

---

## ⚡ Auto-Deploy Option

**Run this and leave it running:**

```bash
node wait-and-deploy.js
```

**This will:**
- Check balances every 10 seconds
- Auto-deploy when funded
- Complete all steps automatically

---

## ✅ What Happens

After funding, deployment will:

1. ✅ Create ASA (PlayCoin)
2. ✅ Opt-in all accounts to ASA
3. ✅ Deploy Smart Contract
4. ✅ Opt-in user to contract
5. ✅ Update .env with ASA_ID and APP_ID

---

## 📊 Expected Output

```
✅ All accounts funded!
   Total Balance: 0.4000 ALGO

🚀 Starting deployment...

📦 Step 2: Creating ASA (PlayCoin)...
✅ ASA Created!
   Asset ID: 1234567

🔗 Step 3: Opting-in accounts to ASA...
✅ All accounts opted in

🚀 Step 4: Deploying Smart Contract...
✅ Contract Deployed!
   App ID: 789

🔗 Step 5: Opting-in User to Contract...
✅ User opted in to contract

✅ Deployment Complete!
```

---

## 🔄 After Deployment

1. **Test Contract:**
   ```bash
   node test-contract.js
   ```

2. **Update Logs:**
   - Update `SPRINT1_EXECUTION_LOG.md` with:
     - ASA_ID
     - APP_ID
     - Test results

3. **Sprint 1 Complete!** ✅

---

**Ready to Deploy!** 🚀

