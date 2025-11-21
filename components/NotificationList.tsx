'use client';

import { useMemo } from 'react';
import NotificationItem from './NotificationItem';

interface Notification {
  id: string;
  type: 'low_balance' | 'auto_topup' | 'payment' | 'session_end' | 'settlement' | 'system' | 'promotional';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

interface NotificationListProps {
  notifications: Notification[];
  onNotificationClick: (notification: Notification) => void;
  onMarkAsRead: (notificationId: string) => void;
  compact?: boolean;
}

export default function NotificationList({
  notifications,
  onNotificationClick,
  onMarkAsRead,
  compact = false,
}: NotificationListProps) {
  const groupedNotifications = useMemo(() => {
    const groups: { [key: string]: Notification[] } = {
      Today: [],
      Yesterday: [],
      'This Week': [],
      Older: [],
    };

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    notifications.forEach((notification) => {
      const notificationDate = new Date(notification.timestamp);

      if (notificationDate >= today) {
        groups.Today.push(notification);
      } else if (notificationDate >= yesterday) {
        groups.Yesterday.push(notification);
      } else if (notificationDate >= weekAgo) {
        groups['This Week'].push(notification);
      } else {
        groups.Older.push(notification);
      }
    });

    return groups;
  }, [notifications]);

  return (
    <div>
      {Object.entries(groupedNotifications).map(([groupName, groupNotifications]) => {
        if (groupNotifications.length === 0) return null;

        return (
          <div key={groupName}>
            <div className="sticky top-0 bg-zinc-50 dark:bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              {groupName}
            </div>
            {groupNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClick={() => onNotificationClick(notification)}
                onMarkAsRead={() => onMarkAsRead(notification.id)}
                compact={compact}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

