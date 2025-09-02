

/// <reference types="cypress" />

describe('Home', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.mockSearchTypeArtistAPI();
  });

  it('should log in and redirect to the artists page', () => {
    cy.visit('/');
    cy.get('h1').should('contain', 'Login');
    cy.fakeSpotifyLogin();

    cy.url().should('include', '/artists');

    cy.get('h2').should('contain', 'Artistas');
    cy.get('h3').should('contain', 'Artist One');
    cy.get('h3').should('contain', 'Artist Two');
  });
});
