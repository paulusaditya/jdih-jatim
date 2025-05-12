"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import baseUrl from "../config/api";

export default function PopularDocumentMonography() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMostViewedDocuments = async () => {
      try {
        const response = await fetch(`${baseUrl}/most-viewed-by-section-id/11`);
        if (!response.ok) throw new Error("Gagal fetch dokumen terpopuler");
        const data = await response.json();

        const mostViewedBooks = data.data || [];

        const booksWithDetails = await Promise.all(
          mostViewedBooks.slice(0, 2).map(async (book) => {
            try {
              const detailRes = await fetch(`${baseUrl}/topics/${book.id}`);
              const detailData = await detailRes.json();
              const detail = detailData.data;

              return {
                id: book.id,
                title: detail.title,
                slug: detail.seo_url_slug_id,
                image: detail.image,
              };
            } catch {
              return {
                id: book.id,
                title: book.title,
                slug: null,
                image: null,
              };
            }
          })
        );

        setBooks(booksWithDetails);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMostViewedDocuments();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4 text-emerald-700">
        Dokumen Terpopuler
      </h2>

      {loading ? (
        <p className="text-gray-500 text-sm">Memuat data...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : books.length > 0 ? (
        <div className="space-y-4">
          {books.map((book) => (
            <div key={book.id} className="flex flex-col">
              <Link
                to={book.slug ? `/site-pages/monografi/${book.slug}` : "#"}
                className="group"
              >
                {book.image && (
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-auto rounded shadow group-hover:opacity-90"
                  />
                )}
                <p className="text-sm text-gray-700 mt-2 group-hover:underline">
                  {book.title}
                </p>
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
