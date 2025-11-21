'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import WalletConnect from '@/components/WalletConnect';
import NavigationTabs from '@/components/NavigationTabs';
import CurrentlyWatching from '@/components/CurrentlyWatching';
import SearchBar from '@/components/SearchBar';
import PlatformList from '@/components/PlatformList';
import ConnectedWallets from '@/components/ConnectedWallets';
import MediaHistory from '@/components/MediaHistory';
import NotificationCenter from '@/components/NotificationCenter';
import Link from 'next/link';
import { initSDK } from '@/lib/sdk';
import { appConfig } from '@/lib/config';

// Sample content data
const sampleContent = [
  {
    id: '1',
    title: 'Sample Video Content',
    type: 'video',
    pricePerMinute: 0.02,
    description: 'Watch this sample video content',
  },
  {
    id: '2',
    title: 'Sample Audio Content',
    type: 'audio',
    pricePerMinute: 0.015,
    description: 'Listen to this sample audio content',
  },
  {
    id: '3',
    title: 'Sample Learning Content',
    type: 'learn',
    pricePerMinute: 0.025,
    description: 'Learn from this sample content',
  },
];

function HomeContent() {
  const [sdkInitialized, setSdkInitialized] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const activeTab = (searchParams?.get('tab') || 'watch') as 'watch' | 'listen' | 'learn' | 'entertainment' | 'wallet';

  useEffect(() => {
    // Initialize SDK
    initSDK({
      network: appConfig.network,
      apiUrl: appConfig.apiUrl,
      apiKey: appConfig.apiKey,
      providerAddr: appConfig.providerAddr,
      platformAddr: appConfig.platformAddr,
      platformFeePct: appConfig.platformFeePct,
      asaId: appConfig.asaId,
      appId: appConfig.appId,
    }).then(() => {
      setSdkInitialized(true);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-2xl sm:text-3xl shadow-lg">
                  💰
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Play and Pay
                  </h1>
                  <p className="text-sm sm:text-base lg:text-lg text-zinc-600 dark:text-zinc-400 mt-1">
                    Pay-as-you-watch micro-payments for digital content
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <NotificationCenter />
              <Link
                href="/analytics"
                className="px-4 py-2 rounded-xl text-sm font-semibold text-zinc-700 dark:text-zinc-300 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800 transition-all hover:shadow-md"
              >
                Analytics
              </Link>
              <Link
                href="/settings"
                className="px-4 py-2 rounded-xl text-sm font-semibold text-zinc-700 dark:text-zinc-300 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800 transition-all hover:shadow-md"
              >
                Settings
              </Link>
            </div>
          </div>
          
          {/* Wallet Connection */}
          <div className="mb-4">
            <WalletConnect
              onConnect={(address) => setWalletAddress(address)}
              onDisconnect={() => setWalletAddress(null)}
            />
          </div>
        </header>

        {/* Navigation Tabs */}
        <NavigationTabs />

        {/* Search Bar */}
        <div className="my-6">
          <SearchBar
            onSearch={(query) => {
              console.log('Search:', query);
              // TODO: Implement search functionality
            }}
          />
        </div>

        {/* Platform Lists based on active tab */}
        <div className="mb-8">
          {activeTab === 'watch' && <PlatformList key="video" category="video" />}
          {activeTab === 'listen' && <PlatformList key="audio" category="audio" />}
          {activeTab === 'learn' && <PlatformList key="learn" category="learn" />}
          {activeTab === 'entertainment' && <PlatformList key="entertainment" category="entertainment" />}
          {activeTab === 'wallet' && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Wallet Management
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Manage your wallet connections and view your balance.
                </p>
                <Link
                  href="/wallet"
                  className="mt-4 inline-block rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-blue-600 hover:to-cyan-600 hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  Go to Wallet
                </Link>
              </div>
              <ConnectedWallets />
              <div>
                <h3 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Media Consumption History
                </h3>
                <MediaHistory />
              </div>
            </div>
          )}
        </div>

        {/* Featured Content Section */}
        {walletAddress && (
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              Featured Content
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {sampleContent
                .filter((c) => {
                  if (activeTab === 'watch') return c.type === 'video';
                  if (activeTab === 'listen') return c.type === 'audio';
                  if (activeTab === 'learn') return c.type === 'learn';
                  return true;
                })
                .map((content) => (
                  <div
                    key={content.id}
                    className="min-w-[200px] rounded-lg border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <div className="aspect-video w-full rounded-t-lg bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                      <span className="text-4xl">
                        {content.type === 'video' ? '📺' : content.type === 'audio' ? '🎵' : '📚'}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                          {content.type}
                        </span>
                        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          €{content.pricePerMinute.toFixed(2)}/min
                        </span>
                      </div>
                      <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">
                        {content.title}
                      </h3>
                      <Link
                        href={`/player?contentId=${content.id}&title=${encodeURIComponent(content.title)}&price=${content.pricePerMinute}`}
                        className="block w-full rounded-lg bg-blue-500 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-blue-600"
                      >
                        Start Now
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Info */}
        {!walletAddress && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Please connect your Pera Wallet to start watching content.
            </p>
          </div>
        )}
      </div>

      {/* Currently Watching Widget */}
      <CurrentlyWatching />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 flex items-center justify-center">
        <div className="text-zinc-600 dark:text-zinc-400">Loading...</div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
