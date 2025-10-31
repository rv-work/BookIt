// components/Navbar.tsx
'use client'
import Image from 'next/image'
import { useSearch } from '../context/SearchContext'
import { useState } from 'react'

export default function Navbar() {
  const { setSearchQuery, triggerSearch } = useSearch();
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    setSearchQuery(inputValue);
    triggerSearch();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className="bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.15)] fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Image
            src="/hdLogo.png"
            alt="HD Logo"
            width={100}
            height={55}
            className="object-contain"
          />

          <div className="flex gap-2 mx-4 sm:mx-8">
            <input
              type="text"
              placeholder="Search experiences"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="
                w-[180px] sm:w-60 lg:w-[340px]
                px-3 sm:px-4 py-2
                text-black bg-gray-100 rounded-md
                text-sm sm:text-base
              "
            />

            <button
              onClick={handleSearch}
              className="
                bg-[#FFD643] text-black cursor-pointer
                px-3 sm:px-5
                py-1.5 sm:py-2
                rounded-lg
                text-xs sm:text-sm font-medium
                border border-black
                hover:bg-[#f0c532] transition
              "
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
