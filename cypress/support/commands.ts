/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('mockSearchTypeArtistAPI', () => {
  cy.intercept('GET', '**/search?q=Eminem&type=artist*', {
    statusCode: 200,
    body: {
      artists: {
        items: [
          { id: '1', name: 'Artist One', images: [{ url: 'img1.jpg' }] },
          { id: '2', name: 'Artist Two', images: [{ url: 'img2.jpg' }] },
        ],
      },
    },
  }).as('searchArtists');
});

Cypress.Commands.add('mockSearchTypeAlbumAPI', () => {
  cy.intercept('GET', '**/search?q=Eminem&type=album*', {
    statusCode: 200,
    body: {
      albums: {
        items: [
          { id: '1', name: 'Album One', images: [{ url: 'img1.jpg' }] },
          { id: '2', name: 'Album Two', images: [{ url: 'img2.jpg' }] },
        ],
      },
    },
  }).as('searchAlbums');
});

Cypress.Commands.add('mockArtistsIdAPI', () => {
  cy.intercept('GET', '**/artists/1', {
    statusCode: 200,
    body: {
      name: 'Artist One',
      images: [{ url: 'img1.jpg' }],
    },
  });
});

Cypress.Commands.add('mockArtistsIdTopTracksAPI', () => {
  cy.intercept('GET', '**/artists/1/top-tracks?*', {
    statusCode: 200,
    body: {
      tracks: [
        {
          id: '1',
          name: 'Track One',
          album: {
            name: 'Album One',
            images: [{ url: 'img1.jpg' }],
          },
          artists: [{ name: 'Artist One' }],
          duration_ms: 123456,
        },
        {
          id: '2',
          name: 'Track Two',
          album: {
            name: 'Album Two',
            images: [{ url: 'img2.jpg' }],
          },
          artists: [{ name: 'Artist Two' }],
          duration_ms: 654321,
        },
      ],
    },
  });
});

Cypress.Commands.add('mockArtistsIdAlbumsAPI', () => {
  cy.intercept('GET', '**/artists/1/albums?*', {
    statusCode: 200,
    body: {
      items: [
        {
          name: 'Album One',
          images: [{ url: 'img1.jpg' }],
          release_date: '2020-01-01',
          total_tracks: 10,
        },
        {
          name: 'Album Two',
          images: [{ url: 'img2.jpg' }],
          release_date: '2020-01-01',
          total_tracks: 10,
        },
      ],
    },
  });
});

Cypress.Commands.add('mockAlbumsIdAPI', () => {
  cy.intercept('GET', '**/albums/1', {
    statusCode: 200,
    body: {
      name: 'Album One',
      images: [{ url: 'img1.jpg' }],
      tracks: {
        items: [
          {
            id: '1',
            name: 'Track One',
            album: {
              name: 'Album One',
              images: [{ url: 'img1.jpg' }],
            },
            artists: [{ name: 'Artist One' }],
            duration_ms: 123456,
          },
          {
            id: '2',
            name: 'Track Two',
            album: {
              name: 'Album Two',
              images: [{ url: 'img2.jpg' }],
            },
            artists: [{ name: 'Artist Two' }],
            duration_ms: 654321,
          },
        ],
      },
      release_date: '2021-01-20',
      total_tracks: 2,
    },
  });
});
