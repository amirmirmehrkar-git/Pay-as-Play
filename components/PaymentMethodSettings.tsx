'use client';

/**
 * Payment Method Settings Component
 * Allows users to view and change payment method
 */

import { useState } from 'react';

export type PaymentMethodType = 'bank_transfer' | 'paypal' | 'crypto';

export interface PaymentMethodDetails {
  type: PaymentMethodType;
  details?: {
    iban?: string;
    bic?: string;
    accountHolderName?: string;
    bankName?: string;
    paypalEmail?: string;
    walletAddress?: string;
  };
}

interface PaymentMethodSettingsProps {
  paymentMethod: PaymentMethodDetails;
  onUpdate: (method: PaymentMethodDetails) => Promise<void>;
  loading?: boolean;
}

export default function PaymentMethodSettings({
  paymentMethod,
  onUpdate,
  loading = false,
}: PaymentMethodSettingsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState<PaymentMethodDetails>(paymentMethod);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData(paymentMethod);
    setErrors({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(paymentMethod);
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.type === 'bank_transfer') {
      if (!formData.details?.iban) {
        newErrors.iban = 'IBAN is required';
      } else if (!/^[A-Z]{2}\d{2}[A-Z0-9]{4,30}$/.test(formData.details.iban.replace(/\s/g, ''))) {
        newErrors.iban = 'Invalid IBAN format';
      }
      if (!formData.details?.bic) {
        newErrors.bic = 'BIC/SWIFT is required';
      }
      if (!formData.details?.accountHolderName) {
        newErrors.accountHolderName = 'Account holder name is required';
      }
    } else if (formData.type === 'paypal') {
      if (!formData.details?.paypalEmail) {
        newErrors.paypalEmail = 'PayPal email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.details.paypalEmail)) {
        newErrors.paypalEmail = 'Invalid email format';
      }
    } else if (formData.type === 'crypto') {
      if (!formData.details?.walletAddress) {
        newErrors.walletAddress = 'Wallet address is required';
      } else if (!/^[A-Z0-9]{58}$/.test(formData.details.walletAddress)) {
        newErrors.walletAddress = 'Invalid Algorand wallet address format';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setIsSaving(true);
    try {
      await onUpdate(formData);
      setIsEditing(false);
      setShowConfirm(false);
    } catch (err) {
      console.error('Failed to update payment method:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const formatPaymentMethod = (type: PaymentMethodType) => {
    const labels: Record<PaymentMethodType, string> = {
      bank_transfer: 'Bank Transfer (SEPA)',
      paypal: 'PayPal',
      crypto: 'Crypto Wallet (Algorand)',
    };
    return labels[type];
  };

  const maskSensitiveData = (value: string, type: 'iban' | 'email' | 'wallet') => {
    if (!value) return '';
    if (type === 'iban') {
      return `${value.substring(0, 4)}****${value.substring(value.length - 4)}`;
    } else if (type === 'email') {
      const [local, domain] = value.split('@');
      return `${local.substring(0, 2)}****@${domain}`;
    } else if (type === 'wallet') {
      return `${value.substring(0, 6)}...${value.substring(value.length - 6)}`;
    }
    return value;
  };

  if (loading) {
    return (
      <div className="animate-pulse rounded-xl border-2 border-zinc-200 bg-zinc-100 p-6 dark:border-zinc-700 dark:bg-zinc-800">
        <div className="h-4 w-32 rounded bg-zinc-300 dark:bg-zinc-700"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-xl border-2 border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800 sm:p-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Payment Method</h3>
        {!isEditing && (
          <button
            type="button"
            onClick={handleEdit}
            className="rounded-lg border-2 border-blue-500 bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-600"
          >
            Change Payment Method
          </button>
        )}
      </div>

      {!isEditing ? (
        <div className="space-y-2">
          <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {formatPaymentMethod(paymentMethod.type)}
          </div>
          {paymentMethod.type === 'bank_transfer' && paymentMethod.details && (
            <div className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <p>IBAN: {maskSensitiveData(paymentMethod.details.iban || '', 'iban')}</p>
              <p>BIC: {paymentMethod.details.bic}</p>
              <p>Account Holder: {paymentMethod.details.accountHolderName}</p>
              <p>Bank: {paymentMethod.details.bankName}</p>
            </div>
          )}
          {paymentMethod.type === 'paypal' && paymentMethod.details && (
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              Email: {maskSensitiveData(paymentMethod.details.paypalEmail || '', 'email')}
            </div>
          )}
          {paymentMethod.type === 'crypto' && paymentMethod.details && (
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              Wallet: {maskSensitiveData(paymentMethod.details.walletAddress || '', 'wallet')}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Payment Method Type Selection */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Payment Method Type
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {(['bank_transfer', 'paypal', 'crypto'] as PaymentMethodType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, type, details: {} })}
                  className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all ${
                    formData.type === type
                      ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
                  }`}
                >
                  {formatPaymentMethod(type)}
                </button>
              ))}
            </div>
          </div>

          {/* Bank Transfer Details */}
          {formData.type === 'bank_transfer' && (
            <div className="space-y-4 rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Bank Transfer Details</h4>
              <div>
                <label className="mb-1 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">IBAN *</label>
                <input
                  type="text"
                  value={formData.details?.iban || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      details: { ...formData.details, iban: e.target.value },
                    })
                  }
                  placeholder="DE89 3704 0044 0532 0130 00"
                  className={`w-full rounded-lg border-2 px-3 py-2 text-sm ${
                    errors.iban
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-zinc-200 focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-800'
                  }`}
                />
                {errors.iban && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.iban}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">BIC/SWIFT *</label>
                <input
                  type="text"
                  value={formData.details?.bic || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      details: { ...formData.details, bic: e.target.value },
                    })
                  }
                  placeholder="COBADEFFXXX"
                  className={`w-full rounded-lg border-2 px-3 py-2 text-sm ${
                    errors.bic
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-zinc-200 focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-800'
                  }`}
                />
                {errors.bic && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.bic}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Account Holder Name *
                </label>
                <input
                  type="text"
                  value={formData.details?.accountHolderName || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      details: { ...formData.details, accountHolderName: e.target.value },
                    })
                  }
                  className={`w-full rounded-lg border-2 px-3 py-2 text-sm ${
                    errors.accountHolderName
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-zinc-200 focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-800'
                  }`}
                />
                {errors.accountHolderName && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.accountHolderName}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">Bank Name</label>
                <input
                  type="text"
                  value={formData.details?.bankName || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      details: { ...formData.details, bankName: e.target.value },
                    })
                  }
                  className="w-full rounded-lg border-2 border-zinc-200 px-3 py-2 text-sm focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-800"
                />
              </div>
            </div>
          )}

          {/* PayPal Details */}
          {formData.type === 'paypal' && (
            <div className="space-y-4 rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">PayPal Details</h4>
              <div>
                <label className="mb-1 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  PayPal Email *
                </label>
                <input
                  type="email"
                  value={formData.details?.paypalEmail || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      details: { ...formData.details, paypalEmail: e.target.value },
                    })
                  }
                  placeholder="your-email@example.com"
                  className={`w-full rounded-lg border-2 px-3 py-2 text-sm ${
                    errors.paypalEmail
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-zinc-200 focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-800'
                  }`}
                />
                {errors.paypalEmail && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.paypalEmail}</p>
                )}
              </div>
            </div>
          )}

          {/* Crypto Wallet Details */}
          {formData.type === 'crypto' && (
            <div className="space-y-4 rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Algorand Wallet Details</h4>
              <div>
                <label className="mb-1 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Wallet Address *
                </label>
                <input
                  type="text"
                  value={formData.details?.walletAddress || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      details: { ...formData.details, walletAddress: e.target.value },
                    })
                  }
                  placeholder="Algorand wallet address (58 characters)"
                  className={`w-full rounded-lg border-2 px-3 py-2 font-mono text-sm ${
                    errors.walletAddress
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-zinc-200 focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-800'
                  }`}
                />
                {errors.walletAddress && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.walletAddress}</p>
                )}
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  Algorand wallet addresses are 58 characters long
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 rounded-xl border-2 border-zinc-200 bg-white px-4 py-2 font-semibold text-zinc-700 transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 rounded-xl bg-blue-500 px-4 py-2 font-semibold text-white transition-all hover:bg-blue-600 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowConfirm(false)}>
          <div
            className="w-full max-w-md rounded-2xl border-2 border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-100">Confirm Payment Method Change</h3>
            <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
              Are you sure you want to change your payment method? This action may require verification.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="flex-1 rounded-xl border-2 border-zinc-200 bg-white px-4 py-2 font-semibold text-zinc-700 transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={isSaving}
                className="flex-1 rounded-xl bg-blue-500 px-4 py-2 font-semibold text-white transition-all hover:bg-blue-600 disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

