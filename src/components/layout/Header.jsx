import * as React from "react";
import { Link } from "react-router-dom";
import { Menu, X, Mail, Phone } from "lucide-react";
import axios from "axios";

export default function Header() {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const [navItems, setNavItems] = React.useState([]);

  React.useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get(
          "https://jdih.pisdev.my.id/api/v2/menus"
        );
        setNavItems(response.data);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-600 text-white text-xs py-2 hidden sm:block">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone size={14} />
              <span>031-3520881 031-3524001 (Psw. 1118)</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail size={14} />
              <span>support@jdih.jatimprov.go.id</span>
            </div>
          </div>
          <a
            className="bg-blue-800 px-2 py-1 rounded text-xs"
            href="https://majadigi.jatimprov.go.id"
            target="_blank"
            rel="noopener noreferrer"
          >
            majadigi.jatimprov.go.id
          </a>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <img
              className="w-auto h-8 sm:h-10"
              src="/assets/nav-logo/logo1.png"
              alt="Logo 1"
            />
            <img
              className="w-auto h-8 sm:h-10"
              src="/assets/nav-logo/logo2.png"
              alt="Logo 2"
            />
            <img
              className="w-auto h-8 sm:h-10"
              src="/assets/nav-logo/logo3.png"
              alt="Logo 3"
            />
            <div>
              <div className="text-blue-900 text-[10px] sm:text-xs">
                Jaringan Dokumentasi dan Informasi Hukum
              </div>
              <div className="text-blue-900 font-bold text-base sm:text-lg md:text-2xl font-jakarta">
                PROVINSI JAWA TIMUR
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu size={28} className="text-blue-800" />
            </button>
          </div>
          <NavBar
            isSidebarOpen={isSidebarOpen}
            setSidebarOpen={setSidebarOpen}
            navItems={navItems}
          />
        </div>
      </div>
    </>
  );
}

function NavBar({ isSidebarOpen, setSidebarOpen, navItems }) {
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

  const cleanLink = (link) => (link.startsWith("/") ? link.slice(1) : link);

  const buildLink = (parentLink, subLink) => {
    const cleanParent = cleanLink(parentLink);
    const cleanSubLink = cleanLink(subLink);
    return cleanParent ? `/${cleanParent}/${cleanSubLink}` : `/${cleanSubLink}`;
  };

  const isExternalLink = (link) =>
    link.startsWith("http://") || link.startsWith("https://");

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:flex space-x-10 text-blue-800">
        {navItems.map((item, index) => (
          <div key={index} className="relative dropdown-container">
            {item.sub_menus.length > 0 ? (
              <span
                onClick={() => toggleDropdown(index)}
                className="hover:font-semibold cursor-pointer"
              >
                {item.title}
              </span>
            ) : isExternalLink(item.link) ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:font-semibold"
              >
                {item.title}
              </a>
            ) : (
              <Link
                to={`/${cleanLink(item.link)}`}
                className="hover:font-semibold"
              >
                {item.title}
              </Link>
            )}
            {item.sub_menus.length > 0 && activeDropdown === index && (
              <div className="absolute left-0 top-full mt-1 z-50 w-max min-w-[250px] shadow-lg rounded-md bg-white">
                <DropdownMenu
                  subMenus={item.sub_menus}
                  parentLink={item.link}
                  buildLink={buildLink}
                />
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
        } transition-transform duration-300 ease-in-out z-50 p-4 overflow-y-auto md:hidden`}
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
              {item.sub_menus.length > 0 ? (
                <>
                  <span
                    onClick={() => toggleDropdown(index)}
                    className="block text-blue-800 cursor-pointer font-semibold"
                  >
                    {item.title}
                  </span>
                  {activeDropdown === index && (
                    <div className="mt-2 ml-4">
                      <DropdownMenu
                        subMenus={item.sub_menus}
                        parentLink={item.link}
                        buildLink={buildLink}
                      />
                    </div>
                  )}
                </>
              ) : isExternalLink(item.link) ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-800"
                >
                  {item.title}
                </a>
              ) : (
                <Link
                  to={`/${cleanLink(item.link)}`}
                  className="block text-blue-800"
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function DropdownMenu({ subMenus, parentLink, buildLink }) {
  const isExternalLink = (link) =>
    link.startsWith("http://") || link.startsWith("https://");

  return (
    <div className="bg-white rounded-lg p-2 w-full">
      {subMenus.map((subMenu, index) => {
        const fullLink = buildLink(parentLink, subMenu.link);
        return isExternalLink(subMenu.link) ? (
          <a
            key={index}
            href={subMenu.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-800 py-2 px-3 hover:bg-gray-100 rounded whitespace-nowrap"
          >
            {subMenu.title}
          </a>
        ) : (
          <Link
            key={index}
            to={fullLink}
            className="block text-blue-800 py-2 px-3 hover:bg-gray-100 rounded whitespace-nowrap"
          >
            {subMenu.title}
          </Link>
        );
      })}
    </div>
  );
}
