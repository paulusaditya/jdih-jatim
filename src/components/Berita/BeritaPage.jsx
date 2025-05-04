"use client";

import { Search, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import Pagination from "../../components/common/Pagination";

export default function BeritaPage() {
  const navigate = useNavigate();

  const [allBeritaList, setAllBeritaList] = useState([]);
  const [filteredBeritaList, setFilteredBeritaList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(9);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showDateInput, setShowDateInput] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchAllBerita();
  }, []);

  useEffect(() => {
    filterBerita();
    setCurrentPage(1);
  }, [searchQuery, selectedDate, allBeritaList]);

  const fetchAllBerita = async () => {
    setLoading(true);
    try {
      let currentPage = 1;
      let fetchedData = [];
      let hasMoreData = true;

      while (hasMoreData) {
        const response = await fetch(
          `https://jdih.pisdev.my.id/api/v2/topics?webmaster_section_id=3&per_page=50&page=${currentPage}`
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        if (data.status === "success") {
          fetchedData = [...fetchedData, ...data.data.data];
          hasMoreData = data.data.data.length > 0;
          currentPage++;
        } else {
          hasMoreData = false;
        }
      }

      setAllBeritaList(fetchedData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterBerita = () => {
    let filtered = allBeritaList.filter((berita) => {
      const matchTitle =
        berita.title &&
        berita.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDate =
        !selectedDate || (berita.date && berita.date.startsWith(selectedDate));
      return matchTitle && matchDate;
    });

    setFilteredBeritaList(filtered);
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options);
  };

  const totalRecords = filteredBeritaList.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentBeritaList = filteredBeritaList.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCardClick = (seo_url_slug_id) => {
    const slug = seo_url_slug_id.startsWith("./")
      ? seo_url_slug_id.substring(2)
      : seo_url_slug_id;
    navigate(`/news/detail-berita/${slug}`);
  };

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
            <LoadingSpinner />
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
                onClick={() => handleCardClick(berita.seo_url_slug_id)}
              >
                <img
                  src={berita.image || "/placeholder.svg"}
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
                      berita.seo_url_slug_id.startsWith("./")
                        ? berita.seo_url_slug_id.substring(2)
                        : berita.seo_url_slug_id
                    }`}
                    className="text-blue-600 text-sm font-semibold flex items-center mt-auto"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCardClick(berita.seo_url_slug_id);
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

      <Pagination
        currentPage={currentPage}
        totalItems={totalRecords}
        itemsPerPage={recordsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
