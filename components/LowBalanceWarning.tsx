'use client';

import { useState, useEffect } from 'react';
import { getWallet, getWalletConnect } from '@/lib/sdk';
import { appConfig } from '@/lib/config';
import Link from 'next/link';

interface LowBalanceWarningProps {
  threshold?: number; // Minimum balance in PLY
  onTopUp?: () => void;
}

export default function LowBalanceWarning({
  threshold = 10, // Default: 10 PLY
  onTopUp,
}: LowBalanceWarningProps) {
  const [showWarning, setShowWarning] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Load threshold from localStorage if available
    const savedThreshold = localStorage.getItem('lowBalanceThreshold');
    const effectiveThreshold = savedThreshold ? parseFloat(savedThreshold) : threshold;

    async function check() {
      await checkBalance(effectiveThreshold);
    }

    check();
    // Check balance every 30 seconds
    const interval = setInterval(check, 30000);
    return () => clearInterval(interval);
  }, [threshold]);

  async function checkBalance(effectiveThreshold: number = threshold) {
    try {
      const wc = await getWalletConnect();
      if (!wc.isWalletConnected()) {
        setIsChecking(false);
        return;
      }

      const wallet = await getWallet();
      const address = wc.getConnectedAddress();
      if (!address) {
        setIsChecking(false);
        return;
      }

      const balanceData = await wallet.getBalance(address, appConfig.asaId);
      // Balance might be in different format, handle both
      const currentBalance = typeof balanceData === 'number' 
        ? balanceData 
        : balanceData?.balance || parseFloat(balanceData?.formatted || '0') || 0;
      setBalance(currentBalance);
      setShowWarning(currentBalance < effectiveThreshold);
      setIsChecking(false);
    } catch (err) {
      console.error('Error checking balance:', err);
      setIsChecking(false);
    }
  }

  if (!showWarning || isChecking || balance === null) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96">
      <div
        role="alert"
        className="rounded-lg border border-yellow-300 bg-yellow-50 p-4 shadow-lg dark:border-yellow-700 dark:bg-yellow-900/20"
      >
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="text-2xl">⚠️</div>
            <div>
              <h3 className="mb-1 font-semibold text-yellow-900 dark:text-yellow-100">
                Low Balance Warning
              </h3>
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Your balance is low: <strong>{balance.toFixed(2)} PLY</strong>
              </p>
              <p className="mt-1 text-xs text-yellow-700 dark:text-yellow-300">
                Top up now to avoid interruption
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowWarning(false)}
            aria-label="Close low balance warning"
            className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-200"
          >
            ✕
          </button>
        </div>
        <div className="flex gap-2">
          <Link
            href="/wallet"
            onClick={() => {
              setShowWarning(false);
              onTopUp?.();
            }}
            className="flex-1 rounded-lg bg-yellow-500 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-yellow-600"
          >
            Top Up Now
          </Link>
          <button
            onClick={() => setShowWarning(false)}
            className="rounded-lg border border-yellow-300 bg-white px-4 py-2 text-sm font-medium text-yellow-700 transition-colors hover:bg-yellow-50 dark:border-yellow-700 dark:bg-zinc-800 dark:text-yellow-300"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}

