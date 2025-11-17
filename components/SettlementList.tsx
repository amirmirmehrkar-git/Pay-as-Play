'use client';

/**
 * Settlement List Component
 * Displays settlements in table format (desktop) or cards (mobile)
 */

import { useState } from 'react';
import Link from 'next/link';

export type SettlementStatus = 'pending' | 'completed' | 'failed';
export type SortField = 'date' | 'amount' | 'status';

export interface Settlement {
  settlementId: string;
  settlementDate: string;
  amount: number;
  status: SettlementStatus;
  period: string;
  transactionCount: number;
  platformId?: string;
}

interface SettlementListProps {
  settlements: Settlement[];
  loading?: boolean;
  onSettlementClick: (settlement: Settlement) => void;
  sortBy?: SortField;
  onSortChange?: (field: SortField) => void;
  currency?: string;
}

export default function SettlementList({
  settlements,
  loading = false,
  onSettlementClick,
  sortBy: initialSortBy = 'date',
  onSortChange,
  currency = 'EUR',
}: SettlementListProps) {
  const [sortBy, setSortBy] = useState<SortField>(initialSortBy);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const getStatusBadge = (status: SettlementStatus) => {
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
        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
      >
        <span>{icons[status]}</span>
        <span className="capitalize">{status}</span>
      </span>
    );
  };

  const handleSort = (field: SortField) => {
    if (onSortChange) {
      if (sortBy === field) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortBy(field);
        setSortDirection('desc');
      }
      onSortChange(field);
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
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

  if (settlements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-zinc-200 bg-zinc-50 p-12 dark:border-zinc-700 dark:bg-zinc-800/50">
        <p className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">No settlements found</p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop Table View */}
      <div className="hidden overflow-x-auto rounded-xl border-2 border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800 sm:block">
        <table className="w-full">
          <thead className="bg-zinc-50 dark:bg-zinc-900">
            <tr>
              <th
                className="cursor-pointer px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center gap-2">
                  Date
                  <SortIcon field="date" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Settlement ID
              </th>
              <th
                className="cursor-pointer px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400"
                onClick={() => handleSort('amount')}
              >
                <div className="flex items-center gap-2">
                  Amount
                  <SortIcon field="amount" />
                </div>
              </th>
              <th
                className="cursor-pointer px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center gap-2">
                  Status
                  <SortIcon field="status" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">Period</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                Transactions
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-zinc-600 dark:text-zinc-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {settlements.map((settlement) => (
              <tr
                key={settlement.settlementId}
                className="hover:bg-zinc-50 dark:hover:bg-zinc-700/50"
              >
                <td className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100">
                  {formatDate(settlement.settlementDate)}
                </td>
                <td className="px-4 py-3">
                  <code className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
                    {settlement.settlementId}
                  </code>
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {formatCurrency(settlement.amount)}
                </td>
                <td className="px-4 py-3">{getStatusBadge(settlement.status)}</td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">{settlement.period}</td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">
                  {settlement.transactionCount}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => onSettlementClick(settlement)}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-4 sm:hidden">
        {settlements.map((settlement) => (
          <div
            key={settlement.settlementId}
            className="rounded-xl border-2 border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800"
          >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {formatCurrency(settlement.amount)}
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">{formatDate(settlement.settlementDate)}</p>
              </div>
              {getStatusBadge(settlement.status)}
            </div>
            <div className="mb-3 space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
              <p>
                <span className="font-semibold">ID:</span> {settlement.settlementId}
              </p>
              <p>
                <span className="font-semibold">Period:</span> {settlement.period}
              </p>
              <p>
                <span className="font-semibold">Transactions:</span> {settlement.transactionCount}
              </p>
            </div>
            <button
              onClick={() => onSettlementClick(settlement)}
              className="w-full rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-600"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

