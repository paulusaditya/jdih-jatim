import * as React from "react";
import { Link } from "react-router-dom";

export default function Header() {
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
      <div className="bg-white py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Logo src="./src/assets/nav-logo/logo1.png" alt="Logo 1" />
            <Logo src="./src/assets/nav-logo/logo2.png" alt="Logo 2" />
            <Logo src="./src/assets/nav-logo/logo3.png" alt="Logo 3" />
            <div>
              <div className="text-blue-900 sm">
                Jaringan Dokumentasi dan Informasi Hukum
              </div>
              <div className="text-blue-900 font-bold text-3xl font-jakarta">
                PROVINSI JAWA TIMUR
              </div>
            </div>
          </div>
          <NavBar />
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
  return <img className="h-12" src={src} alt={alt} width={50} height={50} />;
}

function NavBar() {
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
    { label: "Profil", path: "/profil" },
    { label: "Produk Hukum", path: "#", dropdown: true },
    { label: "Dokumentasi Hukum Lainnya", path: "/dokumentasi" },
    { label: "Berita", path: "/berita" },
    { label: "Survey", path: "/survey" },
  ];

  return (
    <div className="flex space-x-10 text-blue-800 relative">
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
          {item.dropdown && activeDropdown === index && <DropdownMenu />}
        </div>
      ))}
    </div>
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
    <div className="absolute left-0 mt-2 bg-blue-50 shadow-lg rounded-xl w-[301px] max-md:w-full max-md:max-w-[301px] max-sm:px-0 max-sm:py-1 max-sm:w-full">
      {dropdownItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`block gap-3 px-3 py-2 text-base leading-6 text-sky-900 max-sm:px-2.5 max-sm:py-1.5 max-sm:text-sm hover:bg-gray-100 ${
            item.path === "#" ? "pointer-events-none" : ""
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
