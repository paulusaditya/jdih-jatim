"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Filter } from "lucide-react"
import Breadcrumbs from "../../components/Breadcrumbs"
import DocCard from "../../components/DokumenHukum/DocCard"
import PopularDocument from "../../components/PopularDocument"

const CustomSelect = ({ options, value, onChange, name }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleSelect = (option) => {
    onChange({ target: { name, value: option } })
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownRef])

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center justify-between px-4 py-3 mt-1.5 w-full bg-white rounded-lg border border-blue-300 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-zinc-600">{value || name}</span>
        <span className="text-zinc-600">▼</span>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full bg-blue-50 border text-blue-800 border-blue-300 rounded-lg mt-1">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-4 py-3 hover:bg-blue-100 hover:rounded-lg cursor-pointer hover:font-semibold"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Dokumentasi Hukum Lainnya", path: "/dokumentasi" },
  { label: "Propemperda", path: "/propemperda" },
]

const PropemperdaPage = () => {
  const [documents, setDocuments] = useState([])
  const [title, setTitle] = useState("Dokumen Propemperda")
  const [description, setDescription] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Search and filter states
  const [filters, setFilters] = useState({
    number: "",
    year: "",
    type: "",
    searchQuery: "",
  })

  const itemsPerPage = 10
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    fetchDocuments()
  }, [currentPage])

  const fetchDocuments = async () => {
    setIsLoading(true)
    try {
      // Build query parameters
      const params = new URLSearchParams()
      params.append("page", currentPage)

      if (filters.searchQuery) params.append("search", filters.searchQuery)
      if (filters.number) params.append("classification", filters.number)
      if (filters.type) params.append("type", filters.type)
      if (filters.year) params.append("year", filters.year)

      const response = await fetch(`http://54.169.231.19/api/v2/home/propemperda?${params.toString()}`)
      const data = await response.json()

      setDocuments(data.data || [])
      setTitle(data.title || "Dokumen Propemperda")
      setDescription(data.description || "")
      setTotalPages(data.pagination.last_page || 1)
      setTotalItems(data.pagination.total || 0)
    } catch (error) {
      console.error("Error fetching propemperda data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleSearch = () => {
    setCurrentPage(1) // Reset to first page when searching
    fetchDocuments()
  }

  const handleReset = () => {
    setFilters({
      number: "",
      year: "",
      type: "",
      searchQuery: "",
    })
    setCurrentPage(1)
    // Fetch documents with reset filters
    setTimeout(fetchDocuments, 0)
  }

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage
  const indexOfLastItem = indexOfFirstItem + itemsPerPage

  // Years for dropdown
  const years = ["", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"]

  // Document types for dropdown
  const documentTypes = ["", "Buku", "Jurnal", "Artikel", "Penelitian", "Lainnya"]

  return (
    <>
      <Breadcrumbs paths={breadcrumbPaths} />
      <div className="p-16 bg-white grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {/* Search and Filter Section */}
          <div className="flex flex-col p-8 w-full text-base bg-blue-50 rounded-xl max-md:px-5 max-md:max-w-full">
            <h2 className="text-lg font-semibold mb-4">Pencarian</h2>
            <div className="flex flex-wrap gap-4 items-end w-full max-md:max-w-full">
              <div className="flex flex-col grow shrink w-44">
                <input
                  type="text"
                  name="number"
                  value={filters.number}
                  onChange={handleChange}
                  placeholder="Nomor Klasifikasi"
                  className="flex overflow-hidden gap-2.5 items-center px-4 py-3 mt-1.5 w-full bg-white rounded-lg border border-blue-300 border-solid text-stone-300"
                />
              </div>
              <div className="flex flex-col grow shrink w-32">
              <CustomSelect options={documentTypes} value={filters.type} onChange={handleChange} name="type" />
              </div>
              <div className="flex flex-col grow shrink w-32">
              <CustomSelect options={years} value={filters.year} onChange={handleChange} name="year" />
              </div>
            </div>

            <div className="flex flex-col mt-6 w-full text-stone-300 max-md:max-w-full">
              <div className="flex items-center w-full bg-white rounded-lg border border-blue-300 border-solid max-md:max-w-full">
                <Search size={20} className="ml-3" />
                <input
                  type="text"
                  name="searchQuery"
                  value={filters.searchQuery}
                  onChange={handleChange}
                  placeholder="Silahkan ketikan dokumen yang kamu cari disini.."
                  className="flex-1 p-3 border-none rounded-lg focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center items-center px-5 py-3 mt-6 w-full text-sm font-semibold leading-6 text-white bg-blue-600 rounded-xl max-md:max-w-full">
              <button
                onClick={handleSearch}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer"
              >
                <Search size={20} /> Cari Sekarang
              </button>
            </div>
          </div>

          {/* Data count display */}
          <div className="flex flex-wrap gap-10 justify-between items-center mt-5 w-full max-md:max-w-full">
            <div className="self-stretch my-auto text-base font-semibold text-zinc-800">Semua Data ({totalItems})</div>
            {isLoading ? (
              <span className="text-sm text-gray-500">Loading...</span>
            ) : (
              <div className="flex gap-2 justify-center items-center self-stretch px-3 my-auto w-10 h-10 bg-emerald-50 rounded-lg border border-emerald-200 border-solid">
                <Filter className="text-emerald-600 w-6 h-6" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4">
            {documents.length > 0 ? (
              documents.map((doc) => (
                <DocCard
                  key={doc.id}
                  title={doc.title}
                  year={doc.year || "-"}
                  status={"-"}
                  category={"Propemperda"}
                  image={doc.image}
                  onDetailClick={() => navigate(`/dokumentasi/propemperda/${doc.id}`)}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                {isLoading ? "Memuat data..." : "Tidak ada dokumen yang ditemukan"}
              </div>
            )}
          </div>

          {documents.length > 0 && (
            <div className="flex flex-wrap gap-10 justify-between items-center p-3 mt-5 w-full text-center rounded-lg bg-zinc-100 max-md:max-w-full">
              <div className="flex gap-4 justify-center items-center self-stretch my-auto text-sm font-medium leading-6 whitespace-nowrap min-w-[240px] text-zinc-800">
                <button
                  className={`cursor-pointer ${currentPage === 1 ? "text-gray-400" : "text-blue-600"}`}
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt; Prev
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Show at most 5 page numbers
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }

                  return (
                    <div
                      key={i}
                      className={`self-stretch my-auto w-[31px] text-center cursor-pointer ${
                        currentPage === pageNum ? "font-bold text-blue-600" : "text-zinc-800"
                      }`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </div>
                  )
                })}
                <button
                  className={`cursor-pointer ${currentPage === totalPages ? "text-gray-400" : "text-blue-600"}`}
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next &gt;
                </button>
              </div>
              <div className="self-stretch my-auto text-xs text-zinc-800">
                {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, totalItems)} dari {totalItems} record
              </div>
            </div>
          )}
        </div>
        <div className="w-full mt-6">
          <PopularDocument />
        </div>
      </div>
    </>
  )
}

export default PropemperdaPage

