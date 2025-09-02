/// <reference types="cypress" />

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

  it('should render the artists page with no results', () => {
    cy.mockSearchTypeArtistAPIEmpty();
    cy.visit('/artists');

    cy.get('h2').should('contain', 'Artistas');
    cy.get('h3').should('contain', 'Nenhum resultado encontrado :(');
    cy.get('p').should('contain', 'Use o campo acima para buscar artistas ou albuns.');
  });

  it('should switch language to English', () => {
    cy.mockSearchTypeArtistAPI();
    cy.visit('/artists');
    cy.wait('@searchArtists');

    cy.contains('button', 'Português(BR)').click();
    cy.contains('English(US)').click();

    cy.contains('Artists').should('exist');
    cy.contains('Albums').should('exist');
  });

  it('should navigate to artist detail when clicking an artist', () => {
    cy.mockSearchTypeArtistAPI();
    cy.visit('/artists');
    cy.wait('@searchArtists');

    cy.get('h3').contains('Artist One').click();

    // mocks do detalhe
    cy.mockArtistsIdAPI();
    cy.mockArtistsIdTopTracksAPI();
    cy.mockArtistsIdAlbumsAPI();

    cy.url().should('include', '/artist/1');

    cy.contains('h1', 'Artist One').should('exist');
  })
});
