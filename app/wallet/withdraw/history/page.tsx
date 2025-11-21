'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import WithdrawalHistory, { WithdrawalHistoryItem } from '@/components/WithdrawalHistory';

export default function WithdrawalHistoryPage() {
  const [history, setHistory] = useState<WithdrawalHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/wallet/withdraw/history');
      const result = await response.json();
      if (result.success) {
        setHistory(result.data);
      } else {
        throw new Error(result.error?.message || 'Failed to load withdrawal history');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load withdrawal history');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            <Link href="/wallet" className="hover:text-blue-600 dark:hover:text-blue-400">
              Wallet
            </Link>{' '}
            /{' '}
            <Link href="/wallet/withdraw" className="hover:text-blue-600 dark:hover:text-blue-400">
              Withdraw
            </Link>{' '}
            / <span className="text-zinc-900 dark:text-zinc-100">History</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">Withdrawal History</h1>
              <p className="text-zinc-600 dark:text-zinc-400">View all your withdrawal requests</p>
            </div>
            <Link
              href="/wallet/withdraw"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              New Withdrawal
            </Link>
          </div>
        </div>

        <WithdrawalHistory history={history} loading={loading} error={error} />
      </div>
    </div>
  );
}

