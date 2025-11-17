'use client';

/**
 * LMS Platform List Component
 * Displays cards for supported LMS platforms (Moodle, Canvas, Blackboard, Custom)
 */

import { LMSPlatform, LMSConnection } from '@/app/settings/lms/page';

interface LMSPlatformListProps {
  connections: LMSConnection[];
  onConnect: (platform: LMSPlatform) => void;
  loading?: boolean;
}

const supportedPlatforms = [
  {
    id: 'moodle' as const,
    name: 'Moodle',
    icon: '📚',
    description: 'Open-source learning platform',
    color: 'orange',
  },
  {
    id: 'canvas' as const,
    name: 'Canvas',
    icon: '🎨',
    description: 'Instructure Canvas LMS',
    color: 'red',
  },
  {
    id: 'blackboard' as const,
    name: 'Blackboard',
    icon: '🖤',
    description: 'Blackboard Learn',
    color: 'zinc',
  },
  {
    id: 'custom' as const,
    name: 'Custom LMS',
    icon: '⚙️',
    description: 'Other LMS platforms',
    color: 'blue',
  },
] as const;

export default function LMSPlatformList({ connections, onConnect, loading = false }: LMSPlatformListProps) {
  const getConnectionStatus = (platform: LMSPlatform) => {
    return connections.find((c) => c.platform === platform && c.status === 'connected');
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse rounded-xl border-2 border-zinc-200 bg-zinc-100 p-6 dark:border-zinc-700 dark:bg-zinc-800">
            <div className="h-8 w-32 rounded bg-zinc-300 dark:bg-zinc-700"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {supportedPlatforms.map((platform) => {
        const connection = getConnectionStatus(platform.id);
        const isConnected = !!connection;

        return (
          <div
            key={platform.id}
            className={`rounded-xl border-2 p-6 transition-all ${
              isConnected
                ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                : 'border-zinc-200 bg-white hover:border-blue-400 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-blue-500'
            }`}
          >
            <div className="mb-4 text-4xl">{platform.icon}</div>
            <h3 className="mb-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{platform.name}</h3>
            <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">{platform.description}</p>

            {isConnected ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
                  <span>✓</span>
                  <span className="font-semibold">Connected</span>
                </div>
                <button
                  type="button"
                  onClick={() => onConnect(platform.id)}
                  className="w-full rounded-lg border-2 border-blue-500 bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-600"
                >
                  Manage
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onConnect(platform.id)}
                className="w-full rounded-lg border-2 border-blue-500 bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-600 hover:shadow-lg"
              >
                Connect
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

