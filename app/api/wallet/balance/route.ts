import { NextResponse } from 'next/server';

interface WalletBalance {
  balance: number;
  currency: string;
  averageMinuteCost: number;
  estimatedMinutesLeft: number;
  lastUpdated: string;
  recommendedTopUp: number;
  status: 'ok' | 'warning' | 'critical';
}

let mockBalance: WalletBalance = {
  balance: 8.75,
  currency: 'EUR',
  averageMinuteCost: 0.45,
  estimatedMinutesLeft: 18,
  lastUpdated: new Date().toISOString(),
  recommendedTopUp: 25,
  status: 'warning',
};

export async function GET() {
  try {
    // Simulate minor fluctuations for realism
    const fluctuation = (Math.random() - 0.5) * 0.4;
    mockBalance = {
      ...mockBalance,
      balance: Math.max(0, parseFloat((mockBalance.balance + fluctuation).toFixed(2))),
      estimatedMinutesLeft: Math.max(
        0,
        Math.floor((mockBalance.balance + fluctuation) / mockBalance.averageMinuteCost * 2)
      ),
      status:
        mockBalance.balance < 2
          ? 'critical'
          : mockBalance.balance < 10
            ? 'warning'
            : 'ok',
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(
      { success: true, data: mockBalance },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error fetching wallet balance:', error);
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

