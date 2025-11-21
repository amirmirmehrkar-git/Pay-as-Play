import { NextRequest, NextResponse } from 'next/server';

type NotificationType =
  | 'low_balance'
  | 'auto_topup'
  | 'payment'
  | 'session'
  | 'settlement'
  | 'system'
  | 'promotional';

interface PushPayload {
  title: string;
  body: string;
  type: NotificationType;
  actionUrl?: string;
  targetDeviceTokens?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as PushPayload;

    if (!payload?.title || !payload?.body) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'title and body are required for push notifications',
          },
        },
        { status: 400 },
      );
    }

    // Mock sending push notification
    console.info('[MockPush] Notification sent:', payload);

    return NextResponse.json(
      {
        success: true,
        message: 'Push notification sent',
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error sending push notification:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'PUSH_ERROR',
          message: error?.message || 'Failed to send push notification',
        },
      },
      { status: 500 },
    );
  }
}


