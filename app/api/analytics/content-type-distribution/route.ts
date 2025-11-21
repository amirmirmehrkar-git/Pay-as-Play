import { NextRequest, NextResponse } from 'next/server';

interface ContentTypeDistributionDataPoint {
  contentType: string;
  amount: number;
  percentage: number;
}

// Generate mock content type distribution data
function generateContentTypeDistributionData(): ContentTypeDistributionDataPoint[] {
  const contentTypes = [
    { name: 'Video', baseAmount: 120 },
    { name: 'Audio', baseAmount: 70 },
    { name: 'Learning', baseAmount: 90 },
  ];

  // Generate amounts with some randomness
  const data = contentTypes.map((type) => {
    const amount = parseFloat((type.baseAmount + Math.random() * 40).toFixed(2));
    return { contentType: type.name, amount };
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
    const data = generateContentTypeDistributionData();

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
    console.error('Error fetching content type distribution data:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: error.message || 'Internal server error' } },
      { status: 500 }
    );
  }
}

