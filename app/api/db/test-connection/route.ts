/**
 * API Route: Test Database Connection
 * GET /api/db/test-connection
 */

import { NextResponse } from 'next/server';
import { testDatabaseConnection } from '@/lib/db-connection';

export async function GET() {
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
            message: result.error?.message || 'Unknown error',
          },
        },
        { status: 500 },
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'DB_ERROR',
          message: error?.message || 'Failed to test database connection',
        },
      },
      { status: 500 },
    );
  }
}

