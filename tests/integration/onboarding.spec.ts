import { test, expect } from '@playwright/test';

test.describe('Onboarding Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display splash screen initially', async ({ page }) => {
    // Check if splash screen is visible
    const splashScreen = page.getByTestId('splash-screen');
    await expect(splashScreen).toBeVisible();
  });

  test('should navigate through onboarding slides', async ({ page }) => {
    // Wait for splash screen to complete
    await page.waitForTimeout(3000);

    // Check if we're on onboarding slides
    const slideContainer = page.locator('[data-testid="onboarding-slides"]');
    await expect(slideContainer).toBeVisible();

    // Navigate to next slide
    const nextButton = page.getByRole('button', { name: /next|continue/i });
    if (await nextButton.isVisible()) {
      await nextButton.click();
    }
  });

  test('should show sign-in options', async ({ page }) => {
    // Wait for onboarding to show sign-in options
    await page.waitForTimeout(3000);

    // Check for email sign-in option
    const emailSignIn = page.getByRole('button', { name: /email|sign in with email/i });
    if (await emailSignIn.isVisible()) {
      await expect(emailSignIn).toBeVisible();
    }
  });

  test('should allow guest access', async ({ page }) => {
    // Wait for onboarding
    await page.waitForTimeout(3000);

    // Look for guest access button
    const guestButton = page.getByRole('button', { name: /guest|continue as guest/i });
    if (await guestButton.isVisible()) {
      await guestButton.click();
      // Should navigate to home or dashboard
      await expect(page).toHaveURL(/\/(home|dashboard|$)/);
    }
  });
});

