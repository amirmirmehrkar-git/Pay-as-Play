'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface WithdrawalDetails {
  withdrawalId: string;
  amount: number;
  fee: number;
  netAmount: number;
  method: 'bank_transfer' | 'paypal' | 'crypto';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string | null;
  estimatedProcessingTime: string;
  errorMessage?: string | null;
  details: any;
  transactionId?: string;
}

export default function WithdrawalDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const withdrawalId = params.withdrawalId as string;
  const [withdrawal, setWithdrawal] = useState<WithdrawalDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (withdrawalId) {
      loadWithdrawalDetails();
    }
  }, [withdrawalId]);

  async function loadWithdrawalDetails() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/wallet/withdraw/${withdrawalId}`);
      const result = await response.json();
      if (result.success) {
        setWithdrawal(result.data);
      } else {
        throw new Error(result.error?.message || 'Withdrawal not found');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load withdrawal details');
    } finally {
      setLoading(false);
    }
  }

  const getStatusClasses = (status: string) => {
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
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getMethodLabel = (method: string) => {
    switch (method) {
      case 'bank_transfer':
        return 'Bank Transfer (SEPA)';
      case 'paypal':
        return 'PayPal';
      case 'crypto':
        return 'Crypto Wallet (Algorand)';
      default:
        return method;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4 dark:from-zinc-900 dark:to-zinc-800">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="h-8 w-64 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-700 mb-8"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-700"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !withdrawal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4 dark:from-zinc-900 dark:to-zinc-800">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="rounded-xl border border-red-400 bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
            <p className="font-semibold">Error: {error || 'Withdrawal not found'}</p>
            <Link href="/wallet/withdraw/history" className="mt-2 inline-block text-sm underline">
              ← Back to History
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            <Link href="/wallet" className="hover:text-blue-600 dark:hover:text-blue-400">
              Wallet
            </Link>{' '}
            /{' '}
            <Link href="/wallet/withdraw/history" className="hover:text-blue-600 dark:hover:text-blue-400">
              Withdrawal History
            </Link>{' '}
            / <span className="text-zinc-900 dark:text-zinc-100">Details</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">Withdrawal Details</h1>
              <p className="text-zinc-600 dark:text-zinc-400">Withdrawal ID: {withdrawal.withdrawalId}</p>
            </div>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusClasses(
                withdrawal.status
              )}`}
            >
              {withdrawal.status}
            </span>
          </div>
        </div>

        {/* Summary Card */}
        <div className="mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-6 text-white shadow-lg">
          <div className="mb-2 text-sm opacity-90">Net Amount</div>
          <div className="text-4xl font-bold">{formatCurrency(withdrawal.netAmount)}</div>
          <div className="mt-2 text-sm opacity-90">
            Amount: {formatCurrency(withdrawal.amount)} | Fee: {formatCurrency(withdrawal.fee)}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div className="rounded-xl border-2 border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
            <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Transaction Information</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Withdrawal ID:</span>
                <span className="font-mono text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {withdrawal.withdrawalId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Method:</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{getMethodLabel(withdrawal.method)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Created:</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{formatDate(withdrawal.createdAt)}</span>
              </div>
              {withdrawal.completedAt && (
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">Completed:</span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {formatDate(withdrawal.completedAt)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Estimated Processing:</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                  {withdrawal.estimatedProcessingTime}
                </span>
              </div>
              {withdrawal.transactionId && (
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">Transaction ID:</span>
                  <span className="font-mono text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {withdrawal.transactionId}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Method Details */}
          <div className="rounded-xl border-2 border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
            <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Recipient Details</h2>
            <div className="space-y-3">
              {withdrawal.method === 'bank_transfer' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">IBAN:</span>
                    <span className="font-mono text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {withdrawal.details.iban || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">BIC:</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">
                      {withdrawal.details.bic || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Account Holder:</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">
                      {withdrawal.details.accountHolderName || 'N/A'}
                    </span>
                  </div>
                  {withdrawal.details.bankName && (
                    <div className="flex justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400">Bank Name:</span>
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">
                        {withdrawal.details.bankName}
                      </span>
                    </div>
                  )}
                </>
              )}
              {withdrawal.method === 'paypal' && (
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">PayPal Email:</span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {withdrawal.details.paypalEmail || 'N/A'}
                  </span>
                </div>
              )}
              {withdrawal.method === 'crypto' && (
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">Wallet Address:</span>
                  <span className="font-mono text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {withdrawal.details.walletAddress || 'N/A'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {withdrawal.status === 'failed' && withdrawal.errorMessage && (
            <div className="rounded-xl border border-red-400 bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
              <p className="font-semibold">Error:</p>
              <p className="mt-1">{withdrawal.errorMessage}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Link
              href="/wallet/withdraw/history"
              className="rounded-lg border-2 border-zinc-300 bg-white px-6 py-3 font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            >
              ← Back to History
            </Link>
            <Link
              href="/wallet/withdraw"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              New Withdrawal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

