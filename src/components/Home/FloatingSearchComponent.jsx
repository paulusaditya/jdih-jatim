import React, { useState } from "react";
import { Search, FileText, Calendar, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CustomSelect({ value, onChange, placeholder, options, icon, name }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedValue) => {
    onChange({ target: { name, value: selectedValue } });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 z-10">
          {icon}
        </div>
      )}

      <div
        className={`w-full ${
          icon ? "pl-12" : "pl-4"
        } pr-12 py-4 bg-white/70 backdrop-blur-sm border-2 border-white/40 rounded-xl text-gray-800 focus:outline-none focus:border-green-400 hover:bg-white/80 transition-all duration-300 cursor-pointer shadow-md flex items-center justify-between`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-gray-800" : "text-gray-500"}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-48 overflow-y-auto">
          <div
            className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-500"
            onClick={() => handleSelect("")}
          >
            {placeholder}
          </div>
          {options.map((option, index) => (
            <div
              key={index}
              className="px-4 py-3 hover:bg-green-50 cursor-pointer text-gray-800 border-t border-gray-100"
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

export default function FloatingSearchComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [nomerDokumen, setNomerDokumen] = useState("");
  const [jenisDokumen, setJenisDokumen] = useState("");
  const [tahun, setTahun] = useState("");

  const navigate = useNavigate();

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
    const lawPagePath = `/peraturan-terbaru${searchQuery ? `?${searchQuery}` : ""}`;

    navigate(lawPagePath);

    console.log("Redirecting to LawPage with params:", searchParams);
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = currentYear; year >= 2000; year--) {
    yearOptions.push({
      value: year.toString(),
      label: year.toString(),
    });
  }

  const jenisOptions = [
    { value: "perda", label: "Peraturan Daerah" },
    { value: "pergub", label: "Peraturan Gubernur" },
    { value: "perkada", label: "Peraturan Kepala Daerah" },
    { value: "sk", label: "Surat Keputusan" },
  ];

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
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                Selamat Datang Di JDIH
                <br />
                Jawa Timur
              </h1>
              <p className="text-lg text-gray-700 flex items-center justify-center gap-2">
                Silahkan Cari Dokumen Produk Hukum Disini
                <span className="text-2xl">⚖️</span>
              </p>
            </div>

            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Silahkan ketikan dokumen yang kamu cari disini..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full pl-14 pr-6 py-5 bg-white/80 backdrop-blur-sm border-2 border-white/50 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-green-400 focus:bg-white/90 transition-all duration-300 text-lg shadow-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Nomer Dokumen"
                  value={nomerDokumen}
                  onChange={(e) => setNomerDokumen(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-sm border-2 border-white/40 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-green-400 focus:bg-white/80 transition-all duration-300 shadow-md"
                />
              </div>

              <CustomSelect
                value={jenisDokumen}
                onChange={(e) => setJenisDokumen(e.target.value)}
                name="jenisDokumen"
                placeholder="Jenis Dokumen"
                options={jenisOptions}
              />

              <CustomSelect
                value={tahun}
                onChange={(e) => setTahun(e.target.value)}
                name="tahun"
                placeholder="Pilih Tahun"
                options={yearOptions}
                icon={<Calendar className="w-5 h-5" />}
              />
            </div>

            <button
              onClick={handleSearch}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-5 px-8 rounded-2xl transition-all duration-300 text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:scale-[1.02] transform"
            >
              <Search className="w-5 h-5" />
              Cari Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
