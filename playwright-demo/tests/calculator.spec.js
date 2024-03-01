const { test, expect } = require('@playwright/test');

let sharedPage;

test.describe.configure({ mode: "serial" });

test.beforeEach(async ({ page }) => {
    sharedPage = page;
    await sharedPage.goto("http://localhost:3000");
});

test.afterAll(async ({}) => {
    await sharedPage.close();
});

test('Simple Calculator - Addition', async () => {
    await sharedPage.fill('#num1', '10');
    await sharedPage.fill('#num2', '5');
    await sharedPage.click('#add');
    const result = await sharedPage.innerText('#result');
    expect(result).toBe('Result: 15');
});

test('Simple Calculator - Subtraction', async () => {
    await sharedPage.fill('#num1', '10');
    await sharedPage.fill('#num2', '5');
    await sharedPage.click('#subtract');
    const result = await sharedPage.innerText('#result');
    expect(result).toBe('Result: 5');
});
