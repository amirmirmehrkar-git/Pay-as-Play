'use client';

/**
 * Progress indicator component for Integration Wizard
 * Shows current step and completion status
 */

interface WizardProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function WizardProgressIndicator({
  currentStep,
  totalSteps,
}: WizardProgressIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          const isCompleted = step < currentStep;
          const isActive = step === currentStep;
          const isUpcoming = step > currentStep;

          return (
            <div key={step} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                    isCompleted
                      ? 'border-green-500 bg-green-500 text-white'
                      : isActive
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-zinc-200 bg-white text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800'
                  }`}
                  aria-label={`Step ${step}${isCompleted ? ' completed' : isActive ? ' active' : ''}`}
                >
                  {isCompleted ? (
                    <span className="text-sm font-bold">✓</span>
                  ) : (
                    <span className="text-sm font-bold">{step}</span>
                  )}
                </div>
                <span
                  className={`mt-2 text-xs font-semibold ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400'
                      : isCompleted
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-zinc-400 dark:text-zinc-500'
                  }`}
                >
                  Step {step}
                </span>
              </div>

              {/* Connector Line */}
              {step < totalSteps && (
                <div
                  className={`mx-2 h-0.5 flex-1 transition-all ${
                    isCompleted
                      ? 'bg-green-500'
                      : isActive
                        ? 'bg-blue-500'
                        : 'bg-zinc-200 dark:bg-zinc-700'
                  }`}
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Counter */}
      <div className="mt-4 text-center">
        <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );
}

