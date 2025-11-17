'use client';

/**
 * LMS Learning Statistics Component
 * Displays learning statistics: streak, average session, most active day, favorite category
 */

interface LMSLearningStatisticsProps {
  dailyStreak: number;
  averageSessionDuration: number; // seconds
  mostActiveDay: string;
  favoriteCategory: string;
  loading?: boolean;
}

export default function LMSLearningStatistics({
  dailyStreak,
  averageSessionDuration,
  mostActiveDay,
  favoriteCategory,
  loading = false,
}: LMSLearningStatisticsProps) {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse rounded-xl border-2 border-zinc-200 bg-zinc-100 p-6 dark:border-zinc-700 dark:bg-zinc-800">
            <div className="h-6 w-32 rounded bg-zinc-300 dark:bg-zinc-700"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Daily Streak */}
      <div className="rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
        <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Daily Streak</p>
        <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">{dailyStreak} days</p>
        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">🔥 Keep it up!</p>
      </div>

      {/* Average Session Duration */}
      <div className="rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
        <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Avg. Session</p>
        <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">{formatDuration(averageSessionDuration)}</p>
        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">Per session</p>
      </div>

      {/* Most Active Day */}
      <div className="rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
        <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Most Active Day</p>
        <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">{mostActiveDay}</p>
        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">Of the week</p>
      </div>

      {/* Favorite Category */}
      <div className="rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
        <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Favorite Category</p>
        <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">{favoriteCategory}</p>
        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">Most studied</p>
      </div>
    </div>
  );
}

