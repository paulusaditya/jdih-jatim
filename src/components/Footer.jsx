import { Twitter, Instagram, Youtube } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-80">
      {/* Main Footer */}
      <div className="relative">
        <div className="absolute inset-x-0 -top-60 flex justify-center">
          <img src="./src/assets/Group 380.png" alt="" />
        </div>
      </div>
      <div className="bg-blue-950 text-white py-15 px-4 md:px-8 pt-65">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Column 1: Logo and Title */}
            <div>
              <div className="flex items-center space-x-2">
                <img
                  src="./src/assets/nav-logo/logo1.png"
                  alt="JDIH Logo"
                  className="w-12 h-12 object-contain"
                />
                <img
                  src="./src/assets/nav-logo/logo2.png"
                  alt="East Java Logo"
                  className="w-12 h-12 object-contain"
                />
              </div>

              <p className="text-sm mb-2">
                Jaringan Dokumentasi dan Informasi Hukum
              </p>
              <h3 className="text-xl font-bold">PROVINSI JAWA TIMUR</h3>
            </div>

            {/* Column 2: Office Address */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Kantor Biro Hukum Jawa Timur
              </h3>
              <p className="text-sm mb-4">
                Jl. Pahlawan No.110, Alun-alun Contong, Bubutan, Surabaya 60174,
                Jawa Timur – Indonesia.
              </p>
            </div>

            {/* Column 3: Customer Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
              <p className="text-sm mb-2">
                031-3520881 031-3524001 (Psw. 1118)
              </p>
              <p className="text-sm">support@jdih.jatimprov.go.id</p>
            </div>

            {/* Column 4: Social Media */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Media Sosial</h3>
              <div className="flex space-x-4 gap-4">
                <a
                  href="https://www.tiktok.com/@jdihjatim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-300"
                >
                  <SiTiktok size={24} />
                </a>
                <a
                  href="https://twitter.com/jdihjatim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-300"
                >
                  <Twitter size={24} />
                </a>
                <a
                  href="https://www.instagram.com/jdihjatim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-300"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://www.youtube.com/jdihjatim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-300"
                >
                  <Youtube size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Sitemap and Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 border-t border-blue-900 pt-8">
            {/* Sitemap */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Sitemap</h3>
              <ul className="grid grid-cols-2 gap-2">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/profil">Profil</Link>
                </li>
                <li>
                  <Link href="/produk-hukum">Produk Hukum</Link>
                </li>
                <li>
                  <Link href="/dokumen-hukum-lainnya">
                    Dokumen Hukum Lainnya
                  </Link>
                </li>
                <li>
                  <Link href="/berita">Berita</Link>
                </li>
                <li>
                  <Link href="/survey">Survey</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Analytics</h3>
              <ul className="space-y-2">
                <li className="text-sm">Pengunjung Hari Ini : 689</li>
                <li className="text-sm">Pengunjung Minggu Lalu : 19009</li>
                <li className="text-sm">Pengunjung Bulan Lalu : 83992</li>
                <li className="text-sm">Total Pengunjung : 120000392</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}