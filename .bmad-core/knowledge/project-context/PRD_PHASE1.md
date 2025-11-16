# 📋 Product Requirements Document (PRD) — Phase 1
## Play and Pay — Pay-as-you-Use Platform

**پروژه:** Play and Pay  
**فاز:** Phase 1 — POC (Proof of Concept)  
**تاریخ ایجاد:** 2025-11-16  
**آخرین به‌روزرسانی:** 2025-11-16  
**ورژن:** 1.0  
**وضعیت:** 🟢 Active

---

## 📋 فهرست

- [Overview](#overview)
- [Goals & Objectives](#goals--objectives)
- [Scope](#scope)
- [User Stories](#user-stories)
- [Technical Requirements](#technical-requirements)
- [Acceptance Criteria](#acceptance-criteria)
- [Success Metrics](#success-metrics)
- [Timeline & Milestones](#timeline--milestones)
- [Dependencies & Risks](#dependencies--risks)

---

## 🎯 Overview

### Product Vision

**Play and Pay** یک پلتفرم Pay-as-you-Use برای محتوای دیجیتال است که بر روی بلاکچین Algorand ساخته شده است. کاربران فقط برای محتوایی که واقعاً تماشا یا گوش می‌کنند پرداخت می‌کنند — بدون اشتراک ثابت، بدون تبلیغ، با شفافیت کامل.

### Phase 1 Goal

**هدف Phase 1:** پیاده‌سازی و تست POC (Proof of Concept) بر روی Algorand TestNet برای اثبات امکان‌سنجی و عملکرد سیستم.

**Duration:** 4-6 هفته  
**Target:** TestNet Deployment

---

## 🎯 Goals & Objectives

### Primary Goals

1. ✅ **Smart Contract Deployment**
   - Deploy UsageContract به Algorand TestNet
   - تست Billing Logic
   - تست Fee Distribution

2. ✅ **Core SDK Implementation**
   - Wallet Manager (Balance, Transfer)
   - Billing Engine (Start, Tick, Stop)
   - Analytics Client (Basic Reports)

3. ✅ **WalletConnect Integration**
   - اتصال Pera Wallet
   - User-side Transaction Signing
   - حذف Server-side Mnemonics

4. ✅ **End-to-End Testing**
   - تست کامل Flow از Start تا Stop
   - تست تراکنش‌های واقعی روی TestNet
   - تست Idempotency

### Success Criteria

- [ ] Smart Contract deployed و functional
- [ ] Core SDK functional و tested
- [ ] WalletConnect working
- [ ] Can create session
- [ ] Can send ticks
- [ ] Can stop session
- [ ] Transactions visible on AlgoExplorer
- [ ] No double-charges (Idempotency verified)

---

## 📦 Scope

### In Scope (Phase 1)

#### 1. Smart Contract (ASC1)
- ✅ UsageContract implementation
- ✅ Per-minute billing logic
- ✅ Fee distribution (Provider + Platform)
- ✅ Idempotency checks
- ✅ Rate validation

#### 2. Core SDK
- ✅ Wallet Manager
  - Get balance
  - Transfer tokens
  - Check opt-in
  - Transaction history
- ✅ Billing Engine
  - Start session
  - Send tick (per minute)
  - Stop session
  - Session management
- ✅ Analytics Client
  - User reports
  - Session reports
  - Basic statistics

#### 3. WalletConnect Integration
- ✅ Pera Wallet connection
- ✅ User transaction signing
- ✅ Remove server-side mnemonic dependency

#### 4. TestNet Tools
- ✅ ASA creation script
- ✅ Opt-in script
- ✅ Test scripts
- ✅ Developer onboarding guide

### Out of Scope (Phase 1)

- ❌ MainNet deployment
- ❌ WordPress Plugin (Phase 2)
- ❌ React Components (Phase 2)
- ❌ Node.js Server (Phase 2)
- ❌ Production Database (Phase 2)
- ❌ Advanced Analytics (Phase 2)
- ❌ Multi-language Support (Phase 2)
- ❌ Production Security Audit (Phase 3)

---

## 👥 User Stories

### Story 1: Developer — Deploy Smart Contract

**As a** Developer  
**I want to** deploy UsageContract to Algorand TestNet  
**So that** I can test billing functionality

**Acceptance Criteria:**
- [ ] Contract compiles successfully
- [ ] Contract deploys to TestNet
- [ ] Contract App ID is recorded
- [ ] Contract parameters are set correctly

**Priority:** 🔴 Critical  
**Story Points:** 5

---

### Story 2: Developer — Create ASA (PlayCoin)

**As a** Developer  
**I want to** create PlayCoin ASA on TestNet  
**So that** I can use it for testing

**Acceptance Criteria:**
- [ ] ASA created successfully
- [ ] ASA ID is recorded
- [ ] ASA parameters are correct (name, supply, decimals)
- [ ] Creator account has opt-in

**Priority:** 🔴 Critical  
**Story Points:** 3

---

### Story 3: User — Connect Wallet

**As a** User  
**I want to** connect my Pera Wallet  
**So that** I can sign transactions

**Acceptance Criteria:**
- [ ] Can connect Pera Wallet
- [ ] Wallet address is displayed
- [ ] Can disconnect wallet
- [ ] Connection persists across sessions

**Priority:** 🔴 Critical  
**Story Points:** 5

---

### Story 4: User — View Balance

**As a** User  
**I want to** view my PlayCoin balance  
**So that** I know how much I can spend

**Acceptance Criteria:**
- [ ] Balance is displayed correctly
- [ ] Balance updates in real-time
- [ ] Balance shows in PLY and EUR equivalent
- [ ] Works in demo mode

**Priority:** 🟡 Medium  
**Story Points:** 3

---

### Story 5: User — Start Session

**As a** User  
**I want to** start a viewing session  
**So that** I can watch content and be billed

**Acceptance Criteria:**
- [ ] Can start session with contentId
- [ ] Session ID is returned
- [ ] Session is tracked
- [ ] Can start multiple sessions (different content)

**Priority:** 🔴 Critical  
**Story Points:** 5

---

### Story 6: User — Send Tick (Billing)

**As a** User  
**I want to** be billed per minute of viewing  
**So that** I pay only for what I watch

**Acceptance Criteria:**
- [ ] Tick is sent every minute (or configurable interval)
- [ ] Charge is calculated correctly
- [ ] Transaction is submitted to blockchain
- [ ] Transaction is confirmed
- [ ] Balance is updated
- [ ] No double-charges (Idempotency)

**Priority:** 🔴 Critical  
**Story Points:** 8

---

### Story 7: User — Stop Session

**As a** User  
**I want to** stop a viewing session  
**So that** billing stops

**Acceptance Criteria:**
- [ ] Can stop active session
- [ ] Session summary is returned
- [ ] Total charge is displayed
- [ ] Session is marked as stopped

**Priority:** 🔴 Critical  
**Story Points:** 3

---

### Story 8: Developer — View Analytics

**As a** Developer  
**I want to** view session analytics  
**So that** I can monitor usage

**Acceptance Criteria:**
- [ ] Can view user sessions
- [ ] Can view total charges
- [ ] Can view session duration
- [ ] Can export data (CSV/JSON)

**Priority:** 🟢 Low  
**Story Points:** 5

---

## 🔧 Technical Requirements

### 1. Smart Contract (ASC1)

**Technology:** PyTeal  
**Network:** Algorand TestNet  
**Language:** Python 3.8+

**Requirements:**
- UsageContract implementation
- Per-minute billing logic
- Fee distribution (Provider + Platform)
- Idempotency checks (tick_id)
- Rate validation (min/max)

**Files:**
- `smart-contracts/usage-contract.py`
- `smart-contracts/deploy-contract.sh`
- `smart-contracts/test-contract.js`

---

### 2. Core SDK

**Technology:** JavaScript (ES Modules)  
**Package:** `@playandpay/sdk`  
**Dependencies:** `algosdk`

**Modules:**
- `config.js` — Configuration management
- `wallet.js` — Wallet operations
- `billing.js` — Billing engine
- `analytics.js` — Analytics client
- `api.js` — API wrapper
- `auth.js` — Authentication
- `utils.js` — Utilities

**Files:**
- `playandpay-sdk/src/index.js`
- `playandpay-sdk/src/wallet.js`
- `playandpay-sdk/src/billing.js`
- `playandpay-sdk/src/analytics.js`

---

### 3. WalletConnect Integration

**Technology:** React + Pera Wallet  
**Package:** `@perawallet/connect`

**Requirements:**
- Connect Pera Wallet
- Sign transactions
- Handle disconnection
- Error handling

**Files:**
- `testnet-tools/walletconnect-demo.jsx`

---

### 4. TestNet Tools

**Scripts:**
- `asa-create.js` — Create ASA
- `opt-in.js` — Opt-in to ASA
- `test-contract.js` — Test contract
- `flow-diagram.md` — Flow diagrams

---

## ✅ Acceptance Criteria

### Smart Contract

- [ ] Contract compiles without errors
- [ ] Contract deploys to TestNet
- [ ] Contract accepts billing transactions
- [ ] Fee distribution works correctly
- [ ] Idempotency prevents double-charges
- [ ] Rate validation works

### Core SDK

- [ ] SDK can be installed via npm
- [ ] SDK can connect to TestNet
- [ ] Wallet operations work (balance, transfer)
- [ ] Billing operations work (start, tick, stop)
- [ ] Analytics operations work (reports)
- [ ] Demo mode works when config is missing

### WalletConnect

- [ ] Can connect Pera Wallet
- [ ] Can sign transactions
- [ ] Transactions are submitted correctly
- [ ] Error handling works

### End-to-End

- [ ] Can create ASA
- [ ] Can opt-in to ASA
- [ ] Can start session
- [ ] Can send ticks
- [ ] Can stop session
- [ ] Transactions visible on AlgoExplorer
- [ ] No double-charges

---

## 📊 Success Metrics

### Technical Metrics

- **Contract Deployment:** ✅ Deployed to TestNet
- **Transaction Success Rate:** > 95%
- **Transaction Confirmation Time:** < 5 seconds (P95)
- **Idempotency:** 100% (no double-charges)
- **SDK Test Coverage:** > 80%

### Business Metrics

- **POC Completion:** ✅ Complete
- **Developer Onboarding:** < 30 minutes
- **TestNet Transactions:** > 100 successful transactions
- **Documentation:** Complete

---

## 📅 Timeline & Milestones

### Week 1-2: Smart Contract

**Milestone 1:** Smart Contract Deployed
- [ ] Contract code complete
- [ ] Contract compiled
- [ ] Contract deployed to TestNet
- [ ] Contract tested

**Deliverables:**
- `usage-contract.py`
- `usage_contract_approval.teal`
- `usage_contract_clear.teal`
- Deployed App ID

---

### Week 2-3: Core SDK

**Milestone 2:** Core SDK Functional
- [ ] Wallet Manager complete
- [ ] Billing Engine complete
- [ ] Analytics Client complete
- [ ] SDK tested

**Deliverables:**
- `playandpay-sdk/` package
- Test scripts
- Documentation

---

### Week 3-4: WalletConnect Integration

**Milestone 3:** WalletConnect Working
- [ ] Pera Wallet integrated
- [ ] User signing works
- [ ] Server-side mnemonic removed
- [ ] Tested

**Deliverables:**
- `walletconnect-demo.jsx`
- Integration guide

---

### Week 4-6: Testing & Documentation

**Milestone 4:** POC Complete
- [ ] End-to-end testing
- [ ] Documentation complete
- [ ] Developer onboarding guide
- [ ] TestNet transactions verified

**Deliverables:**
- Test results
- Documentation
- Onboarding guide

---

## 🔗 Dependencies & Risks

### Dependencies

1. **Algorand TestNet**
   - Availability: ✅ Available
   - Risk: Low

2. **Pera Wallet**
   - Availability: ✅ Available
   - Risk: Low

3. **Algorand SDK**
   - Availability: ✅ Available
   - Risk: Low

### Risks

1. **TestNet Stability**
   - **Risk:** Network issues
   - **Mitigation:** Use multiple nodes, retry logic

2. **Smart Contract Bugs**
   - **Risk:** Logic errors
   - **Mitigation:** Extensive testing, code review

3. **WalletConnect Compatibility**
   - **Risk:** Compatibility issues
   - **Mitigation:** Test with multiple wallets

4. **Timeline**
   - **Risk:** Delays
   - **Mitigation:** Buffer time, prioritize critical features

---

## 📚 Related Documentation

- **Project Overview:** [`product-overview.md`](./product-overview.md)
- **Technical Architecture:** [`../technical/architecture.md`](../technical/architecture.md)
- **POC Implementation:** [`../technical/poc-implementation.md`](../technical/poc-implementation.md)
- **SDK Structure:** [`../technical/sdk-structure.md`](../technical/sdk-structure.md)
- **Developer Onboarding:** [`../technical/testnet-tools/FULL_DEVELOPER_ONBOARDING.md`](../technical/testnet-tools/FULL_DEVELOPER_ONBOARDING.md)

---

## 🔄 به‌روزرسانی‌ها

**2025-11-16 - ورژن 1.0:**
- ایجاد PRD Phase 1
- تعریف Goals & Objectives
- تعریف Scope
- تعریف User Stories
- تعریف Technical Requirements
- تعریف Acceptance Criteria
- تعریف Timeline & Milestones

---

**تاریخ آخرین به‌روزرسانی:** 2025-11-16  
**ورژن فعلی:** 1.0  
**وضعیت:** 🟢 Active

