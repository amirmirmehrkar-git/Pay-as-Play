'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getBilling, getWalletConnect } from '@/lib/sdk';
import LowBalanceBanner from './LowBalanceBanner';
import { useLowBalanceWarning } from '@/hooks/useLowBalanceWarning';

interface VideoPlayerProps {
  contentId: string;
  contentTitle: string;
  pricePerMinute: number;
  videoUrl?: string;
  onStop?: (sessionId: string, totalCharge: number, duration: number) => void;
}

export default function VideoPlayer({
  contentId,
  contentTitle,
  pricePerMinute,
  videoUrl,
  onStop,
}: VideoPlayerProps) {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0); // in seconds
  const [totalCharge, setTotalCharge] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (tickIntervalRef.current) clearInterval(tickIntervalRef.current);
      if (sessionId) {
        getBilling().then((b) => b.stopSession(sessionId).catch(console.error));
      }
    };
  }, [sessionId]);

  async function handleStart() {
    if (warningEnabled && warningStatus !== 'ok') {
      openModal();
      setError('Balance too low. Please top up or continue after acknowledging the warning.');
      return;
    }

    const wc = await getWalletConnect();
    if (!wc.isWalletConnected()) {
      setError('Please connect your wallet first');
      return;
    }

    setError(null);
    setIsPlaying(true);

    try {
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

      intervalRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);

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
    } catch (err: any) {
      setError(err.message || 'Failed to start session');
      setIsPlaying(false);
    }
  }

  async function handleStop() {
    setIsPlaying(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (tickIntervalRef.current) {
      clearInterval(tickIntervalRef.current);
      tickIntervalRef.current = null;
    }

    if (sessionId) {
      try {
        const b = await getBilling();
        await b.stopSession(sessionId);
        onStop?.(sessionId, totalCharge, duration);
      } catch (err: any) {
        setError(err.message || 'Failed to stop session');
      }
    }
  }

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  const minutes = Math.floor(duration / 60);
  const currentCharge = minutes * pricePerMinute;

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      {showBanner && (
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

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Video Player Placeholder */}
      <div className="aspect-video w-full rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
        {videoUrl ? (
          <video
            src={videoUrl}
            controls={isPlaying}
            className="w-full h-full rounded-lg"
            onPlay={() => !isPlaying && handleStart()}
            onPause={() => isPlaying && handleStop()}
          />
        ) : (
          <div className="text-center text-zinc-500 dark:text-zinc-400">
            <p className="text-lg font-medium">Video Player</p>
            <p className="text-sm mt-2">Content: {contentTitle}</p>
          </div>
        )}
      </div>

      {/* Session Info */}
      {isPlaying && (
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
      )}

      {/* Controls */}
      <div className="flex gap-2">
        {!isPlaying ? (
          <button
            onClick={handleStart}
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

