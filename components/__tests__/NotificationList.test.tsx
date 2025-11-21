import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotificationList from '../NotificationList';

describe('NotificationList', () => {
  const mockNotifications = [
    {
      id: '1',
      type: 'low_balance' as const,
      title: 'Low Balance',
      message: 'Balance is low',
      timestamp: new Date().toISOString(),
      read: false,
    },
    {
      id: '2',
      type: 'payment' as const,
      title: 'Payment Received',
      message: 'Payment processed',
      timestamp: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      read: true,
    },
    {
      id: '3',
      type: 'system' as const,
      title: 'System Update',
      message: 'System updated',
      timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      read: false,
    },
  ];

  it('renders empty state when no notifications', () => {
    render(
      <NotificationList
        notifications={[]}
        onNotificationClick={vi.fn()}
        onMarkAsRead={vi.fn()}
      />
    );

    // Should not render any groups
    expect(screen.queryByText('Today')).not.toBeInTheDocument();
  });

  it('groups notifications by date', () => {
    render(
      <NotificationList
        notifications={mockNotifications}
        onNotificationClick={vi.fn()}
        onMarkAsRead={vi.fn()}
      />
    );

    // Should have Today group
    expect(screen.getByText('Today')).toBeInTheDocument();
    // Should have Yesterday group
    expect(screen.getByText('Yesterday')).toBeInTheDocument();
    // Should have This Week group
    expect(screen.getByText('This Week')).toBeInTheDocument();
  });

  it('renders notifications in correct groups', () => {
    render(
      <NotificationList
        notifications={mockNotifications}
        onNotificationClick={vi.fn()}
        onMarkAsRead={vi.fn()}
      />
    );

    expect(screen.getByText('Low Balance')).toBeInTheDocument();
    expect(screen.getByText('Payment Received')).toBeInTheDocument();
    expect(screen.getByText('System Update')).toBeInTheDocument();
  });

  it('calls onNotificationClick when notification is clicked', () => {
    const handleClick = vi.fn();
    render(
      <NotificationList
        notifications={mockNotifications}
        onNotificationClick={handleClick}
        onMarkAsRead={vi.fn()}
      />
    );

    const notification = screen.getByText('Low Balance');
    notification.closest('div')?.click();

    expect(handleClick).toHaveBeenCalledWith(mockNotifications[0]);
  });

  it('calls onMarkAsRead when mark as read is triggered', () => {
    const handleMarkAsRead = vi.fn();
    render(
      <NotificationList
        notifications={mockNotifications}
        onNotificationClick={vi.fn()}
        onMarkAsRead={handleMarkAsRead}
        compact={false}
      />
    );

    const markAsReadButton = screen.getAllByLabelText('Mark as read')[0];
    markAsReadButton.click();

    expect(handleMarkAsRead).toHaveBeenCalledWith('1');
  });

  it('renders in compact mode', () => {
    render(
      <NotificationList
        notifications={mockNotifications}
        onNotificationClick={vi.fn()}
        onMarkAsRead={vi.fn()}
        compact={true}
      />
    );

    // In compact mode, mark as read buttons should not be visible
    expect(screen.queryByLabelText('Mark as read')).not.toBeInTheDocument();
  });

  it('does not render empty groups', () => {
    const oldNotifications = [
      {
        id: '1',
        type: 'system' as const,
        title: 'Old Notification',
        message: 'Very old',
        timestamp: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
        read: false,
      },
    ];

    render(
      <NotificationList
        notifications={oldNotifications}
        onNotificationClick={vi.fn()}
        onMarkAsRead={vi.fn()}
      />
    );

    // Should only show "Older" group
    expect(screen.getByText('Older')).toBeInTheDocument();
    expect(screen.queryByText('Today')).not.toBeInTheDocument();
    expect(screen.queryByText('Yesterday')).not.toBeInTheDocument();
    expect(screen.queryByText('This Week')).not.toBeInTheDocument();
  });
});

