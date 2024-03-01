const {devices} = require('@playwright/test');

const playwrightConfig = {
    testDir: "./tests",
    use: {
        actionTimeout: 0,
        baseURL: "http://localhost:3000",
    },
    webServer: [
        {
            command: "npm start",
            url: "http://localhost:3000",
            timeout: 5000,
            reuseExistingServer: true,
        },
    ],
    projects: [
        {
            name: 'chromium',
            use: {...devices['chromium']},
        },
    ],
    outputDir: "test-results",
};

module.exports = playwrightConfig;
