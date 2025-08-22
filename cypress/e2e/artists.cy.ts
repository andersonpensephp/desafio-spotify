describe('Artists', () => {
  beforeEach(() => {
    cy.mockSearchTypeArtistAPI()
    cy.mockSearchTypeAlbumAPI()
  })

  it('should render the artists page', () => {
    cy.visit('/artists');

    cy.get('h2').should('contain', 'Artistas');
    cy.get('h3').should('contain', 'Artist One');
    cy.get('h3').should('contain', 'Artist Two');

    cy.get('button').contains('Albuns').click();

    cy.get('h2').should('contain', 'Albuns');
    cy.get('h3').should('contain', 'Album One');
    cy.get('h3').should('contain', 'Album Two');
  });
});