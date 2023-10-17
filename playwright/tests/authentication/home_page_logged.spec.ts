import { test, expect } from '@playwright/test';

test.describe('Grupo 1', () => {
  test.use({ storageState: './tab-tracker.auth.json' });
  test('Logged in', async ({ page }) => {
    await page.goto('http://localhost:8080');
    await expect(page.getByText('Log Out')).toBeVisible();
  });
});

test.describe('Grupo 2', () => {
  test.use({ storageState: './tab-tracker.auth.json' });
  test('Logged in - screenshot', async ({ page }) => {
    await page.goto('http://localhost:8080');
    await expect(page).toHaveScreenshot('user-logged-in.png');
    await page.click('#btn-logout');
    await expect(page).toHaveScreenshot('home-logged-out.png');
    await expect(page.locator('.song').nth(0)).toHaveScreenshot('Song_0.png');
    await page.locator('.song a').nth(0).click();
    await expect(page).toHaveScreenshot('nirvana.png');
  });
});
