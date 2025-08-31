describe('Artist', () => {
  beforeEach(() => {
    cy.mockArtistsIdAPI();
    cy.mockArtistsIdTopTracksAPI();
    cy.mockArtistsIdAlbumsAPI();
  });

  it('should render the artist page', () => {
    cy.visit('/artist/1');

    cy.get('h1').should('contain', 'Artist One');
    cy.get('h2').should('contain', 'Album One');
    cy.get('h2').should('contain', 'Album Two');

    cy.get('button').contains('Albuns').click();

    cy.get('button').contains('Principais Músicas').click();

    cy.get('h2').should('contain', 'Track One');
    cy.get('h2').should('contain', 'Track Two');
  });
});
