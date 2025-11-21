import { NextResponse } from 'next/server';

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank' | 'crypto';
  label: string;
  masked: string;
  primary: boolean;
  expiresAt?: string | null;
}

const methods: PaymentMethod[] = [
  {
    id: 'pm_card_1',
    type: 'card',
    label: 'Visa',
    masked: '**** **** **** 4242',
    primary: true,
    expiresAt: '02/27',
  },
  {
    id: 'pm_paypal_1',
    type: 'paypal',
    label: 'PayPal',
    masked: 'user@example.com',
    primary: false,
  },
  {
    id: 'pm_bank_1',
    type: 'bank',
    label: 'SEPA Bank',
    masked: 'DE••••13000',
    primary: false,
  },
];

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      data: methods,
    },
    { status: 200 },
  );
}

