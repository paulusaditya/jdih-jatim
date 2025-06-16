"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { DownloadIcon } from "lucide-react";
import baseUrl from "../../config/api";

const LogoJdihPage = () => {
  const [logoData, setLogoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}/topics/by-slug/logo-jdih`)
      .then((res) => {
        const { data } = res.data;
        setLogoData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Gagal memuat data.");
        setLoading(false);
      });
  }, []);

  const formatContent = (htmlContent) => {
    if (!htmlContent.includes("FILOSOFI LOGO:")) {
      return `<h2 class="font-bold mb-4">FILOSOFI LOGO:</h2>${htmlContent}`;
    }
    return htmlContent;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-8 py-12">
          <div className="bg-red-50 p-4 rounded-lg text-red-700 text-center">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        {/* Header */}
        <div className="flex flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-green-700">Logo JDIH</h1>
          <a
            href="https://drive.google.com/file/d/1Q831zkmg92BFtJ53t_BdwdsEaud2R74F/view"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 border border-green-700 text-green-700 rounded-md hover:bg-green-50 transition"
          >
            <DownloadIcon className="h-4 w-4 mr-2" />
            Download Dokumen
          </a>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Logo Image */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-start">
            <img
              src={logoData?.image || "/assets/nav-logo/logo3.png"}
              alt="Logo JDIH"
              className="h-80 object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/nav-logo/logo3.png";
              }}
            />
          </div>

          {/* Description */}
          <div className="w-full md:w-3/3 bg-gray-100 rounded-xl p-10 shadow-md">
            <div
              className="prose prose-sm max-w-none text-gray-800 text-justify"
              dangerouslySetInnerHTML={{
                __html: formatContent(logoData?.details_id || ""),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoJdihPage;
