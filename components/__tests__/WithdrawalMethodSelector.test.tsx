import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import WithdrawalMethodSelector, { WithdrawalMethod } from '../WithdrawalMethodSelector';

describe('WithdrawalMethodSelector', () => {
  const mockOnSelectMethod = vi.fn();
  const mockOnAddMethod = vi.fn();

  const defaultProps = {
    selectedMethod: null as WithdrawalMethod | null,
    onSelectMethod: mockOnSelectMethod,
    savedMethods: [],
    onAddMethod: mockOnAddMethod,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all withdrawal methods', () => {
    render(<WithdrawalMethodSelector {...defaultProps} />);

    expect(screen.getByText('Bank Transfer (SEPA)')).toBeInTheDocument();
    expect(screen.getByText('PayPal')).toBeInTheDocument();
    expect(screen.getByText('Crypto Wallet (Algorand)')).toBeInTheDocument();
  });

  it('calls onSelectMethod when a method is clicked', () => {
    render(<WithdrawalMethodSelector {...defaultProps} />);

    const bankTransferButton = screen.getByText('Bank Transfer (SEPA)').closest('button');
    fireEvent.click(bankTransferButton!);

    expect(mockOnSelectMethod).toHaveBeenCalledWith('bank_transfer');
  });

  it('highlights selected method', () => {
    render(<WithdrawalMethodSelector {...defaultProps} selectedMethod="paypal" />);

    const paypalButton = screen.getByText('PayPal').closest('button');
    expect(paypalButton).toHaveClass('border-blue-500');
  });

  it('displays saved methods when provided', () => {
    const savedMethods = [
      {
        id: '1',
        type: 'bank_transfer' as WithdrawalMethod,
        label: 'My Bank Account',
        details: 'DE89****1234',
      },
    ];

    render(<WithdrawalMethodSelector {...defaultProps} savedMethods={savedMethods} />);

    expect(screen.getByText('My Bank Account')).toBeInTheDocument();
    expect(screen.getByText('DE89****1234')).toBeInTheDocument();
  });

  it('calls onAddMethod when add button is clicked', () => {
    render(<WithdrawalMethodSelector {...defaultProps} />);

    const addButton = screen.getByText('+ Add New Withdrawal Method');
    fireEvent.click(addButton);

    expect(mockOnAddMethod).toHaveBeenCalled();
  });

  it('does not show add button when onAddMethod is not provided', () => {
    render(<WithdrawalMethodSelector {...defaultProps} onAddMethod={undefined} />);

    expect(screen.queryByText('+ Add New Withdrawal Method')).not.toBeInTheDocument();
  });
});

