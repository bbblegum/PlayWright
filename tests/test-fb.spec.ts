import { test } from '@playwright/test';

test('face', async ({ page }) => {
  await page.goto('https://www.facebook.com/');

  await page.locator('//*[@id="_R_64qjbjb9pb6amH1_"]').fill('email@email.com');
  await page.locator('//*[@id="_R_66qjbjb9pb6amH1_"]').fill('password');
  await page.getByRole('button', { name: 'Log In' }).click();

  await page.screenshot({ path: 'screenshot.png' });
  await page.pause();
});
