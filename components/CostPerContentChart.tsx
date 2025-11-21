'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface CostPerContentItem {
  contentId: string;
  contentName: string;
  totalAmount: number;
  timeWatched: number;
  costPerMinute: number;
  platform: string;
}

interface CostPerContentChartProps {
  startDate?: Date;
  endDate?: Date;
  platform?: string | null;
  limit?: number;
}

export default function CostPerContentChart({
  startDate,
  endDate,
  platform: initialPlatform = null,
  limit = 15,
}: CostPerContentChartProps) {
  const [data, setData] = useState<CostPerContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'amount' | 'name'>('amount');
  const [platform, setPlatform] = useState<string | null>(initialPlatform);

  useEffect(() => {
    loadData();
  }, [startDate, endDate, platform]);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate.toISOString().split('T')[0]);
      if (endDate) params.append('endDate', endDate.toISOString().split('T')[0]);
      if (platform) params.append('platform', platform);

      const response = await fetch(`/api/analytics/cost-per-content?${params}`);
      const result = await response.json();
      if (result.success) {
        let sortedData = [...result.data];
        if (sortBy === 'amount') {
          sortedData.sort((a, b) => b.totalAmount - a.totalAmount);
        } else {
          sortedData.sort((a, b) => a.contentName.localeCompare(b.contentName));
        }
        setData(sortedData.slice(0, limit));
      } else {
        throw new Error(result.error?.message || 'Failed to load cost per content data');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (data.length > 0) {
      let sortedData = [...data];
      if (sortBy === 'amount') {
        sortedData.sort((a, b) => b.totalAmount - a.totalAmount);
      } else {
        sortedData.sort((a, b) => a.contentName.localeCompare(b.contentName));
      }
      setData(sortedData);
    }
  }, [sortBy]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      video: '#3b82f6',
      audio: '#10b981',
      learning: '#f59e0b',
      gaming: '#ef4444',
    };
    return colors[platform] || '#6b7280';
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

  const chartData = data.map((item) => ({
    name: item.contentName.length > 20 ? item.contentName.substring(0, 20) + '...' : item.contentName,
    fullName: item.contentName,
    amount: item.totalAmount,
    timeWatched: item.timeWatched,
    costPerMinute: item.costPerMinute,
    platform: item.platform,
  }));

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <select
            value={platform || 'all'}
            onChange={(e) => {
              const newPlatform = e.target.value === 'all' ? null : e.target.value;
              setPlatform(newPlatform);
            }}
            className="rounded-lg border-2 border-zinc-200 bg-white px-3 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          >
            <option value="all">All Platforms</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
            <option value="learning">Learning</option>
            <option value="gaming">Gaming</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-2">
          {(['amount', 'name'] as const).map((sort) => (
            <button
              key={sort}
              type="button"
              onClick={() => setSortBy(sort)}
              className={`rounded-lg border-2 px-3 py-1 text-sm font-medium transition-all ${
                sortBy === sort
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-300'
                  : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
              }`}
            >
              Sort by {sort === 'amount' ? 'Amount' : 'Name'}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-700" />
          <XAxis type="number" className="text-xs text-zinc-600 dark:text-zinc-400" />
          <YAxis
            type="category"
            dataKey="name"
            width={100}
            className="text-xs text-zinc-600 dark:text-zinc-400"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e4e4e7',
              borderRadius: '8px',
            }}
            formatter={(value: number, name: string, props: any) => {
              if (name === 'amount') {
                return [
                  <>
                    <div>Amount: {formatCurrency(value)}</div>
                    <div>Time Watched: {formatMinutes(props.payload.timeWatched)}</div>
                    <div>Cost per Minute: {formatCurrency(props.payload.costPerMinute)}</div>
                  </>,
                  'Details',
                ];
              }
              return value;
            }}
            labelFormatter={(label) => `Content: ${label}`}
          />
          <Legend />
          <Bar dataKey="amount" name="Amount Spent (EUR)" radius={[0, 4, 4, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getPlatformColor(entry.platform)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

