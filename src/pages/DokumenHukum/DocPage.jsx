import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Filter } from "lucide-react";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import DocCard from "../../components/DokumenHukum/DocCard";
import PopularDocument from "../../components/PopularDocument";
import SearchFilter from "../../components/common/SearchFilter";
import Pagination from "../../components/common/Pagination";

// Fungsi proxy logo
const proxiedLogo = (logo) =>
  logo?.startsWith("http://")
    ? `https://images.weserv.nl/?url=${logo.replace("http://", "")}`
    : logo;

const DocPage = ({
  apiUrl,
  title: pageTitle,
  breadcrumbPaths,
  webmasterId,
  years = [],
  documentTypes = [],
  includeStatus = false,
  includeCategory = false,
  detailPath = "",
  customMap = null,
}) => {
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState(pageTitle);
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

  useEffect(() => {
    fetchDocuments();
  }, [currentPage, filters]);

  const fetchDocuments = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", currentPage);
      if (webmasterId) params.append("webmaster_id", webmasterId);

      if (filters.searchQuery) params.append("search", filters.searchQuery);
      if (filters.number) params.append("classification", filters.number);
      if (filters.type) params.append("type", filters.type);
      if (filters.year) params.append("year", filters.year);

      const response = await fetch(`${apiUrl}?${params.toString()}`);
      const result = await response.json();

      let rawDocs = [];
      let mappedDocs = [];

      if (Array.isArray(result.data)) {
        rawDocs = result.data;

        const docsWithSlug = await Promise.all(
          rawDocs.map(async (item) => {
            if (customMap) return customMap(item);
            try {
              const detailRes = await fetch(
                `https://jdih.pisdev.my.id/api/v2/topics/${item.id}`
              );
              const detailData = await detailRes.json();
              return {
                id: item.id,
                slug: detailData.data?.seo_url_slug_id || item.id,
                title: item.title || "Tanpa Judul",
                year:
                  detailData.data?.fields?.find(
                    (f) => f.title === "Tahun Terbit"
                  )?.details || "-",
                status:
                  detailData.data?.fields?.find(
                    (f) => f.title === "Subjek Artikel"
                  )?.details || "-",
                category:
                  detailData.data?.fields?.find(
                    (f) => f.title === "T.E.U Badan/Pengarang"
                  )?.details || "-",
                bidang: detailData.data?.fields?.find(
                  (f) => f.title === "Bidang Hukum"
                )?.details,
                nomorPutusan: detailData.data?.fields?.find(
                  (f) => f.title === "Nomor Putusan"
                )?.details,
                image:
                  proxiedLogo(item.image) ||
                  "http://via.placeholder.com/100x150",
              };
            } catch (err) {
              return {
                id: item.id,
                slug: item.id,
                title: item.title || "Tanpa Judul",
                year: "-",
                status: "-",
                category: "-",
                image:
                  proxiedLogo(item.image) ||
                  "http://via.placeholder.com/100x150",
              };
            }
          })
        );

        mappedDocs = docsWithSlug;
        setTotalItems(result.pagination?.total || rawDocs.length || 0);
      } else {
        rawDocs = result.data?.data || [];

        mappedDocs = rawDocs.map((item) => {
          const fields = item.fields || [];
          const getField = (fieldName) =>
            fields.find((f) => f.title === fieldName)?.details;

          return {
            id: item.id,
            slug: item.seo_url_slug_id,
            title: item.title || "Tanpa Judul",
            year: getField("Tahun Terbit"),
            status: getField("Subjek Artikel") || getField("Subjek"),
            category:
              getField("T.E.U Badan/Pengarang") || getField("T.E.U Badan"),
            bidang: getField("Bidang Hukum"),
            nomorPutusan:
              getField("Nomor Putusan") || getField("Nomor Panggil"),
            image:
              proxiedLogo(item.image) || "http://via.placeholder.com/100x150",
          };
        });

        setTotalItems(result.data?.pagination?.total || 0);
      }

      setDocuments(mappedDocs);
    } catch (error) {
      console.error("Error fetching document data:", error);
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
            includeStatus={includeStatus}
            includeCategory={includeCategory}
          />

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
                  year={doc.year}
                  status={doc.status}
                  category={doc.category}
                  bidang={doc.bidang}
                  nomorPutusan={doc.nomorPutusan}
                  image={doc.image}
                  onDetailClick={() => navigate(`${detailPath}/${doc.slug}`)}
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

export default DocPage;
