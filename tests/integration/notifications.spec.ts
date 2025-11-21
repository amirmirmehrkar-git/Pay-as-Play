import { test, expect } from '@playwright/test';

test.describe('Notification Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open notification center', async ({ page }) => {
    const notificationBell = page.getByLabel(/notifications|bell/i);
    await notificationBell.click();

    const notificationCenter = page.locator('[data-testid="notification-center"]');
    await expect(notificationCenter).toBeVisible();
  });

  test('should display notifications', async ({ page }) => {
    // Open notification center
    const notificationBell = page.getByLabel(/notifications|bell/i);
    await notificationBell.click();

    // Check if notifications are displayed
    const notifications = page.locator('[data-testid="notification-item"]');
    await expect(notifications.first()).toBeVisible();
  });

  test('should mark notification as read', async ({ page }) => {
    // Open notification center
    const notificationBell = page.getByLabel(/notifications|bell/i);
    await notificationBell.click();

    // Click on a notification
    const firstNotification = page.locator('[data-testid="notification-item"]').first();
    await firstNotification.click();

    // Check if notification is marked as read
    await expect(firstNotification).toHaveClass(/read|opacity/);
  });

  test('should navigate to notification settings', async ({ page }) => {
    // Open notification center
    const notificationBell = page.getByLabel(/notifications|bell/i);
    await notificationBell.click();

    // Look for settings link
    const settingsLink = page.getByRole('link', { name: /settings/i });
    if (await settingsLink.isVisible()) {
      await settingsLink.click();
      await expect(page).toHaveURL(/.*settings.*notification/i);
    }
  });
});

