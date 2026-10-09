import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import details from "../testdata/orangehrm_testdata/userdetails.json"

const appUsername = process.env.APP_USERNAME || 'Admin';
const appPassword = process.env.APP_PASSWORD || 'admin123';

test.describe.configure({ mode: 'serial' });

async function login(page) {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).fill(appUsername);
  await page.getByRole('textbox', { name: 'Password' }).fill(appPassword);
  await page.getByRole('button', { name: 'Login' }).click();
}

test('Login with valid details', async ({ page }) => {
  await login(page);
  await expect(page).toHaveURL(/\/dashboard\//, { timeout: 30000 });
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 30000 });
});


test('Login with Valid username and invalid password', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).fill(appUsername);
  await page.getByRole('textbox', { name: 'Password' }).fill('Admin123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('alert')).toBeVisible({ timeout: 30000 });

});


test('Login with inValid username and valid password', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admiiin');
  await page.getByRole('textbox', { name: 'Password' }).fill(appPassword);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('alert')).toBeVisible({ timeout: 30000 });
});



test('Add employee page is visible', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill(appUsername);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(appPassword);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'PIM' })).toBeVisible();
  await page.getByRole('link', { name: 'PIM' }).click();
  await page.getByRole('button', { name: ' Add' }).click();
  await expect(page.getByText('Add EmployeeAccepts jpg, .png')).toBeVisible();
});



test('Create Employee', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill(appUsername);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(appPassword);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'PIM' }).click();
  await page.getByRole('button', { name: ' Add' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'First Name' }).fill('SHASHANK');
  await page.getByRole('textbox', { name: 'Last Name' }).click();
  await page.getByRole('textbox', { name: 'Last Name' }).fill('R');
  await page.getByRole('textbox').nth(4).click();
  await page.getByRole('textbox').nth(4).fill(faker.string.numeric(7));
  await page.getByRole('button', { name: 'Save' }).click();
  
});


test('Create a buzz post', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill(appUsername);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(appPassword);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Buzz' }).click();
  await page.getByRole('textbox', { name: 'What\'s on your mind?' }).click();
  await page.getByRole('textbox', { name: 'What\'s on your mind?' }).fill('Hi Hello');
  await page.getByRole('button', { name: 'Post', exact: true }).click();
});




test('Change name in myinfo', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill(appUsername);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(appPassword);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'My Info' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'First Name' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'First Name' }).fill('ALEX');
  await page.locator('form').filter({ hasText: 'Employee Full NameEmployee' }).getByRole('button').click();
  await expect(page.getByText('Personal DetailsEmployee Full')).toBeVisible();
});




test('Search Using Employee Id', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill(appUsername);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(appPassword);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'PIM' }).click();
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('textbox').nth(2).fill('0522666925');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.locator('.orangehrm-container')).toBeVisible();
});


