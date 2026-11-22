import { NextResponse } from 'next/server';

/** Mock routes are local demo helpers, never production authentication. */
export function demoAuthenticationUnavailable(): NextResponse | null {
  if (process.env.NODE_ENV === 'development' && process.env.ENABLE_DEMO_AUTH === 'true') {
    return null;
  }
  return NextResponse.json(
    { success: false, error: { message: 'Authentication is not configured.' } },
    { status: 503, headers: { 'Cache-Control': 'no-store' } },
  );
}
