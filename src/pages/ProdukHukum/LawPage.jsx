"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter } from "lucide-react";
import axios from "axios";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import LawCard from "../../components/ProdukHukum/LawCard";
import Kategori from "../../components/Kategori";
import PopularDocument from "../../components/PopularDocument";
import SearchFilter from "../../components/common/SearchFilter";
import Pagination from "../../components/common/Pagination";

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Dokumentasi Hukum Lainnya", path: "/dokumentasi" },
  { label: "Propemperda", path: "/propemperda" },
];

const LawPage = () => {
  const [documents, setDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [lastPage, setLastPage] = useState(1);

  const [filters, setFilters] = useState({
    number: "",
    status: "",
    category: "",
    type: "",
    year: "",
    searchQuery: "",
  });

  const itemsPerPage = 10;
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://jdih.pisdev.my.id/api/v2/topics?page=${currentPage}&per_page=${itemsPerPage}&webmaster_id=10`
      );
      const topics = res.data.data.data;

      const mapped = topics.map((item) => {
        const fields = Object.fromEntries(
          item.fields.map((field) => [field.title, field.details])
        );

        return {
          id: item.id,
          title: item.title,
          year: fields["Tahun Terbit"] || "Unknown",
          number: fields["Nomor"] || "Unknown",
          type: fields["Jenis Peraturan"] || "Unknown",
          status: fields["Status"] || "Unknown",
          category: fields["Kategori"] || "",
          image: item.image,
          slug: item.seo_url_slug_id,
        };
      });

      setDocuments(mapped);
      setTotalItems(res.data.data.pagination.total);
      setLastPage(res.data.data.pagination.last_page);
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData();
  };

  const filteredLaws = documents.filter((law) => {
    const matchesNumber = filters.number
      ? law.number.toString().includes(filters.number)
      : true;
    const matchesStatus = filters.status ? law.status === filters.status : true;
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

  return (
    <>
      <Breadcrumbs paths={breadcrumbPaths} />
      <div className="p-8 mx-0 md:mx-8 bg-white grid grid-cols-1 md:grid-cols-3 gap-6">
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

          <div className="flex flex-wrap gap-10 justify-between items-center mt-5 w-full max-md:max-w-full">
            <div className="self-stretch my-auto text-base font-semibold text-zinc-800">
              Semua Data ({totalItems})
            </div>
            <div className="flex gap-2 justify-center items-center self-stretch px-3 my-auto w-10 h-10 bg-emerald-50 rounded-lg border border-emerald-200 border-solid">
              <Filter className="text-emerald-600 w-6 h-6" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4">
            {filteredLaws.length > 0 ? (
              filteredLaws.map((law) => (
                <LawCard
                  key={law.id}
                  title={`Peraturan ${law.type} Nomor ${law.number} Tahun ${law.year} tentang ${law.title}`}
                  year={law.year}
                  status={law.status}
                  regulationType={law.type}
                  onDetailClick={() => navigate(`/law/${law.slug}`)}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                Tidak ada dokumen yang ditemukan
              </div>
            )}
          </div>

          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>

        <div className="w-full">
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
