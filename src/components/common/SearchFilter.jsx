import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import CustomSelect from "./CustomSelect";

const SearchFilter = ({
  filters,
  onChange,
  onSearch,
  webmasterSectionId,
  allowedFields = null,
  regulationType = "", // Parameter baru untuk jenis peraturan
}) => {
  const [filterFields, setFilterFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const defaultAllowedFields = [
    "find_q",
    "customField_20",
    "customField_19",
    "customField_79",
  ];

  useEffect(() => {
    if (!webmasterSectionId) return;

    const fetchFilterOptions = async () => {
      setIsLoading(true);
      try {
        // Simulasi API call - dalam implementasi nyata gunakan axios dengan baseUrl
        const mockResponse = {
          data: {
            status: "success",
            data: [
              {
                name: "find_q",
                label: "Pencarian",
                type: "text",
                options: null
              },
              {
                name: "customField_20",
                label: "Nomor",
                type: "text",
                options: null
              },
              {
                name: "customField_19",
                label: "Jenis Peraturan",
                type: "select",
                options: ["UU", "PP", "Perpres", "Permen", "Perda", "Perkada"]
              },
              {
                name: "customField_79",
                label: "Tahun Terbit",
                type: "select",
                options: null
              }
            ]
          }
        };

        if (mockResponse.data && mockResponse.data.status === "success") {
          let filteredFields = mockResponse.data.data || [];

          if (allowedFields !== null) {
            filteredFields = filteredFields.filter((field) =>
              allowedFields.includes(field.name)
            );
          }

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
  }, [webmasterSectionId, allowedFields]);

  const handleMultipleChange = (e) => {
    const { name, value } = e.target;

    // Jangan izinkan perubahan pada field customField_19 jika regulationType ada
    if (name === 'customField_19' && regulationType) {
      return;
    }

    onChange({
      target: {
        name,
        value: value,
        isMultiple: true,
      },
    });
  };

  return (
    <div className="flex flex-col px-8 py-8 w-full text-base bg-green-50 rounded-xl max-md:px-4 max-md:max-w-full">
      <h2 className="text-lg font-semibold mb-4">Pencarian</h2>

      {isLoading ? (
        <div className="text-center py-4">
          <span className="text-gray-600">Memuat opsi filter...</span>
        </div>
      ) : (
        <div className="w-full space-y-4">
          {filterFields
            .filter((field) => field.name === "find_q")
            .map((field) => (
              <div key={field.name} className="w-full">
                <CustomSelect
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={
                    Array.isArray(filters[field.name])
                      ? filters[field.name][0] || ""
                      : filters[field.name] || ""
                  }
                  onChange={handleMultipleChange}
                  placeholder="Silahkan ketikan dokumen yang kamu cari disini.."
                  isMultiple={true}
                  regulationType={regulationType}
                />
              </div>
            ))}

          <div className="flex flex-wrap gap-4 items-end w-full max-md:max-w-full">
            {filterFields
              .filter((field) => field.name !== "find_q")
              .map((field) => {
                // Handle field customField_79 (Tahun Terbit) sebagai select dengan options tahun
                if (field.name === "customField_79") {
                  const currentYear = new Date().getFullYear();
                  const yearOptions = [];
                  for (let year = 1900; year <= currentYear; year++) {
                    yearOptions.push({
                      value: year.toString(),
                      label: year.toString(),
                    });
                  }
                  yearOptions.reverse();

                  return (
                    <div
                      key={field.name}
                      className="flex flex-col grow shrink w-44"
                    >
                      <CustomSelect
                        id={field.name}
                        name={field.name}
                        options={yearOptions}
                        value={
                          Array.isArray(filters[field.name])
                            ? filters[field.name][0] || ""
                            : filters[field.name] || ""
                        }
                        onChange={handleMultipleChange}
                        placeholder={`Pilih ${field.label}`}
                        isMultiple={true}
                        regulationType={regulationType}
                      />
                    </div>
                  );
                }

                // Handle text/number fields (seperti customField_20 untuk Nomor)
                if (field.type === "text" || field.type === "number") {
                  return (
                    <div
                      key={field.name}
                      className="flex flex-col grow shrink w-44"
                    >
                      <CustomSelect
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={
                          Array.isArray(filters[field.name])
                            ? filters[field.name][0] || ""
                            : filters[field.name] || ""
                        }
                        onChange={handleMultipleChange}
                        placeholder={field.label}
                        isMultiple={true}
                        regulationType={regulationType}
                      />
                    </div>
                  );
                }

                // Handle select fields dengan options (seperti customField_19 untuk Jenis Peraturan)
                if (field.type === "select" && field.options) {
                  const options = field.options.map((option) => ({
                    value: option,
                    label: option,
                  }));

                  // Jika ini adalah field customField_19 dan ada regulationType, 
                  // set value ke regulationType dan disable field
                  let fieldValue = Array.isArray(filters[field.name])
                    ? filters[field.name][0] || ""
                    : filters[field.name] || "";

                  if (field.name === 'customField_19' && regulationType) {
                    fieldValue = regulationType;
                  }

                  return (
                    <div
                      key={field.name}
                      className="flex flex-col grow shrink w-44"
                    >
                      <CustomSelect
                        id={field.name}
                        name={field.name}
                        options={options}
                        value={fieldValue}
                        onChange={handleMultipleChange}
                        placeholder={`Pilih ${field.label}`}
                        isMultiple={true}
                        regulationType={regulationType}
                      />
                    </div>
                  );
                }

                return null;
              })}
          </div>

          <div className="flex flex-col grow shrink w-full">
            <button
              type="button"
              onClick={onSearch}
              className="flex items-center justify-center gap-2 px-5 py-3 mt-6 w-full text-sm font-semibold leading-6 text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors"
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