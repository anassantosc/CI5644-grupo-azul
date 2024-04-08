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
    'username': `${faker.person.firstName()}${faker.person.lastName()}`,
    'password': faker.internet.password({ length: 12 }),
    'name': faker.person.fullName(),
    'email': faker.internet.email(),
    'gender': faker.person.gender()
  });
});

Cypress.Commands.add(
  'login', 
  ({
    visit_homepage
  } = {
    visit_homepage: false
  }) => {
    cy.visit('http://localhost:3000/login');

    /*
      We have some users already register by default in the database so
      we use that user to not depend on the user that is created dynamically 
      for the tests of register
    */
    cy.get('input[name="username"]').type('simonpuyosa');
    cy.get('input[name="password"]').type('alluhakbar');

    // We submit the form
    cy.get('button[type="submit"]').click();

    // We go to the homepage without breaking the flow
    if (visit_homepage) {
      cy.get('#navbar').within(() => {
        cy.get('img[alt="logo"]').parent().click();
      })
    }
  }
);