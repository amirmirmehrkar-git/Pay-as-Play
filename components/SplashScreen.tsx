'use client';

import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [fadeIn, setFadeIn] = useState(false);
  const [scale, setScale] = useState(false);

  useEffect(() => {
    // Trigger animations
    setTimeout(() => setFadeIn(true), 100);
    setTimeout(() => setScale(true), 300);

    // Auto-advance after 2-3 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
      <div className="text-center">
        <div
          className={`mb-6 transition-all duration-700 ${
            fadeIn ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className={`inline-block transition-transform duration-500 ${
              scale ? 'scale-100' : 'scale-75'
            }`}
          >
            <div className="text-8xl">🎬</div>
          </div>
        </div>
        <h1
          className={`mb-2 text-4xl font-bold text-zinc-900 transition-all duration-700 dark:text-zinc-100 ${
            fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Play and Pay
        </h1>
        <p
          className={`text-lg text-zinc-600 transition-all duration-700 dark:text-zinc-400 ${
            fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          Pay only for what you watch
        </p>
      </div>
    </div>
  );
}

