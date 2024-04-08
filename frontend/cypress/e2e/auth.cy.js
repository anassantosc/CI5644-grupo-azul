describe("Authentication", () => {
  // We preload the fixture for signup
  before(() => {
    cy.generateSignupFixture();
  });

  it("We can reach Login page from the homepage", () => {
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

  it("We can reach Signup page from the homepage", () => {
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

  it("We can reach the signup page from the login page", () => {
    cy.visit('http://localhost:3000/login');

    cy.get('a[href="/signup"]').click();

    cy.url().should('include', '/signup');
  });

  it("We can create a user", () => {
    cy.visit('http://localhost:3000/signup');

    // 
    cy.intercept('POST', 'http://localhost:8080/auth/register').as('signup');

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

      // We submit the form
      cy.get('button[type="submit"]').click();

      cy.wait('@signup').its('response.statusCode').should('eq', 200);

      // We check that we are redirected to the login page
      cy.url().should('include', '/login');
    });
  });

  it("We can login as an user", () => {
    cy.visit('http://localhost:3000/login');

    // 
    cy.intercept('POST', 'http://localhost:8080/auth/login').as('login');

    /*
      We have some users already register by default in the database so
      we use that user to not depend on the user that is created dynamically 
      for the tests of register
    */
    cy.get('input[name="username"]').type('simonpuyosa');
    cy.get('input[name="password"]').type('alluhakbar');

    // We submit the form
    cy.get('button[type="submit"]').click();

    cy.wait('@login').its('response.statusCode').should('eq', 200);

    // Now we should be redirected to the profile page
    cy.url().should('include', '/profile');

    // We check that the user has the cookie for authentication
    cy.getCookie('JWT').should('exist');
  });

  it("We can logout as an user", () => {
    // Custom command
    cy.login();

    // We get the navbar container and then check its contents
    cy.get('#navbar').within(() => {
      // Auth buttons
      cy.get('[aria-label="auth-menu"]').click();
    });

    // Auth menu is generated outside of #navbar scope when clicked
    cy.get('ul[role="menu"]')
      .within(() => {
        cy.get('li').find('p').contains('Salir').click();
      });

    // Redirection happens when logout is done
    cy.url().should('include', '');

    // Cookie should now not exist
    cy.getCookie('JWT').should('not.exist');
  });
});