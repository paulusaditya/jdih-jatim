"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const cards = [
  {
    title: "Peraturan Daerah Provinsi Jawa Timur",
    description: "Aturan bersama DPRD dan Gubernur, mengatur kehidupan provinsi.",
    path: "/peraturan/perda-jatim",
    icon: "/assets/icn/icn.png",
  },
  {
    title: "Peraturan Gubernur Provinsi Jawa Timur",
    description: "Kebijakan teknis Gubernur untuk pelaksanaan atau hal spesifik.",
    path: "/peraturan/pergub-jatim",
    icon: "/assets/icn/icn1.png",
  },
  {
    title: "Keputusan Gubernur Provinsi Jawa Timur",
    description: "Penetapan Gubernur untuk tindakan atau status tertentu.",
    path: "/peraturan/kepgub-jatim",
    icon: "/assets/icn/icn2.png",
  },
  {
    title: "Instruksi Gubernur Provinsi Jawa Timur",
    description: "Arahan Gubernur kepada perangkat daerah untuk tugas/kebijakan.",
    path: "/peraturan/instruksi-gubernur",
    icon: "/assets/icn/icn3.png",
  },
  {
    title: "Surat Edaran Gubernur Provinsi Jawa Timur",
    description: "Pemberitahuan administrasi dari Gubernur, petunjuk pelaksanaan.",
    path: "/peraturan/surat-edaran",
    icon: "/assets/icn/icn4.png",
  },
  {
    title: "Keputusan Sekretaris Daerah Provinsi Jawa Timur",
    description: "Penetapan Sekda terkait administrasi pemerintahan.",
    path: "/peraturan/keputusan-sekda",
    icon: "/assets/icn/icn5.png",
  },
  {
    title: "Keputusan Kepala Perangkat Daerah",
    description: "Keputusan pimpinan instansi untuk hal spesifik fungsi mereka.",
    path: "/peraturan/keputusan-kepala-pd",
    icon: "/assets/icn/icn6.png",
  },
]

export default function LegalPortal() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-2">Produk Hukum Jawa Timur</h1>
      <p className="text-center text-gray-600 mb-8">Akses Dokumen Hukum Provinsi Jawa Timur.</p>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Top row - 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.slice(0, 4).map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              path={card.path}
              icon={card.icon}
              index={index}
            />
          ))}
        </div>

        {/* Bottom row - 3 cards + See All card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.slice(4, 7).map((card, index) => (
            <Card
              key={index + 4}
              title={card.title}
              description={card.description}
              path={card.path}
              icon={card.icon}
              index={index + 4}
            />
          ))}

          {/* See All Card */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 * 0.1 }}
            className="flex items-center justify-center"
          >
            <Link
              to="/peraturan/"
              className="w-full h-full min-h-[200px] p-6 rounded-2xl bg-green-50 border-2 border-green-200 hover:border-green-300 hover:shadow-md transition-all flex flex-col items-center justify-center text-center group"
            >
              <div className="w-12 h-12 mb-4 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h2 className="font-bold text-green-700 text-lg mb-2">Lihat Semua</h2>
              <p className="text-green-600 text-sm">Jelajahi semua produk hukum yang tersedia</p>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

function Card({ title, description, path, icon, index }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={path}
        className="block w-full h-full min-h-[200px] p-6 rounded-2xl bg-white border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300 group"
      >
        <div className="flex flex-col h-full">
          <div className="mb-4">
            <img
              src={icon || "/placeholder.svg"}
              alt={title}
              className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-gray-800 text-base mb-3 leading-tight group-hover:text-green-700 transition-colors">
              {title}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
