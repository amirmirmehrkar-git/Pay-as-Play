import { NextRequest, NextResponse } from 'next/server';

const generatePdfData = () => {
  const summary = {
    totalTimeWatched: '12h 30m',
    totalSpent: '€45.80',
    contentCount: 26,
  };

  const transactions = Array.from({ length: 25 }).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - index);
    return {
      id: `tx_${index + 1}`,
      date: date.toISOString(),
      platform: ['Netflix', 'Spotify', 'Coursera'][index % 3],
      title: `Session ${index + 1}`,
      category: ['video', 'audio', 'learn'][index % 3],
      cost: parseFloat((Math.random() * 5 + 1).toFixed(2)),
    };
  });

  return {
    summary,
    transactions,
  };
};

export async function GET(request: NextRequest) {
  try {
    const data = generatePdfData();
    await new Promise((resolve) => setTimeout(resolve, 600));
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error('Error generating PDF export:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: error.message || 'Internal server error' } },
      { status: 500 }
    );
  }
}

