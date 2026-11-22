/**
 * API Route: Test CRUD Operations
 * GET /api/db/test-crud
 */

import { NextResponse } from 'next/server';
import { testCrudOperations } from '@/lib/db-crud-test';

export async function GET() {
  // This endpoint is a demonstration implementation, not a production service.
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { success: false, error: { code: 'DEMO_DISABLED', message: 'Demo endpoint is unavailable in production' } },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  try {
    const result = await testCrudOperations();

    if (result.errors.length === 0 && result.create && result.read && result.update && result.delete) {
      return NextResponse.json(
        {
          success: true,
          message: 'All CRUD operations successful',
          data: result,
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'Some CRUD operations failed',
          data: result,
        },
        { status: 500 },
      );
    }
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'CRUD_TEST_ERROR',
          message: (error instanceof Error ? error.message : 'Internal server error') || 'Failed to test CRUD operations',
        },
      },
      { status: 500 },
    );
  }
}

