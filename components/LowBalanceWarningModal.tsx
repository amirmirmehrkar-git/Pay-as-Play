'use client';

import Link from 'next/link';
import { MouseEvent } from 'react';

interface LowBalanceWarningModalProps {
  isOpen: boolean;
  balance: number | null;
  currency: string;
  estimatedMinutesLeft: number | null;
  status: 'ok' | 'warning' | 'critical';
  onClose: () => void;
  onSnooze: (ms?: number) => void;
  onTopUp: () => void;
  onAutoTopUp: () => void;
  lastUpdated?: string | null;
}

export default function LowBalanceWarningModal({
  isOpen,
  balance,
  currency,
  estimatedMinutesLeft,
  status,
  onClose,
  onSnooze,
  onTopUp,
  onAutoTopUp,
  lastUpdated,
}: LowBalanceWarningModalProps) {
  const statusColor =
    status === 'critical'
      ? 'text-red-600 dark:text-red-300'
      : 'text-yellow-600 dark:text-yellow-300';

  const minutesLabel =
    estimatedMinutesLeft !== null
      ? estimatedMinutesLeft <= 0
        ? '< 1 minute'
        : `${estimatedMinutesLeft} minute${estimatedMinutesLeft === 1 ? '' : 's'}`
      : 'N/A';

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = () => onSnooze();
  const stopPropagation = (event: MouseEvent<HTMLDivElement>) => event.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-lg rounded-2xl border border-yellow-200 bg-white p-6 shadow-2xl dark:border-yellow-800 dark:bg-zinc-900"
        onClick={stopPropagation}
      >
        <div className="mb-4 flex items-start gap-3">
          <div className="text-3xl" aria-hidden>
            {status === 'critical' ? '⛔' : '⚠️'}
          </div>
          <div>
            <p className={`text-2xl font-bold ${statusColor}`}>
              {status === 'critical' ? 'Critical Balance Alert' : 'Low Balance Warning'}
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Your wallet balance is running low. Add funds to avoid interruptions.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-yellow-200/60 bg-yellow-50/60 p-4 dark:border-yellow-700 dark:bg-yellow-900/20">
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-zinc-500 dark:text-zinc-400">Current Balance</dt>
              <dd className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                {balance !== null ? `${currency} ${balance.toFixed(2)}` : '—'}
              </dd>
            </div>
            <div>
              <dt className="text-zinc-500 dark:text-zinc-400">Time Remaining</dt>
              <dd className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{minutesLabel}</dd>
            </div>
          </dl>
          {lastUpdated && (
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Updated {new Date(lastUpdated).toLocaleTimeString()}
            </p>
          )}
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => {
              onTopUp();
              onClose();
            }}
            className="w-full rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-3 text-center text-sm font-semibold text-white transition hover:from-yellow-600 hover:to-orange-600"
          >
            Top Up Now
          </button>
          <button
            onClick={() => onAutoTopUp()}
            className="w-full rounded-xl border-2 border-yellow-200 px-4 py-3 text-sm font-semibold text-yellow-700 transition hover:bg-yellow-50 dark:border-yellow-700 dark:text-yellow-300 dark:hover:bg-yellow-900/20"
          >
            Set Auto-top-up
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <button
            onClick={() => onSnooze()}
            className="flex-1 rounded-xl border border-transparent px-4 py-2 font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Continue Watching
          </button>
          <button
            onClick={() => onSnooze(10 * 60 * 1000)}
            className="rounded-xl border border-zinc-200 px-4 py-2 font-semibold text-zinc-500 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Remind me in 10 min
          </button>
          <Link
            href="/settings/notifications"
            className="rounded-xl border border-transparent px-4 py-2 font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            onClick={() => onSnooze()}
          >
            Notification settings
          </Link>
        </div>
      </div>
    </div>
  );
}

