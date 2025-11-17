'use client';

/**
 * Settlement Settings Page
 * Allows partners to configure settlement preferences and payment methods
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PaymentMethodSettings, { PaymentMethodDetails } from '@/components/PaymentMethodSettings';

type SettlementFrequency = 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly';

interface SettlementSettingsData {
  settlementFrequency: SettlementFrequency;
  minimumSettlementAmount: number;
  paymentMethod: PaymentMethodDetails;
  notifications: {
    emailOnProcessed: boolean;
    emailOnFailed: boolean;
    email: string;
  };
  taxInformation: {
    taxId: string | null;
    vatNumber: string | null;
    country: string;
  };
}

export default function SettlementSettingsPage() {
  const [data, setData] = useState<SettlementSettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form state
  const [settlementFrequency, setSettlementFrequency] = useState<SettlementFrequency>('monthly');
  const [minimumAmount, setMinimumAmount] = useState(50);
  const [emailOnProcessed, setEmailOnProcessed] = useState(true);
  const [emailOnFailed, setEmailOnFailed] = useState(true);
  const [notificationEmail, setNotificationEmail] = useState('');
  const [taxId, setTaxId] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [country, setCountry] = useState('DE');

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/partner/settlement/settings');

      if (!response.ok) {
        throw new Error('Failed to fetch settlement settings');
      }

      const result = await response.json();
      if (result.success && result.data) {
        setData(result.data);
        setSettlementFrequency(result.data.settlementFrequency);
        setMinimumAmount(result.data.minimumSettlementAmount);
        setEmailOnProcessed(result.data.notifications.emailOnProcessed);
        setEmailOnFailed(result.data.notifications.emailOnFailed);
        setNotificationEmail(result.data.notifications.email);
        setTaxId(result.data.taxInformation.taxId || '');
        setVatNumber(result.data.taxInformation.vatNumber || '');
        setCountry(result.data.taxInformation.country);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load settlement settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setError(null);

    try {
      const response = await fetch('/api/partner/settlement/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          settlementFrequency,
          minimumSettlementAmount: minimumAmount,
          notifications: {
            emailOnProcessed,
            emailOnFailed,
            email: notificationEmail,
          },
          taxInformation: {
            taxId: taxId || null,
            vatNumber: vatNumber || null,
            country,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || 'Failed to save settings');
      }

      const result = await response.json();
      if (result.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        // Refresh data
        await fetchData();
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePaymentMethodUpdate = async (method: PaymentMethodDetails) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/partner/settlement/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethod: method,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update payment method');
      }

      await fetchData();
    } catch (err) {
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-64 rounded bg-zinc-300 dark:bg-zinc-700"></div>
            <div className="h-64 rounded-xl bg-zinc-200 dark:bg-zinc-800"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-xl border-2 border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-red-700 dark:text-red-400">Error loading settings</p>
                <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
              </div>
              <button
                onClick={fetchData}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          {/* Breadcrumb */}
          <nav className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            <Link href="/partner" className="hover:text-blue-600 dark:hover:text-blue-400">
              Partner
            </Link>
            <span className="mx-2">/</span>
            <Link href="/partner/settlement" className="hover:text-blue-600 dark:hover:text-blue-400">
              Settlement
            </Link>
            <span className="mx-2">/</span>
            <span className="text-zinc-900 dark:text-zinc-100">Settings</span>
          </nav>

          <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">Settlement Settings</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Configure your settlement preferences and payment methods</p>
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <div className="mb-6 rounded-xl border-2 border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
            <p className="font-semibold text-green-700 dark:text-green-400">✓ Settings saved successfully!</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-xl border-2 border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
            <p className="font-semibold text-red-700 dark:text-red-400">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Settlement Frequency */}
          <div className="rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800 sm:p-8">
            <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Settlement Frequency</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(['weekly', 'bi-weekly', 'monthly', 'quarterly'] as SettlementFrequency[]).map((freq) => (
                <button
                  key={freq}
                  type="button"
                  onClick={() => setSettlementFrequency(freq)}
                  className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all ${
                    settlementFrequency === freq
                      ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
                  }`}
                >
                  {freq.charAt(0).toUpperCase() + freq.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Minimum Settlement Amount */}
          <div className="rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800 sm:p-8">
            <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Minimum Settlement Amount</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={minimumAmount}
                  onChange={(e) => setMinimumAmount(parseInt(e.target.value) || 0)}
                  min={10}
                  step={10}
                  className="w-32 rounded-lg border-2 border-zinc-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">EUR</span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Settlements will only be processed when this amount is reached. Minimum: 10 EUR
              </p>
              {minimumAmount < 10 && (
                <p className="text-xs text-red-600 dark:text-red-400">Minimum amount must be at least 10 EUR</p>
              )}
            </div>
          </div>

          {/* Payment Method */}
          {data && (
            <PaymentMethodSettings
              paymentMethod={data.paymentMethod}
              onUpdate={handlePaymentMethodUpdate}
              loading={loading}
            />
          )}

          {/* Notifications */}
          <div className="rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800 sm:p-8">
            <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Settlement Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="email-processed"
                  checked={emailOnProcessed}
                  onChange={(e) => setEmailOnProcessed(e.target.checked)}
                  className="h-5 w-5 rounded border-2 border-zinc-300 text-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-zinc-600"
                />
                <label htmlFor="email-processed" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Email me when settlement is processed
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="email-failed"
                  checked={emailOnFailed}
                  onChange={(e) => setEmailOnFailed(e.target.checked)}
                  className="h-5 w-5 rounded border-2 border-zinc-300 text-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-zinc-600"
                />
                <label htmlFor="email-failed" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Email me when settlement fails
                </label>
              </div>
              <div>
                <label htmlFor="notification-email" className="mb-1 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Notification Email
                </label>
                <input
                  type="email"
                  id="notification-email"
                  value={notificationEmail}
                  onChange={(e) => setNotificationEmail(e.target.value)}
                  className="w-full rounded-lg border-2 border-zinc-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>
            </div>
          </div>

          {/* Tax Information */}
          <div className="rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800 sm:p-8">
            <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Tax Information <span className="text-sm font-normal text-zinc-400">(Optional)</span>
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="tax-id" className="mb-1 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Tax ID
                </label>
                <input
                  type="text"
                  id="tax-id"
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                  placeholder="Optional"
                  className="w-full rounded-lg border-2 border-zinc-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>
              <div>
                <label htmlFor="vat-number" className="mb-1 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  VAT Number
                </label>
                <input
                  type="text"
                  id="vat-number"
                  value={vatNumber}
                  onChange={(e) => setVatNumber(e.target.value)}
                  placeholder="Optional"
                  className="w-full rounded-lg border-2 border-zinc-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>
              <div>
                <label htmlFor="country" className="mb-1 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Country
                </label>
                <select
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full rounded-lg border-2 border-zinc-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                >
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="UK">United Kingdom</option>
                  <option value="US">United States</option>
                  <option value="NL">Netherlands</option>
                </select>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Required for invoice generation
              </p>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-between rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800 sm:p-8">
            <Link
              href="/partner/settlement"
              className="text-sm font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              ← Back to Settlement
            </Link>
            <button
              onClick={handleSaveSettings}
              disabled={isSaving || minimumAmount < 10}
              className="rounded-xl bg-blue-500 px-8 py-3 font-semibold text-white transition-all hover:bg-blue-600 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

