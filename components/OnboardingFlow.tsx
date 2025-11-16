'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WalletConnect from './WalletConnect';

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Transparency',
    description: 'See exactly what you pay for, every second of consumption is tracked and displayed in real-time.',
    icon: '🔍',
    color: 'blue',
  },
  {
    id: 2,
    title: 'Fairness',
    description: 'Pay only for what you actually consume. No subscriptions, no wasted money, no hidden fees.',
    icon: '⚖️',
    color: 'green',
  },
  {
    id: 3,
    title: 'Wallet Connection',
    description: 'Connect your Algorand wallet to start. Top up with fiat or crypto and enjoy seamless payments.',
    icon: '💰',
    color: 'purple',
  },
];

export default function OnboardingFlow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSignIn, setShowSignIn] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user has already completed onboarding
    try {
      const hasCompletedOnboarding = localStorage.getItem('onboarding_completed');
      if (hasCompletedOnboarding === 'true') {
        router.push('/');
        return;
      }
    } catch (err) {
      // localStorage may not be available (e.g., private mode)
      console.error('localStorage access error:', err);
    }
  }, [router]);

  function handleNext() {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setShowSignIn(true);
    }
  }

  function handleSkip() {
    setShowSignIn(true);
  }

  function handleSignInMethod(method: 'email' | 'google' | 'wallet') {
    if (method === 'wallet') {
      // Wallet connection will be handled by WalletConnect component
      return;
    }
    // TODO: Implement email and Google sign-in
    console.log('Sign in method:', method);
    // For now, just mark onboarding as completed
    completeOnboarding();
  }

  function completeOnboarding() {
    try {
      localStorage.setItem('onboarding_completed', 'true');
      router.push('/');
    } catch (err) {
      // localStorage may not be available (e.g., private mode)
      console.error('localStorage access error:', err);
      // Still navigate even if localStorage fails
      router.push('/');
    }
  }

  function handleWalletConnect(address: string) {
    setWalletAddress(address);
    completeOnboarding();
  }

  // Handle Escape key to close sign-in modal
  useEffect(() => {
    if (!showSignIn) return;

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setShowSignIn(false);
        setCurrentSlide(0);
      }
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showSignIn]);

  if (showSignIn) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
        <div className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Get Started
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Choose your sign-in method to continue
            </p>
          </div>

          <div className="space-y-3">
            {/* Wallet Connect */}
            <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
              <WalletConnect
                onConnect={handleWalletConnect}
                onDisconnect={() => setWalletAddress(null)}
              />
            </div>

            {/* Email Sign-in (Placeholder) */}
            <button
              onClick={() => handleSignInMethod('email')}
              aria-label="Sign in with email"
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
            >
              📧 Continue with Email
            </button>

            {/* Google Sign-in (Placeholder) */}
            <button
              onClick={() => handleSignInMethod('google')}
              aria-label="Sign in with Google"
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
            >
              🔵 Continue with Google
            </button>
          </div>

          <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    );
  }

  const slide = slides[currentSlide];
  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
      <div className="w-full max-w-md px-6">
        {/* Logo/Title */}
        <div className="mb-8 text-center">
          <div className="mb-4 text-6xl">🎬</div>
          <h1 className="mb-2 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            Play and Pay
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Pay-as-you-watch micro-payments
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
            <span>Step {currentSlide + 1} of {slides.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
            <div
              className={`h-full transition-all duration-300 ${
                slide.color === 'blue'
                  ? 'bg-blue-500'
                  : slide.color === 'green'
                  ? 'bg-green-500'
                  : 'bg-purple-500'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Slide Content */}
        <div className="mb-8 text-center">
          <div className="mb-6 text-8xl">{slide.icon}</div>
          <h2 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {slide.title}
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            {slide.description}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            onClick={handleSkip}
            className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
          >
            Skip
          </button>
          <button
            onClick={handleNext}
            aria-label={currentSlide === slides.length - 1 ? 'Get started' : 'Next slide'}
            className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors ${
              slide.color === 'blue'
                ? 'bg-blue-500 hover:bg-blue-600'
                : slide.color === 'green'
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-purple-500 hover:bg-purple-600'
            }`}
          >
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="mt-6 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentSlide
                  ? slide.color === 'blue'
                    ? 'bg-blue-500 w-8'
                    : slide.color === 'green'
                    ? 'bg-green-500 w-8'
                    : 'bg-purple-500 w-8'
                  : 'bg-zinc-300 dark:bg-zinc-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

