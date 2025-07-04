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

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 rounded w-40 mb-4 animate-pulse"></div>

        {/* Books skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="flex flex-col">
              {/* Image skeleton */}
              <div className="w-full h-48 bg-gray-200 rounded shadow animate-pulse"></div>
              {/* Title skeleton */}
              <div className="h-4 bg-gray-200 rounded w-3/4 mt-2 animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Logo skeleton */}
        <div className="mt-6 flex justify-center px-5">
          <div className="w-full max-w-xs h-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4 text-green-700">
          Dokumen Terpopuler
        </h2>
        <p className="text-red-500">Error: {error}</p>

        {/* Logo tetap ditampilkan meskipun error */}
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

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4 text-green-700">
        Dokumen Terpopuler
      </h2>

      {books.length > 0 ? (
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
                    className="w-full h-auto rounded shadow group-hover:opacity-90 transition-opacity"
                  />
                )}
                <p className="text-sm text-gray-700 mt-2 group-hover:underline transition-all">
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
