'use client';

/**
 * LMS Progress Overview Component
 * Displays summary cards and date range selector
 */

import DateRangeSelector, { DateRangeOption } from './DateRangeSelector';

interface LMSProgressOverviewProps {
  totalCoursesEnrolled: number;
  totalTimeSpent: number; // seconds
  totalAmountSpent: number; // PLY
  completionRate: number; // percentage
  dateRange?: DateRangeOption;
  startDate?: string;
  endDate?: string;
  onDateRangeChange?: (range: DateRangeOption, startDate?: string, endDate?: string) => void;
  loading?: boolean;
}

export default function LMSProgressOverview({
  totalCoursesEnrolled,
  totalTimeSpent,
  totalAmountSpent,
  completionRate,
  dateRange = 'thisMonth',
  startDate,
  endDate,
  onDateRangeChange,
  loading = false,
}: LMSProgressOverviewProps) {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse rounded-xl border-2 border-zinc-200 bg-zinc-100 p-6 dark:border-zinc-700 dark:bg-zinc-800">
            <div className="h-6 w-32 rounded bg-zinc-300 dark:bg-zinc-700"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Courses */}
        <div className="rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
          <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Total Courses</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">{totalCoursesEnrolled}</p>
        </div>

        {/* Total Time Spent */}
        <div className="rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
          <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Time Spent</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">{formatDuration(totalTimeSpent)}</p>
        </div>

        {/* Total Amount Spent */}
        <div className="rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
          <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Amount Spent</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">{formatCurrency(totalAmountSpent)} PLY</p>
        </div>

        {/* Completion Rate */}
        <div className="rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
          <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Completion Rate</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">{completionRate}%</p>
        </div>
      </div>

      {/* Date Range Selector */}
      {onDateRangeChange && (
        <div>
          <DateRangeSelector
            value={dateRange}
            startDate={startDate}
            endDate={endDate}
            onChange={onDateRangeChange}
          />
        </div>
      )}
    </div>
  );
}

