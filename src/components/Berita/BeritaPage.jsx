"use client"

import { Search, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export default function BeritaPage() {
  const navigate = useNavigate()

  const [beritaList, setBeritaList] = useState([])
  const [filteredBeritaList, setFilteredBeritaList] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage] = useState(9)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [showDateInput, setShowDateInput] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const proxiedLogo = (logo) =>
    logo?.startsWith("http://")
      ? `https://images.weserv.nl/?url=${logo.replace("http://", "")}`
      : logo

  useEffect(() => {
    fetchAllBerita()
  }, [])

  useEffect(() => {
    filterBerita()
    setCurrentPage(1)
  }, [searchQuery, selectedDate, beritaList])

  const fetchAllBerita = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://jdih.pisdev.my.id/api/v2/topics?webmaster_id=3&per_page=9999`
      )
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      if (data.status === "success") {
        setBeritaList(data.data.data)
      } else {
        throw new Error("Failed to fetch data")
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const filterBerita = () => {
    let filtered = beritaList

    if (searchQuery) {
      filtered = filtered.filter((berita) =>
        berita.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedDate) {
      filtered = filtered.filter(
        (berita) => berita.date && berita.date.startsWith(selectedDate)
      )
    }

    setFilteredBeritaList(filtered)
  }

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" }
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", options)
  }

  const totalRecords = filteredBeritaList.length
  const totalPages = Math.ceil(totalRecords / recordsPerPage)
  const startIndex = (currentPage - 1) * recordsPerPage
  const endIndex = startIndex + recordsPerPage
  const currentBeritaList = filteredBeritaList.slice(startIndex, endIndex)

  const startRecord = startIndex + 1
  const endRecord = Math.min(endIndex, totalRecords)

  const getPageNumbers = () => {
    const pages = []
    pages.push(1)
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 2 && currentPage > 3) {
        pages.push("...")
      } else if (i === totalPages - 1 && currentPage < totalPages - 2) {
        pages.push("...")
      } else {
        pages.push(i)
      }
    }
    if (totalPages > 1) pages.push(totalPages)
    return pages
  }

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  const handleCardClick = (link) => {
    const slug = link.startsWith("./") ? link.substring(2) : link
    navigate(`/news/detail-berita/${slug}`)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <h1 className="text-xl font-semibold text-blue-800">
          Seputar JDIH Jawa Timur
        </h1>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mb-8">
        <h2 className="text-sm font-semibold text-blue-800 px-1 mb-3">
          Pencarian
        </h2>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Cari berita disini.."
              className="bg-white w-full pl-10 pr-4 py-2 border border-blue-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="relative">
            {!showDateInput ? (
              <button
                type="button"
                className="bg-white px-4 py-2 border border-blue-600 rounded-md flex items-center justify-center gap-2"
                onClick={() => setShowDateInput(true)}
              >
                <span>Tanggal</span>
                <Calendar className="h-4 w-4" />
              </button>
            ) : (
              <input
                type="date"
                className="px-3 py-2 border rounded-md"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                onBlur={() => setShowDateInput(false)}
                autoFocus
              />
            )}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl text-blue-800 font-semibold mb-6">Berita</h2>

        {loading ? (
          <div className="text-center py-8">
            <p>Memuat data...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            <p>Error: {error}</p>
          </div>
        ) : currentBeritaList.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Tidak ada data ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentBeritaList.map((berita) => (
              <div
                key={berita.id}
                className="border border-white rounded-xl shadow-sm overflow-hidden bg-white hover:border-blue-600 hover:shadow-md transition duration-300 cursor-pointer flex flex-col"
                onClick={() => handleCardClick(berita.link)}
              >
                <img
                  src={proxiedLogo(berita.image) || "/placeholder.svg"}
                  alt={berita.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "/assets/berita/image113.png";
                  }}
                />
                <div className="p-4 flex flex-col h-full">
                  <div>
                    <div className="text-xs text-gray-500 mb-2">
                      {formatDate(berita.date)}
                    </div>
                    <h3 className="text-xl font-bold leading-tight pb-2">
                      {berita.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {berita.seo_description_id
                        ? berita.seo_description_id
                            .replace(/<[^>]*>/g, "")
                            .substring(0, 150) + "..."
                        : "Tidak ada deskripsi"}
                    </p>
                  </div>
                  <Link
                    to={`/news/detail-berita/${
                      berita.link.startsWith("./")
                        ? berita.link.substring(2)
                        : berita.link
                    }`}
                    className="text-blue-600 text-sm font-semibold flex items-center mt-auto"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCardClick(berita.link);
                    }}
                  >
                    Baca Selengkapnya <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md text-gray-500 disabled:text-gray-300"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-2 text-gray-500">
                {page}
              </span>
            ) : (
              <button
                key={index}
                onClick={() => changePage(page)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )
          )}
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md text-gray-500 disabled:text-gray-300"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="text-sm text-gray-600">
          {startRecord} - {endRecord} dari ({totalRecords}) record
        </div>
      </div>
    </div>
  );
}
