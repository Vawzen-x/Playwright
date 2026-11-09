class DashboardPage {

    constructor(page) {

        this.page = page;

        // Dashboard heading
        this.dashboardHeading = page.getByRole('heading', {
            name: 'Dashboard'
        });

        // Navigation menus
        this.pimMenu = page.getByRole('link', {
            name: 'PIM'
        });

        this.leaveMenu = page.getByRole('link', {
            name: 'Leave'
        });

        this.recruitmentMenu = page.getByRole('link', {
            name: 'Recruitment'
        });

        this.adminMenu = page.getByRole('link', {
            name: 'Admin'
        });

    }

    async verifyDashboard() {

        await this.dashboardHeading.waitFor({
            state: 'visible'
        });

    }

    async navigateToPIM() {

        await this.pimMenu.click();

    }

    async navigateToLeave() {

        await this.leaveMenu.click();

    }

    async navigateToRecruitment() {

        await this.recruitmentMenu.click();

    }

    async navigateToAdmin() {

        await this.adminMenu.click();

    }

}

module.exports = { DashboardPage };