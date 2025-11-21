import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NotificationItem from '../NotificationItem';

describe('NotificationItem', () => {
  const mockNotification = {
    id: '1',
    type: 'low_balance' as const,
    title: 'Low Balance Warning',
    message: 'Your balance is below €10',
    timestamp: new Date().toISOString(),
    read: false,
    actionUrl: '/wallet',
  };

  it('renders notification with title and message', () => {
    render(
      <NotificationItem
        notification={mockNotification}
        onClick={vi.fn()}
        onMarkAsRead={vi.fn()}
      />
    );

    expect(screen.getByText('Low Balance Warning')).toBeInTheDocument();
    expect(screen.getByText('Your balance is below €10')).toBeInTheDocument();
  });

  it('displays unread indicator when notification is unread', () => {
    const { container } = render(
      <NotificationItem
        notification={{ ...mockNotification, read: false }}
        onClick={vi.fn()}
        onMarkAsRead={vi.fn()}
      />
    );

    const indicator = container.querySelector('.bg-blue-500');
    expect(indicator).toBeInTheDocument();
  });

  it('does not display unread indicator when notification is read', () => {
    const { container } = render(
      <NotificationItem
        notification={{ ...mockNotification, read: true }}
        onClick={vi.fn()}
        onMarkAsRead={vi.fn()}
      />
    );

    const indicator = container.querySelector('.bg-blue-500');
    expect(indicator).not.toBeInTheDocument();
  });

  it('calls onClick when notification is clicked', () => {
    const handleClick = vi.fn();
    render(
      <NotificationItem
        notification={mockNotification}
        onClick={handleClick}
        onMarkAsRead={vi.fn()}
      />
    );

    const notificationElement = screen.getByText('Low Balance Warning').closest('div');
    fireEvent.click(notificationElement!);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onMarkAsRead when mark as read button is clicked', () => {
    const handleMarkAsRead = vi.fn();
    render(
      <NotificationItem
        notification={mockNotification}
        onClick={vi.fn()}
        onMarkAsRead={handleMarkAsRead}
        compact={false}
      />
    );

    const markAsReadButton = screen.getByLabelText('Mark as read');
    fireEvent.click(markAsReadButton);

    expect(handleMarkAsRead).toHaveBeenCalledTimes(1);
  });

  it('does not show mark as read button in compact mode', () => {
    render(
      <NotificationItem
        notification={mockNotification}
        onClick={vi.fn()}
        onMarkAsRead={vi.fn()}
        compact={true}
      />
    );

    const markAsReadButton = screen.queryByLabelText('Mark as read');
    expect(markAsReadButton).not.toBeInTheDocument();
  });

  it('displays correct icon for notification type', () => {
    const { rerender } = render(
      <NotificationItem
        notification={mockNotification}
        onClick={vi.fn()}
        onMarkAsRead={vi.fn()}
      />
    );

    expect(screen.getByText('⚠️')).toBeInTheDocument();

    rerender(
      <NotificationItem
        notification={{ ...mockNotification, type: 'auto_topup' }}
        onClick={vi.fn()}
        onMarkAsRead={vi.fn()}
      />
    );

    expect(screen.getByText('💰')).toBeInTheDocument();
  });

  it('displays relative time', () => {
    render(
      <NotificationItem
        notification={mockNotification}
        onClick={vi.fn()}
        onMarkAsRead={vi.fn()}
      />
    );

    expect(screen.getByText(/ago|Recently/i)).toBeInTheDocument();
  });

  it('handles invalid timestamp gracefully', () => {
    render(
      <NotificationItem
        notification={{ ...mockNotification, timestamp: 'invalid-date' }}
        onClick={vi.fn()}
        onMarkAsRead={vi.fn()}
      />
    );

    expect(screen.getByText('Recently')).toBeInTheDocument();
  });

  it('applies correct styling for read vs unread notifications', () => {
    const { container, rerender } = render(
      <NotificationItem
        notification={{ ...mockNotification, read: false }}
        onClick={vi.fn()}
        onMarkAsRead={vi.fn()}
      />
    );

    const unreadContainer = container.querySelector('.bg-blue-50\\/50');
    expect(unreadContainer).toBeInTheDocument();

    rerender(
      <NotificationItem
        notification={{ ...mockNotification, read: true }}
        onClick={vi.fn()}
        onMarkAsRead={vi.fn()}
      />
    );

    const readContainer = container.querySelector('.bg-white');
    expect(readContainer).toBeInTheDocument();
  });
});

