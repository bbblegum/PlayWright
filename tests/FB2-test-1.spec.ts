import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.facebook.com/');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('button', { name: 'Log In' }).click();
});