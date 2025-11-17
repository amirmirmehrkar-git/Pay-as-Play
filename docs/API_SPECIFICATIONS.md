# 🔌 API Specifications - Phase 2

**تاریخ ایجاد:** 2025-11-17  
**وضعیت:** Draft  
**برای:** Backend Development Team

---

## 📋 فهرست API Endpoints

### Epic 1: Integration Wizard
- [Partner Platform Management](#partner-platform-management)
- [API Key Management](#api-key-management)
- [Integration Testing](#integration-testing)

### Epic 2: Settlement Dashboard
- [Settlement Overview](#settlement-overview)
- [Settlement History](#settlement-history)
- [Settlement Details](#settlement-details)
- [Settlement Settings](#settlement-settings)

### Epic 3: LMS Integration
- [LMS Connection](#lms-connection)
- [Course Sync](#course-sync)
- [Progress Tracking](#progress-tracking)

### Epic 4: Export Functionality
- [Analytics Export](#analytics-export)

### Epic 5: Notifications
- [Email Notifications](#email-notifications)
- [Push Notifications](#push-notifications)

### Epic 6: Sandbox
- [Sandbox Management](#sandbox-management)

---

## 🔐 Authentication

All API endpoints require authentication using Bearer token:

```
Authorization: Bearer <access_token>
```

**Token Format:**
- JWT token
- Expires in 24 hours
- Refresh token available

---

## 📊 Partner Platform Management

### Create Platform

**Endpoint:** `POST /api/partner/platforms`

**Request Body:**
```json
{
  "platformType": "video" | "audio" | "learn" | "entertainment",
  "platformName": "string (2-50 chars)",
  "platformDescription": "string (optional, max 500 chars)"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "platformId": "pp_abc123",
    "platformType": "video",
    "platformName": "My Video Platform",
    "platformDescription": "A video streaming platform",
    "status": "pending",
    "createdAt": "2025-11-17T10:00:00Z"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Missing or invalid token
- `409 Conflict`: Platform name already exists

---

### Get Platform List

**Endpoint:** `GET /api/partner/platforms`

**Query Parameters:**
- `status`: `pending` | `approved` | `rejected` (optional)
- `platformType`: `video` | `audio` | `learn` | `entertainment` (optional)
- `page`: number (default: 1)
- `limit`: number (default: 10)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "platforms": [
      {
        "platformId": "pp_abc123",
        "platformType": "video",
        "platformName": "My Video Platform",
        "status": "approved",
        "createdAt": "2025-11-17T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

---

## 🔑 API Key Management

### Generate API Key

**Endpoint:** `POST /api/partner/api-keys`

**Request Body:**
```json
{
  "platformId": "pp_abc123",
  "keyName": "Production Key" | "Development Key"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "apiKey": "PP-4X8Y-2211-ABCD",
    "apiKeyId": "ak_xyz789",
    "platformId": "pp_abc123",
    "keyName": "Production Key",
    "createdAt": "2025-11-17T10:00:00Z",
    "expiresAt": null,
    "lastUsedAt": null
  }
}
```

**Security Notes:**
- API key is only shown once (store securely)
- Key format: `PP-XXXX-XXXX-XXXX`
- Key is hashed in database
- Plain key returned only in this response

---

### Get API Keys

**Endpoint:** `GET /api/partner/api-keys`

**Query Parameters:**
- `platformId`: string (optional)
- `status`: `active` | `revoked` (optional)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "apiKeys": [
      {
        "apiKeyId": "ak_xyz789",
        "platformId": "pp_abc123",
        "keyName": "Production Key",
        "maskedKey": "PP-****-****-ABCD",
        "createdAt": "2025-11-17T10:00:00Z",
        "lastUsedAt": "2025-11-17T15:30:00Z",
        "status": "active"
      }
    ]
  }
}
```

---

### Revoke API Key

**Endpoint:** `DELETE /api/partner/api-keys/:apiKeyId`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "API key revoked successfully"
}
```

---

## 🧪 Integration Testing

### Test Connection

**Endpoint:** `POST /api/partner/test-connection`

**Request Body:**
```json
{
  "apiKey": "PP-4X8Y-2211-ABCD",
  "platformId": "pp_abc123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "connected": true,
    "platformId": "pp_abc123",
    "platformName": "My Video Platform",
    "testTimestamp": "2025-11-17T10:00:00Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_API_KEY",
    "message": "API key is invalid or expired"
  }
}
```

---

## 💰 Settlement Overview

### Get Settlement Overview

**Endpoint:** `GET /api/partner/settlement/overview`

**Query Parameters:**
- `dateRange`: `thisMonth` | `lastMonth` | `last6Months` | `custom` (default: `thisMonth`)
- `startDate`: ISO date string (required if `dateRange=custom`)
- `endDate`: ISO date string (required if `dateRange=custom`)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "totalRevenue": 12500.50,
    "pendingSettlements": 3200.75,
    "completedSettlements": 9299.75,
    "nextSettlementDate": "2025-12-01T00:00:00Z",
    "revenueHistory": [
      {
        "month": "2025-06",
        "revenue": 8500.00
      },
      {
        "month": "2025-07",
        "revenue": 9200.00
      }
    ],
    "currency": "EUR"
  }
}
```

---

## 📜 Settlement History

### Get Settlement History

**Endpoint:** `GET /api/partner/settlement/history`

**Query Parameters:**
- `status`: `pending` | `completed` | `failed` (optional)
- `startDate`: ISO date string (optional)
- `endDate`: ISO date string (optional)
- `page`: number (default: 1)
- `limit`: number (default: 10)
- `sortBy`: `date` | `amount` (default: `date`)
- `sortOrder`: `asc` | `desc` (default: `desc`)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "settlements": [
      {
        "settlementId": "st_abc123",
        "date": "2025-11-01T00:00:00Z",
        "amount": 3200.75,
        "status": "completed",
        "transactionId": "tx_xyz789",
        "currency": "EUR"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 45,
      "totalPages": 5
    }
  }
}
```

---

### Get Settlement Details

**Endpoint:** `GET /api/partner/settlement/:settlementId`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "settlementId": "st_abc123",
    "date": "2025-11-01T00:00:00Z",
    "amount": 3200.75,
    "status": "completed",
    "transactionId": "tx_xyz789",
    "currency": "EUR",
    "breakdown": {
      "totalSessions": 1250,
      "totalPlatformFee": 320.08,
      "netRevenue": 2880.67,
      "sessions": [
        {
          "sessionId": "sess_001",
          "userId": "user_123",
          "duration": 3600,
          "cost": 2.50,
          "platformFee": 0.25,
          "netRevenue": 2.25,
          "platform": "video",
          "contentId": "content_456"
        }
      ]
    }
  }
}
```

---

### Download Settlement Invoice

**Endpoint:** `GET /api/partner/settlement/:settlementId/invoice`

**Query Parameters:**
- `format`: `pdf` (default: `pdf`)

**Response (200 OK):**
- Content-Type: `application/pdf`
- Content-Disposition: `attachment; filename="settlement-st_abc123-2025-11-01.pdf"`

---

## ⚙️ Settlement Settings

### Get Settlement Settings

**Endpoint:** `GET /api/partner/settlement/settings`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "settlementFrequency": "monthly",
    "minimumSettlementAmount": 100.00,
    "paymentMethod": "bank_transfer",
    "bankAccount": {
      "accountHolder": "Company Name",
      "iban": "DE89370400440532013000",
      "bic": "COBADEFFXXX",
      "bankName": "Commerzbank"
    },
    "cryptoWallet": null
  }
}
```

---

### Update Settlement Settings

**Endpoint:** `PUT /api/partner/settlement/settings`

**Request Body:**
```json
{
  "settlementFrequency": "weekly" | "monthly" | "quarterly",
  "minimumSettlementAmount": 100.00,
  "paymentMethod": "bank_transfer" | "crypto",
  "bankAccount": {
    "accountHolder": "Company Name",
    "iban": "DE89370400440532013000",
    "bic": "COBADEFFXXX",
    "bankName": "Commerzbank"
  },
  "cryptoWallet": {
    "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "network": "ethereum" | "algorand"
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Settlement settings updated successfully",
  "data": {
    "settlementFrequency": "weekly",
    "minimumSettlementAmount": 100.00,
    "paymentMethod": "bank_transfer"
  }
}
```

**Validation Rules:**
- `minimumSettlementAmount`: Must be > 0
- `iban`: Must be valid IBAN format
- `cryptoWallet.address`: Must be valid address for selected network

---

## 🎓 LMS Connection

### Connect LMS

**Endpoint:** `POST /api/lms/connect`

**Request Body:**
```json
{
  "lmsType": "moodle" | "canvas" | "blackboard" | "custom",
  "lmsUrl": "https://lms.example.com",
  "apiKey": "lms_api_key_here",
  "apiSecret": "lms_api_secret_here" // optional
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "connectionId": "lms_conn_123",
    "lmsType": "moodle",
    "lmsUrl": "https://lms.example.com",
    "status": "connected",
    "connectedAt": "2025-11-17T10:00:00Z",
    "lastSyncAt": null
  }
}
```

---

### Test LMS Connection

**Endpoint:** `POST /api/lms/test-connection`

**Request Body:**
```json
{
  "lmsType": "moodle",
  "lmsUrl": "https://lms.example.com",
  "apiKey": "lms_api_key_here"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "connected": true,
    "lmsVersion": "4.2.0",
    "testTimestamp": "2025-11-17T10:00:00Z"
  }
}
```

---

### Disconnect LMS

**Endpoint:** `DELETE /api/lms/disconnect`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "LMS disconnected successfully"
}
```

---

## 📚 Course Sync

### Sync Courses

**Endpoint:** `POST /api/lms/sync-courses`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "syncId": "sync_abc123",
    "status": "in_progress",
    "totalCourses": 25,
    "syncedCourses": 0,
    "startedAt": "2025-11-17T10:00:00Z"
  }
}
```

**Note:** This is an async operation. Use polling or webhooks to check status.

---

### Get Sync Status

**Endpoint:** `GET /api/lms/sync-courses/:syncId`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "syncId": "sync_abc123",
    "status": "completed",
    "totalCourses": 25,
    "syncedCourses": 25,
    "failedCourses": 0,
    "startedAt": "2025-11-17T10:00:00Z",
    "completedAt": "2025-11-17T10:05:00Z"
  }
}
```

---

### Get Synced Courses

**Endpoint:** `GET /api/lms/courses`

**Query Parameters:**
- `status`: `synced` | `failed` | `pending` (optional)
- `page`: number (default: 1)
- `limit`: number (default: 10)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "courses": [
      {
        "courseId": "course_123",
        "lmsCourseId": "lms_course_456",
        "courseName": "Introduction to JavaScript",
        "status": "synced",
        "lastSyncDate": "2025-11-17T10:05:00Z",
        "lmsUrl": "https://lms.example.com/course/456"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

---

## 📊 Progress Tracking

### Get LMS Progress

**Endpoint:** `GET /api/lms/progress`

**Query Parameters:**
- `courseId`: string (optional)
- `dateRange`: `thisMonth` | `lastMonth` | `all` (default: `all`)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "totalCourses": 25,
    "completedCourses": 8,
    "inProgressCourses": 12,
    "notStartedCourses": 5,
    "totalTimeSpent": 36000,
    "totalCost": 180.00,
    "courses": [
      {
        "courseId": "course_123",
        "courseName": "Introduction to JavaScript",
        "completionPercentage": 75,
        "timeSpent": 5400,
        "cost": 27.00,
        "lastAccessed": "2025-11-17T09:00:00Z",
        "lmsUrl": "https://lms.example.com/course/456"
      }
    ]
  }
}
```

---

## 📥 Analytics Export

### Export Analytics Data

**Endpoint:** `GET /api/analytics/export`

**Query Parameters:**
- `format`: `csv` | `pdf` (required)
- `dateRange`: `thisMonth` | `lastMonth` | `last6Months` | `custom` (default: `thisMonth`)
- `startDate`: ISO date string (required if `dateRange=custom`)
- `endDate`: ISO date string (required if `dateRange=custom`)
- `includeCharts`: `true` | `false` (default: `false`, only for PDF)
- `includeMediaHistory`: `true` | `false` (default: `true`)

**Response for CSV (200 OK):**
- Content-Type: `text/csv; charset=utf-8`
- Content-Disposition: `attachment; filename="pay-as-play-analytics-2025-11-17.csv"`

**CSV Format:**
```csv
Date,Platform,Title,Category,Duration (seconds),Cost (EUR)
2025-11-17,Netflix,Foundation S02E05,video,3200,2.80
2025-11-16,Spotify,AI Disruption Podcast,audio,1800,0.90
```

**Response for PDF (200 OK):**
- Content-Type: `application/pdf`
- Content-Disposition: `attachment; filename="pay-as-play-report-2025-11-17.pdf"`

---

## 📧 Email Notifications

### Send Email Notification

**Endpoint:** `POST /api/notifications/email`

**Request Body:**
```json
{
  "userId": "user_123",
  "template": "low_balance_warning" | "auto_topup_confirmation" | "session_end_summary" | "weekly_report",
  "data": {
    "balance": 5.50,
    "threshold": 10.00
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "emailId": "email_abc123",
    "status": "queued",
    "queuedAt": "2025-11-17T10:00:00Z"
  }
}
```

---

### Get Email Notification Status

**Endpoint:** `GET /api/notifications/email/:emailId`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "emailId": "email_abc123",
    "status": "delivered",
    "sentAt": "2025-11-17T10:00:05Z",
    "deliveredAt": "2025-11-17T10:00:06Z"
  }
}
```

---

## 🔔 Push Notifications

### Send Push Notification

**Endpoint:** `POST /api/notifications/push`

**Request Body:**
```json
{
  "userId": "user_123",
  "title": "Low Balance Warning",
  "body": "Your balance is below €10.00",
  "data": {
    "type": "low_balance",
    "balance": 5.50,
    "action": "topup"
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "notificationId": "push_abc123",
    "status": "sent",
    "sentAt": "2025-11-17T10:00:00Z"
  }
}
```

---

### Register Device Token

**Endpoint:** `POST /api/notifications/push/register`

**Request Body:**
```json
{
  "deviceToken": "fcm_device_token_here",
  "platform": "web" | "ios" | "android"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Device token registered successfully"
}
```

---

## 🧪 Sandbox Management

### Get Sandbox API Key

**Endpoint:** `POST /api/sandbox/api-keys`

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "apiKey": "SANDBOX-PP-4X8Y-2211-ABCD",
    "apiKeyId": "sandbox_ak_xyz789",
    "createdAt": "2025-11-17T10:00:00Z"
  }
}
```

---

### Generate Test Data

**Endpoint:** `POST /api/sandbox/generate-test-data`

**Request Body:**
```json
{
  "users": 10,
  "sessions": 50,
  "transactions": 100
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "generatedUsers": 10,
    "generatedSessions": 50,
    "generatedTransactions": 100,
    "generatedAt": "2025-11-17T10:00:00Z"
  }
}
```

---

### Reset Sandbox

**Endpoint:** `POST /api/sandbox/reset`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Sandbox reset successfully",
  "data": {
    "resetAt": "2025-11-17T10:00:00Z"
  }
}
```

---

## ⚠️ Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "platformName",
      "message": "Platform name must be between 2-50 characters"
    }
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Missing or invalid authentication token"
  }
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "You don't have permission to access this resource"
  }
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An internal error occurred"
  }
}
```

---

## 📝 Notes

1. **Rate Limiting:**
   - All endpoints: 100 requests per minute per user
   - Export endpoints: 10 requests per hour per user

2. **Pagination:**
   - Default page size: 10
   - Maximum page size: 100
   - Page numbers start from 1

3. **Date Formats:**
   - All dates in ISO 8601 format: `YYYY-MM-DDTHH:mm:ssZ`
   - Timezone: UTC

4. **Currency:**
   - All monetary values in EUR
   - Format: Decimal with 2 decimal places

5. **Versioning:**
   - Current API version: `v1`
   - Version in URL: `/api/v1/...` (optional for now)

---

**تاریخ آخرین به‌روزرسانی:** 2025-11-17  
**وضعیت:** Draft - نیاز به Review از Backend Team

