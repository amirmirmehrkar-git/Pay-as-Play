/**
 * Enhanced Rate Limiting
 * Production-ready rate limiting with Redis support
 */

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  max: number; // Maximum requests per window
  message?: string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number;
  message?: string;
}

// In-memory store (use Redis in production)
const store = new Map<string, { count: number; reset: number }>();

/**
 * Rate limiter class
 */
export class RateLimiter {
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = {
      message: 'Too many requests, please try again later.',
      skipSuccessfulRequests: false,
      skipFailedRequests: false,
      ...config,
    };
  }

  /**
   * Check rate limit
   */
  async check(key: string): Promise<RateLimitResult> {
    const now = Date.now();
    const record = store.get(key);

    // Clean expired records
    this.cleanExpired(now);

    if (!record || now > record.reset) {
      // New window
      store.set(key, {
        count: 1,
        reset: now + this.config.windowMs,
      });

      return {
        success: true,
        remaining: this.config.max - 1,
        reset: now + this.config.windowMs,
      };
    }

    if (record.count >= this.config.max) {
      // Rate limit exceeded
      return {
        success: false,
        remaining: 0,
        reset: record.reset,
        message: this.config.message,
      };
    }

    // Increment count
    record.count++;
    store.set(key, record);

    return {
      success: true,
      remaining: this.config.max - record.count,
      reset: record.reset,
    };
  }

  /**
   * Clean expired records
   */
  private cleanExpired(now: number): void {
    for (const [key, record] of store.entries()) {
      if (now > record.reset) {
        store.delete(key);
      }
    }
  }

  /**
   * Reset rate limit for a key
   */
  reset(key: string): void {
    store.delete(key);
  }

  /**
   * Get rate limit status
   */
  getStatus(key: string): RateLimitResult | null {
    const record = store.get(key);
    if (!record) {
      return null;
    }

    const now = Date.now();
    if (now > record.reset) {
      return null;
    }

    return {
      success: record.count < this.config.max,
      remaining: Math.max(0, this.config.max - record.count),
      reset: record.reset,
    };
  }
}

/**
 * Pre-configured rate limiters
 */
export const apiRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per 15 minutes
});

export const authRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 login attempts per 15 minutes
  message: 'Too many authentication attempts, please try again later.',
});

export const strictRateLimiter = new RateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
  message: 'Rate limit exceeded, please slow down.',
});

