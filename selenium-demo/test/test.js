const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function testCalculator() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000');
        await driver.findElement(By.id('num1')).sendKeys('10');
        await driver.findElement(By.id('num2')).sendKeys('5');
        await driver.findElement(By.id('add')).click();
        let result = await driver.findElement(By.id('result')).getText();
        assert.strictEqual(result, 'Result: 15', 'Addition Test Failed');

        await driver.findElement(By.id('subtract')).click();
        result = await driver.findElement(By.id('result')).getText();
        assert.strictEqual(result, 'Result: 5', 'Subtraction Test Failed');

        console.log('All tests passed!');
    } catch (error) {
        console.error('Test Failed:', error.message);
    } finally {
        await driver.quit();
    }
}

testCalculator();


//
//
// const { Builder, By, Key, until } = require('selenium-webdriver');
// const assert = require('assert');
//
// async function testCalculator() {
//     let driver = await new Builder().forBrowser('chrome').build();
//     try {
//         await driver.get('http://localhost:3000');
//
//         // Slow down the execution by waiting for 2 seconds
//         await driver.sleep(2000);
//
//         await driver.findElement(By.id('num1')).sendKeys('10');
//         await driver.sleep(2000);
//         await driver.findElement(By.id('num2')).sendKeys('5');
//         await driver.sleep(2000);
//         await driver.findElement(By.id('add')).click();
//         await driver.sleep(2000);
//         let result = await driver.findElement(By.id('result')).getText();
//         assert.strictEqual(result, 'Result: 15', 'Addition Test Failed');
//         await driver.sleep(2000);
//
//         await driver.findElement(By.id('subtract')).click();
//         await driver.sleep(2000);
//         result = await driver.findElement(By.id('result')).getText();
//         assert.strictEqual(result, 'Result: 5', 'Subtraction Test Failed');
//         await driver.sleep(2000);
//
//         console.log('All tests passed!');
//     } catch (error) {
//         console.error('Test Failed:', error.message);
//     } finally {
//         await driver.quit();
//     }
// }
//
// testCalculator();
