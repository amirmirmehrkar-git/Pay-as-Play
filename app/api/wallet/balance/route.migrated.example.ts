/**
 * Example: Migrated Wallet Balance API
 * This shows how to migrate from mock to real API using Proxy Pattern
 */

import { NextRequest, NextResponse } from 'next/server';
import { proxyToBackend, shouldUseMock } from '@/lib/api-migration-helper';

export async function GET(request: NextRequest) {
  // Check if we should use mock or real API
  if (shouldUseMock()) {
    // Fallback to mock implementation
    // (Keep existing mock code here)
    return NextResponse.json({
      success: true,
      data: {
        balance: 8.75,
        currency: 'EUR',
        // ... mock data
      },
    });
  }

  // Use real backend API
  try {
    return await proxyToBackend('/wallet/balance', request);
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'BALANCE_ERROR',
          message: error?.message || 'Failed to fetch wallet balance',
        },
      },
      { status: 500 },
    );
  }
}

