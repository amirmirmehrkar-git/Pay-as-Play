import { NextResponse } from 'next/server';

export async function POST() {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return NextResponse.json(
    {
      success: true,
      data: {
        processedAt: new Date().toISOString(),
        amount: 25,
        newBalance: 42.5,
      },
    },
    { status: 200 },
  );
}
import { NextResponse } from 'next/server';

export async function POST() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return NextResponse.json(
    {
      success: true,
      data: {
        runAt: new Date().toISOString(),
      },
      message: 'Auto-top-up simulated',
    },
    { status: 200 },
  );
}

