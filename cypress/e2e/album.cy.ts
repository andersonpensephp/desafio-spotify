
/// <reference types="cypress" />

describe('Album', () => {
  beforeEach(() => {
    cy.mockAlbumsIdAPI();
    cy.mockAlbumsIdTracksAPI();
    cy.visit('/album/1');
  });

  it('should render the album page', () => {

    cy.wait('@albumsId');

    cy.get('h1').should('contain', 'Album One');
    cy.get('p').should('contain', '20/01/2021');
    cy.get('h2').should('contain', '2 Músicas');

    cy.get('h2').should('contain', 'Track One');
    cy.get('h2').should('contain', 'Track Two');

    cy.get('p').should('contain', 'Artist One');
    cy.get('p').should('contain', 'Artist Two');
  });
});
