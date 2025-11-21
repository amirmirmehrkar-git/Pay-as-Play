import { NextRequest, NextResponse } from 'next/server';

// Mock withdrawal history
const generateMockHistory = () => {
  const methods = ['bank_transfer', 'paypal', 'crypto'] as const;
  const statuses = ['pending', 'processing', 'completed', 'failed'] as const;
  const history = [];

  for (let i = 0; i < 10; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 90)); // Last 90 days
    const amount = parseFloat((Math.random() * 500 + 10).toFixed(2));
    const fee = Math.max(amount * 0.02, 1);
    const method = methods[Math.floor(Math.random() * methods.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    let details: any = {};
    if (method === 'bank_transfer') {
      details = {
        iban: `DE89****${Math.floor(Math.random() * 10000)}`,
        bic: 'COBADEFFXXX',
        accountHolderName: 'John Doe',
      };
    } else if (method === 'paypal') {
      details = {
        paypalEmail: `user${i}@example.com`,
      };
    } else {
      details = {
        walletAddress: `ABCDEFGHIJKLMNOPQRSTUVWXYZ23456789ABCDEFGHJKLMNPQRSTUVWXY${i}`,
      };
    }

    history.push({
      withdrawalId: `wd_${Date.now()}_${i}`,
      amount,
      fee,
      netAmount: amount - fee,
      method,
      details,
      status,
      createdAt: date.toISOString(),
      completedAt: status === 'completed' ? new Date(date.getTime() + 24 * 60 * 60 * 1000).toISOString() : null,
      estimatedProcessingTime: method === 'crypto' ? '1-2 hours' : method === 'paypal' ? '24-48 hours' : '3-5 business days',
      errorMessage: status === 'failed' ? 'Payment processing failed. Please try again.' : null,
    });
  }

  return history.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

const mockHistory = generateMockHistory();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const method = searchParams.get('method');

    let filteredHistory = [...mockHistory];

    if (status && status !== 'all') {
      filteredHistory = filteredHistory.filter((w) => w.status === status);
    }

    if (method && method !== 'all') {
      filteredHistory = filteredHistory.filter((w) => w.method === method);
    }

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(
      {
        success: true,
        data: filteredHistory,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching withdrawal history:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: error.message || 'Internal server error' } },
      { status: 500 }
    );
  }
}

