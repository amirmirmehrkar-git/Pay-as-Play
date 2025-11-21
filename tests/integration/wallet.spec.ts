import { test, expect } from '@playwright/test';

test.describe('Wallet Management Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/wallet');
  });

  test('should display wallet balance', async ({ page }) => {
    // Check if balance is displayed
    const balance = page.locator('[data-testid="wallet-balance"]');
    await expect(balance).toBeVisible();
  });

  test('should show low balance warning when balance is low', async ({ page }) => {
    // Mock low balance response
    await page.route('**/api/wallet/balance', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: {
            balance: 5.50,
            currency: 'EUR',
            status: 'warning',
          },
        }),
      });
    });

    await page.reload();
    const warning = page.locator('[data-testid="low-balance-warning"]');
    await expect(warning).toBeVisible();
  });

  test('should navigate to top-up page', async ({ page }) => {
    const topUpButton = page.getByRole('button', { name: /top.*up|add.*funds/i });
    if (await topUpButton.isVisible()) {
      await topUpButton.click();
      await expect(page).toHaveURL(/.*top.*up|.*add.*funds/i);
    }
  });

  test('should navigate to withdrawal page', async ({ page }) => {
    const withdrawButton = page.getByRole('link', { name: /withdraw/i });
    if (await withdrawButton.isVisible()) {
      await withdrawButton.click();
      await expect(page).toHaveURL(/.*withdraw/i);
    }
  });
});

