# 🔄 Play and Pay - Flow Diagrams & Operational Notes

**پروژه:** Pay as Play  
**تاریخ ایجاد:** 2025-11-04  
**آخرین به‌روزرسانی:** 2025-11-04  
**ورژن:** 1.0

---

## 📋 فهرست

- [User Payment Flow](#user-payment-flow)
- [Session Management Flow](#session-management-flow)
- [Wallet Connect Flow](#wallet-connect-flow)
- [ASA Creation & Opt-in Flow](#asa-creation--opt-in-flow)
- [Operational Notes](#operational-notes)

---

## 🎬 User Payment Flow

### Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Wallet
    participant Algorand
    participant SmartContract

    User->>Frontend: Click "Watch Now"
    Frontend->>Backend: POST /session/start
    Backend->>Backend: Create session record
    Backend-->>Frontend: sessionId, playbackToken
    
    Frontend->>Frontend: Start video player
    Frontend->>Frontend: Start heartbeat timer (15s)
    
    loop Every 15 seconds
        Frontend->>Backend: POST /session/tick
        Backend->>Backend: Calculate charge
        Backend->>Wallet: Request payment signature
        Wallet->>User: Show payment request
        User->>Wallet: Approve payment
        Wallet->>Algorand: Sign & send transaction
        Algorand->>SmartContract: Execute payment
        SmartContract-->>Algorand: Transfer PLY tokens
        Algorand-->>Backend: Transaction confirmed
        Backend-->>Frontend: Charge applied, new balance
        Frontend->>Frontend: Update UI (balance, charge)
    end
    
    User->>Frontend: Click "Stop"
    Frontend->>Backend: POST /session/stop
    Backend->>Backend: Finalize session
    Backend-->>Frontend: Summary (duration, total charge)
    Frontend->>User: Show usage summary
```

### Key Points

1. **Session Start:** Backend creates session, returns sessionId
2. **Heartbeat Loop:** Every 15 seconds, frontend sends tick
3. **Payment:** User signs transaction via wallet (not server)
4. **Confirmation:** Algorand confirms, backend updates balance
5. **Session Stop:** Final summary with total charge

---

## 🎮 Session Management Flow

### State Diagram

```mermaid
stateDiagram-v2
    [*] --> Idle: User ready
    
    Idle --> Starting: Click "Watch Now"
    Starting --> Active: Session created
    
    Active --> Ticking: Heartbeat (15s)
    Ticking --> Active: Payment confirmed
    Ticking --> LowBalance: Balance < threshold
    Ticking --> Active: Top-up completed
    
    Active --> Paused: User pauses
    Paused --> Active: User resumes
    Paused --> Stopped: User stops
    
    Active --> Stopped: User stops
    LowBalance --> Stopped: Auto-stop (optional)
    
    Stopped --> Summary: Show usage summary
    Summary --> Idle: Return to home
    Summary --> TopUp: User tops up
    TopUp --> Idle: Top-up complete
```

### Session States

- **Idle:** User browsing, no active session
- **Starting:** Session creation in progress
- **Active:** Video playing, billing active
- **Ticking:** Heartbeat sent, payment processing
- **Paused:** User paused, billing paused
- **LowBalance:** Balance below threshold
- **Stopped:** Session ended
- **Summary:** Showing usage summary

---

## 🔐 Wallet Connect Flow

### Connection Sequence

```mermaid
sequenceDiagram
    participant User
    participant App
    participant PeraWallet
    participant Algorand

    User->>App: Click "Connect Wallet"
    App->>PeraWallet: Initialize connection
    PeraWallet->>User: Show QR code / deep link
    User->>PeraWallet: Approve connection (mobile)
    PeraWallet-->>App: Connected accounts
    App->>Algorand: Fetch account info
    Algorand-->>App: Balance, assets
    
    Note over App,Algorand: User is now connected
    
    App->>App: Create payment transaction
    App->>PeraWallet: Request signature
    PeraWallet->>User: Show payment approval
    User->>PeraWallet: Approve payment
    PeraWallet->>Algorand: Sign & send transaction
    Algorand-->>App: Transaction confirmed
    App->>App: Update balance
```

### Security Benefits

- ✅ **No Server-Side Keys:** User signs with their wallet
- ✅ **User Control:** User approves every transaction
- ✅ **Transparency:** All transactions visible on blockchain
- ✅ **Security:** Private keys never leave user's device

---

## 🪙 ASA Creation & Opt-in Flow

### Creation Process

```mermaid
sequenceDiagram
    participant Developer
    participant CLI
    participant Algorand
    participant Config

    Developer->>CLI: node asa-create.js
    CLI->>Algorand: Create ASA transaction
    Algorand->>Algorand: Process transaction
    Algorand-->>CLI: Asset ID returned
    CLI->>Config: Update playandpay.config.json
    CLI-->>Developer: ASA created (Asset ID: 1234567)
    
    Note over Developer,Algorand: ASA is now live on TestNet
```

### Opt-in Process

```mermaid
sequenceDiagram
    participant User
    participant CLI/Wallet
    participant Algorand

    User->>CLI/Wallet: Opt-in to ASA
    CLI/Wallet->>Algorand: Transfer 0 assets to self
    Algorand->>Algorand: Process opt-in
    Algorand-->>CLI/Wallet: Opt-in confirmed
    CLI/Wallet-->>User: Ready to receive PLY
    
    Note over User,Algorand: User can now receive PLY tokens
```

### Steps for Developers

1. **Create ASA:**
   ```bash
   CREATOR_MNEMONIC="..." node asa-create.js
   ```

2. **Update Config:**
   ```json
   {
     "asa_id": "1234567"
   }
   ```

3. **Opt-in Users:**
   ```bash
   USER_MNEMONIC="..." ASA_ID=1234567 node opt-in.js
   ```

4. **Opt-in Providers:**
   ```bash
   PROVIDER_MNEMONIC="..." ASA_ID=1234567 node opt-in.js
   ```

---

## 📝 Operational Notes

### Development Workflow

#### 1. Setup TestNet Environment

```bash
# Install dependencies
npm install algosdk dotenv

# Create .env file
CREATOR_MNEMONIC="your 25-word mnemonic"
USER_MNEMONIC="user test mnemonic"
PROVIDER_MNEMONIC="provider test mnemonic"
ASA_ID=1234567
```

#### 2. Create ASA (One-time)

```bash
# Run ASA creation script
CREATOR_MNEMONIC="..." node asa-create.js

# Output:
# Asset ID: 1234567
# Unit: PLY
# 1 PLY = €0.01
```

#### 3. Opt-in Accounts

```bash
# User opt-in
USER_MNEMONIC="..." ASA_ID=1234567 node opt-in.js

# Provider opt-in
PROVIDER_MNEMONIC="..." ASA_ID=1234567 node opt-in.js
```

#### 4. Fund Test Accounts

- Get TestNet ALGO from: https://bank.testnet.algorand.network/
- Each account needs ~0.1 ALGO for transactions

#### 5. Frontend Integration

```jsx
// Use WalletConnect component
import WalletConnectDemo from './walletconnect-demo';

<WalletConnectDemo 
  asaId={1234567} 
  providerAddr="PROVIDER_ADDR"
  ratePerMinute={0.02}
/>
```

### Security Checklist

- [ ] ✅ Never commit mnemonics to repository
- [ ] ✅ Use environment variables for secrets
- [ ] ✅ Use WalletConnect for user signatures (not server-side)
- [ ] ✅ Test on TestNet before MainNet
- [ ] ✅ Verify ASA ID in config file
- [ ] ✅ Ensure all accounts are opted in
- [ ] ✅ Monitor transaction fees
- [ ] ✅ Implement proper error handling

### Common Issues & Solutions

#### Issue: "Account not opted in"

**Solution:**
```bash
# Run opt-in script
USER_MNEMONIC="..." ASA_ID=1234567 node opt-in.js
```

#### Issue: "Insufficient balance"

**Solution:**
- Get TestNet ALGO from faucet
- Check account has enough ALGO for transaction fees (~0.001 ALGO per transaction)

#### Issue: "Transaction failed"

**Solution:**
- Check account balance (ALGO and PLY)
- Verify ASA ID is correct
- Ensure account is opted in
- Check network connectivity

### Testing Checklist

- [ ] ✅ Create ASA on TestNet
- [ ] ✅ Opt-in user account
- [ ] ✅ Opt-in provider account
- [ ] ✅ Connect wallet via WalletConnect
- [ ] ✅ Fetch balance
- [ ] ✅ Send test payment
- [ ] ✅ Verify transaction on AlgoExplorer
- [ ] ✅ Test session start/stop
- [ ] ✅ Test heartbeat/tick flow
- [ ] ✅ Test low balance handling

---

## 🔗 Related Documentation

- **SDK Structure:** [`../sdk-structure.md`](../sdk-structure.md)
- **POC Implementation:** [`../poc-implementation.md`](../poc-implementation.md)
- **Security Best Practices:** [`../security-best-practices.md`](../security-best-practices.md)

---

## 🔄 به‌روزرسانی‌ها

**2025-11-04 - ورژن 1.0:**
- ایجاد فایل اولیه
- اضافه کردن User Payment Flow diagram
- اضافه کردن Session Management Flow diagram
- اضافه کردن Wallet Connect Flow diagram
- اضافه کردن ASA Creation & Opt-in Flow diagram
- اضافه کردن Operational Notes
- اضافه کردن Security Checklist
- اضافه کردن Common Issues & Solutions
- اضافه کردن Testing Checklist

---

**تاریخ آخرین به‌روزرسانی:** 2025-11-04  
**ورژن فعلی:** 1.0

