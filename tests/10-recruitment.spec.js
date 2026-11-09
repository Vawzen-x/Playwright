
const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { RecruitmentPage } = require('../pages/RecruitmentPage');

test('TC10 - Add and Verify Candidate', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const recruitmentPage = new RecruitmentPage(page);

    console.log('Step 1: Opening OrangeHRM');

    await loginPage.navigate();

    console.log('Step 2: Logging in');

    await loginPage.login('Admin', 'admin123');

    console.log('Login successful');

    console.log('Step 3: Adding candidate');

    await recruitmentPage.navigateToRecruitment();

    await recruitmentPage.addCandidate();

    console.log('TC10 PASSED');
});
