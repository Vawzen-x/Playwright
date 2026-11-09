const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/LoginPage');

test('TC01 - Login with valid credentials', async ({ page }) => {

    const login = new LoginPage(page);

    await login.navigate();

    await login.login('Admin', 'admin123');

    await expect(page).toHaveURL(/dashboard/);

    await expect(
        page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();

});

test('TC02 - Login with invalid credentials', async ({ page }) => {

    const login = new LoginPage(page);

    await login.navigate();

    await login.login('InvalidUser', 'WrongPassword');

    await expect(login.errorMessage).toBeVisible();

});