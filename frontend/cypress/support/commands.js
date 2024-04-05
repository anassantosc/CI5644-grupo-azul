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

Cypress.Commands.add('generateSignupFixture', () => {
  const { faker } = require("@faker-js/faker");

  cy.writeFile('cypress/fixtures/signup.json', {
    'username': faker.internet.displayName(),
    'password': faker.internet.password({ length: 12 }),
    'name': faker.person.fullName(),
    'email': faker.internet.email(),
    'gender': faker.person.gender()
  });
});