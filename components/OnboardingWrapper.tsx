'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import OnboardingFlow from './OnboardingFlow';

export default function OnboardingWrapper({ children }: { children: React.ReactNode }) {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Don't show onboarding on certain pages
    const skipPages = ['/player', '/summary', '/test'];
    if (skipPages.some((page) => pathname.startsWith(page))) {
      return;
    }

    // Check if user has completed onboarding
    try {
      const hasCompleted = localStorage.getItem('onboarding_completed');
      if (!hasCompleted) {
        setShowOnboarding(true);
      }
    } catch (err) {
      // localStorage may not be available (e.g., private mode)
      console.error('localStorage access error:', err);
    }
  }, [pathname]);

  if (showOnboarding) {
    return <OnboardingFlow />;
  }

  return <>{children}</>;
}

