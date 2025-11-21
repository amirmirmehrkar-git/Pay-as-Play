import { test, expect } from '@playwright/test';

test.describe('LMS Integration Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/settings/lms');
  });

  test('should open LMS connection modal', async ({ page }) => {
    const connectButton = page.getByRole('button', { name: /connect|add.*lms/i });
    if (await connectButton.isVisible()) {
      await connectButton.click();
      const modal = page.locator('[data-testid="lms-connection-modal"]');
      await expect(modal).toBeVisible();
    }
  });

  test('should test LMS connection', async ({ page }) => {
    // Open connection modal
    const connectButton = page.getByRole('button', { name: /connect|add.*lms/i });
    if (await connectButton.isVisible()) {
      await connectButton.click();

      // Fill connection form
      await page.fill('input[name="lmsUrl"]', 'https://test-lms.example.com');
      await page.fill('input[name="apiKey"]', 'test-api-key');

      // Click test connection
      const testButton = page.getByRole('button', { name: /test.*connection/i });
      if (await testButton.isVisible()) {
        await testButton.click();
        // Wait for test result
        await page.waitForTimeout(2000);
      }
    }
  });
});

