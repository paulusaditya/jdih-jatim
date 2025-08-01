import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

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
  regulationType = "",
}) => {
  const [laws, setLaws] = useState([]);
  const [title, setTitle] = useState(pageTitle);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [filters, setFilters] = useState({});
  const [hasInitialSearch, setHasInitialSearch] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);

  const debouncedFilters = useDebounce(filters, 500);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const initialFilters = {};
    for (const [key, value] of urlParams.entries()) {
      if (key !== "fromSearch" && value.trim() !== "") {
        initialFilters[key] = value;
      }
    }
    if (regulationType) {
      initialFilters.customField_19 = regulationType;
    }
    if (Object.keys(initialFilters).length > 0) {
      setFilters(initialFilters);
      setHasInitialSearch(true);
      setShouldFetch(true);
    } else {
      if (regulationType) {
        setFilters({ customField_19: regulationType });
      }
      setShouldFetch(true);
    }
  }, [regulationType]);

  const handleChange = useCallback(
    (e) => {
      if (e.target.name === "customField_19" && regulationType) return;
      setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    [regulationType]
  );

  const handleSearch = useCallback(() => {
    setCurrentPage(1);
    setIsInitialLoad(false);
    setShouldFetch(true);
  }, []);

  const handleSortChange = useCallback((order) => {
    setSortOrder(order);
    setCurrentPage(1);
    setIsInitialLoad(false);
    setShouldFetch(true);
  }, []);

  const fetchLaws = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("per_page", itemsPerPage);
      params.append("page", currentPage);
      params.append("webmaster_section_id", webmasterSectionId);

      if (isInitialLoad && currentPage === 1 && Object.keys(debouncedFilters).length === 0) {
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
      Object.entries(debouncedFilters).forEach(([key, value]) => {
        if (
          value &&
          (typeof value === "string"
            ? value.trim() !== ""
            : Array.isArray(value) && value.length > 0)
        ) {
          if (Array.isArray(value)) {
            value.forEach((val) => {
              if (val && val.trim() !== "") {
                filterArray.push({ key, value: val });
              }
            });
          } else {
            filterArray.push({ key, value });
          }
        }
      });

      filterArray.forEach((filter) => {
        params.append("filters[]", JSON.stringify(filter));
      });

      const fullUrl = `${apiUrl}?${params.toString()}`;
      console.log("Fetching with URL:", fullUrl);

      const response = await fetch(fullUrl);
      if (!response.ok) throw new Error(`Invalid response: ${response.status}`);

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json"))
        throw new Error(`Invalid content type: ${contentType}`);

      const result = await response.json();

      const rawLaws = Array.isArray(result.data)
        ? result.data
        : Array.isArray(result.data?.data)
        ? result.data.data
        : [];

      const cleanNumber = (val) =>
        parseInt(String(val).replace(/[^\d]/g, "")) || 0;

      const mappedLaws = await Promise.all(
        rawLaws.map(async (item) => {
          try {
            const detailRes = await fetch(`${baseUrl}/topics/${item.id}`);
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

      if (!isInitialLoad || Object.keys(debouncedFilters).length > 0) {
        mappedLaws.sort((a, b) => {
          const numA = cleanNumber(a.number);
          const numB = cleanNumber(b.number);
          return sortOrder === "asc" ? numA - numB : numB - numA;
        });
      }

      setLaws(mappedLaws);
      setTotalItems(
        result.pagination?.total ||
        result.data?.pagination?.total ||
        rawLaws.length ||
        0
      );
    } catch (error) {
      console.error("Error fetching law data:", error);
      setLaws([]);
    } finally {
      setIsLoading(false);
      setShouldFetch(false);
    }
  }, [currentPage, sortOrder, debouncedFilters, apiUrl, sectionId, webmasterSectionId, isInitialLoad]);

  useEffect(() => {
    if (shouldFetch) {
      fetchLaws();
    }
  }, [shouldFetch, fetchLaws]);

  useEffect(() => {
    if (hasInitialSearch || Object.keys(debouncedFilters).length > 0) {
      setShouldFetch(true);
    }
  }, [debouncedFilters, hasInitialSearch]);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    setIsInitialLoad(false);
    setShouldFetch(true);
    window.scrollTo(0, 0);
  }, []);

  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / itemsPerPage);
  }, [totalItems, itemsPerPage]);

  return (
    <div className="px-4 py-16 md:p-16 bg-white grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <SearchFilter
          webmasterSectionId={webmasterSectionId}
          filters={filters}
          onChange={handleChange}
          onSearch={handleSearch}
          allowedFields={[
            "find_q",
            "customField_20",
            "customField_19",
            "customField_79",
          ]}
          regulationType={regulationType}
        />

        <div className="flex flex-wrap gap-10 justify-between items-center mt-5 w-full max-md:max-w-full">
          <div className="self-stretch my-auto text-base font-semibold text-zinc-800">
            Semua Dokumen Hukum ({totalItems})
          </div>
          {isLoading ? (
            <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
          ) : (
            <div className="flex justify-between items-center">
              <NewOldFilter onSortChange={handleSortChange} />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 mt-4">
          {isLoading ? (
            Array.from({ length: itemsPerPage }).map((_, index) => (
              <LawCard key={index} loading={true} />
            ))
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

        {totalItems > itemsPerPage && !isLoading && (
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
