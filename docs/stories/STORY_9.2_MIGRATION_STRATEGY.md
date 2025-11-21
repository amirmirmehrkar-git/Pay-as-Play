# Story 9.2: Real API Integration - Migration Strategy

**Date:** 2025-01-XX  
**Story:** Epic 9 - Story 9.2  
**Status:** Infrastructure Ready

---

## 📊 Current State

### Infrastructure Ready:
- ✅ API Client (`lib/api-client.ts`)
- ✅ API Config (`lib/api-config.ts`)
- ✅ Error Handling (`lib/api-errors.ts`)
- ✅ Migration Helper (`lib/api-migration-helper.ts`)
- ✅ Migration Examples (`docs/api/API_MIGRATION_EXAMPLES.md`)

### Mock APIs:
- ✅ All APIs in `app/api/` are mock implementations
- ✅ Ready to migrate when backend is available

---

## 🎯 Migration Strategy

### Option 1: Proxy Pattern (توصیه می‌شود) ⭐

**Approach:**
- Keep Next.js API routes
- Proxy requests to real backend
- Easy toggle between mock/real

**Advantages:**
- ✅ No component changes needed
- ✅ Easy to switch
- ✅ Can add caching/logging
- ✅ Better error handling

---

### Option 2: Direct Backend Calls

**Approach:**
- Remove Next.js API routes
- Call backend directly from components
- Use API client in components

**Advantages:**
- ✅ Fewer network hops
- ✅ Direct communication
- ⚠️ Requires component changes

---

## 📋 Migration Plan

### Phase 1: Configuration ✅
- [x] API client ready
- [x] Migration helper created
- [x] Examples created
- [ ] Update `.env` when backend ready

### Phase 2: Authentication APIs
- [ ] `POST /api/auth/signin` → `POST /auth/signin`
- [ ] `POST /api/auth/signup` → `POST /auth/signup`
- [ ] `POST /api/auth/google` → `POST /auth/google`
- [ ] `POST /api/auth/refresh` → `POST /auth/refresh`

### Phase 3: Wallet APIs
- [ ] `GET /api/wallet/balance` → `GET /wallet/balance`
- [ ] `POST /api/wallet/topup` → `POST /wallet/topup`
- [ ] `GET /api/wallet/transactions` → `GET /wallet/transactions`
- [ ] Auto-topup APIs
- [ ] Withdrawal APIs

### Phase 4: Notification APIs
- [ ] `GET /api/notifications` → `GET /notifications`
- [ ] `POST /api/notifications/[id]/read` → `POST /notifications/[id]/read`
- [ ] Settings APIs

### Phase 5: Analytics APIs
- [ ] `GET /api/analytics/time-watched` → `GET /analytics/time-watched`
- [ ] `GET /api/analytics/cost-per-content` → `GET /analytics/cost-per-content`
- [ ] `GET /api/analytics/monthly-spend` → `GET /analytics/monthly-spend`

### Phase 6: Partner APIs
- [ ] Platform APIs
- [ ] API Key APIs
- [ ] Settlement APIs

### Phase 7: LMS APIs
- [ ] Connection APIs
- [ ] Sync APIs
- [ ] Progress APIs

---

## 🔧 Implementation Steps

### Step 1: Update Environment Variables

When backend is ready:

```env
NEXT_PUBLIC_API_BASE_URL="https://api.payasplay.com"
NEXT_PUBLIC_USE_MOCK_API="false"
NEXT_PUBLIC_API_VERSION="v1"
```

### Step 2: Migrate One API at a Time

For each API:
1. Update route to use `proxyToBackend()`
2. Keep mock as fallback
3. Test with mock mode
4. Test with real API mode
5. Verify error handling

### Step 3: Test All Endpoints

- [ ] Test all migrated endpoints
- [ ] Test error scenarios
- [ ] Test authentication flow
- [ ] Performance testing

---

## ✅ Migration Helper Usage

### Example:
```typescript
import { proxyToBackend, shouldUseMock } from '@/lib/api-migration-helper';

export async function GET(request: NextRequest) {
  if (shouldUseMock()) {
    // Mock implementation
  }
  
  return await proxyToBackend('/endpoint', request);
}
```

---

## 📚 Resources

- Migration Guide: `docs/api/API_MIGRATION_GUIDE.md`
- Migration Examples: `docs/api/API_MIGRATION_EXAMPLES.md`
- API Client: `lib/api-client.ts`
- Migration Helper: `lib/api-migration-helper.ts`

---

**Migration Strategy** ✅

