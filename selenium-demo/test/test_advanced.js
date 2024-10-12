const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');
const chrome = require('selenium-webdriver/chrome'); // Import chrome options

async function takeScreenshot(driver, testName) {
    if (!fs.existsSync('./screenshots')) {
        fs.mkdirSync('./screenshots');
    }
    let screenshot = await driver.takeScreenshot();
    fs.writeFileSync(`./screenshots/${testName}.png`, screenshot, 'base64');
}

async function testCalculator() {
    let driver;

    try {
        // Set Chrome options for headless mode
        let chromeOptions = new chrome.Options();
        // chromeOptions.addArguments('headless'); // Use addArguments to enable headless mode

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(chromeOptions) // Apply chrome options
            .build();

        await driver.get('http://localhost:3000');

        // Wait for the inputs to be visible
        await driver.wait(until.elementLocated(By.id('num1')), 5000);
        await driver.wait(until.elementLocated(By.id('num2')), 5000);
        await driver.wait(until.elementLocated(By.id('add')), 5000);
        await driver.wait(until.elementLocated(By.id('subtract')), 5000);

        // Parameterized input test cases
        const testCases = [
            { num1: '10', num2: '5', expectedAdd: 'Result: 15', expectedSubtract: 'Result: 5' },
            { num1: '20', num2: '10', expectedAdd: 'Result: 30', expectedSubtract: 'Result: 10' },
            { num1: '-5', num2: '5', expectedAdd: 'Result: 0', expectedSubtract: 'Result: -10' },
        ];

        for (let test of testCases) {
            await driver.findElement(By.id('num1')).clear();
            await driver.findElement(By.id('num2')).clear();

            await driver.findElement(By.id('num1')).sendKeys(test.num1);
            await driver.findElement(By.id('num2')).sendKeys(test.num2);

            // Test Addition
            await driver.findElement(By.id('add')).click();
            let result = await driver.findElement(By.id('result')).getText();
            assert.strictEqual(result, test.expectedAdd, 'Addition Test Failed');
            console.log(`Addition test passed for ${test.num1} + ${test.num2}`);

            // Test Subtraction
            await driver.findElement(By.id('subtract')).click();
            result = await driver.findElement(By.id('result')).getText();
            assert.strictEqual(result, test.expectedSubtract, 'Subtraction Test Failed');
            console.log(`Subtraction test passed for ${test.num1} - ${test.num2}`);
        }

        console.log('All tests passed!');
    } catch (error) {
        console.error('Test Failed:', error.message);
        if (driver) {
            await takeScreenshot(driver, 'testCalculator');
        }
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}

testCalculator();
