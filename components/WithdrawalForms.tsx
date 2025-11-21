'use client';

import { useState } from 'react';
import { WithdrawalMethod } from './WithdrawalMethodSelector';

interface BankTransferDetails {
  iban: string;
  bic: string;
  accountHolderName: string;
  bankName?: string;
  saveForFuture: boolean;
}

interface PayPalDetails {
  paypalEmail: string;
  saveForFuture: boolean;
}

interface CryptoDetails {
  walletAddress: string;
  saveForFuture: boolean;
}

interface WithdrawalFormsProps {
  method: WithdrawalMethod | null;
  onBankTransferChange: (details: BankTransferDetails) => void;
  onPayPalChange: (details: PayPalDetails) => void;
  onCryptoChange: (details: CryptoDetails) => void;
  bankTransferDetails: BankTransferDetails;
  paypalDetails: PayPalDetails;
  cryptoDetails: CryptoDetails;
}

// Basic IBAN validation (format check)
function validateIBAN(iban: string): boolean {
  const cleaned = iban.replace(/\s/g, '').toUpperCase();
  const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{4,30}$/;
  return ibanRegex.test(cleaned);
}

// Algorand address validation
function validateAlgorandAddress(address: string): boolean {
  const algoRegex = /^[A-Z2-7]{58}$/;
  return algoRegex.test(address);
}

// Email validation
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function WithdrawalForms({
  method,
  onBankTransferChange,
  onPayPalChange,
  onCryptoChange,
  bankTransferDetails,
  paypalDetails,
  cryptoDetails,
}: WithdrawalFormsProps) {
  const [bankErrors, setBankErrors] = useState<Partial<Record<keyof BankTransferDetails, string>>>({});
  const [paypalErrors, setPaypalErrors] = useState<Partial<Record<keyof PayPalDetails, string>>>({});
  const [cryptoErrors, setCryptoErrors] = useState<Partial<Record<keyof CryptoDetails, string>>>({});

  const handleBankTransferChange = (field: keyof BankTransferDetails, value: string | boolean) => {
    const updated = { ...bankTransferDetails, [field]: value };
    onBankTransferChange(updated);

    // Validation
    const errors: Partial<Record<keyof BankTransferDetails, string>> = {};
    if (field === 'iban' && typeof value === 'string' && value && !validateIBAN(value)) {
      errors.iban = 'Invalid IBAN format';
    }
    if (field === 'bic' && typeof value === 'string' && value && value.length < 8) {
      errors.bic = 'BIC must be at least 8 characters';
    }
    if (field === 'accountHolderName' && typeof value === 'string' && value && value.length < 2) {
      errors.accountHolderName = 'Account holder name is required';
    }
    setBankErrors(errors);
  };

  const handlePayPalChange = (field: keyof PayPalDetails, value: string | boolean) => {
    const updated = { ...paypalDetails, [field]: value };
    onPayPalChange(updated);

    // Validation
    const errors: Partial<Record<keyof PayPalDetails, string>> = {};
    if (field === 'paypalEmail' && typeof value === 'string' && value && !validateEmail(value)) {
      errors.paypalEmail = 'Invalid email format';
    }
    setPaypalErrors(errors);
  };

  const handleCryptoChange = (field: keyof CryptoDetails, value: string | boolean) => {
    const updated = { ...cryptoDetails, [field]: value };
    onCryptoChange(updated);

    // Validation
    const errors: Partial<Record<keyof CryptoDetails, string>> = {};
    if (field === 'walletAddress' && typeof value === 'string' && value && !validateAlgorandAddress(value)) {
      errors.walletAddress = 'Invalid Algorand address format (must be 58 characters, base32)';
    }
    setCryptoErrors(errors);
  };

  if (!method) {
    return (
      <div className="rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
        <p className="text-center text-zinc-500 dark:text-zinc-400">Please select a withdrawal method</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Bank Transfer Form */}
      {method === 'bank_transfer' && (
        <div className="rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
          <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Bank Transfer Details</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="iban" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                IBAN <span className="text-red-500">*</span>
              </label>
              <input
                id="iban"
                type="text"
                value={bankTransferDetails.iban}
                onChange={(e) => handleBankTransferChange('iban', e.target.value.toUpperCase())}
                placeholder="DE89 3704 0044 0532 0130 00"
                className={`w-full rounded-lg border-2 px-4 py-2 text-zinc-900 dark:text-zinc-100 ${
                  bankErrors.iban
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-zinc-200 focus:border-blue-500 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900'
                }`}
              />
              {bankErrors.iban && <p className="mt-1 text-sm text-red-500">{bankErrors.iban}</p>}
            </div>

            <div>
              <label htmlFor="bic" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                BIC/SWIFT <span className="text-red-500">*</span>
              </label>
              <input
                id="bic"
                type="text"
                value={bankTransferDetails.bic}
                onChange={(e) => handleBankTransferChange('bic', e.target.value.toUpperCase())}
                placeholder="COBADEFFXXX"
                className={`w-full rounded-lg border-2 px-4 py-2 text-zinc-900 dark:text-zinc-100 ${
                  bankErrors.bic
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-zinc-200 focus:border-blue-500 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900'
                }`}
              />
              {bankErrors.bic && <p className="mt-1 text-sm text-red-500">{bankErrors.bic}</p>}
            </div>

            <div>
              <label htmlFor="accountHolderName" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Account Holder Name <span className="text-red-500">*</span>
              </label>
              <input
                id="accountHolderName"
                type="text"
                value={bankTransferDetails.accountHolderName}
                onChange={(e) => handleBankTransferChange('accountHolderName', e.target.value)}
                placeholder="John Doe"
                className={`w-full rounded-lg border-2 px-4 py-2 text-zinc-900 dark:text-zinc-100 ${
                  bankErrors.accountHolderName
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-zinc-200 focus:border-blue-500 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900'
                }`}
              />
              {bankErrors.accountHolderName && <p className="mt-1 text-sm text-red-500">{bankErrors.accountHolderName}</p>}
            </div>

            <div>
              <label htmlFor="bankName" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Bank Name (Optional)
              </label>
              <input
                id="bankName"
                type="text"
                value={bankTransferDetails.bankName || ''}
                onChange={(e) => handleBankTransferChange('bankName', e.target.value)}
                placeholder="Commerzbank"
                className="w-full rounded-lg border-2 border-zinc-200 px-4 py-2 text-zinc-900 focus:border-blue-500 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={bankTransferDetails.saveForFuture}
                onChange={(e) => handleBankTransferChange('saveForFuture', e.target.checked)}
                className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-700"
              />
              <span className="text-sm text-zinc-700 dark:text-zinc-300">Save for future withdrawals</span>
            </label>
          </div>
        </div>
      )}

      {/* PayPal Form */}
      {method === 'paypal' && (
        <div className="rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
          <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">PayPal Details</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="paypalEmail" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                PayPal Email <span className="text-red-500">*</span>
              </label>
              <input
                id="paypalEmail"
                type="email"
                value={paypalDetails.paypalEmail}
                onChange={(e) => handlePayPalChange('paypalEmail', e.target.value)}
                placeholder="user@example.com"
                className={`w-full rounded-lg border-2 px-4 py-2 text-zinc-900 dark:text-zinc-100 ${
                  paypalErrors.paypalEmail
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-zinc-200 focus:border-blue-500 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900'
                }`}
              />
              {paypalErrors.paypalEmail && <p className="mt-1 text-sm text-red-500">{paypalErrors.paypalEmail}</p>}
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={paypalDetails.saveForFuture}
                onChange={(e) => handlePayPalChange('saveForFuture', e.target.checked)}
                className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-700"
              />
              <span className="text-sm text-zinc-700 dark:text-zinc-300">Save for future withdrawals</span>
            </label>
          </div>
        </div>
      )}

      {/* Crypto Form */}
      {method === 'crypto' && (
        <div className="rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
          <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Crypto Wallet Details</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="walletAddress" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Algorand Wallet Address <span className="text-red-500">*</span>
              </label>
              <input
                id="walletAddress"
                type="text"
                value={cryptoDetails.walletAddress}
                onChange={(e) => handleCryptoChange('walletAddress', e.target.value.toUpperCase())}
                placeholder="ABCDEFGHIJKLMNOPQRSTUVWXYZ23456789ABCDEFGHJKLMNPQRSTUVWXY"
                className={`w-full rounded-lg border-2 px-4 py-2 font-mono text-sm text-zinc-900 dark:text-zinc-100 ${
                  cryptoErrors.walletAddress
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-zinc-200 focus:border-blue-500 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900'
                }`}
              />
              {cryptoErrors.walletAddress && <p className="mt-1 text-sm text-red-500">{cryptoErrors.walletAddress}</p>}
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Enter your Algorand wallet address (58 characters, base32)
              </p>
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={cryptoDetails.saveForFuture}
                onChange={(e) => handleCryptoChange('saveForFuture', e.target.checked)}
                className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-700"
              />
              <span className="text-sm text-zinc-700 dark:text-zinc-300">Save for future withdrawals</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

