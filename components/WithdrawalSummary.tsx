'use client';

import { WithdrawalMethod } from './WithdrawalMethodSelector';

interface WithdrawalSummaryProps {
  amount: number;
  method: WithdrawalMethod | null;
  fee: number;
  netAmount: number;
  estimatedProcessingTime: string;
}

export default function WithdrawalSummary({
  amount,
  method,
  fee,
  netAmount,
  estimatedProcessingTime,
}: WithdrawalSummaryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  };

  const getMethodLabel = (method: WithdrawalMethod | null) => {
    switch (method) {
      case 'bank_transfer':
        return 'Bank Transfer (SEPA)';
      case 'paypal':
        return 'PayPal';
      case 'crypto':
        return 'Crypto Wallet (Algorand)';
      default:
        return 'Not selected';
    }
  };

  return (
    <div className="rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
      <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Withdrawal Summary</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Withdrawal Amount</span>
          <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{formatCurrency(amount)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Processing Fee</span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">{formatCurrency(fee)}</span>
        </div>
        <div className="border-t border-zinc-200 pt-3 dark:border-zinc-700">
          <div className="flex items-center justify-between">
            <span className="font-medium text-zinc-900 dark:text-zinc-100">Net Amount</span>
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(netAmount)}</span>
          </div>
        </div>
        <div className="mt-4 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900">
          <div className="text-sm">
            <div className="mb-1 text-zinc-600 dark:text-zinc-400">Method: {getMethodLabel(method)}</div>
            <div className="text-zinc-600 dark:text-zinc-400">
              Estimated Processing Time: <span className="font-medium">{estimatedProcessingTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

