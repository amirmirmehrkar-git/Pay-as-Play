'use client';

import { useState, useEffect } from 'react';

interface MediaItem {
  id: string;
  platform: string;
  platformIcon: string;
  title: string;
  category: 'video' | 'audio' | 'learn' | 'entertainment';
  duration: number; // seconds
  cost: number;
  watchedAt: string;
  watchCount: number;
}

export default function MediaHistory() {
  const [mediaHistory, setMediaHistory] = useState<MediaItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'video' | 'audio' | 'learn' | 'entertainment'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'duration' | 'cost' | 'platform'>('date');
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'all'>('all');

  useEffect(() => {
    loadMediaHistory();
  }, [filter, dateRange]);

  function loadMediaHistory() {
    try {
      const stored = localStorage.getItem('media_history');
      let history: MediaItem[] = stored ? JSON.parse(stored) : [];

      // Apply filters
      if (filter !== 'all') {
        history = history.filter((item) => item.category === filter);
      }

      // Apply date range
      const now = new Date();
      if (dateRange !== 'all') {
        history = history.filter((item) => {
          const itemDate = new Date(item.watchedAt);
          switch (dateRange) {
            case 'today':
              return itemDate.toDateString() === now.toDateString();
            case 'week':
              const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
              return itemDate >= weekAgo;
            case 'month':
              const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
              return itemDate >= monthAgo;
            default:
              return true;
          }
        });
      }

      // Sort
      history.sort((a, b) => {
        switch (sortBy) {
          case 'date':
            return new Date(b.watchedAt).getTime() - new Date(a.watchedAt).getTime();
          case 'duration':
            return b.duration - a.duration;
          case 'cost':
            return b.cost - a.cost;
          case 'platform':
            return a.platform.localeCompare(b.platform);
          default:
            return 0;
        }
      });

      setMediaHistory(history);
    } catch (error) {
      console.error('Error loading media history:', error);
      setMediaHistory([]);
    }
  }

  function formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  }

  const categoryLabels: Record<string, string> = {
    video: 'Video',
    audio: 'Audio',
    learn: 'Learning',
    entertainment: 'Games',
  };

  const totalDuration = mediaHistory.reduce((sum, item) => sum + item.duration, 0);
  const totalCost = mediaHistory.reduce((sum, item) => sum + item.cost, 0);
  const totalWatches = mediaHistory.reduce((sum, item) => sum + item.watchCount, 0);

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-4 dark:border-zinc-800 dark:from-blue-900/20 dark:to-cyan-900/20">
          <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Total Time</div>
          <div className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {formatDuration(totalDuration)}
          </div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-gradient-to-br from-green-50 to-emerald-50 p-4 dark:border-zinc-800 dark:from-green-900/20 dark:to-emerald-900/20">
          <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Total Spent</div>
          <div className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            €{totalCost.toFixed(2)}
          </div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-gradient-to-br from-purple-50 to-pink-50 p-4 dark:border-zinc-800 dark:from-purple-900/20 dark:to-pink-900/20">
          <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Total Watches</div>
          <div className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {totalWatches}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-200 bg-white/80 p-4 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Category:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="rounded-lg border-2 border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          >
            <option value="all">All</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
            <option value="learn">Learning</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Date:</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as any)}
            className="rounded-lg border-2 border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Sort:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-lg border-2 border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          >
            <option value="date">Date</option>
            <option value="duration">Duration</option>
            <option value="cost">Cost</option>
            <option value="platform">Platform</option>
          </select>
        </div>
      </div>

      {/* Media History List */}
      <div className="space-y-3">
        {mediaHistory.length === 0 ? (
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-800/50">
            <p className="text-zinc-600 dark:text-zinc-400">No media history found</p>
          </div>
        ) : (
          mediaHistory.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl border-2 border-zinc-200 bg-gradient-to-br from-white to-zinc-50/50 p-5 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-800/50"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 text-3xl shadow-md dark:from-blue-900/30 dark:to-cyan-900/30">
                  {item.platformIcon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</h4>
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      {categoryLabels[item.category]}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                    {item.platform} • Watched {item.watchCount} {item.watchCount === 1 ? 'time' : 'times'}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-500">
                    <span>⏱️ {formatDuration(item.duration)}</span>
                    <span>💰 €{item.cost.toFixed(2)}</span>
                    <span>📅 {new Date(item.watchedAt).toLocaleDateString()}</span>
                    <span>🕐 {new Date(item.watchedAt).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

