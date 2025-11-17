import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/partner/settlement/overview
 * Get settlement overview data
 * 
 * This is a mock implementation for development.
 * In production, this should connect to the actual backend.
 */

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateRange = searchParams.get('dateRange') || 'thisMonth';
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Mock data based on date range
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Calculate dates based on range
    let start: Date;
    let end: Date = new Date(currentYear, currentMonth + 1, 0); // End of current month

    switch (dateRange) {
      case 'thisMonth':
        start = new Date(currentYear, currentMonth, 1);
        break;
      case 'lastMonth':
        start = new Date(currentYear, currentMonth - 1, 1);
        end = new Date(currentYear, currentMonth, 0);
        break;
      case 'last6Months':
        start = new Date(currentYear, currentMonth - 5, 1);
        break;
      case 'custom':
        if (startDate && endDate) {
          start = new Date(startDate);
          end = new Date(endDate);
        } else {
          start = new Date(currentYear, currentMonth, 1);
        }
        break;
      default:
        start = new Date(currentYear, currentMonth, 1);
    }

    // Generate mock revenue history (last 6 months)
    const revenueHistory = [];
    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date(currentYear, currentMonth - i, 1);
      revenueHistory.push({
        month: `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, '0')}`,
        revenue: Math.floor(Math.random() * 5000) + 5000, // 5000-10000
      });
    }

    // Mock response
    return NextResponse.json(
      {
        success: true,
        data: {
          totalRevenue: 12500.50,
          pendingSettlements: 3200.75,
          completedSettlements: 9299.75,
          nextSettlementDate: new Date(currentYear, currentMonth + 1, 1).toISOString(),
          revenueHistory,
          currency: 'EUR',
          period: {
            start: start.toISOString(),
            end: end.toISOString(),
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching settlement overview:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch settlement overview',
        },
      },
      { status: 500 }
    );
  }
}

