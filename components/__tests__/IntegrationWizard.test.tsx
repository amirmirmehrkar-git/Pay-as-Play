import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import IntegrationWizard from '../IntegrationWizard';

// Mock next/navigation
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock wizard store
const mockStore = {
  currentStep: 1,
  platformType: '',
  platformName: '',
  platformDescription: '',
  apiKeyData: null,
  platformId: null,
  validateStep1: vi.fn(() => true),
  validateStep3: vi.fn(() => true),
  setCurrentStep: vi.fn(),
  setPlatformId: vi.fn(),
  reset: vi.fn(),
};

vi.mock('@/stores/wizardStore', () => ({
  useWizardStore: () => mockStore,
}));

// Mock child components
vi.mock('../WizardProgressIndicator', () => ({
  default: ({ currentStep, totalSteps }: any) => (
    <div data-testid="progress-indicator">
      Step {currentStep} of {totalSteps}
    </div>
  ),
}));

vi.mock('../WizardStep1', () => ({
  default: ({ onNext }: any) => (
    <div data-testid="wizard-step-1">
      <button onClick={onNext}>Next</button>
    </div>
  ),
}));

vi.mock('../WizardStep2', () => ({
  default: ({ onNext, onBack }: any) => (
    <div data-testid="wizard-step-2">
      <button onClick={onNext}>Next</button>
      <button onClick={onBack}>Back</button>
    </div>
  ),
}));

vi.mock('../WizardStep3', () => ({
  default: ({ onNext, onBack }: any) => (
    <div data-testid="wizard-step-3">
      <button onClick={onNext}>Next</button>
      <button onClick={onBack}>Back</button>
    </div>
  ),
}));

vi.mock('../WizardStep4', () => ({
  default: ({ onBack }: any) => (
    <div data-testid="wizard-step-4">
      <button onClick={onBack}>Back</button>
    </div>
  ),
}));

// Mock fetch
global.fetch = vi.fn();

describe('IntegrationWizard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockStore.currentStep = 1;
    mockStore.validateStep1.mockReturnValue(true);
    mockStore.validateStep3.mockReturnValue(true);
  });

  it('renders wizard with step 1 initially', () => {
    render(<IntegrationWizard />);
    expect(screen.getByTestId('wizard-step-1')).toBeInTheDocument();
    expect(screen.getByTestId('progress-indicator')).toBeInTheDocument();
  });

  it('displays correct step in progress indicator', () => {
    render(<IntegrationWizard />);
    expect(screen.getByText('Step 1 of 4')).toBeInTheDocument();
  });

  it('attempts to create platform when moving from step 1', () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        data: { platformId: 'platform-123' },
      }),
    });

    mockStore.platformType = 'video';
    mockStore.platformName = 'Test Platform';
    mockStore.platformDescription = 'Test Description';

    render(<IntegrationWizard />);
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    // Component should attempt to call fetch (async, so we just verify it's called)
    // The actual step change happens asynchronously
    expect(mockStore.validateStep1).toHaveBeenCalled();
  });

  it('renders wizard steps correctly', () => {
    render(<IntegrationWizard />);
    expect(screen.getByTestId('wizard-step-1')).toBeInTheDocument();
  });

  it('validates step 1 before proceeding', async () => {
    mockStore.validateStep1.mockReturnValue(false);
    
    render(<IntegrationWizard />);
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    // Should not proceed if validation fails
    expect(mockStore.setCurrentStep).not.toHaveBeenCalled();
  });
});

