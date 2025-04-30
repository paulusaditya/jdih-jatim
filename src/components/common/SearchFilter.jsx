import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import CustomSelect from "./CustomSelect";
import axios from "axios";

const SearchFilter = ({ filters, onChange, onSearch, webmasterSectionId }) => {
  const [filterFields, setFilterFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!webmasterSectionId) return;

    const fetchFilterOptions = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://jdih.pisdev.my.id/api/v2/topics/filter-options?webmaster_section_id=${webmasterSectionId}`
        );

        if (response.data && response.data.status === "success") {
          setFilterFields(response.data.data || []);
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

  return (
    <div className="flex flex-col p-8 w-full text-base bg-blue-50 rounded-xl max-md:px-5 max-md:max-w-full">
      <h2 className="text-lg font-semibold mb-4">Pencarian</h2>

      {isLoading ? (
        <div className="text-center py-4">
          <span className="text-gray-600">Memuat opsi filter...</span>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 items-end w-full max-md:max-w-full">
          {filterFields.map((field) => {
            if (field.type === "text" || field.type === "number") {
              return (
                <div
                  key={field.name}
                  className="flex flex-col grow shrink w-44"
                >
                  <input
                    type={field.type === "number" ? "number" : "text"}
                    name={field.name}
                    value={filters[field.name] || ""}
                    onChange={onChange}
                    placeholder={field.label}
                    className="px-4 py-3 mt-1.5 w-full bg-white rounded-lg border border-blue-300 text-gray-800"
                  />
                </div>
              );
            }

            if (field.type === "select" && field.options) {
              return (
                <div
                  key={field.name}
                  className="flex flex-col grow shrink w-44"
                >
                  <CustomSelect
                    name={field.name}
                    options={field.options.map((option) => ({
                      value: option,
                      label: option,
                    }))}
                    value={filters[field.name] || ""}
                    onChange={onChange}
                    placeholder={field.label}
                  />
                </div>
              );
            }

            return null;
          })}

          <div className="flex flex-wrap gap-2 justify-center items-center px-5 py-3 mt-6 w-full text-sm font-semibold leading-6 text-white bg-blue-600 rounded-xl max-md:max-w-full">
            <button
              type="button"
              onClick={onSearch}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer"
            >
              <Search size={20} /> Cari Sekarang
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
