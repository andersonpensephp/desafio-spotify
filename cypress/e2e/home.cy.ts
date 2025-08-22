describe('Home', () => {
  beforeEach(() => {
    cy.mockSearchTypeArtistAPI()
    cy.mockSearchTypeAlbumAPI()
  })

  it('should log in and redirect to the artists page', () => {
    cy.visit('/');
    cy.get('h1').should('contain', 'Login');
    cy.get('button').should('contain', 'Entrar com Spotify').click();

    cy.visit('/artists');
    cy.get('h2').should('contain', 'Artistas');
    cy.get('h3').should('contain', 'Artist One');
    cy.get('h3').should('contain', 'Artist Two');
  });
});