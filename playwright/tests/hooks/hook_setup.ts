import { test as setup } from '@playwright/test';

setup('Init DB', async ({ request }, testInfo) => {
  console.log('Pre-conditions ' + testInfo.title);
  if (testInfo.title.indexOf('song')) {
    await request.get('http://localhost:8081/reset');
  }
});
