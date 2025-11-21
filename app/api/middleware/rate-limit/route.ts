import { NextRequest, NextResponse } from 'next/server';
import { apiRateLimiter } from '@/lib/security/rate-limit-enhanced';

/**
 * Rate Limit Check Endpoint
 * Can be used to check rate limit status
 */
export async function GET(request: NextRequest) {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const result = await apiRateLimiter.check(ip);

  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: result.message || 'Rate limit exceeded',
        },
        reset: result.reset,
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': '100',
          'X-RateLimit-Remaining': String(result.remaining),
          'X-RateLimit-Reset': String(result.reset),
          'Retry-After': String(Math.ceil((result.reset - Date.now()) / 1000)),
        },
      },
    );
  }

  return NextResponse.json(
    {
      success: true,
      remaining: result.remaining,
      reset: result.reset,
    },
    {
      headers: {
        'X-RateLimit-Limit': '100',
        'X-RateLimit-Remaining': String(result.remaining),
        'X-RateLimit-Reset': String(result.reset),
      },
    },
  );
}

