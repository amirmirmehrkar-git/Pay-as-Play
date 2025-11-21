'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';

interface ExportHistoryEntry {
  id: string;
  type: 'csv' | 'pdf';
  dateRange: { start: string; end: string };
  createdAt: string;
}

const STORAGE_KEY = 'pap-export-history';

export default function ExportHistory() {
  const [history, setHistory] = useState<ExportHistoryEntry[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      setHistory(JSON.parse(raw));
    }
  }, []);

  if (history.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 p-4 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
        No exports yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {history.map((entry) => (
        <div
          key={entry.id}
          className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
        >
          <div>
            <div className="font-semibold text-zinc-900 dark:text-zinc-100">
              {entry.type.toUpperCase()} Export
            </div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              {entry.dateRange.start} → {entry.dateRange.end}
            </div>
          </div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            {format(new Date(entry.createdAt), 'PPp')}
          </div>
        </div>
      ))}
    </div>
  );
}

