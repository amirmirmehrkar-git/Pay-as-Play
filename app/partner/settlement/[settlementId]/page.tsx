'use client';

/**
 * Settlement Details Page
 * Displays detailed information about a specific settlement
 */

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import SettlementSummary from '@/components/SettlementSummary';
import SettlementTransactions, { Transaction } from '@/components/SettlementTransactions';
import SettlementFinancialSummary from '@/components/SettlementFinancialSummary';

interface SettlementDetailsData {
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
  currency: string;
  financialSummary: {
    totalRevenue: number;
    totalFees: number;
    netSettlementAmount: number;
    breakdownByType: Array<{
      type: string;
      revenue: number;
      fees: number;
      transactionCount: number;
    }>;
  };
  transactions: Transaction[];
  statusDetails: {
    expectedPaymentDate?: string | null;
    errorMessage?: string | null;
    transactionHash?: string | null;
  };
}

export default function SettlementDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const settlementId = params?.settlementId as string;

  const [data, setData] = useState<SettlementDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/partner/settlement/${settlementId}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Settlement not found');
        }
        throw new Error('Failed to fetch settlement details');
      }

      const result = await response.json();
      if (result.success && result.data) {
        setData(result.data);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load settlement details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (settlementId) {
      fetchData();
    }
  }, [settlementId]);

  const handleDownloadInvoice = async () => {
    setIsExporting(true);
    // TODO: Implement invoice download
    setTimeout(() => {
      setIsExporting(false);
      alert('Invoice download will be implemented');
    }, 1000);
  };

  const handleExportCSV = async () => {
    setIsExporting(true);
    if (!data) return;

    try {
      // Generate CSV
      const headers = ['Transaction ID', 'Date', 'User ID', 'Content', 'Duration (min)', 'Amount', 'Fee', 'Net Amount'];
      const rows = data.transactions.map((t) => [
        t.transactionId,
        new Date(t.date).toISOString(),
        t.userId,
        t.contentName,
        t.duration.toString(),
        t.amount.toString(),
        t.fee.toString(),
        t.netAmount.toString(),
      ]);

      const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `settlement-${data.settlementId}-transactions.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to export CSV:', err);
      alert('Failed to export CSV');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRetrySettlement = async () => {
    // TODO: Implement retry settlement
    alert('Retry settlement will be implemented');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-64 rounded bg-zinc-300 dark:bg-zinc-700"></div>
            <div className="h-64 rounded-xl bg-zinc-200 dark:bg-zinc-800"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-xl border-2 border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-red-700 dark:text-red-400">Error loading settlement</p>
                <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={fetchData}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-red-700"
                >
                  Retry
                </button>
                <Link
                  href="/partner/settlement/history"
                  className="rounded-lg border-2 border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  Back to History
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          {/* Breadcrumb */}
          <nav className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            <Link href="/partner" className="hover:text-blue-600 dark:hover:text-blue-400">
              Partner
            </Link>
            <span className="mx-2">/</span>
            <Link href="/partner/settlement" className="hover:text-blue-600 dark:hover:text-blue-400">
              Settlement
            </Link>
            <span className="mx-2">/</span>
            <Link href="/partner/settlement/history" className="hover:text-blue-600 dark:hover:text-blue-400">
              History
            </Link>
            <span className="mx-2">/</span>
            <span className="text-zinc-900 dark:text-zinc-100">Details</span>
          </nav>

          <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">Settlement Details</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Detailed breakdown of settlement transactions and financials</p>
        </div>

        {/* Settlement Summary */}
        <div className="mb-6">
          <SettlementSummary
            settlementId={data.settlementId}
            settlementDate={data.settlementDate}
            settlementPeriod={data.settlementPeriod}
            amount={data.amount}
            status={data.status}
            paymentMethod={data.paymentMethod}
            transactionCount={data.transactionCount}
            currency={data.currency}
          />
        </div>

        {/* Status-Specific Information */}
        {data.status === 'pending' && data.statusDetails.expectedPaymentDate && (
          <div className="mb-6 rounded-xl border-2 border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⏳</span>
              <div>
                <p className="font-semibold text-yellow-700 dark:text-yellow-400">Payment Pending</p>
                <p className="text-sm text-yellow-600 dark:text-yellow-300">
                  Expected payment date:{' '}
                  {new Date(data.statusDetails.expectedPaymentDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        )}

        {data.status === 'failed' && data.statusDetails.errorMessage && (
          <div className="mb-6 rounded-xl border-2 border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <p className="font-semibold text-red-700 dark:text-red-400">Settlement Failed</p>
                  <p className="text-sm text-red-600 dark:text-red-300">{data.statusDetails.errorMessage}</p>
                </div>
              </div>
              <button
                onClick={handleRetrySettlement}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-red-700"
              >
                Retry Settlement
              </button>
            </div>
          </div>
        )}

        {data.status === 'completed' && data.statusDetails.transactionHash && (
          <div className="mb-6 rounded-xl border-2 border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-semibold text-green-700 dark:text-green-400">Payment Confirmed</p>
                <p className="text-sm text-green-600 dark:text-green-300">
                  Transaction Hash: <code className="font-mono">{data.statusDetails.transactionHash}</code>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Financial Summary */}
        <div className="mb-6">
          <SettlementFinancialSummary summary={data.financialSummary} currency={data.currency} />
        </div>

        {/* Transaction Breakdown */}
        <div className="mb-6">
          <SettlementTransactions transactions={data.transactions} currency={data.currency} />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleDownloadInvoice}
            disabled={isExporting}
            className="rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-600 disabled:opacity-50"
          >
            {isExporting ? 'Downloading...' : '📄 Download Invoice'}
          </button>
          <button
            onClick={handleExportCSV}
            disabled={isExporting}
            className="rounded-xl border-2 border-zinc-200 bg-white px-6 py-3 font-semibold text-zinc-700 transition-all hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {isExporting ? 'Exporting...' : '📊 Export CSV'}
          </button>
          <button
            onClick={handlePrint}
            className="rounded-xl border-2 border-zinc-200 bg-white px-6 py-3 font-semibold text-zinc-700 transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          >
            🖨️ Print
          </button>
          <Link
            href="/partner/settlement/history"
            className="rounded-xl border-2 border-zinc-200 bg-white px-6 py-3 font-semibold text-zinc-700 transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          >
            ← Back to History
          </Link>
        </div>
      </div>
    </div>
  );
}

