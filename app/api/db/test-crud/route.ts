/**
 * API Route: Test CRUD Operations
 * GET /api/db/test-crud
 */

import { NextResponse } from 'next/server';
import { testCrudOperations } from '@/lib/db-crud-test';

export async function GET() {
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
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'CRUD_TEST_ERROR',
          message: error?.message || 'Failed to test CRUD operations',
        },
      },
      { status: 500 },
    );
  }
}

