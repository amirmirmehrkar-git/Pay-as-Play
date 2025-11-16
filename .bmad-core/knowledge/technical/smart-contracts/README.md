# 🔐 Play and Pay - Smart Contract Documentation

**Smart Contract:** UsageContract (ASC1)  
**Language:** PyTeal  
**Network:** Algorand TestNet / MainNet  
**Version:** 1.0

---

## 📋 Overview

The UsageContract is an Algorand Smart Contract (ASC1) that handles pay-as-you-use micro-payments for the Play and Pay platform. It ensures:

- ✅ **Fair Fee Distribution:** Automatically splits payments between provider and platform
- ✅ **Rate Validation:** Enforces minimum and maximum rates per minute
- ✅ **Idempotency:** Prevents duplicate charges using tick IDs
- ✅ **Atomicity:** Grouped transactions ensure all-or-nothing execution
- ✅ **Transparency:** All calculations are on-chain and auditable

---

## 🏗️ Contract Architecture

### Global State

| Key | Type | Description |
|-----|------|-------------|
| `provider` | Address | Provider wallet address (receives net payment) |
| `platform` | Address | Platform wallet address (receives fee) |
| `fee_pct` | Integer | Platform fee percentage (basis points, e.g., 500 = 5%) |
| `min_rate` | Integer | Minimum rate per minute (in PLY minor units) |
| `max_rate` | Integer | Maximum rate per minute (in PLY minor units) |

### Local State (Per User)

| Key | Type | Description |
|-----|------|-------------|
| `last_tick` | Bytes | Last processed tick ID (for idempotency) |

---

## 🔄 Transaction Flow

### 1. Contract Creation

**Transaction:** Application Creation  
**Arguments:**
1. `provider_addr` (Address) - Provider wallet address
2. `platform_addr` (Address) - Platform wallet address
3. `fee_pct` (Integer) - Fee percentage in basis points (e.g., 500 = 5%)
4. `min_rate` (Integer) - Minimum rate per minute (PLY minor units)
5. `max_rate` (Integer) - Maximum rate per minute (PLY minor units)

**Example:**
```bash
goal app create \
  --creator CREATOR_ADDR \
  --approval-prog usage_contract_approval.teal \
  --clear-prog usage_contract_clear.teal \
  --global-byteslices 0 \
  --global-ints 5 \
  --local-byteslices 1 \
  --local-ints 0 \
  --app-arg addr:PROVIDER_ADDR \
  --app-arg addr:PLATFORM_ADDR \
  --app-arg int:500 \
  --app-arg int:1 \
  --app-arg int:1000
```

---

### 2. User Opt-In

Before users can use the contract, they must opt-in:

```bash
goal app optin \
  --app-id APP_ID \
  --from USER_ADDR \
  --net testnet
```

---

### 3. Billing Transaction (Grouped)

**Transaction Group:** 3 transactions (atomic)

**Transaction 1: Application Call**
- **Type:** NoOp Application Call
- **Arguments:**
  1. `tick_id` (Bytes) - Unique tick identifier (for idempotency)
  2. `units` (Integer) - Units consumed (e.g., minutes)
  3. `unit_price` (Integer) - Price per unit (PLY minor units)
  4. `asa_id` (Integer) - PlayCoin ASA ID

**Transaction 2: Asset Transfer (User → Provider)**
- **Type:** Asset Transfer
- **From:** User address
- **To:** Provider address (from global state)
- **Amount:** `provider_amount = gross_amount - fee_amount`
- **Asset:** PlayCoin (ASA ID)

**Transaction 3: Asset Transfer (User → Platform)**
- **Type:** Asset Transfer
- **From:** User address
- **To:** Platform address (from global state)
- **Amount:** `fee_amount = (gross_amount * fee_pct) / 10000`
- **Asset:** PlayCoin (ASA ID)

**Calculation:**
```
gross_amount = units * unit_price
fee_amount = (gross_amount * fee_pct) / 10000
provider_amount = gross_amount - fee_amount
```

---

## 📝 Example Usage

### JavaScript/TypeScript (Algorand SDK)

```javascript
const algosdk = require('algosdk');

// Setup
const algod = new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud', '');
const APP_ID = 123; // Your deployed app ID
const ASA_ID = 456; // PlayCoin ASA ID

// User account (from WalletConnect or mnemonic)
const userAccount = algosdk.mnemonicToSecretKey(USER_MNEMONIC);

// Billing parameters
const tickId = Buffer.from(`tick_${Date.now()}_${Math.random()}`);
const units = 1; // 1 minute
const unitPrice = 2; // 2 PLY minor per minute (€0.02)
const grossAmount = units * unitPrice; // 2 PLY minor
const feePct = 500; // 5% = 500 basis points
const feeAmount = (grossAmount * feePct) / 10000; // 0.1 PLY minor
const providerAmount = grossAmount - feeAmount; // 1.9 PLY minor

// Get suggested params
const params = await algod.getTransactionParams().do();

// Transaction 1: Application Call
const appCallTxn = algosdk.makeApplicationNoOpTxnFromObject({
    from: userAccount.addr,
    appIndex: APP_ID,
    appArgs: [
        tickId,
        algosdk.encodeUint64(units),
        algosdk.encodeUint64(unitPrice),
        algosdk.encodeUint64(ASA_ID)
    ],
    suggestedParams: params
});

// Transaction 2: User → Provider
const providerTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: userAccount.addr,
    to: PROVIDER_ADDR, // From contract global state
    amount: providerAmount,
    assetIndex: ASA_ID,
    suggestedParams: params
});

// Transaction 3: User → Platform
const platformTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: userAccount.addr,
    to: PLATFORM_ADDR, // From contract global state
    amount: feeAmount,
    assetIndex: ASA_ID,
    suggestedParams: params
});

// Group transactions
const txnGroup = [appCallTxn, providerTxn, platformTxn];
algosdk.assignGroupID(txnGroup);

// Sign all transactions
const signedTxns = txnGroup.map(txn => txn.signTxn(userAccount.sk));

// Submit
const { txId } = await algod.sendRawTransaction(signedTxns).do();
await algosdk.waitForConfirmation(algod, txId, 4);

console.log('✅ Billing transaction successful!');
console.log('Transaction ID:', txId);
```

---

## 🔒 Security Features

### 1. Rate Validation

The contract enforces minimum and maximum rates:

```python
Assert(unit_price >= App.globalGet(MIN_RATE))
Assert(unit_price <= App.globalGet(MAX_RATE))
```

### 2. Idempotency

Each billing call includes a unique `tick_id`. The contract stores the last processed tick ID per user and rejects duplicates:

```python
last_tick = App.localGet(Txn.sender(), LAST_TICK_ID)
Assert(tick_id != last_tick)
App.localPut(Txn.sender(), LAST_TICK_ID, tick_id)
```

### 3. Atomicity

All three transactions are grouped. If any transaction fails, the entire group is rejected:

```python
Assert(Global.group_size() == Int(3))
```

### 4. Fee Calculation

Fees are calculated in the contract, preventing manipulation:

```python
fee_amount = (gross_amount * fee_pct) / Int(10000)
provider_amount = gross_amount - fee_amount
```

---

## 🧪 Testing

### 1. Compile Contract

```bash
python3 usage-contract.py
```

This generates:
- `usage_contract_approval.teal`
- `usage_contract_clear.teal`

### 2. Deploy to TestNet

```bash
# Set environment variables
export CREATOR_MNEMONIC="your_25_word_mnemonic"
export PROVIDER_ADDR="provider_testnet_address"
export PLATFORM_ADDR="platform_testnet_address"

# Run deployment script
chmod +x deploy-contract.sh
./deploy-contract.sh
```

Or manually:

```bash
goal app create \
  --creator CREATOR_ADDR \
  --approval-prog usage_contract_approval.teal \
  --clear-prog usage_contract_clear.teal \
  --global-byteslices 0 \
  --global-ints 5 \
  --local-byteslices 1 \
  --local-ints 0 \
  --app-arg addr:PROVIDER_ADDR \
  --app-arg addr:PLATFORM_ADDR \
  --app-arg int:500 \
  --app-arg int:1 \
  --app-arg int:1000 \
  --net testnet
```

### 3. Test Billing

Use the JavaScript example above or test with `goal`:

```bash
# User opt-in
goal app optin --app-id APP_ID --from USER_ADDR --net testnet

# Create and submit billing transaction group
# (Use SDK or goal for grouped transactions)
```

---

## 📊 Contract Limits

| Parameter | Value | Description |
|-----------|-------|-------------|
| Global Byteslices | 0 | No byte slices in global state |
| Global Integers | 5 | provider, platform, fee_pct, min_rate, max_rate |
| Local Byteslices | 1 | last_tick per user |
| Local Integers | 0 | No integers in local state |

---

## 🔄 Update Contract

Only the creator can update contract parameters:

```bash
goal app update \
  --app-id APP_ID \
  --from CREATOR_ADDR \
  --approval-prog usage_contract_approval.teal \
  --clear-prog usage_contract_clear.teal \
  --app-arg int:NEW_FEE_PCT \
  --app-arg int:NEW_MIN_RATE \
  --app-arg int:NEW_MAX_RATE \
  --net testnet
```

**Note:** In production, use multi-sig for contract updates.

---

## 📚 Related Documentation

- **SDK Structure:** [`../sdk-structure.md`](../sdk-structure.md)
- **POC Implementation:** [`../poc-implementation.md`](../poc-implementation.md)
- **Security Best Practices:** [`../security-best-practices.md`](../security-best-practices.md)
- **TestNet Tools:** [`../testnet-tools/README.md`](../testnet-tools/README.md)

---

## 🐛 Troubleshooting

### Common Issues

1. **"Transaction rejected: logic eval error"**
   - Check that `unit_price` is within `min_rate` and `max_rate`
   - Verify `tick_id` is unique (not used before)
   - Ensure all three transactions are properly grouped

2. **"Transaction rejected: insufficient balance"**
   - User must have enough PLY tokens
   - User must have opted in to the contract

3. **"Transaction rejected: invalid app args"**
   - Verify argument count (4 args: tick_id, units, unit_price, asa_id)
   - Check argument types (bytes, int, int, int)

---

## 🔄 Version History

**v1.0 (2025-11-04):**
- Initial implementation
- Basic billing functionality
- Fee distribution
- Idempotency checks
- Rate validation

---

**تاریخ آخرین به‌روزرسانی:** 2025-11-04  
**ورژن فعلی:** 1.0

