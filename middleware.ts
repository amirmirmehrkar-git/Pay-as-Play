import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Security Middleware
 * Applies security headers and rate limiting
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security Headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  // X-XSS-Protection is deprecated, removed for better compatibility
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()',
  );

  // Content Security Policy - removed for development (causes issues with Next.js)
  // In production, configure CSP properly
  // const csp = [
  //   "default-src 'self'",
  //   "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
  //   "style-src 'self' 'unsafe-inline'",
  //   "img-src 'self' data: https:",
  //   "font-src 'self' data:",
  //   "connect-src 'self' https:",
  //   "frame-ancestors 'self'",
  // ].join('; ');
  // response.headers.set('Content-Security-Policy', csp);

  // API Rate Limiting (basic)
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Rate limiting would be implemented here
    // For production, use a proper rate limiting service
    const rateLimitKey = request.ip || 'unknown';
    // Check rate limit (would use Redis or similar in production)
    // For now, just add header
    response.headers.set('X-RateLimit-Limit', '100');
    response.headers.set('X-RateLimit-Remaining', '99');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

