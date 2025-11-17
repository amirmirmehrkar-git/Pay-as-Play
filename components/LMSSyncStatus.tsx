'use client';

/**
 * LMS Sync Status Component
 * Displays connection status, last sync date, sync status, and number of courses synced
 */

interface LMSSyncStatusProps {
  connectionStatus: 'connected' | 'disconnected' | 'error';
  lastSyncDate: string | null;
  syncStatus: 'success' | 'failed' | 'in_progress' | null;
  coursesSynced: number;
  loading?: boolean;
}

export default function LMSSyncStatus({
  connectionStatus,
  lastSyncDate,
  syncStatus,
  coursesSynced,
  loading = false,
}: LMSSyncStatusProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'success':
        return 'text-green-600 dark:text-green-400';
      case 'disconnected':
      case 'failed':
        return 'text-red-600 dark:text-red-400';
      case 'in_progress':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-zinc-600 dark:text-zinc-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
      case 'success':
        return '✓';
      case 'disconnected':
      case 'failed':
        return '✕';
      case 'in_progress':
        return '⟳';
      default:
        return '○';
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse rounded-xl border-2 border-zinc-200 bg-zinc-100 p-6 dark:border-zinc-700 dark:bg-zinc-800">
        <div className="h-6 w-32 rounded bg-zinc-300 dark:bg-zinc-700"></div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
      <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Sync Status</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Connection Status */}
        <div>
          <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Connection</p>
          <p className={`text-sm font-semibold capitalize ${getStatusColor(connectionStatus)}`}>
            {getStatusIcon(connectionStatus)} {connectionStatus}
          </p>
        </div>

        {/* Last Sync */}
        <div>
          <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Last Sync</p>
          <p className="text-sm text-zinc-900 dark:text-zinc-100">{formatDate(lastSyncDate)}</p>
        </div>

        {/* Sync Status */}
        <div>
          <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Sync Status</p>
          <p className={`text-sm font-semibold capitalize ${syncStatus ? getStatusColor(syncStatus) : 'text-zinc-600 dark:text-zinc-400'}`}>
            {syncStatus ? `${getStatusIcon(syncStatus)} ${syncStatus.replace('_', ' ')}` : 'Not synced'}
          </p>
        </div>

        {/* Courses Synced */}
        <div>
          <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Courses Synced</p>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{coursesSynced}</p>
        </div>
      </div>
    </div>
  );
}

