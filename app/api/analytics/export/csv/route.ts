import { NextRequest, NextResponse } from 'next/server';

const generateExportData = () => {
  const timeWatched = Array.from({ length: 10 }).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - index);
    return {
      date: date.toISOString().split('T')[0],
      minutes: Math.floor(Math.random() * 180) + 30,
    };
  });

  const costPerContent = Array.from({ length: 8 }).map((_, index) => ({
    contentName: `Content ${index + 1}`,
    totalAmount: parseFloat((Math.random() * 20 + 5).toFixed(2)),
    timeWatched: Math.floor(Math.random() * 300) + 60,
    platform: ['video', 'audio', 'learning'][index % 3],
  }));

  const monthlySpend = Array.from({ length: 6 }).map((_, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - index);
    return {
      month: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
      spend: parseFloat((Math.random() * 200 + 50).toFixed(2)),
    };
  });

  const transactions = Array.from({ length: 15 }).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - index);
    return {
      id: `tx_${index + 1}`,
      date: date.toISOString(),
      platform: ['Netflix', 'Spotify', 'Coursera'][index % 3],
      title: `Session ${index + 1}`,
      category: ['video', 'audio', 'learn'][index % 3],
      timeWatched: Math.floor(Math.random() * 240) + 30,
      cost: parseFloat((Math.random() * 5 + 1).toFixed(2)),
    };
  });

  return {
    summary: {
      totalTimeWatched: '12h 30m',
      totalSpent: '€45.80',
      contentCount: 26,
    },
    timeWatched: timeWatched.reverse(),
    costPerContent,
    monthlySpend: monthlySpend.reverse(),
    transactions,
  };
};

export async function GET(request: NextRequest) {
  try {
    const data = generateExportData();
    await new Promise((resolve) => setTimeout(resolve, 600));
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error('Error generating CSV export:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: error.message || 'Internal server error' } },
      { status: 500 }
    );
  }
}

