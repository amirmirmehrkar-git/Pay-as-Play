'use client';

/**
 * Date Range Selector Component
 * Allows users to select date range: This Month, Last Month, Last 6 Months, Custom
 */

import { useState } from 'react';

export type DateRangeOption = 'thisMonth' | 'lastMonth' | 'last6Months' | 'custom';

interface DateRangeSelectorProps {
  value: DateRangeOption;
  startDate?: string;
  endDate?: string;
  onChange: (range: DateRangeOption, startDate?: string, endDate?: string) => void;
}

export default function DateRangeSelector({
  value,
  startDate,
  endDate,
  onChange,
}: DateRangeSelectorProps) {
  const [showCustomPicker, setShowCustomPicker] = useState(value === 'custom');
  const [customStart, setCustomStart] = useState(startDate || '');
  const [customEnd, setCustomEnd] = useState(endDate || '');

  const handlePresetChange = (preset: DateRangeOption) => {
    if (preset === 'custom') {
      setShowCustomPicker(true);
      onChange('custom', customStart, customEnd);
    } else {
      setShowCustomPicker(false);
      onChange(preset);
    }
  };

  const handleCustomDateChange = () => {
    if (customStart && customEnd) {
      onChange('custom', customStart, customEnd);
    }
  };

  return (
    <div className="space-y-3">
      {/* Preset Options */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => handlePresetChange('thisMonth')}
          className={`rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-all ${
            value === 'thisMonth'
              ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-400'
              : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600'
          }`}
        >
          This Month
        </button>
        <button
          type="button"
          onClick={() => handlePresetChange('lastMonth')}
          className={`rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-all ${
            value === 'lastMonth'
              ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-400'
              : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600'
          }`}
        >
          Last Month
        </button>
        <button
          type="button"
          onClick={() => handlePresetChange('last6Months')}
          className={`rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-all ${
            value === 'last6Months'
              ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-400'
              : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600'
          }`}
        >
          Last 6 Months
        </button>
        <button
          type="button"
          onClick={() => handlePresetChange('custom')}
          className={`rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-all ${
            value === 'custom'
              ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-400'
              : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600'
          }`}
        >
          Custom
        </button>
      </div>

      {/* Custom Date Picker */}
      {showCustomPicker && (
        <div className="flex flex-wrap gap-3 rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
          <div className="flex-1 min-w-[200px]">
            <label className="mb-1 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">Start Date</label>
            <input
              type="date"
              value={customStart}
              onChange={(e) => {
                setCustomStart(e.target.value);
                if (e.target.value && customEnd) {
                  onChange('custom', e.target.value, customEnd);
                }
              }}
              className="w-full rounded-lg border-2 border-zinc-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="mb-1 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">End Date</label>
            <input
              type="date"
              value={customEnd}
              onChange={(e) => {
                setCustomEnd(e.target.value);
                if (customStart && e.target.value) {
                  onChange('custom', customStart, e.target.value);
                }
              }}
              min={customStart}
              className="w-full rounded-lg border-2 border-zinc-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>
        </div>
      )}

      {/* Selected Range Display */}
      {value !== 'custom' && (
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          Showing data for: <span className="font-semibold">{value.replace(/([A-Z])/g, ' $1').trim()}</span>
        </div>
      )}
    </div>
  );
}

