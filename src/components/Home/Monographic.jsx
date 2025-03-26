import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Monographic() {
  const books = [
    {
      id: 1,
      title: "Hukum Acara Pengujian Undang-Undang",
      image: "/assets/monographic/image 70.png",
    },
    {
      id: 2,
      title: "Teori Hukum Murni",
      image: "/assets/monographic/image 71.png",
    },
    {
      id: 3,
      title: "Hukum Acara Peradilan Tata Usaha Negara Indonesia",
      image: "/assets/monographic/image 72.png",
    },
    {
      id: 4,
      title: "Hukum Lingkungan",
      image: "/assets/monographic/image 73.png",
    },
    {
      id: 5,
      title: "Hukum Pajak",
      image: "/assets/monographic/image 74.png",
    },
  ];

  return (
    <section className="py-8 px-4 md:px-6 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-blue-900">Dokumen Monografi</h2>
            <p className="text-gray-600">
              Koleksi dokumen Monografi terbaru milik Biro Hukum Provinsi Jawa Timur
            </p>
          </div>
          <Link
              href="/monografi"
              className="flex items-center font-medium text-sm border rounded px-4 py-2 transition-colors text-blue-600 border-blue-600 hover:text-blue-800"
            >
              <span className="hidden md:inline">LIHAT SEMUA</span>
              <ArrowRight className="ml-1 h-4 w-4 md:h-5 md:w-5" />
            </Link>
        </div>

        {/* Grid Buku */}
        <div className="flex flex-wrap justify-center gap-6">
          {books.map((book) => (
            <div key={book.id} className="w-40 md:w-48 lg:w-56">
              <img
                src={book.image}
                alt={`Book ${book.id}`}
                className="w-full aspect-[3/4] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}