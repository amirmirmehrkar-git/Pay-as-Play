# 🎨 POC Wireframe & User Flows

**پروژه:** Pay as Play  
**تاریخ ایجاد:** 2025-11-04  
**آخرین به‌روزرسانی:** 2025-11-04  
**ورژن:** 1.0

---

## 📋 فهرست

- [Overview](#overview)
- [End-User Experience Flow](#end-user-experience-flow)
- [Partner Dashboard Flow](#partner-dashboard-flow)
- [Wireframe-to-Functionality Mapping](#wireframe-to-functionality-mapping)
- [Player ↔ Billing Sequence](#player--billing-sequence)
- [Smart Contract Design](#smart-contract-design)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Security & Compliance](#security--compliance)

---

## 🎯 Overview

This document maps the wireframe screens to the technical implementation, showing how user interactions connect to Algorand smart contracts, backend APIs, and database operations.

**هدف:**
نقشه‌برداری صفحات Wireframe به پیاده‌سازی فنی و نشان دادن چگونگی اتصال تعاملات کاربر به قراردادهای هوشمند Algorand، APIهای Backend و عملیات دیتابیس.

---

## 🟦 End-User Experience Flow

### Screen 1: Home / Content Selection

**Wireframe Elements:**
- Header: App name + Wallet balance (e.g., "€4.80")
- Content tiles: "Watch", "Listen", "Learn"
- Each tile shows:
  - Title
  - Price per minute (e.g., "€0.02/min")
  - "Start Now" button

**Technical Implementation:**
- **Frontend:** React component displays content list
- **Backend:** `GET /v1/contents` returns available content with pricing
- **Blockchain:** Reads user's PLY balance via Algorand SDK
- **Database:** Queries `contents` table for available content

**Flow:** User clicks "Start Now" → Navigate to "Live Session" screen

---

### Screen 2: Live Session (Active Consumption)

**Wireframe Elements:**
- Timer counting real usage (e.g., "03:12 minutes")
- Current charge: "€0.06 charged so far"
- "Pause" or "Stop" buttons
- Minimalist UI for content (placeholder image/video/podcast frame)

**Technical Implementation:**
- **Frontend:** React component with timer and charge display
- **Backend:** `POST /v1/sessions/:id/heartbeat` receives tick updates
- **Blockchain:** Smart contract "Usage Contract" deducts PLY tokens every billing interval
- **Database:** Updates `heartbeats` table with tick data

**Flow:** On "Stop" → Navigate to "Usage Summary"

**Real-Time Billing:**
```
Player ──heartbeats──> [API Gateway]
  │                         │
  │                   verifies session, rate, signature
  │                         │
  │                    builds grouped tx (user→provider, fee)
  │                         │
  └──── progress UI <── [Billing Engine] ──> Algorand Node/Indexer
                            │
                       PostgreSQL
                    (Sessions, ticks, webhooks)
```

---

### Screen 3: Usage Summary / Transaction Confirmation

**Wireframe Elements:**
- "You watched for 12 minutes."
- "Total charge: €0.24"
- "Remaining wallet balance: €4.56"
- Buttons: "Add Credit" | "Back to Home"

**Technical Implementation:**
- **Frontend:** React component aggregates session data
- **Backend:** `GET /v1/sessions/:id/summary` returns session totals
- **Blockchain:** Aggregates on-chain microtransactions or reads from off-chain session table
- **Database:** Queries `sessions` and `heartbeats` tables

**Flow:** If wallet < threshold → Auto top-up popup appears

---

### Screen 4: Add Credit (Wallet Top-Up)

**Wireframe Elements:**
- Input field: "Add € / Select Crypto"
- Buttons: "Pay with Card", "Pay with Wallet", "Crypto Option"
- Confirmation popup: "Credit added successfully."

**Technical Implementation:**
- **Frontend:** React form component
- **Backend:** `POST /v1/wallets/topup/fiat-intent` creates payment intent
- **Blockchain:** Fiat on-ramp → swap to PLY ASA. Crypto direct transfer via ASA transaction
- **Database:** Updates `wallet_balances` table

**Flow:** On confirmation → Credit added → Return to Home

---

### Low Balance Alert

**Wireframe Elements:**
- Alert box: "Low balance. Add credit to continue watching"
- Appears during playback when balance < threshold

**Technical Implementation:**
- **Frontend:** React alert component
- **Backend:** Checks balance before each tick
- **Blockchain:** Contract call "insufficient balance" check
- **Database:** Reads `wallet_balances` table

**Flow:** User clicks "Add Credit" → Navigate to Add Credit screen

---

## 🟩 Partner Dashboard Flow

### Screen 1: Partner Dashboard (Home)

**Wireframe Elements:**
- Header: "Welcome, Laura's Streaming Platform"
- Cards showing:
  - Active Users Today: 1,248
  - Total Revenue (Month): €2,340
  - Average Session Time: 11.3 min
- CTA Button: "View Detailed Analytics"

**Technical Implementation:**
- **Frontend:** React dashboard component
- **Backend:** `GET /v1/reports/partner` returns aggregated metrics
- **Blockchain:** Reads from indexed Algorand transactions (PLY transfers tagged by provider)
- **Database:** Queries `partner_statements` and `sessions` tables

**Flow:** Click "View Detailed Analytics" → Navigate to Analytics Overview

---

### Screen 2: Analytics Overview

**Wireframe Elements:**
- Graph: Daily consumption trend (x-axis = days, y-axis = usage minutes)
- Table:
  - User ID
  - Time Spent
  - Amount Paid
  - Date
- Filter buttons: "Today | Week | Month"
- Export CSV / View Details

**Technical Implementation:**
- **Frontend:** React component with chart library (Chart.js/Recharts)
- **Backend:** `GET /v1/reports/partner` with date filters
- **Blockchain:** Off-chain analytics from PostgreSQL session data + chain reconciliation
- **Database:** Queries `partner_statements` and `heartbeats` tables

**Flow:** Export CSV → Download file

---

### Screen 3: Billing & Settings

**Wireframe Elements:**
- Options:
  - "Set Rate per Minute (€)"
  - "Choose Settlement Frequency" (Weekly / Monthly)
  - "View Past Payouts"
- Confirmation popup: "Billing preferences updated."

**Technical Implementation:**
- **Frontend:** React form component
- **Backend:** `PUT /v1/partners/:id/settings` updates partner settings
- **Blockchain:** Updates smart contract parameters (rate, provider address, settlement interval)
- **Database:** Updates `partners` table

**Flow:** On save → Confirmation popup → Settings updated

---

## 🧩 Wireframe-to-Functionality Mapping

### End-User Experience

| Wireframe Screen | Functionality | Algorand Logic |
|------------------|--------------|----------------|
| **Home / Browse** | Displays wallet balance (ASA balance query). Shows content tiles with per-minute rate. | Read user's PLY balance via Algorand SDK → Display balance / rate. |
| **Player / Live Session** | Timer counts usage in real time; charge accumulates per tick. | Smart contract "Usage Contract" deducts PLY tokens every billing interval (e.g., per minute). |
| **Usage Summary** | Displays total watched time, total charge, and remaining balance. | Aggregates on-chain microtransactions or reads from local off-chain session table. |
| **Add Credit** | Top-up wallet with fiat/crypto. | Fiat on-ramp → swap to PLY ASA. Crypto direct transfer via ASA transaction. |
| **Low Balance Alert** | Prevents playback when balance < threshold. | Frontend check + contract call "insufficient balance". |

### Partner Dashboard

| Wireframe Screen | Functionality | Algorand Logic |
|------------------|--------------|----------------|
| **Partner Dashboard** | Overview of users, sessions, revenue. | Reads from indexed Algorand transactions (PLY transfers tagged by provider). |
| **Analytics Overview** | Graph + table of daily usage and income. | Off-chain analytics from PostgreSQL session data + chain reconciliation. |
| **Billing & Settings** | Partners set price per minute and payout frequency. | Updates smart contract parameters (rate, provider address, settlement interval). |

---

## ⚡ Player ↔ Billing Sequence (per tick)

### Flow Diagram

```
Player sends heartbeat(tickId, playedMs) every N seconds
         │
         ▼
API verifies session + caps playedMs to interval
         │
         ▼
API computes gross = units * unit_price
         │
         ▼
Builds grouped tx: user→provider, user→platform, + AppCall("bill")
         │
         ▼
Submits; waits for confirmation (short timeout) → returns updated balance
         │
         ▼
On failure: retry with same tickId (idempotent)
```

### Step-by-Step Process

1. **Player sends heartbeat(tickId, playedMs)** every N seconds
   - Frontend sends POST request to `/v1/sessions/:id/heartbeat`
   - Includes: `tickId`, `playedMs`, `signature`

2. **API verifies session + caps playedMs to interval**
   - Backend validates session exists and is active
   - Caps `playedMs` to billing interval (e.g., 15 seconds)

3. **API computes gross = units * unit_price**
   - Calculates units consumed
   - Multiplies by unit price from `contents` table

4. **Builds grouped tx: user→provider, user→platform, + AppCall("bill")**
   - Creates grouped transaction:
     - Transaction 1: User → Provider (provider_amount PLY)
     - Transaction 2: User → Platform (fee PLY)
     - Transaction 3: App Call ("bill" method)

5. **Submits; waits for confirmation (short timeout) → returns updated balance**
   - Submits transaction group to Algorand
   - Waits for confirmation (< 5s)
   - Returns updated balance to frontend

6. **On failure: retry with same tickId (idempotent)**
   - If transaction fails, retry with same `tickId`
   - Idempotency ensures no double-charge

---

## 🔐 Smart Contract Design

### ASC1 Usage Contract (PyTeal-style outline)

```python
# UsageContract: guards platform fee %, provider address, and allowed app callers

# App global: provider_addr, fee_bps, platform_addr
# App local (per user): last_tick_round, consumed_units

# On 'bill' call:
# 1) Assert caller == API gateway escrow or allowed logicSig
# 2) Args: user_addr, units, unit_price (in PLY), nonce
# 3) Compute gross = units * unit_price
# 4) fee = gross * fee_bps / 10000
# 5) provider_amount = gross - fee
# 6) Require grouped payment txs:
#    - user → provider: provider_amount PLY (ASA transfer)
#    - user → platform_addr: fee PLY
# 7) Update local consumed_units += units
# 8) Record nonce to prevent replay
```

### Why ASC1?

- **Enforces fee policy:** Smart contract ensures correct fee calculation
- **Prevents tampering:** Immutable logic prevents manipulation
- **Atomicity:** Grouped transactions guarantee atomicity of provider + fee transfers
- **Transparency:** All fee calculations are on-chain and auditable

### Idempotency & Replay Safety

- **Nonce (tick_id):** Included in each billing call
- **Storage:** Processed nonces stored per (user, session)
- **Grouping:** `[AppCall("bill"), AssetTransfer(user→provider), AssetTransfer(user→platform)]`
- **Rejection:** If any leg fails, entire group is rejected

---

## 🔌 API Endpoints (POC)

### Authentication
- **Method:** JWT (users/partners)
- **Header:** `Authorization: Bearer <token>`

### Idempotency
- **Header:** `X-Idempotency-Key` for write endpoints
- **Purpose:** Prevents duplicate requests

### Endpoints

#### Sessions

**POST /v1/sessions**
- **Body:** `{ contentId, deviceId }`
- **Returns:** `{ sessionId, playbackToken }`
- **Purpose:** Create new playback session

**POST /v1/sessions/:id/heartbeat**
- **Body:** `{ playedMs, tickId, sig }` (player-signed or app-signed)
- **Effect:** Validates + triggers billing tick
- **Returns:** `{ balance, charged, txId }`

**GET /v1/sessions/:id/summary**
- **Returns:** `{ duration, totalCharge, remainingBalance }`
- **Purpose:** Get session summary after stop

#### Wallets

**POST /v1/wallets/topup/fiat-intent**
- **Body:** `{ amountFiat }`
- **Returns:** PSP intent
- **Effect:** On webhook, mint/swap to PLY

**GET /v1/wallets/me**
- **Returns:** `{ pliBalance, recentTx }`
- **Purpose:** Get wallet balance and recent transactions

#### Reports

**GET /v1/reports/user**
- **Query:** `from, to`
- **Returns:** Usage & cost lines
- **Purpose:** User consumption report

**GET /v1/reports/partner**
- **Query:** `from, to`
- **Returns:** Revenue & fee breakdown
- **Purpose:** Partner revenue report

#### Webhooks

**POST /webhooks/psp**
- **Purpose:** Fiat top-up confirmed → credit PLY
- **Body:** PSP webhook payload

**POST /webhooks/indexer**
- **Purpose:** Optional fast-follow confirm → update tx status
- **Body:** Algorand Indexer webhook payload

---

## 🗄️ Database Schema

### Users & Partners

```sql
-- Users
users (
  id PK,
  email,
  algo_addr,
  created_at
)

-- Partners
partners (
  id PK,
  name,
  algo_addr,
  fee_bps,
  created_at
)
```

### Content & Pricing

```sql
-- Content & Pricing
contents (
  id PK,
  partner_id FK,
  title,
  unit_price_pli,
  billing_interval_s
)
```

### Sessions & Heartbeats

```sql
-- Sessions & Heartbeats
sessions (
  id PK,
  user_id FK,
  content_id FK,
  started_at,
  status
)

heartbeats (
  id PK,
  session_id FK,
  tick_id UNIQUE,
  played_ms,
  unit_price_pli,
  gross_pli,
  fee_pli,
  provider_pli,
  tx_group_id,
  onchain_status,
  created_at
)
```

### Wallet Mirror

```sql
-- Wallet Mirror (for UX speed; source of truth is chain)
wallet_balances (
  user_id PK,
  pli_balance_estimate,
  updated_at
)
```

### Reports

```sql
-- Reports (materialized views or rollups)
user_statements (
  user_id,
  period,
  total_units,
  total_paid_pli
)

partner_statements (
  partner_id,
  period,
  gross_pli,
  fee_pli,
  net_pli
)
```

---

## 🔒 Security & Compliance (POC-level)

### Rate Limiting
- **Heartbeats:** Rate-limit heartbeats per session
- **Rejection:** Reject out-of-order tickId

### Reconciliation
- **Job:** Compares heartbeats vs. Indexer transactions hourly
- **Auto-repair:** Auto-repairs missing commits

### KYC/AML
- **Fiat on-ramp:** Run at fiat on-ramp
- **Wallet blacklist:** Support in backend before tx build

### GDPR
- **PII:** Store only minimal PII
- **User rights:** Let users download/delete reports

---

## 🛠️ Dev Tasks (Quick Start)

### Algorand Setup

1. **Create ASA PLY (testnet)**
   - Use Algorand TestNet
   - Create PlayCoin (PLY) ASA
   - Set up funding accounts (dispenser)

2. **Deploy UsageContract**
   - Write PyTeal contract
   - Compile to TEAL
   - Deploy to TestNet
   - Record app ID

### Backend

1. **Implement API endpoints**
   - `/sessions` - Create session
   - `/heartbeat` - Process tick billing
   - `/wallets` - Wallet operations
   - `/reports` - Analytics endpoints

2. **Transaction builder**
   - Implement with Algorand JS SDK
   - Build grouped transactions
   - Handle signing and submission

3. **Idempotency layer**
   - Implement idempotency key handling
   - Store processed nonces

4. **PostgreSQL schema & migrations**
   - Create all tables
   - Set up indexes
   - Create materialized views

5. **Webhooks**
   - PSP webhook handler
   - Indexer webhook handler (optional)

6. **Reconciliation worker**
   - Compare on-chain vs off-chain
   - Auto-repair mismatches

### Frontend

1. **React dashboard (User)**
   - Balance display
   - Live spend meter
   - Session history
   - Top-up form

2. **React dashboard (Partner)**
   - Revenue graph
   - Export statements
   - Settings form

### Ops

1. **Indexer endpoint**
   - Set up Algorand Indexer connection
   - Configure queries

2. **Environment secrets**
   - API keys
   - Database credentials
   - Algorand keys

3. **CI with testnet E2E**
   - Simulate 10k ticks
   - Test performance
   - Validate acceptance criteria

---

## 📊 Technical Connections Summary

### Frontend (React)
Implements these wireframe screens as individual routes/components:
- Home/Browse
- Player/Live Session
- Usage Summary
- Add Credit
- Partner Dashboard
- Analytics Overview
- Billing & Settings

### Backend (Node.js + Express)
Handles:
- Session ticks
- Wallet top-ups
- Contract calls
- Idempotency
- Reconciliation

### Blockchain (Algorand)
Executes:
- ASC1 logic for per-minute billing
- Automatic revenue split
- Atomic grouped transactions

### Database (PostgreSQL)
Stores:
- Usage records
- Balances (mirror)
- Partner analytics
- Session data

---

## 📚 Related Documentation

- **POC Implementation:** [`poc-implementation.md`](./poc-implementation.md)
- **Product Overview:** [`../project-context/product-overview.md`](../project-context/product-overview.md)
- **Wireframe OTT/VOD:** [`../project-context/wireframe-ott-vod.md`](../project-context/wireframe-ott-vod.md)
- **Tech Stack:** [`tech-stack.md`](./tech-stack.md)
- **API Specs:** [`api-specs.md`](./api-specs.md)

---

## 🔄 به‌روزرسانی‌ها

**2025-11-04 - ورژن 1.0:**
- ایجاد فایل اولیه
- مستندسازی End-User Experience Flow
- مستندسازی Partner Dashboard Flow
- اضافه کردن Wireframe-to-Functionality Mapping
- مستندسازی Player ↔ Billing Sequence
- مستندسازی Smart Contract Design
- مستندسازی API Endpoints
- مستندسازی Database Schema
- مستندسازی Security & Compliance
- اضافه کردن Dev Tasks

---

**تاریخ آخرین به‌روزرسانی:** 2025-11-04  
**ورژن فعلی:** 1.0

