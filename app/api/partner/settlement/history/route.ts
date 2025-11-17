import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/partner/settlement/history
 * Get settlement history with filters and pagination
 * 
 * This is a mock implementation for development.
 * In production, this should connect to the actual backend.
 */

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') || 'all';
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const sortBy = searchParams.get('sortBy') || 'date';
    const search = searchParams.get('search');

    // Generate mock settlements
    const allSettlements = [];
    const now = new Date();
    
    for (let i = 0; i < 50; i++) {
      const settlementDate = new Date(now);
      settlementDate.setMonth(settlementDate.getMonth() - Math.floor(i / 5));
      settlementDate.setDate(settlementDate.getDate() - (i % 5) * 7);

      const statuses: ('pending' | 'completed' | 'failed')[] = ['pending', 'completed', 'failed'];
      const settlementStatus = statuses[i % 3] as 'pending' | 'completed' | 'failed';

      const settlementId = `stl_${Math.random().toString(36).substring(2, 11)}`;
      const amount = Math.floor(Math.random() * 5000) + 1000;
      const transactionCount = Math.floor(Math.random() * 100) + 10;

      allSettlements.push({
        settlementId,
        settlementDate: settlementDate.toISOString(),
        amount,
        status: settlementStatus,
        period: `${settlementDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`,
        transactionCount,
        platformId: 'pp_abc123',
      });
    }

    // Apply filters
    let filtered = allSettlements;

    if (status !== 'all') {
      filtered = filtered.filter((s) => s.status === status);
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filtered = filtered.filter((s) => {
        const date = new Date(s.settlementDate);
        return date >= start && date <= end;
      });
    }

    if (search) {
      filtered = filtered.filter((s) => s.settlementId.toLowerCase().includes(search.toLowerCase()));
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.settlementDate).getTime() - new Date(a.settlementDate).getTime();
      } else if (sortBy === 'amount') {
        return b.amount - a.amount;
      }
      return 0;
    });

    // Pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const settlements = filtered.slice(startIndex, endIndex);

    // Mock response
    return NextResponse.json(
      {
        success: true,
        data: {
          settlements,
          pagination: {
            page,
            limit,
            total,
            totalPages,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching settlement history:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch settlement history',
        },
      },
      { status: 500 }
    );
  }
}

