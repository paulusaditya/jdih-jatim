import React from "react";

const documents = [
  {
    id: 1,
    title:
      "Peraturan Daerah Provinsi Jawa Timur Nomor 10 Tahun 2023 tentang Rencana Tata Ruang Wilayah Provinsi Jawa Timur Tahun 2023-2043",
  },
  {
    id: 2,
    title:
      "Peraturan Daerah Provinsi Jawa Timur Nomor 11 Tahun 2023 tentang Rencana Pembangunan Jangka Menengah Daerah",
  },
  {
    id: 3,
    title:
      "Peraturan Daerah Provinsi Jawa Timur Nomor 12 Tahun 2023 tentang Pengelolaan Sampah",
  },
];

function PopularDocument() {
  return (
    <div className="flex flex-col max-w-[395px] mx-auto">
      <section className="flex flex-col px-5 pt-6 pb-3 w-full text-base font-semibold rounded-lg bg-zinc-100 text-zinc-800 shadow-md">
        <h2 className="text-xl font-bold text-sky-900 mb-2">
          Dokumen Terpopuler
        </h2>
        <ul className="flex flex-col mt-3 w-full leading-6">
          {documents.map((doc) => (
            <li key={doc.id} className="flex gap-2 items-start py-3 w-full">
              <div className="flex-1 shrink gap-2 self-stretch w-full basis-0 min-w-[240px]">
                {doc.title}
              </div>
            </li>
          ))}
        </ul>
      </section>
      <div className="mt-6 flex justify-center">
        <img
          src="/assets/logo-biro-hukum.png" 
          alt="Logo Biro Hukum"
          className="w-80 h-auto"
        />
      </div>
    </div>
  );
}

export default PopularDocument;
