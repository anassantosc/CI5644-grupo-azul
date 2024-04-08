describe('Homepage [No auth]', () => {
  // Intercept the call for top players endpoint
  before(() => {
    cy.intercept('GET', 'http://localhost:8080/api/ownership/top-progress').as('topPlayersInfo');
  });

  // We load the page for all tests
  beforeEach(() => {
    cy.login({ visit_homepage: true });
  });

  it('Contains new timeline section with top 3 players', () => {
    cy.wait('@topPlayersInfo')
      .its('response.statusCode').should('eq', 200);

    cy.get('ul[id="player-timeline"]').should('exist');

    cy.get('ul[id="player-timeline"]').children().should('have.length', 3);
  });
});