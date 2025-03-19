import * as React from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-600 text-white text-sm py-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <ContactInfo
              icon="fas fa-phone-alt"
              text="031-3520881 031-3524001 (Psw. 1118)"
            />
            <ContactInfo
              icon="fas fa-envelope"
              text="support@jdih.jatimprov.go.id"
            />
          </div>
          <a
            className="bg-blue-800 px-2 py-1 rounded"
            href="mailto:majadigi.jatimprov.go.id"
          >
            majadigi.jatimprov.go.id
          </a>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white py-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Logo src="/assets/nav-logo/logo1.png" alt="Logo 1" />
            <Logo src="/assets/nav-logo/logo2.png" alt="Logo 2" />
            <Logo src="/assets/nav-logo/logo3.png" alt="Logo 3" />
            <div>
              <div className="text-blue-900 sm">
                Jaringan Dokumentasi dan Informasi Hukum
              </div>
              <div className="text-blue-900 font-bold text-3xl font-jakarta">
                PROVINSI JAWA TIMUR
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu size={32} className="text-blue-800" />
            </button>
          </div>
          <NavBar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
      </div>
    </>
  );
}

function ContactInfo({ icon, text }) {
  return (
    <div className="flex items-center space-x-1">
      <i className={icon}></i>
      <span>{text}</span>
    </div>
  );
}

function Logo({ src, alt }) {
  return <img className="w-auto h-12 max-w-none max-h-none" src={src} alt={alt} />;
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
      <div className="hidden md:flex space-x-10 text-blue-800 relative">
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
              <Link to={item.path} className="hover:font-semibold">
                {item.label}
              </Link>
            )}
            {item.dropdown && activeDropdown === index && (
              item.label === "Dokumentasi Hukum Lainnya" ? <DocumentationDropdown /> :
              item.label === "Profil" ? <ProfileDropdown /> : <DropdownMenu />
            )}
          </div>
        ))}
      </div>
      
      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50" onClick={() => setSidebarOpen(false)}></div>
      )}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 p-4`}
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
                    item.label === "Dokumentasi Hukum Lainnya" ? <DocumentationDropdown /> :
                    item.label === "Profil" ? <ProfileDropdown /> : <DropdownMenu />
                  )}
                </>
              ) : (
                <Link to={item.path} className="block text-blue-800">
                  {item.label}</Link>
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
    <div className="ml-4 mt-2 bg-gray-100 rounded-lg p-2">
      {dropdownItems.map((item, index) => (
        <Link key={index} to={item.path} className="block text-blue-800 py-1 px-2 hover:bg-gray-200 rounded">
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
    { label: "Dokumen Kerja Sama Jawa Timur", path: "/dokumentasi/dokumen-kerja-sama" },
    { label: "Surat Edaran", path: "/dokumentasi/surat-edaran" },
    { label: "Rancangan Peraturan Daerah", path: "/dokumentasi/rancangan-peraturan-daerah" },
  ];

  return (
    <div className="ml-4 mt-2 bg-gray-100 rounded-lg p-2">
      {documentationItems.map((item, index) => (
        <Link key={index} to={item.path} className="block text-blue-800 py-1 px-2 hover:bg-gray-200 rounded">
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
    { label: "Struktur Organisasi JDIH Provinsi Jawa Timur", path: "/profil/struktur-organisasi" },
    { label: "Struktur Organisasi Tim Pengolaan JDIH Provinsi Jawa Timur", path: "/profil/struktur-tim" },
  ];

  return (
    <div className="ml-4 mt-2 bg-gray-100 rounded-lg p-2">
      {profileItems.map((item, index) => (
        <Link key={index} to={item.path} className="block text-blue-800 py-1 px-2 hover:bg-gray-200 rounded">
          {item.label}
        </Link>
      ))}
    </div>
  );
}