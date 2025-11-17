'use client';

/**
 * LMS Connection Modal Component
 * Modal for connecting to an LMS platform
 */

import { useState, useEffect } from 'react';
import { LMSPlatform } from '@/app/settings/lms/page';

interface LMSConnectionModalProps {
  platform: LMSPlatform;
  onClose: () => void;
  onSuccess: () => void;
}

const platformNames: Record<LMSPlatform, string> = {
  moodle: 'Moodle',
  canvas: 'Canvas',
  blackboard: 'Blackboard',
  custom: 'Custom LMS',
};

export default function LMSConnectionModal({ platform, onClose, onSuccess }: LMSConnectionModalProps) {
  const [lmsUrl, setLmsUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [testError, setTestError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle Escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!lmsUrl.trim()) {
      newErrors.lmsUrl = 'LMS URL is required';
    } else {
      try {
        new URL(lmsUrl);
      } catch {
        newErrors.lmsUrl = 'Invalid URL format';
      }
    }

    if (!apiKey.trim()) {
      newErrors.apiKey = 'API Key is required';
    } else if (apiKey.length < 10) {
      newErrors.apiKey = 'API Key must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTestConnection = async () => {
    if (!validateForm()) {
      return;
    }

    setIsTesting(true);
    setTestStatus('idle');
    setTestError(null);

    try {
      const response = await fetch('/api/lms/test-connection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform,
          url: lmsUrl,
          apiKey,
          apiSecret: apiSecret || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || 'Connection test failed');
      }

      const data = await response.json();
      if (data.success && data.data?.connected) {
        setTestStatus('success');
      } else {
        throw new Error('Connection test failed');
      }
    } catch (err) {
      setTestStatus('error');
      setTestError(err instanceof Error ? err.message : 'Connection test failed. Please check your URL and API key.');
    } finally {
      setIsTesting(false);
    }
  };

  const handleConnect = async () => {
    if (!validateForm() || testStatus !== 'success') {
      return;
    }

    setIsConnecting(true);

    try {
      const response = await fetch('/api/lms/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform,
          url: lmsUrl,
          apiKey,
          apiSecret: apiSecret || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || 'Failed to connect LMS');
      }

      const data = await response.json();
      if (data.success) {
        onSuccess();
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setTestStatus('error');
      setTestError(err instanceof Error ? err.message : 'Failed to connect LMS. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lms-modal-title"
    >
      <div
        className="w-full max-w-md rounded-2xl border-2 border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 id="lms-modal-title" className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Connect {platformNames[platform]}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-600 transition-all hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* LMS URL */}
          <div>
            <label htmlFor="lms-url" className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              LMS URL <span className="text-red-500">*</span>
            </label>
            <input
              id="lms-url"
              type="url"
              value={lmsUrl}
              onChange={(e) => {
                setLmsUrl(e.target.value);
                if (errors.lmsUrl) {
                  const { lmsUrl: _, ...rest } = errors;
                  setErrors(rest);
                }
              }}
              placeholder="https://your-lms.example.com"
              className={`w-full rounded-lg border-2 px-3 py-2 text-sm ${
                errors.lmsUrl
                  ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                  : 'border-zinc-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100'
              }`}
            />
            {errors.lmsUrl && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.lmsUrl}</p>}
          </div>

          {/* API Key */}
          <div>
            <label htmlFor="api-key" className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              API Key <span className="text-red-500">*</span>
            </label>
            <input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                if (errors.apiKey) {
                  const { apiKey: _, ...rest } = errors;
                  setErrors(rest);
                }
              }}
              placeholder="Enter your API key"
              className={`w-full rounded-lg border-2 px-3 py-2 text-sm ${
                errors.apiKey
                  ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                  : 'border-zinc-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100'
              }`}
            />
            {errors.apiKey && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.apiKey}</p>}
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Minimum 10 characters</p>
          </div>

          {/* API Secret (Optional) */}
          <div>
            <label htmlFor="api-secret" className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              API Secret <span className="text-zinc-400">(Optional)</span>
            </label>
            <input
              id="api-secret"
              type="password"
              value={apiSecret}
              onChange={(e) => setApiSecret(e.target.value)}
              placeholder="Enter your API secret (if required)"
              className="w-full rounded-lg border-2 border-zinc-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>

          {/* Test Connection */}
          <div>
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={isTesting || !lmsUrl || !apiKey}
              className={`w-full rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-all ${
                isTesting || !lmsUrl || !apiKey
                  ? 'cursor-not-allowed border-zinc-300 bg-zinc-100 text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800'
                  : 'border-green-500 bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isTesting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Testing Connection...
                </span>
              ) : (
                'Test Connection'
              )}
            </button>
          </div>

          {/* Test Status */}
          {testStatus === 'success' && (
            <div className="rounded-lg border-2 border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-900/20">
              <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
                <span>✓</span>
                <span className="font-semibold">Connection successful!</span>
              </div>
            </div>
          )}

          {testStatus === 'error' && (
            <div className="rounded-lg border-2 border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-red-700 dark:text-red-400">
                  <span>✕</span>
                  <span className="font-semibold">Connection failed</span>
                </div>
                <p className="text-xs text-red-600 dark:text-red-300">{testError}</p>
                <p className="text-xs text-red-600 dark:text-red-300">
                  <strong>Tips:</strong> Check your URL, API key, and ensure your LMS allows external connections.
                </p>
              </div>
            </div>
          )}

          {/* Connect Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border-2 border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-600 transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConnect}
              disabled={isConnecting || testStatus !== 'success'}
              className={`flex-1 rounded-lg border-2 px-4 py-2 text-sm font-semibold text-white transition-all ${
                isConnecting || testStatus !== 'success'
                  ? 'cursor-not-allowed border-zinc-300 bg-zinc-400'
                  : 'border-blue-500 bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isConnecting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Connecting...
                </span>
              ) : (
                'Connect'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

