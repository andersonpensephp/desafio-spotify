declare namespace Cypress {
  interface Chainable {
    mockSearchTypeArtistAPI(): Chainable<void>;
    mockSearchTypeAlbumAPI(): Chainable<void>;
    mockArtistsIdAPI(): Chainable<void>;
    mockArtistsIdTopTracksAPI(): Chainable<void>;
    mockArtistsIdAlbumsAPI(): Chainable<void>;
    mockAlbumsIdAPI(): Chainable<void>;
    fakeSpotifyLogin(): Chainable<void>;
    mockAlbumsIdTracksAPI(): Chainable<void>;
    mockSearchTypeArtistAPIEmpty(): Chainable<void>;
  }
}
