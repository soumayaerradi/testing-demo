describe('Simple Calculator', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should add two numbers correctly', () => {
        cy.get('#num1').type('10');
        cy.get('#num2').type('5');
        cy.get('#add').click();
        cy.get('#result').should('have.text', 'Result: 15');
    });

    it('should subtract two numbers correctly', () => {
        cy.get('#num1').type('10');
        cy.get('#num2').type('5');
        cy.get('#subtract').click();
        cy.get('#result').should('have.text', 'Result: 5');
    });
});
