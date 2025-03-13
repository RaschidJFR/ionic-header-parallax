describe('Ionic Header Parallax', () => {
  it('Main component can load', () => {
    cy.visit('/');
    cy.contains('Start with Ionic UI Components');
  });

  it('Parallax effect works', () => {
    cy.visit('/');
    cy.wait(200);

    cy.get('ion-header').should('have.css', 'height', '300px');
    cy.get('ion-content').shadow().find('.inner-scroll').scrollTo('bottom');
    cy.get('ion-header').invoke('height').should('be.lessThan', 60);
  });
});
