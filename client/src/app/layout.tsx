"use client";

import Navbar from "./components/Navbar";
import "./globals.css";
import { useState } from "react";
import { SearchContext } from "./context/SearchContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(0);

  const triggerSearch = () => setSearchTrigger((prev) => prev + 1);

  return (
    <html lang="en">
      <body>
        <SearchContext.Provider
          value={{ searchQuery, setSearchQuery, triggerSearch, searchTrigger }}
        >
          <Navbar />
          {children}
        </SearchContext.Provider>
      </body>
    </html>
  );
}
