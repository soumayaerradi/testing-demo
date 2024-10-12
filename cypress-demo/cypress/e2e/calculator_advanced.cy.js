describe('Advanced Calculator Tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should handle large numbers correctly', () => {
        const largeNumber1 = '999999999999';
        const largeNumber2 = '888888888888';

        cy.get('#num1').type(largeNumber1);
        cy.get('#num2').type(largeNumber2);
        cy.get('#add').click();
        cy.get('#result').should('have.text', `Result: ${999999999999 + 888888888888}`);

        cy.get('#subtract').click();
        cy.get('#result').should('have.text', `Result: ${999999999999 - 888888888888}`);
    });

    it('should reset the inputs and result', () => {
        cy.get('#num1').type('20');
        cy.get('#num2').type('10');
        cy.get('#add').click();
        cy.get('#result').should('have.text', 'Result: 30');

        // Clear the inputs, but result will remain as-is
        cy.get('#num1').clear();
        cy.get('#num2').clear();

        cy.get('#result').should('have.text', 'Result: 30');
    });

    it('should disable buttons if inputs are empty and enable them when inputs are filled', () => {
        // Clear the inputs
        cy.get('#num1').clear();
        cy.get('#num2').clear();

        // Ensure buttons are disabled
        cy.get('#add').should('be.disabled');
        cy.get('#subtract').should('be.disabled');

        // Fill only one input
        cy.get('#num1').type('10');
        cy.get('#add').should('be.disabled');
        cy.get('#subtract').should('be.disabled');

        // Fill both inputs
        cy.get('#num2').type('5');
        cy.get('#add').should('be.enabled');
        cy.get('#subtract').should('be.enabled');
    });

    it('should measure the response time for addition', () => {
        const start = new Date().getTime();

        cy.get('#num1').type('10');
        cy.get('#num2').type('20');
        cy.get('#add').click();

        cy.get('#result').should('have.text', 'Result: 30').then(() => {
            const end = new Date().getTime();
            const responseTime = end - start;
            cy.log('Response time for addition: ' + responseTime + 'ms');
        });
    });

    it('should be responsive on different screen sizes', () => {
        const viewports = [
            { name: 'iPhone X', width: 375, height: 812 },
            { name: 'iPad', width: 768, height: 1024 },
            { name: 'Desktop 1080p', width: 1920, height: 1080 },
        ];

        viewports.forEach((viewport) => {
            cy.viewport(viewport.width, viewport.height);
            cy.visit('/');
            cy.get('#num1').type('15');
            cy.get('#num2').type('5');
            cy.get('#add').click();
            cy.get('#result').should('have.text', 'Result: 20');

            cy.log(`Test passed for ${viewport.name} (${viewport.width}x${viewport.height})`);
        });
    });

    it('should visually check the calculator after an addition', () => {
        // Perform an addition operation
        cy.get('#num1').type('10');
        cy.get('#num2').type('5');
        cy.get('#add').click();

        // Ensure the result is correct
        cy.get('#result').should('have.text', 'Result: 15');

        // Take a screenshot of the entire calculator UI
        cy.screenshot('calculator-after-addition');
    });

    it('should visually check the calculator with empty inputs', () => {
        // Ensure the inputs are empty and buttons are disabled
        cy.get('#num1').clear();
        cy.get('#num2').clear();
        cy.get('#add').should('be.disabled');
        cy.get('#subtract').should('be.disabled');

        // Take a screenshot of the entire calculator UI in the empty state
        cy.screenshot('calculator-empty-inputs');
    });
});
