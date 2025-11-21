'use client';

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

type WarningStatus = 'ok' | 'warning' | 'critical';
type ThresholdType = 'currency' | 'minutes';

interface NotificationSettings {
  lowBalanceWarnings: boolean;
  thresholdType: ThresholdType;
  thresholdValue: number;
  notifyInApp: boolean;
  notifyEmail: boolean;
  notifyPush: boolean;
  notificationEmail: string;
  autoTopUpEnabled: boolean;
  autoTopUpAmount: number;
  autoTopUpMethod: 'card' | 'wallet';
}

interface BalanceData {
  balance: number;
  currency: string;
  averageMinuteCost: number;
  estimatedMinutesLeft: number;
  lastUpdated: string;
  recommendedTopUp: number;
  status: WarningStatus;
}

interface DismissOptions {
  snoozeMs?: number;
}

interface LowBalanceContextValue {
  balance: number | null;
  currency: string;
  estimatedMinutesLeft: number | null;
  lastUpdated: string | null;
  status: WarningStatus;
  loading: boolean;
  error: string | null;
  warningEnabled: boolean;
  thresholdType: ThresholdType;
  thresholdValue: number;
  showModal: boolean;
  showBanner: boolean;
  openModal: () => void;
  dismissModal: (options?: DismissOptions) => void;
  dismissBanner: (options?: DismissOptions) => void;
  refreshBalance: () => Promise<void>;
  refreshSettings: () => Promise<void>;
  preferences: NotificationSettings | null;
}

const LowBalanceWarningContext = createContext<LowBalanceContextValue | null>(null);

const DEFAULT_POLL_INTERVAL = 30000;
const DEFAULT_SNOOZE = 5 * 60 * 1000;
const EMAIL_COOLDOWN = 15 * 60 * 1000;

export function LowBalanceWarningProvider({ children }: { children: React.ReactNode }) {
  const value = useProvideLowBalanceWarning();
  return (
    <LowBalanceWarningContext.Provider value={value}>
      {children}
    </LowBalanceWarningContext.Provider>
  );
}

export function useLowBalanceWarning() {
  const context = useContext(LowBalanceWarningContext);
  if (!context) {
    throw new Error('useLowBalanceWarning must be used within LowBalanceWarningProvider');
  }
  return context;
}

function useProvideLowBalanceWarning(): LowBalanceContextValue {
  const [balanceData, setBalanceData] = useState<BalanceData | null>(null);
  const [preferences, setPreferences] = useState<NotificationSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const snoozeRef = useRef<number | null>(null);
  const emailCooldownRef = useRef<number | null>(null);

  const warningEnabled = preferences?.lowBalanceWarnings ?? true;
  const thresholdType = preferences?.thresholdType ?? 'currency';
  const thresholdValue = preferences?.thresholdValue ?? 10;

  const fetchPreferences = async () => {
    try {
      const res = await fetch('/api/notifications/settings');
      if (!res.ok) {
        throw new Error('Failed to load notification settings');
      }
      const result = await res.json();
      setPreferences(result.data);
    } catch (err: any) {
      console.error('[LowBalance] settings error', err);
      setError(err.message || 'Failed to load notification settings');
    }
  };

  const fetchBalance = async () => {
    try {
      setError(null);
      const res = await fetch('/api/wallet/balance');
      if (!res.ok) {
        throw new Error('Failed to fetch balance');
      }
      const result = await res.json();
      setBalanceData(result.data);
    } catch (err: any) {
      console.error('[LowBalance] balance error', err);
      setError(err.message || 'Failed to fetch wallet balance');
    } finally {
      setLoading(false);
    }
  };

  const refreshBalance = async () => {
    await fetchBalance();
  };

  const refreshSettings = async () => {
    await fetchPreferences();
  };

  useEffect(() => {
    fetchPreferences();
    fetchBalance();

    pollRef.current = setInterval(fetchBalance, DEFAULT_POLL_INTERVAL);
    const handler = () => {
      fetchPreferences();
    };
    window.addEventListener('lowBalance:settings-updated', handler);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      window.removeEventListener('lowBalance:settings-updated', handler);
    };
  }, []);

  const isLowBalance = useMemo(() => {
    if (!warningEnabled || !balanceData) return false;
    if (thresholdType === 'currency') {
      return balanceData.balance <= thresholdValue;
    }
    return (balanceData.estimatedMinutesLeft ?? 0) <= thresholdValue;
  }, [warningEnabled, thresholdType, thresholdValue, balanceData]);

  const isCritical = useMemo(() => {
    if (!balanceData) return false;
    return balanceData.balance <= 2 || (balanceData.estimatedMinutesLeft ?? 0) <= 2;
  }, [balanceData]);

  useEffect(() => {
    if (!warningEnabled) {
      setShowModal(false);
      setShowBanner(false);
      return;
    }

    if (!isLowBalance) {
      setShowModal(false);
      setShowBanner(false);
      return;
    }

    const snoozed = snoozeRef.current && snoozeRef.current > Date.now();
    if (snoozed) {
      setShowModal(false);
      setShowBanner(false);
      return;
    }

    setShowBanner(true);
    if (preferences?.notifyInApp !== false) {
      setShowModal(true);
    }
  }, [isLowBalance, warningEnabled, preferences]);

  const dismiss = (setter: (value: boolean) => void, options?: DismissOptions) => {
    setter(false);
    const snoozeMs = options?.snoozeMs ?? DEFAULT_SNOOZE;
    snoozeRef.current = Date.now() + snoozeMs;
  };

  const sendEmailNotification = async () => {
    if (!preferences?.notifyEmail || !preferences.notificationEmail || !balanceData) return;

    const now = Date.now();
    if (emailCooldownRef.current && now - emailCooldownRef.current < EMAIL_COOLDOWN) {
      return;
    }

    try {
      await fetch('/api/notifications/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          balance: balanceData.balance,
          currency: balanceData.currency,
          estimatedMinutesLeft: balanceData.estimatedMinutesLeft,
          notificationEmail: preferences.notificationEmail,
          status: balanceData.status === 'critical' ? 'critical' : 'warning',
        }),
      });
      emailCooldownRef.current = now;
    } catch (err) {
      console.error('[LowBalance] email notification failed', err);
    }
  };

  useEffect(() => {
    if (!preferences?.notifyEmail || !isLowBalance) {
      return;
    }
    sendEmailNotification();
  }, [
    isLowBalance,
    preferences?.notifyEmail,
    preferences?.notificationEmail,
    balanceData?.balance,
    balanceData?.estimatedMinutesLeft,
  ]);

  const value: LowBalanceContextValue = {
    balance: balanceData?.balance ?? null,
    currency: balanceData?.currency ?? 'EUR',
    estimatedMinutesLeft: balanceData?.estimatedMinutesLeft ?? null,
    lastUpdated: balanceData?.lastUpdated ?? null,
    status: balanceData?.status ?? 'ok',
    loading,
    error,
    warningEnabled,
    thresholdType,
    thresholdValue,
    showModal,
    showBanner,
    openModal: () => setShowModal(true),
    dismissModal: (options) => dismiss(setShowModal, options),
    dismissBanner: (options) => dismiss(setShowBanner, options),
    refreshBalance,
    refreshSettings,
    preferences,
  };

  return value;
}

