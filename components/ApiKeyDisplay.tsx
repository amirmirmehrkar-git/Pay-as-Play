'use client';

/**
 * Reusable API Key Display component
 * Shows API key with masking, show/hide toggle, and copy functionality
 */

import { useState } from 'react';

interface ApiKeyDisplayProps {
  apiKey: string;
  masked?: boolean;
  showCopyButton?: boolean;
  onCopy?: () => void;
}

export default function ApiKeyDisplay({
  apiKey,
  masked: initialMasked = true,
  showCopyButton = true,
  onCopy,
}: ApiKeyDisplayProps) {
  const [isMasked, setIsMasked] = useState(initialMasked);
  const [copied, setCopied] = useState(false);

  // Mask API key: show only last 4 characters
  const maskApiKey = (key: string): string => {
    if (key.length <= 4) return '****';
    const parts = key.split('-');
    if (parts.length >= 3) {
      // Format: PP-XXXX-XXXX-ABCD
      const lastPart = parts[parts.length - 1];
      return `PP-****-****-${lastPart}`;
    }
    // Fallback: mask all but last 4 chars
    return `${'*'.repeat(key.length - 4)}${key.slice(-4)}`;
  };

  const displayKey = isMasked ? maskApiKey(apiKey) : apiKey;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      if (onCopy) {
        onCopy();
      }
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy API key:', err);
    }
  };

  return (
    <div className="space-y-3">
      {/* API Key Display */}
      <div className="flex items-center gap-3 rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
        <code className="flex-1 font-mono text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {displayKey}
        </code>

        {/* Show/Hide Toggle */}
        <button
          type="button"
          onClick={() => setIsMasked(!isMasked)}
          className="rounded-lg border-2 border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition-all hover:bg-zinc-50 hover:border-zinc-400 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          aria-label={isMasked ? 'Show API key' : 'Hide API key'}
        >
          {isMasked ? '👁️ Show' : '🙈 Hide'}
        </button>

        {/* Copy Button */}
        {showCopyButton && (
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-lg border-2 border-blue-500 bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-600 hover:border-blue-600 active:scale-95"
            aria-label="Copy API key to clipboard"
          >
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
        )}
      </div>

      {/* Toast Notification */}
      {copied && (
        <div className="fixed bottom-4 right-4 z-50 rounded-xl border-2 border-green-200 bg-green-50 px-4 py-3 shadow-lg dark:border-green-800 dark:bg-green-900/20">
          <p className="text-sm font-semibold text-green-700 dark:text-green-400">✓ Copied to clipboard!</p>
        </div>
      )}
    </div>
  );
}

