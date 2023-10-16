import { test as teardown } from '@playwright/test';

teardown('Clean DB', async ({ request }, testInfo) => {
  console.log('Post-conditions ' + testInfo.title);
});
