'use client';

import { CreditCardIcon, BanknotesIcon, GlobeAltIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';

export type PaymentMethodType = 'card' | 'paypal' | 'bank' | 'crypto';

export interface PaymentMethodDetails {
  type: PaymentMethodType;
  label: string;
  masked: string;
  expiresAt?: string | null;
}

interface AutoTopupPaymentMethodProps {
  selected: PaymentMethodType;
  details: PaymentMethodDetails;
  onSelect: (type: PaymentMethodType) => void;
  onManage: () => void;
}

const methodConfigs: Record<
  PaymentMethodType,
  {
    title: string;
    description: string;
    icon: typeof CreditCardIcon;
  }
> = {
  card: {
    title: 'Credit / Debit Card',
    description: 'Fastest processing, recommended',
    icon: CreditCardIcon,
  },
  paypal: {
    title: 'PayPal',
    description: 'Use your PayPal balance or linked bank',
    icon: GlobeAltIcon,
  },
  bank: {
    title: 'Bank Account (SEPA)',
    description: 'Direct debit, processed within seconds',
    icon: BuildingLibraryIcon,
  },
  crypto: {
    title: 'Algorand Wallet',
    description: 'Use your connected Algorand wallet',
    icon: BanknotesIcon,
  },
};

export default function AutoTopupPaymentMethod({
  selected,
  details,
  onSelect,
  onManage,
}: AutoTopupPaymentMethodProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {Object.entries(methodConfigs).map(([value, config]) => {
          const Icon = config.icon;
          const isSelected = selected === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => onSelect(value as PaymentMethodType)}
              className={`flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20'
                  : 'border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900'
              }`}
            >
              <Icon className={`h-6 w-6 ${isSelected ? 'text-blue-500' : 'text-zinc-400'}`} aria-hidden />
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">{config.title}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{config.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border-2 border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Selected method</p>
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{details.label}</p>
          </div>
          <button
            type="button"
            onClick={onManage}
            className="rounded-xl border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Manage
          </button>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {details.masked}
          {details.expiresAt && (
            <span className="ml-2 text-xs text-zinc-500 dark:text-zinc-400">(Exp {details.expiresAt})</span>
          )}
        </p>
        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          Payment data stored securely.{' '}
          <span className="font-semibold text-green-600 dark:text-green-400">256-bit encryption enabled.</span>
        </p>
      </div>
    </div>
  );
}

