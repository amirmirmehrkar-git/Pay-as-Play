'use client';

import { useState, useEffect } from 'react';
import { getWalletConnect, getWallet } from '@/lib/sdk';
import { appConfig } from '@/lib/config';

interface WalletConnectProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
}

export default function WalletConnect({ onConnect, onDisconnect }: WalletConnectProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check connection on mount
  useEffect(() => {
    checkConnection();
  }, []);

  // Update balance when connected
  useEffect(() => {
    if (isConnected && address) {
      updateBalance();
      const interval = setInterval(updateBalance, 10000); // Update every 10s
      return () => clearInterval(interval);
    }
  }, [isConnected, address]);

  async function checkConnection() {
    try {
      const wc = await getWalletConnect();
      const connected = wc.isWalletConnected();
      if (connected) {
        const addr = wc.getConnectedAddress();
        if (addr) {
          setIsConnected(true);
          setAddress(addr);
          onConnect?.(addr);
        }
      }
    } catch (err) {
      console.error('Connection check error:', err);
    }
  }

  async function updateBalance() {
    if (!address) return;
    
    try {
      const w = await getWallet();
      const bal = await w.getBalance(address, appConfig.asaId);
      setBalance(bal.formatted || '0');
    } catch (err) {
      console.error('Balance update error:', err);
    }
  }

  async function handleConnect() {
    setLoading(true);
    setError(null);
    
    try {
      const wc = await getWalletConnect();
      // Initialize Pera Wallet
      await wc.initPeraWallet();
      
      // Connect wallet
      const addr = await wc.connectWallet();
      
      if (addr) {
        setIsConnected(true);
        setAddress(addr);
        await updateBalance();
        onConnect?.(addr);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
      console.error('Wallet connection error:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDisconnect() {
    setLoading(true);
    setError(null);
    
    try {
      const wc = await getWalletConnect();
      await wc.disconnectWallet();
      setIsConnected(false);
      setAddress(null);
      setBalance('0');
      onDisconnect?.();
    } catch (err: any) {
      setError(err.message || 'Failed to disconnect wallet');
      console.error('Wallet disconnection error:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div className="rounded-xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-pink-50 p-4 text-sm font-semibold text-red-700 shadow-sm dark:border-red-800 dark:from-red-900/20 dark:to-pink-900/20 dark:text-red-400">
          {error}
        </div>
      )}
      
      {isConnected && address ? (
        <div className="flex flex-col gap-3 rounded-2xl border-2 border-green-200 bg-gradient-to-br from-white to-green-50/30 p-5 shadow-lg dark:border-green-800 dark:from-zinc-900 dark:to-green-900/10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-3 w-3 items-center justify-center rounded-full bg-green-500 shadow-sm">
                  <span className="text-[8px] text-white">✓</span>
                </div>
                <span className="text-xs font-semibold uppercase text-green-700 dark:text-green-400">Connected</span>
              </div>
              <div className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                {address.slice(0, 8)}...{address.slice(-6)}
              </div>
            </div>
            <div className="flex flex-col items-end shrink-0">
              <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Balance</span>
              <div className="flex flex-col items-end">
                <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {balance} PLY
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  ≈ €{(parseFloat(balance) * 0.02).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={handleDisconnect}
            disabled={loading}
            className="rounded-xl border-2 border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition-all hover:bg-red-50 hover:border-red-300 hover:shadow-md active:scale-95 disabled:opacity-50 dark:border-red-800 dark:bg-zinc-800 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            {loading ? 'Disconnecting...' : 'Disconnect'}
          </button>
        </div>
      ) : (
        <button
          onClick={handleConnect}
          disabled={loading}
          className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 text-base font-bold text-white shadow-xl transition-all hover:from-blue-600 hover:to-cyan-600 hover:shadow-2xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
        >
          {loading ? 'Connecting...' : 'Connect Pera Wallet'}
        </button>
      )}
    </div>
  );
}

