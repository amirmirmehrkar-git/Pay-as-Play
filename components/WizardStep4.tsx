'use client';

/**
 * Step 4 of Integration Wizard: Code Integration
 * Displays code examples for different frameworks and allows testing connection
 */

import { useState } from 'react';
import { useWizardStore } from '@/stores/wizardStore';
import CodeSnippet from './CodeSnippet';

type Framework = 'react' | 'vue' | 'vanilla';

const frameworks = [
  { id: 'react' as const, name: 'React', icon: '⚛️' },
  { id: 'vue' as const, name: 'Vue', icon: '🟢' },
  { id: 'vanilla' as const, name: 'Vanilla JS', icon: '📜' },
] as const;

const DOCS_URL = 'https://docs.playandpay.io';
const GITHUB_EXAMPLES_URL = 'https://github.com/playandpay/examples';
const SUPPORT_URL = 'https://support.playandpay.io';

// Code examples with placeholders for API key and platform ID
const getCodeExample = (framework: Framework, apiKey: string, platformId: string): string => {
  const examples = {
    react: `import { PlayAndPay } from 'playandpay-sdk';

// Initialize SDK
const sdk = new PlayAndPay({
  apiKey: '${apiKey}',
  platformId: '${platformId}',
});

// Start a session
function VideoPlayer({ videoId }) {
  const [sessionId, setSessionId] = useState(null);

  const handlePlay = async () => {
    const session = await sdk.billing.startSession({
      contentId: videoId,
      contentType: 'video',
    });
    setSessionId(session.sessionId);
  };

  const handleStop = async () => {
    if (sessionId) {
      await sdk.billing.stopSession(sessionId);
      setSessionId(null);
    }
  };

  return (
    <div>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
}`,

    vue: `import { PlayAndPay } from 'playandpay-sdk';

// Initialize SDK
const sdk = new PlayAndPay({
  apiKey: '${apiKey}',
  platformId: '${platformId}',
});

// Vue Component
export default {
  data() {
    return {
      sessionId: null,
    };
  },
  methods: {
    async handlePlay(videoId) {
      const session = await sdk.billing.startSession({
        contentId: videoId,
        contentType: 'video',
      });
      this.sessionId = session.sessionId;
    },
    async handleStop() {
      if (this.sessionId) {
        await sdk.billing.stopSession(this.sessionId);
        this.sessionId = null;
      }
    },
  },
};`,

    vanilla: `import { PlayAndPay } from 'playandpay-sdk';

// Initialize SDK
const sdk = new PlayAndPay({
  apiKey: '${apiKey}',
  platformId: '${platformId}',
});

// Start a session
async function startVideoSession(videoId) {
  const session = await sdk.billing.startSession({
    contentId: videoId,
    contentType: 'video',
  });
  return session.sessionId;
}

// Stop a session
async function stopVideoSession(sessionId) {
  await sdk.billing.stopSession(sessionId);
}

// Usage
const playButton = document.getElementById('play-btn');
playButton.addEventListener('click', async () => {
  const sessionId = await startVideoSession('video-123');
  // Store sessionId for later use
});`,
  };

  return examples[framework];
};

export default function WizardStep4() {
  const { apiKeyData, platformId, platformName } = useWizardStore();
  const [activeFramework, setActiveFramework] = useState<Framework>('react');
  const [isTesting, setIsTesting] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [testError, setTestError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const apiKey = apiKeyData?.apiKey || '';
  const codeExample = apiKey && platformId ? getCodeExample(activeFramework, apiKey, platformId) : '';

  const handleTestConnection = async () => {
    if (!apiKeyData?.apiKey || !platformId) {
      setTestError('API key or platform ID is missing. Please go back to previous steps.');
      setTestStatus('error');
      return;
    }

    setIsTesting(true);
    setTestStatus('idle');
    setTestError(null);

    try {
      const response = await fetch('/api/partner/test-connection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: apiKeyData.apiKey,
          platformId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || 'Connection failed');
      }

      const data = await response.json();
      if (data.success && data.data?.connected) {
        setTestStatus('success');
      } else {
        throw new Error('Connection test failed');
      }
    } catch (err) {
      setTestStatus('error');
      setTestError(err instanceof Error ? err.message : 'Connection failed. Please check your API key and try again.');
    } finally {
      setIsTesting(false);
    }
  };

  const handleCopy = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Framework Selection Tabs */}
      <div>
        <label className="mb-4 block text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Choose Your Framework
        </label>
        <div className="flex gap-2">
          {frameworks.map((framework) => {
            const isActive = activeFramework === framework.id;
            return (
              <button
                key={framework.id}
                type="button"
                onClick={() => setActiveFramework(framework.id)}
                className={`flex-1 rounded-xl border-2 px-4 py-3 font-semibold transition-all ${
                  isActive
                    ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600'
                }`}
                aria-pressed={isActive}
                aria-label={`Select ${framework.name} framework`}
              >
                <span className="mr-2">{framework.icon}</span>
                {framework.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Code Example */}
      {codeExample && (
        <div>
          <label className="mb-2 block text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Integration Code ({frameworks.find((f) => f.id === activeFramework)?.name})
          </label>
          <CodeSnippet code={codeExample} language={activeFramework === 'react' ? 'jsx' : 'javascript'} onCopy={handleCopy} />
        </div>
      )}

      {/* Test Connection */}
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Test Your Connection
          </label>
          <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            Test your API key and platform connection before completing the integration.
          </p>
          <button
            type="button"
            onClick={handleTestConnection}
            disabled={isTesting || !apiKeyData?.apiKey || !platformId}
            className={`w-full rounded-xl px-6 py-4 font-semibold text-white transition-all ${
              isTesting || !apiKeyData?.apiKey || !platformId
                ? 'cursor-not-allowed bg-zinc-400 opacity-50'
                : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 hover:shadow-lg hover:scale-105 active:scale-95'
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
          <div className="rounded-xl border-2 border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div className="flex-1">
                <p className="font-semibold text-green-700 dark:text-green-400">Connected!</p>
                <p className="text-sm text-green-600 dark:text-green-300">
                  Your API key and platform are working correctly.
                </p>
              </div>
            </div>
          </div>
        )}

        {testStatus === 'error' && (
          <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
            <div className="flex items-start gap-3">
              <span className="text-2xl">❌</span>
              <div className="flex-1">
                <p className="font-semibold text-red-700 dark:text-red-400">Connection Failed</p>
                <p className="mt-1 text-sm text-red-600 dark:text-red-300">{testError}</p>
                <button
                  type="button"
                  onClick={handleTestConnection}
                  className="mt-2 text-sm font-semibold text-red-600 underline hover:text-red-700 dark:text-red-400"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Integration Guide Links */}
      <div className="rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
        <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Need Help?</h3>
        <div className="flex flex-wrap gap-3">
          <a
            href={DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border-2 border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-600 transition-all hover:bg-blue-50 hover:border-blue-300 dark:border-blue-700 dark:bg-zinc-800 dark:text-blue-400 dark:hover:bg-zinc-700"
          >
            📚 Documentation
          </a>
          <a
            href={GITHUB_EXAMPLES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border-2 border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-600 transition-all hover:bg-zinc-50 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
          >
            💻 GitHub Examples
          </a>
          <a
            href={SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border-2 border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-600 transition-all hover:bg-zinc-50 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
          >
            🆘 Support Center
          </a>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 rounded-xl border-2 border-green-200 bg-green-50 px-4 py-3 shadow-lg dark:border-green-800 dark:bg-green-900/20">
          <p className="text-sm font-semibold text-green-700 dark:text-green-400">✓ Copied to clipboard!</p>
        </div>
      )}
    </div>
  );
}

