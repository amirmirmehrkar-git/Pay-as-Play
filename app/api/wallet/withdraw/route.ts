import { NextRequest, NextResponse } from 'next/server';

interface WithdrawalRequest {
  amount: number;
  method: 'bank_transfer' | 'paypal' | 'crypto';
  details: {
    // Bank Transfer
    iban?: string;
    bic?: string;
    accountHolderName?: string;
    bankName?: string;
    // PayPal
    paypalEmail?: string;
    // Crypto
    walletAddress?: string;
  };
  saveMethod?: boolean;
}

// Mock in-memory store for withdrawals
let withdrawalCounter = 1;
const mockWithdrawals: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body: WithdrawalRequest = await request.json();

    // Validation
    if (!body.amount || body.amount < 10) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Minimum withdrawal amount is 10 EUR' } },
        { status: 400 }
      );
    }

    if (!body.method) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Withdrawal method is required' } },
        { status: 400 }
      );
    }

    // Validate method-specific details
    if (body.method === 'bank_transfer') {
      if (!body.details.iban || !body.details.bic || !body.details.accountHolderName) {
        return NextResponse.json(
          { success: false, error: { code: 'VALIDATION_ERROR', message: 'IBAN, BIC, and account holder name are required for bank transfer' } },
          { status: 400 }
        );
      }
      // Basic IBAN validation (format check)
      const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{4,30}$/;
      if (!ibanRegex.test(body.details.iban.replace(/\s/g, ''))) {
        return NextResponse.json(
          { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid IBAN format' } },
          { status: 400 }
        );
      }
    } else if (body.method === 'paypal') {
      if (!body.details.paypalEmail) {
        return NextResponse.json(
          { success: false, error: { code: 'VALIDATION_ERROR', message: 'PayPal email is required' } },
          { status: 400 }
        );
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.details.paypalEmail)) {
        return NextResponse.json(
          { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid email format' } },
          { status: 400 }
        );
      }
    } else if (body.method === 'crypto') {
      if (!body.details.walletAddress) {
        return NextResponse.json(
          { success: false, error: { code: 'VALIDATION_ERROR', message: 'Wallet address is required' } },
          { status: 400 }
        );
      }
      // Algorand address validation (58 characters, base32)
      const algoRegex = /^[A-Z2-7]{58}$/;
      if (!algoRegex.test(body.details.walletAddress)) {
        return NextResponse.json(
          { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid Algorand address format' } },
          { status: 400 }
        );
      }
    }

    // Calculate fees (mock: 2% or minimum 1 EUR)
    const fee = Math.max(body.amount * 0.02, 1);
    const netAmount = body.amount - fee;

    // Create withdrawal record
    const withdrawal = {
      withdrawalId: `wd_${Date.now()}_${withdrawalCounter++}`,
      amount: body.amount,
      fee,
      netAmount,
      method: body.method,
      details: body.details,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
      estimatedProcessingTime: body.method === 'crypto' ? '1-2 hours' : body.method === 'paypal' ? '24-48 hours' : '3-5 business days',
    };

    mockWithdrawals.push(withdrawal);

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json(
      {
        success: true,
        data: withdrawal,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error processing withdrawal:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: error.message || 'Internal server error' } },
      { status: 500 }
    );
  }
}

