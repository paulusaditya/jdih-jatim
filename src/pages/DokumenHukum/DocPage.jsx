import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Filter } from "lucide-react";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import DocumentCard from "../../components/DokumenHukum/DocCard";
import PopularDocument from "../../components/PopularDocument";
import Kategori from "../../components/Kategori";
import SearchFilter from "../../components/common/SearchFilter";
import Pagination from "../../components/common/Pagination";
import NewOldFilter from "../../components/common/NewOldFilter";
import baseUrl from "../../config/api";

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
  typeToSectionId = {},
  webmasterSectionId,
}) => {
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState(pageTitle);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");

  const [filters, setFilters] = useState({});

  const itemsPerPage = 10;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchDocuments();
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchDocuments();
  }, [currentPage, sortOrder]);

  const fetchDocuments = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("per_page", itemsPerPage);
      params.append("page", currentPage);
      params.append("webmaster_section_id", webmasterSectionId || sectionId);
      params.append("sort_by", "created_at");
      params.append("sort_order", sortOrder);


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


      filterArray.forEach((filter, index) => {
        params.append(`filters[]`, JSON.stringify(filter));
      });

      const fullUrl = `${apiUrl}?${params.toString()}`;

      const response = await fetch(fullUrl);
      const contentType = response.headers.get("content-type");

      if (!response.ok || !contentType.includes("application/json")) {
        throw new Error(`Invalid response: ${response.status}`);
      }

      const result = await response.json();

      let rawDocuments = [];
      let mappedDocuments = [];

      if (Array.isArray(result.data)) {
        rawDocuments = result.data;

        mappedDocuments = await Promise.all(
          rawDocuments.map(async (item) => {
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

        setDocuments(mappedDocuments);
        setTotalItems(result.pagination?.total || rawDocuments.length || 0);
      } else {
        rawDocuments = result.data?.data || [];

        mappedDocuments = rawDocuments.map((item) => {
          const fields = {};
          (item.fields || []).forEach((f) => (fields[f.title] = f.details));

          return {
            id: item.id,
            title: fields["Judul Peraturan"] || item.title || "Unknown",
            year:
              fields["Tahun Terbit"] ||
              fields["Tahun"] ||
              fields["Tahun Propemperda"],
            number: fields["Nomor"] || fields["Nomor Panggil"],
            type:
              fields["Singkatan Jenis"],
            status:
              fields["Keterangan Status"] ||
              fields["Subjek Artikel"] ||
              fields["Subjek"] ||
              fields["Subjek Statsblads"],
            category:
              fields["Kategori"] ||
              fields["Penerbit"] ||
              fields["T.E.U Badan/Pengarang"] ||
              fields["Tahapan Propemperda"],
            image: item.image,
            slug: item.seo_url_slug_id || item.id,
          };
        });

        setDocuments(mappedDocuments);
        setTotalItems(result.data?.pagination?.total || 0);
      }
    } catch (error) {
      console.error("Error fetching document data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="px-4 py-16 md:p-16 bg-white grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <SearchFilter
          filters={filters}
          onChange={handleChange}
          onSearch={handleSearch}
          webmasterSectionId={webmasterSectionId || sectionId}
        />

        <div className="flex flex-wrap gap-10 justify-between items-center mt-5 w-full max-md:max-w-full">
          <div className="self-stretch my-auto text-base font-semibold text-zinc-800">
            Semua Dokumen ({totalItems})
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
          {documents.length > 0 ? (
            documents.map((doc) => (
              <DocumentCard
                key={doc.id}
                title={doc.title}
                year={doc.year}
                number={doc.number}
                type={doc.type}
                status={doc.status}
                category={doc.category}
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

      <div className="w-full">
        {customSidebar !== null ? (
          customSidebar
        ) : (
          <div>
            <PopularDocument sectionId={sectionId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DocPage;
