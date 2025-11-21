import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EmailSignIn from '../EmailSignIn';

describe('EmailSignIn', () => {
  it('renders email and password fields', () => {
    const onSignIn = vi.fn();
    render(<EmailSignIn onSignIn={onSignIn} onSwitchToSignUp={vi.fn()} onForgotPassword={vi.fn()} />);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('validates email format', async () => {
    const onSignIn = vi.fn();
    render(<EmailSignIn onSignIn={onSignIn} onSwitchToSignUp={vi.fn()} onForgotPassword={vi.fn()} />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    await fireEvent.change(passwordInput, { target: { value: 'password123' } });
    await fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
    });

    expect(onSignIn).not.toHaveBeenCalled();
  });

  it('validates password length', async () => {
    const onSignIn = vi.fn();
    render(<EmailSignIn onSignIn={onSignIn} onSwitchToSignUp={vi.fn()} onForgotPassword={vi.fn()} />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '12345' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
    });

    expect(onSignIn).not.toHaveBeenCalled();
  });

  it('calls onSignIn with valid credentials', async () => {
    const onSignIn = vi.fn().mockResolvedValue(undefined);
    render(<EmailSignIn onSignIn={onSignIn} onSwitchToSignUp={vi.fn()} onForgotPassword={vi.fn()} />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('displays error message from onSignIn', async () => {
    const onSignIn = vi.fn().mockRejectedValue(new Error('Invalid credentials'));
    render(<EmailSignIn onSignIn={onSignIn} onSwitchToSignUp={vi.fn()} onForgotPassword={vi.fn()} />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });
});

