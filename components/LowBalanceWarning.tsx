'use client';

import { useRouter } from 'next/navigation';
import LowBalanceWarningModal from './LowBalanceWarningModal';
import { useLowBalanceWarning } from '@/hooks/useLowBalanceWarning';

export default function LowBalanceWarning() {
  const router = useRouter();
  const {
    showModal,
    balance,
    currency,
    estimatedMinutesLeft,
    status,
    lastUpdated,
    dismissModal,
    warningEnabled,
  } = useLowBalanceWarning();

  if (!warningEnabled) {
    return null;
  }

  return (
    <LowBalanceWarningModal
      isOpen={showModal}
      balance={balance}
      currency={currency}
      estimatedMinutesLeft={estimatedMinutesLeft}
      status={status}
      lastUpdated={lastUpdated}
      onClose={() => dismissModal()}
      onSnooze={(ms) => dismissModal({ snoozeMs: ms })}
      onTopUp={() => router.push('/wallet')}
      onAutoTopUp={() => router.push('/settings/notifications#auto-topup')}
    />
  );
}

