import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import AutoTopupPaymentMethod, { PaymentMethodDetails } from '../AutoTopupPaymentMethod';

const details: PaymentMethodDetails = {
  type: 'card',
  label: 'Visa •••• 4242',
  masked: '**** **** **** 4242',
  expiresAt: '02/27',
};

describe('AutoTopupPaymentMethod', () => {
  it('renders current payment method details', () => {
    render(
      <AutoTopupPaymentMethod
        selected="card"
        details={details}
        onSelect={() => {}}
        onManage={() => {}}
      />,
    );
    expect(screen.getByText(/Visa •••• 4242/i)).toBeInTheDocument();
    expect(screen.getByText(/Exp 02\/27/i)).toBeInTheDocument();
  });

  it('calls onSelect when choosing a new method', () => {
    const onSelect = vi.fn();
    render(
      <AutoTopupPaymentMethod
        selected="card"
        details={details}
        onSelect={onSelect}
        onManage={() => {}}
      />,
    );
    const paypalButton = screen.getByRole('button', { name: /PayPal/i });
    fireEvent.click(paypalButton);
    expect(onSelect).toHaveBeenCalled();
  });
});

