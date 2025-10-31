"use client";
import { createContext, useContext } from "react";

export interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  triggerSearch: () => void;
  searchTrigger: number;
}

export const SearchContext = createContext<SearchContextType>({
  searchQuery: "",
  setSearchQuery: () => { },
  triggerSearch: () => { },
  searchTrigger: 0,
});

export const useSearch = () => useContext(SearchContext);
