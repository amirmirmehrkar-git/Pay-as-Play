'use client';

import IntegrationTest from '@/components/IntegrationTest';
import PerformanceMonitor from '@/components/PerformanceMonitor';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Testing Dashboard
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Integration and performance testing tools
          </p>
        </div>

        <div className="space-y-6">
          <IntegrationTest />
        </div>

        <PerformanceMonitor />
      </div>
    </div>
  );
}

