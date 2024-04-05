describe("Authentication", () => {
  // We load the page for all tests and preload the fixture for signup
  beforeEach(() => {
    cy.visit('http://localhost:3000/signup');
  });

  before(() => {
    cy.generateSignupFixture();
  });

  it("We can reach Login page", () => {
    cy.visit('http://localhost:3000/');

    // We get the navbar container and then check its contents
    cy.get('#navbar').within(() => {
      // Auth buttons
      cy.get('[aria-label="auth-menu"]').click();
    });

    // Auth menu is generated outside of #navbar scope when clicked
    cy.get('ul[role="menu"]')
      .within(() => {
        cy.get('li').find('p').contains('Login').click();
        cy.url().should('include', '/login');
      });
  });

  it("We can reach Signup page", () => {
    cy.visit('http://localhost:3000/');

    // We get the navbar container and then check its contents
    cy.get('#navbar').within(() => {
      // Auth buttons
      cy.get('[aria-label="auth-menu"]').click();
    });

    // Auth menu is generated outside of #navbar scope when clicked
    cy.get('ul[role="menu"]')
      .within(() => {
        cy.get('li').find('p').contains('Registro').click();
        cy.url().should('include', '/signup');
      });
  });

  it("We can create a user", () => {
  
    // We fill the inputs in the form using the fixture
    cy.fixture('signup').then((signup) => {
      cy.get('input[name="username"]').type(signup.username);
      cy.get('input[name="password"]').type(signup.password);
      cy.get('input[name="confirmPassword"]').type(signup.password);
      cy.get('input[name="name"]').type(signup.name);
      cy.get('input[name="email"]').type(signup.email);
      
      /* 
        Due to UI library, select should be handle different by adapting to that process.

        Also, that disables the ability to use the dynamic value generated, so we will always
        select the value 'Masculino' by default
      */
      cy.get('input[name="gender"]').parent().click();
      cy.get('li[data-value="Masculino"').click();
    });

    // We submit the form
    // TODO: implement
  });
});