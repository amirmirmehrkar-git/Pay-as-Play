import { NextRequest, NextResponse } from 'next/server';

type NotificationType =
  | 'low_balance'
  | 'auto_topup'
  | 'payment'
  | 'session_end'
  | 'settlement'
  | 'system'
  | 'promotional';

interface ChannelPreferences {
  inApp: boolean;
  email: boolean;
  push: boolean;
}

interface NotificationTypePreferences {
  enabled: boolean;
  channels: ChannelPreferences;
}

interface NotificationSettings {
  lowBalanceWarnings: boolean;
  thresholdType: 'currency' | 'minutes';
  thresholdValue: number;
  notifyInApp: boolean;
  notifyEmail: boolean;
  notifyPush: boolean;
  notificationEmail: string;
  autoTopUpEnabled: boolean;
  autoTopUpAmount: number;
  autoTopUpMethod: 'card' | 'wallet';
  typePreferences: Record<NotificationType, NotificationTypePreferences>;
}

const defaultChannels: ChannelPreferences = {
  inApp: true,
  email: true,
  push: false,
};

const buildDefaultTypePreferences = (): Record<NotificationType, NotificationTypePreferences> => ({
  low_balance: { enabled: true, channels: { ...defaultChannels } },
  auto_topup: { enabled: true, channels: { ...defaultChannels, push: false } },
  payment: { enabled: true, channels: { ...defaultChannels, email: true, push: true } },
  session_end: { enabled: true, channels: { ...defaultChannels, email: false } },
  settlement: { enabled: true, channels: { ...defaultChannels, push: false } },
  system: { enabled: true, channels: { ...defaultChannels, email: false } },
  promotional: { enabled: false, channels: { inApp: true, email: false, push: false } },
});

let mockSettings: NotificationSettings = {
  lowBalanceWarnings: true,
  thresholdType: 'currency',
  thresholdValue: 10,
  notifyInApp: true,
  notifyEmail: true,
  notifyPush: false,
  notificationEmail: 'ian@example.com',
  autoTopUpEnabled: false,
  autoTopUpAmount: 25,
  autoTopUpMethod: 'card',
  typePreferences: buildDefaultTypePreferences(),
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
    const incoming = await request.json();

    mockSettings = {
      ...mockSettings,
      ...incoming,
      typePreferences: {
        ...mockSettings.typePreferences,
        ...(incoming.typePreferences || {}),
      },
    };

    return NextResponse.json(
      {
        success: true,
        data: mockSettings,
        message: 'Notification settings updated',
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error updating notification settings:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'SETTINGS_ERROR',
          message: error?.message || 'Failed to update notification settings',
        },
      },
      { status: 500 },
    );
  }
}

