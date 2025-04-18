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
    <div className="flex flex-col w-full max-w-[395px] mx-auto">
      <section className="flex flex-col px-5 pt-6 pb-3 w-full text-sm md:text-base font-semibold rounded-lg bg-zinc-100 text-zinc-800 shadow-md">
        <h2 className="text-lg md:text-xl font-bold text-sky-900 mb-2">
          Dokumen Terpopuler
        </h2>
        <ul className="flex flex-col mt-3 w-full leading-6">
          {documents.map((doc) => (
            <li
              key={doc.id}
              className="flex gap-2 items-start py-3 w-full text-left"
            >
              <div className="flex-1 min-w-0 break-words">{doc.title}</div>
            </li>
          ))}
        </ul>
      </section>
      <div className="mt-6 flex justify-center px-5">
        <img
          src="/assets/logo-biro-hukum.png"
          alt="Logo Biro Hukum"
          className="w-full max-w-xs h-auto"
        />
      </div>
    </div>
  );
}

export default PopularDocument;
