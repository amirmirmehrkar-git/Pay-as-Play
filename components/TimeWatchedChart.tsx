'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TimeWatchedDataPoint {
  date: string;
  minutes: number;
}

interface TimeWatchedChartProps {
  startDate?: Date;
  endDate?: Date;
  groupBy?: 'day' | 'week' | 'month';
  onDateRangeChange?: (startDate: Date, endDate: Date) => void;
  onGroupByChange?: (groupBy: 'day' | 'week' | 'month') => void;
}

export default function TimeWatchedChart({
  startDate: initialStartDate,
  endDate: initialEndDate,
  groupBy: initialGroupBy = 'day',
  onDateRangeChange,
  onGroupByChange,
}: TimeWatchedChartProps) {
  const [data, setData] = useState<TimeWatchedDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'custom'>('30d');
  const [groupBy, setGroupBy] = useState<'day' | 'week' | 'month'>(initialGroupBy);
  const [startDate, setStartDate] = useState<Date>(
    initialStartDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState<Date>(initialEndDate || new Date());

  useEffect(() => {
    loadData();
  }, [startDate, endDate, groupBy]);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        groupBy,
      });
      const response = await fetch(`/api/analytics/time-watched?${params}`);
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      } else {
        throw new Error(result.error?.message || 'Failed to load time watched data');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }

  const handleDateRangeChange = (range: '7d' | '30d' | '90d' | 'custom') => {
    setDateRange(range);
    const today = new Date();
    let newStartDate: Date;

    if (range === '7d') {
      newStartDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (range === '30d') {
      newStartDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    } else if (range === '90d') {
      newStartDate = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
    } else {
      // Custom - keep current dates
      return;
    }

    setStartDate(newStartDate);
    setEndDate(today);
    onDateRangeChange?.(newStartDate, today);
  };

  const handleGroupByChange = (newGroupBy: 'day' | 'week' | 'month') => {
    setGroupBy(newGroupBy);
    onGroupByChange?.(newGroupBy);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (groupBy === 'month') {
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } else if (groupBy === 'week') {
      return `Week of ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
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
          {(['7d', '30d', '90d', 'custom'] as const).map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => handleDateRangeChange(range)}
              className={`rounded-lg border-2 px-3 py-1 text-sm font-medium transition-all ${
                dateRange === range
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-300'
                  : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
              }`}
            >
              {range === '7d' ? 'Last 7 days' : range === '30d' ? 'Last 30 days' : range === '90d' ? 'Last 90 days' : 'Custom'}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {(['day', 'week', 'month'] as const).map((gb) => (
            <button
              key={gb}
              type="button"
              onClick={() => handleGroupByChange(gb)}
              className={`rounded-lg border-2 px-3 py-1 text-sm font-medium transition-all ${
                groupBy === gb
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-300'
                  : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
              }`}
            >
              {gb.charAt(0).toUpperCase() + gb.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-700" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            className="text-xs text-zinc-600 dark:text-zinc-400"
          />
          <YAxis
            label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }}
            className="text-xs text-zinc-600 dark:text-zinc-400"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e4e4e7',
              borderRadius: '8px',
            }}
            formatter={(value: number) => formatMinutes(value)}
            labelFormatter={(label) => formatDate(label)}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="minutes"
            name="Time Watched"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

