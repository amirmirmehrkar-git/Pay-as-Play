'use client';

/**
 * Step 2 of Integration Wizard: SDK Installation
 * Displays SDK installation instructions with package manager options
 */

import { useState } from 'react';
import CodeSnippet from './CodeSnippet';

const packageManagers = [
  { id: 'npm', name: 'npm', command: 'npm install playandpay-sdk' },
  { id: 'yarn', name: 'yarn', command: 'yarn add playandpay-sdk' },
  { id: 'pnpm', name: 'pnpm', command: 'pnpm add playandpay-sdk' },
] as const;

const SDK_VERSION = '1.2.3'; // TODO: Fetch from package.json or API
const SDK_DOCS_URL = 'https://docs.playandpay.io';
const SDK_CHANGELOG_URL = 'https://docs.playandpay.io/changelog';

export default function WizardStep2() {
  const [activePackageManager, setActivePackageManager] = useState<'npm' | 'yarn' | 'pnpm'>('npm');
  const [showToast, setShowToast] = useState(false);

  const activeCommand = packageManagers.find((pm) => pm.id === activePackageManager)?.command || '';

  const handleCopy = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Package Manager Tabs */}
      <div>
        <label className="mb-4 block text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Choose Package Manager
        </label>
        <div className="flex gap-2">
          {packageManagers.map((pm) => {
            const isActive = activePackageManager === pm.id;
            return (
              <button
                key={pm.id}
                type="button"
                onClick={() => setActivePackageManager(pm.id)}
                className={`rounded-xl border-2 px-4 py-2 font-semibold transition-all ${
                  isActive
                    ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600'
                }`}
                aria-pressed={isActive}
                aria-label={`Select ${pm.name} package manager`}
              >
                {pm.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Code Snippet */}
      <div>
        <label className="mb-2 block text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Installation Command
        </label>
        <CodeSnippet code={activeCommand} language="bash" onCopy={handleCopy} />
      </div>

      {/* SDK Information Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* SDK Version */}
        <div className="rounded-xl border-2 border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
          <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">SDK Version</div>
          <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100">v{SDK_VERSION}</div>
        </div>

        {/* Documentation Link */}
        <div className="rounded-xl border-2 border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
          <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">Documentation</div>
          <a
            href={SDK_DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            View Docs →
          </a>
        </div>

        {/* Changelog Link */}
        <div className="rounded-xl border-2 border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
          <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">Changelog</div>
          <a
            href={SDK_CHANGELOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            View Changelog →
          </a>
        </div>
      </div>

      {/* System Requirements */}
      <div className="rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
        <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">System Requirements</h3>
        <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          <li className="flex items-center gap-2">
            <span>✓</span>
            <span>Node.js 18+</span>
          </li>
          <li className="flex items-center gap-2">
            <span>✓</span>
            <span>Modern browsers (Chrome, Firefox, Safari, Edge)</span>
          </li>
          <li className="flex items-center gap-2">
            <span>✓</span>
            <span>Framework: React, Vue, or Vanilla JS</span>
          </li>
        </ul>
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

