import { NextRequest, NextResponse } from 'next/server';
import { demoAuthenticationUnavailable } from '@/lib/security/demo-auth';

// Synthetic demo records only. Never commit banking/contact/wallet details here.
const mockWithdrawals: Record<string, any> = {
  'wd_123': {
    withdrawalId: 'wd_123',
    amount: 100,
    fee: 2,
    netAmount: 98,
    method: 'bank_transfer',
    details: {
      iban: '',
      bic: '',
      accountHolderName: '',
      bankName: '',
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
      paypalEmail: '',
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
      walletAddress: '',
    },
    status: 'failed',
    createdAt: '2025-01-10T12:00:00Z',
    estimatedProcessingTime: '1-2 hours',
    errorMessage: 'Invalid wallet address or network error',
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ withdrawalId: string }> }
) {
  const unavailable = demoAuthenticationUnavailable();
  if (unavailable) return unavailable;
  try {
    const { withdrawalId } = await params;

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

