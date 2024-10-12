const { devices } = require('@playwright/test');

const config = {
    testDir: './tests',
    timeout: 30000, // Set a default timeout for each test
    retries: 0, // You can change the number of retries on test failure
    use: {
        baseURL: 'http://localhost:3000',
        headless: false, // Set to false if you want to see the browser during test
        screenshot: 'only-on-failure', // Take screenshots on failure
        video: 'retain-on-failure', // Record video for failed tests
    },
    projects: [
        // Default Chromium Project
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'], // Default to Desktop Chrome
            },
        },
        // Firefox Project for cross-browser tests
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
            },
        },
        // WebKit (Safari) Project for cross-browser tests
        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari'],
            },
        },
    ],
    // Optionally, you can configure a web server to run before tests
    webServer: {
        command: 'npm start',
        port: 3000,
        reuseExistingServer: !process.env.CI,
    },
    outputDir: 'test-results/', // Where to store test results
};

module.exports = config;
