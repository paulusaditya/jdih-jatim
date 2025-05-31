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

      <div className="bg-blue-950 text-white py-15 px-4 md:px-8 md:pt-60 pt-20">
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
                  className="hover:text-blue-300"
                >
                  <FaFacebook size={24} />
                </a>
                <button
                  className="text-white hover:text-blue-300"
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
                  className="hover:text-blue-300"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCqVqELJZYASq8_1RckTKCnw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-300"
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

          <div className="border-t border-blue-900 pt-6">
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
