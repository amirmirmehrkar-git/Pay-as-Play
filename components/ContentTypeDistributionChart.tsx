'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface ContentTypeDistributionDataPoint {
  contentType: string;
  amount: number;
  percentage: number;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

export default function ContentTypeDistributionChart() {
  const [data, setData] = useState<ContentTypeDistributionDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/analytics/content-type-distribution');
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      } else {
        throw new Error(result.error?.message || 'Failed to load content type distribution data');
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
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ contentType, percentage }) => `${contentType}: ${percentage}%`}
          outerRadius={120}
          fill="#8884d8"
          dataKey="amount"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
            props.payload.contentType,
          ]}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

