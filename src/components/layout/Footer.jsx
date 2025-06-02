"use client";

import { useEffect, useState } from "react";
import { Instagram, Youtube } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import baseUrl from "../../config/api";
import PlaystoreBanner from "../common/PlaystoreBanner";

export default function Footer() {
  const [visitorStats, setVisitorStats] = useState({
    yesterday: 0,
    today: 0,
    this_month: 0,
    this_year: 0,
    total: 0,
  });

  useEffect(() => {
    fetch(`${baseUrl}/analytics/visitors`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setVisitorStats(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching visitor analytics:", error);
      });
  }, []);

  const shareToSocialMedia = (platform) => {
    const urls = {
      x: "https://twitter.com/jdihjatimprov",
    };
    if (urls[platform]) {
      window.open(urls[platform], "_blank");
    }
  };

  return (
    <footer className="md:pt-80 pt-40">
      <div className="relative">
        <div className="absolute inset-x-0 top-[-10.75rem] md:top-[-12rem] flex justify-center px-6 md:px-20">
          <div className="w-full">
            <PlaystoreBanner />
          </div>
        </div>
      </div>

      <div className="bg-green-800 text-white py-15 px-4 md:px-8 md:pt-60 pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <img
                  src="/assets/nav-logo/logo1.png"
                  alt="JDIH Logo"
                  className="w-12 h-12 object-contain"
                />
                <img
                  src="/assets/nav-logo/logo2.png"
                  alt="East Java Logo"
                  className="w-12 h-12 object-contain"
                />
                <img
                  src="/assets/nav-logo/logo3.png"
                  alt="East Java Logo"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <p className="text-sm mb-2">
                Jaringan Dokumentasi dan Informasi Hukum
              </p>
              <h3 className="text-xl font-bold">PROVINSI JAWA TIMUR</h3>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Kantor Biro Hukum Jawa Timur
              </h3>
              <p className="text-sm mb-4">
                Jl. Pahlawan No.110, Alun-alun Contong, Bubutan, Surabaya 60174,
                Jawa Timur – Indonesia.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
              <p className="text-sm mb-2">
                031-3520881 031-3524001 (Psw. 1118)
              </p>
              <p className="text-sm">support@jdih.jatimprov.go.id</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Media Sosial</h3>
              <div className="flex space-x-4 gap-4">
                <a
                  href="https://www.facebook.com/JDIH-Jatimprov-607856333021401/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-300"
                >
                  <FaFacebook size={24} />
                </a>
                <button
                  className="text-white hover:text-green-300 cursor-pointer"
                  onClick={() => shareToSocialMedia("x")}
                  aria-label="Share to X"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M18.365 2h3.067l-7.486 8.533 8.801 11.467h-6.921l-5.417-7.114-6.2 7.114H.143l8.229-9.45L.143 2h7.067l4.857 6.6L18.365 2z" />
                  </svg>
                </button>
                <a
                  href="https://www.instagram.com/jdihjatim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-300"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://www.tiktok.com/@jdihjatim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCqVqELJZYASq8_1RckTKCnw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-300"
                >
                  <Youtube size={25} />
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <div></div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Sitemap</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/site-pages/about">Profil</Link>
                </li>
                <li>
                  <Link to="/peraturan">Produk Hukum</Link>
                </li>
                <li>
                  <Link to="/site-pages/staatsblad">Dokumen Hukum Lainnya</Link>
                </li>
                <li>
                  <Link to="/news">Berita</Link>
                </li>
                <li>
                  <Link to="https://sukma.jatimprov.go.id/fe/survey">
                    Survey
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Analytics</h3>
              <ul className="space-y-2">
                <li className="text-sm">
                  Pengunjung Kemarin : {visitorStats.yesterday}
                </li>
                <li className="text-sm">
                  Pengunjung Hari Ini : {visitorStats.today}
                </li>
                <li className="text-sm">
                  Pengunjung Bulan Ini : {visitorStats.this_month}
                </li>
                <li className="text-sm">
                  Pengunjung Tahun Ini : {visitorStats.this_year}
                </li>
                <li className="text-sm">
                  Total Pengunjung : {visitorStats.total}
                </li>
              </ul>
            </div>
          </div>
          {/* Copyright */}
          <div className="border-t border-green-900 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm">
                © 2025 Provinsi Jawa Timur. All Rights Reserved.
              </p>
              <p className="text-sm">
                Biro Hukum Sekretariat Daerah Jawa Timur · JDIH Jatim
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}