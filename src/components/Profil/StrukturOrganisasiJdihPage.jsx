"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../config/api";

const StrukturOrganisasiJdihPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}/topics/by-slug/struktur-organisasi-jdih-jatim`)
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
    return (
      <div className="min-h-screen flex justify-center items-center bg-white px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm">Memuat data...</p>
        </div>
      </div>
    );
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
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-700 mb-4 leading-tight">
              {data?.title || "Struktur Organisasi JDIH Jatim"}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="bg-white">
          {/* Content with responsive typography and spacing */}
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

      {/* Custom styles for better mobile experience */}
      <style jsx global>{`
        /* Custom responsive styles for JDIH organizational content */
        @media (max-width: 640px) {
          .prose img {
            max-width: 100% !important;
            height: auto !important;
            margin: 1rem auto !important;
            border-radius: 0.5rem !important;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
          }
          
          .prose table {
            font-size: 0.875rem !important;
            display: block !important;
            overflow-x: auto !important;
            white-space: nowrap !important;
            -webkit-overflow-scrolling: touch !important;
            background: white !important;
            border-radius: 0.5rem !important;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1) !important;
          }
          
          .prose pre {
            overflow-x: auto !important;
            font-size: 0.75rem !important;
            background: #f8fafc !important;
            border: 1px solid #e2e8f0 !important;
            border-radius: 0.5rem !important;
          }
          
          .prose blockquote {
            margin: 1rem 0 !important;
            padding: 0.75rem 1rem !important;
            background: #f0f9f4 !important;
            border-left: 4px solid #16a34a !important;
            border-radius: 0 0.5rem 0.5rem 0 !important;
          }

          .prose hr {
            margin: 2rem 0 !important;
            border-color: #d1d5db !important;
          }
        }

        @media (max-width: 480px) {
          .prose {
            font-size: 0.875rem !important;
            line-height: 1.6 !important;
          }
          
          .prose h1 {
            font-size: 1.5rem !important;
            line-height: 1.3 !important;
            margin-bottom: 1rem !important;
            color: #15803d !important;
          }
          
          .prose h2 {
            font-size: 1.25rem !important;
            line-height: 1.3 !important;
            margin-top: 1.5rem !important;
            margin-bottom: 0.75rem !important;
            color: #15803d !important;
          }
          
          .prose h3 {
            font-size: 1.125rem !important;
            line-height: 1.3 !important;
            margin-top: 1.25rem !important;
            margin-bottom: 0.5rem !important;
            color: #15803d !important;
          }
          
          .prose h4, .prose h5, .prose h6 {
            font-size: 1rem !important;
            line-height: 1.4 !important;
            margin-top: 1rem !important;
            margin-bottom: 0.5rem !important;
            color: #15803d !important;
          }
          
          .prose p {
            margin-bottom: 0.875rem !important;
            text-align: justify !important;
          }
          
          .prose ul, .prose ol {
            padding-left: 1.25rem !important;
            margin-bottom: 0.875rem !important;
          }
          
          .prose li {
            margin-bottom: 0.375rem !important;
            line-height: 1.5 !important;
          }

          .prose a {
            word-break: break-word !important;
          }
        }

        /* Ensure JDIH organizational charts are fully responsive */
        .prose img[src*="struktur"], 
        .prose img[src*="organisasi"],
        .prose img[src*="jdih"],
        .prose img[src*="chart"],
        .prose img[alt*="struktur"],
        .prose img[alt*="organisasi"] {
          width: 100% !important;
          max-width: 100% !important;
          height: auto !important;
          object-fit: contain !important;
          background: white !important;
          padding: 0.5rem !important;
          border: 1px solid #e5e7eb !important;
        }

        /* Handle organizational tables better */
        .prose table {
          border-collapse: collapse !important;
          width: 100% !important;
          margin: 1rem 0 !important;
        }
        
        .prose td, .prose th {
          border: 1px solid #d1d5db !important;
          padding: 0.75rem 0.5rem !important;
          text-align: left !important;
          vertical-align: top !important;
          font-size: 0.875rem !important;
        }

        .prose th {
          background: #f0f9f4 !important;
          color: #15803d !important;
          font-weight: 600 !important;
        }

        @media (max-width: 640px) {
          .prose table {
            display: block !important;
            overflow-x: auto !important;
            white-space: nowrap !important;
            -webkit-overflow-scrolling: touch !important;
            margin: 1rem -1rem !important;
            width: calc(100% + 2rem) !important;
          }
          
          .prose td, .prose th {
            padding: 0.5rem 0.25rem !important;
            font-size: 0.75rem !important;
            min-width: 80px !important;
          }
        }

        /* Landscape mode optimizations for mobile */
        @media (max-width: 896px) and (orientation: landscape) {
          .prose img {
            max-height: 70vh !important;
            width: auto !important;
            max-width: 100% !important;
          }
        }

        /* Dark mode support for better readability */
        @media (prefers-color-scheme: dark) {
          .prose img {
            background: white !important;
            padding: 0.5rem !important;
            border-radius: 0.5rem !important;
          }
        }

        /* Print styles */
        @media print {
          .prose img {
            max-width: 100% !important;
            height: auto !important;
            page-break-inside: avoid !important;
          }
          
          .prose table {
            page-break-inside: avoid !important;
          }
        }
      `}</style>
    </div>
  );
};

export default StrukturOrganisasiJdihPage;