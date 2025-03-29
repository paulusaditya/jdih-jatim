import React from "react";
import { Search } from "lucide-react";
import CustomSelect from "./CustomSelect";

const SearchFilter = ({
  filters,
  onChange,
  onSearch,
  years,
  documentTypes,
  categories,
  includeStatus,
}) => {
  return (
    <div className="flex flex-col p-8 w-full text-base bg-blue-50 rounded-xl max-md:px-5 max-md:max-w-full">
      <h2 className="text-lg font-semibold mb-4">Pencarian</h2>
      <div className="flex flex-wrap gap-4 items-end w-full max-md:max-w-full">
        <div className="flex flex-col grow shrink w-44">
          <input
            type="text"
            name="number"
            value={filters.number}
            onChange={onChange}
            placeholder="Nomor Klasifikasi"
            className="flex overflow-hidden gap-2.5 items-center px-4 py-3 mt-1.5 w-full bg-white rounded-lg border border-blue-300 border-solid text-stone-300"
          />
        </div>
        {categories && (
          <div className="flex flex-col grow shrink w-32">
            <CustomSelect
              options={categories}
              value={filters.category}
              onChange={onChange}
              name="Kategori"
            />
          </div>
        )}
        {includeStatus && (
          <div className="flex flex-col grow shrink w-32">
            <CustomSelect
              options={["Berlaku", "Tidak Berlaku"]}
              value={filters.status}
              onChange={onChange}
              name="Status"
            />
          </div>
        )}
        <div className="flex flex-col grow shrink w-32">
          <CustomSelect
            options={documentTypes}
            value={filters.type}
            onChange={onChange}
            name="Jenis"
          />
        </div>
        <div className="flex flex-col grow shrink w-32">
          <CustomSelect
            options={years}
            value={filters.year}
            onChange={onChange}
            name="Tahun Terbit"
          />
        </div>
      </div>

      <div className="flex flex-col mt-6 w-full text-stone-300 max-md:max-w-full">
        <div className="flex items-center w-full bg-white rounded-lg border border-blue-300 border-solid max-md:max-w-full">
          <Search size={20} />
          <input
            type="text"
            name="searchQuery"
            value={filters.searchQuery}
            onChange={onChange}
            placeholder="Silakan ketikkan dokumen yang kamu cari di sini..."
            className="flex-1 p-2 border-none rounded-lg focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center items-center px-5 py-3 mt-6 w-full text-sm font-semibold leading-6 text-white bg-blue-600 rounded-xl max-md:max-w-full">
        <button
          onClick={onSearch}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer"
        >
          <Search size={20} /> Cari Sekarang
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
