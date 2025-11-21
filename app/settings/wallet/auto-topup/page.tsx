'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import AutoTopupPaymentMethod, {
  PaymentMethodDetails,
  PaymentMethodType,
} from '@/components/AutoTopupPaymentMethod';
import AutoTopupHistory, { AutoTopupHistoryItem } from '@/components/AutoTopupHistory';
import TwoFactorModal from '@/components/TwoFactorModal';

interface AutoTopupSettings {
  enabled: boolean;
  amount: number;
  threshold: number;
  paymentMethodType: PaymentMethodType;
  paymentMethod: PaymentMethodDetails;
  notifyBefore: boolean;
  notifyAfter: boolean;
  notifyEmail: boolean;
  notifyInApp: boolean;
  lastTopupDate: string | null;
  nextTriggerEstimate: string | null;
}

const amountPresets = [10, 20, 50, 100];
const thresholdPresets = [2, 5, 10];
const AVG_RATE_PER_MINUTE = 0.45;

export default function AutoTopupSettingsPage() {
  const [settings, setSettings] = useState<AutoTopupSettings | null>(null);
  const [history, setHistory] = useState<AutoTopupHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [twoFactorOpen, setTwoFactorOpen] = useState(false);
  const [pendingToggle, setPendingToggle] = useState<boolean | null>(null);
  const [autoProcessing, setAutoProcessing] = useState(false);

  const thresholdError =
    settings && settings.threshold >= settings.amount
      ? 'Trigger threshold must be lower than the top-up amount.'
      : null;

  const estimatedMinutes = useMemo(() => {
    if (!settings) return null;
    return Math.max(1, Math.round(settings.amount / AVG_RATE_PER_MINUTE));
  }, [settings?.amount]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const [settingsRes, historyRes] = await Promise.all([
        fetch('/api/wallet/auto-topup/settings'),
        fetch('/api/wallet/auto-topup/history'),
      ]);
      if (!settingsRes.ok) throw new Error('Failed to load settings');
      if (!historyRes.ok) throw new Error('Failed to load history');

      const settingsJson = await settingsRes.json();
      const historyJson = await historyRes.json();
      setSettings(settingsJson.data);
      setHistory(historyJson.data);
    } catch (err: any) {
      setError(err.message || 'Failed to load auto-top-up data');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!settings) return;
    if (thresholdError) {
      setError(thresholdError);
      return;
    }
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch('/api/wallet/auto-topup/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error('Failed to save auto-top-up settings');
      await res.json();
      setMessage('Auto-top-up settings updated');
    } catch (err: any) {
      setError(err.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  }

  const finalizeToggle = async (enabled: boolean) => {
    if (!settings) return;
    try {
      const res = await fetch('/api/wallet/auto-topup/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...settings, enabled }),
      });
      if (!res.ok) throw new Error('Failed to update auto-top-up state');
      const result = await res.json();
      setSettings(result.data);
      setMessage(enabled ? 'Auto-top-up enabled' : 'Auto-top-up disabled');
    } catch (err: any) {
      setError(err.message || 'Unable to update auto-top-up state');
    }
  };

  const handleToggle = (enabled: boolean) => {
    if (!settings) return;
    if (enabled) {
      setPendingToggle(true);
      setTwoFactorOpen(true);
    } else {
      if (window.confirm('Disable automatic top-ups?')) {
        finalizeToggle(false);
      }
    }
  };

  const handleTwoFactorVerify = (code: string) => {
    if (code !== '123456') {
      throw new Error('Invalid verification code');
    }
    setTwoFactorOpen(false);
    setPendingToggle(null);
    finalizeToggle(true);
  };

  async function simulateAutoTopup() {
    setAutoProcessing(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch('/api/wallet/auto-topup/process', { method: 'POST' });
      if (!res.ok) throw new Error('Failed to run auto-top-up simulation');
      await res.json();
      await loadData();
      setMessage('Auto-top-up triggered successfully');
    } catch (err: any) {
      setError(err.message || 'Simulation failed');
    } finally {
      setAutoProcessing(false);
    }
  }

  if (loading || !settings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
        <div className="container mx-auto px-4 py-8">
          <div className="h-8 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-6 space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="h-40 animate-pulse rounded-2xl bg-white/60 dark:bg-zinc-800/60" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          <Link href="/settings" className="hover:text-blue-600">
            Settings
          </Link>{' '}
          /{' '}
          <Link href="/settings/wallet" className="hover:text-blue-600">
            Wallet
          </Link>{' '}
          / <span className="text-zinc-900 dark:text-zinc-100">Auto-top-up</span>
        </nav>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Auto-top-up Settings</h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Keep your wallet topped up automatically so playback never stops.
            </p>
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium dark:border-zinc-700 dark:bg-zinc-900">
            <span className="text-zinc-600 dark:text-zinc-300">{settings.enabled ? 'Enabled' : 'Disabled'}</span>
            <input
              type="checkbox"
              checked={settings.enabled}
              onChange={(e) => handleToggle(e.target.checked)}
              className="peer sr-only"
            />
            <span className="h-6 w-11 rounded-full bg-zinc-300 transition peer-checked:bg-blue-500">
              <span className="ml-1 mt-1 block h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5" />
            </span>
          </label>
        </div>

        {message && (
          <div className="mb-4 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-200">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <section className="rounded-2xl border-2 border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Top-up Amount</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Choose how much to add each time auto-top-up runs.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {amountPresets.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setSettings({ ...settings, amount })}
                  className={`rounded-2xl border px-4 py-2 text-sm font-semibold ${
                    settings.amount === amount
                      ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-300'
                      : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                  }`}
                >
                  €{amount}
                </button>
              ))}
              <input
                type="number"
                min={5}
                max={1000}
                value={settings.amount}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    amount: Math.min(1000, Math.max(5, Number(e.target.value) || 5)),
                  })
                }
                className="w-32 rounded-2xl border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>
            {estimatedMinutes && (
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                ≈ {estimatedMinutes} minutes of HD content at average rate €{AVG_RATE_PER_MINUTE.toFixed(2)}/min
              </p>
            )}
          </section>

          <section className="rounded-2xl border-2 border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Trigger Threshold</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Auto-top-up will trigger when your balance falls below this value.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {thresholdPresets.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSettings({ ...settings, threshold: value })}
                  className={`rounded-2xl border px-4 py-2 text-sm font-semibold ${
                    settings.threshold === value
                      ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-300'
                      : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                  }`}
                >
                  €{value}
                </button>
              ))}
              <input
                type="number"
                min={1}
                value={settings.threshold}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    threshold: Math.max(1, Number(e.target.value) || 1),
                  })
                }
                className="w-32 rounded-2xl border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Tip: Keep this value lower than your top-up amount for optimal coverage.
            </p>
            {thresholdError && <p className="mt-2 text-xs text-red-500 dark:text-red-400">{thresholdError}</p>}
          </section>

          <section className="rounded-2xl border-2 border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Payment Method</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Choose which saved payment method to use for auto-top-up.
            </p>
            <div className="mt-4">
              <AutoTopupPaymentMethod
                selected={settings.paymentMethodType}
                details={settings.paymentMethod}
                onSelect={(type) =>
                  setSettings({
                    ...settings,
                    paymentMethodType: type,
                    paymentMethod:
                      type === 'card'
                        ? { type, label: 'Visa •••• 4242', masked: '**** **** **** 4242', expiresAt: '02/27' }
                        : type === 'paypal'
                          ? { type, label: 'PayPal', masked: 'user@example.com' }
                          : type === 'bank'
                            ? { type, label: 'SEPA Bank', masked: 'DE••••13000' }
                            : { type, label: 'Algorand Wallet', masked: 'ADDR •••• 9XYZ' }
                  })
                }
                onManage={() => alert('Payment method management coming soon')}
              />
            </div>
          </section>

          <section className="rounded-2xl border-2 border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Notifications</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              {[
                { key: 'notifyBefore', label: 'Notify me before auto-top-up runs' },
                { key: 'notifyAfter', label: 'Notify me after auto-top-up completes' },
                { key: 'notifyEmail', label: 'Email notifications' },
                { key: 'notifyInApp', label: 'In-app notifications' },
              ].map((item) => (
                <label key={item.key} className="flex items-center gap-3 rounded-2xl border border-zinc-200 p-3 dark:border-zinc-700">
                  <input
                    type="checkbox"
                    checked={(settings as any)[item.key]}
                    onChange={(e) => setSettings({ ...settings, [item.key]: e.target.checked } as AutoTopupSettings)}
                  />
                  <span className="text-sm text-zinc-700 dark:text-zinc-200">{item.label}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border-2 border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Auto-top-up History</h2>
              <Link
                href="/partner/settlement/history"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                View all →
              </Link>
            </div>
            <AutoTopupHistory history={history} />
            <button
              onClick={simulateAutoTopup}
              disabled={!settings.enabled || autoProcessing}
              className="mt-4 rounded-xl border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              {autoProcessing ? 'Simulating...' : 'Run Test Auto-top-up'}
            </button>
          </section>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-xl bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            onClick={loadData}
            className="rounded-xl border border-zinc-300 px-8 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Reset
          </button>
          <div className="ml-auto flex items-center gap-2 rounded-xl border border-zinc-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
            🔐 Your payment information is encrypted (PCI-DSS compliant)
          </div>
        </div>

        <TwoFactorModal
          isOpen={twoFactorOpen}
          onVerify={(code) => handleTwoFactorVerify(code)}
          onClose={() => {
            setTwoFactorOpen(false);
            setPendingToggle(null);
          }}
          channel="sms"
          destination="+44 ••• •• 5123"
        />
      </div>
    </div>
  );
}

