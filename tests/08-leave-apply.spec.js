
const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { LeavePage } = require('../pages/LeavePage');

test('TC08 - Apply Leave', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const leavePage = new LeavePage(page);

    console.log('Step 1: Opening OrangeHRM');

    await loginPage.navigate();

    console.log('Step 2: Logging in');

    await loginPage.login('Admin', 'admin123');

    console.log('Login successful');

    console.log('Step 3: Applying for leave');

    await leavePage.navigateToApplyLeave();

    await leavePage.applyLeave();

    console.log('TC08 PASSED');
});
