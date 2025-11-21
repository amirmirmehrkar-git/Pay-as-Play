import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import WithdrawalSummary from '../WithdrawalSummary';
import { WithdrawalMethod } from '../WithdrawalMethodSelector';

describe('WithdrawalSummary', () => {
  const defaultProps = {
    amount: 100,
    method: 'bank_transfer' as WithdrawalMethod,
    fee: 2,
    netAmount: 98,
    estimatedProcessingTime: '3-5 business days',
  };

  it('displays withdrawal amount', () => {
    render(<WithdrawalSummary {...defaultProps} />);
    expect(screen.getByText('€100.00')).toBeInTheDocument();
  });

  it('displays processing fee', () => {
    render(<WithdrawalSummary {...defaultProps} />);
    expect(screen.getByText('€2.00')).toBeInTheDocument();
  });

  it('displays net amount', () => {
    render(<WithdrawalSummary {...defaultProps} />);
    expect(screen.getByText('€98.00')).toBeInTheDocument();
  });

  it('displays withdrawal method', () => {
    render(<WithdrawalSummary {...defaultProps} />);
    expect(screen.getByText(/Bank Transfer \(SEPA\)/)).toBeInTheDocument();
  });

  it('displays estimated processing time', () => {
    render(<WithdrawalSummary {...defaultProps} />);
    expect(screen.getByText(/3-5 business days/)).toBeInTheDocument();
  });

  it('handles different methods correctly', () => {
    const { rerender } = render(<WithdrawalSummary {...defaultProps} method="paypal" />);
    expect(screen.getByText(/PayPal/)).toBeInTheDocument();

    rerender(<WithdrawalSummary {...defaultProps} method="crypto" />);
    expect(screen.getByText(/Crypto Wallet \(Algorand\)/)).toBeInTheDocument();
  });

  it('handles null method', () => {
    render(<WithdrawalSummary {...defaultProps} method={null} />);
    expect(screen.getByText(/Not selected/)).toBeInTheDocument();
  });
});

