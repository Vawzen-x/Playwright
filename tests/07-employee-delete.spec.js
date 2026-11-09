
const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { PIMPage } = require('../pages/PIMPage');

test('TC07 - Delete an Employee', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const pimPage = new PIMPage(page);

    console.log('Step 1: Opening OrangeHRM');

    await loginPage.navigate();

    console.log('Step 2: Logging in');

    await loginPage.login('Admin', 'admin123');

    console.log('Login successful');

    console.log('Step 3: Deleting temporary employee');

    const uniqueName = `Delete${Date.now()}`;

    await pimPage.deleteEmployee(
        uniqueName,
        'Test',
        'User'
    );

    console.log('TC07 PASSED');
});
