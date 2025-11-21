'use client';

import { useState } from 'react';

export type WithdrawalMethod = 'bank_transfer' | 'paypal' | 'crypto';

interface SavedMethod {
  id: string;
  type: WithdrawalMethod;
  label: string;
  details: string;
}

interface WithdrawalMethodSelectorProps {
  selectedMethod: WithdrawalMethod | null;
  onSelectMethod: (method: WithdrawalMethod) => void;
  savedMethods?: SavedMethod[];
  onAddMethod?: () => void;
}

export default function WithdrawalMethodSelector({
  selectedMethod,
  onSelectMethod,
  savedMethods = [],
  onAddMethod,
}: WithdrawalMethodSelectorProps) {
  const methods: Array<{ value: WithdrawalMethod; label: string; icon: string; description: string }> = [
    {
      value: 'bank_transfer',
      label: 'Bank Transfer (SEPA)',
      icon: '🏦',
      description: '3-5 business days',
    },
    {
      value: 'paypal',
      label: 'PayPal',
      icon: '💳',
      description: '24-48 hours',
    },
    {
      value: 'crypto',
      label: 'Crypto Wallet (Algorand)',
      icon: '₿',
      description: '1-2 hours',
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Withdrawal Method</h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Choose how you want to receive your funds
      </p>

      {/* Saved Methods */}
      {savedMethods.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Saved Methods</p>
          {savedMethods.map((method) => (
            <label
              key={method.id}
              className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all ${
                selectedMethod === method.type
                  ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20'
                  : 'border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="withdrawalMethod"
                  value={method.type}
                  checked={selectedMethod === method.type}
                  onChange={() => onSelectMethod(method.type)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:text-blue-400 dark:focus:ring-blue-400"
                />
                <div>
                  <div className="font-medium text-zinc-900 dark:text-zinc-100">{method.label}</div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">{method.details}</div>
                </div>
              </div>
            </label>
          ))}
        </div>
      )}

      {/* Method Options */}
      <div className="grid gap-3 md:grid-cols-3">
        {methods.map((method) => (
          <button
            key={method.value}
            type="button"
            onClick={() => onSelectMethod(method.value)}
            className={`rounded-xl border-2 p-4 text-left transition-all ${
              selectedMethod === method.value
                ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20'
                : 'border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600'
            }`}
          >
            <div className="mb-2 text-2xl">{method.icon}</div>
            <div className="font-semibold text-zinc-900 dark:text-zinc-100">{method.label}</div>
            <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{method.description}</div>
          </button>
        ))}
      </div>

      {onAddMethod && (
        <button
          type="button"
          onClick={onAddMethod}
          className="w-full rounded-xl border-2 border-dashed border-zinc-300 bg-white p-4 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-zinc-700"
        >
          + Add New Withdrawal Method
        </button>
      )}
    </div>
  );
}

