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

    setFilters((prevFilters) => {
      if (isMultiple) {

        if (value === "") {

          const newFilters = { ...prevFilters };
          delete newFilters[name];
          return newFilters;
        }

        return {
          ...prevFilters,
          [name]: [value], 
        };
      } else {

        if (value === "") {
          const newFilters = { ...prevFilters };
          delete newFilters[name];
          return newFilters;
        }

        return {
          ...prevFilters,
          [name]: value,
        };
      }
    });
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


      const filterParams = [];

      Object.entries(filters).forEach(([key, value]) => {

        const fieldKey = key.startsWith("customField_")
          ? key
          : `customField_${key}`;

        if (Array.isArray(value)) {
          value.forEach((val) => {
            if (val && val.trim() !== "") {
              const filterObj = {
                key: fieldKey,
                value: val,
              };
              filterParams.push(
                `filters[]=${encodeURIComponent(JSON.stringify(filterObj))}`
              );
            }
          });
        } else if (value && value.trim() !== "") {

          const filterObj = {
            key: fieldKey,
            value: value,
          };
          filterParams.push(
            `filters[]=${encodeURIComponent(JSON.stringify(filterObj))}`
          );
        }
      });

      const fullUrl =
        filterParams.length > 0
          ? `${baseUrl}&${filterParams.join("&")}`
          : baseUrl;

      console.log("Fetching from:", fullUrl);

      const response = await fetch(fullUrl);

      if (!response.ok) {
        throw new Error(`Invalid response: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Invalid content type: ${contentType}`);
      }

      const result = await response.json();
      console.log("API Response:", result);

      let mappedLaws = [];

      if (Array.isArray(result.data)) {
        const rawLaws = result.data;

        mappedLaws = await Promise.all(
          rawLaws.map(async (item) => {
            try {
              const detailRes = await fetch(
                `https://jdih.pisdev.my.id/api/v2/topics/${item.id}`
              );

              if (!detailRes.ok) {
                throw new Error(`Detail fetch failed: ${detailRes.status}`);
              }

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
    window.scrollTo(0, 0); 
  };

  return (
    <div className="p-16 bg-white grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        {/* {breadcrumbPaths && <Breadcrumbs paths={breadcrumbPaths} />} */}

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
            <div className="flex justify-between items-center">
              <NewOldFilter onSortChange={handleSortChange} />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 mt-4">
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">Memuat data...</div>
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
            <PopularDocument sectionId={sectionId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LawPage;
