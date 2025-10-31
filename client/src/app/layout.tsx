// app/layout.tsx
'use client'
import Navbar from "./components/Navbar";
import './globals.css'
import { useState, createContext, useContext } from 'react';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  triggerSearch: () => void;
  searchTrigger: number;
}

const SearchContext = createContext<SearchContextType>({
  searchQuery: '',
  setSearchQuery: () => { },
  triggerSearch: () => { },
  searchTrigger: 0,
});

export const useSearch = () => useContext(SearchContext);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTrigger, setSearchTrigger] = useState(0);

  const triggerSearch = () => {
    setSearchTrigger(prev => prev + 1);
  };

  return (
    <html lang="en">
      <body>
        <SearchContext.Provider value={{
          searchQuery,
          setSearchQuery,
          triggerSearch,
          searchTrigger
        }}>
          <Navbar />
          {children}
        </SearchContext.Provider>
      </body>
    </html>
  );
}
