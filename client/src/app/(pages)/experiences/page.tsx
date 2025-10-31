
'use client'
import ExperienceCard from '@/app/components/ExperienceCard'
import { useState, useEffect } from 'react'
import { useSearch } from '../../context/SearchContext'

interface Experience {
  _id: string
  title: string
  location: string
  price: number
  originalPrice?: number
  image: string
  description: string
}

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([])
  const [isSearchActive, setIsSearchActive] = useState(false)

  const { searchQuery, searchTrigger } = useSearch()

  useEffect(() => {
    fetchExperiences()
  }, [])

  useEffect(() => {
    if (searchTrigger > 0) {
      performSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTrigger, searchQuery, experiences])

  const fetchExperiences = async () => {
    try {
      const response = await fetch(`https://bookit-0k8g.onrender.com/api/experiences`)
      const data = await response.json()
      setExperiences(data)
      setFilteredExperiences(data)
    } catch (error) {
      console.error('Error fetching experiences:', error)
    } finally {
      setLoading(false)
    }
  }

  const performSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredExperiences(experiences);
      setIsSearchActive(false);
      return;
    }

    setIsSearchActive(true);
    const query = searchQuery.toLowerCase().trim();
    const filtered = experiences.filter(experience =>
      experience.title.toLowerCase().includes(query) ||
      experience.location.toLowerCase().includes(query) ||
      experience.description.toLowerCase().includes(query)
    );
    setFilteredExperiences(filtered);
  };


  const clearSearch = () => {
    setFilteredExperiences(experiences);
    setIsSearchActive(false);
  };

  return (
    <div className="min-h-screen pt-32 bg-[#F0F0F0]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

        {loading ? (
          <div className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            gap-6 
            place-items-center
          ">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse w-full max-w-[320px]">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredExperiences.length === 0 && isSearchActive ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No experiences match your search.</p>
            <p className="text-gray-400 mt-2">Try searching with different keywords.</p>
            <button
              onClick={clearSearch}
              className="mt-4 cursor-pointer bg-[#FFD643] text-black px-6 py-2 rounded-lg border border-black hover:bg-[#f0c532] transition"
            >
              Show All Experiences
            </button>
          </div>
        ) : (
          <div className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            gap-6 
            place-items-center
          ">
            {filteredExperiences.map((experience) => (
              <ExperienceCard
                key={experience._id}
                id={experience._id}
                title={experience.title}
                location={experience.location}
                price={experience.price}
                originalPrice={experience.originalPrice}
                image={experience.image}
                description={experience.description}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
