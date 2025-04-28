import { useState } from "react";
import { Filter } from "lucide-react";

export default function NewOldFilter({ onSortChange }) {
  const [open, setOpen] = useState(false);

  const handleSort = (type) => {
    onSortChange(type);
    setOpen(false);
  };

  return (
    <div className="relative">
      {/* Tombol Filter */}
      <div
        onClick={() => setOpen(!open)}
        className="flex gap-2 justify-center items-center self-stretch px-3 my-auto w-10 h-10 bg-emerald-50 rounded-lg border border-emerald-200 border-solid cursor-pointer hover:bg-emerald-100 transition"
      >
        <Filter className="text-emerald-600 w-6 h-6" />
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <button
            onClick={() => handleSort("desc")}
            className="block w-full text-left px-4 py-2 text-sm text-blue-900 hover:bg-gray-100 rounded-t-lg"
          >
            Urutkan Berdasarkan Terbaru
          </button>
          <button
            onClick={() => handleSort("asc")}
            className="block w-full text-left px-4 py-2 text-sm text-blue-900 hover:bg-gray-100 rounded-b-lg"
          >
            Urutkan Berdasarkan Terlama
          </button>
        </div>
      )}
    </div>
  );
}
