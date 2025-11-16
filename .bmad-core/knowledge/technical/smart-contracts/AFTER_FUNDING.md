# ✅ After Funding — Next Steps
## Play and Pay — Sprint 1

**بعد از funding حساب‌ها، این دستور را اجرا کن:**

---

## 🚀 Quick Command

```bash
cd C:\Amir\pay-as-play-project\.bmad-core\knowledge\technical\smart-contracts
node check-and-deploy.js
```

**این اسکریپت:**
1. ✅ موجودی حساب‌ها را چک می‌کند
2. ✅ اگر funding شده بود، deployment را اجرا می‌کند
3. ✅ اگر funding نشده بود، راهنمایی می‌دهد

---

## 📋 What Happens

### If Accounts Are Funded:

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

### If Accounts Not Funded:

```
⏳ Accounts not fully funded yet!

📝 Next Steps:
   1. Fund accounts from: https://bank.testnet.algorand.network
   2. Wait a few seconds for confirmation
   3. Run this script again: node check-and-deploy.js
```

---

## 🔄 Alternative: Auto-Monitor

**اگر می‌خواهی monitoring خودکار:**

```bash
node wait-and-deploy.js
```

این اسکریپت:
- هر 10 ثانیه موجودی را چک می‌کند
- وقتی funding شد، خودکار deployment را اجرا می‌کند

---

## ✅ After Deployment

**بعد از deployment موفق:**

1. **Test Contract:**
   ```bash
   node test-contract.js
   ```

2. **Update Execution Log:**
   - Update `SPRINT1_EXECUTION_LOG.md` with:
     - ASA_ID
     - APP_ID
     - Deployment transaction ID

3. **Begin Task 1.4:**
   - Test contract functionality
   - Verify all acceptance criteria

---

## 📊 Status Check

**برای بررسی وضعیت:**

```bash
node check-status.js
```

**یا:**

```bash
node check-balances.js
```

---

## 🔗 Quick Links

- **Faucet:** https://bank.testnet.algorand.network
- **TestNet Explorer:** https://testnet.explorer.algorand.org
- **Execution Log:** [`../../project-context/SPRINT1_EXECUTION_LOG.md`](../../project-context/SPRINT1_EXECUTION_LOG.md)

---

**Ready to Deploy!** 🚀

