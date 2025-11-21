import { NextRequest, NextResponse } from 'next/server';

interface TimeWatchedDataPoint {
  date: string;
  minutes: number;
}

// Generate mock time watched data
function generateTimeWatchedData(
  startDate: Date,
  endDate: Date,
  groupBy: 'day' | 'week' | 'month'
): TimeWatchedDataPoint[] {
  const data: TimeWatchedDataPoint[] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    let dateStr: string;
    let nextDate: Date;

    if (groupBy === 'day') {
      dateStr = current.toISOString().split('T')[0];
      nextDate = new Date(current);
      nextDate.setDate(nextDate.getDate() + 1);
    } else if (groupBy === 'week') {
      // Get start of week (Monday)
      const day = current.getDay();
      const diff = current.getDate() - day + (day === 0 ? -6 : 1);
      const weekStart = new Date(current.setDate(diff));
      dateStr = weekStart.toISOString().split('T')[0];
      nextDate = new Date(weekStart);
      nextDate.setDate(nextDate.getDate() + 7);
    } else {
      // Month
      dateStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-01`;
      nextDate = new Date(current.getFullYear(), current.getMonth() + 1, 1);
    }

    // Generate random minutes (30-180 for day, 200-1200 for week, 1000-5000 for month)
    const baseMinutes = groupBy === 'day' ? 30 : groupBy === 'week' ? 200 : 1000;
    const range = groupBy === 'day' ? 150 : groupBy === 'week' ? 1000 : 4000;
    const minutes = Math.floor(Math.random() * range) + baseMinutes;

    data.push({ date: dateStr, minutes });

    current.setTime(nextDate.getTime());
  }

  return data;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');
    const groupBy = (searchParams.get('groupBy') || 'day') as 'day' | 'week' | 'month';

    // Default to last 30 days if not provided
    const endDate = endDateParam ? new Date(endDateParam) : new Date();
    const startDate = startDateParam
      ? new Date(startDateParam)
      : new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Validate dates
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid date format' } },
        { status: 400 }
      );
    }

    if (startDate > endDate) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Start date must be before end date' } },
        { status: 400 }
      );
    }

    const data = generateTimeWatchedData(startDate, endDate, groupBy);

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching time watched data:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: error.message || 'Internal server error' } },
      { status: 500 }
    );
  }
}

