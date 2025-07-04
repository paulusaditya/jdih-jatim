import * as React from "react";

const METADATA_ORDER = {
  "tipe dokumen": 1,
  judul: 2,
  "judul peraturan": 2,
  "t.e.u": 3,
  "t.e.u badan": 3,
  badan: 3,
  instansi: 3,
  nomor: 4,
  "nomor peraturan": 4,
  "jenis dokumen": 5,
  "jenis peraturan": 5,
  "bentuk peraturan": 5,
  "singkatan jenis": 6,
  singkatan: 6,
  "tempat terbit": 7,
  "tempat penetapan": 7,
  "tanggal penetapan": 8,
  "tanggal pengundangan": 9,
  sumber: 10,
  subjek: 11,
  status: 12,
  "keterangan status": 12,
  bahasa: 13,
  lokasi: 14,
  "bidang hukum": 15,
  "tahun terbit": 16,
  tahun: 16,
  "urusan pemerintahan": 17,
  penandatangan: 18,
  pemrakarsa: 19,
  "peraturan terkait": 20,
  "dokumen terkait": 21,
  lampiran: 99,
  "abstrak lampiran": 98,
};

function getFieldOrder(title) {
  const normalizedTitle = title.toLowerCase().trim();
  return METADATA_ORDER[normalizedTitle] || 50;
}

function DetailItem({ label, value, fields, loading = false }) {
  if (loading) {
    return (
      <div className="space-y-0">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex px-0 py-3 border-b border-solid border-b-zinc-100 items-start"
          >
            <div className="w-[175px] shrink-0">
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (label && value) {
    return (
      <div className="flex px-0 py-3 border-b border-solid border-b-zinc-100 items-start">
        <div className="text-base font-medium text-zinc-600 w-[175px] shrink-0">
          {label}
        </div>
        <div className="text-base text-zinc-600 break-words whitespace-pre-wrap flex-1 overflow-hidden text-ellipsis">
          {value}
        </div>
      </div>
    );
  }

  if (fields && Array.isArray(fields)) {
    const sortedFields = [...fields].sort((a, b) => {
      const orderA = getFieldOrder(a.title);
      const orderB = getFieldOrder(b.title);

      if (orderA !== orderB) {
        return orderA - orderB;
      }

      if (a.sequence !== b.sequence) {
        return (a.sequence || 999) - (b.sequence || 999);
      }

      return a.title.localeCompare(b.title);
    });

    return (
      <>
        <div className="flex px-0 py-3 border-b border-solid border-b-zinc-100 items-start">
          <div className="text-base font-medium text-zinc-600 w-[175px] shrink-0">
            Tipe Dokumen
          </div>
          <div className="text-base text-zinc-600 break-words whitespace-pre-wrap flex-1 overflow-hidden text-ellipsis">
            Peraturan Perundang-undangan
          </div>
        </div>

        {sortedFields.map((field, index) => {
          if (field.title?.toLowerCase().includes("lampiran")) {
            return null;
          }

          const normalizedTitle = field.title.toLowerCase().trim();
          const isJenisDokumen = METADATA_ORDER[normalizedTitle] === 5;

          let displayValue = field.details || "-";
          let displayTitle = field.title;

          if (isJenisDokumen) {
            displayTitle = "Jenis/Bentuk Peraturan";
          }

          return (
            <div
              key={`${field.title}-${index}`}
              className="flex px-0 py-3 border-b border-solid border-b-zinc-100 items-start hover:bg-gray-50 transition-colors"
            >
              <div className="text-base font-medium text-zinc-600 w-[175px] shrink-0">
                {displayTitle}
              </div>
              <div className="text-base text-zinc-600 break-words whitespace-pre-wrap flex-1 overflow-hidden text-ellipsis">
                {displayValue}
              </div>
            </div>
          );
        })}
      </>
    );
  }

  return null;
}

export default DetailItem;
