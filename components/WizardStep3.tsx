'use client';

/**
 * Step 3 of Integration Wizard: API Key Generation
 * Allows user to generate API key securely
 */

import { useState } from 'react';
import { useWizardStore } from '@/stores/wizardStore';
import ApiKeyDisplay from './ApiKeyDisplay';

type KeyName = 'Production Key' | 'Development Key';

export default function WizardStep3() {
  const { platformId, platformName, setApiKeyData, apiKeyData } = useWizardStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [keyName, setKeyName] = useState<KeyName>('Development Key');
  const [savedConfirmation, setSavedConfirmation] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const canGenerate = Boolean(platformId) && !isGenerating && !apiKeyData;

  const handleGenerate = async () => {
    if (!platformId) {
      setError('Platform not selected. Please go back to Step 1.');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/partner/api-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platformId,
          keyName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || 'Failed to generate API key');
      }

      const data = await response.json();
      if (data.success && data.data) {
        setApiKeyData({
          apiKey: data.data.apiKey,
          apiKeyId: data.data.apiKeyId,
          platformId: data.data.platformId,
          keyName: data.data.keyName,
          createdAt: data.data.createdAt,
        });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate API key. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const formatDate = (dateString: string) => {
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

  return (
    <div className="space-y-6">
      {/* Key Name Selection (only show if not generated yet) */}
      {!apiKeyData && (
        <div>
          <label className="mb-4 block text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Key Type
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setKeyName('Development Key')}
              className={`flex-1 rounded-xl border-2 px-4 py-3 font-semibold transition-all ${
                keyName === 'Development Key'
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600'
              }`}
            >
              Development Key
            </button>
            <button
              type="button"
              onClick={() => setKeyName('Production Key')}
              className={`flex-1 rounded-xl border-2 px-4 py-3 font-semibold transition-all ${
                keyName === 'Production Key'
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600'
              }`}
            >
              Production Key
            </button>
          </div>
        </div>
      )}

      {/* Generate Button */}
      {!apiKeyData && (
        <div>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={!canGenerate}
            className={`w-full rounded-xl px-6 py-4 font-semibold text-white transition-all ${
              canGenerate
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover:shadow-lg hover:scale-105 active:scale-95'
                : 'cursor-not-allowed bg-zinc-400 opacity-50'
            }`}
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Generating API Key...
              </span>
            ) : (
              'Generate API Key'
            )}
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          <div className="flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div className="flex-1">
              <p className="font-semibold text-red-700 dark:text-red-400">{error}</p>
              <button
                type="button"
                onClick={handleGenerate}
                className="mt-2 text-sm font-semibold text-red-600 underline hover:text-red-700 dark:text-red-400"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* API Key Display */}
      {apiKeyData && (
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Your API Key
            </label>
            <ApiKeyDisplay apiKey={apiKeyData.apiKey} onCopy={handleCopy} />
          </div>

          {/* Security Warning */}
          <div className="rounded-xl border-2 border-orange-200 bg-orange-50 p-4 dark:border-orange-800 dark:bg-orange-900/20">
            <div className="flex items-start gap-3">
              <span className="text-xl">⚠️</span>
              <div className="flex-1">
                <p className="font-semibold text-orange-700 dark:text-orange-400">
                  Keep your API key secret. It will not be shown again.
                </p>
                <p className="mt-1 text-sm text-orange-600 dark:text-orange-300">
                  Make sure to copy and save it in a secure location before proceeding.
                </p>
              </div>
            </div>
          </div>

          {/* Saved Confirmation Checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="saved-confirmation"
              checked={savedConfirmation}
              onChange={(e) => setSavedConfirmation(e.target.checked)}
              className="h-5 w-5 rounded border-2 border-zinc-300 text-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-zinc-600"
            />
            <label
              htmlFor="saved-confirmation"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              I've saved my API key securely
            </label>
          </div>

          {/* API Key Information */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border-2 border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
              <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">API Key ID</div>
              <div className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {apiKeyData.apiKeyId}
              </div>
            </div>

            <div className="rounded-xl border-2 border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
              <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">Key Name</div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{apiKeyData.keyName}</div>
            </div>

            <div className="rounded-xl border-2 border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
              <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">Platform</div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{platformName}</div>
            </div>

            <div className="rounded-xl border-2 border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
              <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">Created At</div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {formatDate(apiKeyData.createdAt)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 rounded-xl border-2 border-green-200 bg-green-50 px-4 py-3 shadow-lg dark:border-green-800 dark:bg-green-900/20">
          <p className="text-sm font-semibold text-green-700 dark:text-green-400">
            {apiKeyData ? '✓ API Key generated successfully!' : '✓ Copied to clipboard!'}
          </p>
        </div>
      )}
    </div>
  );
}

