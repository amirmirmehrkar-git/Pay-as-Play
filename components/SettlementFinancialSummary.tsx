'use client';

/**
 * Settlement Financial Summary Component
 * Displays financial summary with breakdowns
 */

interface FinancialSummary {
  totalRevenue: number;
  totalFees: number;
  netSettlementAmount: number;
  breakdownByType: Array<{
    type: string;
    revenue: number;
    fees: number;
    transactionCount: number;
  }>;
}

interface SettlementFinancialSummaryProps {
  summary: FinancialSummary;
  currency?: string;
}

export default function SettlementFinancialSummary({
  summary,
  currency = 'EUR',
}: SettlementFinancialSummaryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatContentType = (type: string) => {
    const labels: Record<string, string> = {
      video: 'Video',
      audio: 'Audio',
      learn: 'Learning',
      entertainment: 'Games',
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-6 rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800 sm:p-8">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Financial Summary</h2>

      {/* Main Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
          <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">Total Revenue</div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {formatCurrency(summary.totalRevenue)}
          </div>
        </div>

        <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">Total Fees</div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {formatCurrency(summary.totalFees)}
          </div>
        </div>

        <div className="rounded-xl border-2 border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
          <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">Net Settlement</div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {formatCurrency(summary.netSettlementAmount)}
          </div>
        </div>
      </div>

      {/* Breakdown by Content Type */}
      {summary.breakdownByType.length > 0 && (
        <div>
          <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Breakdown by Content Type</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {summary.breakdownByType.map((breakdown) => (
              <div
                key={breakdown.type}
                className="rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50"
              >
                <div className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {formatContentType(breakdown.type)}
                </div>
                <div className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                  <div>
                    Revenue: <span className="font-semibold text-zinc-900 dark:text-zinc-100">{formatCurrency(breakdown.revenue)}</span>
                  </div>
                  <div>
                    Fees: <span className="font-semibold text-zinc-900 dark:text-zinc-100">{formatCurrency(breakdown.fees)}</span>
                  </div>
                  <div>
                    Transactions: <span className="font-semibold text-zinc-900 dark:text-zinc-100">{breakdown.transactionCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

