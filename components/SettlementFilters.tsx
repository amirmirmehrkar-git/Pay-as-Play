'use client';

/**
 * Settlement Filters Component
 * Provides filters for settlement history: Status, Date Range, Search
 */

import { useState } from 'react';
import DateRangeSelector, { DateRangeOption } from './DateRangeSelector';

export type SettlementStatus = 'all' | 'pending' | 'completed' | 'failed';

interface SettlementFiltersProps {
  status: SettlementStatus;
  dateRange: DateRangeOption;
  startDate?: string;
  endDate?: string;
  search: string;
  onStatusChange: (status: SettlementStatus) => void;
  onDateRangeChange: (range: DateRangeOption, start?: string, end?: string) => void;
  onSearchChange: (search: string) => void;
  onClearFilters: () => void;
}

export default function SettlementFilters({
  status,
  dateRange,
  startDate,
  endDate,
  search,
  onStatusChange,
  onDateRangeChange,
  onSearchChange,
  onClearFilters,
}: SettlementFiltersProps) {
  const hasActiveFilters = status !== 'all' || dateRange !== 'thisMonth' || search.length > 0;

  return (
    <div className="space-y-4 rounded-xl border-2 border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800 sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Filters</h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Status Filter */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">Status</label>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value as SettlementStatus)}
            className="w-full rounded-lg border-2 border-zinc-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Search Filter */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Search by Settlement ID
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Enter settlement ID..."
            className="w-full rounded-lg border-2 border-zinc-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />
        </div>
      </div>

      {/* Date Range Selector */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">Date Range</label>
        <DateRangeSelector
          value={dateRange}
          startDate={startDate}
          endDate={endDate}
          onChange={onDateRangeChange}
        />
      </div>
    </div>
  );
}

