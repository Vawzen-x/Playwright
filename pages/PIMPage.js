
const { expect } = require('@playwright/test');

class PIMPage {

    constructor(page) {

        this.page = page;

        // Success notification
        this.successToast = page.locator('.oxd-toast-message');

        // PIM menu
        this.pimMenu = page.getByRole('link', {
            name: 'PIM',
            exact: true
        });

        // Add Employee navigation link
        this.addEmployeeLink = page.getByRole('link', {
            name: 'Add Employee',
            exact: true
        });

        // Employee form fields
        this.firstName = page.locator('input[name="firstName"]');
        this.middleName = page.locator('input[name="middleName"]');
        this.lastName = page.locator('input[name="lastName"]');

        // Save button
        this.saveButton = page.getByRole('button', {
            name: 'Save',
            exact: true
        });

        // Personal Details heading
        this.personalDetailsHeading = page.getByRole('heading', {
            name: 'Personal Details'
        });

        // Employee search field
        this.employeeNameSearch = page.getByPlaceholder(
            'Type for hints...'
        ).first();

        // Autocomplete suggestions
        this.employeeSuggestion = page.locator(
            '.oxd-autocomplete-option'
        );

        // Search button
        this.searchButton = page.getByRole('button', {
            name: 'Search',
            exact: true
        });

        // Reset button
        this.resetButton = page.getByRole('button', {
            name: 'Reset',
            exact: true
        });

        // Employee ID search field
        this.employeeIdSearch = page
            .locator('.oxd-form')
            .locator('input')
            .nth(1);
    }


    // Navigate to PIM and Add Employee page
    async navigateToPIM() {

        console.log('Step 1: Clicking PIM menu');

        await this.pimMenu.click();

        await this.page.waitForURL('**/pim/viewEmployeeList');

        console.log('PIM page loaded');

        console.log('Step 2: Clicking Add Employee');

        await this.addEmployeeLink.click();

        await this.page.waitForURL('**/pim/addEmployee');

        await expect(this.firstName).toBeVisible();

        console.log('Add Employee form is ready');
    }


    // Add new employee - TC04
    async addEmployee(first, middle, last) {

        console.log('Step 3: Filling employee details');

        await this.firstName.fill(first);
        await this.middleName.fill(middle);
        await this.lastName.fill(last);

        console.log('First Name:', first);
        console.log('Middle Name:', middle);
        console.log('Last Name:', last);

        console.log('Step 4: Clicking Save');

        await this.saveButton.click();

        await expect(
            this.personalDetailsHeading
        ).toBeVisible();

        console.log('Employee added successfully!');
    }


    // Navigate to Employee List
    async navigateToEmployeeList() {

        console.log('Step 1: Navigating to Employee List');

        await this.pimMenu.click();

        await this.page.waitForURL('**/pim/viewEmployeeList');

        console.log('Employee List page loaded');
    }


    // Search employee - TC05
    async searchEmployee(employeeName, expectedFullName) {

        console.log('Step 1: Searching employee:', employeeName);

        await this.employeeNameSearch.fill(employeeName);

        const suggestion = this.employeeSuggestion
            .filter({ hasText: expectedFullName })
            .first();

        await expect(suggestion).toBeVisible({
            timeout: 15000
        });

        await suggestion.click();

        console.log('Step 2: Employee selected');

        await this.searchButton.click();

        console.log('Step 3: Search button clicked');

        const employeeRow = this.page
            .locator('.oxd-table-row')
            .filter({ hasText: '0435' });

        await expect(employeeRow).toBeVisible({
            timeout: 15000
        });

        await expect(employeeRow).toContainText('Shree Charan');
        await expect(employeeRow).toContainText('KR');

        console.log('TC05 PASSED');
    }


    // View employee details - TC06A
    async viewEmployeeDetails() {

        console.log('Step 1: Navigating to Employee List');

        await this.navigateToEmployeeList();

        console.log('Step 2: Searching for employee');

        await this.employeeNameSearch.fill('Shree');

        const suggestion = this.employeeSuggestion
            .filter({ hasText: 'Shree Charan' })
            .first();

        await expect(suggestion).toBeVisible({
            timeout: 15000
        });

        await suggestion.click();

        console.log('Step 3: Clicking Search');

        await this.searchButton.click();

        const employeeRow = this.page
            .locator('.oxd-table-row')
            .filter({ hasText: '0435' });

        await expect(employeeRow).toBeVisible({
            timeout: 15000
        });

        console.log('Step 4: Opening employee record');

        await employeeRow.getByText('Shree Charan', {
            exact: true
        }).click();

        console.log('Step 5: Verifying Personal Details');

        await expect(this.personalDetailsHeading).toBeVisible({
            timeout: 15000
        });

        console.log('Employee details opened successfully!');
    }


    // Edit employee details - TC06
    async editEmployeeDetails() {

        console.log('Step 1: Navigating to Employee List');

        await this.navigateToEmployeeList();

        console.log('Step 2: Searching by Employee ID 0435');

        await this.employeeIdSearch.fill('0435');
        await this.searchButton.click();

        const employeeRow = this.page
            .locator('.oxd-table-row')
            .filter({ hasText: '0435' });

        await expect(employeeRow).toBeVisible({
            timeout: 15000
        });

        console.log('Step 3: Opening employee details');

        await employeeRow.getByText('0435', {
            exact: true
        }).click();

        await expect(this.personalDetailsHeading).toBeVisible({
            timeout: 15000
        });

        console.log('Step 4: Checking original middle name');

        await expect(this.middleName).toHaveValue('Charan');

        console.log('Original middle name verified');

        console.log('Step 5: Updating middle name to CharanTest');

        await this.middleName.fill('CharanTest');
        await this.saveButton.first().click();

        await this.page.reload();

        await expect(this.personalDetailsHeading).toBeVisible();

        await expect(this.middleName).toHaveValue('CharanTest', {
            timeout: 15000
        });

        console.log('Middle name updated successfully');

        console.log('Step 6: Restoring original middle name');

        await this.middleName.fill('Charan');
        await this.saveButton.first().click();

        await this.page.reload();

        await expect(this.personalDetailsHeading).toBeVisible();

        await expect(this.middleName).toHaveValue('Charan', {
            timeout: 15000
        });

        console.log('Original middle name restored successfully');
        console.log('TC06 PASSED');
    }


    // Delete employee - TC07
    async deleteEmployee(first, middle, last) {

        console.log('Step 1: Creating temporary employee');

        await this.navigateToPIM();

        await this.addEmployee(first, middle, last);

        console.log('Temporary employee created successfully');

        console.log('Step 2: Navigating to Employee List');

        await this.navigateToEmployeeList();

        console.log('Step 3: Searching temporary employee');

        await this.employeeNameSearch.fill(first);

        const suggestion = this.employeeSuggestion
            .filter({ hasText: first })
            .first();

        await expect(suggestion).toBeVisible({
            timeout: 15000
        });

        await suggestion.click();

        await this.searchButton.click();

        console.log('Step 4: Locating employee record');

        const employeeRow = this.page
            .locator('.oxd-table-row')
            .filter({ hasText: first });

        await expect(employeeRow).toBeVisible({
            timeout: 15000
        });

        console.log('Step 5: Clicking Delete');

        const deleteButton = employeeRow
            .locator('.oxd-table-cell-actions')
            .getByRole('button')
            .last();

        await deleteButton.click();

        console.log('Step 6: Confirming deletion');

        
        const confirmDeleteButton = this.page.locator(
        '.orangehrm-modal-footer button.oxd-button--label-danger'
);

        await expect(confirmDeleteButton).toBeVisible({
        timeout: 10000
});

        await confirmDeleteButton.click();

        console.log('Deletion confirmed');


        console.log('Step 7: Verifying employee deletion');

        await expect(employeeRow).toBeHidden({
            timeout: 15000
        });

        console.log('Temporary employee deleted successfully!');
        console.log('TC07 PASSED');
    }

}

module.exports = { PIMPage };
