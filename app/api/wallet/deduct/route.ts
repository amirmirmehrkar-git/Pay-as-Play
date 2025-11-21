import { NextRequest, NextResponse } from 'next/server';

interface DeductRequest {
  amount: number;
  currency?: string;
  sessionId?: string;
  description?: string;
}

let mockBalance = 8.75; // EUR

export async function POST(request: NextRequest) {
  try {
    const body: DeductRequest = await request.json();
    const { amount, currency = 'EUR', sessionId, description } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_AMOUNT',
            message: 'Amount must be positive',
          },
        },
        { status: 400 },
      );
    }

    // Check if balance is sufficient
    if (mockBalance < amount) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INSUFFICIENT_BALANCE',
            message: `Insufficient balance. Current balance: ${mockBalance.toFixed(2)} ${currency}`,
            currentBalance: mockBalance,
            requiredAmount: amount,
          },
        },
        { status: 400 },
      );
    }

    // Deduct from balance
    mockBalance = Math.max(0, mockBalance - amount);
    const newBalance = mockBalance;

    return NextResponse.json(
      {
        success: true,
        data: {
          transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          amount: amount,
          currency: currency,
          previousBalance: mockBalance + amount,
          newBalance: newBalance,
          sessionId: sessionId,
          description: description || 'Content consumption',
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error deducting from wallet:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'DEDUCT_ERROR',
          message: error?.message || 'Failed to deduct from wallet',
        },
      },
      { status: 500 },
    );
  }
}

// GET endpoint to check current balance
export async function GET() {
  return NextResponse.json(
    {
      success: true,
      data: {
        balance: mockBalance,
        currency: 'EUR',
      },
    },
    { status: 200 },
  );
}

