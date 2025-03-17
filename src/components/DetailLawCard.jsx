import * as React from "react";
import DetailItem from "./DetailItem"; 

const detailData = [
  { label: "Jenis Peraturan", value: "Peraturan Gubernur" },
  {
    label: "Judul Peraturan",
    value:
      "Peraturan Gubernur Jawa Timur Nomor 4 Tahun 2025 tentang Tambahan Penghasilan Pegawai",
  },
  { label: "Nomor", value: "4" },
  { label: "Tahun Terbit", value: "2025" },
  { label: "Singkatan Jenis", value: "PERGUB" },
  { label: "Tanggal Penetapan", value: "14-01-2025" },
  { label: "Tanggal Pengundangan", value: "14-01-2025" },
  { label: "T.E.U Badan", value: "Jawa Timur (Provinsi)" },
  { label: "Sumber", value: "-" },
  { label: "Tempat Terbit", value: "Surabaya" },
  { label: "Bidang Hukum", value: "Moneter dan Fiskal Nasional" },
  {
    label: "Subjek",
    value: "PROVINSI JAWA TIMUR - TAMBAHAN PENGHASILAN PEGAWAI",
  },
  { label: "Bahasa", value: "Indonesia" },
  { label: "Lokasi", value: "Biro Hukum Provinsi Jawa Timur" },
  { label: "Urusan Pemerintahan", value: "Urusan Pemerintahan Absolut" },
  { label: "Penandatangan", value: "ADHY KARYONO" },
  {
    label: "Pemrakarsa",
    value: "Badan Pengelola Keuangan dan Aset Daerah Provinsi Jawa Timur",
  },
  { label: "Peraturan Terkait", value: "-" },
  { label: "Dokumen Terkait", value: "-" },
  { label: "Keterangan Status", value: "BERLAKU" },
  { label: "Mengubah", value: "-" },
  { label: "Diubah", value: "-" },
  { label: "Mencabut", value: "-" },
  { label: "Mencabut Sebagian", value: "-" },
  { label: "Dicabut", value: "-" },
  { label: "Dicabut Sebagian", value: "-" },
  { label: "Abstrak", value: "-" },
  { label: "Lampiran", value: "pergub_50_2010.pdf" },
];

function DetailLawCard() {
  return (
    <div className="self-center p-6 h-auto rounded-xl border border-solid border-stone-300 w-[760px] max-md:w-full max-sm:p-4">
      <div className="mb-5 text-2xl font-semibold text-zinc-800">
        Peraturan Gubernur Jawa Timur Nomor 4 Tahun 2025 tentang Tambahan
        Penghasilan Pegawai
      </div>
      <div className="flex justify-between items-center px-4 py-3 mb-5 rounded-lg bg-zinc-100 max-sm:flex-col max-sm:gap-3">
        <div className="flex gap-3 items-center text-base text-black">
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: "<svg>...</svg>", 
              }}
            />
          </div>
          <div>Visits : 677</div>
        </div>
        <div className="flex gap-2 items-center px-5 py-3 text-sm font-semibold text-zinc-800">
          <div>Download</div>
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: "<svg>...</svg>", 
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-3 mb-5 max-sm:flex-wrap">
        <div className="px-4 py-1 text-base rounded-[999px]">Detail</div>
        <div className="px-4 py-1 text-base rounded-[999px]">
          Dokumen Lampiran
        </div>
        <div className="px-4 py-1 text-base rounded-[999px]">
          Abstrak Lampiran
        </div>
      </div>
      <div className="flex flex-col">
        {detailData.map((item, index) => (
          <DetailItem key={index} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  );
}

export default DetailLawCard;
