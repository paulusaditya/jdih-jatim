"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Filter } from "lucide-react";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import DocCard from "../../components/DokumenHukum/DocCard";
import PopularDocument from "../../components/PopularDocument";
import SearchFilter from "../../components/common/SearchFilter";
import Pagination from "../../components/common/Pagination";

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Propemperda", path: "/propemperda" },
];

const PropemperdaPage = () => {
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState("Dokumen Propemperda");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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

  useEffect(() => {
    fetchDocuments();
  }, [currentPage, filters]);

  const fetchDocuments = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", currentPage);

      if (filters.searchQuery) params.append("search", filters.searchQuery);
      if (filters.number) params.append("classification", filters.number);
      if (filters.type) params.append("type", filters.type);
      if (filters.year) params.append("year", filters.year);

      const response = await fetch(
        `http://54.169.231.19/api/v2/home/propemperda?${params.toString()}`
      );
      const data = await response.json();

      setDocuments(data.data || []);
      setTitle(data.title || "Dokumen Propemperda");
      setTotalPages(data.pagination.last_page || 1);
      setTotalItems(data.pagination.total || 0);
    } catch (error) {
      console.error("Error fetching propemperda data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchDocuments();
  };

  const years = [
    "",
    "2025",
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
  ];
  const documentTypes = [
    "",
    "Buku",
    "Jurnal",
    "Artikel",
    "Penelitian",
    "Lainnya",
  ];

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
          />

          {/* Data count display */}
          <div className="flex flex-wrap gap-10 justify-between items-center mt-5 w-full max-md:max-w-full">
            <div className="self-stretch my-auto text-base font-semibold text-zinc-800">
              Semua Data ({totalItems})
            </div>
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
                  onDetailClick={() =>
                    navigate(`/dokumentasi/propemperda/${doc.id}`)
                  }
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                {isLoading
                  ? "Memuat data..."
                  : "Tidak ada dokumen yang ditemukan"}
              </div>
            )}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
        <div className="w-full mt-6">
          <PopularDocument />
        </div>
      </div>
    </>
  );
};

export default PropemperdaPage;
