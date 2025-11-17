'use client';

/**
 * Integration Success Page
 * Displays success confirmation after completing integration wizard
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWizardStore } from '@/stores/wizardStore';

const DOCS_URL = 'https://docs.playandpay.io';
const SANDBOX_URL = '/partner/sandbox'; // TODO: Update when sandbox is available

const REDIRECT_DELAY = 5; // seconds

export default function IntegrationSuccessPage() {
  const router = useRouter();
  const { platformName, platformType, apiKeyData, reset } = useWizardStore();
  const [countdown, setCountdown] = useState(REDIRECT_DELAY);
  const [autoRedirect, setAutoRedirect] = useState(true);

  // Auto-redirect countdown
  useEffect(() => {
    if (!autoRedirect) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/partner');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [autoRedirect, router]);

  // Reset wizard state after displaying success
  useEffect(() => {
    // Reset wizard state after a delay to allow user to see success page
    const resetTimer = setTimeout(() => {
      reset();
    }, 10000); // Reset after 10 seconds

    return () => clearTimeout(resetTimer);
  }, [reset]);

  const handleViewDashboard = () => {
    router.push('/partner');
  };

  const handleViewDocs = () => {
    window.open(DOCS_URL, '_blank');
  };

  const handleStartTesting = () => {
    router.push(SANDBOX_URL);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  const getPlatformTypeLabel = (type: string | null) => {
    const labels: Record<string, string> = {
      video: 'Video',
      audio: 'Audio',
      learn: 'Learning',
      entertainment: 'Games',
    };
    return labels[type || ''] || 'Unknown';
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 p-4 dark:from-zinc-900 dark:to-zinc-800">
      <div className="w-full max-w-2xl">
        {/* Success Card */}
        <div className="rounded-2xl border-2 border-zinc-200 bg-white p-8 shadow-xl dark:border-zinc-700 dark:bg-zinc-900 sm:p-12">
          {/* Animated Checkmark */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-green-100 dark:bg-green-900/20">
                <svg
                  className="h-24 w-24 text-green-500 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                    className="animate-draw-check"
                    style={{
                      strokeDasharray: 24,
                      strokeDashoffset: 24,
                      animation: 'drawCheck 0.6s ease-in-out 0.3s forwards',
                    }}
                  />
                </svg>
              </div>
              {/* Pulse animation */}
              <div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-20"></div>
            </div>
          </div>

          {/* Success Message */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
              Integration Complete!
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Your platform has been successfully integrated with Pay as Play
            </p>
          </div>

          {/* Integration Summary */}
          <div className="mb-8 space-y-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Integration Summary</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Platform Name */}
              <div className="rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
                <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">Platform Name</div>
                <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {platformName || 'N/A'}
                </div>
              </div>

              {/* Platform Type */}
              <div className="rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
                <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">Platform Type</div>
                <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {getPlatformTypeLabel(platformType)}
                </div>
              </div>

              {/* API Key ID */}
              {apiKeyData && (
                <div className="rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
                  <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">API Key ID</div>
                  <div className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {apiKeyData.apiKeyId}
                  </div>
                </div>
              )}

              {/* Integration Date */}
              {apiKeyData && (
                <div className="rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
                  <div className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                    Integration Date
                  </div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {formatDate(apiKeyData.createdAt)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Next Steps */}
          <div className="mb-6 space-y-3">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Next Steps</h2>
            <button
              onClick={handleViewDashboard}
              className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4 font-semibold text-white transition-all hover:from-blue-600 hover:to-cyan-600 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              View Dashboard
            </button>
            <div className="flex gap-3">
              <button
                onClick={handleViewDocs}
                className="flex-1 rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 font-semibold text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                📚 View Documentation
              </button>
              <button
                onClick={handleStartTesting}
                className="flex-1 rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 font-semibold text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                🧪 Start Testing
              </button>
            </div>
          </div>

          {/* Auto-redirect Notice */}
          {autoRedirect && countdown > 0 && (
            <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-4 text-center dark:border-blue-800 dark:bg-blue-900/20">
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Redirecting to dashboard in <span className="font-bold">{countdown}</span> seconds
              </p>
              <button
                onClick={() => setAutoRedirect(false)}
                className="mt-2 text-sm font-semibold text-blue-600 underline hover:text-blue-700 dark:text-blue-400"
              >
                Stay on this page
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CSS Animation for Checkmark */}
      <style jsx>{`
        @keyframes drawCheck {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}

