
class LoginPage {

    constructor(page) {

        this.page = page;

        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');

        this.loginButton = page.getByRole('button', {
            name: 'Login'
        });
    }

    async navigate() {

        await this.page.goto(
            'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
        );
    }

    async login(username, password) {

        await this.username.fill(username);
        await this.password.fill(password);

        await this.loginButton.click();

        await this.page.waitForURL('**/dashboard/index');
    }
}

module.exports = { LoginPage };
