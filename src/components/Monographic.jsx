import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Monographic() {
  const books = [
    {
      id: 1,
      title: "Hukum Acara Pengujian Undang-Undang",
      image: "./src/assets/monographic/image 70.png",
    },
    {
      id: 2,
      title: "Teori Hukum Murni",
      image: "./src/assets/monographic/image 71.png",
    },
    {
      id: 3,
      title: "Hukum Acara Peradilan Tata Usaha Negara Indonesia",
      image: "./src/assets/monographic/image 72.png",
    },
    {
      id: 4,
      title: "Hukum Lingkungan",
      image: "./src/assets/monographic/image 73.png",
    },
    {
      id: 5,
      title: "Hukum Pajak",
      image: "./src/assets/monographic/image 74.png",
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
            to="/monografi"
            className="flex items-center bg-pink-100 text-pink-600 border-pink-300 hover:text-pink-800 font-medium text-sm border border-pink-600 rounded px-4 py-2 transition-colors"
          >
            LIHAT SEMUA <ArrowRight className="ml-1 h-4 w-4" />
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