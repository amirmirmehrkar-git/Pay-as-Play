'use client';

import { useState, useEffect } from 'react';
import { getWalletConnect } from '@/lib/sdk';

interface ConnectedWallet {
  platformId: string;
  platformName: string;
  platformIcon: string;
  category: string;
  connectedAt: string;
  apiKey?: string;
}

export default function ConnectedWallets() {
  const [connectedWallets, setConnectedWallets] = useState<ConnectedWallet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadConnectedWallets();
  }, []);

  function loadConnectedWallets() {
    try {
      const stored = localStorage.getItem('connected_platforms');
      if (!stored) {
        setConnectedWallets([]);
        setIsLoading(false);
        return;
      }

      const platforms = JSON.parse(stored);
      const allPlatforms = [
        // Video
        { id: 'netflix', name: 'Netflix', icon: '🎬', category: 'video' },
        { id: 'youtube', name: 'YouTube', icon: '📺', category: 'video' },
        { id: 'disney', name: 'Disney+', icon: '🏰', category: 'video' },
        { id: 'amazon-prime', name: 'Amazon Prime Video', icon: '📦', category: 'video' },
        { id: 'hulu', name: 'Hulu', icon: '📺', category: 'video' },
        // Audio
        { id: 'spotify', name: 'Spotify', icon: '🎵', category: 'audio' },
        { id: 'audible', name: 'Audible', icon: '🎧', category: 'audio' },
        { id: 'apple-music', name: 'Apple Music', icon: '🍎', category: 'audio' },
        { id: 'soundcloud', name: 'SoundCloud', icon: '☁️', category: 'audio' },
        { id: 'pandora', name: 'Pandora', icon: '📻', category: 'audio' },
        { id: 'podcast-addict', name: 'Podcast Addict', icon: '🎙️', category: 'audio' },
        { id: 'stitcher', name: 'Stitcher', icon: '🎧', category: 'audio' },
        { id: 'tidal', name: 'Tidal', icon: '🌊', category: 'audio' },
        { id: 'deezer', name: 'Deezer', icon: '🎵', category: 'audio' },
        { id: 'youtube-music', name: 'YouTube Music', icon: '🎶', category: 'audio' },
        // Learning
        { id: 'coursera', name: 'Coursera', icon: '📚', category: 'learn' },
        { id: 'udemy', name: 'Udemy', icon: '🎓', category: 'learn' },
        { id: 'khan-academy', name: 'Khan Academy', icon: '🎯', category: 'learn' },
        { id: 'edx', name: 'edX', icon: '📖', category: 'learn' },
        { id: 'skillshare', name: 'Skillshare', icon: '✏️', category: 'learn' },
        { id: 'pluralsight', name: 'Pluralsight', icon: '💻', category: 'learn' },
        { id: 'linkedin-learning', name: 'LinkedIn Learning', icon: '💼', category: 'learn' },
        { id: 'masterclass', name: 'MasterClass', icon: '🎭', category: 'learn' },
        { id: 'codecademy', name: 'Codecademy', icon: '💻', category: 'learn' },
        { id: 'duolingo', name: 'Duolingo', icon: '🦉', category: 'learn' },
        // Entertainment
        { id: 'steam', name: 'Steam', icon: '🎮', category: 'entertainment' },
        { id: 'epic-games', name: 'Epic Games', icon: '🎯', category: 'entertainment' },
        { id: 'twitch', name: 'Twitch', icon: '📺', category: 'entertainment' },
        { id: 'roblox', name: 'Roblox', icon: '🧱', category: 'entertainment' },
        { id: 'minecraft', name: 'Minecraft', icon: '⛏️', category: 'entertainment' },
        { id: 'discord', name: 'Discord', icon: '💬', category: 'entertainment' },
      ];

      const connected: ConnectedWallet[] = [];
      for (const [platformId, data] of Object.entries(platforms)) {
        if ((data as any).connected) {
          const platform = allPlatforms.find((p) => p.id === platformId);
          if (platform) {
            connected.push({
              platformId,
              platformName: platform.name,
              platformIcon: platform.icon,
              category: platform.category,
              connectedAt: (data as any).connectedAt || new Date().toISOString(),
              apiKey: (data as any).apiKey,
            });
          }
        }
      }

      setConnectedWallets(connected);
    } catch (error) {
      console.error('Error loading connected wallets:', error);
      setConnectedWallets([]);
    } finally {
      setIsLoading(false);
    }
  }

  const categoryLabels: Record<string, string> = {
    video: 'Video',
    audio: 'Audio',
    learn: 'Learning',
    entertainment: 'Entertainment',
  };

  if (isLoading) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  if (connectedWallets.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Connected Wallets
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          No platforms connected yet. Connect your wallet to platforms to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Connected Wallets ({connectedWallets.length})
        </h3>
        <button
          onClick={loadConnectedWallets}
          className="rounded-lg px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-3">
        {connectedWallets.map((wallet) => (
          <div
            key={wallet.platformId}
            className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50/50 p-3 dark:border-green-800 dark:bg-green-900/10"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 text-xl dark:from-green-900/30 dark:to-emerald-900/30">
              {wallet.platformIcon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {wallet.platformName}
                </h4>
                <span className="rounded-full bg-green-500 px-2 py-0.5 text-xs font-medium text-white">
                  {categoryLabels[wallet.category]}
                </span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Connected {new Date(wallet.connectedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
              <span className="text-xs text-white">✓</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

