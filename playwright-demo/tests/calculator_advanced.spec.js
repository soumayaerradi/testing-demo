const { test, expect, devices } = require('@playwright/test');

// Reuse shared page context for multiple tests
let sharedPage;

test.describe('Advanced Calculator Tests', () => {
    test.describe.configure({ mode: 'parallel' }); // Run tests in parallel for speed

    // Use this beforeEach to start the page for each test
    test.beforeEach(async ({ page }) => {
        sharedPage = page;
        await sharedPage.goto("http://localhost:3000");
    });

    // Edge case test: handle large numbers
    test('should handle large number addition', async () => {
        await sharedPage.fill('#num1', '999999999');
        await sharedPage.fill('#num2', '888888888');
        await sharedPage.click('#add');
        const result = await sharedPage.innerText('#result');
        expect(result).toBe('Result: 1888888887');  // Check the large number sum
    });

    // Edge case test: handle negative numbers
    test('should handle negative numbers in subtraction', async () => {
        await sharedPage.fill('#num1', '10');
        await sharedPage.fill('#num2', '-5');
        await sharedPage.click('#subtract');
        const result = await sharedPage.innerText('#result');
        expect(result).toBe('Result: 15');  // Negative number subtraction result
    });

    // Test for empty inputs and button states
    test('should disable buttons when inputs are empty', async () => {
        // Manually trigger input events after clearing the inputs
        await sharedPage.evaluate(() => {
            document.getElementById('num1').value = '';
            document.getElementById('num2').value = '';
            document.getElementById('num1').dispatchEvent(new Event('input'));
            document.getElementById('num2').dispatchEvent(new Event('input'));
        });

        // Check if buttons are disabled
        const isAddDisabled = await sharedPage.isDisabled('#add');
        const isSubtractDisabled = await sharedPage.isDisabled('#subtract');

        expect(isAddDisabled).toBeTruthy();
        expect(isSubtractDisabled).toBeTruthy();
    });

    // Responsiveness test: mobile view on iPhone 11 (avoid running on Firefox)
    test.describe('iPhone 11 Screen Tests', () => {
        // This skips the entire "iPhone 11 screen" test group when running in Firefox
        test.skip(({ browserName }) => browserName === 'firefox', 'Mobile emulation is not supported on Firefox.');

        test('should display correctly on iPhone 11 screen', async ({ browser }) => {
            const iPhone = devices['iPhone 11'];
            const context = await browser.newContext({
                ...iPhone,
            });
            const mobilePage = await context.newPage();
            await mobilePage.goto("http://localhost:3000");

            // Perform an addition on mobile
            await mobilePage.fill('#num1', '5');
            await mobilePage.fill('#num2', '10');
            await mobilePage.click('#add');
            const result = await mobilePage.innerText('#result');
            expect(result).toBe('Result: 15');  // Check mobile addition result

            await context.close(); // Close the mobile context
        });
    });

    // Automatic screenshot on failure
    test('should take a screenshot on failure', async () => {
        await sharedPage.fill('#num1', '10');
        await sharedPage.fill('#num2', '5');
        await sharedPage.click('#add');

        try {
            const result = await sharedPage.innerText('#result');
            expect(result).toBe('Result: 15');  // Adjusted the expected result
        } catch (error) {
            await sharedPage.screenshot({ path: 'screenshots/failure_addition.png' });
            throw error;  // Rethrow error after taking screenshot
        }
    });
});
