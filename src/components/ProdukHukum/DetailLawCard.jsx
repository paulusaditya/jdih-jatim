import React, { useState } from "react";
import { Eye, Download } from "lucide-react";
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

function DetailLawCard({ setShowKategori }) {
  const [selectedButton, setSelectedButton] = useState(null);
  const [showPdf, setShowPdf] = useState(false);
  const [lampiran, setLampiran] = useState("");

  const handleButtonClick = (button) => {
    setSelectedButton(button);
    if (button === "Dokumen Lampiran") {
      setShowPdf(true);
      setShowKategori(false);
      const lampiranItem = detailData.find((item) => item.label === "Lampiran");
      setLampiran(lampiranItem ? lampiranItem.value : "");
    } else {
      setShowPdf(false);
      setShowKategori(true);
    }
  };

  const handleDownload = () => {
    const lampiranItem = detailData.find((item) => item.label === "Lampiran");
    const fileUrl = lampiranItem ? lampiranItem.value : "";
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", fileUrl.split("/").pop());
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="self-center p-6 h-auto rounded-xl border border-solid border-stone-300 w-[760px] max-md:w-full max-sm:p-4">
      <div className="mb-5 text-2xl font-semibold text-zinc-800">
        Peraturan Gubernur Jawa Timur Nomor 4 Tahun 2025 tentang Tambahan
        Penghasilan Pegawai
      </div>
      <div className="flex justify-between items-center px-4 py-3 mb-5 rounded-lg bg-zinc-100 max-sm:flex-col max-sm:gap-3">
        <div className="flex gap-3 items-center text-base text-black">
          <div>
            <Eye size={24} />
          </div>
          <div>Visits : 677</div>
        </div>
        <div className="flex gap-2 items-center px-5 py-3 text-sm font-semibold text-zinc-800">
          <a
            onClick={handleDownload}
            className="flex items-center cursor-pointer"
          >
            <div className="mr-2">Download</div>
            <Download size={24} className="text-green-500" />{" "}
          </a>
        </div>
      </div>
      <div className="flex gap-3 mb-5 max-sm:flex-wrap">
        <button
          className={`px-4 py-1 text-base rounded-[999px] border border-zinc-300 ${
            selectedButton === "Detail" ? "bg-red-500 text-white" : ""
          }`}
          onClick={() => handleButtonClick("Detail")}
        >
          Detail
        </button>
        <button
          className={`px-4 py-1 text-base rounded-[999px] border border-zinc-300 ${
            selectedButton === "Dokumen Lampiran" ? "bg-red-500 text-white" : ""
          }`}
          onClick={() => handleButtonClick("Dokumen Lampiran")}
        >
          Dokumen Lampiran
        </button>
        <button
          className={`px-4 py-1 text-base rounded-[999px] border border-zinc-300 ${
            selectedButton === "Abstrak Lampiran" ? "bg-red-500 text-white" : ""
          }`}
          onClick={() => handleButtonClick("Abstrak Lampiran")}
        >
          Abstrak Lampiran
        </button>
      </div>
      {showPdf ? (
        <div className="mt-4">
          <DetailItem label="Lampiran" value={lampiran} />
          <iframe
            src={lampiran}
            width="100%"
            height="500px"
            title="Dokumen Lampiran"
          />
        </div>
      ) : (
        <div className="flex flex-col">
          {detailData.map((item, index) => (
            <DetailItem key={index} label={item.label} value={item.value} />
          ))}
        </div>
      )}
    </div>
  );
}

export default DetailLawCard;
