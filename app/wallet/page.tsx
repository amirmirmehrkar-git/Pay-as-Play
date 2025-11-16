'use client';

import { useState, useEffect } from 'react';
import { getWallet, getWalletConnect } from '@/lib/sdk';
import { appConfig } from '@/lib/config';
import Link from 'next/link';
import WithdrawButton from '@/components/WithdrawButton';

export default function WalletPage() {
  const [balance, setBalance] = useState<string>('0');
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadWalletData();
  }, []);

  async function loadWalletData() {
    setLoading(true);
    try {
      const wc = await getWalletConnect();
      const addr = wc.getConnectedAddress();
      
      if (!addr) {
        setLoading(false);
        return;
      }

      setAddress(addr);

      // Load balance
      const w = await getWallet();
      const bal = await w.getBalance(addr, appConfig.asaId);
      setBalance(bal.formatted || '0');

      // Load transaction history (placeholder)
      // TODO: Implement real transaction history
      setTransactions([]);
    } catch (err) {
      console.error('Error loading wallet data:', err);
    } finally {
      setLoading(false);
    }
  }

  const filteredTransactions = transactions.filter((tx) => {
    if (filter === 'all') return true;
    return tx.type === filter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            My Wallet
          </h1>
          <Link
            href="/"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Balance Card */}
        <div className="mb-8 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-6 text-white shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm opacity-90">Total Balance</span>
            <span className="text-3xl">💰</span>
          </div>
          {loading ? (
            <div className="h-12 w-48 animate-pulse rounded bg-white/20" />
          ) : (
            <>
              <div className="mb-2 text-4xl font-bold">{balance} PLY</div>
              <div className="text-sm opacity-90">≈ €{(parseFloat(balance) * 0.02).toFixed(2)}</div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mb-8 grid grid-cols-2 gap-4">
          <button
            onClick={() => {
              // TODO: Implement top-up
              alert('Top-up functionality coming soon!');
            }}
            className="rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600"
          >
            Add PLY
          </button>
          <WithdrawButton balance={parseFloat(balance)} address={address} />
        </div>

        {/* Transaction History */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Recent Transactions
            </h2>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            >
              <option value="all">All</option>
              <option value="topup">Top-up</option>
              <option value="payment">Payment</option>
              <option value="withdrawal">Withdrawal</option>
            </select>
          </div>

          {filteredTransactions.length === 0 ? (
            <div className="py-8 text-center text-zinc-500 dark:text-zinc-400">
              <p>No transactions yet</p>
              <p className="mt-2 text-sm">Your transaction history will appear here</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTransactions.map((tx, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {tx.type === 'topup' ? '➕' : tx.type === 'payment' ? '➖' : '💸'}
                    </span>
                    <div>
                      <div className="font-medium text-zinc-900 dark:text-zinc-100">
                        {tx.type}
                      </div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">
                        {new Date(tx.date).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-semibold ${
                        tx.type === 'topup' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {tx.type === 'topup' ? '+' : '-'}€{tx.amount.toFixed(2)}
                    </div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-400">
                      {tx.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Wallet Address */}
        {address && (
          <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">
              Wallet Address
            </div>
            <div className="flex items-center justify-between">
              <code className="font-mono text-sm text-zinc-900 dark:text-zinc-100">
                {address.slice(0, 8)}...{address.slice(-8)}
              </code>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(address);
                  alert('Address copied to clipboard!');
                }}
                className="rounded-lg bg-zinc-200 px-3 py-1 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

