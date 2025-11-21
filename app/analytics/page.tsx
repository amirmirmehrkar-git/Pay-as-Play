'use client';

import { useState, useEffect } from 'react';
import { getAnalytics, getWalletConnect } from '@/lib/sdk';
import { appConfig } from '@/lib/config';
import TimeWatchedChart from '@/components/TimeWatchedChart';
import CostPerContentChart from '@/components/CostPerContentChart';
import MonthlySpendChart from '@/components/MonthlySpendChart';
import SpendingByPlatformChart from '@/components/SpendingByPlatformChart';
import ContentTypeDistributionChart from '@/components/ContentTypeDistributionChart';
import MediaHistory from '@/components/MediaHistory';
import ExportButton from '@/components/ExportButton';
import ExportHistory from '@/components/ExportHistory';

interface MediaItem {
  id: string;
  platform: string;
  title: string;
  category: 'video' | 'audio' | 'learn';
  timeWatched: number; // in seconds
  cost: number;
  date: string;
}

interface Coupon {
  id: string;
  code: string;
  type: 'discount' | 'free' | 'bonus';
  value: number;
  validUntil: string;
  used: boolean;
}

const demoUserStats = {
  totalTimeWatched: 3 * 3600,
  totalSpent: 9.6,
  contentCount: 14,
};

const demoMediaHistory: MediaItem[] = [
  {
    id: 'da-1',
    platform: 'Netflix',
    title: 'Mindhunter Documentary',
    category: 'video',
    timeWatched: 2700,
    cost: 1.4,
    date: '2025-11-18',
  },
  {
    id: 'da-2',
    platform: 'Spotify',
    title: 'Design Matters Podcast',
    category: 'audio',
    timeWatched: 1800,
    cost: 0.7,
    date: '2025-11-17',
  },
  {
    id: 'da-3',
    platform: 'Coursera',
    title: 'Advanced Analytics',
    category: 'learn',
    timeWatched: 3600,
    cost: 2.9,
    date: '2025-11-15',
  },
];

const demoCoupons: Coupon[] = [
  {
    id: 'dc-1',
    code: 'WELCOME10',
    type: 'discount',
    value: 10,
    validUntil: '2025-12-31',
    used: false,
  },
  {
    id: 'dc-2',
    code: 'FREEMONTH',
    type: 'free',
    value: 30,
    validUntil: '2025-11-30',
    used: true,
  },
  {
    id: 'dc-3',
    code: 'BONUS50',
    type: 'bonus',
    value: 50,
    validUntil: '2025-12-15',
    used: false,
  },
];

export default function AnalyticsPage() {
  const [timeWatched, setTimeWatched] = useState('0h 0m');
  const [totalSpent, setTotalSpent] = useState('€0.00');
  const [contentCount, setContentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('month');
  const [mediaHistory, setMediaHistory] = useState<MediaItem[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [chartStartDate, setChartStartDate] = useState(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  );
  const [chartEndDate, setChartEndDate] = useState(new Date());

  const applyDemoData = () => {
    const hours = Math.floor(demoUserStats.totalTimeWatched / 3600);
    const minutes = Math.floor((demoUserStats.totalTimeWatched % 3600) / 60);
    setTimeWatched(`${hours}h ${minutes}m`);
    setTotalSpent(`€${demoUserStats.totalSpent.toFixed(2)}`);
    setContentCount(demoUserStats.contentCount);
    setMediaHistory(demoMediaHistory);
    setCoupons(demoCoupons);
  };

  useEffect(() => {
    loadAnalytics();
  }, [dateRange]);

  async function loadAnalytics() {
    setLoading(true);
    try {
      const wc = await getWalletConnect();
      const address = wc.getConnectedAddress();
      
      if (!address) {
        applyDemoData();
        setLoading(false);
        return;
      }

      const analytics = await getAnalytics();
      const userStats = await analytics.getUserAnalytics({
        userId: address,
        dateRange,
      });

      // Format time watched
      const hours = Math.floor((userStats.totalTimeWatched || 0) / 3600);
      const minutes = Math.floor(((userStats.totalTimeWatched || 0) % 3600) / 60);
      setTimeWatched(`${hours}h ${minutes}m`);

      // Format total spent
      setTotalSpent(`€${(userStats.totalSpent || 0).toFixed(2)}`);

      // Set content count
      setContentCount(userStats.contentCount || 0);

      // Load media history (mock data for now)
      setMediaHistory(demoMediaHistory);

      // Load coupons (mock data for now)
      setCoupons(demoCoupons);
    } catch (err) {
      console.error('Error loading analytics:', err);
      applyDemoData();
    } finally {
      setLoading(false);
    }
  }

  function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Analytics Dashboard
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <ExportButton
              defaultStartDate={chartStartDate.toISOString().split('T')[0]}
              defaultEndDate={chartEndDate.toISOString().split('T')[0]}
            />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Time Watched</span>
              <span className="text-2xl">â±ï¸</span>
            </div>
            {loading ? (
              <div className="h-8 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
            ) : (
              <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                {timeWatched}
              </div>
            )}
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Total Spent</span>
              <span className="text-2xl" suppressHydrationWarning>💰</span>
            </div>
            {loading ? (
              <div className="h-8 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
            ) : (
              <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                {totalSpent}
              </div>
            )}
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Content Count</span>
              <span className="text-2xl" suppressHydrationWarning>📊</span>
            </div>
            {loading ? (
              <div className="h-8 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
            ) : (
              <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                {contentCount}
              </div>
            )}
          </div>
        </div>

        {/* Charts */}
        <div className="space-y-8">
          {/* Time Watched Chart */}
          <div
            id="time-watched-chart"
            className="rounded-2xl border-2 border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Time Watched Over Time
            </h2>
            <TimeWatchedChart
              startDate={chartStartDate}
              endDate={chartEndDate}
              onDateRangeChange={(start, end) => {
                setChartStartDate(start);
                setChartEndDate(end);
              }}
            />
          </div>

          {/* Cost per Content Chart */}
          <div
            id="cost-chart"
            className="rounded-2xl border-2 border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Cost per Content
            </h2>
            <CostPerContentChart startDate={chartStartDate} endDate={chartEndDate} platform={selectedPlatform} />
          </div>

          {/* Monthly Spend Chart */}
          <div
            id="monthly-chart"
            className="rounded-2xl border-2 border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Monthly Spending
            </h2>
            <MonthlySpendChart />
          </div>

          {/* Spending by Platform and Content Type - Side by Side */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div
              id="platform-chart"
              className="rounded-2xl border-2 border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Spending by Platform
              </h2>
              <SpendingByPlatformChart
                startDate={chartStartDate}
                endDate={chartEndDate}
                onPlatformClick={setSelectedPlatform}
                selectedPlatform={selectedPlatform}
              />
            </div>

            <div
              id="content-type-chart"
              className="rounded-2xl border-2 border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Content Type Distribution
              </h2>
              <ContentTypeDistributionChart />
            </div>
          </div>
        </div>

        {/* Media History - Using MediaHistory Component */}
        <div className="mb-8">
          <MediaHistory />
        </div>

        {/* Export History */}
        <div className="mb-8 rounded-2xl border-2 border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Recent Exports
          </h2>
          <ExportHistory />
        </div>

        {/* Coupons & Gift Codes */}
        <div className="mb-8 rounded-2xl border-2 border-zinc-200 bg-gradient-to-br from-white to-zinc-50/50 p-6 shadow-xl dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-800/50">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Coupons & Gift Codes
          </h2>
          {loading ? (
            <div className="py-8 text-center text-zinc-500 dark:text-zinc-400">Loading...</div>
          ) : coupons.length === 0 ? (
            <div className="py-8 text-center text-zinc-500 dark:text-zinc-400">
              No coupons available
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className={`rounded-lg border p-4 ${
                    coupon.used
                      ? 'border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/50'
                      : coupon.type === 'discount'
                      ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                      : coupon.type === 'free'
                      ? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
                      : 'border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-900/20'
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        coupon.type === 'discount'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                          : coupon.type === 'free'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                          : 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300'
                      }`}
                    >
                      {coupon.type === 'discount'
                        ? 'Discount'
                        : coupon.type === 'free'
                        ? 'Free'
                        : 'Bonus'}
                    </span>
                    {coupon.used && (
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">Used</span>
                    )}
                  </div>
                  <div className="mb-2 font-mono text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    {coupon.code}
                  </div>
                  <div className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {coupon.type === 'discount'
                      ? `${coupon.value}% off`
                      : coupon.type === 'free'
                      ? `Free ${coupon.value} days`
                      : `${coupon.value} PLY bonus`}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    Valid until: {coupon.validUntil}
                  </div>
                  {!coupon.used && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(coupon.code);
                        alert(`Coupon code ${coupon.code} copied to clipboard!`);
                      }}
                      className="mt-3 w-full rounded-lg bg-blue-500 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-600"
                    >
                      Copy Code
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Export Options */}
        <div className="rounded-2xl border-2 border-zinc-200 bg-gradient-to-br from-white to-zinc-50/50 p-6 shadow-xl dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-800/50">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Export Data
          </h2>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:from-blue-600 hover:to-cyan-600 hover:shadow-xl hover:scale-105 active:scale-95">
              Export as CSV
            </button>
            <button className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:from-green-600 hover:to-emerald-600 hover:shadow-xl hover:scale-105 active:scale-95">
              Download PDF Report
            </button>
            <button className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:from-purple-600 hover:to-pink-600 hover:shadow-xl hover:scale-105 active:scale-95">
              Share with Partner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

