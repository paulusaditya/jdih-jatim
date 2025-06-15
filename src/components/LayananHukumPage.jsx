"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Pagination from "./common/Pagination";
import { Link } from "react-router-dom";

export default function LayananHukumPage() {
  const [allDocuments, setAllDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Dummy data, ganti ini dengan fetch API bila perlu
    const dummyData = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `Peraturan daerah tentang pekerja perusahaan tahun 2024 - ${
        i + 1
      }`,
      comments: Math.floor(Math.random() * 100),
    }));
    setAllDocuments(dummyData);
  }, []);

  useEffect(() => {
    const filtered = allDocuments.filter((doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDocuments(filtered);
    setCurrentPage(1); // reset ke halaman pertama saat pencarian
  }, [searchQuery, allDocuments]);

  const totalRecords = filteredDocuments.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentDocs = filteredDocuments.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-green-700 mb-6">
          Rancangan Peraturan Daerah
        </h1>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Cari dokumen..."
              className="bg-white w-full pl-10 pr-4 py-2 border border-green-600 rounded-md focus:outline-none focus:ring-1 focus:ring-green-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Document List */}
        <div className="space-y-6">
          {currentDocs.length === 0 ? (
            <p className="text-center text-gray-500">
              Tidak ada dokumen ditemukan.
            </p>
          ) : (
            currentDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-white shadow-md border border-gray-200 rounded-2xl overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex gap-8">
                    <div className="flex-shrink-0">
                      <div className="w-32 h-44 border border-gray-300 rounded-lg shadow-sm overflow-hidden bg-gray-50 flex flex-col">
                        <div className="p-2 border-b border-gray-200">
                          <div className="w-8 h-8 mx-auto mb-1 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-xs">🏛️</span>
                          </div>
                          <div className="text-[6px] text-center text-gray-600 leading-tight">
                            PEMERINTAH DAERAH
                            <br />
                            PROVINSI JAWA TENGAH
                          </div>
                        </div>
                        <div className="p-2 flex-1 space-y-1">
                          {[...Array(12)].map((_, i) => (
                            <div
                              key={i}
                              className="h-1 bg-gray-300 rounded"
                              style={{ width: `${Math.random() * 40 + 60}%` }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-6 leading-tight">
                        {doc.title}
                      </h3>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-lg font-medium text-gray-700">
                            {doc.comments} Komentar
                          </span>
                        </div>

                        <Link
                          to={`/layanan-hukum/komentar/`}
                          className="px-6 py-3 text-base font-medium text-green-600 border-2 border-green-600 rounded-lg hover:bg-green-50 transition-colors inline-block"
                        >
                          Berikan Komentar
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalItems={totalRecords}
          itemsPerPage={recordsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
