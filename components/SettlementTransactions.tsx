'use client';

/**
 * Settlement Transactions Component
 * Displays transaction breakdown table
 */

import { useState } from 'react';

export interface Transaction {
  transactionId: string;
  date: string;
  userId: string;
  contentId: string;
  contentName: string;
  duration: number; // minutes
  amount: number;
  fee: number;
  netAmount: number;
  contentType: string;
}

interface SettlementTransactionsProps {
  transactions: Transaction[];
  currency?: string;
  loading?: boolean;
}

export default function SettlementTransactions({
  transactions,
  currency = 'EUR',
  loading = false,
}: SettlementTransactionsProps) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'duration'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDateTime = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  const maskUserId = (userId: string) => {
    if (userId.length <= 8) return '****';
    return `${userId.substring(0, 4)}****${userId.substring(userId.length - 4)}`;
  };

  // Filter and sort transactions
  const filteredTransactions = transactions
    .filter((t) => {
      if (!search) return true;
      const searchLower = search.toLowerCase();
      return (
        t.transactionId.toLowerCase().includes(searchLower) ||
        t.contentName.toLowerCase().includes(searchLower) ||
        t.contentId.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'date') {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === 'amount') {
        comparison = a.amount - b.amount;
      } else if (sortBy === 'duration') {
        comparison = a.duration - b.duration;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  const handleSort = (field: 'date' | 'amount' | 'duration') => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ field }: { field: 'date' | 'amount' | 'duration' }) => {
    if (sortBy !== field) return <span className="text-zinc-400">↕️</span>;
    return sortDirection === 'asc' ? <span>↑</span> : <span>↓</span>;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl border-2 border-zinc-200 bg-zinc-100 p-4 dark:border-zinc-700 dark:bg-zinc-800"
          >
            <div className="h-4 w-32 rounded bg-zinc-300 dark:bg-zinc-700"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Transaction Breakdown</h2>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search transactions..."
          className="rounded-lg border-2 border-zinc-200 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
        />
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-zinc-200 bg-zinc-50 p-12 dark:border-zinc-700 dark:bg-zinc-800/50">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">No transactions found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-50 dark:bg-zinc-900">
              <tr>
                <th
                  className="cursor-pointer px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center gap-2">
                    Date & Time
                    <SortIcon field="date" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                  Transaction ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">User ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">Content</th>
                <th
                  className="cursor-pointer px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400"
                  onClick={() => handleSort('duration')}
                >
                  <div className="flex items-center gap-2">
                    Duration
                    <SortIcon field="duration" />
                  </div>
                </th>
                <th
                  className="cursor-pointer px-4 py-3 text-right text-xs font-semibold text-zinc-600 dark:text-zinc-400"
                  onClick={() => handleSort('amount')}
                >
                  <div className="flex items-center justify-end gap-2">
                    Amount
                    <SortIcon field="amount" />
                  </div>
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-zinc-600 dark:text-zinc-400">Fee</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-zinc-600 dark:text-zinc-400">Net</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.transactionId} className="hover:bg-zinc-50 dark:hover:bg-zinc-700/50">
                  <td className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100">
                    {formatDateTime(transaction.date)}
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
                      {transaction.transactionId}
                    </code>
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">
                    {maskUserId(transaction.userId)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {transaction.contentName}
                    </div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-400">{transaction.contentId}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">
                    {transaction.duration} min
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-zinc-600 dark:text-zinc-400">
                    {formatCurrency(transaction.fee)}
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-green-600 dark:text-green-400">
                    {formatCurrency(transaction.netAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-sm text-zinc-600 dark:text-zinc-400">
        Showing {filteredTransactions.length} of {transactions.length} transactions
      </div>
    </div>
  );
}

