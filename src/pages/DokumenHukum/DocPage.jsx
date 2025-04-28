import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Filter } from "lucide-react";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import DocCard from "../../components/DokumenHukum/DocCard";
import PopularDocument from "../../components/PopularDocument";
import SearchFilter from "../../components/common/SearchFilter";
import Pagination from "../../components/common/Pagination";
import NewOldFilter from "../../components/common/NewOldFilter";

const webmasterSectionMapping = {
  16: 16,
  17: 17,
  20: 20,
  11: 11,
  15: 15,
  21: 21,
};

const DocPage = ({
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
}) => {
  const [documents, setDocuments] = useState([]);
  const [allDocuments, setAllDocuments] = useState([]);
  const [title, setTitle] = useState(pageTitle);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest"); // newest | oldest

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
  }, []);

  useEffect(() => {
    applyFiltersAndSorting();
  }, [filters, sortOrder, allDocuments, currentPage]);

  const fetchDocuments = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", 1);
      params.append("per_page", 1000); // ambil banyak sekalian
      if (sectionId) params.append("webmaster_section_id", sectionId);

      const response = await fetch(`${apiUrl}?${params.toString()}`);
      const result = await response.json();

      let rawDocs = [];
      let mappedDocs = [];

      if (Array.isArray(result.data)) {
        rawDocs = result.data;
        mappedDocs = await mapDocuments(rawDocs);
        setAllDocuments(mappedDocs);
        setTotalItems(mappedDocs.length);
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
            year: getField("Tahun Terbit") || getField("Tahun"),
            status: getField("Subjek Artikel") || getField("Subjek"),
            category:
              getField("T.E.U Badan/Pengarang") || getField("T.E.U Badan"),
            bidang: getField("Bidang Hukum"),
            nomorPutusan: getField("Nomor Putusan") || getField("Nomor Induk"),
            image: item.image || "http://via.placeholder.com/100x150",
          };
        });
        setAllDocuments(mappedDocs);
        setTotalItems(mappedDocs.length);
      }
    } catch (error) {
      console.error("Error fetching document data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const mapDocuments = async (rawDocs) => {
    return await Promise.all(
      rawDocs.map(async (item) => {
        if (customMap) return customMap(item);
        try {
          const detailRes = await fetch(`https://jdih.pisdev.my.id/api/v2/topics/${item.id}`);
          const detailData = await detailRes.json();
          return {
            id: item.id,
            slug: detailData.data?.seo_url_slug_id || item.id,
            title: item.title || "Tanpa Judul",
            year:
              detailData.data?.fields?.find((f) => f.title === "Tahun Terbit")?.details || "-",
            status:
              detailData.data?.fields?.find((f) => f.title === "Subjek Artikel")?.details || "-",
            category:
              detailData.data?.fields?.find((f) => f.title === "T.E.U Badan/Pengarang")?.details || "-",
            bidang: detailData.data?.fields?.find((f) => f.title === "Bidang Hukum")?.details,
            nomorPutusan:
              detailData.data?.fields?.find((f) => f.title === "Nomor Putusan")?.details,
            image: item.image || "http://via.placeholder.com/100x150",
          };
        } catch (err) {
          return {
            id: item.id,
            slug: item.id,
            title: item.title || "Tanpa Judul",
            year: "-",
            status: "-",
            category: "-",
            image: item.image || "http://via.placeholder.com/100x150",
          };
        }
      })
    );
  };

  const applyFiltersAndSorting = () => {
    let filtered = [...allDocuments];

    // Apply search
    if (filters.searchQuery) {
      filtered = filtered.filter((doc) =>
        doc.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Apply number, type, year filter if needed
    if (filters.number) {
      filtered = filtered.filter((doc) => doc.nomorPutusan?.includes(filters.number));
    }
    if (filters.type) {
      filtered = filtered.filter((doc) => doc.category?.includes(filters.type));
    }
    if (filters.year) {
      filtered = filtered.filter((doc) => String(doc.year).includes(filters.year));
    }

    // Sorting based on year
    filtered.sort((a, b) => {
      const yearA = parseInt(a.year) || 0;
      const yearB = parseInt(b.year) || 0;
      if (sortOrder === "newest") return yearB - yearA;
      return yearA - yearB;
    });

    // Pagination frontend
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    setDocuments(filtered.slice(startIdx, endIdx));
    setTotalItems(filtered.length);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setCurrentPage(1); // Reset ke halaman 1 kalau ganti urutan
  };

  const handleSearch = () => {
    setCurrentPage(1);
    applyFiltersAndSorting();
  };

  const webmasterSectionId = webmasterSectionMapping[sectionId] || null;

  useEffect(() => {
    applyFiltersAndSorting(); // Apply sorting and filter again after sortOrder is updated
  }, [sortOrder]);

  return (
    <>
      <Breadcrumbs paths={breadcrumbPaths} />
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
              Semua Data ({totalItems})
            </div>
            {isLoading ? (
              <span className="text-sm text-gray-500">Loading...</span>
            ) : (
              <NewOldFilter onSortChange={handleSortChange} />
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
                {isLoading ? "Memuat data..." : "Tidak ada dokumen yang ditemukan"}
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
          {customSidebar !== null ? (
            customSidebar
          ) : (
            <PopularDocument sectionId={sectionId} />
          )}
        </div>
      </div>
    </>
  );
};

export default DocPage;
