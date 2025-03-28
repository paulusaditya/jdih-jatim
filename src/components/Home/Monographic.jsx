import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Monographic() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://54.169.231.19/api/v2/home/monography")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setBooks(data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

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
            to="/dokumentasi/monografi"
            className="flex items-center font-medium text-sm border rounded px-4 py-2 transition-colors text-blue-600 border-blue-600 hover:text-blue-800"
          >
            <span className="hidden md:inline">LIHAT SEMUA</span>
            <ArrowRight className="ml-1 h-4 w-4 md:h-5 md:w-5" />
          </Link>
        </div>

        {/* Handle loading & error */}
        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-600">Error: {error}</p>}

        {/* Grid Buku */}
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center items-start">
            {books.map((book) => (
              <div key={book.id} className="w-full min-h-[200px] flex flex-col items-center text-center">
                <img
                  src={book.image || "http://54.169.231.19/uploads/default_document_image.png"}
                  alt={book.title}
                  className="w-40 md:w-48 lg:w-56 h-56 object-cover rounded-lg shadow-md"
                />
                <p className="text-sm text-center mt-2 w-full px-2 break-words">{book.title}</p>
                <Link
                  to={book.link}
                  className="text-blue-600 text-sm mt-1 hover:underline"
                >
                  Baca Selengkapnya
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
