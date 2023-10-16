import { test, expect } from '@playwright/test';

test('Empty Songs', async ({ page }) => {
  await page.route('http://localhost:8081/songs', async (route) => {
    route.fulfill({
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
  });

  await page.goto('http://localhost:8080');
  var element = page.getByText('No slot content defined.');
  expect(element !== undefined).toBeTruthy();
});

test('Validate last song', async ({ page }) => {
  await page.route('http://localhost:8081/songs', async (route) => {
    route.fulfill({
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      path: './tests/data/songs.json',
    });
  });

  await page.goto('http://localhost:8080');
  await expect(
    page.locator('.song').last().locator('.song-title')
  ).toContainText('Drop it BBBB');
});

test('Validate edit song', async ({ page }) => {
  await page.route('http://localhost:8081/songs/*', async (route) => {
    route.fulfill({
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      path: './tests/data/song.json',
    });
  });

  await page.goto('http://localhost:8080');
  await page.locator('.song').nth(0).locator('a').click();
  await expect(page.locator('.song-title')).toContainText('Drop it BBBB');
});
