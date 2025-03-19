import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import Breadcrumbs from "../../components/Breadcrumbs";
import LawCard from "../../components/ProdukHukum/LawCard";
import Kategori from "../../components/Kategori";

const CustomSelect = ({ options, value, onChange, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    onChange({ target: { name, value: option } });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center justify-between px-4 py-3 mt-1.5 w-full bg-blue-50 rounded-lg border border-blue-300 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-zinc-600">{value || name}</span>
        <span className="text-zinc-600">▼</span>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full bg-blue-50 border text-blue-800 border-blue-300 rounded-lg mt-1">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-4 py-3 hover:bg-blue-100 hover:rounded-lg cursor-pointer hover:font-semibold"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const LawPage = ({ laws, breadcrumbPaths, title }) => {
  const [filters, setFilters] = useState({
    number: "",
    status: "",
    category: "",
    type: "",
    year: "",
    searchQuery: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    console.log("Melakukan pencarian dengan filter:", filters);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalItems = laws.length;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLaws = laws.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Breadcrumbs paths={breadcrumbPaths} />

      <div className="p-6 bg-white grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="flex flex-col p-8 w-full text-base bg-blue-50 rounded-xl max-md:px-5 max-md:max-w-full">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            <div className="flex flex-wrap gap-4 items-end w-full max-md:max-w-full">
              {[
                { name: "number", placeholder: "Nomor Dokumen", type: "text" },
                {
                  name: "Status",
                  options: ["", "Berlaku", "Tidak Berlaku"],
                },
                { name: "Kategori", options: ["", "Keuangan", "Tata Ruang"] },
                {
                  name: "Jenis",
                  options: [
                    "",
                    "Peraturan Daerah",
                    "Peraturan Gubernur",
                    "Keputusan Gubernur",
                    "Surat Keputusan Gubernur",
                    "Instruksi Gubernur",
                    "Keputusan Bersama Gubernur",
                    "Keputusan Atas Nama Gubernur",
                  ],
                },
                { name: "Tahun", options: ["", "2025", "2023"] },
              ].map((field, index) =>
                field.options ? (
                  <div className="flex flex-col grow shrink w-32" key={index}>
                    <CustomSelect
                      options={field.options}
                      value={filters[field.name]}
                      onChange={handleChange}
                      name={field.name}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col grow shrink w-44" key={index}>
                    <input
                      type={field.type}
                      name={field.name}
                      value={filters[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="flex overflow-hidden gap-2.5 items-center px-4 py-3 mt-1.5 w-full bg-white rounded-lg border border-blue-300 border-solid text-stone-300"
                    />
                  </div>
                )
              )}
            </div>

            <div className="flex flex-col mt-6 w-full text-stone-300 max-md:max-w-full">
              <div className="flex items-center w-full bg-white rounded-lg border border-blue-300 border-solid max-md:max-w-full">
                <Search size={20} />
                <input
                  type="text"
                  name="searchQuery"
                  value={filters.searchQuery}
                  onChange={handleChange}
                  placeholder="Silakan ketikkan dokumen yang kamu cari di sini..."
                  className="flex-1 p-2 border-none rounded-lg focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center items-center px-5 py-3 mt-6 w-full text-sm font-semibold leading-6 text-white bg-blue-600 rounded-xl max-md:max-w-full">
              <button
                onClick={handleSearch}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer"
              >
                <Search size={20} /> Cari Sekarang
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-10 justify-between items-center mt-5 w-full max-md:max-w-full">
            <div className="self-stretch my-auto text-base font-semibold text-zinc-800">
              Semua Data ({totalItems})
            </div>
            <div className="flex gap-2 justify-center items-center self-stretch px-3 my-auto w-10 h-10 bg-emerald-50 rounded-lg border border-emerald-200 border-solid">
              <Filter className="text-emerald-600 w-6 h-6" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {currentLaws.map((law, index) => (
              <LawCard
                key={index}
                title={`Peraturan ${law.type} Nomor ${law.number} Tahun ${law.year} tentang ${law.title}`}
                year={law.year}
                status={law.status}
                regulationType={law.type}
                onDetailClick={() => navigate(`/law/${law.number}/${law.year}`)}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-10 justify-between items-center p-3 mt-5 w-full text-center rounded-lg bg-zinc-100 max-md:max-w-full">
            <div className="flex gap-4 justify-center items-center self-stretch my-auto text-sm font-medium leading-6 whitespace-nowrap min-w-[240px] text-zinc-800">
              <ChevronLeft
                className={`cursor-pointer ${
                  currentPage === 1 ? "text-gray-400" : "text-blue-600"
                }`}
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
              />
              {Array.from(
                { length: Math.ceil(totalItems / itemsPerPage) },
                (_, i) => (
                  <div
                    key={i}
                    className={`self-stretch my-auto w-[31px] text-center cursor-pointer ${
                      currentPage === i + 1
                        ? "font-bold text-blue-600"
                        : "text-zinc-800"
                    }`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </div>
                )
              )}
              <ChevronRight
                className={`cursor-pointer ${
                  currentPage === Math.ceil(totalItems / itemsPerPage)
                    ? "text-gray-400"
                    : "text-blue-600"
                }`}
                onClick={() =>
                  currentPage < Math.ceil(totalItems / itemsPerPage) &&
                  handlePageChange(currentPage + 1)
                }
              />
            </div>
            <div className="self-stretch my-auto text-xs text-zinc-800">
              {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, totalItems)}{" "}
              dari {totalItems} record
            </div>
          </div>
        </div>
        <div>
          <Kategori />
        </div>
      </div>
    </>
  );
};

export default LawPage;
