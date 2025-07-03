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
import baseUrl from "../../config/api";
import WhatsAppButton from "../../components/common/ChatWaButton";
import FloatingAccessibilityButton from "../../components/common/FloatingAccessibilityButton";
import LoadingSpinner from "../../components/common/LoadingSpinner";

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
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Track initial load

  const [filters, setFilters] = useState({});

  const itemsPerPage = 10;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setIsInitialLoad(false); // Set to false when user searches
    fetchLaws();
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setCurrentPage(1);
    setIsInitialLoad(false); // Set to false when user changes sort
  };

  useEffect(() => {
    fetchLaws();
  }, [currentPage, sortOrder]);

  const fetchLaws = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("per_page", itemsPerPage);
      params.append("page", currentPage);
      params.append("webmaster_section_id", webmasterSectionId);
      
      // Use created_by for initial load, nomor for subsequent requests
      if (isInitialLoad && currentPage === 1 && Object.keys(filters).length === 0) {
        params.append("sort_by", "created_by");
        params.append("sort_order", "desc");
      } else {
        params.append("sort_by", "nomor");
        params.append("sort_order", sortOrder);
      }

      if (sectionId) {
        params.append("section_id", sectionId);
      }

      const filterArray = [];
      Object.entries(filters).forEach(([key, value]) => {
        if (
          value &&
          (typeof value === "string"
            ? value.trim() !== ""
            : Array.isArray(value) && value.length > 0)
        ) {
          if (Array.isArray(value)) {
            value.forEach((val) => {
              if (val && val.trim() !== "") {
                filterArray.push({
                  key: key,
                  value: val,
                });
              }
            });
          } else {
            filterArray.push({
              key: key,
              value: value,
            });
          }
        }
      });

      filterArray.forEach((filter) => {
        params.append(`filters[]`, JSON.stringify(filter));
      });

      const fullUrl = `${apiUrl}?${params.toString()}`;

      const response = await fetch(fullUrl);
      if (!response.ok) throw new Error(`Invalid response: ${response.status}`);

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json"))
        throw new Error(`Invalid content type: ${contentType}`);

      const result = await response.json();
      let mappedLaws = [];

      const cleanNumber = (val) =>
        parseInt(String(val).replace(/[^\d]/g, "")) || 0;

      if (Array.isArray(result.data)) {
        const rawLaws = result.data;

        mappedLaws = await Promise.all(
          rawLaws.map(async (item) => {
            try {
              const detailRes = await fetch(`${baseUrl}/topics/${item.id}`);
              if (!detailRes.ok)
                throw new Error(`Detail fetch failed: ${detailRes.status}`);

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

        // Only sort by number if not initial load
        if (!isInitialLoad || Object.keys(filters).length > 0) {
          mappedLaws.sort((a, b) => {
            const numA = cleanNumber(a.number);
            const numB = cleanNumber(b.number);
            return sortOrder === "asc" ? numA - numB : numB - numA;
          });
        }

        setLaws(mappedLaws);
        setTotalItems(result.pagination?.total || rawLaws.length || 0);
      } else {
        const rawLaws = result.data?.data || [];

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

        // Only sort by number if not initial load
        if (!isInitialLoad || Object.keys(filters).length > 0) {
          mappedLaws.sort((a, b) => {
            const numA = cleanNumber(a.number);
            const numB = cleanNumber(b.number);
            return sortOrder === "asc" ? numA - numB : numB - numA;
          });
        }

        setLaws(mappedLaws);
        setTotalItems(result.data?.pagination?.total || 0);
      }
    } catch (error) {
      console.error("Error fetching law data:", error);
      setLaws([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setIsInitialLoad(false); // Set to false when user changes page
    window.scrollTo(0, 0);
  };

  return (
    <div className="px-4 py-16 md:p-16 bg-white grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        {/* {breadcrumbPaths && <Breadcrumbs paths={breadcrumbPaths} />} */}

        <SearchFilter
          webmasterSectionId={webmasterSectionId}
          filters={filters}
          onChange={handleChange}
          onSearch={handleSearch}
          allowedFields={[
            "find_q", // input pencarian
            "customField_20", // Nomor Dokumen
            "customField_19", // Jenis Dokumen (dropdown)
            "customField_79", // Tahun (dropdown)
          ]}
        />

        <div className="flex flex-wrap gap-10 justify-between items-center mt-5 w-full max-md:max-w-full">
          <div className="self-stretch my-auto text-base font-semibold text-zinc-800">
            Semua Dokumen Hukum ({totalItems})
          </div>
          {isLoading ? (
            <span className="text-sm text-gray-500">Loading...</span>
          ) : (
            <div className="flex justify-between items-center">
              <NewOldFilter onSortChange={handleSortChange} />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 mt-4">
          {isLoading ? (
            <LoadingSpinner/>
          ) : laws.length > 0 ? (
            laws.map((law) => (
              <LawCard
                key={law.id}
                title={law.title}
                year={law.year}
                number={law.number}
                type={law.type}
                status={includeStatus ? law.status : null}
                category={includeCategory ? law.category : null}
                image={law.image}
                onDetailClick={() => navigate(`${detailPath}/${law.slug}`)}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              Tidak ada dokumen hukum yang ditemukan
            </div>
          )}
        </div>

        {totalItems > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      <div className="w-full">
        <Kategori />
        {customSidebar !== null ? (
          customSidebar
        ) : (
          <div className="mt-6">
            <PopularDocument />
          </div>
        )}
      </div>
      <WhatsAppButton />
      <FloatingAccessibilityButton />
    </div>
  );
};

export default LawPage;