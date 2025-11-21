import { NextResponse } from 'next/server';

interface AutoTopupHistoryItem {
  id: string;
  date: string;
  amount: number;
  triggerBalance: number;
  status: 'success' | 'failed' | 'pending';
  paymentMethod: string;
}

const mockHistory: AutoTopupHistoryItem[] = Array.from({ length: 6 }).map((_, index) => ({
  id: `auto_${1000 + index}`,
  date: new Date(Date.now() - index * 86_400_000).toISOString(),
  amount: [10, 20, 25, 50][index % 4],
  triggerBalance: [2, 5, 7][index % 3],
  status: index === 2 ? 'failed' : 'success',
  paymentMethod: index % 2 === 0 ? 'Visa •••• 4242' : 'PayPal - user@example.com',
}));

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      data: mockHistory,
    },
    { status: 200 },
  );
}

