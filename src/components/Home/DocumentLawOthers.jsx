"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LegalDocumentsSection() {
  const [showAll, setShowAll] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time since this component uses static data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const initialDocuments = [
    {
      title: "Monografi",
      description:
        "Monografi hukum JDIH Jatim: referensi mendalam tentang peraturan dan kebijakan.",
      url: "/site-pages/monografi",
    },
    {
      title: "Staatsblad",
      description:
        "JDIH Jatim menyediakan Staatsblad sebagai referensi hukum bersejarah.",
      url: "/site-pages/staatsblad",
    },
    {
      title: "Propemperda",
      description:
        "JDIH Jatim mendukung konsultasi Propemperda untuk penyusunan regulasi daerah.",
      url: "/site-pages/propemperda",
    },
    {
      title: "Artikel Hukum",
      description:
        "Baca artikel hukum terkini di JDIH Jatim untuk wawasan regulasi.",
      url: "/site-pages/artikel-hukum",
    },
  ];

  const additionalDocuments = [
    {
      title: "Putusan Pengadilan",
      description: "Dokumen Putusan Pengadilan yang ada di Jawa Timur.",
      url: "/site-pages/putusan-pengadilan",
    },
    {
      title: "Dokumen Langka",
      description: "Beberapa Dokumen Langka Jawa Timur ada disini.",
      url: "/site-pages/dokumen-langka",
    },
    {
      title: "Kerja Sama Daerah",
      description: "Kerja sama provinsi Jawa Timur dengan para Stakeholder.",
      url: "/site-pages/dokumen-kerjasama",
    },
    {
      title: "Surat Edaran",
      description:
        "Baca artikel hukum terkini di JDIH Jatim untuk wawasan regulasi.",
      url: "/site-pages/surat-edaran",
    },
    {
      title: "Rancangan Peraturan Daerah",
      description: "Dokumen rancangan peraturan daerah yang ada di Jawa Timur",
      url: "/site-pages/rancangan-perda",
    },
  ];

  const allDocuments = [
    ...initialDocuments,
    ...(showAll ? additionalDocuments : []),
  ];

  if (loading) {
    return (
      <section className="py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>

          <div className="h-4 bg-gray-200 rounded w-96 mb-8 animate-pulse"></div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6 bg-gray-100 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mt-2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800">
            Dokumen Hukum Lainnya
          </h2>
          <button
            onClick={() => setShowAll(!showAll)}
            className={`flex items-center font-medium text-sm border rounded px-4 py-2 transition-colors ${
              showAll
                ? "bg-pink-100 text-pink-600 border-pink-300"
                : "text-green-600 border-green-600 hover:text-green-800"
            }`}
          >
            <span className="hidden md:inline">
              {showAll ? "LIHAT SEDIKIT" : "LIHAT SEMUA"}
            </span>
            <ArrowRight className="ml-1 h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>

        <p className="text-gray-600 mb-8">
          Akses dokumen-dokumen lain yang dimiliki oleh Biro Hukum Provinsi Jawa
          Timur.
        </p>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-500 ease-in-out"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {allDocuments.map((doc, index) => {
            const isLastCard = index === allDocuments.length - 1;
            const isLastRowWithOneCard =
              isLastCard && allDocuments.length % 4 === 1;

            return (
              <DocumentCard
                key={index}
                title={doc.title}
                description={doc.description}
                url={doc.url}
                className={
                  isLastRowWithOneCard ? "lg:col-start-1 lg:col-end-2" : ""
                }
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function DocumentCard({ title, description, url, className = "" }) {
  return (
    <motion.div
      className={`border border-gray-200 rounded-lg p-6 hover:border-green-600 hover:shadow-md transition-all ease-in-out cursor-pointer ${className}`}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to={url} className="block">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </Link>
    </motion.div>
  );
}
