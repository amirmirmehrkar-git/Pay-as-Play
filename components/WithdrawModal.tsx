'use client';

import { useState, useEffect } from 'react';
import { getWallet, getWalletConnect } from '@/lib/sdk';

interface WithdrawModalProps {
  balance: number;
  address: string | null;
  onClose?: () => void;
}

export default function WithdrawModal({ balance, address, onClose }: WithdrawModalProps) {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleWithdraw() {
    if (!address) {
      setError('Wallet not connected');
      return;
    }

    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    // Minimum amount check (0.001 PLY to avoid precision issues)
    if (withdrawAmount < 0.001) {
      setError('Minimum withdrawal amount is 0.001 PLY');
      return;
    }

    if (withdrawAmount > balance) {
      setError('Insufficient balance');
      return;
    }

    if (!destination || destination.length < 10) {
      setError('Please enter a valid destination address');
      return;
    }

    // Validate Algorand address format (58 characters, base32)
    const isValidAlgorandAddress = /^[A-Z2-7]{58}$/.test(destination);
    if (!isValidAlgorandAddress) {
      setError('Invalid Algorand address format. Address must be 58 characters and base32 encoded.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const wallet = await getWallet();
      const wc = await getWalletConnect();
      const signer = wc.getWalletConnector();

      // Convert amount to microAlgos (assuming 1 PLY = 1,000,000 microAlgos)
      const amountInMicroAlgos = Math.floor(withdrawAmount * 1000000);

      await wallet.transfer({
        to: destination,
        amount: amountInMicroAlgos,
        signer,
      });

      alert(`Successfully withdrew ${withdrawAmount} PLY to ${destination.slice(0, 8)}...`);
      setShowModal(false);
      setAmount('');
      setDestination('');
      onClose?.();
    } catch (err: any) {
      setError(err.message || 'Withdrawal failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleMax() {
    setAmount(balance.toFixed(2));
  }

  // Handle Escape key to close modal
  useEffect(() => {
    if (!showModal) return;

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setShowModal(false);
        setError(null);
        setAmount('');
        setDestination('');
      }
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showModal]);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="rounded-lg border-2 border-zinc-300 bg-white px-6 py-3 font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        Withdraw PLY
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Withdraw PLY
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setError(null);
                  setAmount('');
                  setDestination('');
                }}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {error && (
              <div
                id="withdraw-error"
                role="alert"
                className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400"
              >
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Available Balance
              </label>
              <div className="rounded-lg border border-zinc-300 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800">
                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  {balance.toFixed(2)} PLY
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  ≈ €{(balance * 0.02).toFixed(2)}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="withdraw-amount"
                className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Amount to Withdraw
              </label>
              <div className="flex gap-2">
                <input
                  id="withdraw-amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  max={balance}
                  aria-label="Withdrawal amount"
                  aria-describedby={error ? 'withdraw-error' : undefined}
                  className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
                <button
                  onClick={handleMax}
                  className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                >
                  Max
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="withdraw-destination"
                className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Destination Address
              </label>
              <input
                id="withdraw-destination"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter Algorand address"
                aria-label="Destination Algorand address"
                aria-describedby="destination-help"
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 font-mono text-sm text-zinc-900 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
              <p id="destination-help" className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                Enter the Algorand address to receive the funds
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setError(null);
                  setAmount('');
                  setDestination('');
                }}
                className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdraw}
                disabled={loading || !amount || !destination}
                className="flex-1 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Withdraw'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

