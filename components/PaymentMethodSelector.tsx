'use client';

import { useState } from 'react';
import { CurrencyDollarIcon, WalletIcon } from '@heroicons/react/24/outline';

export type PaymentMethod = 'crypto' | 'wallet-credit';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
  cryptoBalance?: number;
  walletBalance?: number;
  disabled?: boolean;
}

export default function PaymentMethodSelector({
  selectedMethod,
  onMethodChange,
  cryptoBalance,
  walletBalance,
  disabled = false,
}: PaymentMethodSelectorProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <label className="mb-3 block text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        Payment Method
      </label>
      <div className="grid grid-cols-2 gap-3">
        {/* Crypto Payment Option */}
        <button
          type="button"
          onClick={() => !disabled && onMethodChange('crypto')}
          disabled={disabled}
          className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
            selectedMethod === 'crypto'
              ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20'
              : 'border-zinc-200 bg-zinc-50 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800/50 dark:hover:border-zinc-600'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <CurrencyDollarIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <div className="text-center">
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Crypto Wallet
            </div>
            {cryptoBalance !== undefined && (
              <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                Balance: {cryptoBalance.toFixed(4)} PLY
              </div>
            )}
          </div>
          {selectedMethod === 'crypto' && (
            <div className="mt-1 h-2 w-2 rounded-full bg-blue-500"></div>
          )}
        </button>

        {/* Wallet Credit Option */}
        <button
          type="button"
          onClick={() => !disabled && onMethodChange('wallet-credit')}
          disabled={disabled}
          className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
            selectedMethod === 'wallet-credit'
              ? 'border-green-500 bg-green-50 dark:border-green-400 dark:bg-green-900/20'
              : 'border-zinc-200 bg-zinc-50 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800/50 dark:hover:border-zinc-600'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <WalletIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
          <div className="text-center">
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Wallet Credit
            </div>
            {walletBalance !== undefined && (
              <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                Balance: €{walletBalance.toFixed(2)}
              </div>
            )}
          </div>
          {selectedMethod === 'wallet-credit' && (
            <div className="mt-1 h-2 w-2 rounded-full bg-green-500"></div>
          )}
        </button>
      </div>
      <p className="mt-3 text-xs text-zinc-600 dark:text-zinc-400">
        {selectedMethod === 'crypto'
          ? 'Payment will be deducted from your connected crypto wallet (Algorand)'
          : 'Payment will be deducted from your wallet credit balance'}
      </p>
    </div>
  );
}

