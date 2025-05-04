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
  const [sortOrder, setSortOrder] = useState("desc");
  const [filters, setFilters] = useState({});
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, isMultiple } = e.target;

    if (isMultiple) {
      setFilters((prevFilters) => {
        if (Array.isArray(prevFilters[name])) {
          if (prevFilters[name].length > 0) {
            return {
              ...prevFilters,
              [name]: [value],
            };
          } else {
            return {
              ...prevFilters,
              [name]: [value],
            };
          }
        } else {
          return {
            ...prevFilters,
            [name]: [value],
          };
        }
      });
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchLaws();
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchLaws();
  }, [currentPage, sortOrder]);

  const fetchLaws = async () => {
    setIsLoading(true);
    try {
      let baseUrl = `${apiUrl}?per_page=${itemsPerPage}&page=${currentPage}&webmaster_section_id=${webmasterSectionId}&sort_by=created_at&sort_order=${sortOrder}`;

      if (sectionId) {
        baseUrl += `&section_id=${sectionId}`;
      }

      let filterPairs = [];

      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((val) => {
            if (val && val.trim() !== "") {
              filterPairs.push({
                type: key,
                value: val,
              });
            }
          });
        } else if (value && value.trim() !== "") {
          filterPairs.push({
            type: key,
            value: value,
          });
        }
      });

      let filterQueryString = "";
      filterPairs.forEach((pair) => {
        filterQueryString += `&filter_type=${encodeURIComponent(
          pair.type
        )}&filter_value=${encodeURIComponent(pair.value)}`;
      });

      const fullUrl = baseUrl + filterQueryString;
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
          webmasterSectionId={webmasterSectionId}
          filters={filters}
          onChange={handleChange}
          onSearch={handleSearch}
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
