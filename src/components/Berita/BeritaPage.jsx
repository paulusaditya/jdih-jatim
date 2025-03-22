"use client";

import { Search, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function BeritaPage() {
  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 406;
  const totalRecords = 8107;
  const recordsPerPage = 9;

  // State untuk input tanggal
  const [showDateInput, setShowDateInput] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  // Hitung data yang ditampilkan
  const startRecord = (currentPage - 1) * recordsPerPage + 1;
  const endRecord = Math.min(currentPage * recordsPerPage, totalRecords);

  // Buat nomor halaman
  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i === 2 && currentPage > 3) {
        pages.push("...");
      } else if (i === totalPages - 1 && currentPage < totalPages - 2) {
        pages.push("...");
      } else {
        pages.push(i);
      }
    }
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  // Handle perubahan halaman
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-xl font-semibold text-blue-800">
          Seputar JDIH Jawa Timur
        </h1>
      </div>

      {/* Pencarian */}
      <div className="bg-blue-50 p-4 rounded-lg mb-8">
        <h2 className="text-sm font-semibold text-blue-800 px-1 mb-3">
          Pencarian
        </h2>
        <div className="flex items-center gap-2">
          {/* Input Pencarian */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Cari berita disini.."
              className="w-full pl-10 pr-4 py-2 border border-blue-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-800"
            />
          </div>

          {/* Button & Input Tanggal */}
          <div className="relative">
            {!showDateInput ? (
              <button
                className="bg-white px-4 py-2 border rounded-md flex items-center justify-center gap-2"
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

      {/* Berita */}
      <div className="mb-8">
        <h2 className="text-3xl text-blue-800 font-semibold mb-6">Berita</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array(9)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="border border-white rounded-xl shadow-sm overflow-hidden bg-white hover:border-blue-600 hover:shadow-md transition duration-300 cursor-pointer"
              >
                <img
                  src="/assets/berita/image113.png"
                  alt="Penghargaan"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-2">
                    02 Maret 2025
                  </div>
                  <h3 className="text-xl font-bold leading-tight pb-2">
                    Pemerintah Provinsi Jawa Timur Kembali Menerima Penghargaan
                    Terbaik III Nasional
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Jakarta, jdih.jatimprov.go.id – Kamis (2/12) Pemerintah
                    Provinsi Jawa Timur kembali meraih penghargaan Anggota
                    Jaringan Dokumentasi dan Informasi Hukum Nasional...
                  </p>
                  <a
                    href="#"
                    className="text-blue-600 text-sm font-semibold flex items-center"
                  >
                    Baca Selengkapnya <span className="ml-1">→</span>
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Pagination */}
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
