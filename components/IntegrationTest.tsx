'use client';

/**
 * Integration Test Component
 * Tests the integration between different components
 * This component can be used for manual testing
 */

import { useState, useEffect } from 'react';
import { getWalletConnect, getWallet, getBilling, getAnalytics } from '@/lib/sdk';
import { appConfig } from '@/lib/config';

interface TestResult {
  name: string;
  status: 'pass' | 'fail' | 'pending';
  message?: string;
  duration?: number;
}

export default function IntegrationTest() {
  const [tests, setTests] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const testCases: Array<{
    name: string;
    test: () => Promise<{ pass: boolean; message?: string }>;
  }> = [
    {
      name: 'SDK Initialization',
      test: async () => {
        try {
          const wc = await getWalletConnect();
          return { pass: true, message: 'SDK initialized successfully' };
        } catch (err: any) {
          return { pass: false, message: err.message };
        }
      },
    },
    {
      name: 'Wallet Connection Check',
      test: async () => {
        try {
          const wc = await getWalletConnect();
          const connected = wc.isWalletConnected();
          return {
            pass: true,
            message: connected ? 'Wallet connected' : 'Wallet not connected (expected)',
          };
        } catch (err: any) {
          return { pass: false, message: err.message };
        }
      },
    },
    {
      name: 'Balance Retrieval',
      test: async () => {
        try {
          const wc = await getWalletConnect();
          const address = wc.getConnectedAddress();
          if (!address) {
            return { pass: true, message: 'No wallet connected (skipped)' };
          }
          const wallet = await getWallet();
          const balance = await wallet.getBalance(address, appConfig.asaId);
          return { pass: true, message: `Balance retrieved: ${JSON.stringify(balance)}` };
        } catch (err: any) {
          return { pass: false, message: err.message };
        }
      },
    },
    {
      name: 'Billing Module Access',
      test: async () => {
        try {
          const billing = await getBilling();
          return { pass: true, message: 'Billing module accessible' };
        } catch (err: any) {
          return { pass: false, message: err.message };
        }
      },
    },
    {
      name: 'Analytics Module Access',
      test: async () => {
        try {
          const analytics = await getAnalytics();
          return { pass: true, message: 'Analytics module accessible' };
        } catch (err: any) {
          return { pass: false, message: err.message };
        }
      },
    },
    {
      name: 'LocalStorage Access',
      test: async () => {
        try {
          localStorage.setItem('test_key', 'test_value');
          const value = localStorage.getItem('test_key');
          localStorage.removeItem('test_key');
          return {
            pass: value === 'test_value',
            message: value === 'test_value' ? 'LocalStorage accessible' : 'LocalStorage failed',
          };
        } catch (err: any) {
          return { pass: false, message: err.message };
        }
      },
    },
    {
      name: 'Config Access',
      test: async () => {
        try {
          const hasConfig = !!appConfig.network && !!appConfig.asaId;
          return {
            pass: hasConfig,
            message: hasConfig ? 'Config accessible' : 'Config missing',
          };
        } catch (err: any) {
          return { pass: false, message: err.message };
        }
      },
    },
  ];

  async function runTests() {
    setIsRunning(true);
    const results: TestResult[] = [];

    for (const testCase of testCases) {
      const startTime = Date.now();
      const result = await testCase.test();
      const duration = Date.now() - startTime;

      results.push({
        name: testCase.name,
        status: result.pass ? 'pass' : 'fail',
        message: result.message,
        duration,
      });

      setTests([...results]);
      // Small delay for UI update
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    setIsRunning(false);
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Integration Tests
        </h2>
        <button
          onClick={runTests}
          disabled={isRunning}
          className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
        >
          {isRunning ? 'Running...' : 'Run Tests'}
        </button>
      </div>

      <div className="space-y-2">
        {tests.length === 0 ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Click "Run Tests" to start integration testing
          </p>
        ) : (
          tests.map((test, index) => (
            <div
              key={index}
              className={`flex items-center justify-between rounded-lg border p-3 ${
                test.status === 'pass'
                  ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                  : test.status === 'fail'
                  ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                  : 'border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/50'
              }`}
            >
              <div className="flex-1">
                <div className="font-medium text-zinc-900 dark:text-zinc-100">{test.name}</div>
                {test.message && (
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">{test.message}</div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {test.duration && (
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {test.duration}ms
                  </span>
                )}
                <span className="text-lg">
                  {test.status === 'pass' ? '✅' : test.status === 'fail' ? '❌' : '⏳'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {tests.length > 0 && (
        <div className="mt-4 flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-800/50">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Summary:</span>
          <div className="flex gap-4 text-sm">
            <span className="text-green-600 dark:text-green-400">
              Pass: {tests.filter((t) => t.status === 'pass').length}
            </span>
            <span className="text-red-600 dark:text-red-400">
              Fail: {tests.filter((t) => t.status === 'fail').length}
            </span>
            <span className="text-zinc-600 dark:text-zinc-400">
              Total: {tests.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

