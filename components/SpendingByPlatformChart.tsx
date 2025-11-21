'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface SpendingByPlatformDataPoint {
  platform: string;
  amount: number;
  percentage: number;
}

interface SpendingByPlatformChartProps {
  startDate?: Date;
  endDate?: Date;
  onPlatformClick?: (platform: string | null) => void;
  selectedPlatform?: string | null;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function SpendingByPlatformChart({
  startDate,
  endDate,
  onPlatformClick,
  selectedPlatform,
}: SpendingByPlatformChartProps) {
  const [data, setData] = useState<SpendingByPlatformDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartType, setChartType] = useState<'pie' | 'donut'>('donut');

  useEffect(() => {
    loadData();
  }, [startDate, endDate]);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate.toISOString().split('T')[0]);
      if (endDate) params.append('endDate', endDate.toISOString().split('T')[0]);

      const response = await fetch(`/api/analytics/spending-by-platform?${params}`);
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      } else {
        throw new Error(result.error?.message || 'Failed to load spending by platform data');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const handleClick = (data: any) => {
    if (onPlatformClick) {
      const platform = selectedPlatform === data.platform ? null : data.platform;
      onPlatformClick(platform);
    }
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
        <p>No data available for selected period</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {(['pie', 'donut'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setChartType(type)}
              className={`rounded-lg border-2 px-3 py-1 text-sm font-medium transition-all ${
                chartType === type
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-300'
                  : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        {selectedPlatform && (
          <button
            type="button"
            onClick={() => onPlatformClick?.(null)}
            className="rounded-lg border-2 border-zinc-200 bg-white px-3 py-1 text-sm font-medium text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ platform, percentage }) => `${platform}: ${percentage}%`}
            outerRadius={chartType === 'donut' ? 100 : 120}
            innerRadius={chartType === 'donut' ? 60 : 0}
            fill="#8884d8"
            dataKey="amount"
            onClick={handleClick}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                opacity={selectedPlatform && selectedPlatform !== entry.platform ? 0.3 : 1}
                style={{ cursor: onPlatformClick ? 'pointer' : 'default' }}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e4e4e7',
              borderRadius: '8px',
            }}
            formatter={(value: number, name: string, props: any) => [
              <>
                <div>Amount: {formatCurrency(value)}</div>
                <div>Percentage: {props.payload.percentage}%</div>
              </>,
              props.payload.platform,
            ]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

