import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import VideoPlayer from '../VideoPlayer';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock SDK
const mockBilling = {
  startSession: vi.fn(),
  stopSession: vi.fn().mockResolvedValue(undefined),
  sendTick: vi.fn(),
};

const mockWalletConnect = {
  isWalletConnected: vi.fn(() => true),
  getConnectedAddress: vi.fn(() => 'ALGO123...'),
  getWalletConnector: vi.fn(() => ({})),
};

vi.mock('@/lib/sdk', () => ({
  getBilling: vi.fn(() => Promise.resolve(mockBilling)),
  getWalletConnect: vi.fn(() => Promise.resolve(mockWalletConnect)),
}));

// Mock useLowBalanceWarning hook
const mockLowBalanceWarning = {
  showBanner: false,
  balance: 100,
  currency: 'EUR',
  estimatedMinutesLeft: 10,
  status: 'ok' as const,
  warningEnabled: true,
  openModal: vi.fn(),
  dismissBanner: vi.fn(),
};

vi.mock('@/hooks/useLowBalanceWarning', () => ({
  useLowBalanceWarning: () => mockLowBalanceWarning,
}));

// Mock LowBalanceBanner
vi.mock('../LowBalanceBanner', () => ({
  default: ({ onDismiss }: any) => (
    <div data-testid="low-balance-banner">
      <button onClick={onDismiss}>Dismiss</button>
    </div>
  ),
}));

describe('VideoPlayer', () => {
  const mockProps = {
    contentId: 'content-123',
    contentTitle: 'Test Video',
    pricePerMinute: 0.50,
    videoUrl: 'https://example.com/video.mp4',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    mockBilling.startSession.mockResolvedValue({
      sessionId: 'session-123',
    });
    mockLowBalanceWarning.status = 'ok';
    mockLowBalanceWarning.warningEnabled = true;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders video player with content title', () => {
    render(<VideoPlayer {...mockProps} />);
    expect(screen.getByText('Test Video')).toBeInTheDocument();
  });

  it('displays play button initially', () => {
    render(<VideoPlayer {...mockProps} />);
    expect(screen.getByText(/play|start/i)).toBeInTheDocument();
  });

  it('renders play button', () => {
    render(<VideoPlayer {...mockProps} />);
    expect(screen.getByText(/play|start/i)).toBeInTheDocument();
  });

  it('renders video player component', () => {
    render(<VideoPlayer {...mockProps} />);
    expect(screen.getByText('Test Video')).toBeInTheDocument();
  });

  it('displays low balance banner when balance is low', () => {
    mockLowBalanceWarning.showBanner = true;
    render(<VideoPlayer {...mockProps} />);
    expect(screen.getByTestId('low-balance-banner')).toBeInTheDocument();
  });

  it('displays low balance banner when balance is low', () => {
    mockLowBalanceWarning.showBanner = true;
    render(<VideoPlayer {...mockProps} />);
    expect(screen.getByTestId('low-balance-banner')).toBeInTheDocument();
  });
});

