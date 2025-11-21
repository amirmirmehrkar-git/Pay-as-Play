import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MonthlySpendChart from '../MonthlySpendChart';

// Mock fetch
global.fetch = vi.fn();

describe('MonthlySpendChart', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (global.fetch as any).mockImplementation(() => new Promise(() => {})); // Never resolves
    render(<MonthlySpendChart />);
    expect(screen.getByText(/Loading chart/i)).toBeInTheDocument();
  });

  it('renders chart with data', async () => {
    const mockData = [
      { month: '2025-01', spend: 100, sessionCount: 10, averageCostPerSession: 10 },
      { month: '2025-02', spend: 150, sessionCount: 15, averageCostPerSession: 10 },
    ];
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: mockData }),
    });

    render(<MonthlySpendChart />);
    await waitFor(() => {
      expect(screen.queryByText(/Loading chart/i)).not.toBeInTheDocument();
    });
  });

  it('displays error message on fetch failure', async () => {
    (global.fetch as any).mockRejectedValue(new Error('Network error'));
    render(<MonthlySpendChart />);
    await waitFor(() => {
      expect(screen.getByText(/Error:/i)).toBeInTheDocument();
    });
  });
});

