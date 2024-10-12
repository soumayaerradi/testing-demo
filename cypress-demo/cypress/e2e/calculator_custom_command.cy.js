describe('Advanced Calculator Tests with Custom Command', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should perform addition using a custom command', () => {
        // Use the custom command to add 10 + 5 and check the result
        cy.performCalculation(10, 5, 'add', 15);
    });

    it('should perform subtraction using a custom command', () => {
        // Use the custom command to subtract 20 - 7 and check the result
        cy.performCalculation(20, 7, 'subtract', 13);
    });

    it('should handle decimal addition using a custom command', () => {
        // Use the custom command to add 10.5 + 5.2 and check the result
        cy.performCalculation(10.5, 5.2, 'add', 15.7);
    });
});
