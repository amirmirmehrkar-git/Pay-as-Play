'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getBilling, getWalletConnect } from '@/lib/sdk';

export default function CurrentlyWatching() {
  const [activeSession, setActiveSession] = useState<any>(null);
  const [duration, setDuration] = useState(0);
  const router = useRouter();

  useEffect(() => {
    checkActiveSession();
    const interval = setInterval(checkActiveSession, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeSession) {
      const interval = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [activeSession]);

  async function checkActiveSession() {
    try {
      const wc = await getWalletConnect();
      const address = wc.getConnectedAddress();
      if (!address) return;

      const billing = await getBilling();
      const sessions = await billing.getSessionHistory({ userId: address });
      const active = sessions.find((s: any) => s.status === 'active');

      if (active) {
        setActiveSession(active);
        const startTime = new Date(active.startTime).getTime();
        const now = Date.now();
        setDuration(Math.floor((now - startTime) / 1000));
      } else {
        setActiveSession(null);
        setDuration(0);
      }
    } catch (err) {
      console.error('Error checking active session:', err);
    }
  }

  if (!activeSession) return null;

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-blue-200 bg-gradient-to-r from-white via-blue-50/50 to-cyan-50/50 shadow-2xl backdrop-blur-sm dark:border-blue-800 dark:from-zinc-900 dark:via-blue-900/20 dark:to-cyan-900/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-2xl shadow-lg">
              📺
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-zinc-900 dark:text-zinc-100 mb-1 truncate">
                {activeSession.contentTitle || 'Currently Watching'}
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <span className="font-mono font-semibold">{formatTime(duration)}</span>
                <span>•</span>
                <span>Live</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => router.push(`/player?contentId=${activeSession.contentId}`)}
            className="shrink-0 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-blue-600 hover:to-cyan-600 hover:shadow-xl hover:scale-105 active:scale-95"
          >
            Resume
          </button>
        </div>
      </div>
    </div>
  );
}

