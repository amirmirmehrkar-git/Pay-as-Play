'use client';

import { ArrowPathIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export interface AutoTopupHistoryItem {
  id: string;
  date: string;
  amount: number;
  triggerBalance: number;
  status: 'success' | 'failed' | 'pending';
  paymentMethod: string;
}

interface AutoTopupHistoryProps {
  history: AutoTopupHistoryItem[];
}

const statusConfig = {
  success: {
    label: 'Success',
    icon: CheckCircleIcon,
    classes: 'text-green-600 dark:text-green-400',
  },
  failed: {
    label: 'Failed',
    icon: ExclamationTriangleIcon,
    classes: 'text-red-600 dark:text-red-400',
  },
  pending: {
    label: 'Pending',
    icon: ArrowPathIcon,
    classes: 'text-yellow-600 dark:text-yellow-400',
  },
};

export default function AutoTopupHistory({ history }: AutoTopupHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-zinc-200 p-6 text-center text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
        No auto-top-up transactions yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-zinc-200 dark:border-zinc-700">
      <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
        <thead className="bg-zinc-50 dark:bg-zinc-900">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Amount
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Triggered At
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Payment Method
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-zinc-900">
          {history.map((item) => {
            const statusInfo = statusConfig[item.status];
            const StatusIcon = statusInfo.icon;
            return (
              <tr key={item.id}>
                <td className="px-4 py-3 text-sm text-zinc-700 dark:text-zinc-200">
                  {new Date(item.date).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  €{item.amount.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-300">
                  €{item.triggerBalance.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-300">{item.paymentMethod}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`inline-flex items-center gap-1 font-semibold ${statusInfo.classes}`}>
                    <StatusIcon className="h-4 w-4" aria-hidden />
                    {statusInfo.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

