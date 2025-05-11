// due to periods the ratings API gets slower
Cypress.config('defaultCommandTimeout', 60000);

describe('Paginated Establishments Table E2E', () => {
    it('displays loading on page change', () => {
      cy.visit('/');
      cy.contains('Loading...').should('be.visible');
      cy.contains('Loading...').should('not.exist'); 
      cy.contains('+').click();
      cy.contains('Loading...').should('be.visible');
    });

    it('returns to the previous page and displays data', () => {
      cy.visit('/');
      cy.contains('+').click();
      cy.contains('Loading...').should('be.visible');
      cy.contains('Loading...').should('not.exist');
      cy.contains('2').should('exist');
      cy.contains('-').click();
      // check if cache works
      cy.contains('Loading...').should('not.exist');
      cy.contains('1').should('exist');
    });

    it('filters establishments by authority', () => {
      cy.visit('/');
      cy.get('div[id="authoritiesDropDown"]').click();
      cy.get('div[id="authoritiesDropDown"]').within(() => {
        cy.contains('Adur').click();
      });
      cy.contains('Loading...').should('be.visible');
      cy.contains('Loading...').should('not.exist');
      cy.get('table').within(() => {
        cy.contains('ADSushi').should('exist');
      });
    });

    it('navigates to the details page of an establishment', () => {
      cy.visit('/');
      cy.contains('!NOSH!').click();
      cy.contains('Loading...').should('be.visible');
      cy.contains('Loading...').should('not.exist');
      cy.url().should('include', '/establishments');
      cy.contains('Establishment Details').should('exist');
      cy.contains('!NOSH!').should('exist');
    });
});