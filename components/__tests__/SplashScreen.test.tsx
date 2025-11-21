import { render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import SplashScreen from '../SplashScreen';

describe('SplashScreen', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders splash screen with logo and tagline', () => {
    const onComplete = vi.fn();
    render(<SplashScreen onComplete={onComplete} />);

    expect(screen.getByText('Play and Pay')).toBeInTheDocument();
    expect(screen.getByText('Pay only for what you watch')).toBeInTheDocument();
  });

  it('calls onComplete after 2.5 seconds', async () => {
    const onComplete = vi.fn();
    render(<SplashScreen onComplete={onComplete} />);

    expect(onComplete).not.toHaveBeenCalled();

    await act(async () => {
      vi.advanceTimersByTime(2500);
    });

    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('applies fade-in animation', async () => {
    const onComplete = vi.fn();
    render(<SplashScreen onComplete={onComplete} />);

    await act(async () => {
      vi.advanceTimersByTime(400);
    });

    const title = screen.getByText('Play and Pay');
    expect(title).toHaveClass('opacity-100');

    const iconWrapper = screen.getByText('🎬').parentElement;
    expect(iconWrapper).toHaveClass('scale-100');
  });
});

