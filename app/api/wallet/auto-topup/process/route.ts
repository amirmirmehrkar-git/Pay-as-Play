import { NextResponse } from 'next/server';

export async function POST() {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const processedAt = new Date().toISOString();

  // Simulated auto-top-up response. Both existing API response fields are kept.
  return NextResponse.json(
    {
      success: true,
      data: {
        processedAt,
        runAt: processedAt,
        amount: 25,
        newBalance: 42.5,
      },
      message: 'Auto-top-up simulated',
    },
    { status: 200 },
  );
}
