// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
// Import commands.js using ES2015 syntax:
import './commands';

beforeEach(() => {
  cy.window().then((win) => {
    win.localStorage.setItem('access_token', 'fake_token');
  });

  cy.intercept('GET', '**/me', {
    statusCode: 200,
    body: {
      display_name: 'Usuário Teste',
      email: 'teste@teste.com',
      id: '123456',
    },
  }).as('me');
});
