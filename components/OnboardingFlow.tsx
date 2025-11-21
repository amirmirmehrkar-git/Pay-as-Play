'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import WalletConnect from './WalletConnect';
import SplashScreen from './SplashScreen';
import EmailSignIn from './EmailSignIn';
import WelcomeScreen from './WelcomeScreen';

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
    title: 'Transparent Pricing',
    description: 'See exactly what you pay for every minute',
    icon: '🔍',
    color: 'blue',
  },
  {
    id: 2,
    title: 'Fair Payment',
    description: 'Pay only for content you actually watch',
    icon: '⚖️',
    color: 'green',
  },
  {
    id: 3,
    title: 'Connect Your Wallet',
    description: 'Link your Algorand wallet to get started',
    icon: '💰',
    color: 'purple',
  },
];

type OnboardingStep = 'splash' | 'slides' | 'signin' | 'email' | 'wallet' | 'welcome';

export default function OnboardingFlow() {
  const [step, setStep] = useState<OnboardingStep>('splash');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [signInMode, setSignInMode] = useState<'options' | 'email' | 'google' | 'wallet'>('options');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    // Check if user has already completed onboarding
    try {
      const hasCompletedOnboarding = localStorage.getItem('onboarding_completed');
      if (hasCompletedOnboarding === 'true') {
        router.push('/');
        return;
      }
    } catch (err) {
      console.error('localStorage access error:', err);
    }
  }, [router]);

  // Swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < slides.length - 1) {
      handleNext();
    } else if (isRightSwipe && currentSlide > 0) {
      handleBack();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  function handleNext() {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setStep('signin');
      setSignInMode('options');
    }
  }

  function handleBack() {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else if (step === 'signin') {
      setStep('slides');
    } else if (step === 'email') {
      setSignInMode('options');
    }
  }

  function handleSkip() {
    setStep('signin');
    setSignInMode('options');
  }

  async function handleEmailSignIn(email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error?.message || 'Sign in failed');
      }
      // Store token (in production, use secure storage)
      if (result.data.token) {
        localStorage.setItem('auth_token', result.data.token);
      }
      completeOnboarding();
    } catch (err: any) {
      setError(err.message || 'Sign in failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setLoading(true);
    setError(null);
    try {
      // In production, redirect to Google OAuth
      const response = await fetch('/api/auth/google');
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error?.message || 'Google sign in failed');
      }
      // Mock: For now, just complete onboarding
      completeOnboarding();
    } catch (err: any) {
      setError(err.message || 'Google sign in failed');
    } finally {
      setLoading(false);
    }
  }

  function handleSignInMethod(method: 'email' | 'google' | 'wallet' | 'guest') {
    if (method === 'wallet') {
      setSignInMode('wallet');
      return;
    }
    if (method === 'email') {
      setSignInMode('email');
      return;
    }
    if (method === 'google') {
      handleGoogleSignIn();
      return;
    }
    if (method === 'guest') {
      completeOnboarding();
    }
  }

  function completeOnboarding() {
    try {
      localStorage.setItem('onboarding_completed', 'true');
      setStep('welcome');
    } catch (err) {
      console.error('localStorage access error:', err);
      router.push('/');
    }
  }

  function handleWalletConnect(address: string) {
    setWalletAddress(address);
    completeOnboarding();
  }

  function handleGetStarted() {
    router.push('/');
  }

  // Handle Escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (step === 'signin' && signInMode === 'email') {
          setSignInMode('options');
        } else if (step === 'signin') {
          setStep('slides');
        }
      }
    }
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [step, signInMode]);

  // Splash Screen
  if (step === 'splash') {
    return <SplashScreen onComplete={() => setStep('slides')} />;
  }

  // Welcome Screen
  if (step === 'welcome') {
    return <WelcomeScreen onGetStarted={handleGetStarted} />;
  }

  // Sign-in Options
  if (step === 'signin' && signInMode === 'options') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
        <div className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Get Started</h2>
            <p className="text-zinc-600 dark:text-zinc-400">Choose your sign-in method to continue</p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
              {error}
            </div>
          )}

          <div className="space-y-3">
            {/* Wallet Connect */}
            <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
              <WalletConnect
                onConnect={handleWalletConnect}
                onDisconnect={() => setWalletAddress(null)}
              />
            </div>

            {/* Email Sign-in */}
            <button
              onClick={() => handleSignInMethod('email')}
              aria-label="Sign in with email"
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
            >
              📧 Continue with Email
            </button>

            {/* Google Sign-in */}
            <button
              onClick={() => handleSignInMethod('google')}
              aria-label="Sign in with Google"
              disabled={loading}
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
            >
              {loading ? 'Signing in...' : '🔵 Continue with Google'}
            </button>

            {/* Continue as Guest */}
            <button
              onClick={() => handleSignInMethod('guest')}
              aria-label="Continue as guest"
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            >
              Continue as Guest
            </button>
          </div>

          <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>

          <button
            onClick={() => setStep('slides')}
            className="mt-4 w-full text-center text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  // Email Sign-in Form
  if (step === 'signin' && signInMode === 'email') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
        <div className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Sign In</h2>
            <p className="text-zinc-600 dark:text-zinc-400">Enter your email and password</p>
          </div>

          <EmailSignIn
            onSignIn={handleEmailSignIn}
            onSwitchToSignUp={() => {
              // TODO: Implement sign up
              console.log('Switch to sign up');
            }}
            onForgotPassword={() => {
              // TODO: Implement forgot password
              console.log('Forgot password');
            }}
            loading={loading}
            error={error}
          />

          <button
            onClick={() => setSignInMode('options')}
            className="mt-4 w-full text-center text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  // Wallet Setup
  if (step === 'signin' && signInMode === 'wallet') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
        <div className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Connect Wallet</h2>
            <p className="text-zinc-600 dark:text-zinc-400">Connect your Algorand wallet to get started</p>
          </div>

          <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <WalletConnect
              onConnect={handleWalletConnect}
              onDisconnect={() => setWalletAddress(null)}
            />
          </div>

          <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
            You can skip wallet setup for now and top up later
          </p>

          <button
            onClick={() => handleSignInMethod('guest')}
            className="mt-4 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
          >
            Skip for now
          </button>

          <button
            onClick={() => setSignInMode('options')}
            className="mt-2 w-full text-center text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  // Onboarding Slides
  const slide = slides[currentSlide];
  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-full max-w-md px-6">
        {/* Logo/Title */}
        <div className="mb-8 text-center">
          <div className="mb-4 text-6xl">🎬</div>
          <h1 className="mb-2 text-4xl font-bold text-zinc-900 dark:text-zinc-100">Play and Pay</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">Pay-as-you-watch micro-payments</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
            <span>
              Step {currentSlide + 1} of {slides.length}
            </span>
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
          <h2 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-zinc-100">{slide.title}</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">{slide.description}</p>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            onClick={handleSkip}
            className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
          >
            Skip
          </button>
          {currentSlide > 0 && (
            <button
              onClick={handleBack}
              className="rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
            >
              Back
            </button>
          )}
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
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? slide.color === 'blue'
                    ? 'bg-blue-500 w-8'
                    : slide.color === 'green'
                    ? 'bg-green-500 w-8'
                    : 'bg-purple-500 w-8'
                  : 'w-2 bg-zinc-300 dark:bg-zinc-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
