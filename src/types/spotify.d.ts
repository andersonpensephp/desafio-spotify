export interface Image {
  url: string;
  height: number | null;
  width: number | null;
}

export interface ExternalUrls {
  spotify: string;
}

export interface ExternalIds {
  isrc: string;
}

export interface SimplifiedArtist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  type: string;
  uri: string;
}

export interface Artist extends SimplifiedArtist {
  followers: {
    href: string | null;
    total: number;
  };
  genres: string[];
  popularity: number;
}

export interface SimplifiedAlbum {
  album_type: 'album' | 'single' | 'compilation';
  artists: SimplifiedArtist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  total_tracks: number;
  type: 'album';
  uri: string;
}

export interface Album extends SimplifiedAlbum {
  copyrights: Array<{
    text: string;
    type: 'C' | 'P';
  }>;
  external_ids: ExternalIds;
  genres: string[];
  label: string;
  popularity: number;
  tracks: PagingObject<Track>;
}

export interface SimplifiedTrack {
  artists: SimplifiedArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  preview_url: string | null;
  track_number: number;
  type: 'track';
  uri: string;
}

export interface Track extends SimplifiedTrack {
  album: SimplifiedAlbum;
  external_ids: ExternalIds;
  popularity: number;
  is_playable?: boolean;
}

// Response

export interface PagingObject<T> {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface SearchResponse<T> {
  artists?: PagingObject<Artist>;
  albums?: PagingObject<SimplifiedAlbum>;
}

export interface ArtistTopTracksResponse {
  tracks: Track[];
}

export interface ArtistAlbumsResponse extends PagingObject<SimplifiedAlbum> {
  artist: Artist;
}

export interface AlbumTracksResponse extends PagingObject<SimplifiedTrack> {
  album: SimplifiedAlbum;
}
