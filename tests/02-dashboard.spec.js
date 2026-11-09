const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');

test('TC03 - Verify Dashboard and Navigation', async ({ page }) => {

    const login = new LoginPage(page);

    const dashboard = new DashboardPage(page);

    // Step 1: Open OrangeHRM
    await login.navigate();

    // Step 2: Login
    await login.login('Admin', 'admin123');

    // Step 3: Verify Dashboard
    await dashboard.verifyDashboard();

    // Step 4: Verify navigation menus
    await expect(dashboard.pimMenu).toBeVisible();

    await expect(dashboard.leaveMenu).toBeVisible();

    await expect(dashboard.recruitmentMenu).toBeVisible();

    await expect(dashboard.adminMenu).toBeVisible();

    // Step 5: Navigate to PIM
    await dashboard.navigateToPIM();

    // Step 6: Verify PIM page URL
    await expect(page).toHaveURL(/pim/);

    // Step 7: Verify PIM heading
    await expect(
        page.getByRole('heading', { name: 'PIM' })
    ).toBeVisible();

});