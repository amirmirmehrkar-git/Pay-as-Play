'use client';

/**
 * Step 1 of Integration Wizard: Platform Selection
 * Allows user to select platform type, name, and description
 */

import { useEffect, useState } from 'react';
import { useWizardStore } from '@/stores/wizardStore';

const platformTypes = [
  {
    id: 'video' as const,
    name: 'Video',
    icon: '🎬',
    description: 'Netflix, YouTube, etc.',
  },
  {
    id: 'audio' as const,
    name: 'Audio',
    icon: '🎵',
    description: 'Spotify, Audible, etc.',
  },
  {
    id: 'learn' as const,
    name: 'Learning',
    icon: '📚',
    description: 'Coursera, Udemy, etc.',
  },
  {
    id: 'entertainment' as const,
    name: 'Games',
    icon: '🎮',
    description: 'Steam, Twitch, etc.',
  },
] as const;

export default function WizardStep1() {
  const {
    platformType,
    platformName,
    platformDescription,
    errors,
    setPlatformType,
    setPlatformName,
    setPlatformDescription,
    setError,
    validateStep1,
  } = useWizardStore();

  const [descriptionLength, setDescriptionLength] = useState(platformDescription.length);

  useEffect(() => {
    setDescriptionLength(platformDescription.length);
  }, [platformDescription]);

  const handlePlatformNameChange = (value: string) => {
    setPlatformName(value);
    // Real-time validation
    if (value.length > 0 && value.length < 2) {
      setError('platformName', 'Platform name must be at least 2 characters');
    } else if (value.length > 50) {
      setError('platformName', 'Platform name must be at most 50 characters');
    } else {
      setError('platformName', undefined);
    }
  };

  const handlePlatformDescriptionChange = (value: string) => {
    if (value.length <= 500) {
      setPlatformDescription(value);
    }
  };

  return (
    <div className="space-y-6">
      {/* Platform Type Selection */}
      <div>
        <label className="mb-4 block text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Select Platform Type <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {platformTypes.map((type) => {
            const isSelected = platformType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setPlatformType(type.id)}
                className={`rounded-xl border-2 p-4 text-left transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-lg dark:border-blue-400 dark:bg-blue-900/20'
                    : 'border-zinc-200 bg-white hover:border-blue-400 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-blue-500'
                }`}
                aria-pressed={isSelected}
                aria-label={`Select ${type.name} platform type`}
              >
                <div className="mb-2 text-3xl">{type.icon}</div>
                <div className="font-semibold text-zinc-900 dark:text-zinc-100">{type.name}</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">{type.description}</div>
              </button>
            );
          })}
        </div>
        {errors.platformType && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.platformType}
          </p>
        )}
      </div>

      {/* Platform Name Input */}
      <div>
        <label
          htmlFor="platform-name"
          className="mb-2 block text-lg font-semibold text-zinc-900 dark:text-zinc-100"
        >
          Platform Name <span className="text-red-500">*</span>
        </label>
        <input
          id="platform-name"
          type="text"
          value={platformName}
          onChange={(e) => handlePlatformNameChange(e.target.value)}
          placeholder="Enter your platform name"
          className={`w-full rounded-xl border-2 px-4 py-3 transition-all ${
            errors.platformName
              ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/20'
              : 'border-zinc-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100'
          }`}
          aria-invalid={!!errors.platformName}
          aria-describedby={errors.platformName ? 'platform-name-error' : undefined}
          maxLength={50}
        />
        {errors.platformName && (
          <p id="platform-name-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.platformName}
          </p>
        )}
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          {platformName.length}/50 characters
        </p>
      </div>

      {/* Platform Description Input */}
      <div>
        <label
          htmlFor="platform-description"
          className="mb-2 block text-lg font-semibold text-zinc-900 dark:text-zinc-100"
        >
          Platform Description <span className="text-zinc-400">(Optional)</span>
        </label>
        <textarea
          id="platform-description"
          value={platformDescription}
          onChange={(e) => handlePlatformDescriptionChange(e.target.value)}
          placeholder="Describe your platform (optional)"
          rows={4}
          className="w-full rounded-xl border-2 border-zinc-200 px-4 py-3 transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-blue-400"
          maxLength={500}
        />
        <div className="mt-1 flex justify-between">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {descriptionLength}/500 characters
          </p>
        </div>
      </div>
    </div>
  );
}

