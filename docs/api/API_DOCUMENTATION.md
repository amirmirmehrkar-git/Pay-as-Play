# API Documentation - Pay as Play

**Date:** 2025-01-XX  
**Version:** 1.0  
**Base URL:** `https://api.payasplay.com/v1` (Production)  
**Base URL:** `/api` (Development)

---

## 📋 Overview

This document describes all API endpoints available in the Pay as Play application.

---

## 🔐 Authentication

### Authentication Methods:
- **JWT Tokens:** Bearer token in Authorization header
- **Session-based:** Cookie-based authentication

### Authentication Flow:
1. User signs in via `/api/auth/signin`
2. Receive JWT token
3. Include token in requests: `Authorization: Bearer <token>`
4. Token expires after 24 hours
5. Use refresh token to get new access token

---

## 📚 API Endpoints

### Authentication APIs

#### POST /api/auth/signin
Sign in with email and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "User Name"
    },
    "token": "jwt_token_here",
    "expiresIn": 86400
  }
}
```

---

#### POST /api/auth/signup
Create new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com"
    },
    "token": "jwt_token_here"
  }
}
```

---

### Wallet APIs

#### GET /api/wallet/balance
Get wallet balance.

**Response:**
```json
{
  "success": true,
  "data": {
    "balance": 8.75,
    "currency": "EUR",
    "status": "warning",
    "estimatedMinutesLeft": 18
  }
}
```

---

#### POST /api/wallet/topup
Top up wallet balance.

**Request:**
```json
{
  "amount": 25,
  "paymentMethod": "card"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transactionId": "txn_123",
    "amount": 25,
    "status": "completed"
  }
}
```

---

### Notification APIs

#### GET /api/notifications
Get user notifications.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "notif_123",
        "type": "low_balance",
        "title": "Low Balance Warning",
        "message": "Your balance is below threshold",
        "read": false,
        "createdAt": "2025-01-XX"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 5,
      "totalPages": 1
    }
  }
}
```

---

### Analytics APIs

#### GET /api/analytics/time-watched
Get time watched analytics.

**Query Parameters:**
- `startDate` (optional): Start date (ISO format)
- `endDate` (optional): End date (ISO format)

**Response:**
```json
{
  "success": true,
  "data": {
    "totalTime": 14400,
    "dailyData": [
      {
        "date": "2025-01-XX",
        "time": 3600
      }
    ]
  }
}
```

---

## 🔴 Error Responses

### Error Format:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": {}
  }
}
```

### Common Error Codes:
- `VALIDATION_ERROR` - Invalid input (400)
- `UNAUTHORIZED` - Authentication required (401)
- `FORBIDDEN` - Insufficient permissions (403)
- `NOT_FOUND` - Resource not found (404)
- `RATE_LIMIT_EXCEEDED` - Too many requests (429)
- `INTERNAL_ERROR` - Server error (500)

---

## 📚 Resources

- `lib/api-client.ts` - API client
- `docs/api/API_MIGRATION_GUIDE.md` - API migration guide
- `docs/api/API_DOCUMENTATION.md` - This document

---

**API Documentation** ✅

