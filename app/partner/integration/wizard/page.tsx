import IntegrationWizard from '@/components/IntegrationWizard';

export const metadata = {
  title: 'Integration Wizard - Pay as Play',
  description: 'Set up your platform integration with Pay as Play',
};

export default function IntegrationWizardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
          Platform Integration Wizard
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Follow these simple steps to integrate your platform with Pay as Play
        </p>
      </div>

      <IntegrationWizard />
    </div>
  );
}

