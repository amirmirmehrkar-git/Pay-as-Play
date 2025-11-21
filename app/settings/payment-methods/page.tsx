'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  label: string;
  masked: string;
  primary: boolean;
  expiresAt?: string | null;
}

const typeLabels = {
  card: 'Card',
  paypal: 'PayPal',
  bank: 'Bank',
};

export default function PaymentMethodsPage() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/payment-methods');
    const json = await res.json();
    setMethods(json.data);
    setLoading(false);
  }

  function handlePrimary(id: string) {
    setMethods((prev) =>
      prev.map((m) => ({
        ...m,
        primary: m.id === id,
      })),
    );
    setMessage('Primary payment method updated');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          <Link href="/settings" className="hover:text-blue-600">
            Settings
          </Link>{' '}
          / <span className="text-zinc-900 dark:text-zinc-100">Payment Methods</span>
        </nav>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Payment Methods</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Manage saved payment methods for auto top-ups</p>
          </div>
          <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
            Add Method
          </button>
        </div>
        {message && (
          <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-200">
            {message}
          </div>
        )}
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 animate-pulse rounded-2xl bg-white/60 dark:bg-zinc-900/60" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {methods.map((method) => (
              <div key={method.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{typeLabels[method.type]}</p>
                  <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{method.label}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    {method.masked}
                    {method.expiresAt && (
                      <span className="ml-2 text-xs text-zinc-500 dark:text-zinc-400">Exp {method.expiresAt}</span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {method.primary ? (
                    <span className="rounded-full border border-green-300 px-3 py-1 text-xs font-semibold uppercase text-green-600 dark:border-green-700 dark:text-green-300">
                      Primary
                    </span>
                  ) : (
                    <button
                      onClick={() => handlePrimary(method.id)}
                      className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold uppercase text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      Make Primary
                    </button>
                  )}
                  <button className="rounded-lg border border-zinc-300 px-3 py-1 text-sm text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800">
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

