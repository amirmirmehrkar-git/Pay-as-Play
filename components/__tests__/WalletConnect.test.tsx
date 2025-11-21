import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WalletConnect from '../WalletConnect';

// Mock SDK
const mockWalletConnect = {
  isWalletConnected: vi.fn(() => false),
  getConnectedAddress: vi.fn(() => null),
  initPeraWallet: vi.fn(),
  connectWallet: vi.fn(),
  disconnectWallet: vi.fn(),
};

const mockWallet = {
  getBalance: vi.fn(),
};

vi.mock('@/lib/sdk', () => ({
  getWalletConnect: vi.fn(() => Promise.resolve(mockWalletConnect)),
  getWallet: vi.fn(() => Promise.resolve(mockWallet)),
}));

vi.mock('@/lib/config', () => ({
  appConfig: {
    asaId: 123,
  },
}));

describe('WalletConnect', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    mockWallet.getBalance.mockResolvedValue({
      formatted: '100.00',
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders connect button when not connected', () => {
    render(<WalletConnect />);
    expect(screen.getByText(/connect wallet|connect/i)).toBeInTheDocument();
  });

  it('renders connect button when not connected', () => {
    render(<WalletConnect />);
    expect(screen.getByText(/connect wallet|connect pera/i)).toBeInTheDocument();
  });
});

