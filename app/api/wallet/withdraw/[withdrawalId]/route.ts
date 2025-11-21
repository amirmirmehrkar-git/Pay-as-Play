import { NextRequest, NextResponse } from 'next/server';

// Mock withdrawal details (in a real app, this would come from a database)
const mockWithdrawals: Record<string, any> = {
  'wd_123': {
    withdrawalId: 'wd_123',
    amount: 100,
    fee: 2,
    netAmount: 98,
    method: 'bank_transfer',
    details: {
      iban: 'DE89370400440532013000',
      bic: 'COBADEFFXXX',
      accountHolderName: 'John Doe',
      bankName: 'Commerzbank',
    },
    status: 'completed',
    createdAt: '2025-01-15T10:00:00Z',
    completedAt: '2025-01-18T14:30:00Z',
    estimatedProcessingTime: '3-5 business days',
    transactionId: 'tx_bank_abc123',
  },
  'wd_456': {
    withdrawalId: 'wd_456',
    amount: 50,
    fee: 1,
    netAmount: 49,
    method: 'paypal',
    details: {
      paypalEmail: 'user@example.com',
    },
    status: 'processing',
    createdAt: '2025-01-20T09:00:00Z',
    estimatedProcessingTime: '24-48 hours',
  },
  'wd_789': {
    withdrawalId: 'wd_789',
    amount: 200,
    fee: 4,
    netAmount: 196,
    method: 'crypto',
    details: {
      walletAddress: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ23456789ABCDEFGHJKLMNPQRSTUVWXY',
    },
    status: 'failed',
    createdAt: '2025-01-10T12:00:00Z',
    estimatedProcessingTime: '1-2 hours',
    errorMessage: 'Invalid wallet address or network error',
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { withdrawalId: string } }
) {
  try {
    const { withdrawalId } = params;

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const withdrawal = mockWithdrawals[withdrawalId];

    if (withdrawal) {
      return NextResponse.json({ success: true, data: withdrawal }, { status: 200 });
    } else {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Withdrawal not found' } },
        { status: 404 }
      );
    }
  } catch (error: any) {
    console.error('Error fetching withdrawal details:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: error.message || 'Internal server error' } },
      { status: 500 }
    );
  }
}

