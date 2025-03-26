import * as React from "react";
import { Bookmark } from "lucide-react";

const kategoriList = [
  { name: "Produk Hukum Provinsi Jawa Timur", count: 81018, isMain: true },
  { name: "Peraturan Daerah", count: 516, isMain: false },
  { name: "Peraturan Gubernur", count: 1730, isMain: false },
  { name: "Keputusan Gubernur", count: 3395, isMain: false },
  { name: "Surat Keputusan Gubernur", count: 2390, isMain: false },
  { name: "Instruksi Gubernur", count: 28, isMain: false },
  { name: "Keputusan Bersama Gubernur", count: 2, isMain: false },
  { name: "Keputusan Atas Nama Gubernur", count: 2, isMain: false },
  { name: "Produk Hukum Kabupaten/Kota", count: 0, isMain: true },
  { name: "Peraturan Daerah Kabupaten/Kota", count: 0, isMain: false },
  { name: "Peraturan Walikota/Bupati", count: 0, isMain: false },
  { name: "Keputusan Walikota/Bupati", count: 0, isMain: false },
  { name: "Instruksi Walikota/Bupati", count: 0, isMain: false },
  { name: "Produk Hukum Desa", count: 0, isMain: true },
  { name: "Peraturan Desa", count: 0, isMain: false },
  { name: "Keputusan Desa", count: 0, isMain: false },
  { name: "Peraturan Ahli Bahasa", count: 3, isMain: true },
];

function Kategori() {
  return (
    <div className="px-5 pt-6 pb-3 rounded-lg border border-solid border-zinc-100">
      <div className="mb-3 text-xl font-bold text-sky-900">Kategori</div>
      <div>
        {kategoriList.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between items-center py-2 ${
              item.isMain ? "mt-4" : "ml-6"
            }`}
          >
            <div className="flex gap-2 items-center">
              {item.isMain && <Bookmark className="w-5 h-5 text-green-600" />}
              <div
                className={`text-base ${
                  item.isMain ? "font-bold text-zinc-800" : "text-zinc-700"
                }`}
              >
                {item.name}
              </div>
            </div>
            <div
              className={`text-sm ${
                item.isMain ? "font-bold text-zinc-800" : "text-zinc-600"
              }`}
            >
              {`(${item.count})`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Kategori;
