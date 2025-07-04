"use client"

import { useState, useEffect } from "react"

import { ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function DprdMemberCity() {
  const [showAll, setShowAll] = useState(false)
  const [dprdData, setDprdData] = useState([])
  const [sectionData, setSectionData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDprdData = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://jdih.pisdev.my.id/api/v2/home/partner-dprd?per_page=99')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        // Store the section data for title and description
        setSectionData(data)
        
        // Handle the actual API response structure
        const partners = data.data || []
        
        // Transform the data to match the expected format
        const transformedData = partners.map((item) => ({
          id: item.id,
          name: item.title,
          url: item.link,
          logo: item.image || item.icon || null
        }))
        
        setDprdData(transformedData)
      } catch (err) {
        console.error('Error fetching DPRD data:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDprdData()
  }, [])

  const displayedData = showAll ? dprdData : dprdData.slice(0, 6)

  if (loading) {
    return (
      <section className="py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800">
            Anggota DPRD Kota/Kabupaten
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 mt-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[140px] rounded-lg border border-gray-200 bg-gray-100 animate-pulse">
                <div className="h-16 bg-gray-200 rounded-t-lg"></div>
                <div className="p-2">
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800">
            Anggota DPRD Kota/Kabupaten
          </h2>
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">Error loading data: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-green-800">
          {sectionData?.title || "Anggota DPRD Kota/Kabupaten"}
        </h2>
        
        {sectionData?.description && (
          <p className="text-gray-600 mt-2 mb-6">{sectionData.description}</p>
        )}

        {dprdData.length > 6 && (
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className={`flex items-center font-medium text-sm border rounded px-4 py-2 transition-colors ${
                showAll
                  ? "bg-pink-100 text-pink-600 border-pink-300"
                  : "text-green-600 border-green-600 hover:text-green-800"
              }`}
            >
              <span className="hidden md:inline">{showAll ? "LIHAT SEDIKIT" : "LIHAT SEMUA"}</span>
              <ArrowRight className="ml-1 h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>
        )}

        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-6"
        >
          <AnimatePresence>
            {displayedData.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="h-[140px]"
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full"
                >
                  <div className="h-[140px] rounded-lg border border-gray-200 flex flex-col transition-all duration-300 group-hover:bg-green-50 group-hover:border-green-200 overflow-hidden">
                    {item.logo ? (
                      <div className="h-40 flex items-center justify-center bg-white border-b border-gray-100 p-2">
                        <img 
                          src={item.logo} 
                          alt={`${item.name} logo`}
                          className="max-h-12 max-w-full object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                          }}
                        />
                        <div 
                          className="hidden h-12 w-12 bg-green-100 rounded-full items-center justify-center"
                        >
                          <span className="text-green-600 font-bold text-lg">
                            {item.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-16 flex items-center justify-center bg-green-100 border-b border-gray-100">
                        <div className="h-12 w-12 bg-green-200 rounded-full flex items-center justify-center">
                          <span className="text-green-700 font-bold text-lg">
                            {item.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="flex-1 flex items-center justify-center p-3">
                      <p className="text-center text-green-800 font-medium text-xs leading-tight line-clamp-3">
                        {item.name}
                      </p>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {dprdData.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-500">No data available</p>
          </div>
        )}
      </div>
    </section>
  )
}