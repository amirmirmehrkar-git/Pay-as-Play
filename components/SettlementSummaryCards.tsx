'use client';

/**
 * Settlement Summary Cards Component
 * Displays 4 summary cards: Total Revenue, Pending, Completed, Next Settlement
 */

import Link from 'next/link';

interface SettlementSummaryCardsProps {
  totalRevenue: number;
  revenueChange?: number; // Percentage change vs previous period
  pendingSettlements: number;
  pendingCount: number;
  completedSettlements: number;
  completedCount: number;
  nextSettlementDate: string;
  daysUntilSettlement?: number;
  settlementFrequency?: string;
  currency?: string;
  loading?: boolean;
}

export default function SettlementSummaryCards({
  totalRevenue,
  revenueChange = 0,
  pendingSettlements,
  pendingCount,
  completedSettlements,
  completedCount,
  nextSettlementDate,
  daysUntilSettlement,
  settlementFrequency = 'Monthly',
  currency = 'EUR',
  loading = false,
}: SettlementSummaryCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const calculateDaysUntil = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = date.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    } catch {
      return 0;
    }
  };

  const daysUntil = daysUntilSettlement ?? calculateDaysUntil(nextSettlementDate);
  const isRevenuePositive = revenueChange >= 0;

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl border-2 border-zinc-200 bg-zinc-100 p-6 dark:border-zinc-700 dark:bg-zinc-800"
          >
            <div className="mb-2 h-4 w-24 rounded bg-zinc-300 dark:bg-zinc-700"></div>
            <div className="h-8 w-32 rounded bg-zinc-300 dark:bg-zinc-700"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Revenue Card */}
      <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 shadow-lg dark:border-blue-800 dark:from-blue-900/20 dark:to-cyan-900/20">
        <div className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Total Revenue</div>
        <div className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">{formatCurrency(totalRevenue)}</div>
        {revenueChange !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${isRevenuePositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            <span>{isRevenuePositive ? '↑' : '↓'}</span>
            <span>{Math.abs(revenueChange).toFixed(1)}%</span>
            <span className="text-zinc-500 dark:text-zinc-400">vs previous period</span>
          </div>
        )}
      </div>

      {/* Pending Settlements Card */}
      <Link
        href="/partner/settlement/history?status=pending"
        className="rounded-xl border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl dark:border-yellow-800 dark:from-yellow-900/20 dark:to-orange-900/20"
      >
        <div className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Pending Settlements</div>
        <div className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          {formatCurrency(pendingSettlements)}
        </div>
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          {pendingCount} {pendingCount === 1 ? 'settlement' : 'settlements'}
        </div>
      </Link>

      {/* Completed Settlements Card */}
      <Link
        href="/partner/settlement/history?status=completed"
        className="rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl dark:border-green-800 dark:from-green-900/20 dark:to-emerald-900/20"
      >
        <div className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Completed Settlements</div>
        <div className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          {formatCurrency(completedSettlements)}
        </div>
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          {completedCount} {completedCount === 1 ? 'settlement' : 'settlements'}
        </div>
      </Link>

      {/* Next Settlement Date Card */}
      <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-6 shadow-lg dark:border-purple-800 dark:from-purple-900/20 dark:to-pink-900/20">
        <div className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Next Settlement</div>
        <div className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">{formatDate(nextSettlementDate)}</div>
        <div className="mb-1 text-sm text-zinc-600 dark:text-zinc-400">
          {daysUntil} {daysUntil === 1 ? 'day' : 'days'} until settlement
        </div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">Frequency: {settlementFrequency}</div>
      </div>
    </div>
  );
}

