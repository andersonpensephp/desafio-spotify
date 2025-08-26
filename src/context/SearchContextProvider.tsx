import { useState } from 'react';

import { SearchContext } from './SearchContext';

export function SearchContextProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState('Eminem');
  const [tab, setTab] = useState<string>('artists');
  const [pageArtists, setPageArtists] = useState(0);
  const [pageAlbums, setPageAlbums] = useState(0);

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        tab,
        setTab,
        pageArtists,
        setPageArtists,
        pageAlbums,
        setPageAlbums,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
