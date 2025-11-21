/**
 * Rate Limiting Utilities
 * Simple in-memory rate limiting (for development)
 * For production, use Redis or similar
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

const DEFAULT_WINDOW_MS = 60 * 1000; // 1 minute
const DEFAULT_MAX_REQUESTS = 100;

export interface RateLimitConfig {
  windowMs?: number; // Time window in milliseconds
  maxRequests?: number; // Maximum requests per window
  keyGenerator?: (request: Request) => string; // Custom key generator
}

/**
 * Rate limit middleware
 */
export async function rateLimit(
  request: Request,
  config: RateLimitConfig = {},
): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
  const {
    windowMs = DEFAULT_WINDOW_MS,
    maxRequests = DEFAULT_MAX_REQUESTS,
    keyGenerator = defaultKeyGenerator,
  } = config;

  const key = keyGenerator(request);
  const now = Date.now();

  // Get or create rate limit entry
  let entry = store[key];

  if (!entry || now >= entry.resetTime) {
    // Create new window
    entry = {
      count: 0,
      resetTime: now + windowMs,
    };
    store[key] = entry;
  }

  // Increment count
  entry.count++;

  // Check if limit exceeded
  const allowed = entry.count <= maxRequests;
  const remaining = Math.max(0, maxRequests - entry.count);

  // Cleanup old entries (simple cleanup)
  cleanupOldEntries(now);

  return {
    allowed,
    remaining,
    resetTime: entry.resetTime,
  };
}

/**
 * Default key generator (IP address)
 */
function defaultKeyGenerator(request: Request): string {
  // Try to get IP from headers (for production with proxy)
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

  // Get path for per-endpoint limiting
  const path = new URL(request.url).pathname;

  return `${ip}:${path}`;
}

/**
 * Cleanup old entries
 */
function cleanupOldEntries(now: number): void {
  const keys = Object.keys(store);
  for (const key of keys) {
    if (now >= store[key].resetTime) {
      delete store[key];
    }
  }
}

/**
 * Get rate limit headers
 */
export function getRateLimitHeaders(
  remaining: number,
  resetTime: number,
): Record<string, string> {
  return {
    'X-RateLimit-Limit': DEFAULT_MAX_REQUESTS.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': Math.ceil(resetTime / 1000).toString(),
  };
}

