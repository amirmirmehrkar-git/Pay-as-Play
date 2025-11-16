'use client';

import { useState, useEffect } from 'react';
import { getBilling, getAnalytics, getWallet, getWalletConnect } from '@/lib/sdk';
import { appConfig } from '@/lib/config';
import Link from 'next/link';

interface UsageSummaryProps {
  sessionId: string;
  totalCharge: number;
  duration: number; // in seconds
  contentTitle: string;
}

export default function UsageSummary({
  sessionId,
  totalCharge,
  duration,
  contentTitle,
}: UsageSummaryProps) {
  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState(false);
  const [sessionDetails, setSessionDetails] = useState<any>(null);

  useEffect(() => {
    loadSessionDetails();
    updateBalance();
  }, [sessionId]);

  async function loadSessionDetails() {
    try {
      const b = await getBilling();
      const details = await b.getSession(sessionId);
      setSessionDetails(details);
    } catch (err) {
      console.error('Error loading session details:', err);
    }
  }

  async function updateBalance() {
    const wc = await getWalletConnect();
    const address = wc.getConnectedAddress();
    if (!address) return;

    try {
      const w = await getWallet();
      const bal = await w.getBalance(address, appConfig.asaId);
      setBalance(bal.formatted || '0');
    } catch (err) {
      console.error('Error updating balance:', err);
    }
  }

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} minute${mins !== 1 ? 's' : ''} ${secs} second${secs !== 1 ? 's' : ''}`;
  }

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Session Complete
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{contentTitle}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Duration</div>
          <div className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {formatTime(duration)}
          </div>
        </div>

        <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Total Charge</div>
          <div className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            €{totalCharge.toFixed(2)}
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Remaining Balance</div>
          <div className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {balance} PLY
          </div>
        </div>
      </div>

      {/* Session Details */}
      {sessionDetails && (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">
            Session Details
          </h3>
          <div className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <div>Session ID: {sessionId.slice(0, 8)}...</div>
            <div>Started: {new Date(sessionDetails.startTime).toLocaleString()}</div>
            {sessionDetails.endTime && (
              <div>Ended: {new Date(sessionDetails.endTime).toLocaleString()}</div>
            )}
            <div>Total Ticks: {sessionDetails.tickCount || 0}</div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <Link
          href="/"
          className="flex-1 rounded-lg bg-zinc-200 px-6 py-3 text-center font-medium text-zinc-900 transition-colors hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          Back to Home
        </Link>
        <button
          onClick={() => {
            // TODO: Implement add credit functionality
            alert('Add Credit functionality coming soon!');
          }}
          className="flex-1 rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600"
        >
          Add Credit
        </button>
      </div>
    </div>
  );
}

