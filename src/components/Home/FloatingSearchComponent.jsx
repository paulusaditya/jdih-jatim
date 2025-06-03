import React, { useState } from "react";
import { Search } from "lucide-react";

export default function JDIHJawaTimur() {
  const [searchTerm, setSearchTerm] = useState("");
  const [nomerDokumen, setNomerDokumen] = useState("");
  const [jenisDokumen, setJenisDokumen] = useState("");
  const [tahun, setTahun] = useState("");

  const handleSearch = () => {
    console.log("Searching...", { searchTerm, nomerDokumen, jenisDokumen, tahun });
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 md:mt-12 bg-white rounded-3xl shadow-xl p-6 md:p-12 border-2 border-green-200">
      {/* Header */}
      <div className="text-center mb-8 md:mb-10 px-4 md:px-0">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 md:mb-6 leading-snug md:leading-tight">
          Selamat Datang Di
          <br />
          JDIH Jawa Timur
        </h1>
        <p className="text-sm md:text-lg text-gray-600 flex items-center justify-center gap-2">
          Silahkan Cari Dokumen Produk Hukum Disini
          <span className="text-yellow-500">⚖️</span>
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6 md:mb-8 px-4 md:px-0">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
          <input
            type="text"
            placeholder="Silahkan ketikan dokumen yang kamu cari disini.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 md:py-4 border-2 border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 bg-gray-50 focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 text-sm md:text-base"
          />
        </div>
      </div>

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-6 md:mb-8 px-4 md:px-0">
        {/* Nomer Dokumen */}
        <div className="relative">
          <input
            type="text"
            placeholder="Nomer Dokumen"
            value={nomerDokumen}
            onChange={(e) => setNomerDokumen(e.target.value)}
            className="w-full px-4 py-3 md:py-4 border-2 border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 bg-gray-50 focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 text-sm md:text-base"
          />
        </div>

        {/* Jenis Dokumen */}
        <div className="relative">
          <select
            value={jenisDokumen}
            onChange={(e) => setJenisDokumen(e.target.value)}
            className="w-full px-4 py-3 md:py-4 border-2 border-gray-200 rounded-xl text-gray-700 bg-gray-50 focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 text-sm md:text-base appearance-none cursor-pointer"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
              backgroundPosition: "right 12px center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "16px",
            }}
          >
            <option value="">Jenis Dokumen</option>
            <option value="perda">Peraturan Daerah</option>
            <option value="pergub">Peraturan Gubernur</option>
            <option value="perkada">Peraturan Kepala Daerah</option>
            <option value="sk">Surat Keputusan</option>
          </select>
        </div>

        {/* Pilih Tahun */}
        <div className="relative">
          <select
            value={tahun}
            onChange={(e) => setTahun(e.target.value)}
            className="w-full px-4 py-3 md:py-4 border-2 border-gray-200 rounded-xl text-gray-700 bg-gray-50 focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 text-sm md:text-base appearance-none cursor-pointer"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
              backgroundPosition: "right 12px center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "16px",
            }}
          >
            <option value="">Pilih Tahun</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
        </div>
      </div>

      {/* Search Button */}
      <div className="px-4 md:px-0">
        <button
          onClick={handleSearch}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 md:py-4 px-6 rounded-xl transition-colors duration-300 text-base md:text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          <Search className="w-4 h-4 md:w-5 md:h-5" />
          Cari Sekarang
        </button>
      </div>
    </div>
  );
}
