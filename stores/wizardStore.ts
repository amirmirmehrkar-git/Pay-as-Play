/**
 * Zustand store for Integration Wizard state management
 * Handles wizard step navigation and form data persistence
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type PlatformType = 'video' | 'audio' | 'learn' | 'entertainment' | null;

export interface ApiKeyData {
  apiKey: string;
  apiKeyId: string;
  platformId: string;
  keyName: 'Production Key' | 'Development Key';
  createdAt: string;
}

export interface WizardState {
  currentStep: number;
  platformType: PlatformType;
  platformName: string;
  platformDescription: string;
  platformId: string | null; // From Step 1 API call
  apiKeyData: ApiKeyData | null; // From Step 3 API call
  errors: {
    platformType?: string;
    platformName?: string;
  };
  // Actions
  setCurrentStep: (step: number) => void;
  setPlatformType: (type: PlatformType) => void;
  setPlatformName: (name: string) => void;
  setPlatformDescription: (description: string) => void;
  setPlatformId: (id: string | null) => void;
  setApiKeyData: (data: ApiKeyData | null) => void;
  setError: (field: 'platformType' | 'platformName', message: string | undefined) => void;
  clearErrors: () => void;
  reset: () => void;
  validateStep1: () => boolean;
  validateStep3: () => boolean; // Check if API key is generated
}

const initialState = {
  currentStep: 1,
  platformType: null as PlatformType,
  platformName: '',
  platformDescription: '',
  platformId: null as string | null,
  apiKeyData: null as ApiKeyData | null,
  errors: {} as WizardState['errors'],
};

export const useWizardStore = create<WizardState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCurrentStep: (step: number) => {
        set({ currentStep: step });
      },

      setPlatformType: (type: PlatformType) => {
        set({ platformType: type });
        // Clear error when type is selected
        if (type) {
          set((state) => ({
            errors: { ...state.errors, platformType: undefined },
          }));
        }
      },

      setPlatformName: (name: string) => {
        set({ platformName: name });
        // Clear error when name is valid
        if (name.length >= 2 && name.length <= 50) {
          set((state) => ({
            errors: { ...state.errors, platformName: undefined },
          }));
        }
      },

      setPlatformDescription: (description: string) => {
        set({ platformDescription: description });
      },

      setPlatformId: (id: string | null) => {
        set({ platformId: id });
      },

      setApiKeyData: (data: ApiKeyData | null) => {
        set({ apiKeyData: data });
      },

      setError: (field: 'platformType' | 'platformName', message: string | undefined) => {
        set((state) => ({
          errors: { ...state.errors, [field]: message },
        }));
      },

      clearErrors: () => {
        set({ errors: {} });
      },

      reset: () => {
        set(initialState);
      },

      validateStep1: () => {
        const state = get();
        const errors: WizardState['errors'] = {};

        if (!state.platformType) {
          errors.platformType = 'Please select a platform type';
        }

        if (!state.platformName || state.platformName.length < 2) {
          errors.platformName = 'Platform name must be at least 2 characters';
        } else if (state.platformName.length > 50) {
          errors.platformName = 'Platform name must be at most 50 characters';
        }

        set({ errors });
        return Object.keys(errors).length === 0;
      },

      validateStep3: () => {
        const state = get();
        return state.apiKeyData !== null;
      },
    }),
    {
      name: 'integration-wizard-storage',
      storage: typeof window !== 'undefined' ? createJSONStorage(() => localStorage) : undefined,
      // Only persist step 1 data (not API key for security)
      partialize: (state) => ({
        platformType: state.platformType,
        platformName: state.platformName,
        platformDescription: state.platformDescription,
        platformId: state.platformId,
        // Note: apiKeyData is NOT persisted for security reasons
      }),
    }
  )
);

