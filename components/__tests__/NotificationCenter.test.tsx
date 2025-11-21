import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import NotificationCenter from '../NotificationCenter';
import { ToastProvider } from '../ToastNotification';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock fetch
global.fetch = vi.fn();

describe('NotificationCenter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockNotifications = {
    success: true,
    data: {
      notifications: [
        {
          id: '1',
          type: 'low_balance',
          title: 'Low Balance',
          message: 'Your balance is low',
          timestamp: new Date().toISOString(),
          read: false,
          actionUrl: '/wallet',
        },
        {
          id: '2',
          type: 'payment',
          title: 'Payment Received',
          message: 'Payment processed',
          timestamp: new Date().toISOString(),
          read: true,
        },
      ],
      unreadCount: 1,
    },
  };

  const mockSettings = {
    success: true,
    data: {
      notificationEmail: 'test@example.com',
      typePreferences: {
        low_balance: {
          enabled: true,
          channels: { inApp: true, email: true, push: false },
        },
      },
    },
  };

  it('renders notification bell icon', async () => {
    (global.fetch as any)
      .mockResolvedValueOnce({
        json: async () => mockNotifications,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockSettings,
      });

    render(
      <ToastProvider>
        <NotificationCenter />
      </ToastProvider>
    );

    // Component renders immediately, no need to wait
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument();
  });

  it('displays unread count badge', async () => {
    (global.fetch as any)
      .mockResolvedValueOnce({
        json: async () => mockNotifications,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockSettings,
      });

    render(
      <ToastProvider>
        <NotificationCenter />
      </ToastProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('displays 9+ when unread count is greater than 9', async () => {
    (global.fetch as any)
      .mockResolvedValueOnce({
        json: async () => ({
          ...mockNotifications,
          data: { ...mockNotifications.data, unreadCount: 15 },
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockSettings,
      });

    render(
      <ToastProvider>
        <NotificationCenter />
      </ToastProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('9+')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('opens dropdown when bell is clicked', async () => {
    (global.fetch as any)
      .mockResolvedValueOnce({
        json: async () => mockNotifications,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockSettings,
      });

    render(
      <ToastProvider>
        <NotificationCenter />
      </ToastProvider>
    );

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByLabelText('Notifications')).toBeInTheDocument();
    }, { timeout: 3000 });

    const bellButton = screen.getByLabelText('Notifications');
    fireEvent.click(bellButton);

    await waitFor(() => {
      expect(screen.getByText('Notifications')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('displays loading state initially', async () => {
    let resolvePromise: (value: any) => void;
    const pendingPromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    (global.fetch as any).mockImplementation(() => pendingPromise);

    render(
      <ToastProvider>
        <NotificationCenter />
      </ToastProvider>
    );

    // Component renders immediately
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument();

    const bellButton = screen.getByLabelText('Notifications');
    fireEvent.click(bellButton);

    // Should show loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Resolve to clean up
    resolvePromise!({ json: async () => ({ success: true, data: { notifications: [], unreadCount: 0 } }) });
  });

  it('displays empty state when no notifications', async () => {
    (global.fetch as any)
      .mockResolvedValueOnce({
        json: async () => ({
          success: true,
          data: { notifications: [], unreadCount: 0 },
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockSettings,
      });

    render(
      <ToastProvider>
        <NotificationCenter />
      </ToastProvider>
    );

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByLabelText('Notifications')).toBeInTheDocument();
    }, { timeout: 3000 });

    const bellButton = screen.getByLabelText('Notifications');
    fireEvent.click(bellButton);

    await waitFor(() => {
      expect(screen.getByText('No notifications')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('marks notification as read when clicked', async () => {
    const markAsReadMock = vi.fn().mockResolvedValue({
      json: async () => ({ success: true }),
    });

    (global.fetch as any)
      .mockResolvedValueOnce({
        json: async () => mockNotifications,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockSettings,
      })
      .mockImplementationOnce(markAsReadMock);

    render(
      <ToastProvider>
        <NotificationCenter />
      </ToastProvider>
    );

    await waitFor(() => {
      expect(screen.getByLabelText('Notifications')).toBeInTheDocument();
    }, { timeout: 3000 });

    const bellButton = screen.getByLabelText('Notifications');
    fireEvent.click(bellButton);

    await waitFor(() => {
      expect(screen.getByText('Low Balance')).toBeInTheDocument();
    }, { timeout: 2000 });

    const notification = screen.getByText('Low Balance');
    fireEvent.click(notification.closest('div')!);

    await waitFor(() => {
      expect(markAsReadMock).toHaveBeenCalled();
    }, { timeout: 2000 });
  });

  it('marks all notifications as read', async () => {
    const markAllReadMock = vi.fn().mockResolvedValue({
      json: async () => ({ success: true }),
    });

    (global.fetch as any)
      .mockResolvedValueOnce({
        json: async () => mockNotifications,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockSettings,
      })
      .mockImplementationOnce(markAllReadMock);

    render(
      <ToastProvider>
        <NotificationCenter />
      </ToastProvider>
    );

    await waitFor(() => {
      expect(screen.getByLabelText('Notifications')).toBeInTheDocument();
    });

    const bellButton = screen.getByLabelText('Notifications');
    fireEvent.click(bellButton);

    await waitFor(() => {
      expect(screen.getByText('Mark all read')).toBeInTheDocument();
    });

    const markAllButton = screen.getByText('Mark all read');
    fireEvent.click(markAllButton);

    await waitFor(() => {
      expect(markAllReadMock).toHaveBeenCalledWith('/api/notifications/read-all', {
        method: 'PUT',
      });
    });
  });

  it('closes dropdown when clicking outside', async () => {
    (global.fetch as any)
      .mockResolvedValueOnce({
        json: async () => mockNotifications,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockSettings,
      });

    render(
      <ToastProvider>
        <div>
          <NotificationCenter />
          <div data-testid="outside">Outside</div>
        </div>
      </ToastProvider>
    );

    await waitFor(() => {
      expect(screen.getByLabelText('Notifications')).toBeInTheDocument();
    }, { timeout: 3000 });

    const bellButton = screen.getByLabelText('Notifications');
    fireEvent.click(bellButton);

    await waitFor(() => {
      expect(screen.getByText('Notifications')).toBeInTheDocument();
    }, { timeout: 2000 });

    const outside = screen.getByTestId('outside');
    fireEvent.mouseDown(outside);

    await waitFor(() => {
      expect(screen.queryByText('Notifications')).not.toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('loads delivery preferences', async () => {
    (global.fetch as any)
      .mockResolvedValueOnce({
        json: async () => mockNotifications,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockSettings,
      });

    render(
      <ToastProvider>
        <NotificationCenter />
      </ToastProvider>
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/notifications/settings');
    }, { timeout: 3000 });
  });
});

