'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getWalletConnect } from '@/lib/sdk';
import {
  FilmIcon,
  VideoCameraIcon,
  TvIcon,
  PlayIcon,
  MusicalNoteIcon,
  SpeakerWaveIcon,
  BookOpenIcon,
  AcademicCapIcon,
  CubeIcon,
  PuzzlePieceIcon,
} from '@heroicons/react/24/outline';

interface Platform {
  id: string;
  name: string;
  category: 'video' | 'audio' | 'learn' | 'entertainment';
  icon: React.ReactNode;
  description: string;
  connected: boolean;
  apiKey?: string;
}

const samplePlatforms: Platform[] = [
  // Video Platforms
  {
    id: 'netflix',
    name: 'Netflix',
    category: 'video',
    icon: <FilmIcon className="w-8 h-8" />,
    description: 'Stream movies and TV shows',
    connected: false,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    category: 'video',
    icon: <VideoCameraIcon className="w-8 h-8" />,
    description: 'Watch videos and tutorials',
    connected: false,
  },
  {
    id: 'disney',
    name: 'Disney+',
    category: 'video',
    icon: <TvIcon className="w-8 h-8" />,
    description: 'Disney, Pixar, Marvel, and Star Wars content',
    connected: false,
  },
  {
    id: 'amazon-prime',
    name: 'Amazon Prime Video',
    category: 'video',
    icon: <PlayIcon className="w-8 h-8" />,
    description: 'Movies, TV shows, and original content',
    connected: false,
  },
  {
    id: 'hulu',
    name: 'Hulu',
    category: 'video',
    icon: <TvIcon className="w-8 h-8" />,
    description: 'TV shows, movies, and live TV',
    connected: false,
  },
  {
    id: 'hbo-max',
    name: 'HBO Max',
    category: 'video',
    icon: <FilmIcon className="w-8 h-8" />,
    description: 'Premium TV shows and movies',
    connected: false,
  },
  {
    id: 'paramount',
    name: 'Paramount+',
    category: 'video',
    icon: <VideoCameraIcon className="w-8 h-8" />,
    description: 'Movies, TV shows, and live sports',
    connected: false,
  },
  {
    id: 'apple-tv',
    name: 'Apple TV+',
    category: 'video',
    icon: <TvIcon className="w-8 h-8" />,
    description: 'Original series and movies',
    connected: false,
  },
  // Audio Platforms
  {
    id: 'spotify',
    name: 'Spotify',
    category: 'audio',
    icon: <MusicalNoteIcon className="w-8 h-8" />,
    description: 'Listen to music and podcasts',
    connected: false,
  },
  {
    id: 'audible',
    name: 'Audible',
    category: 'audio',
    icon: <BookOpenIcon className="w-8 h-8" />,
    description: 'Audiobooks and audio content',
    connected: false,
  },
  {
    id: 'apple-music',
    name: 'Apple Music',
    category: 'audio',
    icon: <MusicalNoteIcon className="w-8 h-8" />,
    description: 'Stream millions of songs',
    connected: false,
  },
  {
    id: 'soundcloud',
    name: 'SoundCloud',
    category: 'audio',
    icon: <SpeakerWaveIcon className="w-8 h-8" />,
    description: 'Discover and stream music',
    connected: false,
  },
  {
    id: 'pandora',
    name: 'Pandora',
    category: 'audio',
    icon: <MusicalNoteIcon className="w-8 h-8" />,
    description: 'Personalized radio stations',
    connected: false,
  },
  {
    id: 'podcast-addict',
    name: 'Podcast Addict',
    category: 'audio',
    icon: <SpeakerWaveIcon className="w-8 h-8" />,
    description: 'Podcast player and manager',
    connected: false,
  },
  {
    id: 'stitcher',
    name: 'Stitcher',
    category: 'audio',
    icon: <SpeakerWaveIcon className="w-8 h-8" />,
    description: 'Podcasts and radio shows',
    connected: false,
  },
  {
    id: 'tidal',
    name: 'Tidal',
    category: 'audio',
    icon: <MusicalNoteIcon className="w-8 h-8" />,
    description: 'High-fidelity music streaming',
    connected: false,
  },
  {
    id: 'deezer',
    name: 'Deezer',
    category: 'audio',
    icon: <MusicalNoteIcon className="w-8 h-8" />,
    description: 'Music streaming service',
    connected: false,
  },
  {
    id: 'youtube-music',
    name: 'YouTube Music',
    category: 'audio',
    icon: <MusicalNoteIcon className="w-8 h-8" />,
    description: 'Music videos and audio',
    connected: false,
  },
  {
    id: 'iheartradio',
    name: 'iHeartRadio',
    category: 'audio',
    icon: <SpeakerWaveIcon className="w-8 h-8" />,
    description: 'Live radio and podcasts',
    connected: false,
  },
  {
    id: 'amazon-music',
    name: 'Amazon Music',
    category: 'audio',
    icon: <MusicalNoteIcon className="w-8 h-8" />,
    description: 'Stream millions of songs',
    connected: false,
  },
  // Learning Platforms
  {
    id: 'coursera',
    name: 'Coursera',
    category: 'learn',
    icon: <AcademicCapIcon className="w-8 h-8" />,
    description: 'Online courses and learning',
    connected: false,
  },
  {
    id: 'udemy',
    name: 'Udemy',
    category: 'learn',
    icon: <BookOpenIcon className="w-8 h-8" />,
    description: 'Online courses and training',
    connected: false,
  },
  {
    id: 'khan-academy',
    name: 'Khan Academy',
    category: 'learn',
    icon: <AcademicCapIcon className="w-8 h-8" />,
    description: 'Free online courses and lessons',
    connected: false,
  },
  {
    id: 'edx',
    name: 'edX',
    category: 'learn',
    icon: <AcademicCapIcon className="w-8 h-8" />,
    description: 'University-level courses',
    connected: false,
  },
  {
    id: 'skillshare',
    name: 'Skillshare',
    category: 'learn',
    icon: <BookOpenIcon className="w-8 h-8" />,
    description: 'Creative and professional skills',
    connected: false,
  },
  {
    id: 'pluralsight',
    name: 'Pluralsight',
    category: 'learn',
    icon: <AcademicCapIcon className="w-8 h-8" />,
    description: 'Technology and IT courses',
    connected: false,
  },
  {
    id: 'linkedin-learning',
    name: 'LinkedIn Learning',
    category: 'learn',
    icon: <BookOpenIcon className="w-8 h-8" />,
    description: 'Professional development courses',
    connected: false,
  },
  {
    id: 'masterclass',
    name: 'MasterClass',
    category: 'learn',
    icon: <AcademicCapIcon className="w-8 h-8" />,
    description: 'Learn from world-class experts',
    connected: false,
  },
  {
    id: 'codecademy',
    name: 'Codecademy',
    category: 'learn',
    icon: <AcademicCapIcon className="w-8 h-8" />,
    description: 'Interactive coding lessons',
    connected: false,
  },
  {
    id: 'duolingo',
    name: 'Duolingo',
    category: 'learn',
    icon: <BookOpenIcon className="w-8 h-8" />,
    description: 'Language learning platform',
    connected: false,
  },
  {
    id: 'udacity',
    name: 'Udacity',
    category: 'learn',
    icon: <AcademicCapIcon className="w-8 h-8" />,
    description: 'Tech and programming courses',
    connected: false,
  },
  {
    id: 'treehouse',
    name: 'Treehouse',
    category: 'learn',
    icon: <AcademicCapIcon className="w-8 h-8" />,
    description: 'Web development and design',
    connected: false,
  },
  // Entertainment & Games
  {
    id: 'steam',
    name: 'Steam',
    category: 'entertainment',
    icon: <CubeIcon className="w-8 h-8" />,
    description: 'PC gaming platform',
    connected: false,
  },
  {
    id: 'epic-games',
    name: 'Epic Games',
    category: 'entertainment',
    icon: <CubeIcon className="w-8 h-8" />,
    description: 'Game store and launcher',
    connected: false,
  },
  {
    id: 'twitch',
    name: 'Twitch',
    category: 'entertainment',
    icon: <VideoCameraIcon className="w-8 h-8" />,
    description: 'Live streaming and gaming',
    connected: false,
  },
  {
    id: 'roblox',
    name: 'Roblox',
    category: 'entertainment',
    icon: <PuzzlePieceIcon className="w-8 h-8" />,
    description: 'User-generated gaming platform',
    connected: false,
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    category: 'entertainment',
    icon: <PuzzlePieceIcon className="w-8 h-8" />,
    description: 'Creative building game',
    connected: false,
  },
  {
    id: 'discord',
    name: 'Discord',
    category: 'entertainment',
    icon: <SpeakerWaveIcon className="w-8 h-8" />,
    description: 'Gaming communication platform',
    connected: false,
  },
  {
    id: 'xbox',
    name: 'Xbox Game Pass',
    category: 'entertainment',
    icon: <CubeIcon className="w-8 h-8" />,
    description: 'Game subscription service',
    connected: false,
  },
  {
    id: 'playstation',
    name: 'PlayStation Plus',
    category: 'entertainment',
    icon: <CubeIcon className="w-8 h-8" />,
    description: 'Gaming subscription service',
    connected: false,
  },
  {
    id: 'nintendo',
    name: 'Nintendo Switch Online',
    category: 'entertainment',
    icon: <CubeIcon className="w-8 h-8" />,
    description: 'Nintendo gaming platform',
    connected: false,
  },
];

const demoConnectedPlatforms: Record<string, { connected: boolean; apiKey?: string; connectedAt: string }> = {
  netflix: { connected: true, apiKey: 'NET-4X8Y-2211', connectedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
  spotify: { connected: true, apiKey: 'SPF-8891-ABCD', connectedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() },
  coursera: { connected: true, apiKey: 'CRS-5521-ZKQ', connectedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString() },
  steam: { connected: true, apiKey: 'STM-44FF-PLAY', connectedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
};

interface PlatformListProps {
  category: 'video' | 'audio' | 'learn' | 'entertainment';
}

export default function PlatformList({ category }: PlatformListProps) {
  const router = useRouter();
  
  // Load connected platforms from localStorage (only on client)
  const loadConnectedPlatforms = (): Record<string, { connected: boolean; apiKey?: string; connectedAt?: string }> => {
    if (typeof window === 'undefined') {
      return demoConnectedPlatforms; // Return default on server
    }
    
    try {
      const stored = localStorage.getItem('connected_platforms');
      if (!stored) {
        localStorage.setItem('connected_platforms', JSON.stringify(demoConnectedPlatforms));
        return demoConnectedPlatforms;
      }

      const parsed = JSON.parse(stored);
      if (Object.keys(parsed).length === 0) {
        localStorage.setItem('connected_platforms', JSON.stringify(demoConnectedPlatforms));
        return demoConnectedPlatforms;
      }

      return parsed;
    } catch {
      return demoConnectedPlatforms;
    }
  };

  // Track if component is mounted to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  
  // Initialize with default platforms (no localStorage) to avoid hydration mismatch
  const [platforms, setPlatforms] = useState<Platform[]>(() => {
    // Server-side: return filtered platforms without connection status
    return samplePlatforms
      .filter((p) => p.category === category)
      .map((p) => ({
        ...p,
        connected: false,
        apiKey: undefined,
      }));
  });

  useEffect(() => {
    // Mark as mounted
    setMounted(true);
    
    // Client-side: update with localStorage data after mount
    console.log('PlatformList - category:', category);
    const connectedPlatforms = loadConnectedPlatforms();
    const categoryPlatforms = samplePlatforms
      .filter((p) => {
        const matches = p.category === category;
        if (matches) {
          console.log(`Platform ${p.id}: category=${p.category}, matches=${matches}`);
        }
        return matches;
      })
      .map((p) => ({
        ...p,
        connected: connectedPlatforms[p.id]?.connected || false,
        apiKey: connectedPlatforms[p.id]?.apiKey,
      }));
    console.log('PlatformList - filtered platforms for category', category, ':', categoryPlatforms.map(p => `${p.id} (${p.category})`));
    setPlatforms(categoryPlatforms);
  }, [category]);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);

  // Save connected platforms to localStorage
  const saveConnectedPlatforms = (platformId: string, connected: boolean, apiKey?: string) => {
    try {
      const current = loadConnectedPlatforms();
      if (connected) {
        current[platformId] = { connected: true, apiKey };
      } else {
        delete current[platformId];
      }
      localStorage.setItem('connected_platforms', JSON.stringify(current));
    } catch (err) {
      console.error('Error saving connected platforms:', err);
    }
  };

  async function handleConnect(platform: Platform) {
    const wc = await getWalletConnect();
    if (!wc.isWalletConnected()) {
      alert('Please connect your wallet first!');
      return;
    }

    setSelectedPlatform(platform);
    setShowConnectModal(true);
  }

  async function handleDisconnect(platformId: string) {
    setPlatforms((prev) =>
      prev.map((p) => (p.id === platformId ? { ...p, connected: false, apiKey: undefined } : p))
    );
    saveConnectedPlatforms(platformId, false);
    alert('Platform disconnected successfully!');
  }

  function handleRequestAccess() {
    setShowRequestModal(true);
  }

  // Determine title based on category
  const title = 
    category === 'video' ? 'Video Platforms' :
    category === 'audio' ? 'Audio Platforms' :
    category === 'learn' ? 'Learning Platforms' :
    category === 'entertainment' ? 'Entertainment & Games' :
    'Platforms';
  
  // Ensure consistent rendering between server and client
  const connectedCount = platforms.filter((p) => p.connected).length;
  const platformCount = platforms.length;
  
  return (
    <div className="space-y-4" suppressHydrationWarning>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400" suppressHydrationWarning>
            {mounted ? `${connectedCount} of ${platformCount} platforms connected` : `${platformCount} platforms available`}
          </p>
        </div>
        <button
          onClick={handleRequestAccess}
          className="rounded-xl border-2 border-blue-500 bg-white px-5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm transition-all hover:bg-blue-50 hover:shadow-md hover:scale-105 active:scale-95 dark:border-blue-400 dark:bg-zinc-800 dark:text-blue-400 dark:hover:bg-blue-900/20"
        >
          + Request New Platform
        </button>
      </div>

      {/* Platform Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" suppressHydrationWarning>
        {platforms.length === 0 ? (
          <div className="col-span-full rounded-lg border border-zinc-200 bg-zinc-50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-800/50">
            <p className="text-zinc-600 dark:text-zinc-400">
              No platforms available in this category yet.
            </p>
            <button
              onClick={handleRequestAccess}
              className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
              Request Platform
            </button>
          </div>
        ) : (
          platforms.map((platform) => (
            <div
              key={platform.id}
              onClick={(e) => {
                if (platform.connected) {
                  // Navigate to player page when platform is connected
                  e.preventDefault();
                  e.stopPropagation();
                  router.push(`/player?platform=${platform.id}`);
                }
              }}
              className={`group relative overflow-hidden rounded-2xl border p-6 shadow-sm transition-all duration-300 ${
                platform.connected
                  ? 'cursor-pointer border-green-200 bg-gradient-to-br from-green-50/80 to-white hover:shadow-xl hover:-translate-y-1 dark:border-green-800 dark:from-green-900/10 dark:to-zinc-900'
                  : 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
              }`}
            >
            <div className="mb-4 flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 shadow-sm dark:from-blue-900/20 dark:to-cyan-900/20 dark:text-blue-400">
                {platform.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                  {platform.name}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                  {platform.description}
                </p>
              </div>
            </div>

            <div className="mb-4">
              {platform.connected ? (
                <div className="rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-3 shadow-sm dark:border-green-800 dark:from-green-900/20 dark:to-emerald-900/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                      <span className="text-xs text-white">✓</span>
                    </div>
                    <span className="text-sm font-semibold text-green-800 dark:text-green-200">
                      Wallet Connected
                    </span>
                  </div>
                  {platform.apiKey && (
                    <div className="mt-2 rounded-lg bg-white/60 p-2 backdrop-blur-sm dark:bg-zinc-800/60">
                      <div className="text-xs font-mono text-green-700 dark:text-green-300">
                        API: {platform.apiKey.slice(0, 12)}...
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-100/50 p-3 dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-800/50">
                  <div className="flex items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-zinc-300 dark:border-zinc-600">
                      <span className="text-xs text-zinc-400">○</span>
                    </div>
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Not Connected</span>
                  </div>
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
                    Connect your wallet to start using this platform
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {platform.connected ? (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      router.push(`/player?platform=${platform.id}`);
                    }}
                    className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-blue-600 hover:to-cyan-600 hover:shadow-xl hover:scale-105 active:scale-95"
                  >
                    Start Using
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleDisconnect(platform.id);
                    }}
                    className="rounded-xl border-2 border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition-all hover:bg-red-50 hover:border-red-300 hover:shadow-md active:scale-95 dark:border-red-800 dark:bg-zinc-800 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    Disconnect
                  </button>
                </>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleConnect(platform);
                  }}
                  className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-blue-600 hover:to-cyan-600 hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
          ))
        )}
      </div>

      {/* Connect Modal */}
      {showConnectModal && selectedPlatform && (
        <ConnectPlatformModal
          platform={selectedPlatform}
          onClose={() => {
            setShowConnectModal(false);
            setSelectedPlatform(null);
          }}
          onSuccess={(apiKey) => {
            setPlatforms((prev) =>
              prev.map((p) =>
                p.id === selectedPlatform.id ? { ...p, connected: true, apiKey } : p
              )
            );
            saveConnectedPlatforms(selectedPlatform.id, true, apiKey);
            setShowConnectModal(false);
            setSelectedPlatform(null);
          }}
        />
      )}

      {/* Request Access Modal */}
      {showRequestModal && (
        <RequestPlatformModal
          onClose={() => setShowRequestModal(false)}
          onSuccess={() => {
            setShowRequestModal(false);
            alert('Request submitted! We will review and contact you soon.');
          }}
        />
      )}
    </div>
  );
}

// Connect Platform Modal
function ConnectPlatformModal({
  platform,
  onClose,
  onSuccess,
}: {
  platform: Platform;
  onClose: () => void;
  onSuccess: (apiKey: string) => void;
}) {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleConnect() {
    setLoading(true);
    try {
      // TODO: Implement actual connection logic
      // For now, simulate API key generation
      const generatedKey = `pk_${Math.random().toString(36).substring(2, 15)}`;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSuccess(generatedKey);
    } catch (err) {
      alert('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Connect to {platform.name}
          </h3>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            ×
          </button>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100">
            API Key (Optional)
          </label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key or leave empty for auto-connect"
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
            If you have an API key, enter it. Otherwise, we'll generate one for you.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          >
            Cancel
          </button>
          <button
            onClick={handleConnect}
            disabled={loading}
            className="flex-1 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Connecting...' : 'Connect'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Request Platform Modal
function RequestPlatformModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    platformName: '',
    platformUrl: '',
    category: 'video' as 'video' | 'audio' | 'learn',
    description: '',
    requestType: 'introduce' as 'introduce' | 'api' | 'developer',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: Implement actual submission logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSuccess();
    } catch (err) {
      alert('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-lg border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Request Platform Access
          </h3>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Request Type
            </label>
            <select
              value={formData.requestType}
              onChange={(e) =>
                setFormData({ ...formData, requestType: e.target.value as any })
              }
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            >
              <option value="introduce">Introduce Our Service to Platform</option>
              <option value="api">Request API Access</option>
              <option value="developer">Request Developer Account</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Platform Name
            </label>
            <input
              type="text"
              value={formData.platformName}
              onChange={(e) => setFormData({ ...formData, platformName: e.target.value })}
              placeholder="e.g., Netflix, Spotify"
              required
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Platform URL
            </label>
            <input
              type="url"
              value={formData.platformUrl}
              onChange={(e) => setFormData({ ...formData, platformUrl: e.target.value })}
              placeholder="https://..."
              required
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            >
              <option value="video">Video</option>
              <option value="audio">Audio</option>
              <option value="learn">Learning</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the platform and why you want to connect..."
              rows={3}
              required
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Your Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              required
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
