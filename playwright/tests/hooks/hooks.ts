import { test } from '@playwright/test';

test.beforeEach('Before Each', async ({ request }, testInfo) => {
  console.log('Pre-conditions ' + testInfo.title);
  if (test.info().title.indexOf('T1')) {
    await request.get('http://localhost:8081/reset');
  } else if (test.info().title.indexOf('T2')) {
  }
});

test.afterEach('After Each', async ({}, testInfo) => {
  console.log('Post-condition ' + testInfo.title);
});
