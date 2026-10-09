import { test, expect } from '@playwright/test';
import details from '../testdata/swaglabs_testdata/user.json';

async function login(page, username) {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(details.login.password);
  await page.locator('[data-test="login-button"]').click();
}

test('login with standard_user username', async ({ page }) => {
  await login(page, details.login.users.standard);
  await expect(page).toHaveURL(/\/inventory\.html/, { timeout: 30000 });
  await expect(page.locator('[data-test="inventory-container"]')).toBeVisible({ timeout: 30000 });
});

test('login with locked_out_user username', async ({ page }) => {
  await login(page, details.login.users.lockedOut);
  await expect(page.locator('[data-test="error"]')).toBeVisible({ timeout: 30000 });
});

test('login with problem_user username', async ({ page }) => {
  await login(page, details.login.users.problem);
  await expect(page).toHaveURL(/\/inventory\.html/, { timeout: 30000 });
  await expect(page.locator('[data-test="secondary-header"]')).toBeVisible({ timeout: 30000 });
  await expect(page.locator('[data-test="inventory-container"]')).toBeVisible({ timeout: 30000 });
});

test('login with performance_glitch_user username', async ({ page }) => {
  test.setTimeout(60000);
  await login(page, details.login.users.performanceGlitch);
  await expect(page).toHaveURL(/\/inventory\.html/, { timeout: 60000 });
  await expect(page.locator('[data-test="secondary-header"]')).toBeVisible({ timeout: 60000 });
  await expect(page.locator('[data-test="inventory-container"]')).toBeVisible({ timeout: 60000 });
});

test('login with error_user username', async ({ page }) => {
  await login(page, details.login.users.error);
  await expect(page).toHaveURL(/\/inventory\.html/, { timeout: 30000 });
  await expect(page.locator('[data-test="secondary-header"]')).toBeVisible({ timeout: 30000 });
  await expect(page.locator('[data-test="inventory-container"]')).toBeVisible({ timeout: 30000 });
});

test('login with visual_user username', async ({ page }) => {
  await login(page, details.login.users.visual);
  await expect(page).toHaveURL(/\/inventory\.html/, { timeout: 30000 });
  await expect(page.locator('[data-test="secondary-header"]')).toBeVisible({ timeout: 30000 });
  await expect(page.locator('[data-test="inventory-container"]')).toBeVisible({ timeout: 30000 });
});