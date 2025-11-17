'use client';

/**
 * Connected LMS Info Component
 * Displays information about a connected LMS and provides management actions
 */

import { LMSConnection } from '@/app/settings/lms/page';

interface ConnectedLMSInfoProps {
  connection: LMSConnection;
  onDisconnect: (connectionId: string) => void;
  onSyncNow: (connectionId: string) => void;
}

export default function ConnectedLMSInfo({ connection, onDisconnect, onSyncNow }: ConnectedLMSInfoProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
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
        return 'text-green-600 dark:text-green-400';
      case 'disconnected':
        return 'text-zinc-600 dark:text-zinc-400';
      case 'error':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-zinc-600 dark:text-zinc-400';
    }
  };

  return (
    <div className="rounded-xl border-2 border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-900/20">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{connection.platformName}</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{connection.url}</p>
        </div>
        <div className={`text-sm font-semibold capitalize ${getStatusColor(connection.status)}`}>
          {connection.status === 'connected' && '✓ Connected'}
          {connection.status === 'disconnected' && '○ Disconnected'}
          {connection.status === 'error' && '✕ Error'}
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Connected At</p>
          <p className="text-sm text-zinc-900 dark:text-zinc-100">{formatDate(connection.connectedAt)}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Last Sync</p>
          <p className="text-sm text-zinc-900 dark:text-zinc-100">{formatDate(connection.lastSyncAt)}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onSyncNow(connection.id)}
          className="rounded-lg border-2 border-blue-500 bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-600"
        >
          Sync Now
        </button>
        <button
          type="button"
          onClick={() => onDisconnect(connection.id)}
          className="rounded-lg border-2 border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition-all hover:bg-red-50 dark:border-red-800 dark:bg-zinc-800 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}

