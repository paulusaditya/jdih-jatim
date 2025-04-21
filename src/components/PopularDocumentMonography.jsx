"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Function to randomly pick a subset of documents
const getRandomSubset = (array, size) => {
  const shuffled = array.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, size); // Take the first 'size' elements
};

export default function PopularDocumentMonography() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const proxiedLogo = (logo) =>
    logo?.startsWith("http://")
      ? `https://images.weserv.nl/?url=${logo.replace("http://", "")}`
      : logo;

  useEffect(() => {
    const fetchPopularMonographs = async () => {
      try {
        const response = await fetch("https://jdih.pisdev.my.id/api/v2/home/monography?webmaster_id=11");
        if (!response.ok) throw new Error("Gagal fetch dokumen populer");
        const data = await response.json();

        const popularBooks = data.data || [];

        // Fetch book details and add slugs
        const booksWithSlugs = await Promise.all(
          popularBooks.map(async (book) => {
            try {
              const detailRes = await fetch(`https://jdih.pisdev.my.id/api/v2/topics/${book.id}`);
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

        // Randomly pick 5 books from the fetched list
        const randomBooks = getRandomSubset(booksWithSlugs, 2);

        setBooks(randomBooks);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPopularMonographs();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4 text-emerald-700">Dokumen Terpopuler</h2>

      {loading ? (
        <p className="text-gray-500 text-sm">Memuat data...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : books.length > 0 ? (
        <div className="space-y-4">
          {books.map((book) => (
            <div key={book.id} className="flex flex-col">
              <Link to={book.slug ? `/site-pages/monografi/${book.slug}` : "#"} className="group">
                <img
                  src={proxiedLogo(book.image)}
                  alt={book.title}
                  className="w-full h-auto rounded shadow group-hover:opacity-90"
                />
                <p className="text-sm text-gray-700 mt-2 group-hover:underline">{book.title}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">Tidak ada data populer</p>
      )}

      <div className="mt-6 flex justify-center px-5">
        <img
          src="/assets/logo-biro-hukum.png"
          alt="Logo Biro Hukum"
          className="w-full max-w-xs h-auto"
          width="200"
          height="100"
        />
      </div>
    </div>
  );
}
