const { chromium } = require('playwright');

describe('Simple Calculator', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await chromium.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:3000');
    });

    afterAll(async () => {
        await browser.close();
    });

    it('should add two numbers correctly', async () => {
        await page.fill('#num1', '10');
        await page.fill('#num2', '5');
        await page.click('#add');
        const result = await page.textContent('#result');
        expect(result).toBe('Result: 15');
    });

    it('should subtract two numbers correctly', async () => {
        await page.fill('#num1', '10');
        await page.fill('#num2', '5');
        await page.click('#subtract');
        const result = await page.textContent('#result');
        expect(result).toBe('Result: 5');
    });
});
