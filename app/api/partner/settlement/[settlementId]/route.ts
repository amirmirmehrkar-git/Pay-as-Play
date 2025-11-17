import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/partner/settlement/:settlementId
 * Get detailed settlement information
 * 
 * This is a mock implementation for development.
 * In production, this should connect to the actual backend.
 */

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ settlementId: string }> }
) {
  try {
    const { settlementId } = await params;

    if (!settlementId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Settlement ID is required',
          },
        },
        { status: 400 }
      );
    }

    // Generate mock settlement details
    const now = new Date();
    const settlementDate = new Date(now);
    settlementDate.setMonth(settlementDate.getMonth() - 1);

    const statuses: ('pending' | 'completed' | 'failed')[] = ['pending', 'completed', 'failed'];
    const status = statuses[Math.floor(Math.random() * 3)] as 'pending' | 'completed' | 'failed';

    // Generate mock transactions
    const transactions = [];
    const totalRevenue = Math.floor(Math.random() * 5000) + 1000;
    let currentTotal = 0;

    for (let i = 0; i < 25; i++) {
      const transactionDate = new Date(settlementDate);
      transactionDate.setDate(transactionDate.getDate() - Math.floor(i / 5));
      transactionDate.setHours(transactionDate.getHours() - (i % 5) * 2);

      const amount = Math.floor(Math.random() * 50) + 5;
      const fee = amount * 0.1; // 10% platform fee
      const netAmount = amount - fee;
      currentTotal += amount;

      transactions.push({
        transactionId: `tx_${Math.random().toString(36).substring(2, 11)}`,
        date: transactionDate.toISOString(),
        userId: `user_${Math.random().toString(36).substring(2, 9)}`,
        contentId: `content_${Math.random().toString(36).substring(2, 9)}`,
        contentName: `Content ${i + 1}`,
        duration: Math.floor(Math.random() * 120) + 10, // 10-130 minutes
        amount,
        fee,
        netAmount,
        contentType: ['video', 'audio', 'learn', 'entertainment'][i % 4] as string,
      });
    }

    const totalFees = transactions.reduce((sum, t) => sum + t.fee, 0);
    const netSettlementAmount = totalRevenue - totalFees;

    // Calculate breakdown by content type
    const breakdownByType = transactions.reduce((acc, t) => {
      const type = t.contentType;
      if (!acc[type]) {
        acc[type] = { revenue: 0, fees: 0, transactions: 0 };
      }
      acc[type].revenue += t.amount;
      acc[type].fees += t.fee;
      acc[type].transactions += 1;
      return acc;
    }, {} as Record<string, { revenue: number; fees: number; transactions: number }>);

    // Mock response
    return NextResponse.json(
      {
        success: true,
        data: {
          settlementId,
          settlementDate: settlementDate.toISOString(),
          settlementPeriod: {
            start: new Date(settlementDate.getFullYear(), settlementDate.getMonth(), 1).toISOString(),
            end: new Date(settlementDate.getFullYear(), settlementDate.getMonth() + 1, 0).toISOString(),
          },
          amount: totalRevenue,
          status,
          paymentMethod: status === 'completed' ? 'Bank Transfer' : null,
          transactionCount: transactions.length,
          currency: 'EUR',
          financialSummary: {
            totalRevenue,
            totalFees,
            netSettlementAmount,
            breakdownByType: Object.entries(breakdownByType).map(([type, data]) => ({
              type,
              revenue: data.revenue,
              fees: data.fees,
              transactionCount: data.transactions,
            })),
          },
          transactions,
          statusDetails: {
            expectedPaymentDate: status === 'pending' ? new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString() : null,
            errorMessage: status === 'failed' ? 'Payment processing failed. Please contact support.' : null,
            transactionHash: status === 'completed' ? `0x${Math.random().toString(16).substring(2, 66)}` : null,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching settlement details:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch settlement details',
        },
      },
      { status: 500 }
    );
  }
}

