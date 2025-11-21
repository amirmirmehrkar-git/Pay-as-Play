import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import AutoTopupSettingsPage from '../page';

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => children,
}));

const settingsPayload = {
  success: true,
  data: {
    enabled: true,
    amount: 25,
    threshold: 5,
    paymentMethodType: 'card',
    paymentMethod: {
      type: 'card',
      label: 'Visa',
      masked: '**** **** **** 4242',
      expiresAt: '02/27',
    },
    notifyBefore: true,
    notifyAfter: true,
    notifyEmail: true,
    notifyInApp: true,
    lastTopupDate: '2025-01-20T10:00:00.000Z',
    nextTriggerEstimate: null,
  },
};

const historyPayload = {
  success: true,
  data: [
    {
      id: 'auto_1001',
      date: new Date().toISOString(),
      amount: 25,
      triggerBalance: 5,
      status: 'success',
      paymentMethod: 'Visa •••• 4242',
    },
  ],
};

describe('AutoTopupSettingsPage', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    global.fetch = vi.fn((url: RequestInfo | URL) => {
      const href = typeof url === 'string' ? url : url.toString();
      if (href.includes('/api/wallet/auto-topup/settings')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(settingsPayload),
        }) as Promise<Response>;
      }
      if (href.includes('/api/wallet/auto-topup/history')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(historyPayload),
        }) as Promise<Response>;
      }
      if (href.includes('/api/wallet/auto-topup/process')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true }),
        }) as Promise<Response>;
      }
      return Promise.reject(new Error(`Unhandled fetch ${href}`));
    });
  });

  it('renders settings and history', async () => {
    render(<AutoTopupSettingsPage />);

    await waitFor(() => screen.getByText(/Auto-top-up Settings/i));

    expect(screen.getByText('Auto-top-up Settings')).toBeInTheDocument();
    expect(screen.getByText(/€\s*25/)).toBeInTheDocument();
    expect(screen.getByText('Visa')).toBeInTheDocument();
    expect(screen.getByText(/Auto-top-up History/)).toBeInTheDocument();
    expect(screen.getByText('View all →')).toBeInTheDocument();
  });
});

