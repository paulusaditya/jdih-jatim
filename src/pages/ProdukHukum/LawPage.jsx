"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, ChevronLeft, ChevronRight } from "lucide-react"; 
import Breadcrumbs from "../../components/Breadcrumbs";
import LawCard from "../../components/ProdukHukum/LawCard";
import Kategori from "../../components/Kategori";
import PopularDocument from "../../components/PopularDocument";
import SearchFilter from "../../components/SearchFilter"; 
import productLawData from "../../data/productLawData"; 

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Dokumentasi Hukum Lainnya", path: "/dokumentasi" },
  { label: "Propemperda", path: "/propemperda" },
];

const LawPage = () => {
  const [documents, setDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Search and filter states
  const [filters, setFilters] = useState({
    number: "",
    status: "",
    category: "",
    type: "",
    year: "",
    searchQuery: "",
  });

  const itemsPerPage = 20;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const filteredLaws = productLawData
    .flatMap((item) => item.laws)
    .filter((law) => {
      const matchesNumber = filters.number
        ? law.number.toString().includes(filters.number)
        : true;
      const matchesStatus = filters.status
        ? law.status === filters.status
        : true;
      const matchesCategory = filters.category
        ? law.category === filters.category
        : true;
      const matchesType = filters.type ? law.type === filters.type : true;
      const matchesYear = filters.year
        ? law.year.toString() === filters.year
        : true;
      const matchesSearchQuery = filters.searchQuery
        ? law.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
        : true;

      return (
        matchesNumber &&
        matchesStatus &&
        matchesCategory &&
        matchesType &&
        matchesYear &&
        matchesSearchQuery
      );
    });

  const totalItems = filteredLaws.length; 
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = indexOfFirstItem + itemsPerPage;
  const currentLaws = filteredLaws.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Breadcrumbs paths={breadcrumbPaths} />
      <div className="p-16 bg-white grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <SearchFilter
            filters={filters}
            onChange={handleChange}
            onSearch={handleSearch}
            years={["", "2025", "2024", "2023", "2022", "2021", "2020", "2019"]}
            documentTypes={[
              "",
              "Peraturan Daerah",
              "Peraturan Gubernur",
              "Keputusan Gubernur",
              "Surat Keputusan Gubernur",
              "Instruksi Gubernur",
              "Keputusan Bersama Gubernur",
              "Keputusan Atas Nama Gubernur",
            ]}
            categories={[
              "",
              "Keuangan",
              "Tata Ruang",
              "Pendidikan",
              "Kesehatan",
            ]}
            includeStatus={true}
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
            {currentLaws.length > 0 ? (
              currentLaws.map((law, index) => (
                <LawCard
                  key={index}
                  title={`Peraturan ${law.type} Nomor ${law.number} Tahun ${law.year} tentang ${law.title}`}
                  year={law.year}
                  status={law.status}
                  regulationType={law.type}
                  onDetailClick={() =>
                    navigate(`/law/${law.number}/${law.year}`)
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
          {currentLaws.length > 0 && (
            <div className="flex flex-wrap gap-10 justify-between items-center p-3 mt-5 w-full text-center rounded-lg bg-zinc-100 max-md:max-w-full">
              <div className="flex gap-4 justify-center items-center self-stretch my-auto text-sm font-medium leading-6 whitespace-nowrap min-w-[240px] text-zinc-800">
                <ChevronLeft
                  className={`cursor-pointer ${
                    currentPage === 1 ? "text-gray-400" : "text-blue-600"
                  }`}
                  onClick={() =>
                    currentPage > 1 && handlePageChange(currentPage - 1)
                  }
                />
                {Array.from(
                  { length: Math.ceil(totalItems / itemsPerPage) },
                  (_, i) => (
                    <div
                      key={i}
                      className={`self-stretch my-auto w-[31px] text-center cursor-pointer ${
                        currentPage === i + 1
                          ? "font-bold text-blue-600"
                          : "text-zinc-800"
                      }`}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </div>
                  )
                )}
                <ChevronRight
                  className={`cursor-pointer ${
                    currentPage === Math.ceil(totalItems / itemsPerPage)
                      ? "text-gray-400"
                      : "text-blue-600"
                  }`}
                  onClick={() =>
                    currentPage < Math.ceil(totalItems / itemsPerPage) &&
                    handlePageChange(currentPage + 1)
                  }
                />
              </div>
              <div className="self-stretch my-auto text-xs text-zinc-800">
                {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, totalItems)}{" "}
                dari {totalItems} record
              </div>
            </div>
          )}
        </div>
        <div className="w-full ">
          <Kategori />
          <div className="mt-6">
            <PopularDocument />
          </div>
        </div>
      </div>
    </>
  );
};

export default LawPage;
