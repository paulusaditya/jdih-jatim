"use client";

import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Mail, Phone, ExternalLink, ChevronDown } from "lucide-react";
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

  // Close sidebar when clicking outside or on escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  // Function to handle menu click and close sidebar
  const handleMenuClick = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Top Bar - Hidden on mobile, visible from sm up */}
      <div className="bg-custom-green text-white text-xs py-2 hidden sm:block">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0">
              <div className="flex items-center space-x-1">
                <Phone size={14} className="flex-shrink-0" />
                <span className="text-xs sm:text-sm whitespace-nowrap">
                  031-3520881 031-3524001 (Psw. 1118)
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail size={14} className="flex-shrink-0" />
                <span className="text-xs sm:text-sm break-all">
                  support@jdih.jatimprov.go.id
                </span>
              </div>
            </div>

            {/* Translation and External Link */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0 flex-shrink-0">
              <div className="flex justify-start">
                <GoogleTranslate />
              </div>
              <a
                href="https://majadigi.jatimprov.go.id"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-green-800 text-white text-xs px-2 py-1.5 rounded space-x-1 hover:bg-green-900 transition-colors w-fit whitespace-nowrap"
              >
                <span className="leading-none">majadigi.jatimprov.go.id</span>
                <ExternalLink size={12} className="flex-shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white py-3 sm:py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo Section */}
            <div className="flex items-center space-x-4 flex-1 min-w-0">
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

            {/* Desktop Navigation - Show earlier and with better breakpoints */}
            <div className="hidden xl:flex flex-shrink-0">
              <NavBar
                isSidebarOpen={false}
                setSidebarOpen={setSidebarOpen}
                navItems={navItems}
              />
            </div>

            {/* Mobile Menu Button - Show later to give more space */}
            <div className="xl:hidden flex-shrink-0">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Open menu"
              >
                <Menu size={24} className="text-green-800" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navItems={navItems}
        onMenuClick={handleMenuClick}
      />
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

    if (path.split("/").length <= 2) {
      return location.pathname === path;
    }

    return (
      location.pathname === path ||
      (location.pathname.startsWith(`${path}/`) &&
        !isOtherTopLevelPath(path, location.pathname))
    );
  };

  const isOtherTopLevelPath = (currentPath, locationPath) => {
    const topLevelPaths = navItems
      .filter((item) => item.link && !isExternalLink(item.link))
      .map((item) => `/${cleanLink(item.link)}`)
      .filter((path) => path !== currentPath);

    return topLevelPaths.some((path) => locationPath.startsWith(path));
  };

  return (
    <div className="flex flex-wrap items-center gap-x-2 2xl:gap-x-7 text-green-800">
      {navItems.map((item, index) => (
        <div key={index} className="relative dropdown-container group">
          {item.sub_menus.length > 0 ? (
            <span
              className={`hover:font-semibold cursor-pointer inline-flex items-center py-2 text-xs xl:text-sm 2xl:text-base transition-colors whitespace-nowrap ${
                isActive(item.link) ? "font-bold text-green-900" : ""
              }`}
            >
              {item.title}
              <ChevronDown
                size={14}
                className="ml-1 transition-transform group-hover:rotate-180"
              />
            </span>
          ) : isExternalLink(item.link) ? (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:font-semibold inline-flex items-center py-2 text-xs xl:text-sm 2xl:text-base transition-colors whitespace-nowrap"
            >
              {item.title}
              <ExternalLink size={12} className="ml-1" />
            </a>
          ) : (
            <Link
              to={`/${cleanLink(item.link)}`}
              className={`hover:font-semibold inline-block py-2 text-xs xl:text-sm 2xl:text-base transition-colors whitespace-nowrap ${
                isActive(item.link) ? "font-bold text-green-900" : ""
              }`}
            >
              {item.title}
            </Link>
          )}

          {item.sub_menus.length > 0 && (
            <div className="absolute left-0 top-full z-50 w-max min-w-[200px] max-w-[300px] hidden group-hover:block">
              <div className="h-2"></div>
              <div className="shadow-xl rounded-lg bg-white border border-gray-200">
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
  );
}

function MobileSidebar({
  isSidebarOpen,
  setSidebarOpen,
  navItems,
  onMenuClick,
}) {
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

    if (path.split("/").length <= 2) {
      return location.pathname === path;
    }

    return (
      location.pathname === path ||
      (location.pathname.startsWith(`${path}/`) &&
        !isOtherTopLevelPath(path, location.pathname))
    );
  };

  const isOtherTopLevelPath = (currentPath, locationPath) => {
    const topLevelPaths = navItems
      .filter((item) => item.link && !isExternalLink(item.link))
      .map((item) => `/${cleanLink(item.link)}`)
      .filter((path) => path !== currentPath);

    return topLevelPaths.some((path) => locationPath.startsWith(path));
  };

  // Handle menu click for external links
  const handleExternalLinkClick = () => {
    // Close sidebar when external link is clicked
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-40 z-40 xl:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-2xl transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 xl:hidden overflow-y-auto max-h-screen will-change-transform`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-green-50">
          <div className="flex items-center space-x-2">
            <img
              className="w-8 h-8"
              src="/assets/nav-logo/logo1.png"
              alt="Logo"
            />
            <span className="text-green-800 font-bold text-lg">Menu</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X size={24} className="text-green-800" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Mobile Contact Info */}
          <div className="sm:hidden mb-4 p-2 bg-green-50 rounded-lg">
            <div className="space-y-1.5 pb-2.5">
              <div className="flex items-start space-x-2">
                <Phone
                  size={12}
                  className="text-green-800 mt-0.5 flex-shrink-0"
                />
                <span className="text-xs text-green-800">
                  031-3520881 031-3524001 (Psw. 1118)
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <Mail
                  size={12}
                  className="text-green-800 mt-0.5 flex-shrink-0"
                />
                <span className="text-xs text-green-800 break-all">
                  support@jdih.jatimprov.go.id
                </span>
              </div>
            </div>
            <div className=" border-t border-green-200">
              <a
                href="https://majadigi.jatimprov.go.id"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-green-800 text-white text-xs px-2.5 py-1.5 rounded space-x-1.5 hover:bg-green-900 transition-colors mt-2"
                onClick={handleExternalLinkClick}
              >
                <span>majadigi.jatimprov.go.id</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="space-y-2">
            {navItems.map((item, index) => (
              <div key={index} className="dropdown-container">
                {item.sub_menus.length > 0 ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(index)}
                      className={`w-full flex items-center justify-between text-left p-3 rounded-lg transition-colors ${
                        isActive(item.link)
                          ? "bg-green-100 text-green-900 font-bold"
                          : "text-green-800 hover:bg-green-50"
                      }`}
                    >
                      <span className="font-medium">{item.title}</span>
                      <ChevronDown
                        size={20}
                        className={`transition-transform ${
                          activeDropdown === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {activeDropdown === index && (
                      <div className="mt-2 ml-4 space-y-1">
                        <DropdownMenu
                          subMenus={item.sub_menus}
                          parentLink={item.link}
                          buildLink={buildLink}
                          currentPath={location.pathname}
                          navItems={navItems}
                          isMobile={true}
                          onMenuClick={onMenuClick}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div>
                    {isExternalLink(item.link) ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                        onClick={handleExternalLinkClick}
                      >
                        <span className="font-medium break-words">
                          {item.title}
                        </span>
                        <ExternalLink
                          size={16}
                          className="flex-shrink-0 ml-2"
                        />
                      </a>
                    ) : (
                      <Link
                        to={`/${cleanLink(item.link)}`}
                        className={`block p-3 rounded-lg transition-colors ${
                          isActive(item.link)
                            ? "bg-green-100 text-green-900 font-bold"
                            : "text-green-800 hover:bg-green-50"
                        }`}
                        onClick={onMenuClick}
                      >
                        <span className="font-medium break-words">
                          {item.title}
                        </span>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
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
  isMobile = false,
  onMenuClick,
}) {
  const isExternalLink = (link) =>
    link.startsWith("http://") || link.startsWith("https://");

  const cleanLink = (link) => (link.startsWith("/") ? link.slice(1) : link);

  const isOtherTopLevelPath = (currentPath, locationPath) => {
    if (!navItems) return false;

    const topLevelPaths = navItems
      .filter((item) => item.link && !isExternalLink(item.link))
      .map((item) => `/${cleanLink(item.link)}`)
      .filter((path) => path !== currentPath);

    return topLevelPaths.some((path) => locationPath.startsWith(path));
  };

  const isSubMenuActive = (fullLink) => {
    if (!fullLink || isExternalLink(fullLink) || !currentPath) return false;

    if (currentPath === fullLink) return true;

    return (
      currentPath.startsWith(`${fullLink}/`) &&
      !isOtherTopLevelPath(fullLink, currentPath)
    );
  };

  const baseClasses = isMobile
    ? "block py-2 px-3 rounded-md transition-colors break-words"
    : "block py-2 px-3 hover:bg-gray-100 rounded-md transition-colors break-words";

  // Handle external link click for submenu
  const handleExternalLinkClick = () => {
    if (isMobile && onMenuClick) {
      onMenuClick();
    }
  };

  return (
    <div
      className={`${isMobile ? "space-y-1" : "bg-white rounded-lg p-2"} w-full`}
    >
      {subMenus.map((subMenu, index) => {
        const fullLink = buildLink(parentLink, subMenu.link);
        const isActive = isSubMenuActive(fullLink);

        return isExternalLink(subMenu.link) ? (
          <a
            key={index}
            href={subMenu.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${baseClasses} text-green-800 ${
              isMobile ? "hover:bg-green-50" : ""
            }`}
            onClick={handleExternalLinkClick}
          >
            <div className="flex items-center justify-between">
              <span>{subMenu.title}</span>
              <ExternalLink size={14} className="flex-shrink-0 ml-2" />
            </div>
          </a>
        ) : (
          <Link
            key={index}
            to={fullLink}
            className={`${baseClasses} ${
              isActive
                ? `${
                    isMobile
                      ? "bg-green-100 text-green-900"
                      : "bg-green-50 text-green-900"
                  } font-semibold`
                : `text-green-800 ${isMobile ? "hover:bg-green-50" : ""}`
            }`}
            onClick={isMobile ? onMenuClick : undefined}
          >
            {subMenu.title}
          </Link>
        );
      })}
    </div>
  );
}
