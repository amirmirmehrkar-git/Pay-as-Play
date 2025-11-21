'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getBilling, getWalletConnect } from '@/lib/sdk';
import LowBalanceBanner from './LowBalanceBanner';
import { useLowBalanceWarning } from '@/hooks/useLowBalanceWarning';
import PaymentMethodSelector, { PaymentMethod } from './PaymentMethodSelector';
import MediaPlayer from './MediaPlayer';

interface VideoPlayerProps {
  contentId: string;
  contentTitle: string;
  pricePerMinute: number;
  videoUrl?: string;
  audioUrl?: string;
  mediaType?: 'video' | 'audio';
  onStop?: (sessionId: string, totalCharge: number, duration: number) => void;
}

export default function VideoPlayer({
  contentId,
  contentTitle,
  pricePerMinute,
  videoUrl,
  audioUrl,
  mediaType = 'video',
  onStop,
}: VideoPlayerProps) {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0); // in seconds
  const [totalCharge, setTotalCharge] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('crypto');
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [cryptoBalance, setCryptoBalance] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const walletTickIntervalRef = useRef<NodeJS.Timeout | null>(null);
  // Refs to store latest values for accurate stop handling
  const durationRef = useRef<number>(0);
  const totalChargeRef = useRef<number>(0);

  const {
    showBanner,
    balance: lowBalance,
    currency,
    estimatedMinutesLeft,
    status: warningStatus,
    warningEnabled,
    openModal,
    dismissBanner,
  } = useLowBalanceWarning();

  // Load wallet balance
  useEffect(() => {
    async function loadBalances() {
      try {
        // Load wallet credit balance
        const balanceRes = await fetch('/api/wallet/balance');
        if (balanceRes.ok) {
          const data = await balanceRes.json();
          if (data.success) {
            setWalletBalance(data.data.balance);
          }
        }

        // Load crypto balance (if wallet connected)
        const wc = await getWalletConnect();
        if (wc.isWalletConnected()) {
          try {
            const wallet = await import('@/lib/sdk').then((m) => m.wallet);
            const address = wc.getConnectedAddress();
            if (address) {
              const balance = await wallet.getBalance(address);
              setCryptoBalance(balance || 0);
            }
          } catch (err) {
            console.error('Error loading crypto balance:', err);
          }
        }
      } catch (err) {
        console.error('Error loading balances:', err);
      }
    }
    loadBalances();
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (tickIntervalRef.current) clearInterval(tickIntervalRef.current);
      if (walletTickIntervalRef.current) clearInterval(walletTickIntervalRef.current);
      // Don't try to stop session on unmount if it's a wallet-credit session
      // Only stop crypto sessions
      if (sessionId && paymentMethod === 'crypto') {
        // Suppress "Session not found" errors using window.onerror
        const originalOnError = window.onerror;
        window.onerror = (message, source, lineno, colno, error) => {
          // Filter out "Session not found" errors
          if (typeof message === 'string' && message.includes('Session not found')) {
            return true; // Suppress the error
          }
          // Call original handler for other errors
          if (originalOnError) {
            return originalOnError(message, source, lineno, colno, error);
          }
          return false;
        };
        
        getBilling()
          .then((b) => {
            return b.stopSession(sessionId).catch(() => {
              // Completely ignore - session may not exist
            });
          })
          .catch(() => {
            // Completely ignore - any error is expected in cleanup
          })
          .finally(() => {
            // Restore window.onerror after a short delay
            setTimeout(() => {
              window.onerror = originalOnError;
            }, 100);
          });
      }
    };
  }, [sessionId, paymentMethod]);

  async function handleStart() {
    console.log('=== handleStart CALLED ===');
    console.log('Current state:', { isPlaying, paymentMethod, walletBalance, pricePerMinute });
    
    // Check balance based on payment method
    if (paymentMethod === 'wallet-credit') {
      if (walletBalance < pricePerMinute) {
        console.log('ERROR: Insufficient wallet balance');
        setError(`Insufficient wallet balance. Current balance: €${walletBalance.toFixed(2)}. Please top up.`);
        return;
      }
      console.log('Wallet credit check passed');
      // Wallet connection not required for wallet-credit
    } else {
      console.log('Checking crypto wallet connection...');
      // Crypto payment requires wallet connection
      const wc = await getWalletConnect();
      if (!wc.isWalletConnected()) {
        console.log('ERROR: Wallet not connected');
        setError('Please connect your wallet first to use crypto payment');
        return;
      }
      console.log('Wallet connected, checking balance warning...');

      if (warningEnabled && warningStatus !== 'ok') {
        console.log('ERROR: Balance warning');
        openModal();
        setError('Balance too low. Please top up or continue after acknowledging the warning.');
        return;
      }
      console.log('Crypto payment check passed');
    }

    setError(null);
    
    // Reset duration and charge for new session BEFORE setting isPlaying
    setDuration(0);
    setTotalCharge(0);
    durationRef.current = 0;
    totalChargeRef.current = 0;
    
    console.log('handleStart: Resetting duration and charge to 0');
    
    setIsPlaying(true);

    try {
      const sessionIdGenerated = `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      setSessionId(sessionIdGenerated);
      console.log('handleStart: Session ID generated:', sessionIdGenerated);

      // Start interval immediately to update duration and charge every second
      console.log('Starting duration interval, paymentMethod:', paymentMethod, 'pricePerMinute:', pricePerMinute);
      
      // Clear any existing interval first
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      intervalRef.current = setInterval(() => {
        setDuration((prev) => {
          const newDuration = prev + 1;
          durationRef.current = newDuration;
          // Update charge every second for real-time display
          if (paymentMethod === 'crypto') {
            // For crypto: calculate based on minutes (round up)
            const newMinutes = Math.floor(newDuration / 60) + (newDuration % 60 > 0 ? 1 : 0);
            const newCharge = newMinutes * pricePerMinute;
            setTotalCharge(newCharge);
            totalChargeRef.current = newCharge;
          } else {
            // For wallet-credit: show real-time estimate based on duration
            // Actual deduction happens every minute, but we show estimated charge
            const newMinutes = newDuration / 60; // Use decimal for smooth update
            const newCharge = newMinutes * pricePerMinute;
            setTotalCharge(newCharge);
            totalChargeRef.current = newCharge;
          }
          if (newDuration % 5 === 0) { // Log every 5 seconds to avoid spam
            console.log(`Interval tick: duration=${newDuration}s, charge=€${totalChargeRef.current.toFixed(4)}`);
          }
          return newDuration;
        });
      }, 1000);
      
      console.log('✅ Duration interval started successfully, intervalRef:', intervalRef.current);
      console.log('✅ handleStart completed successfully');

      // Handle billing based on payment method
      if (paymentMethod === 'wallet-credit') {
        // Deduct from wallet credit every minute
        walletTickIntervalRef.current = setInterval(async () => {
          try {
            const chargeAmount = pricePerMinute;

            const response = await fetch('/api/wallet/deduct', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                amount: chargeAmount,
                currency: 'EUR',
                sessionId: sessionIdGenerated,
                description: `Content consumption: ${contentTitle}`,
              }),
            });

            const data = await response.json();
            if (data.success) {
              setWalletBalance(data.data.newBalance);
              // For wallet-credit, the charge is already being calculated in real-time
              // by the main interval. We just log the actual deduction.
              // The totalCharge state is already showing the correct estimated value.
              console.log(`Deducted €${chargeAmount.toFixed(2)} from wallet. Current estimated charge: €${(totalChargeRef.current || 0).toFixed(2)}`);
            } else {
              setError(data.error?.message || 'Payment failed');
              setIsPlaying(false);
              if (walletTickIntervalRef.current) {
                clearInterval(walletTickIntervalRef.current);
              }
            }
          } catch (err: any) {
            console.error('Wallet tick error:', err);
            setError(err.message || 'Billing error');
            setIsPlaying(false);
            if (walletTickIntervalRef.current) {
              clearInterval(walletTickIntervalRef.current);
            }
          }
        }, 60000); // Every minute
        
        // Also update balance display every 5 seconds while playing
        const balanceUpdateInterval = setInterval(async () => {
          if (isPlaying) {
            try {
              const balanceRes = await fetch('/api/wallet/balance');
              if (balanceRes.ok) {
                const balanceData = await balanceRes.json();
                if (balanceData.success) {
                  setWalletBalance(balanceData.data.balance);
                }
              }
            } catch (err) {
              console.error('Error updating balance:', err);
            }
          } else {
            clearInterval(balanceUpdateInterval);
          }
        }, 5000); // Update every 5 seconds
      } else {
        // Use crypto wallet (existing logic)
        const wc = await getWalletConnect();
        const userAddress = wc.getConnectedAddress();
        if (!userAddress) {
          throw new Error('Wallet not connected');
        }

        const b = await getBilling();
        const session = (await b.startSession({
          contentId,
          userId: userAddress,
          ratePerMinute: pricePerMinute,
        })) as any;

        setSessionId(session.sessionId);

        tickIntervalRef.current = setInterval(async () => {
          try {
            const billingModule = await getBilling();
            const signer = wc.getWalletConnector();

            await billingModule.sendTick(session.sessionId, {
              signer,
            });

            const minutes = Math.floor(duration / 60) + 1;
            setTotalCharge(minutes * pricePerMinute);
          } catch (err: any) {
            console.error('Tick error:', err);
            setError(err.message || 'Billing error');
          }
        }, 60000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to start session');
      setIsPlaying(false);
    }
  }

  async function handleStop() {
    setIsPlaying(false);

    // Stop all intervals
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (tickIntervalRef.current) {
      clearInterval(tickIntervalRef.current);
      tickIntervalRef.current = null;
    }

    if (walletTickIntervalRef.current) {
      clearInterval(walletTickIntervalRef.current);
      walletTickIntervalRef.current = null;
    }

    // Get final values from refs (always up-to-date) or state as fallback
    const finalDuration = durationRef.current || duration;
    const finalMinutes = Math.floor(finalDuration / 60);
    
    // For wallet-credit, use accumulated totalCharge from ref (real-time calculated)
    // For crypto, calculate based on duration (round up to next minute)
    const finalCharge = paymentMethod === 'wallet-credit' 
      ? (totalChargeRef.current || totalCharge)  // Use accumulated charge
      : (finalMinutes + (finalDuration % 60 > 0 ? 1 : 0)) * pricePerMinute;
    
    console.log('Stopping session - Final values:', {
      sessionId,
      paymentMethod,
      duration: finalDuration,
      seconds: finalDuration,
      minutes: finalMinutes,
      totalCharge: totalCharge,
      finalCharge: finalCharge,
      pricePerMinute: pricePerMinute,
    });

    if (sessionId) {
      try {
        // Only stop billing session if using crypto
        if (paymentMethod === 'crypto') {
          const b = await getBilling();
          // Silently catch all errors - session may not exist
          await b.stopSession(sessionId).catch(() => {
            // Completely ignore - no logging
          });
        }
        
        // Pass final values to summary
        onStop?.(sessionId, finalCharge, finalDuration);
      } catch (err: any) {
        console.error('Error in handleStop:', err);
        // Still show summary even if there's an error
        onStop?.(sessionId || 'no-session', finalCharge, finalDuration);
      }
    } else {
      // If no sessionId, still show summary with current values
      onStop?.('no-session', finalCharge, finalDuration);
    }
  }

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // Calculate current charge in real-time based on duration
  // Use totalCharge state which is updated every second by the interval
  // This ensures real-time updates
  const currentCharge = totalCharge;

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      {showBanner && paymentMethod === 'crypto' && (
        <LowBalanceBanner
          balance={lowBalance}
          currency={currency}
          estimatedMinutesLeft={estimatedMinutesLeft}
          status={warningStatus}
          onTopUp={() => router.push('/wallet')}
          onDismiss={() => dismissBanner({ snoozeMs: 5 * 60 * 1000 })}
        />
      )}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          {contentTitle}
        </h2>
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          €{pricePerMinute.toFixed(2)}/min
        </span>
      </div>

      {/* Payment Method Selector - only show when not playing */}
      {!isPlaying && (
        <PaymentMethodSelector
          selectedMethod={paymentMethod}
          onMethodChange={setPaymentMethod}
          cryptoBalance={cryptoBalance}
          walletBalance={walletBalance}
          disabled={false}
        />
      )}

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Media Player */}
      <MediaPlayer
        mediaUrl={mediaType === 'video' ? videoUrl : audioUrl}
        type={mediaType}
        isPlaying={isPlaying}
        onPlay={() => {
          console.log('MediaPlayer onPlay called, isPlaying:', isPlaying);
          if (!isPlaying) {
            handleStart();
          }
        }}
        onPause={() => {
          console.log('MediaPlayer onPause called, isPlaying:', isPlaying);
          if (isPlaying) {
            handleStop();
          }
        }}
        title={contentTitle}
      />

      {/* Session Info */}
      {isPlaying && (
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <div className="flex flex-col">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Duration</span>
              <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {formatTime(duration)}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Charged</span>
              <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                €{currentCharge.toFixed(2)}
              </span>
            </div>
          </div>
          
          {/* Real-time Balance Deduction Indicator */}
          <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 p-3 dark:bg-green-900/20 dark:border-green-800">
            <div className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <div className="flex-1">
              <span className="text-sm font-semibold text-green-800 dark:text-green-200">
                {paymentMethod === 'wallet-credit' 
                  ? `Deducting from Wallet Credit: €${pricePerMinute.toFixed(2)}/min`
                  : `Deducting from Crypto Wallet: €${pricePerMinute.toFixed(2)}/min`
                }
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-green-600 dark:text-green-400">
                {paymentMethod === 'wallet-credit' 
                  ? `Balance: €${walletBalance.toFixed(2)}`
                  : `Balance: ${cryptoBalance.toFixed(4)} PLY`
                }
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-2">
        {!isPlaying ? (
          <button
            onClick={() => {
              console.log('Start Watching button clicked');
              handleStart();
            }}
            className="flex-1 rounded-lg bg-green-500 px-6 py-3 font-medium text-white transition-colors hover:bg-green-600"
          >
            Start Watching
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="flex-1 rounded-lg bg-red-500 px-6 py-3 font-medium text-white transition-colors hover:bg-red-600"
          >
            Stop
          </button>
        )}
      </div>
    </div>
  );
}

