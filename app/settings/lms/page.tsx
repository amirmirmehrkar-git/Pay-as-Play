'use client';

/**
 * LMS Integration Settings Page
 * Allows users to connect their LMS accounts (Moodle, Canvas, Blackboard, etc.)
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LMSPlatformList from '@/components/LMSPlatformList';
import ConnectedLMSInfo from '@/components/ConnectedLMSInfo';
import LMSConnectionModal from '@/components/LMSConnectionModal';

export type LMSPlatform = 'moodle' | 'canvas' | 'blackboard' | 'custom';

export interface LMSConnection {
  id: string;
  platform: LMSPlatform;
  platformName: string;
  url: string;
  connectedAt: string;
  lastSyncAt: string | null;
  status: 'connected' | 'disconnected' | 'error';
}

export default function LMSSettingsPage() {
  const [connections, setConnections] = useState<LMSConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<LMSPlatform | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disconnectConnectionId, setDisconnectConnectionId] = useState<string | null>(null);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const fetchConnections = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/lms/connections');

      if (!response.ok) {
        throw new Error('Failed to fetch LMS connections');
      }

      const result = await response.json();
      if (result.success && result.data) {
        setConnections(result.data.connections || []);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load LMS connections');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const handleConnect = (platform: LMSPlatform) => {
    setSelectedPlatform(platform);
    setIsModalOpen(true);
  };

  const handleConnectionSuccess = () => {
    setIsModalOpen(false);
    setSelectedPlatform(null);
    fetchConnections();
  };

  const handleDisconnect = (connectionId: string) => {
    setDisconnectConnectionId(connectionId);
  };

  const confirmDisconnect = async () => {
    if (!disconnectConnectionId) return;

    setIsDisconnecting(true);
    try {
      const response = await fetch(`/api/lms/disconnect`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ connectionId: disconnectConnectionId }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || 'Failed to disconnect LMS');
      }

      setDisconnectConnectionId(null);
      await fetchConnections();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to disconnect LMS');
    } finally {
      setIsDisconnecting(false);
    }
  };

  const cancelDisconnect = () => {
    setDisconnectConnectionId(null);
  };

  const handleSyncNow = async (connectionId: string) => {
    try {
      const response = await fetch('/api/lms/sync-courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ connectionId }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || 'Failed to sync courses');
      }

      await fetchConnections();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to sync courses');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          {/* Breadcrumb */}
          <nav className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            <Link href="/settings" className="hover:text-blue-600 dark:hover:text-blue-400">
              Settings
            </Link>
            <span className="mx-2">/</span>
            <span className="text-zinc-900 dark:text-zinc-100">LMS Integration</span>
          </nav>

          <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">LMS Integration</h1>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            Connect your Learning Management System to sync courses and track progress
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/settings/lms/sync"
              className="rounded-lg border-2 border-blue-500 bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-600"
            >
              Sync Courses
            </Link>
            <Link
              href="/settings/lms/progress"
              className="rounded-lg border-2 border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-600 transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
            >
              View Progress
            </Link>
          </div>
        </div>

        {/* Error State */}
        {error && !connections.length && (
          <div className="mb-6 rounded-xl border-2 border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-red-700 dark:text-red-400">Error loading connections</p>
                <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
              </div>
              <button
                onClick={fetchConnections}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Connected LMS Info */}
        {connections.length > 0 && (
          <div className="mb-6 space-y-4">
            {connections.map((connection) => (
              <ConnectedLMSInfo
                key={connection.id}
                connection={connection}
                onDisconnect={handleDisconnect}
                onSyncNow={handleSyncNow}
              />
            ))}
          </div>
        )}

        {/* Supported LMS List */}
        <div className="mb-6">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Supported Platforms</h2>
          <LMSPlatformList
            connections={connections}
            onConnect={handleConnect}
            loading={loading}
          />
        </div>

        {/* Connection Modal */}
        {isModalOpen && selectedPlatform && (
          <LMSConnectionModal
            platform={selectedPlatform}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedPlatform(null);
            }}
            onSuccess={handleConnectionSuccess}
          />
        )}

        {/* Disconnect Confirmation Modal */}
        {disconnectConnectionId && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={cancelDisconnect}
            role="dialog"
            aria-modal="true"
            aria-labelledby="disconnect-modal-title"
          >
            <div
              className="w-full max-w-md rounded-2xl border-2 border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 id="disconnect-modal-title" className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Disconnect LMS?
              </h2>
              <p className="mb-2 text-zinc-600 dark:text-zinc-400">
                Are you sure you want to disconnect this LMS connection?
              </p>
              <p className="mb-6 text-sm font-semibold text-red-600 dark:text-red-400">
                ⚠️ Warning: Your courses will no longer sync automatically.
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={cancelDisconnect}
                  disabled={isDisconnecting}
                  className="flex-1 rounded-lg border-2 border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-600 transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDisconnect}
                  disabled={isDisconnecting}
                  className={`flex-1 rounded-lg border-2 px-4 py-2 text-sm font-semibold text-white transition-all ${
                    isDisconnecting
                      ? 'cursor-not-allowed border-zinc-300 bg-zinc-400'
                      : 'border-red-500 bg-red-500 hover:bg-red-600'
                  }`}
                >
                  {isDisconnecting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                      Disconnecting...
                    </span>
                  ) : (
                    'Disconnect'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

