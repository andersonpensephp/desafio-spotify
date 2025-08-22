import { createContext, useState } from "react";

interface SearchContextType {
  search: string;
  setSearch: (search: string) => void;
  tab: string;
  setTab: (tab: string) => void;
}

export const SearchContext = createContext<SearchContextType>({
  search: "Eminem",
  setSearch: () => { },
  tab: "artists",
  setTab: () => { }
});

export function SearchContextProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState("Eminem");
  const [tab, setTab] = useState<string>("artists");

  return (
    <SearchContext.Provider value={{
      search,
      setSearch,
      tab,
      setTab
    }}>
      {children}
    </SearchContext.Provider>
  )
}