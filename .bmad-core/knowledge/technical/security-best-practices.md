# 🔒 Security Best Practices — Play and Pay

**پروژه:** Pay as Play  
**تاریخ ایجاد:** 2025-11-04  
**آخرین به‌روزرسانی:** 2025-11-04  
**ورژن:** 1.0

---

## 📋 فهرست

- [Overview](#overview)
- [POC vs Production](#poc-vs-production)
- [Key Management](#key-management)
- [Wallet Security](#wallet-security)
- [API Security](#api-security)
- [Smart Contract Security](#smart-contract-security)
- [Network Security](#network-security)
- [Data Protection](#data-protection)
- [Compliance](#compliance)
- [Security Checklist](#security-checklist)

---

## 🎯 Overview

**⚠️ Important:**
این نسخه صرفاً POC تستی است. برای پروژه واقعی، باید نکات امنیتی زیر رعایت شود.

**⚠️ Important:**
This version is for POC testing only. For production projects, the following security practices must be followed.

---

## 🔴 POC vs Production

### POC (Proof of Concept) - Current Version

**What's OK:**
- ✅ TestNet only
- ✅ Demo mnemonics (disposable)
- ✅ Mock transactions for testing
- ✅ Development environment

**What's NOT OK:**
- ❌ MainNet usage
- ❌ Real user funds
- ❌ Production API keys
- ❌ Committed secrets

### Production - Required Changes

**Must Implement:**
1. ✅ Environment variables for all secrets
2. ✅ WalletConnect (user signs, not server)
3. ✅ Real ASA on MainNet (after testing)
4. ✅ Proper opt-in flow
5. ✅ Rate limits from Smart Contract
6. ✅ Monitoring and logging
7. ✅ Error handling
8. ✅ Compliance (KYC/AML if required)

---

## 🔑 Key Management

### ❌ DON'T: Server-Side Mnemonics

```javascript
// ❌ BAD: Hardcoded mnemonic
const userMnemonic = "word1 word2 ... word25";

// ❌ BAD: In config file
{
  "user_mnemonic": "word1 word2 ... word25"
}

// ❌ BAD: In source code
const creator = algosdk.mnemonicToSecretKey(process.env.USER_MNEMONIC);
```

**Why:** If server is compromised, attacker has full access to funds.

### ✅ DO: Environment Variables

```javascript
// ✅ GOOD: Environment variable
const userMnemonic = process.env.USER_MNEMONIC;

// ✅ GOOD: .env file (not committed)
USER_MNEMONIC=word1 word2 ... word25

// ✅ GOOD: .gitignore
.env
*.env
```

**Best Practice:**
- Use `.env` file for local development
- Use environment variables in production (AWS Secrets Manager, Azure Key Vault, etc.)
- Never commit `.env` files
- Rotate keys regularly

### ✅ DO: WalletConnect (User Signs)

```javascript
// ✅ GOOD: User signs with their wallet
const signedTxns = await peraWallet.signTransaction([txn]);
await algod.sendRawTransaction(signedTxns).do();
```

**Why:** Private keys never leave user's device. Server never has access.

---

## 💼 Wallet Security

### User Wallet

**✅ Best Practices:**
1. **User Controls Keys:** Use WalletConnect, Pera Wallet, or other user-controlled wallets
2. **No Server Access:** Server never stores or accesses user private keys
3. **Transaction Approval:** User approves every transaction
4. **Balance Checks:** Always check balance before transactions

**Example:**
```javascript
// ✅ GOOD: User signs transaction
const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
  from: userAddress, // From user's wallet
  to: providerAddress,
  amount: amountMinor,
  assetIndex: asaId,
  suggestedParams: params
});

// User signs via WalletConnect
const signedTxns = await peraWallet.signTransaction([txn]);
await algod.sendRawTransaction(signedTxns).do();
```

### Provider Wallet

**✅ Best Practices:**
1. **Separate Accounts:** Use different accounts for different purposes
2. **Cold Storage:** Keep majority of funds in cold storage
3. **Hot Wallet:** Use hot wallet only for operational needs
4. **Multi-Signature:** Consider multi-sig for large amounts

---

## 🔐 API Security

### API Keys

**✅ Best Practices:**
1. **Environment Variables:** Store in `.env` or secrets manager
2. **Rotation:** Rotate keys regularly
3. **Scoping:** Use different keys for different environments
4. **Rate Limiting:** Implement rate limits

```javascript
// ✅ GOOD: API key from environment
const apiKey = process.env.PLAYANDPAY_API_KEY;

// ❌ BAD: Hardcoded
const apiKey = "sk_live_1234567890";
```

### Authentication

**✅ Best Practices:**
1. **JWT Tokens:** Use JWT for user authentication
2. **Token Expiration:** Set short expiration times
3. **Refresh Tokens:** Use refresh tokens for long sessions
4. **HTTPS Only:** Always use HTTPS in production

```javascript
// ✅ GOOD: JWT authentication
const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

// ✅ GOOD: Verify token
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

### Rate Limiting

**✅ Best Practices:**
1. **Per User:** Limit requests per user
2. **Per IP:** Limit requests per IP
3. **Per Endpoint:** Different limits for different endpoints

```javascript
// ✅ GOOD: Rate limiting
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## 🔐 Smart Contract Security

### Rate Control

**✅ Best Practice:**
- Store rates in Smart Contract, not backend
- Backend reads from contract, doesn't set rates
- Prevents manipulation

**Example:**
```python
# ✅ GOOD: Rate in Smart Contract
def get_rate():
    return App.globalGet(Bytes("rate_per_minute"))

# ❌ BAD: Rate in backend config
rate = 0.02  # Can be changed without user knowing
```

### Fee Distribution

**✅ Best Practice:**
- Calculate fees in Smart Contract
- Automatic distribution to platform/provider
- Transparent and verifiable

**Example:**
```python
# ✅ GOOD: Fee calculation in contract
platform_fee = amount * App.globalGet(Bytes("platform_fee_pct")) / 1000
provider_amount = amount - platform_fee
```

### Idempotency

**✅ Best Practice:**
- Use unique tick IDs
- Check for duplicate ticks
- Prevent double-charging

**Example:**
```javascript
// ✅ GOOD: Unique tick ID
const tickId = `${sessionId}-${Date.now()}-${Math.random()}`;

// Check for duplicates
if (processedTicks.has(tickId)) {
  throw new Error('Duplicate tick');
}
processedTicks.add(tickId);
```

---

## 🌐 Network Security

### TestNet vs MainNet

**✅ Best Practices:**
1. **TestNet First:** Always test on TestNet
2. **Separate Configs:** Different configs for TestNet/MainNet
3. **Environment Detection:** Auto-detect environment
4. **Warnings:** Show warnings on TestNet

```javascript
// ✅ GOOD: Environment detection
const network = process.env.ALGORAND_NETWORK || 'testnet';

if (network === 'mainnet') {
  console.warn('⚠️  MAINNET MODE - Real funds at risk!');
}

const algod = new algosdk.Algodv2(
  '',
  network === 'mainnet' 
    ? 'https://mainnet-api.algonode.cloud'
    : 'https://testnet-api.algonode.cloud',
  ''
);
```

### HTTPS

**✅ Best Practice:**
- Always use HTTPS in production
- Use valid SSL certificates
- Redirect HTTP to HTTPS

```javascript
// ✅ GOOD: HTTPS redirect
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}
```

---

## 🛡️ Data Protection

### User Data

**✅ Best Practices:**
1. **Encryption:** Encrypt sensitive data at rest
2. **Minimal Data:** Store only necessary data
3. **GDPR Compliance:** Follow GDPR guidelines
4. **Data Retention:** Delete old data

```javascript
// ✅ GOOD: Encrypted storage
const encrypted = encrypt(userData, process.env.ENCRYPTION_KEY);

// ✅ GOOD: Minimal data
const session = {
  sessionId: generateId(),
  userId: user.id,
  contentId: content.id,
  startedAt: Date.now()
  // Don't store sensitive data
};
```

### Transaction Data

**✅ Best Practice:**
- Store transaction IDs, not full transaction data
- Link to blockchain for full details
- Don't store private keys or mnemonics

```javascript
// ✅ GOOD: Store only transaction ID
const session = {
  sessionId: 'session_123',
  txIds: ['tx_abc', 'tx_def'], // Link to blockchain
  totalCharge: 0.16
};

// ❌ BAD: Store full transaction
const session = {
  signedTxn: Buffer.from(...), // Never store this
  privateKey: '...' // Never store this
};
```

---

## 📋 Compliance

### KYC/AML (If Required)

**✅ Best Practices:**
1. **User Verification:** Verify user identity if required
2. **Transaction Monitoring:** Monitor for suspicious activity
3. **Reporting:** Report suspicious transactions
4. **Documentation:** Keep records

### GDPR

**✅ Best Practices:**
1. **Data Minimization:** Collect only necessary data
2. **User Rights:** Allow users to access/delete their data
3. **Privacy Policy:** Clear privacy policy
4. **Consent:** Get user consent for data processing

---

## ✅ Security Checklist

### Development

- [ ] ✅ No mnemonics in code
- [ ] ✅ Environment variables for secrets
- [ ] ✅ `.env` in `.gitignore`
- [ ] ✅ TestNet for development
- [ ] ✅ WalletConnect for user signatures
- [ ] ✅ No server-side private keys

### Production

- [ ] ✅ MainNet ASA created and verified
- [ ] ✅ All accounts opted in
- [ ] ✅ HTTPS enabled
- [ ] ✅ Rate limiting implemented
- [ ] ✅ Error handling and logging
- [ ] ✅ Monitoring and alerts
- [ ] ✅ Backup and recovery plan
- [ ] ✅ Security audit completed

### Smart Contracts

- [ ] ✅ Rates stored in contract
- [ ] ✅ Fee distribution automated
- [ ] ✅ Idempotency checks
- [ ] ✅ Contract audited
- [ ] ✅ Test coverage

### API

- [ ] ✅ API keys in secrets manager
- [ ] ✅ JWT authentication
- [ ] ✅ Rate limiting
- [ ] ✅ Input validation
- [ ] ✅ Error handling

### Wallet

- [ ] ✅ User controls keys
- [ ] ✅ No server access to keys
- [ ] ✅ Transaction approval required
- [ ] ✅ Balance checks

---

## 📚 Related Documentation

- **SDK Structure:** [`sdk-structure.md`](./sdk-structure.md)
- **Flow Diagrams:** [`testnet-tools/flow-diagram.md`](./testnet-tools/flow-diagram.md)
- **POC Implementation:** [`poc-implementation.md`](./poc-implementation.md)

---

## 🔄 به‌روزرسانی‌ها

**2025-11-04 - ورژن 1.0:**
- ایجاد فایل اولیه
- مستندسازی POC vs Production
- مستندسازی Key Management
- مستندسازی Wallet Security
- مستندسازی API Security
- مستندسازی Smart Contract Security
- مستندسازی Network Security
- مستندسازی Data Protection
- مستندسازی Compliance
- اضافه کردن Security Checklist

---

**تاریخ آخرین به‌روزرسانی:** 2025-11-04  
**ورژن فعلی:** 1.0

