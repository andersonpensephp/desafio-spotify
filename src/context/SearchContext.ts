import { createContext } from 'react';


interface SearchContextType {
  search: string;
  setSearch: (search: string) => void;
  tab: string;
  setTab: (tab: string) => void;
}

export const SearchContext = createContext<SearchContextType>({
  search: 'Eminem',
  setSearch: () => { },
  tab: 'artists',
  setTab: () => { },
});
