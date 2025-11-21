# Database Schema Design - Pay as Play

**Date:** 2025-01-XX  
**Status:** Planning  
**Database:** PostgreSQL (Recommended)

---

## 📊 Core Entities

### 1. Users
**Purpose:** Store user accounts and authentication information

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique user identifier |
| email | VARCHAR(255) | UNIQUE, NOT NULL | User email address |
| password_hash | VARCHAR(255) | NOT NULL | Hashed password |
| name | VARCHAR(255) | | User full name |
| role | ENUM | DEFAULT 'user' | User role (user, admin, partner) |
| email_verified | BOOLEAN | DEFAULT false | Email verification status |
| onboarding_completed | BOOLEAN | DEFAULT false | Onboarding completion status |
| created_at | TIMESTAMP | DEFAULT NOW() | Account creation time |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update time |

**Indexes:**
- `idx_users_email` on `email`
- `idx_users_role` on `role`

---

### 2. Wallets
**Purpose:** Store user wallet balances and currency information

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique wallet identifier |
| user_id | UUID | FOREIGN KEY, NOT NULL | Reference to users.id |
| balance | DECIMAL(10,2) | DEFAULT 0.00 | Current wallet balance |
| currency | VARCHAR(3) | DEFAULT 'EUR' | Currency code (EUR, USD, etc.) |
| average_minute_cost | DECIMAL(10,2) | | Average cost per minute |
| last_updated | TIMESTAMP | DEFAULT NOW() | Last balance update |
| created_at | TIMESTAMP | DEFAULT NOW() | Wallet creation time |

**Indexes:**
- `idx_wallets_user_id` on `user_id`

**Relationships:**
- One-to-One with Users (user_id → users.id)

---

### 3. Transactions
**Purpose:** Store all financial transactions (payments, top-ups, withdrawals)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique transaction identifier |
| user_id | UUID | FOREIGN KEY, NOT NULL | Reference to users.id |
| wallet_id | UUID | FOREIGN KEY, NOT NULL | Reference to wallets.id |
| type | ENUM | NOT NULL | Transaction type (payment, topup, withdrawal, refund) |
| amount | DECIMAL(10,2) | NOT NULL | Transaction amount |
| currency | VARCHAR(3) | DEFAULT 'EUR' | Currency code |
| status | ENUM | DEFAULT 'pending' | Status (pending, completed, failed, cancelled) |
| payment_method | VARCHAR(50) | | Payment method (card, bank, paypal, crypto) |
| description | TEXT | | Transaction description |
| metadata | JSONB | | Additional transaction data |
| created_at | TIMESTAMP | DEFAULT NOW() | Transaction creation time |
| completed_at | TIMESTAMP | | Transaction completion time |

**Indexes:**
- `idx_transactions_user_id` on `user_id`
- `idx_transactions_wallet_id` on `wallet_id`
- `idx_transactions_type` on `type`
- `idx_transactions_status` on `status`
- `idx_transactions_created_at` on `created_at`

**Relationships:**
- Many-to-One with Users (user_id → users.id)
- Many-to-One with Wallets (wallet_id → wallets.id)

---

### 4. Sessions
**Purpose:** Store video/content playback sessions

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique session identifier |
| user_id | UUID | FOREIGN KEY, NOT NULL | Reference to users.id |
| content_id | VARCHAR(255) | NOT NULL | Content identifier |
| content_title | VARCHAR(255) | | Content title |
| platform | VARCHAR(100) | | Platform name (YouTube, Vimeo, etc.) |
| price_per_minute | DECIMAL(10,2) | NOT NULL | Price per minute |
| started_at | TIMESTAMP | DEFAULT NOW() | Session start time |
| ended_at | TIMESTAMP | | Session end time |
| duration_seconds | INTEGER | | Total duration in seconds |
| total_cost | DECIMAL(10,2) | | Total session cost |
| status | ENUM | DEFAULT 'active' | Status (active, completed, cancelled) |
| created_at | TIMESTAMP | DEFAULT NOW() | Session creation time |

**Indexes:**
- `idx_sessions_user_id` on `user_id`
- `idx_sessions_content_id` on `content_id`
- `idx_sessions_started_at` on `started_at`
- `idx_sessions_status` on `status`

**Relationships:**
- Many-to-One with Users (user_id → users.id)

---

### 5. Platforms (Partner Platforms)
**Purpose:** Store partner platform integrations

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique platform identifier |
| user_id | UUID | FOREIGN KEY, NOT NULL | Reference to users.id (partner) |
| name | VARCHAR(255) | NOT NULL | Platform name |
| type | ENUM | NOT NULL | Platform type (video, lms, course) |
| description | TEXT | | Platform description |
| api_key | VARCHAR(255) | | API key for platform |
| api_key_id | VARCHAR(255) | | API key identifier |
| status | ENUM | DEFAULT 'active' | Status (active, inactive, suspended) |
| created_at | TIMESTAMP | DEFAULT NOW() | Platform creation time |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update time |

**Indexes:**
- `idx_platforms_user_id` on `user_id`
- `idx_platforms_type` on `type`
- `idx_platforms_status` on `status`

**Relationships:**
- Many-to-One with Users (user_id → users.id)

---

### 6. Notifications
**Purpose:** Store user notifications

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique notification identifier |
| user_id | UUID | FOREIGN KEY, NOT NULL | Reference to users.id |
| type | ENUM | NOT NULL | Notification type (low_balance, auto_topup, payment, etc.) |
| title | VARCHAR(255) | NOT NULL | Notification title |
| message | TEXT | NOT NULL | Notification message |
| read | BOOLEAN | DEFAULT false | Read status |
| action_url | VARCHAR(500) | | Action URL if applicable |
| created_at | TIMESTAMP | DEFAULT NOW() | Notification creation time |
| read_at | TIMESTAMP | | When notification was read |

**Indexes:**
- `idx_notifications_user_id` on `user_id`
- `idx_notifications_type` on `type`
- `idx_notifications_read` on `read`
- `idx_notifications_created_at` on `created_at`

**Relationships:**
- Many-to-One with Users (user_id → users.id)

---

### 7. Notification Settings
**Purpose:** Store user notification preferences

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique settings identifier |
| user_id | UUID | FOREIGN KEY, UNIQUE, NOT NULL | Reference to users.id |
| low_balance_threshold | DECIMAL(10,2) | DEFAULT 10.00 | Low balance threshold |
| notification_email | VARCHAR(255) | | Email for notifications |
| type_preferences | JSONB | | Per-type notification preferences |
| created_at | TIMESTAMP | DEFAULT NOW() | Settings creation time |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update time |

**Indexes:**
- `idx_notification_settings_user_id` on `user_id`

**Relationships:**
- One-to-One with Users (user_id → users.id)

---

### 8. Auto Top-up Settings
**Purpose:** Store auto top-up configuration

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique settings identifier |
| user_id | UUID | FOREIGN KEY, UNIQUE, NOT NULL | Reference to users.id |
| enabled | BOOLEAN | DEFAULT false | Auto top-up enabled |
| threshold | DECIMAL(10,2) | DEFAULT 10.00 | Balance threshold |
| amount | DECIMAL(10,2) | DEFAULT 25.00 | Top-up amount |
| payment_method_id | VARCHAR(255) | | Payment method identifier |
| created_at | TIMESTAMP | DEFAULT NOW() | Settings creation time |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update time |

**Indexes:**
- `idx_auto_topup_settings_user_id` on `user_id`

**Relationships:**
- One-to-One with Users (user_id → users.id)

---

### 9. Withdrawals
**Purpose:** Store withdrawal requests

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique withdrawal identifier |
| user_id | UUID | FOREIGN KEY, NOT NULL | Reference to users.id |
| amount | DECIMAL(10,2) | NOT NULL | Withdrawal amount |
| currency | VARCHAR(3) | DEFAULT 'EUR' | Currency code |
| method | ENUM | NOT NULL | Withdrawal method (bank, paypal, crypto) |
| status | ENUM | DEFAULT 'pending' | Status (pending, processing, completed, failed) |
| bank_details | JSONB | | Bank account details (if applicable) |
| paypal_email | VARCHAR(255) | | PayPal email (if applicable) |
| crypto_address | VARCHAR(255) | | Crypto address (if applicable) |
| created_at | TIMESTAMP | DEFAULT NOW() | Withdrawal creation time |
| processed_at | TIMESTAMP | | Processing time |
| completed_at | TIMESTAMP | | Completion time |

**Indexes:**
- `idx_withdrawals_user_id` on `user_id`
- `idx_withdrawals_status` on `status`
- `idx_withdrawals_created_at` on `created_at`

**Relationships:**
- Many-to-One with Users (user_id → users.id)

---

### 10. LMS Connections
**Purpose:** Store LMS platform connections

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique connection identifier |
| user_id | UUID | FOREIGN KEY, NOT NULL | Reference to users.id |
| platform | ENUM | NOT NULL | LMS platform (moodle, canvas, etc.) |
| url | VARCHAR(500) | NOT NULL | LMS URL |
| api_key | VARCHAR(255) | | API key |
| api_secret | VARCHAR(255) | | API secret (if applicable) |
| status | ENUM | DEFAULT 'active' | Status (active, inactive, error) |
| last_sync_at | TIMESTAMP | | Last sync time |
| created_at | TIMESTAMP | DEFAULT NOW() | Connection creation time |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update time |

**Indexes:**
- `idx_lms_connections_user_id` on `user_id`
- `idx_lms_connections_platform` on `platform`

**Relationships:**
- Many-to-One with Users (user_id → users.id)

---

## 🔗 Entity Relationships

### Relationship Diagram:
```
Users (1) ──< (Many) Wallets
Users (1) ──< (Many) Transactions
Users (1) ──< (Many) Sessions
Users (1) ──< (Many) Platforms
Users (1) ──< (Many) Notifications
Users (1) ──< (1) Notification Settings
Users (1) ──< (1) Auto Top-up Settings
Users (1) ──< (Many) Withdrawals
Users (1) ──< (Many) LMS Connections

Wallets (1) ──< (Many) Transactions
```

---

## 📈 Indexes Summary

### Performance Indexes:
- User lookups: `users.email`, `users.role`
- Transaction queries: `transactions.user_id`, `transactions.type`, `transactions.status`, `transactions.created_at`
- Session queries: `sessions.user_id`, `sessions.content_id`, `sessions.status`
- Notification queries: `notifications.user_id`, `notifications.read`, `notifications.type`

---

## 🔐 Constraints

### Foreign Key Constraints:
- All foreign keys have CASCADE DELETE (optional, based on business logic)
- All foreign keys are indexed for performance

### Check Constraints:
- `wallets.balance >= 0` (balance cannot be negative)
- `transactions.amount > 0` (transaction amount must be positive)
- `sessions.duration_seconds >= 0` (duration cannot be negative)

---

## 📊 Enums

### Transaction Type:
- `payment` - Payment for content
- `topup` - Wallet top-up
- `withdrawal` - Withdrawal request
- `refund` - Refund transaction

### Transaction Status:
- `pending` - Pending processing
- `completed` - Successfully completed
- `failed` - Failed transaction
- `cancelled` - Cancelled transaction

### Session Status:
- `active` - Active session
- `completed` - Completed session
- `cancelled` - Cancelled session

### Platform Type:
- `video` - Video platform
- `lms` - Learning Management System
- `course` - Course platform

### Notification Type:
- `low_balance` - Low balance warning
- `auto_topup` - Auto top-up notification
- `payment` - Payment notification
- `session_end` - Session end notification
- `settlement` - Settlement notification
- `system` - System notification
- `promotional` - Promotional notification

### Withdrawal Method:
- `bank` - Bank transfer
- `paypal` - PayPal
- `crypto` - Cryptocurrency

---

## 📝 Notes

1. **UUID vs Integer IDs:** Using UUID for better distributed system support and security
2. **JSONB Fields:** Using JSONB for flexible metadata storage
3. **Timestamps:** All tables have `created_at` and relevant tables have `updated_at`
4. **Soft Deletes:** Consider adding `deleted_at` for soft delete support (optional)
5. **Audit Trail:** Consider adding audit tables for sensitive operations (optional)

---

**Schema Design Complete** ✅  
**Ready for ORM Implementation** ✅

