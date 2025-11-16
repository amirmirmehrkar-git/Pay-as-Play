# 🚀 POC Implementation — Core Functionalities (Algorand)

**پروژه:** Pay as Play  
**تاریخ ایجاد:** 2025-11-04  
**آخرین به‌روزرسانی:** 2025-11-04  
**ورژن:** 1.0

---

## 📋 فهرست

- [Overview](#overview)
- [Core Functionality 1: Real-Time Micro-Payments Engine](#core-functionality-1-real-time-micro-payments-engine)
- [Core Functionality 2: Wallet & Transparent Settlement System](#core-functionality-2-wallet--transparent-settlement-system)
- [Implementation Tools & Stack](#implementation-tools--stack)
- [Acceptance Criteria](#acceptance-criteria)
- [Technical Architecture](#technical-architecture)

---

## 🎯 Overview

Our POC integrates two core functionalities on the Algorand blockchain:

1. **Real-Time Micro-Payments Engine** — Automated per-second/minute billing using Algorand Smart Contracts
2. **Wallet & Transparent Settlement System** — ASA-based wallets with automated settlement

**هدف POC:**
پیاده‌سازی و تست دو عملکرد اصلی پلتفرم بر روی بلاکچین Algorand برای اثبات امکان‌سنجی و عملکرد سیستم.

---

## ⚡ Core Functionality 1: Real-Time Micro-Payments Engine

### Mechanism

An Algorand ASC1 "Usage Contract" meters playback and triggers per-tick charges (e.g., every 5–15s, or per minute).

**مکانیزم:**
یک قرارداد هوشمند Algorand (ASC1) با نام "Usage Contract" پخش را اندازه‌گیری می‌کند و برای هر تیک (مثلاً هر 5-15 ثانیه یا هر دقیقه) هزینه‌ای را فعال می‌کند.

### Flow

```
Player → Session Heartbeat → Backend Validates Usage → Signs & Submits Grouped Transaction
                                                              ↓
                                    (User → Provider) + (User → Platform Fee)
```

**جریان کار:**

1. **Player:** پخش محتوا شروع می‌شود
2. **Session Heartbeat:** هر چند ثانیه یک بار سیگنال به Backend ارسال می‌شود
3. **Backend Validates Usage:** Backend استفاده را اعتبارسنجی می‌کند
4. **Signs & Submits:** تراکنش گروهی امضا و ارسال می‌شود:
   - تراکنش 1: کاربر → ارائه‌دهنده محتوا
   - تراکنش 2: کاربر → کارمزد پلتفرم

### Key Features

- **Automated Billing:** محاسبه خودکار هزینه بر اساس ثانیه/دقیقه
- **Real-Time Deduction:** کسر فوری از کیف پول کاربر
- **Instant Settlement:** تسویه فوری به ارائه‌دهنده
- **Transparent Accounting:** حسابداری شفاف و قابل بررسی

### Guarantees

✅ **Instant Settlement** — تسویه فوری  
✅ **Auditable Usage Ledger** — دفتر استفاده قابل حسابرسی  
✅ **Fair "Pay Only for What's Watched"** — پرداخت فقط برای آنچه تماشا شده

---

## 💰 Core Functionality 2: Wallet & Transparent Settlement System

### Wallets

**ASA-based balances (PlayCoin/PLY) per user and partner**

- هر کاربر و شریک یک کیف پول مبتنی بر ASA دارد
- موجودی به صورت PlayCoin (PLY) نگهداری می‌شود
- پشتیبانی از شارژ فیات → تبدیل به PLY

**Wallet Structure:**
```
User Wallet:
  - Balance: PLY tokens (ASA)
  - Transactions: On-chain records
  - Top-ups: Fiat → PLY conversion

Partner Wallet:
  - Balance: PLY tokens (ASA)
  - Revenue: Auto-settled from user payments
  - Transactions: On-chain records
```

### Ledger

**On-chain Transactions:**
- تراکنش‌های مالی در بلاکچین Algorand ثبت می‌شوند
- هر تراکنش دارای Block ID و Transaction ID است
- قابل بررسی و حسابرسی

**Off-chain Session Table:**
- جدول جلسات برای اثبات استفاده
- ذخیره‌سازی در PostgreSQL
- شامل: User ID, Content ID, Start Time, End Time, Duration, Amount

**Periodic Reconciliation Job:**
- کار تطبیق دوره‌ای برای هماهنگ‌سازی On-chain و Off-chain
- شناسایی و رفع هرگونه عدم تطابق

### Auto-Settlement

**ASC1 Smart Contract or Scheduled Backend Job**

- تجمیع میکرو-تیک‌ها
- تقسیم خودکار کارمزد و حق‌الامتیاز
- تسویه خودکار به ارائه‌دهندگان

**Settlement Flow:**
```
Micro-payments (per tick) → Aggregation → Fee Split Calculation
                                              ↓
                        Provider Revenue + Platform Fee
```

---

## 🛠️ Implementation Tools & Stack

### Blockchain
- **Platform:** Algorand
- **Smart Contracts:** Algorand Smart Contracts (ASC1)
- **Asset Type:** Algorand Standard Asset (ASA)
- **SDK:** Algorand SDK (JavaScript/Python)

### Frontend
- **Framework:** React.js
- **Components:**
  - User Dashboard (consumption tracking, spending reports)
  - Partner Analytics Dashboard (revenue, engagement metrics)
- **State Management:** React Context / Redux
- **API Integration:** Axios / Fetch

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **API Gateway:** RESTful API
- **Algorand Integration:** Algorand SDK for:
  - Micro-payments processing
  - Wallet management
  - Transaction signing and submission

### Database
- **Type:** PostgreSQL
- **Purpose:** Off-chain session tracking
- **Tables:**
  - `sessions` — User playback sessions
  - `transactions` — Transaction records (with on-chain references)
  - `wallets` — Wallet balances and metadata
  - `settlements` — Settlement records

### Integration Points

**Algorand SDK Usage:**
- Wallet creation and management
- ASA (PlayCoin) transfers
- Smart contract interaction
- Transaction signing
- Block and transaction queries

---

## ✅ Acceptance Criteria

### Real-Time Micro-Payments Engine

#### 1. Tick Billing Accuracy
**Criterion:** ≤ 1 billing interval (e.g., ≤ 15s drift)

**Description:**
دقت صورتحساب تیک باید در محدوده یک بازه صورتحساب باشد. به عنوان مثال، اگر بازه صورتحساب 15 ثانیه است، خطا نباید بیشتر از 15 ثانیه باشد.

**Test:**
- Start playback session
- Monitor tick intervals
- Verify billing accuracy within tolerance

#### 2. End-to-End Transaction Confirmation Time
**Criterion:** < 5s at P95

**Description:**
زمان تایید تراکنش از ابتدا تا انتها باید کمتر از 5 ثانیه در 95 درصد موارد باشد.

**Test:**
- Measure transaction submission → confirmation time
- Collect 100 samples
- Verify P95 < 5s

#### 3. Idempotent Billing
**Criterion:** No double-charge on retries

**Description:**
صورتحساب باید Idempotent باشد — در صورت تکرار درخواست، نباید دو بار هزینه کسر شود.

**Test:**
- Simulate retry scenarios
- Verify single charge per tick
- Check transaction deduplication

---

### Wallet & Transparent Settlement System

#### 1. Reconciliation Job
**Criterion:** Catches any off-chain/on-chain mismatch and emits repair transaction set

**Description:**
کار تطبیق باید هرگونه عدم تطابق بین Off-chain و On-chain را شناسایی کند و مجموعه تراکنش‌های تعمیر را ایجاد کند.

**Test:**
- Create intentional mismatch
- Run reconciliation job
- Verify repair transactions generated

#### 2. Exportable Statements
**Criterion:** Exportable CSV/JSON statements per user/partner with block IDs and transaction IDs

**Description:**
گزارش‌های قابل خروجی (CSV/JSON) برای هر کاربر/شریک باید شامل Block ID و Transaction ID باشد.

**Test:**
- Generate user statement
- Generate partner statement
- Verify CSV/JSON format
- Verify block IDs and transaction IDs included

---

## 🏗️ Technical Architecture

### System Components

```
┌─────────────────┐
│   React Frontend │
│  (User Dashboard)│
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│  Express Backend │
│   (API Gateway)  │
└────────┬─────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌─────────┐ ┌──────────────┐
│PostgreSQL│ │ Algorand SDK │
│ (Off-chain)│ │  (On-chain)  │
└─────────┘ └──────┬───────┘
                   │
                   ▼
            ┌──────────────┐
            │   Algorand    │
            │  Blockchain   │
            └──────────────┘
```

### Data Flow

**1. Playback Session Start:**
```
User → Frontend → Backend API → Create Session (PostgreSQL)
                                    ↓
                            Initialize Usage Contract (ASC1)
```

**2. Tick Billing:**
```
Player Heartbeat → Backend → Validate Usage → Calculate Amount
                                    ↓
                            Sign Transaction (Algorand SDK)
                                    ↓
                            Submit Grouped TX:
                              - User → Provider
                              - User → Platform Fee
                                    ↓
                            Update Session (PostgreSQL)
```

**3. Settlement:**
```
Periodic Job → Aggregate Micro-payments → Calculate Fee Split
                                    ↓
                            Execute Settlement TX
                                    ↓
                            Update Partner Balance
                                    ↓
                            Record Settlement (PostgreSQL)
```

---

## 📊 Performance Requirements

### Transaction Throughput
- **Target:** Support 1000+ concurrent sessions
- **Billing Interval:** 5-15 seconds per tick
- **Transaction Rate:** ~200-300 transactions per minute

### Latency
- **Tick Processing:** < 1 second
- **Transaction Confirmation:** < 5 seconds (P95)
- **Dashboard Updates:** < 2 seconds

### Scalability
- **Horizontal Scaling:** Backend API can scale horizontally
- **Database:** PostgreSQL with connection pooling
- **Blockchain:** Algorand handles high throughput natively

---

## 🔒 Security Considerations

### Smart Contract Security
- **Code Review:** All ASC1 contracts reviewed
- **Testing:** Comprehensive unit and integration tests
- **Audit:** External security audit before production

### Wallet Security
- **Private Key Management:** Secure key storage (HSM or secure vault)
- **Transaction Signing:** Server-side signing with secure key management
- **Multi-signature:** Support for multi-sig wallets (future)

### Data Security
- **Encryption:** Sensitive data encrypted at rest
- **Access Control:** Role-based access control (RBAC)
- **Audit Logs:** All operations logged for audit

---

## 🧪 Testing Strategy

### Unit Tests
- Smart contract logic
- Billing calculation
- Settlement logic
- Reconciliation logic

### Integration Tests
- End-to-end payment flow
- Wallet operations
- Settlement process
- Reconciliation process

### Performance Tests
- Load testing (1000+ concurrent sessions)
- Stress testing
- Transaction throughput testing

### Security Tests
- Penetration testing
- Smart contract vulnerability scanning
- Access control testing

---

## 📝 Implementation Checklist

### Phase 1: Core Setup
- [ ] Algorand TestNet connection
- [ ] PlayCoin (PLY) ASA creation
- [ ] Smart contract deployment (Usage Contract)
- [ ] Database schema setup
- [ ] Backend API structure

### Phase 2: Micro-Payments Engine
- [ ] Session heartbeat mechanism
- [ ] Tick billing logic
- [ ] Transaction signing and submission
- [ ] Idempotency handling
- [ ] Error handling and retries

### Phase 3: Wallet System
- [ ] Wallet creation (user/partner)
- [ ] Balance tracking
- [ ] Top-up mechanism (fiat → PLY)
- [ ] Transaction history
- [ ] Statement generation

### Phase 4: Settlement System
- [ ] Settlement aggregation logic
- [ ] Fee split calculation
- [ ] Auto-settlement execution
- [ ] Reconciliation job
- [ ] Reporting and exports

### Phase 5: Testing & Validation
- [ ] Unit tests
- [ ] Integration tests
- [ ] Performance tests
- [ ] Acceptance criteria validation
- [ ] Security audit

---

## 📚 Related Documentation

- **Product Overview:** [`../project-context/product-overview.md`](../project-context/product-overview.md)
- **POC Wireframe & Flows:** [`poc-wireframe-flows.md`](./poc-wireframe-flows.md)
- **Tech Stack:** [`tech-stack.md`](./tech-stack.md)
- **API Specs:** [`api-specs.md`](./api-specs.md)
- **Make Automation Flows:** [`make-automation-flows.md`](./make-automation-flows.md)

---

## 🔄 به‌روزرسانی‌ها

**2025-11-04 - ورژن 1.0:**
- ایجاد فایل اولیه
- مستندسازی Real-Time Micro-Payments Engine
- مستندسازی Wallet & Transparent Settlement System
- مستندسازی Implementation Tools & Stack
- اضافه کردن Acceptance Criteria
- اضافه کردن Technical Architecture
- اضافه کردن Performance Requirements
- اضافه کردن Security Considerations
- اضافه کردن Testing Strategy
- اضافه کردن Implementation Checklist

---

**تاریخ آخرین به‌روزرسانی:** 2025-11-04  
**ورژن فعلی:** 1.0

