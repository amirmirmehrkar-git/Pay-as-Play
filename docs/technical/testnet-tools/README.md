# 🛠️ TestNet Tools — Play and Pay

**پروژه:** Pay as Play  
**تاریخ ایجاد:** 2025-11-04  
**آخرین به‌روزرسانی:** 2025-11-04  
**ورژن:** 1.0

---

## 📋 فهرست

- [Overview](#overview)
- [Files](#files)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [Requirements](#requirements)

---

## 🎯 Overview

این پوشه شامل ابزارهای TestNet برای توسعه‌دهندگان است:

- **ASA Creation:** ساخت PlayCoin (PLY) روی TestNet
- **Opt-in Script:** Opt-in کردن حساب‌ها به ASA
- **WalletConnect Demo:** نمونه اتصال کیف‌پول و پرداخت کاربر
- **Flow Diagrams:** دیاگرام‌های فلو و نکات عملیاتی

---

## 📁 Files

### 0. `FULL_DEVELOPER_ONBOARDING.md` ⭐
**Complete step-by-step guide for developers**

This is the **main entry point** for all developers. It includes:
- Complete architecture overview
- Step-by-step setup instructions
- Mermaid flow diagrams
- FAQ and troubleshooting
- Security tips

**Start here:** Read `FULL_DEVELOPER_ONBOARDING.md` first!

### 1. `asa-create.js`
اسکریپت Node.js برای ساخت ASA (PlayCoin / PLY) روی TestNet.

**Usage:**
```bash
CREATOR_MNEMONIC="your 25-word mnemonic" node asa-create.js
```

**Output:**
- Asset ID
- Transaction ID
- Updated config file

### 2. `opt-in.js`
اسکریپت Node.js برای opt-in کردن حساب‌ها به ASA.

**Usage:**
```bash
USER_MNEMONIC="your 25-word mnemonic" ASA_ID=1234567 node opt-in.js
```

**Output:**
- Opt-in confirmation
- Transaction ID

### 3. `walletconnect-demo.jsx`
کامپوننت React با دموی اتصال Pera Wallet و نمونه پرداخت ASA.

**Usage:**
```jsx
import WalletConnectDemo from './walletconnect-demo';

<WalletConnectDemo 
  asaId={1234567} 
  providerAddr="PROVIDER_ADDR"
  ratePerMinute={0.02}
/>
```

### 4. `flow-diagram.md`
مستند فلو و Mermaid sequence diagrams برای Dev Docs.

---

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
npm install algosdk dotenv
```

### Step 2: Get TestNet Accounts

**Option A: Algorand Faucet (Recommended)**
- Visit: https://bank.testnet.algorand.network/
- Enter email, receive TestNet ALGO
- Save account address and mnemonic

**Option B: Generate New Account**
```bash
# Using goal CLI
goal account new

# Or using algosdk
const algosdk = require('algosdk');
const account = algosdk.generateAccount();
console.log('Address:', account.addr);
console.log('Mnemonic:', algosdk.secretKeyToMnemonic(account.sk));
```

### Step 3: Create .env File

```bash
# .env
CREATOR_MNEMONIC="your 25-word mnemonic"
USER_MNEMONIC="user test mnemonic"
PROVIDER_MNEMONIC="provider test mnemonic"
ASA_ID=
```

**⚠️ Important:** Add `.env` to `.gitignore`!

### Step 4: Create ASA

```bash
CREATOR_MNEMONIC="..." node asa-create.js
```

**Expected Output:**
```
🎉 ASA Created Successfully!
Asset ID: 1234567
Unit Name: PLY
Asset Name: PlayCoin
```

### Step 5: Update Config

Update `server/playandpay.config.json`:
```json
{
  "asa_id": "1234567"
}
```

### Step 6: Opt-in Accounts

```bash
# User opt-in
USER_MNEMONIC="..." ASA_ID=1234567 node opt-in.js

# Provider opt-in
PROVIDER_MNEMONIC="..." ASA_ID=1234567 node opt-in.js
```

### Step 7: Fund Test Accounts

Get TestNet ALGO from: https://bank.testnet.algorand.network/

**Minimum Requirements:**
- Each account needs ~0.1 ALGO for transactions

---

## 📖 Usage

### Creating ASA

```bash
# Method 1: Environment variable
CREATOR_MNEMONIC="word1 word2 ... word25" node asa-create.js

# Method 2: .env file
echo "CREATOR_MNEMONIC=word1 word2 ... word25" > .env
node asa-create.js
```

**Output:**
```
✅ Creator account loaded: ABC123...
💰 Creator balance: 10.5 ALGO
📝 Transaction params retrieved
✍️  Transaction signed
📤 Transaction sent: TXID123...
⏳ Waiting for confirmation...

🎉 ASA Created Successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Asset ID: 1234567
Unit Name: PLY
Asset Name: PlayCoin
Total Supply: 10,000,000 PLY
Decimals: 2
1 PLY = €0.01 (100 minor units = 1 PLY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Opting In

```bash
# User opt-in
USER_MNEMONIC="word1 word2 ... word25" ASA_ID=1234567 node opt-in.js

# Provider opt-in
PROVIDER_MNEMONIC="word1 word2 ... word25" ASA_ID=1234567 node opt-in.js
```

**Output:**
```
✅ User account loaded: XYZ789...
📦 ASA ID: 1234567
💰 Account balance: 5.2 ALGO
📝 Transaction params retrieved
✍️  Transaction signed
📤 Transaction sent: TXID456...
⏳ Waiting for confirmation...

🎉 Opt-in Successful!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Account: XYZ789...
ASA ID: 1234567
Transaction ID: TXID456...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### WalletConnect Demo

```jsx
import WalletConnectDemo from './walletconnect-demo';

function App() {
  return (
    <WalletConnectDemo 
      asaId={1234567} 
      providerAddr="PROVIDER_TESTNET_ADDR"
      ratePerMinute={0.02}
    />
  );
}
```

**Features:**
- Connect Pera Wallet
- Fetch balance
- Send payments (user signs)
- Real-time balance updates

---

## 📋 Requirements

### Node.js
- Node.js 14+ recommended
- npm or yarn

### Dependencies
```json
{
  "algosdk": "^2.0.0",
  "dotenv": "^16.0.0"
}
```

### For React Component
```json
{
  "@perawallet/connect": "^1.0.0",
  "algosdk": "^2.0.0",
  "react": "^18.0.0"
}
```

### TestNet Accounts
- Creator account (for ASA creation)
- User account (for testing)
- Provider account (for receiving payments)
- Each account needs ~0.1 ALGO for transactions

---

## 🔗 Related Documentation

- **SDK Structure:** [`../sdk-structure.md`](../sdk-structure.md)
- **Security Best Practices:** [`../security-best-practices.md`](../security-best-practices.md)
- **Flow Diagrams:** [`flow-diagram.md`](./flow-diagram.md)
- **POC Implementation:** [`../poc-implementation.md`](../poc-implementation.md)

---

## ⚠️ Security Notes

- **TestNet Only:** These tools are for TestNet only
- **No Real Funds:** Never use mainnet mnemonics
- **Environment Variables:** Store mnemonics in `.env`, never commit
- **Disposable Accounts:** Use disposable test accounts

---

## 🔄 به‌روزرسانی‌ها

**2025-11-04 - ورژن 1.0:**
- ایجاد فایل اولیه
- مستندسازی Files
- مستندسازی Quick Start
- مستندسازی Usage
- مستندسازی Requirements
- اضافه کردن Security Notes

---

**تاریخ آخرین به‌روزرسانی:** 2025-11-04  
**ورژن فعلی:** 1.0

