import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Filter } from "lucide-react";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import LawCard from "../../components/ProdukHukum/LawCard";
import PopularDocument from "../../components/PopularDocument";
import Kategori from "../../components/Kategori";
import SearchFilter from "../../components/common/SearchFilter";
import Pagination from "../../components/common/Pagination";
import NewOldFilter from "../../components/common/NewOldFilter"; 

const LawPage = ({
  apiUrl,
  title: pageTitle,
  breadcrumbPaths,
  sectionId,
  years = [],
  documentTypes = [],
  includeStatus = false,
  includeCategory = false,
  detailPath = "",
  customMap = null,
  customSidebar = null,
  typeToSectionId = {},
  webmasterSectionId = "10",
}) => {
  const [laws, setLaws] = useState([]);
  const [title, setTitle] = useState(pageTitle);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

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

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchLaws();
  }, [currentPage, filters, sortOrder]);

  const fetchLaws = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("per_page", itemsPerPage);
      params.append("page", currentPage);
      params.append("webmaster_section_id", webmasterSectionId);
      params.append("sort_by", "created_at");
      params.append("sort_order", sortOrder);
      params.append("section_id", sectionId);

      if (filters.searchQuery) params.append("search", filters.searchQuery);
      if (filters.number) params.append("classification", filters.number);
      if (filters.type) params.append("type", filters.type);
      if (filters.year) params.append("year", filters.year);

      const fullUrl = `${apiUrl}?${params.toString()}`;
      console.log("Fetching from:", fullUrl);

      const response = await fetch(fullUrl);
      const contentType = response.headers.get("content-type");

      if (!response.ok || !contentType.includes("application/json")) {
        throw new Error(`Invalid response: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response:", result);

      let rawLaws = [];
      let mappedLaws = [];

      if (Array.isArray(result.data)) {
        rawLaws = result.data;

        mappedLaws = await Promise.all(
          rawLaws.map(async (item) => {
            try {
              const detailRes = await fetch(
                `https://jdih.pisdev.my.id/api/v2/topics/${item.id}`
              );
              const detailData = await detailRes.json();
              const fields = {};
              detailData.data?.fields?.forEach(
                (f) => (fields[f.title] = f.details)
              );

              return {
                id: item.id,
                title: fields["Judul Peraturan"] || item.title || "Unknown",
                year: fields["Tahun Terbit"] || "Unknown",
                number: fields["Nomor"] || "Unknown",
                type: fields["Singkatan Jenis"] || "Unknown",
                status: fields["Keterangan Status"] || "-",
                category: fields["Kategori"] || "",
                image: item.image,
                slug: detailData.data?.seo_url_slug_id || item.id,
              };
            } catch (err) {
              console.error("Detail fetch failed:", err);
              return {
                id: item.id,
                title: item.title || "Tanpa Judul",
                year: "-",
                number: "-",
                type: "-",
                status: "-",
                category: "-",
                image: item.image,
                slug: item.id,
              };
            }
          })
        );

        setLaws(mappedLaws);
        setTotalItems(result.pagination?.total || rawLaws.length || 0);
      } else {
        rawLaws = result.data?.data || [];

        if (filters.number) {
          rawLaws = rawLaws.filter(
            (item) => item.classification === filters.number
          );
        }

        mappedLaws = rawLaws.map((item) => {
          const fields = {};
          (item.fields || []).forEach((f) => (fields[f.title] = f.details));

          return {
            id: item.id,
            title: fields["Judul Peraturan"] || item.title || "Unknown",
            year: fields["Tahun Terbit"] || fields["Tahun"] || "-",
            number: fields["Nomor"] || "-",
            type: fields["Singkatan Jenis"] || "-",
            status:
              fields["Keterangan Status"] || fields["Subjek Artikel"] || "-",
            category:
              fields["Kategori"] || fields["T.E.U Badan/Pengarang"] || "-",
            image: item.image,
            slug: item.seo_url_slug_id || item.id,
          };
        });

        setLaws(mappedLaws);
        setTotalItems(result.data?.pagination?.total || 0);
      }
    } catch (error) {
      console.error("Error fetching law data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-16 bg-white grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <SearchFilter
          filters={filters}
          onChange={handleChange}
          onSearch={handleSearch}
          webmasterSectionId={webmasterSectionId}
        />

        <div className="flex flex-wrap gap-10 justify-between items-center mt-5 w-full max-md:max-w-full">
          <div className="self-stretch my-auto text-base font-semibold text-zinc-800">
            Semua Dokumen Hukum ({totalItems})
          </div>
          {isLoading ? (
            <span className="text-sm text-gray-500">Loading...</span>
          ) : (
            <div className="flex justify-between items-center mt-5">
              <NewOldFilter onSortChange={handleSortChange} />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 mt-4">
          {laws.length > 0 ? (
            laws.map((law) => (
              <LawCard
                key={law.id}
                title={law.title}
                year={law.year}
                number={law.number}
                type={law.type}
                status={law.status}
                category={law.category}
                image={law.image}
                onDetailClick={() => navigate(`${detailPath}/${law.slug}`)}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              {isLoading
                ? "Memuat data..."
                : "Tidak ada dokumen hukum yang ditemukan"}
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
        {customSidebar !== null ? (
          customSidebar
        ) : (
          <div className="mt-6">
            <PopularDocument sectionId={sectionId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LawPage;
