'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PartnerDashboardPage() {
  const [activeUsers, setActiveUsers] = useState(1248);
  const [totalRevenue, setTotalRevenue] = useState(2340);
  const [avgSessionTime, setAvgSessionTime] = useState(11.3);
  const [loading, setLoading] = useState(false);

  // Mock data - در production از API می‌آید
  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Partner Dashboard
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Welcome, Laura's Streaming Platform
          </p>
          <Link
            href="/"
            className="mt-2 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Active Users Today</span>
              <span className="text-2xl">👥</span>
            </div>
            {loading ? (
              <div className="h-8 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
            ) : (
              <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                {activeUsers.toLocaleString()}
              </div>
            )}
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Total Revenue (Month)</span>
              <span className="text-2xl">💰</span>
            </div>
            {loading ? (
              <div className="h-8 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
            ) : (
              <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                €{totalRevenue.toLocaleString()}
              </div>
            )}
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Average Session Time</span>
              <span className="text-2xl">⏱️</span>
            </div>
            {loading ? (
              <div className="h-8 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
            ) : (
              <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                {avgSessionTime} min
              </div>
            )}
          </div>
        </div>

        {/* Charts Section */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Revenue Trend
            </h2>
            <div className="flex h-64 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
              <p className="text-zinc-500 dark:text-zinc-400">
                Revenue chart will be displayed here
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              User Activity
            </h2>
            <div className="flex h-64 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
              <p className="text-zinc-500 dark:text-zinc-400">
                User activity chart will be displayed here
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Table */}
        <div className="mb-8 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Recent Sessions
            </h2>
            <div className="flex gap-2">
              <button className="rounded-lg border border-zinc-300 bg-white px-3 py-1 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700">
                Today
              </button>
              <button className="rounded-lg border border-zinc-300 bg-white px-3 py-1 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700">
                Week
              </button>
              <button className="rounded-lg border border-zinc-300 bg-white px-3 py-1 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700">
                Month
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="px-4 py-3 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    User ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    Time Spent
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    Amount Paid
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { userId: '0x1234...', time: '12:34', amount: '€2.48', date: '2025-11-16' },
                  { userId: '0x5678...', time: '8:21', amount: '€1.64', date: '2025-11-16' },
                  { userId: '0x9abc...', time: '15:45', amount: '€3.15', date: '2025-11-15' },
                ].map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  >
                    <td className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100">
                      {row.userId}
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100">
                      {row.time}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-green-600 dark:text-green-400">
                      {row.amount}
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">
                      {row.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/partner/analytics"
            className="rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600"
          >
            View Detailed Analytics
          </Link>
          <button className="rounded-lg border border-zinc-300 bg-white px-6 py-3 font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700">
            Export CSV
          </button>
          <button className="rounded-lg border border-zinc-300 bg-white px-6 py-3 font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700">
            Settlement Reports
          </button>
        </div>
      </div>
    </div>
  );
}

