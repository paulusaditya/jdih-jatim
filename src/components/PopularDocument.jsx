import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import baseUrl from "../config/api";

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

const PopularDocument = ({ sectionId }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPopularDocuments = async () => {
      try {
        const url = sectionId
          ? `${baseUrl}/most-viewed-by-section-id/${sectionId}`
          : `${baseUrl}/topics/most-viewed?limit=3`;

        const res = await fetch(url);
        const data = await res.json();

        if (data && Array.isArray(data.data)) {
          setDocuments(data.data.slice(0, 3));
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (err) {
        console.error("Failed to fetch popular documents:", err);
      } finally {
        setLoading(false);
      }
    };

    getPopularDocuments();
  }, [sectionId]);

  if (loading) {
    return (
      <div className="flex flex-col w-full max-w-[395px] mx-auto">
        <section className="px-5 pt-6 pb-3 rounded-lg bg-zinc-100 text-zinc-800 shadow-md">
          <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
          <div className="mt-3 space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-5 bg-gray-200 rounded animate-pulse"
              ></div>
            ))}
          </div>
        </section>
        <div className="mt-6 flex justify-center px-5">
          <div className="w-full max-w-xs h-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-[395px] mx-auto">
      <section className="px-5 pt-6 pb-3 rounded-lg bg-zinc-100 text-zinc-800 shadow-md">
        <h2 className="text-lg md:text-xl font-bold text-green-700 mb-2">
          Dokumen Populer
        </h2>
        {documents.length === 0 ? (
          <p className="text-sm text-gray-600">Tidak ada dokumen populer.</p>
        ) : (
          <ul className="mt-3 space-y-3 text-sm md:text-base font-semibold leading-6">
            {documents.map((doc, idx) => (
              <li key={idx} className="break-words hover:underline">
                <Link
                  to={`/site-pages/dokumen-populer/${generateSlug(doc.title)}`}
                >
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      <div className="mt-6 flex justify-center px-5">
        <img
          src="/assets/logo-biro-hukum.png"
          alt="Logo Biro Hukum"
          className="w-full max-w-xs h-auto"
          width={200}
          height={100}
        />
      </div>
    </div>
  );
};

export default PopularDocument;
