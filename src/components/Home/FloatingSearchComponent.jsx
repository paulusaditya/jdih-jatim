import React, { useState } from "react";
import { Search, FileText, Calendar } from "lucide-react";

export default function FloatingSearchComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [nomerDokumen, setNomerDokumen] = useState("");
  const [jenisDokumen, setJenisDokumen] = useState("");
  const [tahun, setTahun] = useState("");

  const handleSearch = () => {
    console.log("Searching...", { searchTerm, nomerDokumen, jenisDokumen, tahun });
  };

  return (
    <div>
      {/* Background with blur effect */}
      <div 
        className="inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-yellow-50"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 183, 77, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(34, 197, 94, 0.2) 0%, transparent 50%)
          `
        }}
      />
      
      {/* Floating search container */}
      <div className="relative">
        <div className="w-full max-w-3xl">
          {/* Main card with glassmorphism effect */}
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30">
            
            {/* Header */}
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

            {/* Main search bar */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Silahkan ketikan dokumen yang kamu cari disini..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-white/80 backdrop-blur-sm border-2 border-white/50 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-green-400 focus:bg-white/90 transition-all duration-300 text-lg shadow-lg"
                />
              </div>
            </div>

            {/* Filter row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Nomer Dokumen */}
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Nomer Dokumen"
                  value={nomerDokumen}
                  onChange={(e) => setNomerDokumen(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-sm border-2 border-white/40 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-green-400 focus:bg-white/80 transition-all duration-300 shadow-md"
                />
              </div>

              {/* Jenis Dokumen */}
              <div className="relative">
                <select
                  value={jenisDokumen}
                  onChange={(e) => setJenisDokumen(e.target.value)}
                  className="w-full px-4 py-4 bg-white/70 backdrop-blur-sm border-2 border-white/40 rounded-xl text-gray-800 focus:outline-none focus:border-green-400 focus:bg-white/80 transition-all duration-300 appearance-none cursor-pointer shadow-md"
                  style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
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
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
                <select
                  value={tahun}
                  onChange={(e) => setTahun(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-sm border-2 border-white/40 rounded-xl text-gray-800 focus:outline-none focus:border-green-400 focus:bg-white/80 transition-all duration-300 appearance-none cursor-pointer shadow-md"
                  style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
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