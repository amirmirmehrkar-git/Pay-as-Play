# 🚀 Developer Guide — Play and Pay TestNet Setup

**پروژه:** Pay as Play  
**تاریخ ایجاد:** 2025-11-04  
**آخرین به‌روزرسانی:** 2025-11-04  
**ورژن:** 1.0

---

## 📋 فهرست

- [Quick Start](#quick-start)
- [Step-by-Step Setup](#step-by-step-setup)
- [ASA Creation](#asa-creation)
- [Opt-in Process](#opt-in-process)
- [Testing](#testing)
- [Security Notes](#security-notes)
- [Troubleshooting](#troubleshooting)

---

## ⚡ Quick Start

### Prerequisites

```bash
# Install Node.js dependencies
npm install algosdk dotenv

# Install React dependencies (if using WalletConnect demo)
npm install @perawallet/connect react react-dom
```

### 5-Minute Setup

```bash
# 1. Get TestNet account from faucet
# Visit: https://bank.testnet.algorand.network/

# 2. Create .env file
cat > .env << EOF
CREATOR_MNEMONIC="your 25-word test mnemonic"
USER_MNEMONIC="user test mnemonic"
PROVIDER_MNEMONIC="provider test mnemonic"
ASA_ID=
EOF

# 3. Create ASA
CREATOR_MNEMONIC="..." node asa-create.js

# 4. Update .env with ASA ID
# (Copy Asset ID from output)

# 5. Opt-in accounts
USER_MNEMONIC="..." ASA_ID=1234567 node opt-in.js
PROVIDER_MNEMONIC="..." ASA_ID=1234567 node opt-in.js

# 6. Start server
npm start
```

---

## 📝 Step-by-Step Setup

### Step 1: Get TestNet Accounts

**Option A: Algorand Faucet (Recommended)**

1. Visit: https://bank.testnet.algorand.network/
2. Enter your email
3. Receive TestNet ALGO (usually 10 ALGO)
4. Save your account address

**Option B: Generate New Account**

```bash
# Using goal CLI
goal account new

# Or using algosdk in Node.js
const algosdk = require('algosdk');
const account = algosdk.generateAccount();
console.log('Address:', account.addr);
console.log('Mnemonic:', algosdk.secretKeyToMnemonic(account.sk));
```

**⚠️ Important:**
- These are **TEST accounts only**
- Never use mainnet mnemonics
- Store mnemonics securely (not in git)

---

### Step 2: Create .env File

Create a `.env` file in the project root:

```bash
# .env
CREATOR_MNEMONIC="word1 word2 word3 ... word25"
USER_MNEMONIC="word1 word2 word3 ... word25"
PROVIDER_MNEMONIC="word1 word2 word3 ... word25"
ASA_ID=
```

**⚠️ Security:**
- Add `.env` to `.gitignore`
- Never commit `.env` files
- Use different accounts for different purposes

---

### Step 3: Create ASA (PlayCoin)

**Method 1: Using Node.js Script (Recommended)**

```bash
# Set mnemonic and run
CREATOR_MNEMONIC="your 25-word mnemonic" node asa-create.js
```

**Expected Output:**
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

✅ Config file updated: server/playandpay.config.json
```

**Method 2: Using goal CLI**

```bash
goal asset create \
  --creator $CREATOR_ADDR \
  --total 10000000 \
  --decimals 2 \
  --unitname PLY \
  --assetname "PlayCoin" \
  --url "https://playandpay.io" \
  --defaultfrozen=false \
  --note "Pay-as-you-Use micro-token"
```

**Method 3: Using algosdk (Programmatic)**

```javascript
const algosdk = require('algosdk');

const algod = new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud', '');
const creator = algosdk.mnemonicToSecretKey(process.env.CREATOR_MNEMONIC);
const params = await algod.getTransactionParams().do();

const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
  from: creator.addr,
  total: 10_000_000,
  decimals: 2,
  defaultFrozen: false,
  unitName: "PLY",
  assetName: "PlayCoin",
  assetURL: "https://playandpay.io",
  suggestedParams: params
});

const signed = txn.signTxn(creator.sk);
const { txId } = await algod.sendRawTransaction(signed).do();
const confirmed = await algosdk.waitForConfirmation(algod, txId, 3);

console.log('Asset ID:', confirmed['asset-index']);
```

---

### Step 4: Update Configuration

After creating ASA, update your config:

**File: `server/playandpay.config.json`**

```json
{
  "api_key": "YOUR_API_KEY",
  "network": "algorand-testnet",
  "asa_id": "1234567",
  "rate_per_minute": 0.02,
  "currency": "PLY",
  "auto_topup_threshold": 1.00,
  "webhook_url": "https://yourapp.com/hooks/playandpay",
  "user_mnemonic": "",
  "provider_addr": "PROVIDER_TESTNET_ADDR"
}
```

**Also update `.env`:**
```bash
ASA_ID=1234567
```

---

### Step 5: Opt-in Accounts

**Why Opt-in?**
In Algorand, accounts must opt-in to an ASA before they can receive or send it.

**Method 1: Using Node.js Script**

```bash
# User opt-in
USER_MNEMONIC="your 25-word mnemonic" ASA_ID=1234567 node opt-in.js

# Provider opt-in
PROVIDER_MNEMONIC="your 25-word mnemonic" ASA_ID=1234567 node opt-in.js
```

**Expected Output:**
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

**Method 2: Using goal CLI**

```bash
goal asset optin \
  --account $USER_ADDR \
  --assetid 1234567
```

**Method 3: Using algosdk (Programmatic)**

```javascript
const algosdk = require('algosdk');

const algod = new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud', '');
const account = algosdk.mnemonicToSecretKey(process.env.USER_MNEMONIC);
const params = await algod.getTransactionParams().do();

const optInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
  from: account.addr,
  to: account.addr,
  amount: 0,
  assetIndex: 1234567,
  suggestedParams: params,
});

const signed = optInTxn.signTxn(account.sk);
const { txId } = await algod.sendRawTransaction(signed).do();
await algosdk.waitForConfirmation(algod, txId, 4);

console.log('Opt-in completed for', account.addr);
```

---

### Step 6: Fund Test Accounts

**Get TestNet ALGO:**
- Visit: https://bank.testnet.algorand.network/
- Enter account address
- Receive 10 ALGO (usually instant)

**Minimum Requirements:**
- Creator: ~0.1 ALGO (for ASA creation)
- User: ~0.1 ALGO (for opt-in + transactions)
- Provider: ~0.1 ALGO (for opt-in + receiving)

**Check Balance:**
```bash
# Using goal CLI
goal account balance -a $ACCOUNT_ADDR

# Or using algosdk
const accountInfo = await algod.accountInformation(account.addr).do();
console.log('Balance:', accountInfo.amount / 1e6, 'ALGO');
```

---

### Step 7: Start Development Server

```bash
# Install dependencies
npm install

# Start server
npm start

# Server runs on http://localhost:8080
```

**Test Endpoints:**
```bash
# Start session
curl -X POST http://localhost:8080/session/start \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "demo-user",
    "contentId": "film123",
    "pricePerMinute": 0.02
  }'

# Send tick
curl -X POST http://localhost:8080/session/tick \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "session_abc123",
    "playedMs": 15000,
    "tickId": "tick_001"
  }'

# Stop session
curl -X POST http://localhost:8080/session/stop \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "session_abc123"
  }'
```

---

## 🧪 Testing

### Test Checklist

- [ ] ✅ ASA created on TestNet
- [ ] ✅ User account opted in
- [ ] ✅ Provider account opted in
- [ ] ✅ All accounts funded (≥0.1 ALGO)
- [ ] ✅ Config file updated with ASA ID
- [ ] ✅ Server starts without errors
- [ ] ✅ Can create session
- [ ] ✅ Can send ticks
- [ ] ✅ Can stop session
- [ ] ✅ WalletConnect demo works
- [ ] ✅ Transactions visible on AlgoExplorer

### Test WalletConnect

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

**Test Flow:**
1. Click "Connect Pera Wallet"
2. Approve connection on mobile
3. Verify balance displays
4. Click "Pay €0.02 (1 min)"
5. Approve payment on mobile
6. Verify transaction on AlgoExplorer

---

## 🔒 Security Notes

### ⚠️ Critical Security Rules

1. **TestNet Only**
   - ✅ Use TestNet accounts only
   - ❌ Never use mainnet mnemonics
   - ❌ Never commit real keys

2. **Environment Variables**
   - ✅ Store mnemonics in `.env`
   - ✅ Add `.env` to `.gitignore`
   - ❌ Never commit `.env` files
   - ❌ Never hardcode mnemonics

3. **Production Changes**
   - ✅ Use WalletConnect (user signs)
   - ✅ No server-side mnemonics
   - ✅ Environment variables in secrets manager
   - ✅ HTTPS only
   - ✅ Rate limiting

### .gitignore Template

```gitignore
# Environment variables
.env
.env.local
.env.*.local
*.env

# Mnemonics and keys
*.key
*.mnemonic
secrets/
keys/

# Node modules
node_modules/

# Logs
*.log
logs/

# Build outputs
dist/
build/
```

---

## 🔧 Troubleshooting

### Issue: "Account not opted in"

**Solution:**
```bash
USER_MNEMONIC="..." ASA_ID=1234567 node opt-in.js
```

**Verify:**
```javascript
const accountInfo = await algod.accountInformation(address).do();
const hasAsset = accountInfo.assets?.some(a => a['asset-id'] === asaId);
console.log('Opted in:', hasAsset);
```

---

### Issue: "Insufficient balance"

**Solution:**
1. Get TestNet ALGO from faucet
2. Check balance:
   ```bash
   goal account balance -a $ACCOUNT_ADDR
   ```
3. Minimum: 0.1 ALGO for transactions

---

### Issue: "Transaction failed"

**Possible Causes:**
1. **Insufficient balance** → Fund account
2. **Not opted in** → Run opt-in script
3. **Wrong ASA ID** → Check config file
4. **Network issue** → Check internet connection

**Debug:**
```javascript
try {
  const { txId } = await algod.sendRawTransaction(signed).do();
  console.log('Transaction sent:', txId);
  
  const confirmed = await algosdk.waitForConfirmation(algod, txId, 3);
  console.log('Confirmed:', confirmed);
} catch (error) {
  console.error('Error:', error.message);
  if (error.response) {
    console.error('Response:', error.response.body);
  }
}
```

---

### Issue: "ASA creation failed"

**Possible Causes:**
1. **Insufficient balance** → Need ~0.1 ALGO
2. **Invalid mnemonic** → Check mnemonic format
3. **Network issue** → Check TestNet connectivity

**Verify:**
```bash
# Check account balance
goal account balance -a $CREATOR_ADDR

# Check mnemonic
goal account import -m "your mnemonic"
```

---

## 📊 Development Workflow

### Typical Development Cycle

```
1. Setup TestNet accounts
   ↓
2. Create ASA (one-time)
   ↓
3. Opt-in accounts
   ↓
4. Update config
   ↓
5. Start development server
   ↓
6. Test locally
   ↓
7. Deploy to staging
   ↓
8. Test on staging
   ↓
9. Deploy to production (MainNet)
```

### Daily Development

```bash
# Morning: Start fresh
git pull
npm install
npm start

# During development: Test changes
npm test
npm run lint

# Evening: Commit changes
git add .
git commit -m "Description"
git push
```

---

## 📚 Related Documentation

- **TestNet Tools README:** [`README.md`](./README.md)
- **Flow Diagrams:** [`flow-diagram.md`](./flow-diagram.md)
- **Security Best Practices:** [`../security-best-practices.md`](../security-best-practices.md)
- **SDK Structure:** [`../sdk-structure.md`](../sdk-structure.md)

---

## 🔄 به‌روزرسانی‌ها

**2025-11-04 - ورژن 1.0:**
- ایجاد فایل اولیه
- مستندسازی Quick Start
- مستندسازی Step-by-Step Setup
- مستندسازی ASA Creation
- مستندسازی Opt-in Process
- مستندسازی Testing
- مستندسازی Security Notes
- مستندسازی Troubleshooting
- مستندسازی Development Workflow

---

**تاریخ آخرین به‌روزرسانی:** 2025-11-04  
**ورژن فعلی:** 1.0

