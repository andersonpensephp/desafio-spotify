import { createContext } from 'react';

interface SearchContextType {
  search: string;
  setSearch: (search: string) => void;
  tab: string;
  setTab: (tab: string) => void;
  pageArtists: number;
  setPageArtists: (page: number) => void;
  pageAlbums: number;
  setPageAlbums: (page: number) => void;
}

export const SearchContext = createContext<SearchContextType>({
  search: 'Eminem',
  setSearch: () => {},
  tab: 'artists',
  setTab: () => {},
  pageArtists: 0,
  setPageArtists: () => {},
  pageAlbums: 0,
  setPageAlbums: () => {},
});
