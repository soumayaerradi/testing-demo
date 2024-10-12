// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('performCalculation', (num1, num2, operation, expectedResult) => {
    // Type the numbers in the input fields
    cy.get('#num1').clear().type(num1);
    cy.get('#num2').clear().type(num2);

    // Perform the operation (either addition or subtraction)
    if (operation === 'add') {
        cy.get('#add').click();
    } else if (operation === 'subtract') {
        cy.get('#subtract').click();
    }

    // Validate the result
    cy.get('#result').should('have.text', `Result: ${expectedResult}`);
});
