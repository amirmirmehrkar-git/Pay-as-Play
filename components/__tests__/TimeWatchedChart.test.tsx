import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TimeWatchedChart from '../TimeWatchedChart';

// Mock fetch
global.fetch = vi.fn();

describe('TimeWatchedChart', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (global.fetch as any).mockImplementation(() => new Promise(() => {})); // Never resolves
    render(<TimeWatchedChart />);
    expect(screen.getByText(/Loading chart/i)).toBeInTheDocument();
  });

  it('renders chart with data', async () => {
    const mockData = [
      { date: '2025-01-01', minutes: 120 },
      { date: '2025-01-02', minutes: 90 },
    ];
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: mockData }),
    });

    render(<TimeWatchedChart />);
    await waitFor(() => {
      expect(screen.queryByText(/Loading chart/i)).not.toBeInTheDocument();
    });
  });

  it('displays error message on fetch failure', async () => {
    (global.fetch as any).mockRejectedValue(new Error('Network error'));
    render(<TimeWatchedChart />);
    await waitFor(() => {
      expect(screen.getByText(/Error:/i)).toBeInTheDocument();
    });
  });

  it('displays empty state when no data', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: [] }),
    });

    render(<TimeWatchedChart />);
    await waitFor(() => {
      expect(screen.getByText(/No data available/i)).toBeInTheDocument();
    });
  });
});

