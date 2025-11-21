'use client';

import { useState } from 'react';
import Link from 'next/link';

export type WithdrawalStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface WithdrawalHistoryItem {
  withdrawalId: string;
  amount: number;
  fee: number;
  netAmount: number;
  method: 'bank_transfer' | 'paypal' | 'crypto';
  status: WithdrawalStatus;
  createdAt: string;
  completedAt?: string | null;
  estimatedProcessingTime: string;
  errorMessage?: string | null;
  details?: any;
}

interface WithdrawalHistoryProps {
  history: WithdrawalHistoryItem[];
  loading?: boolean;
  error?: string | null;
}

export default function WithdrawalHistory({ history, loading = false, error = null }: WithdrawalHistoryProps) {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterMethod, setFilterMethod] = useState<string>('all');

  const getStatusClasses = (status: WithdrawalStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getMethodLabel = (method: string) => {
    switch (method) {
      case 'bank_transfer':
        return 'Bank Transfer';
      case 'paypal':
        return 'PayPal';
      case 'crypto':
        return 'Crypto';
      default:
        return method;
    }
  };

  const filteredHistory = history.filter((item) => {
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    if (filterMethod !== 'all' && item.method !== filterMethod) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-700"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-400 bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
        <p className="font-semibold">Error: {error}</p>
        <button onClick={() => window.location.reload()} className="mt-2 text-sm underline">
          Retry
        </button>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="rounded-xl border-2 border-zinc-200 bg-white p-8 text-center text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
        <p className="text-lg font-semibold">No withdrawal history found</p>
        <p className="mt-2 text-sm">Your withdrawal requests will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-lg border-2 border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
        <select
          value={filterMethod}
          onChange={(e) => setFilterMethod(e.target.value)}
          className="rounded-lg border-2 border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
        >
          <option value="all">All Methods</option>
          <option value="bank_transfer">Bank Transfer</option>
          <option value="paypal">PayPal</option>
          <option value="crypto">Crypto</option>
        </select>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border-2 border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
          <thead className="bg-zinc-50 dark:bg-zinc-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Net Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Method
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {filteredHistory.map((item) => (
              <tr key={item.withdrawalId} className="hover:bg-zinc-50 dark:hover:bg-zinc-800">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {formatDate(item.createdAt)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                  {formatCurrency(item.amount)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {formatCurrency(item.netAmount)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                  {getMethodLabel(item.method)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusClasses(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <Link
                    href={`/wallet/withdraw/${item.withdrawalId}`}
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredHistory.map((item) => (
          <div
            key={item.withdrawalId}
            className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusClasses(
                  item.status
                )}`}
              >
                {item.status}
              </span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">{formatDate(item.createdAt)}</span>
            </div>
            <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">
              {formatCurrency(item.netAmount)}
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
              Amount: {formatCurrency(item.amount)} | Fee: {formatCurrency(item.fee)} | Method: {getMethodLabel(item.method)}
            </div>
            <Link
              href={`/wallet/withdraw/${item.withdrawalId}`}
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

