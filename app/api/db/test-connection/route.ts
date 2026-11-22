/**
 * API Route: Test Database Connection
 * GET /api/db/test-connection
 */

import { NextResponse } from 'next/server';
import { testDatabaseConnection } from '@/lib/db-connection';

export async function GET() {
  // This endpoint is a demonstration implementation, not a production service.
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { success: false, error: { code: 'DEMO_DISABLED', message: 'Demo endpoint is unavailable in production' } },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  try {
    const result = await testDatabaseConnection();

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: result.message,
          data: {
            connected: true,
            timestamp: new Date().toISOString(),
          },
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
          error: {
            code: 'DB_CONNECTION_ERROR',
            message: result.(error instanceof Error ? error.message : 'Internal server error') || 'Unknown error',
          },
        },
        { status: 500 },
      );
    }
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'DB_ERROR',
          message: (error instanceof Error ? error.message : 'Internal server error') || 'Failed to test database connection',
        },
      },
      { status: 500 },
    );
  }
}

