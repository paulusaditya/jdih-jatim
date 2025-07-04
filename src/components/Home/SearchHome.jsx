"use client";

import React, { useState, useEffect } from "react";
import { Search, FileText, ChevronDown, Calendar } from "lucide-react";
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
        <div className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10 pointer-events-none flex items-center justify-center w-4 h-4 md:w-5 md:h-5">
          {icon}
        </div>
      )}

      <div
        className={`w-full ${
          icon ? "pl-10 md:pl-12" : "pl-3 md:pl-4"
        } pr-8 md:pr-12 py-3 bg-white border border-green-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent hover:bg-gray-50 transition-all duration-300 cursor-pointer shadow-sm flex items-center justify-between`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-gray-700" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-green-200 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
          <div
            className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-400"
            onClick={() => handleSelect("")}
          >
            {placeholder}
          </div>
          {options &&
            options.map((option, index) => (
              <div
                key={index}
                className="px-4 py-3 hover:bg-green-50 cursor-pointer text-gray-700 border-t border-gray-100"
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

export default function SearchHome({ webmasterSectionId = "10" }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [filterFields, setFilterFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const allowedFields = [
    "find_q",
    "customField_20",
    "customField_19",
    "customField_79",
  ];

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
        setFallbackFields();
      }
    } catch (error) {
      console.error("Failed to fetch filter options:", error);
      setFallbackFields();
    } finally {
      setIsLoading(false);
    }
  };

  const setFallbackFields = () => {
    setFilterFields([
      {
        name: "customField_20",
        label: "Nomor Dokumen",
        type: "text",
      },
      {
        name: "customField_19",
        label: "Jenis Dokumen",
        type: "select",
        options: [
          "Peraturan Daerah",
          "Peraturan Gubernur",
          "Peraturan Walikota",
          "Peraturan Bupati",
          "Keputusan Gubernur",
          "Instruksi Gubernur",
        ],
      },
      {
        name: "customField_79",
        label: "Tahun",
        type: "select",
      },
    ]);
  };

  useEffect(() => {
    fetchFilterOptions();
  }, [webmasterSectionId, baseUrl]);

  const getFieldOptions = (fieldName) => {
    const field = filterFields.find((f) => f.name === fieldName);
    if (!field) return [];

    if (fieldName === "customField_79") {
      const currentYear = new Date().getFullYear();
      const yearOptions = [];
      for (let year = 1900; year <= currentYear; year++) {
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

  const handleSearch = () => {
    const searchParams = {};

    if (searchQuery.trim()) {
      searchParams.find_q = searchQuery.trim();
    }

    if (documentNumber.trim()) {
      searchParams.customField_20 = documentNumber.trim();
    }

    if (selectedDocumentType) {
      searchParams.customField_19 = selectedDocumentType;
    }

    if (selectedYear) {
      searchParams.customField_79 = selectedYear;
    }

    const urlParams = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      urlParams.append(key, value);
    });
    urlParams.append("fromSearch", "true");

    const searchQueryUrl = urlParams.toString();
    const lawPagePath = `/peraturan-terbaru${
      searchQueryUrl ? `?${searchQueryUrl}` : ""
    }`;

    navigate(lawPagePath);

    console.log("Navigating to LawPage with params:", searchParams);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "searchQuery":
        setSearchQuery(value);
        break;
      case "documentNumber":
        setDocumentNumber(value);
        break;
      case "selectedDocumentType":
        setSelectedDocumentType(value);
        break;
      case "selectedYear":
        setSelectedYear(value);
        break;
      default:
        break;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setDocumentNumber("");
    setSelectedDocumentType("");
    setSelectedYear("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-xl border border-green-300 p-8 shadow-lg backdrop-blur-sm">
        <h1 className="text-4xl md:text-5xl font-bold text-green-600 text-center mb-4">
          Selamat Datang Di JDIH Jawa Timur
        </h1>
        <p className="text-lg text-gray-700 text-center mb-8 font-medium">
          Silahkan cari dokumen produk hukum disini!
        </p>

        {isLoading ? (
          <div className="space-y-6">
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>

            <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Silahkan ketikan dokumen yang kamu cari disini.."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FileText className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder={
                    getFieldLabel("customField_20") || "Nomor Dokumen"
                  }
                  value={documentNumber}
                  onChange={(e) => setDocumentNumber(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                />
              </div>

              <CustomSelect
                value={selectedDocumentType}
                onChange={handleInputChange}
                name="selectedDocumentType"
                placeholder={getFieldLabel("customField_19") || "Jenis Dokumen"}
                options={getFieldOptions("customField_19")}
              />

              <CustomSelect
                value={selectedYear}
                onChange={handleInputChange}
                name="selectedYear"
                placeholder={getFieldLabel("customField_79") || "Pilih Tahun"}
                options={getFieldOptions("customField_79")}
                icon={<Calendar className="w-4 h-4" />}
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSearch}
                className="flex-1 bg-green-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <Search className="h-4 w-4" />
                Cari Sekarang
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
