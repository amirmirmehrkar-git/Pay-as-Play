import { NextRequest, NextResponse } from 'next/server';

type NotificationType =
  | 'low_balance'
  | 'auto_topup'
  | 'payment'
  | 'session'
  | 'settlement'
  | 'system'
  | 'promotional';

interface EmailPayload {
  notificationEmail: string;
  subject?: string;
  message?: string;
  actionUrl?: string;
  type?: NotificationType;
  metadata?: Record<string, unknown>;
  balance?: number | null;
  currency?: string;
  estimatedMinutesLeft?: number | null;
  status?: 'warning' | 'critical';
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as EmailPayload;

    if (!payload?.notificationEmail) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'notificationEmail is required',
          },
        },
        { status: 400 },
      );
    }

    const subject =
      payload.subject ||
      (payload.type
        ? `Pay as Play - ${payload.type.replace('_', ' ').toUpperCase()}`
        : 'Pay as Play Notification');

    const message =
      payload.message ||
      `You have a new notification${
        payload.type ? ` (${payload.type.replace('_', ' ')})` : ''
      } inside Pay as Play.`;

    // Mock sending email
    console.info('[MockEmail] Notification email sent:', {
      to: payload.notificationEmail,
      subject,
      message,
      actionUrl: payload.actionUrl,
      metadata: payload.metadata,
      balance: payload.balance,
      currency: payload.currency,
      estimatedMinutesLeft: payload.estimatedMinutesLeft,
      status: payload.status,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Email notification sent',
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error sending low balance email:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'EMAIL_ERROR',
          message: error?.message || 'Failed to send email notification',
        },
      },
      { status: 500 },
    );
  }
}

