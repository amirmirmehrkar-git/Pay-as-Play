'use client';

/**
 * Settlement Dashboard Page
 * Displays settlement overview with summary cards, revenue chart, and status indicator
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SettlementSummaryCards from '@/components/SettlementSummaryCards';
import DateRangeSelector, { DateRangeOption } from '@/components/DateRangeSelector';
import RevenueChart from '@/components/RevenueChart';

interface SettlementOverviewData {
  totalRevenue: number;
  pendingSettlements: number;
  completedSettlements: number;
  nextSettlementDate: string;
  revenueHistory: Array<{ month: string; revenue: number }>;
  currency: string;
}

export default function SettlementDashboardPage() {
  const [dateRange, setDateRange] = useState<DateRangeOption>('thisMonth');
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [data, setData] = useState<SettlementOverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        dateRange,
      });

      if (dateRange === 'custom' && startDate && endDate) {
        params.append('startDate', startDate);
        params.append('endDate', endDate);
      }

      const response = await fetch(`/api/partner/settlement/overview?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch settlement data');
      }

      const result = await response.json();
      if (result.success && result.data) {
        setData(result.data);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load settlement data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateRange, startDate, endDate]);

  const handleDateRangeChange = (range: DateRangeOption, start?: string, end?: string) => {
    setDateRange(range);
    setStartDate(start);
    setEndDate(end);
  };

  // Calculate revenue change (mock - in production, this would come from API)
  const revenueChange = data ? 12.5 : undefined;

  // Calculate pending and completed counts (mock - in production, this would come from API)
  const pendingCount = data ? 3 : 0;
  const completedCount = data ? 12 : 0;

  // Calculate days until settlement
  const daysUntilSettlement = data
    ? Math.ceil((new Date(data.nextSettlementDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : undefined;

  // Settlement status indicator
  const getSettlementStatus = () => {
    if (!data) return { status: 'unknown', color: 'zinc', message: 'No data available' };

    const daysUntil = daysUntilSettlement ?? 0;
    if (daysUntil <= 3) {
      return { status: 'upcoming', color: 'green', message: 'Settlement scheduled soon' };
    } else if (daysUntil <= 7) {
      return { status: 'pending', color: 'yellow', message: 'Settlement pending' };
    } else {
      return { status: 'on-track', color: 'green', message: 'All settlements on track' };
    }
  };

  const settlementStatus = getSettlementStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          {/* Breadcrumb */}
          <nav className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            <Link href="/partner" className="hover:text-blue-600 dark:hover:text-blue-400">
              Partner
            </Link>
            <span className="mx-2">/</span>
            <span className="text-zinc-900 dark:text-zinc-100">Settlement</span>
          </nav>

          <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">Settlement Dashboard</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Track your revenue and settlement information</p>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 rounded-xl border-2 border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-red-700 dark:text-red-400">Error loading data</p>
                <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
              </div>
              <button
                onClick={fetchData}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Date Range Selector */}
        <div className="mb-6">
          <DateRangeSelector
            value={dateRange}
            startDate={startDate}
            endDate={endDate}
            onChange={handleDateRangeChange}
          />
        </div>

        {/* Summary Cards */}
        <div className="mb-6">
          {data ? (
            <SettlementSummaryCards
              totalRevenue={data.totalRevenue}
              revenueChange={revenueChange}
              pendingSettlements={data.pendingSettlements}
              pendingCount={pendingCount}
              completedSettlements={data.completedSettlements}
              completedCount={completedCount}
              nextSettlementDate={data.nextSettlementDate}
              daysUntilSettlement={daysUntilSettlement}
              settlementFrequency="Monthly"
              currency={data.currency}
              loading={loading}
            />
          ) : (
            <SettlementSummaryCards
              totalRevenue={0}
              pendingSettlements={0}
              pendingCount={0}
              completedSettlements={0}
              completedCount={0}
              nextSettlementDate={new Date().toISOString()}
              loading={loading}
            />
          )}
        </div>

        {/* Settlement Status Indicator */}
        <div className="mb-6">
          <div
            className={`rounded-xl border-2 p-4 ${
              settlementStatus.color === 'green'
                ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                : settlementStatus.color === 'yellow'
                  ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20'
                  : 'border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-3 w-3 rounded-full ${
                  settlementStatus.color === 'green'
                    ? 'bg-green-500'
                    : settlementStatus.color === 'yellow'
                      ? 'bg-yellow-500'
                      : 'bg-zinc-500'
                }`}
              ></div>
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">{settlementStatus.message}</p>
                {data && (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Next settlement: {new Date(data.nextSettlementDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="mb-6">
          {data ? (
            <RevenueChart data={data.revenueHistory} currency={data.currency} loading={loading} />
          ) : (
            <RevenueChart data={[]} loading={loading} />
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/partner/settlement/history"
            className="rounded-xl border-2 border-blue-500 bg-blue-500 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-600 hover:shadow-lg"
          >
            View Settlement History
          </Link>
          <Link
            href="/partner/settlement/settings"
            className="rounded-xl border-2 border-zinc-200 bg-white px-6 py-3 font-semibold text-zinc-700 transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            Settlement Settings
          </Link>
        </div>
      </div>
    </div>
  );
}

