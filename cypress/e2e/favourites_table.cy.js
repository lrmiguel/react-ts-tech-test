// due to periods the ratings API gets slower
Cypress.config('defaultCommandTimeout', 60000);

describe('Favourite Table Tests', () => {

  it('adds an establishment to favourites from the homepage', () => {
    cy.visit('/');
    cy.get('input[aria-label="Favourite !NOSH!"]').click();
    cy.get('button[aria-label="Remove from favourites"]').should('exist');
  });

  it('removes an establishment from favourites on the homepage', () => {
    cy.visit('/');
    cy.get('input[aria-label="Favourite !NOSH!"]').click();
    cy.get('button[aria-label="Remove from favourites"]').click({ force: true });
    cy.get('button[aria-label="Favourite !NOSH!"]').should('not.exist');
  });

  it('shows and removes an establishment from favourites on the details page', () => {
    cy.visit('/');
    cy.get('input[aria-label="Favourite !NOSH!"]').click();
    cy.get('table').eq(1).within(() => {
        cy.contains('td', '!NOSH!').should('exist');
    });
    cy.contains('!NOSH!').click();
    cy.get('button[aria-label="Remove from favourites"]').click();
    cy.contains('td', '!NOSH!').should('not.exist');
  });
});