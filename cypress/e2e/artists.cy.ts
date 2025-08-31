describe('Artists', () => {
  beforeEach(() => {
    cy.mockSearchTypeArtistAPI();
    cy.mockSearchTypeAlbumAPI();
    cy.visit('/artists');
  });

  it('should render the artists page', () => {

    cy.get('h2').should('contain', 'Artistas');
    cy.get('h3').should('contain', 'Artist One');
    cy.get('h3').should('contain', 'Artist Two');

    cy.contains('button', 'Albuns').click();

    cy.wait('@searchAlbums');

    cy.get('h2').should('contain', 'Albuns');
    cy.get('h3').should('contain', 'Album One');
    cy.get('h3').should('contain', 'Album Two');

    cy.contains('01/01/2020');
  });
});
