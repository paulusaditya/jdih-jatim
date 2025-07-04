"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../config/api";
import { DownloadIcon } from "lucide-react";

const StrukturOrganisasiBiroHukumPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}/topics/by-slug/struktur-organisasi-biro-hukum`)
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
      <div className="min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Judul skeleton */}
          <div className="text-center mb-6">
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-1 animate-pulse"></div>
            <div className="h-7 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
          </div>

          {/* Konten utama skeleton */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
              
              {/* Image placeholder */}
              <div className="h-64 bg-gray-200 rounded-lg mx-auto animate-pulse"></div>
              
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              
              {/* Reference text skeleton */}
              <div className="h-3 bg-gray-200 rounded w-4/5 animate-pulse mt-4"></div>
              
              {/* Download button skeleton */}
              <div className="h-10 bg-gray-200 rounded w-40 animate-pulse mt-6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Judul */}
        <h2 className="text-center text-green-700 text-lg font-semibold mb-1">
          STRUKTUR ORGANISASI
        </h2>
        <h1 className="text-center text-green-700 text-xl font-bold mb-6">
          BIRO HUKUM SEKRETARIAT DAERAH PROVINSI JAWA TIMUR
        </h1>

        {/* Konten utama */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md text-gray-800">
          <div
            className="
              prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 
              max-w-none 
              text-gray-800 
              prose-headings:text-green-700 
              prose-headings:font-semibold 
              prose-p:text-gray-700 
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

          {/* Referensi Peraturan */}
          <p className="text-sm mt-4">
            Pasal 4 Peraturan Gubernur Jawa Timur Nomor 26 Tahun 2024 tentang Kedudukan, Susunan Organisasi, Uraian
            Tugas dan Fungsi serta Tata Kerja Sekretariat Daerah
          </p>

          {/* Tombol Download */}
          <div className="mt-6 flex justify-start">
            
            <a
              href="https://drive.google.com/file/d/1Q831zkmg92BFtJ53t_BdwdsEaud2R74F/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white border border-green-700 text-green-700 hover:bg-green-50 px-4 py-2 rounded-md transition-colors duration-200 text-sm"
            >
              <DownloadIcon className="w-4 h-4" /> Download Dokumen
            </a>
          </div>
        </div>
      </div>

      {/* Style khusus agar gambar & tabel responsif dan center */}
      <style jsx global>{`
        .prose img {
          display: block !important;
          margin-left: auto !important;
          margin-right: auto !important;
          max-width: 100% !important;
          height: auto !important;
          object-fit: contain !important;
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

        @media (max-width: 640px) {
          .prose table {
            display: block !important;
            overflow-x: auto !important;
            white-space: nowrap !important;
            -webkit-overflow-scrolling: touch !important;
          }

          .prose pre {
            overflow-x: auto !important;
            font-size: 0.75rem !important;
          }

          .prose blockquote {
            margin: 1rem 0 !important;
            padding: 0.5rem 1rem !important;
          }
        }

        @media (max-width: 480px) {
          .prose {
            font-size: 0.875rem !important;
            line-height: 1.5 !important;
          }

          .prose h1 {
            font-size: 1.5rem !important;
            margin-bottom: 1rem !important;
          }

          .prose h2 {
            font-size: 1.25rem !important;
            margin: 1.5rem 0 0.75rem !important;
          }

          .prose h3 {
            font-size: 1.125rem !important;
            margin: 1.25rem 0 0.5rem !important;
          }

          .prose p,
          .prose ul,
          .prose ol {
            margin-bottom: 0.75rem !important;
          }

          .prose li {
            margin-bottom: 0.25rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default StrukturOrganisasiBiroHukumPage;