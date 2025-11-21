# API Migration Guide - Mock to Real APIs

**Date:** 2025-01-XX  
**Status:** Ready for Migration

---

## 📋 Overview

This guide explains how to migrate from mock APIs to real backend APIs.

---

## 🎯 Migration Strategy

### Phase 1: Configuration
1. Update environment variables
2. Configure API base URL
3. Test API client

### Phase 2: Authentication
1. Update auth endpoints
2. Test token refresh
3. Handle auth errors

### Phase 3: API Endpoints
1. Migrate wallet APIs
2. Migrate notification APIs
3. Migrate analytics APIs
4. Migrate partner APIs
5. Migrate LMS APIs

---

## 🔧 Step-by-Step Migration

### Step 1: Environment Configuration

Update `.env`:
```env
# Real API Configuration
NEXT_PUBLIC_API_BASE_URL="https://api.payasplay.com"
NEXT_PUBLIC_USE_MOCK_API="false"
NEXT_PUBLIC_API_VERSION="v1"
```

### Step 2: Update API Client

The API client (`lib/api-client.ts`) is already configured to:
- Use real APIs when `NEXT_PUBLIC_USE_MOCK_API="false"`
- Handle authentication automatically
- Retry failed requests
- Handle errors gracefully

### Step 3: Migrate API Routes

For each API route in `app/api/`, you have two options:

#### Option A: Keep Next.js API Routes (Proxy)
- Keep routes in `app/api/`
- Use API client to call real backend
- Return responses to frontend

#### Option B: Direct Backend Calls
- Remove Next.js API routes
- Call backend directly from components
- Use API client in components

---

## 📝 API Endpoints to Migrate

### Authentication APIs:
- `POST /api/auth/signin` → `POST /auth/signin`
- `POST /api/auth/signup` → `POST /auth/signup`
- `POST /api/auth/google` → `POST /auth/google`
- `POST /api/auth/refresh` → `POST /auth/refresh`

### Wallet APIs:
- `GET /api/wallet/balance` → `GET /wallet/balance`
- `POST /api/wallet/topup` → `POST /wallet/topup`
- `GET /api/wallet/transactions` → `GET /wallet/transactions`
- `GET /api/wallet/auto-topup/settings` → `GET /wallet/auto-topup/settings`
- `PUT /api/wallet/auto-topup/settings` → `PUT /wallet/auto-topup/settings`
- `GET /api/wallet/withdraw` → `GET /wallet/withdraw`
- `POST /api/wallet/withdraw` → `POST /wallet/withdraw`

### Notification APIs:
- `GET /api/notifications` → `GET /notifications`
- `POST /api/notifications/[id]/read` → `POST /notifications/[id]/read`
- `GET /api/notifications/settings` → `GET /notifications/settings`
- `PUT /api/notifications/settings` → `PUT /notifications/settings`

### Analytics APIs:
- `GET /api/analytics/time-watched` → `GET /analytics/time-watched`
- `GET /api/analytics/cost-per-content` → `GET /analytics/cost-per-content`
- `GET /api/analytics/monthly-spend` → `GET /analytics/monthly-spend`

### Partner APIs:
- `POST /api/partner/platforms` → `POST /partner/platforms`
- `GET /api/partner/platforms` → `GET /partner/platforms`
- `POST /api/partner/api-keys` → `POST /partner/api-keys`
- `GET /api/partner/api-keys` → `GET /partner/api-keys`

### LMS APIs:
- `POST /api/lms/connect` → `POST /lms/connect`
- `GET /api/lms/connections` → `GET /lms/connections`
- `POST /api/lms/sync` → `POST /lms/sync`

---

## 🔄 Migration Example

### Before (Mock API):
```typescript
// app/api/wallet/balance/route.ts
export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      balance: 8.75,
      currency: 'EUR',
      // ... mock data
    },
  });
}
```

### After (Real API - Option A: Proxy):
```typescript
// app/api/wallet/balance/route.ts
import { apiClient, getApiUrl } from '@/lib/api-client';

export async function GET() {
  try {
    const response = await apiClient.get(getApiUrl('/wallet/balance'));
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { message: 'Failed to fetch balance' } },
      { status: 500 }
    );
  }
}
```

### After (Real API - Option B: Direct):
```typescript
// components/WalletBalance.tsx
import { apiClient, getApiUrl } from '@/lib/api-client';

export function WalletBalance() {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    apiClient.get(getApiUrl('/wallet/balance'))
      .then(response => setBalance(response.data))
      .catch(error => console.error(error));
  }, []);

  // ...
}
```

---

## ✅ Testing Checklist

### Before Migration:
- [ ] Review backend API documentation
- [ ] Verify API endpoints match
- [ ] Test API client configuration
- [ ] Verify authentication flow

### During Migration:
- [ ] Migrate one API at a time
- [ ] Test each migrated API
- [ ] Verify error handling
- [ ] Check authentication

### After Migration:
- [ ] Test all endpoints
- [ ] Verify error scenarios
- [ ] Test authentication flow
- [ ] Performance testing

---

## 🐛 Troubleshooting

### Connection Errors:
- Check API base URL
- Verify network connectivity
- Check CORS settings
- Verify authentication

### Authentication Errors:
- Check token storage
- Verify token refresh
- Check token expiration
- Verify auth endpoints

### Data Mismatch:
- Compare API responses
- Check data transformation
- Verify field mappings
- Check error handling

---

## 📚 Resources

- API Client: `lib/api-client.ts`
- API Config: `lib/api-config.ts`
- Error Handling: `lib/api-errors.ts`
- Examples: `lib/api-example.ts`

---

**API Migration Guide Complete** ✅

