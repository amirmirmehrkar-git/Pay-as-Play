# Monitoring & Logging Guide - Pay as Play

**Date:** 2025-01-XX  
**Status:** Production Ready

---

## 📋 Overview

This guide covers monitoring and logging infrastructure for the Pay as Play application.

---

## 🔍 Error Tracking

### Implementation

**Error Tracker:** `lib/monitoring/error-tracker.ts`

**Features:**
- Error logging
- Error context tracking
- Error categorization
- User context

**Usage:**
```typescript
import { errorTracker } from '@/lib/monitoring/error-tracker';

try {
  // Your code
} catch (error) {
  errorTracker.trackError(error as Error, {
    userId: user.id,
    endpoint: '/api/wallet/balance',
  });
}
```

### Error Tracking Service (Sentry)

**Setup:**
1. Install Sentry: `npm install @sentry/nextjs`
2. Configure Sentry in `sentry.client.config.ts`
3. Set `ERROR_TRACKING_ENABLED=true` in environment

---

## 📊 Performance Monitoring

### Implementation

**Performance Monitor:** `lib/monitoring/performance.ts`

**Features:**
- API response time tracking
- Database query time tracking
- Core Web Vitals tracking
- Metric aggregation

**Usage:**
```typescript
import { performanceMonitor } from '@/lib/monitoring/performance';

// Record API response time
const start = Date.now();
// ... API call ...
const duration = Date.now() - start;
performanceMonitor.recordApiResponse('/api/wallet/balance', 'GET', duration, 200);

// Record Core Web Vital
performanceMonitor.recordWebVital('LCP', 2500);
```

### Metrics Endpoint

**GET /api/monitoring/metrics**

Returns:
- Recent metrics
- Average response times
- Performance statistics

---

## 📝 Logging

### Implementation

**Logger:** `lib/logging/logger.ts`

**Log Levels:**
- DEBUG (0)
- INFO (1)
- WARN (2)
- ERROR (3)
- FATAL (4)

**Usage:**
```typescript
import { logger } from '@/lib/logging/logger';

logger.info('User logged in', { userId: user.id });
logger.error('Failed to process payment', error, { orderId: order.id });
```

### Log Configuration

**Environment Variables:**
```env
LOG_LEVEL=INFO  # DEBUG, INFO, WARN, ERROR, FATAL
NODE_ENV=production
```

---

## 🚨 Alerting System

### Implementation

**Alert Manager:** `lib/monitoring/alerts.ts`

**Alert Channels:**
- Email
- Slack
- Webhook
- SMS

**Usage:**
```typescript
import { alertManager } from '@/lib/monitoring/alerts';

alertManager.registerRule({
  name: 'high_error_rate',
  condition: async () => {
    // Check error rate
    return errorRate > threshold;
  },
  severity: 'high',
  message: 'High error rate detected',
  channels: ['email', 'slack'],
});
```

### Default Alerts

- **High Error Rate:** Triggers when error rate > threshold
- **Slow API Response:** Triggers when API response time > 1s
- **Database Issues:** Triggers on database errors

---

## 📈 Monitoring Dashboard

### Metrics to Monitor

1. **Error Rate:**
   - Total errors per minute
   - Error rate by endpoint
   - Error rate by type

2. **Performance:**
   - API response times
   - Database query times
   - Core Web Vitals

3. **Usage:**
   - Request volume
   - Active users
   - API endpoint usage

---

## 🔧 Configuration

### Environment Variables

```env
# Error Tracking
ERROR_TRACKING_ENABLED=true
SENTRY_DSN=your-sentry-dsn

# Monitoring
MONITORING_ENABLED=true
MONITORING_ENDPOINT=https://monitoring-service.com

# Logging
LOG_LEVEL=INFO

# Alerts
SLACK_WEBHOOK_URL=https://hooks.slack.com/...
ALERT_WEBHOOK_URL=https://your-webhook.com
```

---

## 📚 Resources

- `lib/monitoring/` - Monitoring utilities
- `lib/logging/` - Logging utilities
- `app/api/monitoring/` - Monitoring endpoints
- `docs/monitoring/MONITORING_GUIDE.md` - This guide

---

**Monitoring & Logging Guide** ✅

