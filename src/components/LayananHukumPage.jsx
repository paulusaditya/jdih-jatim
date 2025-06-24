"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Pagination from "./common/Pagination";
import { Link } from "react-router-dom";
import axios from "axios";

export default function LayananHukumPage() {
  const [allDocuments, setAllDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(
          "https://jdih.pisdev.my.id/api/v2/topics?webmaster_section_id=28"
        );
        const data = response.data?.data?.data || [];

        const documents = data.map((item) => ({
          id: item.id,
          title: item.title || item.seo_title_id || "Tanpa Judul",
          comments: item.comment_count || 0,
          slug: item.seo_url_slug_id,
          image: item.image,
        }));

        setAllDocuments(documents);
        setLoading(false);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  useEffect(() => {
    const filtered = allDocuments.filter((doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDocuments(filtered);
    setCurrentPage(1);
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
      <div className="max-w-7xl mx-auto p-6">
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
          {loading ? (
            <p className="text-center text-gray-500">Memuat data...</p>
          ) : currentDocs.length === 0 ? (
            <p className="text-center text-gray-500">
              Tidak ada dokumen ditemukan.
            </p>
          ) : (
            currentDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-white shadow-md border border-gray-200 rounded-2xl overflow-hidden"
              >
                <div className="p-6 flex gap-6">
                  <div className="w-32 h-44 flex-shrink-0 overflow-hidden rounded-lg border border-gray-300 bg-gray-100">
                    <img
                      src={doc.image}
                      alt={doc.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4 leading-tight">
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
                        to={`/layanan-hukum/komentar/${doc.slug}`}
                        className="px-6 py-3 text-base font-medium text-green-600 border-2 border-green-600 rounded-lg hover:bg-green-50 transition-colors inline-block"
                      >
                        Berikan Komentar
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {!loading && (
          <Pagination
            currentPage={currentPage}
            totalItems={totalRecords}
            itemsPerPage={recordsPerPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
