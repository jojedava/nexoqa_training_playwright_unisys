import { test as setup, expect } from '@playwright/test';

setup('authentication', async ({ page, request }) => {
  const response_reset = await request.get('http://localhost:8081/reset');
  await page.waitForTimeout(500);
  console.log(response_reset.status(), await response_reset.text());

  const response_resgister = await request.post(
    'http://localhost:8081/register',
    {
      headers: { 'Content-type': 'application/json' },
      data: { email: 'unisys@mienaire.com', password: 'Ab12345678' },
    }
  );
  await page.waitForTimeout(500);
  console.log(response_resgister.status(), await response_resgister.text());

  await page.goto('http://localhost:8080/');
  await page.click('#btn-login');
  await page.fill('input[name="email"]', 'unisys@mienaire.com');
  await page.fill('input[name="password"]', 'Ab12345678');
  await page.click('button[name="loginBtn"]');
  await page.waitForTimeout(1000);
  await page.waitForSelector('#btn-logout');

  await page.context().storageState({ path: 'tab-tracker.auth.json' });
});
