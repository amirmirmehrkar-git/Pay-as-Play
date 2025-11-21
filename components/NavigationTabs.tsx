'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import {
  VideoCameraIcon,
  MusicalNoteIcon,
  BookOpenIcon,
  PuzzlePieceIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';

const tabs = [
  { id: 'watch', label: 'Watch', icon: VideoCameraIcon, href: '/?tab=watch' },
  { id: 'listen', label: 'Listen', icon: MusicalNoteIcon, href: '/?tab=listen' },
  { id: 'learn', label: 'Learn', icon: BookOpenIcon, href: '/?tab=learn' },
  { id: 'entertainment', label: 'Games', icon: PuzzlePieceIcon, href: '/?tab=entertainment' },
  { id: 'wallet', label: 'Wallet', icon: WalletIcon, href: '/wallet' },
];

function NavigationTabsContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTabFromQuery = searchParams?.get('tab') || 'watch';

  const isActive = (tabId: string) => {
    if (tabId === 'wallet') {
      return pathname.startsWith('/wallet');
    }
    return activeTabFromQuery === tabId;
  };

  return (
    <div className="flex items-center gap-1 sm:gap-2 border-b-2 border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-t-xl px-2 sm:px-4 overflow-x-auto">
      {tabs.map((tab) => {
        const active = isActive(tab.id);
        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={`flex items-center gap-2 px-3 sm:px-4 py-3 text-sm font-semibold transition-all whitespace-nowrap ${
              active
                ? 'border-b-3 border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20 rounded-t-lg'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-t-lg'
            }`}
          >
            <tab.icon className={`w-5 h-5 ${active ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-600 dark:text-zinc-400'}`} />
            <span className="hidden sm:inline">{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default function NavigationTabs() {
  return (
    <Suspense fallback={
      <div className="flex items-center gap-1 border-b border-zinc-200 dark:border-zinc-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <div key={tab.id} className="px-4 py-3 text-sm text-zinc-400 flex items-center gap-2">
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </div>
          );
        })}
      </div>
    }>
      <NavigationTabsContent />
    </Suspense>
  );
}

