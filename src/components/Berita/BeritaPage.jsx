"use client";

import { Search, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Pagination from "../../components/common/Pagination";
import baseUrl from "../../config/api";

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
          `${baseUrl}/topics?webmaster_section_id=3&per_page=50&page=${currentPage}`
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

  const cleanDescription = (text) => {
    if (!text) return "Tidak ada deskripsi";

    return text
      .replace(/\r\n/g, " ")
      .replace(/\r/g, " ")
      .replace(/\n/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&ldquo;/g, '"')
      .replace(/&rdquo;/g, '"')
      .replace(/&lsquo;/g, "'")
      .replace(/&rsquo;/g, "'")
      .replace(/&ndash;/g, "–")
      .replace(/&mdash;/g, "—")
      .replace(/&hellip;/g, "...")
      .replace(/&copy;/g, "©")
      .replace(/&reg;/g, "®")
      .replace(/&trade;/g, "™")
      .replace(/&deg;/g, "°")
      .replace(/&plusmn;/g, "±")
      .replace(/&frac12;/g, "½")
      .replace(/&frac14;/g, "¼")
      .replace(/&frac34;/g, "¾")
      .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
      .replace(/&[a-zA-Z]+;/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const totalRecords = filteredBeritaList.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentBeritaList = filteredBeritaList.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  const handleCardClick = (seo_url_slug_id) => {
    const slug = seo_url_slug_id.startsWith("./")
      ? seo_url_slug_id.substring(2)
      : seo_url_slug_id;
    navigate(`/news/detail-berita/${slug}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <h1 className="text-xl font-semibold text-green-800">
          Seputar JDIH Jawa Timur
        </h1>
      </div>

      <div className="bg-green-50 p-4 rounded-lg mb-8">
        <h2 className="text-sm font-semibold text-green-800 px-1 mb-3">
          Pencarian
        </h2>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Cari berita disini.."
              className="bg-white w-full pl-10 pr-4 py-2 border border-green-600 rounded-md focus:outline-none focus:ring-1 focus:ring-green-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            {!showDateInput ? (
              <button
                type="button"
                className="bg-white px-4 py-2 border border-green-600 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                onClick={() => setShowDateInput(true)}
              >
                <span>Tanggal</span>
                <Calendar className="h-4 w-4" />
              </button>
            ) : (
              <input
                type="date"
                className="px-3 py-2 border border-green-600 rounded-md focus:outline-none focus:ring-1 focus:ring-green-800"
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
        <h2 className="text-3xl text-green-800 font-semibold mb-6">Berita</h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: recordsPerPage }).map((_, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white animate-pulse"
              >
                <div className="w-full h-48 bg-gray-200"></div>

                <div className="p-4">
                  <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>

                  <div className="space-y-2 mb-2">
                    <div className="h-6 bg-gray-200 rounded w-full"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>

                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            <p>Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        ) : currentBeritaList.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="flex flex-col items-center">
              <svg
                className="w-16 h-16 text-gray-300 mb-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-lg">Tidak ada data ditemukan.</p>
              <p className="text-sm mt-2">
                Coba ubah kata kunci pencarian atau filter tanggal.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentBeritaList.map((berita) => {
              const cleanedDescription = cleanDescription(
                berita.seo_description_id
              );
              const truncatedDescription =
                cleanedDescription.length > 150
                  ? cleanedDescription.substring(0, 150) + "..."
                  : cleanedDescription;

              return (
                <div
                  key={berita.id}
                  className="border border-white rounded-xl shadow-sm overflow-hidden bg-white hover:border-green-600 hover:shadow-md transition duration-300 cursor-pointer flex flex-col group"
                  onClick={() => handleCardClick(berita.seo_url_slug_id)}
                >
                  <div className="overflow-hidden">
                    <img
                      src={berita.image || "/placeholder.svg"}
                      alt={berita.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "/assets/berita/image113.png";
                      }}
                    />
                  </div>

                  <div className="p-4 flex flex-col h-full">
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-2">
                        {formatDate(berita.date)}
                      </div>
                      <h3 className="text-xl font-bold leading-tight pb-2 group-hover:text-green-600 transition-colors">
                        {berita.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {truncatedDescription}
                      </p>
                    </div>

                    <Link
                      to={`/news/detail-berita/${
                        berita.seo_url_slug_id.startsWith("./")
                          ? berita.seo_url_slug_id.substring(2)
                          : berita.seo_url_slug_id
                      }`}
                      className="text-green-600 text-sm font-semibold flex items-center mt-auto hover:text-green-800 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCardClick(berita.seo_url_slug_id);
                      }}
                    >
                      Baca Selengkapnya <span className="ml-1">→</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {!loading && totalRecords > recordsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalItems={totalRecords}
          itemsPerPage={recordsPerPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
