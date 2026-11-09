
const { expect } = require('@playwright/test');

class LeavePage {
    constructor(page) {
        this.page = page;

        this.leaveMenu = page.getByRole('link', {
            name: 'Leave',
            exact: true
        });

        this.applyTab = page.getByRole('link', {
            name: 'Apply',
            exact: true
        });

        this.leaveType = page.locator(
            '.oxd-select-text'
        ).first();

        this.fromDate = page.locator(
            'input[placeholder="yyyy-dd-mm"]'
        ).first();

        this.toDate = page.locator(
            'input[placeholder="yyyy-dd-mm"]'
        ).nth(1);

        this.comments = page.locator(
            'textarea'
        );

        this.applyButton = page.getByRole('button', {
            name: 'Apply',
            exact: true
        });
    }

    async navigateToApplyLeave() {
        console.log('Step 1: Opening Leave module');

        await this.leaveMenu.click();

        await expect(this.applyTab).toBeVisible();

        await this.applyTab.click();

        await expect(
            this.page.getByRole('heading', {
                name: 'Apply Leave'
            })
        ).toBeVisible();

        console.log('Apply Leave page opened');
    }

    async applyLeave() {
        console.log('Step 2: Selecting leave type');

        await this.leaveType.click();

        await this.page.getByRole('option', {
            name: 'CAN - Personal'
        }).click();

        console.log('Leave type selected');

        console.log('Step 3: Entering leave dates');

        // Date format: YYYY-MM-DD
        await this.fromDate.fill('2026-11-12');
        await this.toDate.fill('2026-11-13');

        console.log('From Date: 2026-11-12');
        console.log('To Date: 2026-11-13');

        console.log('Step 4: Adding comments');

        await this.comments.fill(
            'TC08 - Leave application test'
        );

        console.log('Step 5: Submitting leave application');

        await this.applyButton.click();

        console.log('Leave application submitted');

        console.log('Step 6: Verifying application');

        await this.page.getByRole('link', {
            name: 'My Leave',
            exact: true
        }).click();

        await expect(
            this.page.getByText(
                'TC08 - Leave application test',
                { exact: true }
            )
        ).toBeVisible({ timeout: 15000 });

        const leaveRow = this.page
            .locator('.oxd-table-row')
            .filter({
                hasText: 'TC08 - Leave application test'
            });

        await expect(leaveRow).toContainText(
            'Pending Approval'
        );

        console.log('TC08 PASSED - Leave application verified');
    }




    
    // Cancel leave application - TC09
    
    // Cancel leave application - TC09
    async cancelLeaveApplication() {

        console.log('Step 1: Opening Leave module');

        await this.leaveMenu.click();

        await this.page.waitForURL('**/leave/viewLeaveList');

        console.log('Leave module opened');

        console.log('Step 2: Opening My Leave');

        const myLeaveTab = this.page.getByRole('link', {
            name: 'My Leave',
            exact: true
        });

        await expect(myLeaveTab).toBeVisible({
            timeout: 15000
        });

        await myLeaveTab.click();

        console.log('My Leave page opened');

        console.log('Step 3: Locating TC08 application');

        const leaveRow = this.page
            .locator('.oxd-table-row')
            .filter({
                hasText: 'TC08 - Leave application test'
            });

        await expect(leaveRow).toBeVisible({
            timeout: 15000
        });

        await expect(leaveRow).toContainText(
            'Pending Approval'
        );

        console.log('Leave application found');

        console.log('Step 4: Clicking Cancel');

        await leaveRow.getByRole('button', {
            name: 'Cancel',
            exact: true
        }).click();

        console.log('Step 5: Verifying cancellation');

        await expect(leaveRow).toContainText(
            'Cancelled',
            { timeout: 15000 }
        );

        console.log('Leave application cancelled successfully');
        console.log('TC09 PASSED');
    }

}

module.exports = { LeavePage };
