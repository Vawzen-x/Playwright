
const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { PIMPage } = require('../pages/PIMPage');

test('TC06 - View Employee Details', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const pimPage = new PIMPage(page);

    console.log('Step 1: Opening OrangeHRM');

    await loginPage.navigate();

    console.log('Step 2: Logging in');

    await loginPage.login('Admin', 'admin123');

    console.log('Login successful');

    console.log('Step 3: Viewing employee details');

    await pimPage.viewEmployeeDetails();

    console.log('TC06A PASSED');
});
