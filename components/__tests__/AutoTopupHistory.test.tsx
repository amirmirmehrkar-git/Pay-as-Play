import { render, screen } from '@testing-library/react';
import AutoTopupHistory, { AutoTopupHistoryItem } from '../AutoTopupHistory';

const mockHistory: AutoTopupHistoryItem[] = [
  {
    id: 'auto_1',
    amount: 20,
    date: '2025-01-25T10:00:00Z',
    triggerBalance: 5,
    status: 'success',
    paymentMethod: 'Visa •••• 4242',
  },
  {
    id: 'auto_2',
    amount: 25,
    date: '2025-01-24T09:00:00Z',
    triggerBalance: 4,
    status: 'failed',
    paymentMethod: 'PayPal user@example.com',
  },
];

describe('AutoTopupHistory', () => {
  it('renders empty state when no history', () => {
    render(<AutoTopupHistory history={[]} />);
    expect(screen.getByText(/No auto-top-up transactions yet/i)).toBeInTheDocument();
  });

  it('renders history rows with status labels', () => {
    render(<AutoTopupHistory history={mockHistory} />);
    expect(screen.getByText(/Visa •••• 4242/i)).toBeInTheDocument();
    expect(screen.getByText(/PayPal user@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Success/i)).toBeInTheDocument();
    expect(screen.getByText(/Failed/i)).toBeInTheDocument();
  });
});

