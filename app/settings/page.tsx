'use client';

import { useState, useEffect } from 'react';
import { getWalletConnect } from '@/lib/sdk';
import Link from 'next/link';

export default function SettingsPage() {
  const [language, setLanguage] = useState('en');
  const [currencyDisplay, setCurrencyDisplay] = useState(true);
  const [autoTopup, setAutoTopup] = useState(false);
  const [autoTopupAmount, setAutoTopupAmount] = useState('10');
  const [autoTopupThreshold, setAutoTopupThreshold] = useState('1');
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [lowBalanceAlert, setLowBalanceAlert] = useState(true);
  const [lowBalanceThreshold, setLowBalanceThreshold] = useState('10');
  const [transactionAlerts, setTransactionAlerts] = useState(true);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const wc = await getWalletConnect();
      const addr = wc.getConnectedAddress();
      setAddress(addr);

      // Load saved settings from localStorage
      const savedLanguage = localStorage.getItem('language') || 'en';
      const savedCurrencyDisplay = localStorage.getItem('currencyDisplay') !== 'false';
      const savedAutoTopup = localStorage.getItem('autoTopup') === 'true';
      const savedAutoTopupAmount = localStorage.getItem('autoTopupAmount') || '10';
      const savedAutoTopupThreshold = localStorage.getItem('autoTopupThreshold') || '1';
      const savedLowBalanceThreshold = localStorage.getItem('lowBalanceThreshold') || '10';
      
      setLanguage(savedLanguage);
      setCurrencyDisplay(savedCurrencyDisplay);
      setAutoTopup(savedAutoTopup);
      setAutoTopupAmount(savedAutoTopupAmount);
      setAutoTopupThreshold(savedAutoTopupThreshold);
      setLowBalanceThreshold(savedLowBalanceThreshold);
    } catch (err) {
      console.error('Error loading settings:', err);
    }
  }

  function handleSave() {
    localStorage.setItem('language', language);
    localStorage.setItem('currencyDisplay', currencyDisplay.toString());
    localStorage.setItem('autoTopup', autoTopup.toString());
    localStorage.setItem('autoTopupAmount', autoTopupAmount);
    localStorage.setItem('autoTopupThreshold', autoTopupThreshold);
    localStorage.setItem('lowBalanceThreshold', lowBalanceThreshold);
    localStorage.setItem('lowBalanceAlert', lowBalanceAlert.toString());
    localStorage.setItem('pushNotifications', pushNotifications.toString());
    localStorage.setItem('emailNotifications', emailNotifications.toString());
    localStorage.setItem('transactionAlerts', transactionAlerts.toString());
    alert('Settings saved successfully!');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Settings
          </h1>
          <Link
            href="/"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Account Section */}
        <div className="mb-6 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Account
          </h2>
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl text-white">
              👤
            </div>
            <div className="flex-1">
              <div className="font-medium text-zinc-900 dark:text-zinc-100">
                User Account
              </div>
              {address && (
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  {address.slice(0, 8)}...{address.slice(-8)}
                </div>
              )}
            </div>
            <button className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700">
              Edit
            </button>
          </div>
        </div>

        {/* Payment & Wallet Section */}
        <div className="mb-6 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Payment & Wallet
          </h2>
          <div className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-zinc-900 dark:text-zinc-100">
                    Auto top-up when balance is low
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Automatically add funds when balance drops below threshold
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={autoTopup}
                    onChange={(e) => setAutoTopup(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-zinc-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-zinc-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
              </div>
              {autoTopup && (
                <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      Top-up Amount (PLY)
                    </label>
                    <input
                      type="number"
                      value={autoTopupAmount}
                      onChange={(e) => setAutoTopupAmount(e.target.value)}
                      placeholder="10"
                      min="1"
                      step="0.01"
                      className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      Threshold (PLY)
                    </label>
                    <input
                      type="number"
                      value={autoTopupThreshold}
                      onChange={(e) => setAutoTopupThreshold(e.target.value)}
                      placeholder="1"
                      min="0.1"
                      step="0.1"
                      className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                    />
                    <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                      Auto top-up will trigger when balance drops below this amount
                    </p>
                  </div>
                </div>
              )}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Low Balance Alert Threshold (PLY)
                </label>
                <input
                  type="number"
                  value={lowBalanceThreshold}
                  onChange={(e) => setLowBalanceThreshold(e.target.value)}
                  placeholder="10"
                  min="0.1"
                  step="0.1"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                  You'll receive a warning when balance drops below this amount
                </p>
              </div>
            </div>
            {address && (
              <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                <div>
                  <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    Wallet Address
                  </div>
                  <code className="text-xs text-zinc-600 dark:text-zinc-400">
                    {address}
                  </code>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(address);
                    alert('Address copied!');
                  }}
                  className="rounded-lg bg-zinc-200 px-3 py-1 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600"
                >
                  Copy
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Notifications Section */}
        <div className="mb-6 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Notifications
          </h2>
          <div className="space-y-4">
            {[
              { label: 'Push Notifications', state: pushNotifications, setState: setPushNotifications },
              { label: 'Email Notifications', state: emailNotifications, setState: setEmailNotifications },
              { label: 'Low Balance Alert', state: lowBalanceAlert, setState: setLowBalanceAlert },
              { label: 'Transaction Alerts', state: transactionAlerts, setState: setTransactionAlerts },
            ].map(({ label, state, setState }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{label}</span>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={state}
                    onChange={(e) => setState(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-zinc-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-zinc-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences Section */}
        <div className="mb-6 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Preferences
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              >
                <option value="en">English</option>
                <option value="fa">فارسی</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-zinc-900 dark:text-zinc-100">
                  Show EUR equivalent
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  Display both PLY and EUR amounts
                </div>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={currencyDisplay}
                  onChange={(e) => setCurrencyDisplay(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-zinc-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-zinc-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Legal & Privacy Section */}
        <div className="mb-6 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Legal & Privacy
          </h2>
          <div className="space-y-2">
            {['GDPR Policy', 'AML Policy', 'KYC Policy', 'Terms of Service', 'Privacy Policy'].map(
              (item) => (
                <button
                  key={item}
                  className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2 text-left text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>

        {/* About Section */}
        <div className="mb-6 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            About
          </h2>
          <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <div>App Version: v1.0.0</div>
            <button className="text-blue-600 hover:underline dark:text-blue-400">Support</button>
            <button className="text-blue-600 hover:underline dark:text-blue-400">Feedback</button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
          <h2 className="mb-4 text-xl font-semibold text-red-900 dark:text-red-100">
            Danger Zone
          </h2>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                alert('Account deletion functionality coming soon!');
              }
            }}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
          >
            Delete Account
          </button>
        </div>

        {/* Save Button */}
        <div className="mt-8">
          <button
            onClick={handleSave}
            className="w-full rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

