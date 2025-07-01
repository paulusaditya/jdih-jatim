"use client";

import { useState } from "react";
import { Search, FileText, ChevronDown } from "lucide-react";

export default function SearchHome() {
  const [searchQuery, setSearchQuery] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [showDocumentDropdown, setShowDocumentDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const documentTypes = [
    "Peraturan Daerah",
    "Peraturan Gubernur",
    "Peraturan Walikota",
    "Peraturan Bupati",
    "Keputusan Gubernur",
    "Instruksi Gubernur",
  ];

  const years = Array.from({ length: 10 }, (_, i) => 2024 - i);

  const handleSearch = () => {
    console.log({
      searchQuery,
      documentNumber,
      selectedDocumentType,
      selectedYear,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl border border-green-300 p-8 shadow-lg backdrop-blur-sm">
        <h1 className="text-4xl md:text-5xl font-bold text-green-600 text-center mb-4">
          Selamat Datang Di JDIH Jawa Timur
        </h1>
        <p className="text-lg text-gray-700 text-center mb-8 font-medium">
          Silahkan cari dokumen produk hukum disini!
        </p>

        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Silahkan ketikan dokumen yang kamu cari disini.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FileText className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Nomer Dokumen"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowDocumentDropdown(!showDocumentDropdown)}
              className="w-full px-4 py-3 bg-white border border-green-200 rounded-lg text-left text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent flex items-center justify-between"
            >
              <span>{selectedDocumentType || "Jenis Dokumen"}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
            {showDocumentDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-green-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {documentTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedDocumentType(type);
                      setShowDocumentDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-green-50 text-gray-700 focus:outline-none focus:bg-green-50"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowYearDropdown(!showYearDropdown)}
              className="w-full px-4 py-3 bg-white border border-green-200 rounded-lg text-left text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent flex items-center justify-between"
            >
              <span>{selectedYear || "Pilih Tahun"}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
            {showYearDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-green-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => {
                      setSelectedYear(year.toString());
                      setShowYearDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-green-50 text-gray-700 focus:outline-none focus:bg-green-50"
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="w-full bg-green-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <Search className="h-4 w-4" />
          Cari Sekarang
        </button>
      </div>
    </div>
  );
}
