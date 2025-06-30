import React, { useState, useEffect } from "react";
import { Search, FileText, Calendar, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../config/api";

function CustomSelect({ value, onChange, placeholder, options, icon, name }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedValue) => {
    onChange({ target: { name, value: selectedValue } });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 z-10 pointer-events-none flex items-center justify-center w-4 h-4 md:w-5 md:h-5">
          {icon}
        </div>
      )}

      <div
        className={`w-full ${
          icon ? "pl-10 md:pl-12" : "pl-3 md:pl-4"
        } pr-8 md:pr-12 py-2 md:py-4 bg-white/70 backdrop-blur-sm border-2 border-white/40 rounded-lg md:rounded-xl text-gray-800 focus:outline-none focus:border-green-400 hover:bg-white/80 transition-all duration-300 cursor-pointer shadow-md flex items-center justify-between h-10 md:h-14 text-sm md:text-base`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-gray-800" : "text-gray-500"}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`w-3 h-3 md:w-4 md:h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg md:rounded-xl shadow-lg z-20 max-h-32 md:max-h-48 overflow-y-auto">
          <div
            className="px-3 md:px-4 py-2 md:py-3 hover:bg-gray-50 cursor-pointer text-gray-500 text-sm md:text-base"
            onClick={() => handleSelect("")}
          >
            {placeholder}
          </div>
          {options &&
            options.map((option, index) => (
              <div
                key={index}
                className="px-3 md:px-4 py-2 md:py-3 hover:bg-green-50 cursor-pointer text-gray-800 border-t border-gray-100 text-sm md:text-base"
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default function FloatingSearchComponent({ webmasterSectionId = "10" }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [nomerDokumen, setNomerDokumen] = useState("");
  const [jenisDokumen, setJenisDokumen] = useState("");
  const [tahun, setTahun] = useState("");
  const [filterFields, setFilterFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const allowedFields = [
    "find_q",
    "customField_20",
    "customField_19",
    "customField_79",
  ];

  useEffect(() => {
    const fetchFilterOptions = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${baseUrl}/topics/filter-options?webmaster_section_id=${webmasterSectionId}`
        );

        if (response.data && response.data.status === "success") {
          let filteredFields = response.data.data || [];

          filteredFields = filteredFields.filter((field) =>
            allowedFields.includes(field.name)
          );

          const sortedFields = filteredFields.sort((a, b) => {
            const orderMap = {
              find_q: 1,
              customField_20: 2,
              customField_19: 3,
              customField_79: 4,
            };

            const aOrder = orderMap[a.name] || 999;
            const bOrder = orderMap[b.name] || 999;

            return aOrder - bOrder;
          });

          setFilterFields(sortedFields);
        } else {
          console.error(
            "Failed to fetch filter options: Invalid response format"
          );
        }
      } catch (error) {
        console.error("Failed to fetch filter options:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilterOptions();
  }, [webmasterSectionId]);

  const handleSearch = () => {
    const searchParams = {};

    if (searchTerm.trim()) {
      searchParams.find_q = searchTerm.trim();
    }

    if (nomerDokumen.trim()) {
      searchParams.customField_20 = nomerDokumen.trim();
    }

    if (jenisDokumen) {
      searchParams.customField_19 = jenisDokumen;
    }

    if (tahun) {
      searchParams.customField_79 = tahun;
    }

    const urlParams = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      urlParams.append(key, value);
    });

    urlParams.append("fromSearch", "true");

    const searchQuery = urlParams.toString();
    const lawPagePath = `/peraturan-terbaru${
      searchQuery ? `?${searchQuery}` : ""
    }`;

    navigate(lawPagePath);

    console.log("Redirecting to LawPage with params:", searchParams);
  };

  const getFieldOptions = (fieldName) => {
    const field = filterFields.find((f) => f.name === fieldName);

    if (!field) return [];

    if (fieldName === "customField_79") {
      const currentYear = new Date().getFullYear();
      const yearOptions = [];
      for (let year = 100; year <= currentYear; year++) {
        yearOptions.push({
          value: year.toString(),
          label: year.toString(),
        });
      }
      yearOptions.reverse();
      return yearOptions;
    }

    if (field.type === "select" && field.options) {
      return field.options.map((option) => ({
        value: option,
        label: option,
      }));
    }

    return [];
  };

  const getFieldLabel = (fieldName) => {
    const field = filterFields.find((f) => f.name === fieldName);
    return field ? field.label : "";
  };

  return (
    <div>
      <div
        className="inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-yellow-50"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 183, 77, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(34, 197, 94, 0.2) 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative">
        <div className="w-full max-w-3xl">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl md:rounded-3xl p-4 md:p-12 shadow-2xl border border-white/30">
            <div className="text-center mb-4 md:mb-10">
              <h1 className="text-lg md:text-5xl font-bold text-gray-800 mb-1 md:mb-4 leading-tight">
                Selamat Datang Di JDIH
                <br />
                Jawa Timur
              </h1>
              <p className="text-xs md:text-lg text-gray-700 flex items-center justify-center gap-1 md:gap-2">
                Silahkan Cari Dokumen Produk Hukum Disini
                <span className="text-sm md:text-2xl">⚖️</span>
              </p>
            </div>

            {isLoading ? (
              <div className="text-center py-4 md:py-8">
                <span className="text-gray-600 text-sm md:text-base">
                  Memuat opsi pencarian...
                </span>
              </div>
            ) : (
              <>
                <div className="mb-3 md:mb-8">
                  <div className="relative">
                    <Search className="absolute left-3 md:left-5 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 md:w-5 md:h-5 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Silahkan ketikan dokumen yang kamu cari disini..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      className="w-full pl-10 md:pl-14 pr-4 md:pr-6 py-2 md:py-5 bg-white/80 backdrop-blur-sm border-2 border-white/50 rounded-lg md:rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-green-400 focus:bg-white/90 transition-all duration-300 text-sm md:text-lg shadow-lg h-10 md:h-16"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 md:gap-6 mb-3 md:mb-8">
                  <div className="relative">
                    <FileText className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 md:w-5 md:h-5 pointer-events-none" />
                    <input
                      type="text"
                      placeholder={
                        getFieldLabel("customField_20") || "Nomor Dokumen"
                      }
                      value={nomerDokumen}
                      onChange={(e) => setNomerDokumen(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2 md:py-4 bg-white/70 backdrop-blur-sm border-2 border-white/40 rounded-lg md:rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-green-400 focus:bg-white/80 transition-all duration-300 shadow-md h-10 md:h-14 text-sm md:text-base"
                    />
                  </div>

                  <CustomSelect
                    value={jenisDokumen}
                    onChange={(e) => setJenisDokumen(e.target.value)}
                    name="jenisDokumen"
                    placeholder={
                      getFieldLabel("customField_19") || "Jenis Dokumen"
                    }
                    options={getFieldOptions("customField_19")}
                  />

                  <CustomSelect
                    value={tahun}
                    onChange={(e) => setTahun(e.target.value)}
                    name="tahun"
                    placeholder={
                      getFieldLabel("customField_79") || "Pilih Tahun"
                    }
                    options={getFieldOptions("customField_79")}
                    icon={<Calendar className="w-4 h-4 md:w-5 md:h-5" />}
                  />
                </div>

                <button
                  onClick={handleSearch}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 md:py-5 px-4 md:px-8 rounded-lg md:rounded-2xl transition-all duration-300 text-sm md:text-lg flex items-center justify-center gap-2 md:gap-3 shadow-xl hover:shadow-2xl hover:scale-[1.02] transform"
                >
                  <Search className="w-4 h-4 md:w-5 md:h-5" />
                  Cari Sekarang
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
