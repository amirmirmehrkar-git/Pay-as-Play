'use client';

import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MonthlySpendDataPoint {
  month: string;
  spend: number;
  sessionCount: number;
  averageCostPerSession: number;
}

interface MonthlySpendChartProps {
  months?: number;
}

export default function MonthlySpendChart({ months: initialMonths = 6 }: MonthlySpendChartProps) {
  const [data, setData] = useState<MonthlySpendDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [months, setMonths] = useState(initialMonths);

  useEffect(() => {
    loadData();
  }, [months]);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/analytics/monthly-spend?months=${months}`);
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      } else {
        throw new Error(result.error?.message || 'Failed to load monthly spend data');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (monthStr: string) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="h-80 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-700">
        <div className="flex h-full items-center justify-center">
          <span className="text-zinc-500 dark:text-zinc-400">Loading chart...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-400 bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
        <p className="font-semibold">Error: {error}</p>
        <button onClick={loadData} className="mt-2 text-sm underline">
          Retry
        </button>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {[6, 12, 18, 24].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMonths(m)}
              className={`rounded-lg border-2 px-3 py-1 text-sm font-medium transition-all ${
                months === m
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-300'
                  : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
              }`}
            >
              Last {m} months
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-700" />
          <XAxis
            dataKey="month"
            tickFormatter={formatDate}
            className="text-xs text-zinc-600 dark:text-zinc-400"
          />
          <YAxis
            label={{ value: 'Amount (EUR)', angle: -90, position: 'insideLeft' }}
            className="text-xs text-zinc-600 dark:text-zinc-400"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e4e4e7',
              borderRadius: '8px',
            }}
            formatter={(value: number, name: string, props: any) => {
              if (name === 'spend') {
                return [
                  <>
                    <div>Total Amount: {formatCurrency(value)}</div>
                    <div>Sessions: {props.payload.sessionCount}</div>
                    <div>Avg per Session: {formatCurrency(props.payload.averageCostPerSession)}</div>
                  </>,
                  'Details',
                ];
              }
              return formatCurrency(value);
            }}
            labelFormatter={(label) => formatDate(label)}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="spend"
            name="Monthly Spend"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorSpend)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

