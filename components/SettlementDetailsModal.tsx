'use client';

/**
 * Settlement Details Modal Component
 * Displays detailed information about a settlement
 */

import { useState } from 'react';
import { Settlement } from './SettlementList';

interface SettlementDetailsModalProps {
  settlement: Settlement | null;
  isOpen: boolean;
  onClose: () => void;
  currency?: string;
}

export default function SettlementDetailsModal({
  settlement,
  isOpen,
  onClose,
  currency = 'EUR',
}: SettlementDetailsModalProps) {
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen || !settlement) return null;

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
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  const handleDownloadInvoice = async () => {
    setIsExporting(true);
    // TODO: Implement invoice download
    setTimeout(() => {
      setIsExporting(false);
      alert('Invoice download will be implemented');
    }, 1000);
  };

  const handleViewDetails = () => {
    if (settlement) {
      window.location.href = `/partner/settlement/${settlement.settlementId}`;
    }
  };

  const handleExportCSV = async () => {
    setIsExporting(true);
    if (!settlement) return;

    try {
      // Navigate to details page for full CSV export
      window.location.href = `/partner/settlement/${settlement.settlementId}`;
    } catch (err) {
      console.error('Failed to navigate:', err);
      setIsExporting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 dark:text-green-400';
      case 'pending':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'failed':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-zinc-600 dark:text-zinc-400';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="w-full max-w-3xl rounded-2xl border-2 border-zinc-200 bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-zinc-200 p-6 dark:border-zinc-700">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Settlement Details</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Settlement ID: {settlement.settlementId}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-600 transition-all hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto p-6">
          {/* Settlement Summary */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
              <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">Settlement Date</div>
              <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {formatDate(settlement.settlementDate)}
              </div>
            </div>
            <div className="rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
              <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">Amount</div>
              <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {formatCurrency(settlement.amount)}
              </div>
            </div>
            <div className="rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
              <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">Status</div>
              <div className={`text-lg font-semibold capitalize ${getStatusColor(settlement.status)}`}>
                {settlement.status}
              </div>
            </div>
            <div className="rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
              <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">Period</div>
              <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{settlement.period}</div>
            </div>
          </div>

          {/* Transaction Breakdown */}
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Transaction Summary</h3>
            <div className="rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">Total Transactions</span>
                <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {settlement.transactionCount}
                </span>
              </div>
            </div>
          </div>

          {/* View Full Details Button */}
          <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
            <p className="mb-2 text-sm text-blue-700 dark:text-blue-400">
              <strong>Note:</strong> This is a summary view. Click below to view full details with transaction breakdown.
            </p>
            <button
              onClick={handleViewDetails}
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700"
            >
              View Full Details →
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t-2 border-zinc-200 p-6 dark:border-zinc-700">
          <button
            onClick={onClose}
            className="rounded-xl border-2 border-zinc-200 bg-white px-6 py-3 font-semibold text-zinc-700 transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            Close
          </button>
          <div className="flex gap-3">
            <button
              onClick={handleExportCSV}
              disabled={isExporting}
              className="rounded-xl border-2 border-zinc-200 bg-white px-6 py-3 font-semibold text-zinc-700 transition-all hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              {isExporting ? 'Exporting...' : 'Export CSV'}
            </button>
            <button
              onClick={handleDownloadInvoice}
              disabled={isExporting}
              className="rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-600 disabled:opacity-50"
            >
              {isExporting ? 'Downloading...' : 'Download Invoice'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

