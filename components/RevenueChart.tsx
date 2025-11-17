'use client';

/**
 * Revenue Chart Component
 * Displays line chart showing revenue over time
 */

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RevenueDataPoint {
  month: string;
  revenue: number;
}

interface RevenueChartProps {
  data: RevenueDataPoint[];
  currency?: string;
  loading?: boolean;
}

export default function RevenueChart({ data, currency = 'EUR', loading = false }: RevenueChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatMonth = (month: string) => {
    try {
      const [year, monthNum] = month.split('-');
      const date = new Date(parseInt(year), parseInt(monthNum) - 1, 1);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {
      return month;
    }
  };

  if (loading) {
    return (
      <div className="h-64 w-full animate-pulse rounded-xl border-2 border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
        <div className="flex h-full items-center justify-center">
          <div className="text-sm text-zinc-500 dark:text-zinc-400">Loading chart...</div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-xl border-2 border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/50">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">No revenue data available</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl border-2 border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800 sm:p-6">
      <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Revenue Over Time</h3>
      <div className="h-64 w-full sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" className="dark:stroke-zinc-700" />
            <XAxis
              dataKey="month"
              tickFormatter={formatMonth}
              stroke="#71717a"
              className="text-xs"
              tick={{ fill: '#71717a' }}
            />
            <YAxis
              tickFormatter={formatCurrency}
              stroke="#71717a"
              className="text-xs"
              tick={{ fill: '#71717a' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e4e4e7',
                borderRadius: '8px',
                padding: '8px',
              }}
              labelFormatter={(label) => formatMonth(label)}
              formatter={(value: number) => formatCurrency(value)}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

