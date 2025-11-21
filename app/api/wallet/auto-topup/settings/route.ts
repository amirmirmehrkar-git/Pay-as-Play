import { NextRequest, NextResponse } from 'next/server';

interface AutoTopupSettings {
  enabled: boolean;
  amount: number;
  threshold: number;
  paymentMethodType: 'card' | 'paypal' | 'bank' | 'crypto';
  paymentMethod: {
    label: string;
    masked: string;
    expiresAt?: string | null;
  };
  notifyBefore: boolean;
  notifyAfter: boolean;
  notifyEmail: boolean;
  notifyInApp: boolean;
  lastTopupDate: string | null;
  nextTriggerEstimate: string | null;
}

let mockSettings: AutoTopupSettings = {
  enabled: false,
  amount: 25,
  threshold: 5,
  paymentMethodType: 'card',
  paymentMethod: {
    label: 'Visa •••• 4242',
    masked: '**** **** **** 4242',
    expiresAt: '02/27',
  },
  notifyBefore: true,
  notifyAfter: true,
  notifyEmail: true,
  notifyInApp: true,
  lastTopupDate: null,
  nextTriggerEstimate: null,
};

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      data: mockSettings,
    },
    { status: 200 },
  );
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    mockSettings = {
      ...mockSettings,
      ...body,
    };
    return NextResponse.json(
      {
        success: true,
        data: mockSettings,
        message: 'Auto-top-up settings updated',
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error updating auto-top-up settings:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'AUTO_TOPUP_SETTINGS_ERROR',
          message: error?.message || 'Failed to update settings',
        },
      },
      { status: 500 },
    );
  }
}

