"use client"

import { useState, useEffect } from "react"
import { ArrowRight, ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { Link } from "react-router-dom"
import LoadingSpinner from "../common/LoadingSpinner";
import baseUrl from "../../config/api"


export default function NewsSection() {
  const [newsItems, setNewsItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 1

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${baseUrl}/topics?webmaster_section_id=3`)

        if (!response.ok) {
          throw new Error("Failed to fetch news data")
        }

        const data = await response.json()

        const formattedNews = Array.isArray(data.data.data)
          ? data.data.data.map((item) => {
              const date = new Date(item.date)
              const formattedDate = `${date.getDate().toString().padStart(2, "0")} - ${(date.getMonth() + 1)
                .toString()
                .padStart(2, "0")} - ${date.getFullYear()}`

              return {
                id: item.id,
                title: item.title,
                content: item.seo_description_id || item.excerpt || "No description available",
                image: item.image || "/placeholder.svg?height=300&width=500",
                date: formattedDate,
                slug: item.seo_url_slug_id || `news/${item.id}`, // Use slug from API
              }
            })
          : []

        setNewsItems(formattedNews)
      } catch (err) {
        setError(err.message || "An unknown error occurred")
        console.error("Error fetching news:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const totalPages = Math.ceil(newsItems.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = newsItems.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  if (loading) {
    return (
      <section className="py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-green-900">
              Berita Biro Hukum Sekretariat Daerah Jawa Timur
            </h2>
          </div>
          <div className="h-64 flex items-center justify-center">
          <LoadingSpinner />
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-green-900">
              Berita Biro Hukum Sekretariat Daerah Jawa Timur
            </h2>
          </div>
          <div className="border border-red-200 bg-red-50 p-4 rounded-lg text-red-600">
            Error: {error}. Silakan coba lagi nanti.
          </div>
        </div>
      </section>
    )
  }

  if (newsItems.length === 0) {
    return (
      <section className="py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-green-900">
              Berita Biro Hukum Sekretariat Daerah Jawa Timur
            </h2>
          </div>
          <div className="border border-gray-200 bg-gray-50 p-4 rounded-lg text-gray-600">
            Tidak ada berita yang tersedia saat ini.
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-green-900">
            Berita Biro Hukum Sekretariat Daerah Jawa Timur
          </h2>
          <Link
            to="/news"
            className="flex items-center font-medium text-sm border rounded px-4 py-2 transition-colors text-green-600 border-green-600 hover:text-green-800"
          >
            <span className="hidden md:inline">LIHAT SEMUA</span>
            <ArrowRight className="ml-1 h-4 w-4 md:h-5 md:w-5" />
          </Link>
        </div>

        <div className="mb-6">
          {currentItems.map((news) => (
            <div key={news.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              <div className="p-6 md:p-8 md:flex gap-6">
                <div className="md:w-7/12 space-y-4">
                  <div className="flex items-center text-green-600 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{news.date}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">{news.title}</h3>
                  <p className="text-gray-600">{news.content}</p>
                  <Link
                    to={`/news/detail-berita/${news.slug}`}
                    className="text-green-600 border border-green-600 rounded-md px-4 py-2 inline-flex items-center text-sm font-medium hover:bg-green-50 transition-colors"
                  >
                    Baca Selengkapnya
                  </Link>
                </div>
                <div className="md:w-5/12 mt-6 md:mt-0">
                  <div className="w-full h-64 md:h-[300px] rounded-lg overflow-hidden relative">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-5 w-5 text-gray-500" />
            </button>
            <span className="text-gray-600">
              {currentPage} dari {totalPages}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
