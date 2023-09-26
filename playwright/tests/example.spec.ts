import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://192.168.1.45:8080/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('TabTracker');
});

test('Validate login page', async ({ page }) => {
  await page.goto('http://192.168.1.45:8080/');

  await page.click('#btn-login');

  // Expects page to have a heading with the name of Installation.
  await expect(page.locator('div.container div.toolbar__title')).toHaveText(
    'Login'
  );
});
