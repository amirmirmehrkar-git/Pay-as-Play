'use client';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export default function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800">
      <div className="w-full max-w-md px-6 text-center">
        <div className="mb-8">
          <div className="mb-4 text-6xl">🎉</div>
          <h1 className="mb-2 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            Welcome to Pay as Play!
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            You're all set to start watching and paying only for what you consume.
          </p>
        </div>

        <div className="mb-8 space-y-4 text-left">
          <div className="flex items-start gap-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-2xl">📺</div>
            <div>
              <h3 className="mb-1 font-semibold text-zinc-900 dark:text-zinc-100">
                Browse Content
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Browse content and start watching. Your balance is shown in the wallet tab.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-2xl">💰</div>
            <div>
              <h3 className="mb-1 font-semibold text-zinc-900 dark:text-zinc-100">
                Manage Your Wallet
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Your balance is shown in the wallet tab. You can top up anytime.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-2xl">⚡</div>
            <div>
              <h3 className="mb-1 font-semibold text-zinc-900 dark:text-zinc-100">
                Pay as You Watch
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                You can top up anytime. Payments are processed in real-time as you watch.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onGetStarted}
          className="w-full rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

