
const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/LoginPage');
const { PIMPage } = require('../pages/PIMPage');

test('TC04 - Add a New Employee', async ({ page }) => {

    const login = new LoginPage(page);
    const pim = new PIMPage(page);

    // Step 1: Login
    await login.navigate();
    await login.login('Admin', 'admin123');

    // Step 2: Navigate to PIM and Add Employee
    await pim.navigateToPIM();

    // Step 3: Employee details
    const firstName = 'Shree';
    const middleName = 'Charan';
    const lastName = 'KR';

    // Step 4: Add employee
    await pim.addEmployee(
        firstName,
        middleName,
        lastName
    );

    console.log('TC04 PASSED');
});
