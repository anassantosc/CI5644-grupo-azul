describe('Homepage [No auth]', () => {
  // We load the page for all tests
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });
  
  it('Contain different introductory contents', () => {
    // TITLE
    cy.get('h1').contains('VIVA LA EMOCIÓN DEL DEPORTE REY');

    // SECTION 1
    cy.get('p')
      .contains(
        "¡Revive la magia del Mundial 2022 con nuestro álbum de barajitas!"
      );

    cy.get('p')
      .contains(
        "Colecciona, intercambia y guarda los momentos más emocionantes del fútbol. ¡Empieza tu aventura hoy!"
      );

    // SECTION 2
    cy.get('p')
      .contains(
        "¡Descubre la emoción del Mundial 2026 con cada sobre de barajitas!"
      );

    cy.get('p')
      .contains(
        "Cada sobre contiene 5 barajitas, 5 momentos únicos para coleccionar. ¡Abre, descubre y colecciona hoy!"
      );
  });

  it('Validate navbar content and behavior', () => {
    // We get the navbar container and then check its contents
    cy.get('#navbar').within(() => {
      // Homepage button

      // Module buttons
      cy.get('button').contains('Inicio');
      cy.get('button').contains('Album');
      cy.get('button').contains('Comprar');

      // Auth buttons
      cy.get('[aria-label="auth-menu"]').click();
    });

    // Auth menu is generated outside of #navbar scope when clicked
    cy.get('ul[role="menu"]')
      .within(() => {
        cy.get('li').find('p').contains('Login');
        cy.get('li').find('p').contains('Registro');
      });

    // Auth menu isn't visible when clicking outside of it
    cy.get('div[role="presentation"]').click();
    cy.get('ul[role="menu"]').should('not.be.visible');
  });

  it('Validate footer content and behavior', () => {
    // We get the navbar container and then check its contents
    cy.get('#footer').within(() => {
      // Main titles
      cy.get('div').contains('Marmota');
      cy.get('div').contains('Salvaje');

      // Footer social
      cy.get('button').find('svg[data-icon="facebook"]').should('exist');
      cy.get('button').find('svg[data-icon="instagram"]').should('exist');
      cy.get('button').find('svg[data-icon="instagram"]').should('exist');

      // Text sections
      cy.get('div').contains('Copyright 2024 marmotasalvaje.com');
      cy.get('div').contains('Derechos reservados');
      

      cy.get('div').contains('Acerca de');
      cy.get('div').contains('Contáctanos');
    });
  });

  it('Validate redirection to login page in navbar [Inicio]', () => {
    // We get the navbar container and then check its contents
    cy.get('#navbar').within(() => {
      // Homepage button
      cy.get('button').contains('Inicio').click();
      cy.url().should('eq', 'http://localhost:3000/');
    });
  });

  it('Validate redirection to login page in navbar [Album]', () => {
    // We get the navbar container and then check its contents
    cy.get('#navbar').within(() => {
      // Album button
      cy.get('button').contains('Album').click();
      cy.url().should('include', '/login');
    });
  });

  it('Validate redirection to login page in navbar [Comprar]', () => {
    // We get the navbar container and then check its contents
    cy.get('#navbar').within(() => {
      // Album button
      cy.get('button').contains('Comprar').click();
      cy.url().should('include', '/login');
    });
  });
})