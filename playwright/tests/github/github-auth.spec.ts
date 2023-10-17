import { expect, test } from '@playwright/test';

test.describe('Group 1', () => {
  test.use({ storageState: './auth_github.json' });
  test('Git Hub Auth', async ({ page }) => {
    await page.goto('https://github.com/microsoft/playwright');
    await expect(page.getByRole('link', { name: 'Sign in' })).not.toBeVisible();
  });
});

test.describe('Group 2', () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  test('Git Hub no Auth', async ({ page }) => {
    await page.goto('https://github.com/microsoft/playwright');
    await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();
  });
});
