describe('Profile', () => {
  // We load the login pages and does the login procress
  beforeEach(() => {
    cy.login();
  });

  it('Validate navbar menu has the auth options', () => {
    // We get the navbar container and then check its contents
    cy.get('#navbar').within(() => {
      // Check new notifications button
      cy.get('button[aria-label="Notificaciones de Intercambio"]').should('exist');
    
      // Auth buttons
      cy.get('[aria-label="auth-menu"]').click();
    });

    // Auth menu is generated outside of #navbar scope when clicked
    cy.get('ul[role="menu"]')
      .within(() => {
        cy.get('li').find('p').contains('Perfil');
        cy.get('li').find('p').contains('Mi Álbum');
        cy.get('li').find('p').contains('Salir');
      });
  });

  it('Layout displays user information', () => {
    // We intercept the endpoint and wait for the answer so it loads the data
    cy.intercept('GET', 'http://localhost:8080/api/users').as('userInfo');
    cy.wait('@userInfo')
      .its('response.statusCode').should('eq', 200);

    // Main box with user information
    cy.get('div[id="profile-box"]').within(() => {
      // Avatar exist
      cy.get('svg[data-testId="PersonIcon"]').should('exist');

      // Username section exist
      cy.get('p[id="username-section"]').within(() => {
        cy.get('svg[data-testId="AlternateEmailIcon"]').should('exist');
        cy.contains('simonpuyosa');
      });

      // Email section exist
      cy.get('p[id="email-section"]').within(() => {
        cy.get('svg[data-testId="EmailIcon"]').should('exist');
        cy.contains('simonpuyosa@gmail.com');
      });

      // Gender section exist
      cy.get('p[id="gender-section"]').within(() => {
        cy.get('svg[data-testid="WcIcon"]').should('exist');
        cy.contains('Género del Usuario no disponible');
      });

      cy.get('button:contains("Editar")').should('exist');
    });

    // Main box with the user progress
    cy.get('div[id="progress-box"]').within(() => {
      cy.get('h4').contains('MI PROGRESO');

      // Progress bar exists
      cy.get('span[aria-valuenow="100"]').should('exist');
    });
  });

  it('Validate access to edit user', () => {
    // We intercept the endpoint and wait for the answer so it loads the data
    cy.intercept('GET', 'http://localhost:8080/api/users').as('userInfo');
    cy.wait('@userInfo')
      .its('response.statusCode').should('eq', 200);

    // Main box with user information
    cy.get('div[id="profile-box"]').within(() => {
      cy.get('button:contains("Editar")').should('exist').click();
    });

    cy.get('div[role="dialog"]').within(() => {
      cy.get('h4').contains('Editar Perfil');

      // We check that all of the values exist
      cy.get('form').within(() => {
        cy.get('input[value="simonpuyosa"]').should('not.exist');
        cy.get('input[value="Simon"]').should('exist');
        cy.get('input[value="simonpuyosa@gmail.com"]').should('exist');
      });
    });
  });

  it('Validate edition of user', () => {
    // We intercept the endpoints and wait for the answer so it loads the data
    cy.intercept('GET', 'http://localhost:8080/api/users').as('userInfo');
    cy.intercept('PUT', 'http://localhost:8080/api/users').as('userEdit');
    cy.wait('@userInfo')
      .its('response.statusCode').should('eq', 200);

    // Main box with user information
    cy.get('div[id="profile-box"]').within(() => {
      cy.get('button:contains("Editar")').should('exist').click();
    });

    cy.get('div[role="dialog"]').within(() => {
      cy.get('button').contains('Confirmar').click();
    });

    // Waity for the information to be sent and then reload
    cy.wait('@userEdit')
      .its('response.statusCode').should('eq', 200);

    cy.wait('@userInfo')
    .its('response.statusCode').should('eq', 200);
  });
});