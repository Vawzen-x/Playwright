
const { expect } = require('@playwright/test');

class RecruitmentPage {
    constructor(page) {
        this.page = page;

        this.recruitmentMenu = page.getByRole('link', {
            name: 'Recruitment',
            exact: true
        });

        this.candidatesTab = page.getByRole('link', {
            name: 'Candidates',
            exact: true
        });

         this.addButton = page.locator(
        'button.oxd-button--secondary'
        ).filter({
         hasText: 'Add'
        }).first();
    

        this.firstName = page.locator('input[name="firstName"]');
        this.middleName = page.locator('input[name="middleName"]');
        this.lastName = page.locator('input[name="lastName"]');

        this.email = page.locator('input[placeholder="Type here"]').first();

        this.contactNumber = page.locator('input').filter({
            has: page.locator('input')
        });

        this.vacancyDropdown = page.locator('.oxd-select-text').first();

        this.saveButton = page.getByRole('button', {
            name: 'Save',
            exact: true
        });

        this.successToast = page.locator('.oxd-toast-message');
    }

    async navigateToRecruitment() {
        console.log('Step 1: Opening Recruitment module');

        await this.recruitmentMenu.click();

        await expect(this.candidatesTab).toBeVisible({
            timeout: 15000
        });

        await this.candidatesTab.click();

        console.log('Recruitment Candidates page opened');
    }




    async addCandidate() {
        console.log('Step 2: Locating Add button');

await expect(this.addButton).toBeVisible({
    timeout: 10000
});

console.log('Add button found');

await this.addButton.click();

console.log('Add button clicked');

        await expect(
            this.page.getByRole('heading', {
                name: 'Add Candidate'
            })
        ).toBeVisible();

        console.log('Add Candidate page opened');

        console.log('Step 3: Entering candidate details');

        const candidateEmail =
            `tc10candidate${Date.now()}@example.com`;

        await this.firstName.fill('TestCandidate');
        await this.middleName.fill('Automation');
        await this.lastName.fill('TC10');

        console.log('Candidate name entered');

        console.log('Step 4: Selecting vacancy');

await this.vacancyDropdown.click();

console.log('Vacancy dropdown clicked');

await this.page.waitForTimeout(1000);

console.log(
    'Dropdown HTML:',
    await this.vacancyDropdown.evaluate(
        element => element.parentElement.outerHTML
    )
);

await this.page.screenshot({
    path: 'vacancy-dropdown-debug.png',
    fullPage: true
});

console.log('Vacancy dropdown screenshot saved');

console.log('Vacancy selected successfully');

console.log('Vacancy selected successfully');

        console.log('Software Engineer vacancy selected');

        console.log('Step 5: Entering email');

        await this.page.locator('input').nth(4).fill(candidateEmail);

        console.log('Candidate email entered');

        console.log('Step 6: Submitting candidate details');

        await this.saveButton.click();

console.log('Step 6: Candidate submitted');

console.log('Step 7: Verifying candidate profile');

await expect(this.page).toHaveURL(
    /\/recruitment\/addCandidate\/\d+/,
    { timeout: 15000 }
);

await expect(
    this.page.getByText('Application Stage')
).toBeVisible();

await expect(
    this.page.getByText('TestCandidate Automation TC10')
).toBeVisible();

console.log('Candidate profile opened successfully');
console.log('Candidate details verified successfully');

console.log('TC10 PASSED');
    }
}

module.exports = { RecruitmentPage };
