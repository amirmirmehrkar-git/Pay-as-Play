# Performance Optimization Guide - Pay as Play

**Date:** 2025-01-XX  
**Status:** Implementation Guide

---

## 📋 Overview

This guide covers performance optimizations implemented for the Pay as Play application.

---

## 🗄️ Database Optimization

### 1. Query Optimization

**Optimized Queries:**
- `getUserWithWallet()` - Single query instead of multiple
- `getTransactionsPaginated()` - Efficient pagination with count
- `getNotificationsPaginated()` - Batch queries

**Location:** `lib/db-optimization.ts`

### 2. Database Indexes

**Recommended Indexes:**
```prisma
// Add to schema.prisma
model Transaction {
  // ... existing fields
  @@index([userId, createdAt])
  @@index([status])
}

model Notification {
  // ... existing fields
  @@index([userId, createdAt])
  @@index([read])
}

model Session {
  // ... existing fields
  @@index([userId, status])
  @@index([platformId])
}
```

---

## 🚀 API Caching

### Implementation

**Cache Utility:** `lib/cache.ts`

**Usage:**
```typescript
import { withCache, getCacheKey } from '@/lib/cache';

// In API route
const cacheKey = getCacheKey('/api/wallet/balance', { userId });
const data = await withCache(cacheKey, async () => {
  return await fetchBalance(userId);
}, 60000); // 1 minute TTL
```

### Cache Strategy

- **Static Data:** Long TTL (5-10 minutes)
- **User Data:** Short TTL (1-2 minutes)
- **Real-time Data:** No cache

---

## 📦 Frontend Bundle Optimization

### 1. Code Splitting

**Next.js Configuration:** `next.config.js`

**Features:**
- Automatic code splitting
- Route-based splitting
- Component lazy loading

### 2. Tree Shaking

**Enabled:** Yes (via SWC)

**Optimized Packages:**
- `@heroicons/react` - Only imported icons
- `recharts` - Only used components

### 3. Bundle Analysis

**Commands:**
```bash
# Analyze bundle size
npm run build
# Check .next/analyze for bundle report
```

---

## 🖼️ Image Optimization

### 1. Next.js Image Component

**Usage:**
```tsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
/>
```

### 2. Image Formats

**Supported:**
- AVIF (modern browsers)
- WebP (fallback)
- JPEG/PNG (legacy)

**Configuration:** `next.config.js`

---

## ⚡ Performance Metrics

### Core Web Vitals

**Targets:**
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

### Measurement

**Tools:**
- Lighthouse
- Web Vitals extension
- Next.js Analytics

**Commands:**
```bash
# Run Lighthouse
npm run lighthouse

# Or use Chrome DevTools
```

---

## 📊 Performance Budget

### Bundle Size

- **Initial Load:** < 200KB (gzipped)
- **Total Bundle:** < 500KB (gzipped)
- **Per Route:** < 100KB (gzipped)

### API Response Time

- **Fast:** < 200ms
- **Acceptable:** < 500ms
- **Slow:** > 500ms (needs optimization)

---

## 🔧 Optimization Checklist

### Database:
- [x] Query optimization utilities created
- [ ] Database indexes added
- [ ] N+1 queries eliminated
- [ ] Pagination implemented

### API:
- [x] Caching utility created
- [ ] Cache headers configured
- [ ] Response caching implemented
- [ ] Cache invalidation strategy

### Frontend:
- [x] Next.js config optimized
- [x] Code splitting configured
- [ ] Bundle size analyzed
- [ ] Tree shaking verified

### Images:
- [x] Next.js Image component ready
- [ ] Images optimized
- [ ] Lazy loading implemented
- [ ] WebP format used

---

## 📚 Resources

- `lib/cache.ts` - Caching utility
- `lib/db-optimization.ts` - Database optimization
- `next.config.js` - Next.js configuration
- `docs/performance/PERFORMANCE_OPTIMIZATION_GUIDE.md` - This guide

---

**Performance Optimization Guide** ✅

