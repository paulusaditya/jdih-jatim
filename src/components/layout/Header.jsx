"use client";

import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Mail, Phone, ExternalLink } from "lucide-react";
import axios from "axios";
import GoogleTranslate from "../Home/Translate";
import baseUrl from "../../config/api";

export default function Header() {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const [navItems, setNavItems] = React.useState([]);

  React.useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/menus`);
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
      <div className="bg-custom-green text-white text-xs py-2 hidden sm:block">
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

          <div className="flex items-center space-x-3">
            <GoogleTranslate />
            <a
              href="https://majadigi.jatimprov.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-green-800 text-white text-xs px-2 py-2.5 rounded space-x-1"
            >
              <span className="leading-none">majadigi.jatimprov.go.id</span>
              <ExternalLink size={12} className="mt-[1px]" />
            </a>
          </div>
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
              width={32}
              height={32}
            />
            <img
              className="w-auto h-8 sm:h-10"
              src="/assets/nav-logo/logo2.png"
              alt="Logo 2"
              width={32}
              height={32}
            />
            <img
              className="w-auto h-8 sm:h-10"
              src="/assets/nav-logo/logo3.png"
              alt="Logo 3"
              width={32}
              height={32}
            />
            <div>
              <div className="text-green-800 text-[10px] sm:text-xs">
                Jaringan Dokumentasi dan Informasi Hukum
              </div>
              <div className="text-green-800 font-bold text-base sm:text-lg md:text-2xl font-jakarta">
                PROVINSI JAWA TIMUR
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu size={28} className="text-green-800" />
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
  const location = useLocation();

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const cleanLink = (link) => (link.startsWith("/") ? link.slice(1) : link);

  const buildLink = (parentLink, subLink) => {
    const cleanParent = cleanLink(parentLink);
    const cleanSubLink = cleanLink(subLink);
    return cleanParent ? `/${cleanParent}/${cleanSubLink}` : `/${cleanSubLink}`;
  };

  const isExternalLink = (link) =>
    link.startsWith("http://") || link.startsWith("https://");

  const isActive = (link) => {
    if (!link || isExternalLink(link)) return false;
    const path = `/${cleanLink(link)}`;

    // Exact match for top-level paths
    if (path.split("/").length <= 2) {
      return location.pathname === path;
    }

    // For deeper paths, check if it starts with the path
    return (
      location.pathname === path ||
      (location.pathname.startsWith(`${path}/`) &&
        !isOtherTopLevelPath(path, location.pathname))
    );
  };

  const isOtherTopLevelPath = (currentPath, locationPath) => {
    // Get all top-level paths from navItems
    const topLevelPaths = navItems
      .filter((item) => item.link && !isExternalLink(item.link))
      .map((item) => `/${cleanLink(item.link)}`)
      .filter((path) => path !== currentPath);

    // Check if the location path starts with any other top-level path
    return topLevelPaths.some((path) => locationPath.startsWith(path));
  };

  return (
    <>
      <div className="hidden md:flex space-x-10 text-green-800">
        {navItems.map((item, index) => (
          <div key={index} className="relative dropdown-container group">
            {item.sub_menus.length > 0 ? (
              <span
                className={`hover:font-semibold cursor-pointer inline-block py-2 ${
                  isActive(item.link) ? "font-bold" : ""
                }`}
              >
                {item.title}
              </span>
            ) : isExternalLink(item.link) ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:font-semibold inline-block py-2"
              >
                {item.title}
              </a>
            ) : (
              <Link
                to={`/${cleanLink(item.link)}`}
                className={`hover:font-semibold inline-block py-2 ${
                  isActive(item.link) ? "font-bold" : ""
                }`}
              >
                {item.title}
              </Link>
            )}

            {item.sub_menus.length > 0 && (
              <div className="absolute left-0 top-full z-50 w-max min-w-[250px] hidden group-hover:block">
                <div className="h-3"></div>
                <div className="shadow-lg rounded-md bg-white">
                  <DropdownMenu
                    subMenus={item.sub_menus}
                    parentLink={item.link}
                    buildLink={buildLink}
                    currentPath={location.pathname}
                    navItems={navItems}
                  />
                </div>
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
        className={`fixed inset-y-0 left-0 w-85 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 p-4 overflow-y-auto md:hidden`}
      >
        <div className="flex justify-between border-b pb-2">
          <span className="text-green-800 font-bold text-lg">Menu</span>
          <button onClick={() => setSidebarOpen(false)}>
            <X size={24} className="text-green-800" />
          </button>
        </div>
        <div className="flex flex-col space-y-4 mt-4">
          {navItems.map((item, index) => (
            <div key={index} className="dropdown-container">
              {item.sub_menus.length > 0 ? (
                <>
                  <span
                    onClick={() => toggleDropdown(index)}
                    className={`block text-green-800 cursor-pointer ${
                      isActive(item.link) ? "font-bold" : "font-semibold"
                    }`}
                  >
                    {item.title}
                  </span>
                  {activeDropdown === index && (
                    <div className="mt-2 ml-4">
                      <DropdownMenu
                        subMenus={item.sub_menus}
                        parentLink={item.link}
                        buildLink={buildLink}
                        currentPath={location.pathname}
                        navItems={navItems}
                      />
                    </div>
                  )}
                </>
              ) : isExternalLink(item.link) ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-green-800 break-words"
                >
                  {item.title}
                </a>
              ) : (
                <Link
                  to={`/${cleanLink(item.link)}`}
                  className={`block text-green-800 break-words ${
                    isActive(item.link) ? "font-bold" : ""
                  }`}
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

function DropdownMenu({
  subMenus,
  parentLink,
  buildLink,
  currentPath,
  navItems,
}) {
  const isExternalLink = (link) =>
    link.startsWith("http://") || link.startsWith("https://");

  const cleanLink = (link) => (link.startsWith("/") ? link.slice(1) : link);

  const isOtherTopLevelPath = (currentPath, locationPath) => {
    if (!navItems) return false;

    // Get all top-level paths from navItems
    const topLevelPaths = navItems
      .filter((item) => item.link && !isExternalLink(item.link))
      .map((item) => `/${cleanLink(item.link)}`)
      .filter((path) => path !== currentPath);

    // Check if the location path starts with any other top-level path
    return topLevelPaths.some((path) => locationPath.startsWith(path));
  };

  const isSubMenuActive = (fullLink) => {
    if (!fullLink || isExternalLink(fullLink) || !currentPath) return false;

    // Exact match
    if (currentPath === fullLink) return true;

    // Check if it's a child path but not part of another top-level path
    return (
      currentPath.startsWith(`${fullLink}/`) &&
      !isOtherTopLevelPath(fullLink, currentPath)
    );
  };

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
            className="block text-green-800 py-2 px-3 hover:bg-gray-100 rounded break-words"
          >
            {subMenu.title}
          </a>
        ) : (
          <Link
            key={index}
            to={fullLink}
            className={`block text-green-800 py-2 px-3 hover:bg-gray-100 rounded break-words ${
              isSubMenuActive(fullLink) ? "font-bold" : ""
            }`}
          >
            {subMenu.title}
          </Link>
        );
      })}
    </div>
  );
}
