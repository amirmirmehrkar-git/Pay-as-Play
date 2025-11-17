'use client';

/**
 * LMS Sync Actions Component
 * Provides sync controls: Sync Now, Auto-sync toggle, frequency selector
 */

import { useState } from 'react';

interface LMSSyncActionsProps {
  onSyncNow: () => void;
  onAutoSyncChange: (enabled: boolean, frequency: 'daily' | 'weekly' | 'monthly') => void;
  isSyncing?: boolean;
  autoSyncEnabled?: boolean;
  autoSyncFrequency?: 'daily' | 'weekly' | 'monthly';
  syncProgress?: number; // 0-100
}

export default function LMSSyncActions({
  onSyncNow,
  onAutoSyncChange,
  isSyncing = false,
  autoSyncEnabled = false,
  autoSyncFrequency = 'daily',
  syncProgress,
}: LMSSyncActionsProps) {
  const [localAutoSync, setLocalAutoSync] = useState(autoSyncEnabled);
  const [localFrequency, setLocalFrequency] = useState(autoSyncFrequency);

  const handleAutoSyncToggle = (enabled: boolean) => {
    setLocalAutoSync(enabled);
    onAutoSyncChange(enabled, localFrequency);
  };

  const handleFrequencyChange = (frequency: 'daily' | 'weekly' | 'monthly') => {
    setLocalFrequency(frequency);
    if (localAutoSync) {
      onAutoSyncChange(true, frequency);
    }
  };

  return (
    <div className="rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
      <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Sync Actions</h3>
      
      <div className="space-y-4">
        {/* Sync Now Button */}
        <div>
          <button
            type="button"
            onClick={onSyncNow}
            disabled={isSyncing}
            className={`w-full rounded-lg border-2 px-4 py-3 text-sm font-semibold text-white transition-all ${
              isSyncing
                ? 'cursor-not-allowed border-zinc-300 bg-zinc-400'
                : 'border-blue-500 bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isSyncing ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Syncing...
              </span>
            ) : (
              'Sync Now'
            )}
          </button>

          {/* Progress Bar */}
          {isSyncing && syncProgress !== undefined && (
            <div className="mt-2">
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${syncProgress}%` }}
                ></div>
              </div>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{syncProgress}% complete</p>
            </div>
          )}
        </div>

        {/* Auto-sync Toggle */}
        <div className="flex items-center justify-between rounded-lg border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
          <div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">Schedule Auto-sync</p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Automatically sync courses at regular intervals
            </p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={localAutoSync}
              onChange={(e) => handleAutoSyncToggle(e.target.checked)}
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-zinc-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-zinc-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>

        {/* Frequency Selector */}
        {localAutoSync && (
          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Auto-sync Frequency
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['daily', 'weekly', 'monthly'] as const).map((freq) => (
                <button
                  key={freq}
                  type="button"
                  onClick={() => handleFrequencyChange(freq)}
                  className={`rounded-lg border-2 px-3 py-2 text-xs font-semibold transition-all ${
                    localFrequency === freq
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
                  }`}
                >
                  {freq.charAt(0).toUpperCase() + freq.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

