import { NextRequest, NextResponse } from 'next/server';

interface SpendingByPlatformDataPoint {
  platform: string;
  amount: number;
  percentage: number;
}

// Generate mock spending by platform data
function generateSpendingByPlatformData(
  startDate: Date | null,
  endDate: Date | null
): SpendingByPlatformDataPoint[] {
  const platforms = [
    { name: 'Video', baseAmount: 100 },
    { name: 'Audio', baseAmount: 60 },
    { name: 'Learning', baseAmount: 80 },
    { name: 'Gaming', baseAmount: 40 },
  ];

  // Generate amounts with some randomness
  const data = platforms.map((platform) => {
    const amount = parseFloat((platform.baseAmount + Math.random() * 50).toFixed(2));
    return { platform: platform.name, amount };
  });

  // Calculate total and percentages
  const total = data.reduce((sum, item) => sum + item.amount, 0);
  const dataWithPercentages = data.map((item) => ({
    ...item,
    percentage: parseFloat(((item.amount / total) * 100).toFixed(1)),
  }));

  // Sort by amount (descending)
  return dataWithPercentages.sort((a, b) => b.amount - a.amount);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');

    const startDate = startDateParam ? new Date(startDateParam) : null;
    const endDate = endDateParam ? new Date(endDateParam) : null;

    // Validate dates if provided
    if (startDate && isNaN(startDate.getTime())) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid start date format' } },
        { status: 400 }
      );
    }

    if (endDate && isNaN(endDate.getTime())) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid end date format' } },
        { status: 400 }
      );
    }

    if (startDate && endDate && startDate > endDate) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Start date must be before end date' } },
        { status: 400 }
      );
    }

    const data = generateSpendingByPlatformData(startDate, endDate);

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
    console.error('Error fetching spending by platform data:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: error.message || 'Internal server error' } },
      { status: 500 }
    );
  }
}

