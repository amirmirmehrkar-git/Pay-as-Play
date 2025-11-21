# API Migration Examples - Pay as Play

**Date:** 2025-01-XX  
**Status:** Ready for Migration

---

## 📋 Migration Patterns

### Pattern 1: Proxy Pattern (توصیه می‌شود)

Keep Next.js API routes and proxy to real backend.

**مزایا:**
- ✅ Easy to switch between mock/real
- ✅ No changes needed in components
- ✅ Can add caching/logging in proxy
- ✅ Better error handling

---

## 🔄 Migration Examples

### Example 1: Wallet Balance API

#### Before (Mock):
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

#### After (Proxy to Real Backend):
```typescript
// app/api/wallet/balance/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { proxyToBackend, shouldUseMock } from '@/lib/api-migration-helper';

export async function GET(request: NextRequest) {
  if (shouldUseMock()) {
    // Fallback to mock
    return NextResponse.json({
      success: true,
      data: { balance: 8.75, currency: 'EUR' },
    });
  }

  // Proxy to real backend
  return await proxyToBackend('/wallet/balance', request);
}
```

---

### Example 2: Authentication API

#### Before (Mock):
```typescript
// app/api/auth/signin/route.ts
export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  
  // Mock authentication
  const mockUser = { id: 'user_1', email };
  const mockToken = 'mock_jwt_token';
  
  return NextResponse.json({
    success: true,
    data: { user: mockUser, token: mockToken },
  });
}
```

#### After (Proxy to Real Backend):
```typescript
// app/api/auth/signin/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { proxyToBackend, shouldUseMock } from '@/lib/api-migration-helper';

export async function POST(request: NextRequest) {
  if (shouldUseMock()) {
    // Fallback to mock
    const { email, password } = await request.json();
    return NextResponse.json({
      success: true,
      data: {
        user: { id: 'user_1', email },
        token: 'mock_jwt_token',
      },
    });
  }

  // Proxy to real backend
  return await proxyToBackend('/auth/signin', request);
}
```

---

### Example 3: Notification API

#### Before (Mock):
```typescript
// app/api/notifications/route.ts
export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      notifications: [
        // ... mock notifications
      ],
    },
  });
}
```

#### After (Proxy to Real Backend):
```typescript
// app/api/notifications/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { proxyToBackend, shouldUseMock } from '@/lib/api-migration-helper';

export async function GET(request: NextRequest) {
  if (shouldUseMock()) {
    // Fallback to mock
    return NextResponse.json({
      success: true,
      data: { notifications: [] },
    });
  }

  // Proxy to real backend
  return await proxyToBackend('/notifications', request);
}
```

---

## 🔧 Migration Helper

### Using `api-migration-helper.ts`:

```typescript
import { proxyToBackend, shouldUseMock } from '@/lib/api-migration-helper';

// Check if mock mode
if (shouldUseMock()) {
  // Use mock implementation
}

// Proxy to real backend
return await proxyToBackend('/endpoint', request);
```

---

## 📝 Migration Checklist

For each API route:

1. [ ] Import migration helper
2. [ ] Add `shouldUseMock()` check
3. [ ] Keep mock implementation as fallback
4. [ ] Add `proxyToBackend()` call
5. [ ] Test with mock mode
6. [ ] Test with real API mode
7. [ ] Update error handling

---

## ✅ Migration Strategy

### Phase 1: Infrastructure
- ✅ API client ready
- ✅ Migration helper created
- ✅ Examples created

### Phase 2: Migration (When Backend Ready)
1. Update `.env` with real API URL
2. Set `NEXT_PUBLIC_USE_MOCK_API="false"`
3. Migrate APIs one by one
4. Test each migration

---

**API Migration Examples** ✅

