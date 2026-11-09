const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { PIMPage } = require('../pages/PIMPage');
console.log('LoginPage:', typeof LoginPage);
console.log('PIMPage:', typeof PIMPage);

test('TC05 - Search Employee', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const pimPage = new PIMPage(page);

    console.log('Step 1: Opening OrangeHRM');

    await loginPage.navigate();

    console.log('Step 2: Logging in');

    await loginPage.login('Admin', 'admin123');

    console.log('Login successful');

    console.log('Step 3: Navigating to Employee List');

    await pimPage.navigateToEmployeeList();

    console.log('Step 4: Searching employee');

    await pimPage.searchEmployee(
        'Shree',
        'Shree Charan KR' 
    );

    console.log('TC05 PASSED');

});