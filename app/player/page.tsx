'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import WalletConnect from '@/components/WalletConnect';
import { getWalletConnect } from '@/lib/sdk';

function PlayerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const contentId = searchParams.get('contentId') || '1';
  const contentTitle = searchParams.get('title') || 'Sample Content';
  const pricePerMinute = parseFloat(searchParams.get('price') || '0.02');

  useEffect(() => {
    // Check wallet connection
    async function checkWallet() {
      try {
        const wc = await getWalletConnect();
        const connected = wc.isWalletConnected();
        setIsWalletConnected(connected);

        if (!connected) {
          // Redirect to home if wallet not connected
          router.push('/');
        }
      } catch (err) {
        console.error('Error checking wallet:', err);
      }
    }
    checkWallet();
  }, [router]);

  function handleStop(sessionId: string, totalCharge: number, duration: number) {
    // Navigate to summary page
    router.push(
      `/summary?sessionId=${sessionId}&charge=${totalCharge}&duration=${duration}&title=${encodeURIComponent(contentTitle)}`
    );
  }

  if (!isWalletConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
            <p className="text-sm text-red-800 dark:text-red-200">
              Please connect your wallet first.
            </p>
            <WalletConnect
              onConnect={() => setIsWalletConnected(true)}
              onDisconnect={() => setIsWalletConnected(false)}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto px-4 py-8">
        <VideoPlayer
          contentId={contentId}
          contentTitle={contentTitle}
          pricePerMinute={pricePerMinute}
          onStop={handleStop}
        />
      </div>
    </div>
  );
}

export default function PlayerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PlayerContent />
    </Suspense>
  );
}

