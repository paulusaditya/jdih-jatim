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

  const handleMultipleChange = (e) => {
    const { name, value } = e.target;

    onChange({
      target: {
        name,
        value: value,
        isMultiple: true,
      },
    });
  };

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
                    id={field.name}
                    name={field.name}
                    value={
                      Array.isArray(filters[field.name])
                        ? filters[field.name][0] || ""
                        : filters[field.name] || ""
                    }
                    onChange={handleMultipleChange}
                    placeholder={field.label}
                    className="px-4 py-3 w-full bg-white rounded-lg border border-blue-300 text-gray-800"
                  />
                </div>
              );
            }

            if (field.type === "select" && field.options) {
              const options = field.options.map((option) => ({
                value: option,
                label: option,
              }));

              const handleClearOption = () => {
                onChange({
                  target: {
                    name: field.name,
                    value: "",
                    isMultiple: true,
                  },
                });
              };

              return (
                <div
                  key={field.name}
                  className="flex flex-col grow shrink w-44"
                >
                  <div className="flex items-center">
                    <CustomSelect
                      id={field.name}
                      name={field.name}
                      options={options}
                      value={
                        Array.isArray(filters[field.name])
                          ? filters[field.name][0] || ""
                          : filters[field.name] || ""
                      }
                      onChange={handleMultipleChange}
                      placeholder={`Pilih ${field.label}`}
                      isMultiple={true}
                    />
                    {filters[field.name] &&
                      filters[field.name].length > 0 &&
                      filters[field.name][0] !== "" && (
                        <button
                          type="button"
                          onClick={handleClearOption}
                          className="ml-1 text-xs text-blue-600 hover:text-blue-800"
                        >
                          Batalkan
                        </button>
                      )}
                  </div>
                </div>
              );
            }

            return null;
          })}

          <div className="flex flex-col grow shrink w-full">
            <button
              type="button"
              onClick={onSearch}
              className="flex items-center justify-center gap-2 px-5 py-3 mt-6 w-full text-sm font-semibold leading-6 text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
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
