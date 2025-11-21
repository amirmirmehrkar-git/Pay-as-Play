'use client';

import { useState } from 'react';

interface TwoFactorModalProps {
  isOpen: boolean;
  onVerify: (code: string) => void;
  onClose: () => void;
  channel?: 'sms' | 'email';
  destination?: string;
}

export default function TwoFactorModal({
  isOpen,
  onVerify,
  onClose,
  channel = 'sms',
  destination = '+1 *** *** 1234',
}: TwoFactorModalProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setVerifying(true);
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 400));
    if (!code || code.length < 6) {
      setError('Enter the 6-digit code');
      setVerifying(false);
      return;
    }
    try {
      await Promise.resolve(onVerify(code));
      setVerifying(false);
      setCode('');
    } catch (err: any) {
      setError(err.message || 'Verification failed');
      setVerifying(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl border border-blue-200 bg-white p-6 shadow-2xl dark:border-blue-900 dark:bg-zinc-900">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Verify it’s you</h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Enter the 6-digit code we sent to your {channel === 'sms' ? 'phone' : 'email'} ({destination}).
        </p>

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/[^\d]/g, ''))}
            className="w-full rounded-xl border-2 border-zinc-200 px-4 py-3 text-center text-2xl tracking-[0.4em] dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            placeholder="••••••"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-zinc-300 px-4 py-2 font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={verifying}
              className="flex-1 rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {verifying ? 'Verifying...' : 'Verify'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

