# ⚙️ Make (Integromat) Automation Flows - Play and Pay

**پروژه:** Pay as Play  
**تاریخ ایجاد:** 2025-11-04  
**آخرین به‌روزرسانی:** 2025-11-04  
**ورژن:** 1.0

---

## 🎯 Overview

این سند شامل فلوهای اتوماسیون Make (Integromat) برای اتصال Figma prototype به Backend API، Algorand TestNet wallet، و سیستم‌های Analytics است.

---

## 🔄 Flow 1: User Starts Playback

### Trigger: User Starts Playback Event

**Source:** App/Prototype → Backend API

### Steps

#### 1. Webhook Trigger (Make)
- **Module:** Webhooks > Custom webhook
- **Event:** User starts playback
- **Data Received:**
  ```json
  {
    "event": "playback_start",
    "userId": "user_123",
    "contentId": "content_456",
    "startTime": "2025-11-04T14:30:00Z",
    "platform": "mobile"
  }
  ```

#### 2. Call Backend API
- **Module:** HTTP > Make a request
- **Method:** POST
- **URL:** `https://api.playandpay.com/v1/sessions/start`
- **Headers:**
  ```
  Content-Type: application/json
  Authorization: Bearer {API_KEY}
  ```
- **Body:**
  ```json
  {
    "userId": "{{1.userId}}",
    "contentId": "{{1.contentId}}",
    "startTime": "{{1.startTime}}"
  }
  ```

#### 3. Backend Calls Algorand Smart Contract
- **Module:** HTTP > Make a request
- **Method:** POST
- **URL:** `https://api.playandpay.com/v1/algorand/start-session`
- **Body:**
  ```json
  {
    "sessionId": "{{2.sessionId}}",
    "userWallet": "{{2.userWallet}}",
    "contentProviderWallet": "{{2.providerWallet}}",
    "ratePerMinute": 0.02
  }
  ```

#### 4. Store Session Data
- **Module:** Google Sheets > Add a row
- **Spreadsheet:** "Play and Pay Sessions"
- **Worksheet:** "Active Sessions"
- **Data:**
  - Session ID: `{{3.sessionId}}`
  - User ID: `{{1.userId}}`
  - Content ID: `{{1.contentId}}`
  - Start Time: `{{1.startTime}}`
  - Status: "active"
  - Smart Contract Address: `{{3.contractAddress}}`

---

## 🔄 Flow 2: Micro-Payment Deduction Loop

### Trigger: Every X Seconds (Timer)

**Source:** Timer → Backend API → Algorand

### Steps

#### 1. Timer Trigger
- **Module:** Tools > Set up a timer
- **Interval:** 10 seconds (configurable)
- **Note:** This triggers every 10 seconds to check active sessions

#### 2. Get Active Sessions
- **Module:** Google Sheets > Search rows
- **Spreadsheet:** "Play and Pay Sessions"
- **Worksheet:** "Active Sessions"
- **Filter:** Status = "active"
- **Result:** Array of active sessions

#### 3. Iterator: Process Each Session
- **Module:** Flow control > Iterator
- **Array:** `{{2.activeSessions}}`

#### 4. Calculate Time Elapsed
- **Module:** Tools > Set variables
- **Variables:**
  - `startTime`: `{{3.startTime}}`
  - `currentTime`: Current timestamp
  - `elapsedSeconds`: `(currentTime - startTime) / 1000`
  - `elapsedMinutes`: `elapsedSeconds / 60`

#### 5. Calculate Payment Amount
- **Module:** Tools > Set variables
- **Variables:**
  - `ratePerMinute`: `{{3.ratePerMinute}}`
  - `amount`: `elapsedMinutes * ratePerMinute`
  - `amountInPLY`: `amount * 50` (assuming 1 EUR = 50 PLY)

#### 6. Check User Balance
- **Module:** HTTP > Make a request
- **Method:** GET
- **URL:** `https://api.playandpay.com/v1/wallet/balance`
- **Query Parameters:**
  - `walletAddress`: `{{3.userWallet}}`
- **Response:** `{ "balance": 250, "balanceEUR": 5.00 }`

#### 7. Condition: Balance Check
- **Module:** Flow control > If
- **Condition:** `{{6.balance}} >= {{5.amountInPLY}}`
- **If True:** Continue to payment
- **If False:** Send low balance alert

#### 8. Execute Algorand Transaction (If Balance Sufficient)
- **Module:** HTTP > Make a request
- **Method:** POST
- **URL:** `https://api.playandpay.com/v1/algorand/transfer`
- **Body:**
  ```json
  {
    "fromWallet": "{{3.userWallet}}",
    "toWallet": "{{3.providerWallet}}",
    "amountPLY": "{{5.amountInPLY}}",
    "sessionId": "{{3.sessionId}}",
    "memo": "Payment for {{3.contentId}}"
  }
  ```

#### 9. Update Session Record
- **Module:** Google Sheets > Update a row
- **Spreadsheet:** "Play and Pay Sessions"
- **Worksheet:** "Active Sessions"
- **Row:** `{{3.sessionId}}`
- **Updates:**
  - Last Payment Time: Current timestamp
  - Total Amount: `{{3.totalAmount}} + {{5.amount}}`
  - Total Time: `{{3.totalTime}} + {{4.elapsedSeconds}}`

#### 10. Log Transaction
- **Module:** Google Sheets > Add a row
- **Spreadsheet:** "Play and Pay Transactions"
- **Worksheet:** "Transactions"
- **Data:**
  - Transaction ID: `{{8.transactionId}}`
  - Session ID: `{{3.sessionId}}`
  - User ID: `{{3.userId}}`
  - Amount: `{{5.amount}}`
  - Amount PLY: `{{5.amountInPLY}}`
  - Timestamp: Current timestamp
  - Status: "confirmed"
  - Algorand TX ID: `{{8.txId}}`

#### 11. Low Balance Alert (If Balance Insufficient)
- **Module:** HTTP > Make a request
- **Method:** POST
- **URL:** `https://api.playandpay.com/v1/notifications/low-balance`
- **Body:**
  ```json
  {
    "userId": "{{3.userId}}",
    "currentBalance": "{{6.balanceEUR}}",
    "requiredAmount": "{{5.amount}}"
  }
  ```

---

## 🔄 Flow 3: Pause/Stop Event

### Trigger: User Pauses or Stops Playback

**Source:** App → Backend API → Algorand

### Steps

#### 1. Webhook Trigger
- **Module:** Webhooks > Custom webhook
- **Event:** Playback pause/stop
- **Data Received:**
  ```json
  {
    "event": "playback_stop",
    "sessionId": "session_789",
    "userId": "user_123",
    "stopTime": "2025-11-04T14:45:00Z"
  }
  ```

#### 2. Get Session Data
- **Module:** Google Sheets > Search rows
- **Spreadsheet:** "Play and Pay Sessions"
- **Worksheet:** "Active Sessions"
- **Filter:** Session ID = `{{1.sessionId}}`

#### 3. Calculate Final Payment
- **Module:** Tools > Set variables
- **Variables:**
  - `startTime`: `{{2.startTime}}`
  - `stopTime`: `{{1.stopTime}}`
  - `totalSeconds`: `(stopTime - startTime) / 1000`
  - `totalMinutes`: `totalSeconds / 60`
  - `finalAmount`: `totalMinutes * {{2.ratePerMinute}}`

#### 4. Execute Final Algorand Transaction
- **Module:** HTTP > Make a request
- **Method:** POST
- **URL:** `https://api.playandpay.com/v1/algorand/finalize-session`
- **Body:**
  ```json
  {
    "sessionId": "{{1.sessionId}}",
    "finalAmount": "{{3.finalAmount}}",
    "totalTime": "{{3.totalSeconds}}"
  }
  ```

#### 5. Terminate Smart Contract Session
- **Module:** HTTP > Make a request
- **Method:** POST
- **URL:** `https://api.playandpay.com/v1/algorand/terminate-session`
- **Body:**
  ```json
  {
    "sessionId": "{{1.sessionId}}",
    "contractAddress": "{{2.contractAddress}}"
  }
  ```

#### 6. Update Session Status
- **Module:** Google Sheets > Update a row
- **Spreadsheet:** "Play and Pay Sessions"
- **Worksheet:** "Active Sessions"
- **Row:** `{{1.sessionId}}`
- **Updates:**
  - Status: "completed"
  - End Time: `{{1.stopTime}}`
  - Final Amount: `{{3.finalAmount}}`
  - Total Time: `{{3.totalSeconds}}`

#### 7. Move to Completed Sessions
- **Module:** Google Sheets > Add a row
- **Spreadsheet:** "Play and Pay Sessions"
- **Worksheet:** "Completed Sessions"
- **Data:** Copy all data from active session + final amounts

#### 8. Delete from Active Sessions
- **Module:** Google Sheets > Delete a row
- **Spreadsheet:** "Play and Pay Sessions"
- **Worksheet:** "Active Sessions"
- **Row:** `{{1.sessionId}}`

---

## 🔄 Flow 4: Daily Usage Summary & Notification

### Trigger: Every 24 Hours (Scheduled)

**Source:** Timer → Analytics → Notification

### Steps

#### 1. Timer Trigger
- **Module:** Schedule > Schedule
- **Schedule:** Every day at 23:00 UTC

#### 2. Get All Transactions (Last 24h)
- **Module:** Google Sheets > Search rows
- **Spreadsheet:** "Play and Pay Transactions"
- **Worksheet:** "Transactions"
- **Filter:** 
  - Timestamp >= Yesterday 00:00
  - Timestamp < Today 00:00
  - Status = "confirmed"

#### 3. Aggregate Data
- **Module:** Tools > Set variables
- **Variables:**
  - `totalSpent`: Sum of all amounts
  - `totalTime`: Sum of all time watched (in minutes)
  - `contentCount`: Count of unique content IDs
  - `transactionCount`: Count of transactions

#### 4. Format Summary Message
- **Module:** Tools > Set variables
- **Variables:**
  - `message`: 
    ```
    "You spent €{{3.totalSpent}} today
    Time watched: {{3.totalTime}} minutes
    Content: {{3.contentCount}} items"
    ```

#### 5. Send Push Notification
- **Module:** HTTP > Make a request
- **Method:** POST
- **URL:** `https://api.playandpay.com/v1/notifications/push`
- **Body:**
  ```json
  {
    "userId": "{{2.userId}}",
    "title": "Daily Summary",
    "message": "{{4.message}}",
    "type": "daily_summary"
  }
  ```

#### 5b. Send Email (Alternative)
- **Module:** Email > Send an email
- **To:** `{{2.userEmail}}`
- **Subject:** "Your Play and Pay Daily Summary"
- **Body:** HTML email with summary and charts

#### 6. Update Analytics Dashboard
- **Module:** Google Sheets > Add a row
- **Spreadsheet:** "Play and Pay Analytics"
- **Worksheet:** "Daily Summaries"
- **Data:**
  - Date: Yesterday
  - User ID: `{{2.userId}}`
  - Total Spent: `{{3.totalSpent}}`
  - Total Time: `{{3.totalTime}}`
  - Content Count: `{{3.contentCount}}`

---

## 🔄 Flow 5: Wallet Top-up

### Trigger: User Initiates Top-up

**Source:** App → Payment Gateway → Algorand

### Steps

#### 1. Webhook Trigger
- **Module:** Webhooks > Custom webhook
- **Event:** Wallet top-up initiated
- **Data Received:**
  ```json
  {
    "event": "topup_initiated",
    "userId": "user_123",
    "amount": 10.00,
    "currency": "EUR",
    "paymentMethod": "credit_card"
  }
  ```

#### 2. Process Payment
- **Module:** HTTP > Make a request
- **Method:** POST
- **URL:** `https://api.playandpay.com/v1/payments/process`
- **Body:**
  ```json
  {
    "userId": "{{1.userId}}",
    "amount": "{{1.amount}}",
    "currency": "{{1.currency}}",
    "paymentMethod": "{{1.paymentMethod}}"
  }
  ```

#### 3. Convert to PLY
- **Module:** Tools > Set variables
- **Variables:**
  - `amountEUR`: `{{1.amount}}`
  - `amountPLY`: `{{1.amount}} * 50` (exchange rate)
  - `exchangeRate`: 50

#### 4. Mint/Transfer PLY to User Wallet
- **Module:** HTTP > Make a request
- **Method:** POST
- **URL:** `https://api.playandpay.com/v1/algorand/mint-ply`
- **Body:**
  ```json
  {
    "userWallet": "{{2.userWallet}}",
    "amountPLY": "{{3.amountPLY}}",
    "transactionId": "{{2.paymentId}}"
  }
  ```

#### 5. Log Transaction
- **Module:** Google Sheets > Add a row
- **Spreadsheet:** "Play and Pay Transactions"
- **Worksheet:** "Transactions"
- **Data:**
  - Transaction ID: `{{2.paymentId}}`
  - User ID: `{{1.userId}}`
  - Type: "topup"
  - Amount: `{{1.amount}}`
  - Amount PLY: `{{3.amountPLY}}`
  - Timestamp: Current timestamp
  - Status: "confirmed"
  - Algorand TX ID: `{{4.txId}}`

#### 6. Send Confirmation
- **Module:** HTTP > Make a request
- **Method:** POST
- **URL:** `https://api.playandpay.com/v1/notifications/transaction`
- **Body:**
  ```json
  {
    "userId": "{{1.userId}}",
    "type": "topup_success",
    "amount": "{{1.amount}}",
    "amountPLY": "{{3.amountPLY}}"
  }
  ```

---

## 📊 Data Storage Structure

### Google Sheets Structure

#### Sheet 1: "Active Sessions"
| Column | Type | Description |
|--------|------|-------------|
| Session ID | Text | Unique session identifier |
| User ID | Text | User identifier |
| Content ID | Text | Content identifier |
| Start Time | DateTime | Session start timestamp |
| Last Payment Time | DateTime | Last payment timestamp |
| Total Amount | Number | Cumulative amount paid |
| Total Time | Number | Total seconds watched |
| Status | Text | "active" or "paused" |
| Smart Contract Address | Text | Algorand contract address |
| User Wallet | Text | User Algorand wallet |
| Provider Wallet | Text | Content provider wallet |
| Rate Per Minute | Number | Payment rate |

#### Sheet 2: "Transactions"
| Column | Type | Description |
|--------|------|-------------|
| Transaction ID | Text | Unique transaction ID |
| Session ID | Text | Related session ID |
| User ID | Text | User identifier |
| Type | Text | "payment", "topup", "withdrawal" |
| Amount | Number | Amount in EUR |
| Amount PLY | Number | Amount in PLY tokens |
| Timestamp | DateTime | Transaction timestamp |
| Status | Text | "pending", "confirmed", "failed" |
| Algorand TX ID | Text | Algorand transaction ID |
| Memo | Text | Transaction memo |

#### Sheet 3: "Daily Summaries"
| Column | Type | Description |
|--------|------|-------------|
| Date | Date | Summary date |
| User ID | Text | User identifier |
| Total Spent | Number | Total amount spent |
| Total Time | Number | Total minutes watched |
| Content Count | Number | Number of unique content items |
| Transaction Count | Number | Number of transactions |

---

## 🔗 Integration Endpoints

### Backend API Endpoints

```
Base URL: https://api.playandpay.com/v1

POST /sessions/start
POST /sessions/stop
GET /sessions/{sessionId}
POST /algorand/start-session
POST /algorand/transfer
POST /algorand/finalize-session
POST /algorand/terminate-session
GET /wallet/balance
POST /wallet/topup
POST /payments/process
POST /algorand/mint-ply
POST /notifications/push
POST /notifications/low-balance
POST /notifications/transaction
```

---

## 🛠️ Make Scenario Setup

### Required Modules
1. **Webhooks** (Custom webhook)
2. **HTTP** (Make a request)
3. **Google Sheets** (Add/Update/Search rows)
4. **Tools** (Set variables, Iterator)
5. **Flow Control** (If, Switch)
6. **Schedule** (Timer)
7. **Email** (Send email - optional)

### API Keys Required
- Backend API Key
- Google Sheets API (Service Account)
- Algorand API Key (if using external service)
- OneSignal API Key (for push notifications)

### Error Handling
- **Retry Logic:** 3 retries with exponential backoff
- **Error Notifications:** Email/Slack on critical errors
- **Fallback:** Store failed transactions for manual review

---

**تاریخ آخرین به‌روزرسانی:** 2025-11-04  
**ورژن:** 1.0

