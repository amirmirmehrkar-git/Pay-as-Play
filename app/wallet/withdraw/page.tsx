'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getWallet, getWalletConnect } from '@/lib/sdk';
import { appConfig } from '@/lib/config';
import WithdrawalMethodSelector, { WithdrawalMethod } from '@/components/WithdrawalMethodSelector';
import WithdrawalForms from '@/components/WithdrawalForms';
import WithdrawalSummary from '@/components/WithdrawalSummary';
import TwoFactorModal from '@/components/TwoFactorModal';

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

const MIN_WITHDRAWAL = 10;
const WITHDRAWAL_FEE_PERCENT = 0.02;
const MIN_FEE = 1;

export default function WithdrawPage() {
  const router = useRouter();
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState<WithdrawalMethod | null>(null);
  const [bankTransferDetails, setBankTransferDetails] = useState<BankTransferDetails>({
    iban: '',
    bic: '',
    accountHolderName: '',
    bankName: '',
    saveForFuture: false,
  });
  const [paypalDetails, setPaypalDetails] = useState<PayPalDetails>({
    paypalEmail: '',
    saveForFuture: false,
  });
  const [cryptoDetails, setCryptoDetails] = useState<CryptoDetails>({
    walletAddress: '',
    saveForFuture: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [pendingWithdrawal, setPendingWithdrawal] = useState<any>(null);

  useEffect(() => {
    loadBalance();
  }, []);

  async function loadBalance() {
    setLoading(true);
    try {
      const wc = await getWalletConnect();
      const addr = wc.getConnectedAddress();
      if (!addr) {
        setLoading(false);
        return;
      }
      const w = await getWallet();
      const bal = await w.getBalance(addr, appConfig.asaId);
      setBalance(parseFloat(bal.formatted || '0') * 0.02); // Convert PLY to EUR (mock conversion)
    } catch (err) {
      console.error('Error loading balance:', err);
    } finally {
      setLoading(false);
    }
  }

  const calculateFee = (amount: number): number => {
    return Math.max(amount * WITHDRAWAL_FEE_PERCENT, MIN_FEE);
  };

  const getEstimatedProcessingTime = (method: WithdrawalMethod | null): string => {
    switch (method) {
      case 'crypto':
        return '1-2 hours';
      case 'paypal':
        return '24-48 hours';
      case 'bank_transfer':
        return '3-5 business days';
      default:
        return 'N/A';
    }
  };

  const validateForm = (): boolean => {
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount < MIN_WITHDRAWAL) {
      setError(`Minimum withdrawal amount is ${MIN_WITHDRAWAL} EUR`);
      return false;
    }
    if (withdrawAmount > balance) {
      setError('Insufficient balance');
      return false;
    }
    if (!selectedMethod) {
      setError('Please select a withdrawal method');
      return false;
    }

    // Validate method-specific details
    if (selectedMethod === 'bank_transfer') {
      if (!bankTransferDetails.iban || !bankTransferDetails.bic || !bankTransferDetails.accountHolderName) {
        setError('Please fill in all required bank transfer details');
        return false;
      }
    } else if (selectedMethod === 'paypal') {
      if (!paypalDetails.paypalEmail) {
        setError('Please enter your PayPal email');
        return false;
      }
    } else if (selectedMethod === 'crypto') {
      if (!cryptoDetails.walletAddress) {
        setError('Please enter your Algorand wallet address');
        return false;
      }
    }

    return true;
  };

  const handleWithdrawAll = () => {
    setAmount(balance.toFixed(2));
  };

  const handlePresetAmount = (preset: number) => {
    if (preset <= balance) {
      setAmount(preset.toFixed(2));
    }
  };

  const handleSubmit = async () => {
    setError(null);
    if (!validateForm()) {
      return;
    }

    const withdrawAmount = parseFloat(amount);
    const fee = calculateFee(withdrawAmount);
    const netAmount = withdrawAmount - fee;

    // Prepare withdrawal data
    const withdrawalData: any = {
      amount: withdrawAmount,
      method: selectedMethod,
      details: {},
      saveMethod: false,
    };

    if (selectedMethod === 'bank_transfer') {
      withdrawalData.details = {
        iban: bankTransferDetails.iban,
        bic: bankTransferDetails.bic,
        accountHolderName: bankTransferDetails.accountHolderName,
        bankName: bankTransferDetails.bankName,
      };
      withdrawalData.saveMethod = bankTransferDetails.saveForFuture;
    } else if (selectedMethod === 'paypal') {
      withdrawalData.details = {
        paypalEmail: paypalDetails.paypalEmail,
      };
      withdrawalData.saveMethod = paypalDetails.saveForFuture;
    } else if (selectedMethod === 'crypto') {
      withdrawalData.details = {
        walletAddress: cryptoDetails.walletAddress,
      };
      withdrawalData.saveMethod = cryptoDetails.saveForFuture;
    }

    setPendingWithdrawal({ ...withdrawalData, fee, netAmount });
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    setShow2FA(true);
  };

  const handle2FAVerify = async (code: string) => {
    if (code !== '123456') {
      throw new Error('Invalid verification code');
    }
    setShow2FA(false);
    await processWithdrawal();
  };

  const processWithdrawal = async () => {
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/wallet/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pendingWithdrawal),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error?.message || 'Withdrawal failed');
      }

      setSuccess(`Withdrawal request submitted successfully! ID: ${result.data.withdrawalId}`);
      // Reset form
      setAmount('');
      setSelectedMethod(null);
      setBankTransferDetails({ iban: '', bic: '', accountHolderName: '', bankName: '', saveForFuture: false });
      setPaypalDetails({ paypalEmail: '', saveForFuture: false });
      setCryptoDetails({ walletAddress: '', saveForFuture: false });
      setPendingWithdrawal(null);
      // Reload balance
      await loadBalance();
      // Redirect to history after 2 seconds
      setTimeout(() => {
        router.push('/wallet/withdraw/history');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to process withdrawal');
    } finally {
      setSubmitting(false);
    }
  };

  const fee = amount ? calculateFee(parseFloat(amount)) : 0;
  const netAmount = amount ? parseFloat(amount) - fee : 0;
  const estimatedTime = getEstimatedProcessingTime(selectedMethod);

  const amountPresets = [10, 25, 50, 100].filter((p) => p <= balance);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            <Link href="/wallet" className="hover:text-blue-600 dark:hover:text-blue-400">
              Wallet
            </Link>{' '}
            / <span className="text-zinc-900 dark:text-zinc-100">Withdraw Funds</span>
          </nav>
          <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">Withdraw Funds</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Transfer your unused credits back to your account</p>
        </div>

        {/* Current Balance */}
        <div className="mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-6 text-white shadow-lg">
          <div className="mb-2 text-sm opacity-90">Available Balance</div>
          {loading ? (
            <div className="h-12 w-48 animate-pulse rounded bg-white/20" />
          ) : (
            <>
              <div className="mb-1 text-4xl font-bold">€{balance.toFixed(2)}</div>
              <div className="text-sm opacity-90">Minimum withdrawal: €{MIN_WITHDRAWAL}</div>
            </>
          )}
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-600 dark:bg-green-900/20 dark:text-green-400">
            {success}
          </div>
        )}

        <div className="space-y-6">
          {/* Withdraw Amount */}
          <div className="rounded-xl border-2 border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
            <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Withdraw Amount</h2>
            <div className="mb-4 flex flex-wrap gap-3">
              {amountPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handlePresetAmount(preset)}
                  className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${
                    amount === preset.toFixed(2)
                      ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-300'
                      : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300'
                  }`}
                >
                  €{preset}
                </button>
              ))}
              <button
                type="button"
                onClick={handleWithdrawAll}
                className="rounded-lg border-2 border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-600 transition-all hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
              >
                Withdraw All
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                min={MIN_WITHDRAWAL}
                max={balance}
                step="0.01"
                className="flex-1 rounded-lg border-2 border-zinc-200 px-4 py-2 text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              />
              <span className="flex items-center px-3 text-sm text-zinc-600 dark:text-zinc-400">EUR</span>
            </div>
            {amount && parseFloat(amount) > balance && (
              <p className="mt-2 text-sm text-red-500">Amount exceeds available balance</p>
            )}
            {amount && parseFloat(amount) < MIN_WITHDRAWAL && (
              <p className="mt-2 text-sm text-red-500">Minimum withdrawal amount is €{MIN_WITHDRAWAL}</p>
            )}
          </div>

          {/* Withdrawal Method */}
          <div className="rounded-xl border-2 border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
            <WithdrawalMethodSelector
              selectedMethod={selectedMethod}
              onSelectMethod={setSelectedMethod}
              onAddMethod={() => alert('Payment method management coming soon')}
            />
          </div>

          {/* Method Forms */}
          {selectedMethod && (
            <WithdrawalForms
              method={selectedMethod}
              onBankTransferChange={setBankTransferDetails}
              onPayPalChange={setPaypalDetails}
              onCryptoChange={setCryptoDetails}
              bankTransferDetails={bankTransferDetails}
              paypalDetails={paypalDetails}
              cryptoDetails={cryptoDetails}
            />
          )}

          {/* Summary */}
          {amount && selectedMethod && (
            <WithdrawalSummary
              amount={parseFloat(amount)}
              method={selectedMethod}
              fee={fee}
              netAmount={netAmount}
              estimatedProcessingTime={estimatedTime}
            />
          )}

          {/* Submit Button */}
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={submitting || !amount || !selectedMethod || parseFloat(amount) < MIN_WITHDRAWAL || parseFloat(amount) > balance}
              className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? 'Processing...' : 'Continue to Confirmation'}
            </button>
            <Link
              href="/wallet"
              className="rounded-lg border-2 border-zinc-300 bg-white px-6 py-3 font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            >
              Cancel
            </Link>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && pendingWithdrawal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Confirm Withdrawal</h3>
              <div className="mb-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">Amount:</span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">€{pendingWithdrawal.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">Fee:</span>
                  <span className="text-zinc-600 dark:text-zinc-400">€{pendingWithdrawal.fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-zinc-200 pt-2 dark:border-zinc-700">
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">Net Amount:</span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">€{pendingWithdrawal.netAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">Method:</span>
                  <span className="text-zinc-600 dark:text-zinc-400">
                    {pendingWithdrawal.method === 'bank_transfer'
                      ? 'Bank Transfer'
                      : pendingWithdrawal.method === 'paypal'
                        ? 'PayPal'
                        : 'Crypto'}
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowConfirmation(false);
                    setPendingWithdrawal(null);
                  }}
                  className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2FA Modal */}
        <TwoFactorModal
          isOpen={show2FA}
          onVerify={handle2FAVerify}
          onClose={() => {
            setShow2FA(false);
            setPendingWithdrawal(null);
          }}
          channel="sms"
          destination="+44 ••• •• 5123"
        />
      </div>
    </div>
  );
}

