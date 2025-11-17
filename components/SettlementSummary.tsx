'use client';

/**
 * Settlement Summary Component
 * Displays settlement summary information
 */

import { useState } from 'react';

interface SettlementSummaryProps {
  settlementId: string;
  settlementDate: string;
  settlementPeriod: {
    start: string;
    end: string;
  };
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod?: string | null;
  transactionCount: number;
  currency?: string;
}

export default function SettlementSummary({
  settlementId,
  settlementDate,
  settlementPeriod,
  amount,
  status,
  paymentMethod,
  transactionCount,
  currency = 'EUR',
}: SettlementSummaryProps) {
  const [copied, setCopied] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const formatDateTime = (dateString: string) => {
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

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(settlementId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getStatusBadge = () => {
    const styles = {
      completed: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
      pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
      failed: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
    };

    const icons = {
      completed: '✅',
      pending: '⏳',
      failed: '❌',
    };

    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${styles[status]}`}
      >
        <span>{icons[status]}</span>
        <span className="capitalize">{status}</span>
      </span>
    );
  };

  return (
    <div className="space-y-4 rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800 sm:p-8">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Settlement Summary</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Settlement ID */}
        <div className="rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
          <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">Settlement ID</div>
          <div className="flex items-center gap-2">
            <code className="flex-1 font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {settlementId}
            </code>
            <button
              onClick={handleCopyId}
              className="rounded-lg border-2 border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700 transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              title="Copy Settlement ID"
            >
              {copied ? '✓ Copied' : '📋 Copy'}
            </button>
          </div>
        </div>

        {/* Settlement Date */}
        <div className="rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
          <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">Settlement Date</div>
          <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{formatDateTime(settlementDate)}</div>
        </div>

        {/* Settlement Period */}
        <div className="rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
          <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">Settlement Period</div>
          <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {formatDate(settlementPeriod.start)} - {formatDate(settlementPeriod.end)}
          </div>
        </div>

        {/* Total Amount */}
        <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
          <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">Total Amount</div>
          <div className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{formatCurrency(amount)}</div>
        </div>

        {/* Status */}
        <div className="rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
          <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">Status</div>
          <div>{getStatusBadge()}</div>
        </div>

        {/* Payment Method */}
        {paymentMethod && (
          <div className="rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
            <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">Payment Method</div>
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{paymentMethod}</div>
          </div>
        )}

        {/* Transaction Count */}
        <div className="rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
          <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">Transaction Count</div>
          <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{transactionCount}</div>
        </div>
      </div>
    </div>
  );
}

