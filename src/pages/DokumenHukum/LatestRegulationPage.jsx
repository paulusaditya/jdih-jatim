"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter } from "lucide-react";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import LawCard from "../../components/ProdukHukum/LawCard";
import SearchFilter from "../../components/common/SearchFilter";
import PopularDocument from "../../components/PopularDocument";
import LoadingSpinner from "../../components/common/LoadingSpinner"


const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Peraturan Terbaru", path: "/peraturan-terbaru" },
];

const LatestRegulationPage = () => {
  const [regulations, setRegulations] = useState([]);
  const [title, setTitle] = useState("Peraturan Terbaru");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState({
    number: "",
    year: "",
    type: "",
    searchQuery: "",
  });

  const itemsPerPage = 10;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const fetchRegulations = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", currentPage);
  
      if (filters.searchQuery) params.append("search", filters.searchQuery);
      if (filters.number) params.append("classification", filters.number);
      if (filters.type) params.append("type", filters.type);
      if (filters.year) params.append("year", filters.year);
  
      const response = await fetch(
        `https://jdih.pisdev.my.id/api/v2/home/latest-policy?${params.toString()}`
      );
      if (!response.ok) throw new Error("Gagal fetch peraturan");
  
      const data = await response.json();
  
      const regulationsWithSlugs = await Promise.all(
        data.data.map(async (regulation) => {
          try {
            const detailRes = await fetch(
              `https://jdih.pisdev.my.id/api/v2/topics/${regulation.id}`
            );
            const detailData = await detailRes.json();
            return {
              ...regulation,
              slug: detailData.data?.seo_url_slug_id || null,
            };
          } catch {
            return {
              ...regulation,
              slug: null,
            };
          }
        })
      );
  
      setRegulations(regulationsWithSlugs);
      setTitle(data.title || "Peraturan Terbaru");
      setTotalItems(data.pagination?.total || 0);
    } catch (error) {
      console.error("Gagal mengambil data peraturan:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    fetchRegulations();
  }, [currentPage, filters]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchRegulations();
  };

  const years = ["", "2025", "2024", "2023", "2022", "2021"];
  const documentTypes = ["", "Peraturan", "Undang-Undang", "Keputusan", "Lainnya"];

  return (
    <>
      <Breadcrumbs paths={breadcrumbPaths} />
      <div className="p-16 bg-white grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <SearchFilter
            filters={filters}
            onChange={handleChange}
            onSearch={handleSearch}
            years={years}
            documentTypes={documentTypes}
            includeStatus={false}
            includeCategory={false}
          />

          {/* Header */}
          <div className="flex flex-wrap gap-10 justify-between items-center mt-5 w-full max-md:max-w-full">
            <div className="text-base font-semibold text-zinc-800">
              Semua Data ({totalItems})
            </div>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <div className="flex gap-2 items-center px-3 w-10 h-10 bg-emerald-50 rounded-lg border border-emerald-200">
                <Filter className="text-emerald-600 w-6 h-6" />
              </div>
            )}
          </div>

          {/* List */}
          <div className="grid grid-cols-1 gap-4 mt-4">
            {regulations.length > 0 ? (
              regulations.map((reg) => {
                // Gunakan proxy jika logo pakai http://
                const imageUrl = reg.logo?.startsWith("http://")
                  ? `https://images.weserv.nl/?url=${reg.logo.replace("http://", "")}`
                  : reg.logo || null;

                return (
                  <LawCard
                    key={reg.id}
                    title={reg.title}
                    year={getField(reg, "Tahun Terbit")}
                    status="-"
                    category={getField(reg, "Jenis Peraturan")}
                    image={imageUrl}
                    onDetailClick={() => navigate(`/peraturan-terbaru/${reg.slug}`)}
                  />
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500">
                {isLoading ?       <LoadingSpinner /> : "Tidak ada data ditemukan"}
              </div>
            )}
          </div>

          {/* Custom Pagination */}
          <PaginationCustom
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Sidebar */}
        <div className="w-full mt-6">
          <PopularDocument />
        </div>
      </div>
    </>
  );
};

// Fungsi bantu untuk ambil field dari array fields[]
function getField(item, title) {
  const field = item.fields?.find((f) => f.title === title);
  return field ? field.details : "-";
}

// Komponen Pagination Custom
const PaginationCustom = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  const generatePages = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const pages = [1];
    if (currentPage > 3) pages.push("...");

    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("...");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex justify-between items-center mt-6 px-4 py-2 bg-gray-100 rounded">
      {/* Tombol navigasi */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 rounded disabled:text-gray-400"
        >
          &lt;
        </button>

        {generatePages().map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-blue-700 text-white"
                  : "text-gray-800 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 rounded disabled:text-gray-400"
        >
          &gt;
        </button>
      </div>

      {/* Info jumlah data */}
      <div className="text-sm text-gray-600">
        {start} - {end} dari ({totalItems}) record
      </div>
    </div>
  );
};

export default LatestRegulationPage;
