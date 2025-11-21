'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import WalletConnect from '@/components/WalletConnect';
import { getWalletConnect } from '@/lib/sdk';
import { getDemoContent, getDefaultDemoContent } from '@/lib/demo-content';

function PlayerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [demoContent, setDemoContent] = useState<{
    id: string;
    title: string;
    pricePerMinute: number;
    mediaUrl?: string;
    type?: 'video' | 'audio' | 'course' | 'game';
  } | null>(null);

  // Get platform or content parameters
  const platformId = searchParams.get('platform');
  const contentId = searchParams.get('contentId');
  const contentTitle = searchParams.get('title');
  const pricePerMinute = searchParams.get('price');

  // Load demo content based on platform or use provided content
  useEffect(() => {
    console.log('Player page - platformId:', platformId);
    if (platformId) {
      const demo = getDemoContent(platformId);
      console.log('Player page - demo content:', demo);
      if (demo) {
        setDemoContent({
          id: demo.id,
          title: demo.title,
          pricePerMinute: demo.pricePerMinute,
          mediaUrl: demo.mediaUrl,
          type: demo.type,
        });
      } else {
        // If platform not found, use default for category
        const category = platformId.includes('netflix') || platformId.includes('youtube') || platformId.includes('disney') || platformId.includes('amazon-prime')
          ? 'video'
          : platformId.includes('spotify') || platformId.includes('audible') || platformId.includes('apple-music') || platformId.includes('soundcloud')
          ? 'audio'
          : platformId.includes('coursera') || platformId.includes('udemy') || platformId.includes('khan-academy') || platformId.includes('skillshare')
          ? 'learn'
          : 'entertainment';
        const defaultDemo = getDefaultDemoContent(category as any);
        if (defaultDemo) {
          setDemoContent({
            id: defaultDemo.id,
            title: defaultDemo.title,
            pricePerMinute: defaultDemo.pricePerMinute,
            mediaUrl: defaultDemo.mediaUrl,
            type: defaultDemo.type,
          });
        }
      }
    } else if (contentId && contentTitle && pricePerMinute) {
      // Use provided content parameters
      setDemoContent({
        id: contentId,
        title: contentTitle,
        pricePerMinute: parseFloat(pricePerMinute),
        type: 'video', // Default to video
      });
    } else {
      // Default demo content
      const defaultDemo = getDefaultDemoContent('video');
      if (defaultDemo) {
        setDemoContent({
          id: defaultDemo.id,
          title: defaultDemo.title,
          pricePerMinute: defaultDemo.pricePerMinute,
          mediaUrl: defaultDemo.mediaUrl,
          type: defaultDemo.type,
        });
      }
    }
  }, [platformId, contentId, contentTitle, pricePerMinute]);

  useEffect(() => {
    // Check wallet connection (optional for wallet-credit, required for crypto)
    async function checkWallet() {
      try {
        const wc = await getWalletConnect();
        const connected = wc.isWalletConnected();
        setIsWalletConnected(connected);
        // Don't redirect - user can use wallet-credit payment method
      } catch (err) {
        console.error('Error checking wallet:', err);
      }
    }
    checkWallet();
  }, [router]);

  function handleStop(sessionId: string, totalCharge: number, duration: number) {
    console.log('handleStop called with:', { sessionId, totalCharge, duration });
    // Navigate to summary page
    const url = `/summary?sessionId=${sessionId}&charge=${totalCharge}&duration=${duration}&title=${encodeURIComponent(demoContent?.title || 'Content')}`;
    console.log('Navigating to:', url);
    router.push(url);
  }

  if (!demoContent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-zinc-600 dark:text-zinc-400">Loading content...</p>
          </div>
        </div>
      </div>
    );
  }

  // For wallet-credit payment method, wallet connection is optional
  // But for crypto payment, wallet connection is required
  // We'll let the VideoPlayer component handle the payment method selection
  // and show wallet connection requirement only when crypto is selected

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <button
            onClick={() => router.push('/')}
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Back to Home
          </button>
        </div>
        <VideoPlayer
          contentId={demoContent.id}
          contentTitle={demoContent.title}
          pricePerMinute={demoContent.pricePerMinute}
          videoUrl={demoContent.type === 'video' ? demoContent.mediaUrl : undefined}
          audioUrl={demoContent.type === 'audio' ? demoContent.mediaUrl : undefined}
          mediaType={demoContent.type === 'audio' ? 'audio' : 'video'}
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

