'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLowBalanceWarning } from '@/hooks/useLowBalanceWarning';

type NotificationTypeKey =
  | 'low_balance'
  | 'auto_topup'
  | 'payment'
  | 'session_end'
  | 'settlement'
  | 'system'
  | 'promotional';

interface ChannelPreferences {
  inApp: boolean;
  email: boolean;
  push: boolean;
}

interface NotificationTypePreferences {
  enabled: boolean;
  channels: ChannelPreferences;
}

interface NotificationSettings {
  lowBalanceWarnings: boolean;
  thresholdType: 'currency' | 'minutes';
  thresholdValue: number;
  notifyInApp: boolean;
  notifyEmail: boolean;
  notifyPush: boolean;
  notificationEmail: string;
  autoTopUpEnabled: boolean;
  autoTopUpAmount: number;
  autoTopUpMethod: 'card' | 'wallet';
  typePreferences: Record<NotificationTypeKey, NotificationTypePreferences>;
}

const notificationTypeConfig: {
  key: NotificationTypeKey;
  label: string;
  description: string;
  icon: string;
}[] = [
  { key: 'low_balance', label: 'Low Balance', description: 'Wallet balance warnings and recommendations', icon: '⚠️' },
  { key: 'auto_topup', label: 'Auto Top-up', description: 'Auto top-up execution and issues', icon: '🔁' },
  { key: 'payment', label: 'Payments', description: 'Content payments and charges', icon: '💳' },
  { key: 'session_end', label: 'Session', description: 'Session start/end summaries', icon: '📺' },
  { key: 'settlement', label: 'Settlement', description: 'Partner settlement status updates', icon: '💼' },
  { key: 'system', label: 'System', description: 'System notices & maintenance windows', icon: '⚙️' },
  { key: 'promotional', label: 'Promotional', description: 'Product tips and promotional messages', icon: '🎉' },
];

const defaultTypePreferences: Record<NotificationTypeKey, NotificationTypePreferences> = notificationTypeConfig.reduce(
  (acc, type) => {
    acc[type.key] = {
      enabled: type.key !== 'promotional',
      channels: {
        inApp: true,
        email: type.key !== 'session_end' && type.key !== 'system',
        push: type.key === 'payment',
      },
    };
    return acc;
  },
  {} as Record<NotificationTypeKey, NotificationTypePreferences>
);

const channelLabels: Record<keyof ChannelPreferences, string> = {
  inApp: 'In-app',
  email: 'Email',
  push: 'Push',
};

const normalizeTypePreferences = (
  prefs?: Record<NotificationTypeKey, NotificationTypePreferences>
): Record<NotificationTypeKey, NotificationTypePreferences> => {
  const normalized: Record<NotificationTypeKey, NotificationTypePreferences> = {} as Record<
    NotificationTypeKey,
    NotificationTypePreferences
  >;

  notificationTypeConfig.forEach((type) => {
    const existing = prefs?.[type.key];
    normalized[type.key] = {
      enabled: existing?.enabled ?? defaultTypePreferences[type.key].enabled,
      channels: {
        inApp: existing?.channels?.inApp ?? defaultTypePreferences[type.key].channels.inApp,
        email: existing?.channels?.email ?? defaultTypePreferences[type.key].channels.email,
        push: existing?.channels?.push ?? defaultTypePreferences[type.key].channels.push,
      },
    };
  });

  return normalized;
};

export default function NotificationSettingsPage() {
  const [settings, setSettings] = useState<NotificationSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { refreshSettings } = useLowBalanceWarning();

  useEffect(() => {
    loadSettings();
  }, []);

  const normalizeSettings = (data: NotificationSettings): NotificationSettings => ({
    ...data,
    typePreferences: normalizeTypePreferences(data.typePreferences),
  });

  const loadSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/notifications/settings');
      if (!res.ok) throw new Error('Failed to load settings');
      const result = await res.json();
      setSettings(normalizeSettings(result.data));
    } catch (err: any) {
      setError(err.message || 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch('/api/notifications/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error('Failed to save settings');
      const updated = await res.json();
      setSettings(normalizeSettings(updated.data));
      setMessage('Settings updated successfully');
      window.dispatchEvent(new Event('notifications:settings-updated'));
      window.dispatchEvent(new Event('lowBalance:settings-updated'));
      refreshSettings();
  const updateTypePreference = (
    key: NotificationTypeKey,
    updater: (prev: NotificationTypePreferences) => NotificationTypePreferences
  ) => {
    setSettings((prev) => {
      if (!prev) return prev;
      const existing = prev.typePreferences?.[key] ?? defaultTypePreferences[key];
      return {
        ...prev,
        typePreferences: {
          ...prev.typePreferences,
          [key]: updater(existing),
        },
      };
    });
  };

  const handleTypeEnabledChange = (key: NotificationTypeKey, enabled: boolean) => {
    updateTypePreference(key, (pref) => ({
      ...pref,
      enabled,
    }));
  };

  const handleChannelChange = (
    key: NotificationTypeKey,
    channel: keyof ChannelPreferences,
    value: boolean
  ) => {
    updateTypePreference(key, (pref) => ({
      ...pref,
      channels: {
        ...pref.channels,
        [channel]: value,
      },
    }));
  };
    } catch (err: any) {
      setError(err.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
        <div className="container mx-auto px-4 py-8">
          <div className="h-10 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-6 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-2xl bg-white/60 dark:bg-zinc-800/60" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-2xl border border-red-300 bg-red-50 p-6 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200">
            {error || 'Unable to load notification settings.'}
            <button onClick={loadSettings} className="ml-4 underline">
              Retry
            </button>
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
          / <span className="text-zinc-900 dark:text-zinc-100">Notifications</span>
        </nav>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Notification Settings</h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Control low balance warnings, email alerts, and auto top-up reminders.
          </p>
        </div>

        {message && (
          <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-200">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <section className="rounded-2xl border-2 border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Low Balance Warnings</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Receive alerts when your wallet balance gets close to zero.
                </p>
              </div>
              <label className="inline-flex cursor-pointer items-center gap-2">
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                  {settings.lowBalanceWarnings ? 'Enabled' : 'Disabled'}
                </span>
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={settings.lowBalanceWarnings}
                  onChange={(e) => setSettings({ ...settings, lowBalanceWarnings: e.target.checked })}
                />
                <span className="h-6 w-11 rounded-full bg-zinc-300 transition peer-checked:bg-blue-500">
                  <span className="ml-1 mt-1 block h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5" />
                </span>
              </label>
            </div>

            {settings.lowBalanceWarnings && (
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Threshold Type
                  </label>
                  <select
                    value={settings.thresholdType}
                    onChange={(e) =>
                      setSettings({ ...settings, thresholdType: e.target.value as NotificationSettings['thresholdType'] })
                    }
                    className="w-full rounded-lg border-2 border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  >
                    <option value="currency">Minimum balance (EUR)</option>
                    <option value="minutes">Minutes remaining</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Threshold Value
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={settings.thresholdValue}
                    onChange={(e) =>
                      setSettings({ ...settings, thresholdValue: Math.max(1, Number(e.target.value) || 1) })
                    }
                    className="w-full rounded-lg border-2 border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Notification Methods
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { key: 'notifyInApp', label: 'In-app' },
                      { key: 'notifyEmail', label: 'Email' },
                      { key: 'notifyPush', label: 'Push' },
                    ].map(({ key, label }) => (
                      <label key={key} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
                        <input
                          type="checkbox"
                          checked={(settings as any)[key]}
                          onChange={(e) => setSettings({ ...settings, [key]: e.target.checked } as NotificationSettings)}
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>

                {settings.notifyEmail && (
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Notification Email
                    </label>
                    <input
                      type="email"
                      value={settings.notificationEmail}
                      onChange={(e) => setSettings({ ...settings, notificationEmail: e.target.value })}
                      className="w-full rounded-lg border-2 border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                    />
                  </div>
                )}
              </div>
            )}
          </section>

          <section className="rounded-2xl border-2 border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Notification Types & Delivery</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                مدیریت روشن/خاموش بودن هر نوع اعلان و انتخاب روش ارسال (In-app، ایمیل، Push) مطابق نیازتان.
              </p>
            </div>

            <div className="space-y-4">
              {notificationTypeConfig.map((type) => {
                const typePref =
                  settings?.typePreferences?.[type.key] ?? defaultTypePreferences[type.key];
                return (
                  <div
                    key={type.key}
                    className="rounded-2xl border border-zinc-200 bg-white/60 p-4 dark:border-zinc-700 dark:bg-zinc-900/60"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                          <span className="text-xl">{type.icon}</span>
                          <span className="font-semibold">{type.label}</span>
                        </div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">{type.description}</p>
                      </div>
                      <label className="inline-flex cursor-pointer items-center gap-2 self-start">
                        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                          {typePref.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={typePref.enabled}
                          onChange={(e) => handleTypeEnabledChange(type.key, e.target.checked)}
                        />
                        <span className="h-6 w-11 rounded-full bg-zinc-300 transition peer-checked:bg-blue-500">
                          <span className="ml-1 mt-1 block h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5" />
                        </span>
                      </label>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      {Object.entries(channelLabels).map(([channelKey, label]) => (
                        <label
                          key={`${type.key}-${channelKey}`}
                          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm ${
                            typePref.enabled
                              ? 'border-zinc-300 dark:border-zinc-600'
                              : 'border-dashed border-zinc-300/70 text-zinc-400'
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="h-4 w-4"
                            checked={typePref.channels[channelKey as keyof ChannelPreferences]}
                            disabled={!typePref.enabled}
                            onChange={(e) =>
                              handleChannelChange(
                                type.key,
                                channelKey as keyof ChannelPreferences,
                                e.target.checked
                              )
                            }
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="auto-topup" className="rounded-2xl border-2 border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Auto Top-up</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Manage automatic wallet replenishment from the dedicated Auto-top-up page.
                </p>
              </div>
              <Link
                href="/settings/wallet/auto-topup"
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Open Settings
              </Link>
            </div>
            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
              Auto-top-up settings moved to <code className="font-mono">/settings/wallet/auto-topup</code> for a more
              detailed configuration experience.
            </p>
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
            onClick={loadSettings}
            className="rounded-xl border border-zinc-300 px-8 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

