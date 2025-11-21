'use client';

import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface LowBalanceBannerProps {
  balance: number | null;
  currency: string;
  estimatedMinutesLeft: number | null;
  status: 'ok' | 'warning' | 'critical';
  onTopUp: () => void;
  onDismiss: () => void;
}

export default function LowBalanceBanner({
  balance,
  currency,
  estimatedMinutesLeft,
  status,
  onTopUp,
  onDismiss,
}: LowBalanceBannerProps) {
  const statusClasses =
    status === 'critical'
      ? 'bg-red-50 border-red-300 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200'
      : 'bg-yellow-50 border-yellow-300 text-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200';

  const minutesLabel =
    estimatedMinutesLeft !== null
      ? estimatedMinutesLeft <= 0
        ? '< 1 min'
        : `${estimatedMinutesLeft} min`
      : '—';

  return (
    <div
      className={`flex flex-col gap-3 rounded-xl border px-4 py-3 text-sm md:flex-row md:items-center md:justify-between ${statusClasses}`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <InformationCircleIcon className="h-5 w-5 mt-0.5" aria-hidden />
        <div>
          <p className="font-semibold">{status === 'critical' ? 'Balance critically low' : 'Low balance warning'}</p>
          <p className="text-xs md:text-sm opacity-90">
            Balance: {balance !== null ? `${currency} ${balance.toFixed(2)}` : '—'} • Time left: {minutesLabel}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={onTopUp}
          className="rounded-lg bg-current/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-current transition hover:bg-current/20"
        >
          Top Up
        </button>
        <button
          onClick={onDismiss}
          aria-label="Dismiss low balance warning"
          className="rounded-full p-1 text-current/70 transition hover:text-current"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

