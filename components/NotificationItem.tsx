'use client';

import { useMemo } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  id: string;
  type: 'low_balance' | 'auto_topup' | 'payment' | 'session_end' | 'settlement' | 'system' | 'promotional';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

interface NotificationItemProps {
  notification: Notification;
  onClick: () => void;
  onMarkAsRead: () => void;
  compact?: boolean;
}

const typeIcons: { [key: string]: string } = {
  low_balance: '⚠️',
  auto_topup: '💰',
  payment: '💳',
  session_end: '📺',
  settlement: '💵',
  system: '⚙️',
  promotional: '🎉',
};

export default function NotificationItem({
  notification,
  onClick,
  onMarkAsRead,
  compact = false,
}: NotificationItemProps) {
  const relativeTime = useMemo(() => {
    try {
      return formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true });
    } catch {
      return 'Recently';
    }
  }, [notification.timestamp]);

  const icon = typeIcons[notification.type] || '🔔';

  return (
    <div
      onClick={onClick}
      className={`flex items-start gap-3 p-4 border-b border-zinc-100 dark:border-zinc-800 cursor-pointer transition-colors ${
        notification.read
          ? 'bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800'
          : 'bg-blue-50/50 hover:bg-blue-50 dark:bg-blue-900/10 dark:hover:bg-blue-900/20'
      }`}
    >
      <div className="text-2xl shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4
              className={`font-semibold text-zinc-900 dark:text-zinc-100 ${
                !notification.read ? 'font-bold' : ''
              }`}
            >
              {notification.title}
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2">
              {notification.message}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">{relativeTime}</p>
          </div>
          {!notification.read && (
            <div className="h-2 w-2 rounded-full bg-blue-500 shrink-0 mt-1" />
          )}
        </div>
      </div>
      {!compact && (
        <div className="flex flex-col gap-1 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMarkAsRead();
            }}
            className="text-xs text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            aria-label="Mark as read"
          >
            ✓
          </button>
        </div>
      )}
    </div>
  );
}

