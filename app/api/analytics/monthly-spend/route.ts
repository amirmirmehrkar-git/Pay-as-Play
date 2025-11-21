import { NextRequest, NextResponse } from 'next/server';

interface MonthlySpendDataPoint {
  month: string; // Format: "YYYY-MM"
  spend: number;
  sessionCount: number;
  averageCostPerSession: number;
}

// Generate mock monthly spend data
function generateMonthlySpendData(months: number = 6): MonthlySpendDataPoint[] {
  const data: MonthlySpendDataPoint[] = [];
  const today = new Date();

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const spend = parseFloat((Math.random() * 200 + 50).toFixed(2)); // €50-250
    const sessionCount = Math.floor(Math.random() * 50) + 10; // 10-60 sessions
    const averageCostPerSession = parseFloat((spend / sessionCount).toFixed(2));

    data.push({
      month,
      spend,
      sessionCount,
      averageCostPerSession,
    });
  }

  return data;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const monthsParam = searchParams.get('months');
    const months = monthsParam ? parseInt(monthsParam, 10) : 6;

    // Validate months
    if (isNaN(months) || months < 1 || months > 24) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Months must be between 1 and 24' } },
        { status: 400 }
      );
    }

    const data = generateMonthlySpendData(months);

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
    console.error('Error fetching monthly spend data:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: error.message || 'Internal server error' } },
      { status: 500 }
    );
  }
}

