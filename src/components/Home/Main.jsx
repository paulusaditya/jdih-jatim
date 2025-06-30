"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import baseUrl from "../../config/api";
import SearchComponent from "./FloatingSearchComponent";

export default function Main() {
  const [banners, setBanners] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch(`${baseUrl}/home/banners`)
      .then((res) => res.json())
      .then((data) => {
        setBanners(data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching banners:", error);
      });
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [banners]);

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % banners.length);
  };

  const handleBannerClick = (link) => {
    if (link) {
      window.open(link, "_blank");
    }
  };

  return (
    <div
      className="w-full relative overflow-visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full flex justify-center">
        <AnimatePresence mode="wait">
          {banners.length > 0 && (
            <motion.div
              key={banners[activeIndex].id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full h-auto"
            >
              <img
                src={banners[activeIndex].image}
                alt={banners[activeIndex].title}
                className="w-full h-auto object-contain cursor-pointer"
                onClick={() => handleBannerClick(banners[activeIndex].link)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Arrow navigation */}
      {isHovered && banners.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Indicators */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === activeIndex ? "bg-white" : "bg-white/50"
            } transition-all duration-300`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {/* Floating SearchComponent */}
      <div className="absolute top-32 md:top-100 left-1/2 transform -translate-x-1/2 z-50">
        <SearchComponent />
      </div>
    </div>
  );
}
