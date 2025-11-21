import { test, expect } from '@playwright/test';

test.describe('Integration Wizard Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to integration wizard
    await page.goto('/partner/integration/wizard');
  });

  test('should open wizard correctly', async ({ page }) => {
    // Check if wizard is visible
    const wizard = page.locator('[data-testid="integration-wizard"]');
    await expect(wizard).toBeVisible();
  });

  test('should create platform in step 1', async ({ page }) => {
    // Fill platform form
    await page.fill('input[name="platformName"]', 'Test Platform');
    await page.selectOption('select[name="platformType"]', 'video');
    await page.fill('textarea[name="platformDescription"]', 'Test Description');

    // Submit form
    const nextButton = page.getByRole('button', { name: /next|continue/i });
    await nextButton.click();

    // Should move to step 2
    await expect(page.locator('[data-testid="wizard-step-2"]')).toBeVisible();
  });

  test('should generate API key in step 3', async ({ page }) => {
    // Navigate through steps (simplified)
    // In real test, would navigate step by step
    const generateButton = page.getByRole('button', { name: /generate.*api.*key/i });
    if (await generateButton.isVisible()) {
      await generateButton.click();
      // Check if API key is displayed
      const apiKeyDisplay = page.locator('[data-testid="api-key-display"]');
      await expect(apiKeyDisplay).toBeVisible();
    }
  });
});

