'use client';

import Link from 'next/link';

export default function PartnerAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Detailed Analytics
          </h1>
          <Link
            href="/partner"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Charts */}
        <div className="mb-8 grid grid-cols-1 gap-6">
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Daily Consumption Trend
            </h2>
            <div className="flex h-80 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
              <p className="text-zinc-500 dark:text-zinc-400">
                Line chart: Usage minutes over time
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Revenue by Content
            </h2>
            <div className="flex h-80 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
              <p className="text-zinc-500 dark:text-zinc-400">
                Bar chart: Revenue per content
              </p>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Export Data
          </h2>
          <div className="flex flex-wrap gap-4">
            <button className="rounded-lg bg-green-500 px-6 py-3 font-medium text-white transition-colors hover:bg-green-600">
              Export as CSV
            </button>
            <button className="rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600">
              Download PDF Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

