import { chromium, type FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const response_reset = await context.request.get(
    'http://localhost:8081/reset'
  );
  await page.waitForTimeout(500);
  console.log(response_reset.status(), await response_reset.text());

  const response_resgister = await context.request.post(
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

  await browser.close();
}

export default globalSetup;
