import { test, expect } from '@playwright/test';

async function login(page, username, password = 'secret_sauce') {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
}

test('login with standard_user username', async ({ page }) => {
  await login(page, 'standard_user');
  await expect(page.locator('[data-test="inventory-container"]')).toBeVisible({ timeout: 20000 });
});

test('login with locked_out_user username', async ({ page }) => {
  await login(page, 'locked_out_user');
  await expect(page.locator('[data-test="error"]')).toBeVisible({ timeout: 20000 });
});

test('login with problem_user username', async ({ page }) => {
  await login(page, 'problem_user');
  await expect(page).toHaveURL(/\/inventory\.html/, { timeout: 20000 });
  await expect(page.locator('[data-test="secondary-header"]')).toBeVisible({ timeout: 20000 });
  await expect(page.locator('[data-test="inventory-container"]')).toBeVisible({ timeout: 20000 });
});

test('login with performance_glitch_user username', async ({ page }) => {
  await login(page, 'performance_glitch_user');
  await expect(page).toHaveURL(/\/inventory\.html/, { timeout: 20000 });
  await expect(page.locator('[data-test="secondary-header"]')).toBeVisible({ timeout: 20000 });
  await expect(page.locator('[data-test="inventory-container"]')).toBeVisible({ timeout: 20000 });
});

test('login with error_user username', async ({ page }) => {
  await login(page, 'error_user');
  await expect(page).toHaveURL(/\/inventory\.html/, { timeout: 20000 });
  await expect(page.locator('[data-test="secondary-header"]')).toBeVisible({ timeout: 20000 });
  await expect(page.locator('[data-test="inventory-container"]')).toBeVisible({ timeout: 20000 });
});

test('login with visual_user username', async ({ page }) => {
  await login(page, 'visual_user');
  await expect(page).toHaveURL(/\/inventory\.html/, { timeout: 20000 });
  await expect(page.locator('[data-test="secondary-header"]')).toBeVisible({ timeout: 20000 });
  await expect(page.locator('[data-test="inventory-container"]')).toBeVisible({ timeout: 20000 });
});


