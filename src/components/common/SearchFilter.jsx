"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import axios from "axios"
import CustomSelect from "./CustomSelect"
import baseUrl from "../../config/api"

const SearchFilter = ({ filters, onChange, onSearch, webmasterSectionId }) => {
  const [documentTypes, setDocumentTypes] = useState([
    { value: "peraturan-daerah", label: "Peraturan Daerah" },
    { value: "peraturan-gubernur", label: "Peraturan Gubernur" },
    { value: "keputusan-gubernur", label: "Keputusan Gubernur" },
    { value: "surat-keputusan-gubernur", label: "Surat Keputusan Gubernur" },
    { value: "instruksi-gubernur", label: "Instruksi Gubernur" },
    { value: "keputusan-bersama-gubernur", label: "Keputusan Bersama Gubernur" },
    { value: "keputusan-atas-nama-gubernur", label: "Keputusan Atas Nama Gubernur" },
  ])
  const [years, setYears] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!webmasterSectionId) return

    const fetchFilterOptions = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${baseUrl}/topics/filter-options?webmaster_section_id=${webmasterSectionId}`)

        if (response.data && response.data.status === "success") {
          const data = response.data.data || []

          // Only extract years from API response, document types are now hardcoded
          const yearField = data.find((field) => field.name === "tahun" || field.name === "year")

          if (yearField && yearField.options) {
            setYears(
              yearField.options.map((option) => ({
                value: option,
                label: option,
              })),
            )
          } else {
            // Generate years if not provided by API (current year back to 1900)
            const currentYear = new Date().getFullYear()
            const yearOptions = []
            for (let year = currentYear; year >= 1900; year--) {
              yearOptions.push({ value: year.toString(), label: year.toString() })
            }
            setYears(yearOptions)
          }
        } else {
          console.error("Failed to fetch filter options: Invalid response format")
        }
      } catch (error) {
        console.error("Failed to fetch filter options:", error)

        // Fallback: Generate default years if API fails
        const currentYear = new Date().getFullYear()
        const yearOptions = []
        for (let year = currentYear; year >= 1900; year--) {
          yearOptions.push({ value: year.toString(), label: year.toString() })
        }
        setYears(yearOptions)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFilterOptions()
  }, [webmasterSectionId])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    onChange({
      target: {
        name,
        value: value,
      },
    })
  }

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    onChange({
      target: {
        name,
        value: value,
      },
    })
  }

  return (
    <div className="flex flex-col px-8 py-8 w-full text-base bg-green-50 rounded-xl max-md:px-4 max-md:max-w-full">
      <h2 className="text-lg font-semibold mb-6">Pencarian</h2>

      {isLoading ? (
        <div className="text-center py-4">
          <span className="text-gray-600">Memuat opsi filter...</span>
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          {/* Main Search Input */}
          <div className="w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="nama_dokumen"
                value={filters.nama_dokumen || ""}
                onChange={handleInputChange}
                placeholder="Silahkan ketikan dokumen yang kamu cari disini.."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap gap-4 items-end w-full">
            {/* Document Number */}
            <div className="flex flex-col grow shrink min-w-0 basis-0">
              <input
                type="text"
                name="nomor_dokumen"
                value={filters.nomor_dokumen || ""}
                onChange={handleInputChange}
                placeholder="Nomer Dokumen"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Document Type Dropdown */}
            <div className="flex flex-col grow shrink min-w-0 basis-0">
              <CustomSelect
                id="jenis_dokumen"
                name="jenis_dokumen"
                options={documentTypes}
                value={filters.jenis_dokumen || ""}
                onChange={handleSelectChange}
                placeholder="Jenis Dokumen"
                className="w-full"
              />
            </div>

            {/* Year Dropdown */}
            <div className="flex flex-col grow shrink min-w-0 basis-0">
              <CustomSelect
                id="tahun"
                name="tahun"
                options={years}
                value={filters.tahun || ""}
                onChange={handleSelectChange}
                placeholder="Pilih Tahun"
                className="w-full"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="w-full mt-4">
            <button
              type="button"
              onClick={onSearch}
              className="flex items-center justify-center gap-2 px-6 py-3 w-full text-sm font-semibold leading-6 text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors"
            >
              <Search size={20} /> Cari Sekarang
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchFilter
