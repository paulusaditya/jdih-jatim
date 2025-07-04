"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../config/api";
import LoadingSpinner from "../common/LoadingSpinner";

const StrukturOrganisasiPengelolaanPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}/topics/by-slug/struktur-organisasi-tim-pengelolaan-jdih-provinsi-jawa-timur`)
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Gagal memuat data.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="bg-red-50 border border-red-200 p-4 sm:p-6 rounded-lg text-red-700 text-center max-w-2xl mx-auto">
            <div className="mb-2">
              <svg className="w-8 h-8 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm sm:text-base">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-700 mb-4 leading-tight">
            {data?.title || "Struktur Organisasi Pengelolaan JDIH"}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white flex justify-center">
          <div 
            className="
              prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 
              max-w-none 
              text-gray-800 
              prose-headings:text-green-700 
              prose-headings:font-semibold 
              prose-p:text-gray-700 
              prose-p:leading-relaxed 
              prose-ul:text-gray-700 
              prose-ol:text-gray-700
              prose-li:text-gray-700
              prose-strong:text-gray-900
              prose-a:text-green-600 
              prose-a:no-underline 
              hover:prose-a:underline
              prose-img:rounded-lg 
              prose-img:shadow-md
              prose-img:mx-auto
              prose-img:max-w-full
              prose-img:h-auto
              prose-table:w-full
              prose-table:overflow-x-auto
              prose-td:p-2
              prose-th:p-2
              prose-th:bg-green-50
              prose-th:text-green-700
              prose-th:font-semibold
            "
            dangerouslySetInnerHTML={{ __html: data?.details_id || "" }}
          />
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        .prose img {
          display: block !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }

        .prose img[src*="struktur"],
        .prose img[src*="organisasi"],
        .prose img[src*="chart"] {
          width: 100% !important;
          max-width: 100% !important;
          height: auto !important;
          object-fit: contain !important;
        }

        @media (max-width: 640px) {
          .prose {
            font-size: 0.875rem !important;
          }

          .prose img {
            max-width: 100% !important;
            height: auto !important;
          }

          .prose table {
            display: block !important;
            overflow-x: auto !important;
            white-space: nowrap !important;
            font-size: 0.875rem !important;
          }

          .prose pre {
            overflow-x: auto !important;
            font-size: 0.75rem !important;
          }

          .prose blockquote {
            margin: 1rem 0 !important;
            padding: 0.5rem 1rem !important;
          }

          .prose h1 {
            font-size: 1.5rem !important;
            margin-bottom: 1rem !important;
          }

          .prose h2 {
            font-size: 1.25rem !important;
            margin-bottom: 0.75rem !important;
          }

          .prose h3 {
            font-size: 1.125rem !important;
            margin-bottom: 0.5rem !important;
          }

          .prose ul, .prose ol {
            padding-left: 1.25rem !important;
            margin-bottom: 0.75rem !important;
          }

          .prose li {
            margin-bottom: 0.25rem !important;
          }
        }

        .prose table {
          border-collapse: collapse !important;
          width: 100% !important;
        }

        .prose td, .prose th {
          border: 1px solid #e5e7eb !important;
          padding: 0.5rem !important;
          text-align: left !important;
          vertical-align: top !important;
        }
      `}</style>
    </div>
  );
};

export default StrukturOrganisasiPengelolaanPage;
