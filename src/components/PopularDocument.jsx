import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = "https://jdih.pisdev.my.id/api/v2";

const PopularDocument = ({ webmasterId }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPopularDocuments = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/most-viewed-by-section-id/${webmasterId}`
        );
        const { data } = await res.json();
        const topThree = data.slice(0, 3);
        setDocuments(topThree);
      } catch (err) {
        console.error("Failed to fetch popular documents:", err);
      } finally {
        setLoading(false);
      }
    };

    if (webmasterId) {
      getPopularDocuments();
    }
  }, [webmasterId]);

  return (
    <div className="flex flex-col w-full max-w-[395px] mx-auto">
      <section className="px-5 pt-6 pb-3 rounded-lg bg-zinc-100 text-zinc-800 shadow-md">
        <h2 className="text-lg md:text-xl font-bold text-sky-900 mb-2">
          Dokumen Populer
        </h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="mt-3 space-y-3 text-sm md:text-base font-semibold leading-6">
            {documents.map((doc, idx) => (
              <li key={idx} className="break-words">
                <Link to={`/dokumen-populer/${doc.slug}`}>{doc.title}</Link>
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
