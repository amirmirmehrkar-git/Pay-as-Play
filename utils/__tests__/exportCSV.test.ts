import { describe, it, expect } from 'vitest';
import { buildCSVContent, AnalyticsExportPayload } from '../exportCSV';

const mockPayload: AnalyticsExportPayload = {
  summary: {
    totalTimeWatched: '10h 00m',
    totalSpent: '€30.00',
    contentCount: 12,
  },
  timeWatched: [
    { date: '2025-01-01', minutes: 120 },
    { date: '2025-01-02', minutes: 60 },
  ],
  costPerContent: [
    { contentName: 'Video 1', totalAmount: 12.5, timeWatched: 90, platform: 'video' },
    { contentName: 'Course 1', totalAmount: 8.75, timeWatched: 120, platform: 'learning' },
  ],
  monthlySpend: [
    { month: '2025-01', spend: 25.5 },
    { month: '2025-02', spend: 18.25 },
  ],
  transactions: [
    {
      id: 'tx_1',
      date: '2025-01-01T10:00:00Z',
      platform: 'Netflix',
      title: 'Session 1',
      category: 'video',
      timeWatched: 90,
      cost: 4.5,
    },
  ],
};

describe('buildCSVContent', () => {
  it('includes summary and charts by default', () => {
    const csv = buildCSVContent(mockPayload, {
      startDate: '2025-01-01',
      endDate: '2025-02-01',
    });
    expect(csv).toContain('Summary');
    expect(csv).toContain('Time Watched');
    expect(csv).toContain('Cost per Content');
  });

  it('omits sections when disabled', () => {
    const csv = buildCSVContent(mockPayload, {
      startDate: '2025-01-01',
      endDate: '2025-02-01',
      includeSummary: false,
      includeCharts: false,
      includeTransactions: false,
    });
    expect(csv).not.toContain('Summary');
    expect(csv).not.toContain('Time Watched');
    expect(csv).not.toContain('Transaction History');
  });
});

