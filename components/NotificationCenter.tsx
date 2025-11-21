'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NotificationList from './NotificationList';
import { useToast } from './ToastNotification';

interface Notification {
  id: string;
  type: 'low_balance' | 'auto_topup' | 'payment' | 'session_end' | 'settlement' | 'system' | 'promotional';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

interface ChannelPreferences {
  inApp: boolean;
  email: boolean;
  push: boolean;
}

interface NotificationTypePreferences {
  enabled: boolean;
  channels: ChannelPreferences;
}

interface NotificationSettingsDelivery {
  notificationEmail: string;
  typePreferences: Record<Notification['type'], NotificationTypePreferences>;
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deliverySettings, setDeliverySettings] = useState<NotificationSettingsDelivery | null>(null);
  const { showToast } = useToast();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const seenNotificationsRef = useRef<Set<string>>(new Set());
  const hasInitializedRef = useRef(false);
  const router = useRouter();

  useEffect(() => {
    loadNotifications();
    loadDeliveryPreferences();
    // Poll for new notifications every 30 seconds
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleSettingsUpdate = () => {
      loadDeliveryPreferences();
    };
    window.addEventListener('notifications:settings-updated', handleSettingsUpdate);
    return () => window.removeEventListener('notifications:settings-updated', handleSettingsUpdate);
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  async function loadNotifications() {
    try {
      const response = await fetch('/api/notifications?limit=10');
      const result = await response.json();
      if (result.success) {
        const fetched = result.data.notifications || [];
        setNotifications(fetched);
        handleNewNotifications(fetched);
        setUnreadCount(result.data.unreadCount || 0);
      }
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setLoading(false);
    }
  }

  async function loadDeliveryPreferences() {
    try {
      const response = await fetch('/api/notifications/settings');
      if (!response.ok) return;
      const result = await response.json();
      const prefs = result.data?.typePreferences || {};
      setDeliverySettings({
        notificationEmail: result.data?.notificationEmail,
        typePreferences: prefs,
      });
    } catch (error) {
      console.error('Failed to load notification delivery settings:', error);
    }
  }

  function mapNotificationTypeToToastType(
    notificationType: Notification['type']
  ): 'success' | 'error' | 'info' | 'warning' {
    switch (notificationType) {
      case 'low_balance':
      case 'system':
        return 'warning';
      case 'payment':
        return 'error';
      case 'auto_topup':
      case 'settlement':
        return 'success';
      case 'session_end':
      case 'promotional':
      default:
        return 'info';
    }
  }

  function handleNewNotifications(fetchedNotifications: Notification[]) {
    if (!fetchedNotifications.length) return;

    // On first load, mark all as seen without showing toasts.
    if (!hasInitializedRef.current) {
      fetchedNotifications.forEach((notification) => {
        seenNotificationsRef.current.add(notification.id);
      });
      hasInitializedRef.current = true;
      return;
    }

    const newNotifications = fetchedNotifications.filter(
      (notification) => !seenNotificationsRef.current.has(notification.id)
    );

    if (!newNotifications.length) return;

    newNotifications.forEach((notification) => {
      seenNotificationsRef.current.add(notification.id);
      if (notification.read) return;

      showToast({
        type: mapNotificationTypeToToastType(notification.type),
        title: notification.title,
        message: notification.message,
        actionUrl: notification.actionUrl,
      });

      triggerExternalChannels(notification);
    });
  }

  function triggerExternalChannels(notification: Notification) {
    if (!deliverySettings?.typePreferences) return;
    const typePref = deliverySettings.typePreferences[notification.type];
    if (!typePref?.enabled) return;

    if (typePref.channels.email && deliverySettings.notificationEmail) {
      fetch('/api/notifications/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notificationEmail: deliverySettings.notificationEmail,
          subject: notification.title,
          message: notification.message,
          actionUrl: notification.actionUrl,
          type: notification.type,
        }),
      }).catch((error) => console.error('Failed to send email notification:', error));
    }

    if (typePref.channels.push) {
      fetch('/api/notifications/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: notification.title,
          body: notification.message,
          type: notification.type,
          actionUrl: notification.actionUrl,
        }),
      }).catch((error) => console.error('Failed to send push notification:', error));
    }
  }

  async function markAsRead(notificationId: string) {
    try {
      const response = await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'PUT',
      });
      const result = await response.json();
      if (result.success) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  }

  async function markAllAsRead() {
    try {
      const response = await fetch('/api/notifications/read-all', {
        method: 'PUT',
      });
      const result = await response.json();
      if (result.success) {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        setUnreadCount(0);
      }
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  }

  function handleNotificationClick(notification: Notification) {
    markAsRead(notification.id);
    setIsOpen(false);
    if (notification.actionUrl) {
      router.push(notification.actionUrl);
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        aria-label="Notifications"
      >
        <span className="text-2xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 z-50">
          <div className="flex items-center justify-between border-b border-zinc-200 p-4 dark:border-zinc-800">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Mark all read
                </button>
              )}
              <Link
                href="/notifications"
                onClick={() => setIsOpen(false)}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                View all
              </Link>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-zinc-500 dark:text-zinc-400">Loading...</div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center text-zinc-500 dark:text-zinc-400">
                <div className="text-4xl mb-2">🔕</div>
                <p>No notifications</p>
              </div>
            ) : (
              <NotificationList
                notifications={notifications}
                onNotificationClick={handleNotificationClick}
                onMarkAsRead={markAsRead}
                compact={true}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

