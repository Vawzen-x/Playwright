const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({

    testDir: './tests',

    timeout: 60000,

    expect: {
        timeout: 10000
    },

    fullyParallel: false,

    retries: 1,

    reporter: [
        ['list'],
        ['html', { open: 'never' }]
    ],

    use: {
        baseURL: 'https://opensource-demo.orangehrmlive.com',
        browserName: 'chromium',
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure'
    }

});