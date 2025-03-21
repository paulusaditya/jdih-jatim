"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Mail, Phone } from "lucide-react";

export default function Header() {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-600 text-white text-sm py-2">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone size={16} />
              <span>031-3520881 031-3524001 (Psw. 1118)</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail size={16} />
              <span>support@jdih.jatimprov.go.id</span>
            </div>
          </div>
          <a
            className="bg-blue-800 px-2 py-1 rounded"
            href="https://majadigi.jatimprov.go.id"
            target="_blank"
            rel="noopener noreferrer"
          >
            majadigi.jatimprov.go.id
          </a>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white py-6">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <img
              className="w-auto h-12"
              src="/assets/nav-logo/logo1.png"
              alt="Logo 1"
            />
            <img
              className="w-auto h-12"
              src="/assets/nav-logo/logo2.png"
              alt="Logo 2"
            />
            <img
              className="w-auto h-12"
              src="/assets/nav-logo/logo3.png"
              alt="Logo 3"
            />
            <div>
              <div className="text-blue-900 text-sm">
                Jaringan Dokumentasi dan Informasi Hukum
              </div>
              <div className="text-blue-900 font-bold text-xl md:text-3xl font-jakarta">
                PROVINSI JAWA TIMUR
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu size={32} className="text-blue-800" />
            </button>
          </div>
          <NavBar
            isSidebarOpen={isSidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>
      </div>
    </>
  );
}

function NavBar({ isSidebarOpen, setSidebarOpen }) {
  const [activeDropdown, setActiveDropdown] = React.useState(null);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const closeDropdown = (e) => {
    if (!e.target.closest(".dropdown-container")) {
      setActiveDropdown(null);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  const navItems = [
    { label: "Beranda", path: "/" },
    { label: "Profil", path: "#", dropdown: true },
    { label: "Produk Hukum", path: "#", dropdown: true },
    { label: "Dokumentasi Hukum Lainnya", path: "#", dropdown: true },
    { label: "Berita", path: "/berita" },
    { label: "Survey", path: "/survey" },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:flex space-x-10 text-blue-800">
        {navItems.map((item, index) => (
          <div key={index} className="relative dropdown-container">
            {item.dropdown ? (
              <span
                onClick={() => toggleDropdown(index)}
                className="hover:font-semibold cursor-pointer"
              >
                {item.label}
              </span>
            ) : (
              <Link href={item.path} className="hover:font-semibold">
                {item.label}
              </Link>
            )}
            {item.dropdown && activeDropdown === index && (
              <div className="absolute left-0 top-full mt-1 z-50 w-max min-w-[250px] shadow-lg rounded-md bg-white">
                {item.label === "Dokumentasi Hukum Lainnya" ? (
                  <DocumentationDropdown />
                ) : item.label === "Profil" ? (
                  <ProfileDropdown />
                ) : (
                  <DropdownMenu />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 p-4 overflow-y-auto`}
      >
        <div className="flex justify-between border-b pb-2">
          <span className="text-blue-900 font-bold text-lg">Menu</span>
          <button onClick={() => setSidebarOpen(false)}>
            <X size={24} className="text-blue-800" />
          </button>
        </div>
        <div className="flex flex-col space-y-4 mt-4">
          {navItems.map((item, index) => (
            <div key={index} className="dropdown-container">
              {item.dropdown ? (
                <>
                  <span
                    onClick={() => toggleDropdown(index)}
                    className="block text-blue-800 cursor-pointer font-semibold"
                  >
                    {item.label}
                  </span>
                  {activeDropdown === index && (
                    <div className="mt-2 ml-4">
                      {item.label === "Dokumentasi Hukum Lainnya" ? (
                        <DocumentationDropdown />
                      ) : item.label === "Profil" ? (
                        <ProfileDropdown />
                      ) : (
                        <DropdownMenu />
                      )}
                    </div>
                  )}
                </>
              ) : (
                <Link href={item.path} className="block text-blue-800">
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function DropdownMenu() {
  const dropdownItems = [
    {
      label: "Produk Hukum Provinsi Jawa Timur",
      path: "/produk-hukum/provinsijatim",
    },
    {
      label: "Produk Hukum Kabupaten / Kota",
      path: "/produk-hukum/kabupaten-kota",
    },
    { label: "Produk Hukum Desa", path: "/produk-hukum/desa" },
    { label: "Peraturan Alih Bahasa", path: "/produk-hukum/alih-bahasa" },
  ];

  return (
    <div className="bg-white rounded-lg p-2 w-full">
      {dropdownItems.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          className="block text-blue-800 py-2 px-3 hover:bg-gray-100 rounded whitespace-nowrap"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

function DocumentationDropdown() {
  const documentationItems = [
    { label: "Staatsblad", path: "/dokumentasi/staatsblad" },
    { label: "Monografi", path: "/dokumentasi/monografi" },
    { label: "Artikel", path: "/dokumentasi/artikel" },
    { label: "Propemperda", path: "/dokumentasi/propemperda" },
    { label: "Putusan Pengadilan", path: "/dokumentasi/putusan-pengadilan" },
    { label: "Dokumen Langka", path: "/dokumentasi/dokumen-langka" },
    {
      label: "Dokumen Kerja Sama Jawa Timur",
      path: "/dokumentasi/dokumen-kerja-sama",
    },
    { label: "Surat Edaran", path: "/dokumentasi/surat-edaran" },
    {
      label: "Rancangan Peraturan Daerah",
      path: "/dokumentasi/rancangan-peraturan-daerah",
    },
  ];

  return (
    <div className="bg-white rounded-lg p-2 w-full">
      {documentationItems.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          className="block text-blue-800 py-2 px-3 hover:bg-gray-100 rounded whitespace-nowrap"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

function ProfileDropdown() {
  const profileItems = [
    { label: "Tentang Kami", path: "/profil/tentang-kami" },
    { label: "Kontak", path: "/profil/kontak" },
    {
      label: "Struktur Organisasi JDIH Provinsi Jawa Timur",
      path: "/profil/struktur-organisasi",
    },
    {
      label: "Struktur Organisasi Tim Pengolaan JDIH Provinsi Jawa Timur",
      path: "/profil/struktur-tim",
    },
  ];

  return (
    <div className="bg-white rounded-lg p-2 w-full">
      {profileItems.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          className="block text-blue-800 py-2 px-3 hover:bg-gray-100 rounded whitespace-nowrap"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
