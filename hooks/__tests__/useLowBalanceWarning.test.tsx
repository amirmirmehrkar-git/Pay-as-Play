import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LowBalanceWarningProvider, useLowBalanceWarning } from '../useLowBalanceWarning';

const settingsResponse = {
  success: true,
  data: {
    lowBalanceWarnings: true,
    thresholdType: 'currency' as const,
    thresholdValue: 10,
    notifyInApp: true,
    notifyEmail: true,
    notifyPush: false,
    notificationEmail: 'tester@example.com',
    autoTopUpEnabled: false,
    autoTopUpAmount: 25,
    autoTopUpMethod: 'card' as const,
    typePreferences: {
      low_balance: {
        enabled: true,
        channels: { inApp: true, email: true, push: false },
      },
      auto_topup: {
        enabled: true,
        channels: { inApp: true, email: true, push: false },
      },
      payment: {
        enabled: true,
        channels: { inApp: true, email: true, push: true },
      },
      session_end: {
        enabled: true,
        channels: { inApp: true, email: false, push: false },
      },
      settlement: {
        enabled: true,
        channels: { inApp: true, email: true, push: false },
      },
      system: {
        enabled: true,
        channels: { inApp: true, email: false, push: false },
      },
      promotional: {
        enabled: false,
        channels: { inApp: true, email: false, push: false },
      },
    },
  },
};

const balanceResponse = {
  success: true,
  data: {
    balance: 5,
    currency: 'EUR',
    averageMinuteCost: 0.45,
    estimatedMinutesLeft: 8,
    lastUpdated: new Date().toISOString(),
    recommendedTopUp: 25,
    status: 'warning' as const,
  },
};

const createFetchMock = () =>
  vi.fn(async (url: RequestInfo | URL, options?: RequestInit) => {
    const href = typeof url === 'string' ? url : url.toString();
    if (href.includes('/api/notifications/settings')) {
      return {
        ok: true,
        json: async () => settingsResponse,
      } as Response;
    }
    if (href.includes('/api/wallet/balance')) {
      return {
        ok: true,
        json: async () => balanceResponse,
      } as Response;
    }
    if (href.includes('/api/notifications/email')) {
      return {
        ok: true,
        json: async () => ({ success: true }),
      } as Response;
    }
    throw new Error(`Unexpected fetch call to ${href} with ${JSON.stringify(options)}`);
  });

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <LowBalanceWarningProvider>{children}</LowBalanceWarningProvider>
);

describe('useLowBalanceWarning', () => {
  beforeEach(() => {
    global.fetch = createFetchMock();
  });

  it('loads balance and settings data', async () => {
    const { result } = renderHook(() => useLowBalanceWarning(), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.balance).toBe(balanceResponse.data.balance);
    expect(result.current.warningEnabled).toBe(true);
  });

  it('triggers email notification when low balance and email enabled', async () => {
    const fetchSpy = createFetchMock();
    global.fetch = fetchSpy;

    renderHook(() => useLowBalanceWarning(), { wrapper });

    await waitFor(() =>
      expect(
        fetchSpy.mock.calls.some((call) => {
          const url = call[0];
          return typeof url === 'string' && url.includes('/api/notifications/email');
        }),
      ).toBe(true),
    );
  });
});

