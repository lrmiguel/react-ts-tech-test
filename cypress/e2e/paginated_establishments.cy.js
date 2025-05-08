
describe('Paginated Establishments Table E2E', () => {
    it('displays loading on page change', () => {
      cy.visit('/');
      cy.contains('+').click();
      cy.contains('Loading...').should('be.visible');
    });
    
});