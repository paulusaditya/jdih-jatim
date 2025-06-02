"use client"

import { Search, FileText } from "lucide-react"
import { useState } from "react"

export default function FloatingSearchComponent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [documentNumber, setDocumentNumber] = useState("")
  const [documentType, setDocumentType] = useState("")
  const [year, setYear] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    console.log("Searching with:", {
      searchQuery,
      documentNumber,
      documentType,
      year,
    })
  }

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 z-50">
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 shadow-lg">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Selamat Datang Di</h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">JDIH Jawa Timur</h2>
          <p className="text-gray-600 text-base">
            Silahkan Cari Dokumen Produk Hukum Disini <span className="text-lg">🙏</span>
          </p>
        </div>

        <form onSubmit={handleSearch} className="space-y-6">
          {/* Main Search Field */}
          <div className="relative">
            <input
              type="text"
              placeholder="Silahkan ketikan dokumen yang kamu cari disini.."
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Filter Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Nomor Dokumen */}
            <div className="relative">
              <input
                type="text"
                placeholder="Nomer Dokumen"
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Jenis Dokumen */}
            <div className="relative">
              <select
                className="w-full pl-4 pr-10 py-4 border border-gray-200 rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none appearance-none transition-colors"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
              >
                <option value="" className="text-gray-400">
                  Jenis Dokumen
                </option>
                <option value="peraturan-daerah">Peraturan Daerah</option>
                <option value="peraturan-gubernur">Peraturan Gubernur</option>
                <option value="keputusan-gubernur">Keputusan Gubernur</option>
                <option value="instruksi-gubernur">Instruksi Gubernur</option>
                <option value="surat-edaran">Surat Edaran</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Pilih Tahun */}
            <div className="relative">
              <select
                className="w-full pl-4 pr-10 py-4 border border-gray-200 rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none appearance-none transition-colors"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="" className="text-gray-400">
                  Pilih Tahun
                </option>
                {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl shadow-md flex items-center justify-center gap-2 text-lg transition-colors duration-200"
          >
            <Search className="h-5 w-5" />
            Cari Sekarang
          </button>
        </form>
      </div>
    </div>
  )
}
