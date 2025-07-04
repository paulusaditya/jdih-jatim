"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import baseUrl from "../../config/api";

export default function Monographic() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    const fetchMonographs = async () => {
      try {
        const response = await fetch(`${baseUrl}/home/monography`);
        if (!response.ok) throw new Error("Gagal fetch monografi");
        const data = await response.json();

        const shuffledBooks = shuffleArray(data.data);
        const randomFiveBooks = shuffledBooks.slice(0, 5);

        const booksWithSlugs = await Promise.all(
          randomFiveBooks.map(async (book) => {
            try {
              const detailRes = await fetch(`${baseUrl}/topics/${book.id}`);
              const detailData = await detailRes.json();
              return {
                ...book,
                slug: detailData.data.seo_url_slug_id,
              };
            } catch {
              return {
                ...book,
                slug: null,
              };
            }
          })
        );

        setBooks(booksWithSlugs);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMonographs();
  }, []);

  if (loading) {
    return (
      <section className="py-8 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>

          <div className="flex flex-wrap justify-between gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="w-full sm:w-[calc(50%-8px)] md:w-[calc(20%-16px)] flex flex-col items-center"
              >
                <div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mt-2 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-green-800">
                Dokumen Monografi
              </h2>
              <p className="text-gray-600 mt-1">
                Koleksi dokumen Monografi terbaru milik Biro Hukum Provinsi Jawa
                Timur
              </p>
            </div>
          </div>
          <div className="text-center text-red-600">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-green-800">
              Dokumen Monografi
            </h2>
            <p className="text-gray-600 mt-1">
              Koleksi dokumen Monografi terbaru milik Biro Hukum Provinsi Jawa
              Timur
            </p>
          </div>
          <Link
            to="/site-pages/monografi"
            className="flex items-center font-medium text-sm border rounded px-4 py-2 transition-colors text-green-600 border-green-600 hover:text-green-800"
          >
            <span className="hidden md:inline">LIHAT SEMUA</span>
            <ArrowRight className="ml-1 h-4 w-4 md:h-5 md:w-5" />
          </Link>
        </div>

        <div className="flex flex-wrap justify-between gap-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="w-full sm:w-[calc(50%-8px)] md:w-[calc(20%-16px)] flex flex-col items-center"
            >
              <Link to={book.slug ? `/site-pages/monografi/${book.slug}` : "#"}>
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-64 object-cover rounded-lg shadow-md hover:opacity-90 transition-opacity"
                />
              </Link>
              <p className="text-sm text-center mt-2 w-full px-2 break-words font-medium">
                {book.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
