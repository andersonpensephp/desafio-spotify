import { useState } from 'react';
import { SearchContext } from './SearchContext';


export function SearchContextProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState('Eminem');
  const [tab, setTab] = useState<string>('artists');

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        tab,
        setTab,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
