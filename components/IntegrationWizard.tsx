'use client';

/**
 * Main Integration Wizard component
 * Manages wizard flow and step navigation
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWizardStore } from '@/stores/wizardStore';
import WizardProgressIndicator from './WizardProgressIndicator';
import WizardStep1 from './WizardStep1';
import WizardStep2 from './WizardStep2';
import WizardStep3 from './WizardStep3';
import WizardStep4 from './WizardStep4';

const TOTAL_STEPS = 4;

interface IntegrationWizardProps {
  onComplete?: () => void;
  onCancel?: () => void;
}

export default function IntegrationWizard({ onComplete, onCancel }: IntegrationWizardProps) {
  const router = useRouter();
  const {
    currentStep,
    validateStep1,
    validateStep3,
    setCurrentStep,
    setPlatformId,
    reset,
    platformType,
    platformName,
    platformDescription,
    apiKeyData,
    platformId,
  } = useWizardStore();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [isCreatingPlatform, setIsCreatingPlatform] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  // Handle Escape key to close cancel confirmation
  useEffect(() => {
    if (!showCancelConfirm) return;

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setShowCancelConfirm(false);
      }
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showCancelConfirm]);

  const handleNext = async () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        // Create platform before moving to Step 2
        setIsCreatingPlatform(true);
        try {
          const response = await fetch('/api/partner/platforms', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              platformType,
              platformName,
              platformDescription: platformDescription || undefined,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || 'Failed to create platform');
          }

          const data = await response.json();
          if (data.success && data.data?.platformId) {
            setPlatformId(data.data.platformId);
            setCurrentStep(2);
          } else {
            throw new Error('Invalid response from server');
          }
        } catch (err) {
          console.error('Failed to create platform:', err);
          // Show error to user (could be improved with toast notification)
          alert(err instanceof Error ? err.message : 'Failed to create platform. Please try again.');
        } finally {
          setIsCreatingPlatform(false);
        }
      }
    } else if (currentStep === 3) {
      if (validateStep3()) {
        setCurrentStep(4);
      }
    } else if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      // Step 4 - Complete
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCancel = () => {
    setShowCancelConfirm(true);
  };

  const handleCancelConfirm = () => {
    reset();
    setShowCancelConfirm(false);
    if (onCancel) {
      onCancel();
    } else {
      router.push('/partner');
    }
  };

  const handleCancelCancel = () => {
    setShowCancelConfirm(false);
  };

  const handleComplete = async () => {
    if (!platformId || !apiKeyData) {
      console.error('Missing platformId or apiKeyData');
      return;
    }

    setIsCompleting(true);
    try {
      // Save integration status to backend
      const response = await fetch('/api/partner/integrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platformId,
          apiKeyId: apiKeyData.apiKeyId,
          status: 'active',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || 'Failed to save integration');
      }

      // Navigate to success page
      if (onComplete) {
        onComplete();
      } else {
        router.push('/partner/integration/success');
      }
    } catch (err) {
      console.error('Failed to complete integration:', err);
      alert(err instanceof Error ? err.message : 'Failed to complete integration. Please try again.');
    } finally {
      setIsCompleting(false);
    }
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return validateStep1();
    }
    if (currentStep === 3) {
      return validateStep3();
    }
    return true;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <WizardProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      {/* Wizard Content Card */}
      <div className="rounded-2xl border-2 border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-700 dark:bg-zinc-900 sm:p-8">
        {/* Step Content */}
        <div className="mb-8 min-h-[400px]">
          {currentStep === 1 && <WizardStep1 />}
          {currentStep === 2 && <WizardStep2 />}
          {currentStep === 3 && <WizardStep3 />}
          {currentStep === 4 && <WizardStep4 />}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between border-t border-zinc-200 pt-6 dark:border-zinc-700">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="rounded-xl border-2 border-zinc-200 bg-white px-6 py-3 font-semibold text-zinc-600 transition-all hover:bg-zinc-50 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                aria-label="Go to previous step"
              >
                ← Back
              </button>
            )}
            <button
              type="button"
              onClick={handleCancel}
              className="ml-4 rounded-xl border-2 border-red-200 bg-white px-6 py-3 font-semibold text-red-600 transition-all hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:bg-zinc-800 dark:text-red-400 dark:hover:bg-red-900/20"
              aria-label="Cancel integration"
            >
              Cancel
            </button>
          </div>

          <button
            type="button"
            onClick={currentStep === TOTAL_STEPS ? handleComplete : handleNext}
            disabled={!canProceed() || isCreatingPlatform || isCompleting}
            className={`rounded-xl px-8 py-3 font-semibold text-white transition-all ${
              canProceed() && !isCreatingPlatform && !isCompleting
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover:shadow-lg hover:scale-105 active:scale-95'
                : 'cursor-not-allowed bg-zinc-400 opacity-50'
            }`}
            aria-label={currentStep === TOTAL_STEPS ? 'Complete integration' : 'Go to next step'}
          >
            {isCreatingPlatform ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Creating Platform...
              </span>
            ) : isCompleting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Completing Integration...
              </span>
            ) : currentStep === TOTAL_STEPS ? (
              'Complete Integration'
            ) : (
              'Next →'
            )}
          </button>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleCancelCancel}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cancel-dialog-title"
        >
          <div
            className="w-full max-w-md rounded-2xl border-2 border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="cancel-dialog-title" className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Cancel Integration?
            </h3>
            <p className="mb-6 text-zinc-600 dark:text-zinc-400">
              Are you sure? Your progress will be lost.
            </p>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={handleCancelCancel}
                className="rounded-xl border-2 border-zinc-200 bg-white px-6 py-2 font-semibold text-zinc-600 transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
              >
                Stay
              </button>
              <button
                type="button"
                onClick={handleCancelConfirm}
                className="rounded-xl border-2 border-red-200 bg-red-600 px-6 py-2 font-semibold text-white transition-all hover:bg-red-700 dark:border-red-800"
              >
                Cancel Integration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

