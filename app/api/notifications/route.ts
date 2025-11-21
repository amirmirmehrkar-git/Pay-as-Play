import { NextRequest, NextResponse } from 'next/server';

interface Notification {
  id: string;
  type: 'low_balance' | 'auto_topup' | 'payment' | 'session_end' | 'settlement' | 'system' | 'promotional';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'low_balance',
    title: 'Low Balance Warning',
    message: 'Your balance is running low. Current balance: 5.50 EUR',
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 minutes ago
    read: false,
    actionUrl: '/wallet',
  },
  {
    id: '2',
    type: 'auto_topup',
    title: 'Auto-top-up Completed',
    message: 'Auto-top-up completed: +50.00 EUR',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    read: false,
    actionUrl: '/wallet',
  },
  {
    id: '3',
    type: 'payment',
    title: 'Payment Processed',
    message: 'Payment processed: -2.50 EUR for "Introduction to React"',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    read: true,
    actionUrl: '/analytics',
  },
  {
    id: '4',
    type: 'session_end',
    title: 'Session Ended',
    message: 'Your session ended. Total cost: 3.75 EUR',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    read: true,
    actionUrl: '/analytics',
  },
  {
    id: '5',
    type: 'system',
    title: 'System Maintenance',
    message: 'System maintenance scheduled for tomorrow at 2:00 AM',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    read: true,
  },
  {
    id: '6',
    type: 'promotional',
    title: 'New Content Available',
    message: 'New content available: "Advanced TypeScript Course"',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    read: true,
    actionUrl: '/',
  },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '20');
    const type = searchParams.get('type');
    const read = searchParams.get('read');

    let filteredNotifications = [...mockNotifications];

    // Filter by type
    if (type) {
      filteredNotifications = filteredNotifications.filter((n) => n.type === type);
    }

    // Filter by read status
    if (read !== null) {
      const isRead = read === 'true';
      filteredNotifications = filteredNotifications.filter((n) => n.read === isRead);
    }

    // Sort by timestamp (newest first)
    filteredNotifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Limit results
    const limitedNotifications = filteredNotifications.slice(0, limit);

    // Count unread
    const unreadCount = mockNotifications.filter((n) => !n.read).length;

    return NextResponse.json({
      success: true,
      data: {
        notifications: limitedNotifications,
        unreadCount,
        total: filteredNotifications.length,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error.message || 'Failed to fetch notifications' } },
      { status: 500 }
    );
  }
}

