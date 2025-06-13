"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const dprdData = [
  {
    id: 1,
    name: "Sekretariat DPRD Kabupaten Bangkalan",
    url: "https://jdih-dprdbangkalankab.jatimprov.go.id/",
  },
  {
    id: 2,
    name: "Sekretariat DPRD Kabupaten Banyuwangi",
    url: "https://jdih.dprd.banyuwangikab.go.id/",
  },
  {
    id: 3,
    name: "Sekretariat DPRD Kota Batu",
    url: "https://jdih-dprdbatukota.jatimprov.go.id/",
  },
  {
    id: 4,
    name: "Sekretariat DPRD Kabupaten Blitar",
    url: "https://jdih-dprdblitarkab.jatimprov.go.id/",
  },
  {
    id: 5,
    name: "Sekretariat DPRD Kota Blitar",
    url: "https://jdih-dprdblitarkota.jatimprov.go.id/",
  },
  {
    id: 6,
    name: "Sekretariat DPRD Kabupaten Bojonegoro",
    url: "https://jdih-dprdbojonegorokab.jatimprov.go.id/",
  },
  {
    id: 7,
    name: "Sekretariat DPRD Kabupaten Bondowoso",
    url: "https://jdihdprd.bondowosokab.go.id/",
  },
  {
    id: 8,
    name: "Sekretariat DPRD Kabupaten Gresik",
    url: "https://jdihdprd.gresikkab.go.id/",
  },
  {
    id: 9,
    name: "Sekretariat DPRD Kabupaten Jember",
    url: "https://jdih-dprdjemberkab.jatimprov.go.id/",
  },
  {
    id: 10,
    name: "Sekretariat DPRD Kabupaten jombang",
    url: "https://jdih.dprd.jombangkab.go.id/",
  },
  {
    id: 11,
    name: "Sekretariat DPRD Kabupaten Kediri",
    url: "https://jdih-dprdkedirikab.jatimprov.go.id/",
  },
  {
    id: 12,
    name: "Sekretariat DPRD Kota Kediri",
    url: "https://jdih-dprd.kedirikota.go.id/",
  },
  {
    id: 13,
    name: "Sekretariat DPRD Kabupaten Lamongan",
    url: "https://jdih-dprdlamongankab.jatimprov.go.id/",
  },
  {
    id: 14,
    name: "Sekretariat DPRD Kabupaten Lumajang",
    url: "https://jdih-dprdlumajangkab.jatimprov.go.id/",
  },
  {
    id: 15,
    name: "Sekretariat DPRD Kabupaten Madiun",
    url: "https://jdih-dprdmadiunkab.jatimprov.go.id/",
  },
  {
    id: 16,
    name: "Sekretariat DPRD Kota Madiun",
    url: "https://jdih-dprd.madiunkota.go.id/",
  },
  {
    id: 17,
    name: "Sekretariat DPRD Kabupaten Magetan",
    url: "https://jdih-dprdmagetankab.jatimprov.go.id/",
  },
  {
    id: 18,
    name: "Sekretariat DPRD Kabupaten Malang",
    url: "https://jdihdprd.malangkab.go.id/",
  },
  {
    id: 19,
    name: "Sekretariat DPRD Kota Malang",
    url: "https://jdihdprd.malangkota.go.id/",
  },
  {
    id: 20,
    name: "Sekretariat DPRD Kabupaten Mojokerto",
    url: "https://jdih-dprdmojokertokab.jatimprov.go.id/",
  },
  {
    id: 21,
    name: "Sekretariat DPRD Kota Mojokerto",
    url: "https://jdih-dprdmojokertokota.jatimprov.go.id/",
  },
  {
    id: 22,
    name: "Sekretariat DPRD Kabupaten Nganjuk",
    url: "https://jdihdprd.nganjukkab.go.id/",
  },
  {
    id: 23,
    name: "Sekretariat DPRD Kabupaten Ngawi",
    url: "https://jdih-dprd.ngawikab.go.id/",
  },
  {
    id: 24,
    name: "Sekretariat DPRD Kabupaten Pacitan",
    url: "https://jdih-dprdpacitankab.jatimprov.go.id/",
  },
  {
    id: 25,
    name: "Sekretariat DPRD Kabupaten Pamekasan",
    url: "https://jdih-dprdpamekasankab.jatimprov.go.id/",
  },
  {
    id: 26,
    name: "Sekretariat DPRD Kabupaten Pasuruan",
    url: "https://jdihdprd.pasuruankab.go.id/",
  },
  {
    id: 27,
    name: "Sekretariat DPRD Kota Pasuruan",
    url: "https://jdih-dprdpasuruankota.jatimprov.go.id/",
  },
  {
    id: 28,
    name: "Sekretariat DPRD Kabupaten Ponorogo",
    url: "https://jdih-dprd.ponorogo.go.id/",
  },
  {
    id: 29,
    name: "Sekretariat DPRD Kabupaten Probolinggo",
    url: "https://jdih-dprdprobolinggokab.jatimprov.go.id/",
  },
  {
    id: 30,
    name: "Sekretariat DPRD Kota Probolinggo",
    url: "https://jdih-dprdprobolinggokota.jatimprov.go.id/",
  },
  {
    id: 31,
    name: "Sekretariat DPRD Kabupaten Sampang",
    url: "https://jdih-dprdsampangkab.jatimprov.go.id/",
  },
  {
    id: 32,
    name: "Sekretariat DPRD Kabupaten Sidoarjo",
    url: "https://jdih.dprd-sidoarjo.go.id/",
  },
  {
    id: 33,
    name: "Sekretariat DPRD Kabupaten Situbondo",
    url: "https://jdihdprd.situbondokab.go.id/",
  },
  {
    id: 34,
    name: "Sekretariat DPRD Kabupaten Sumenep",
    url: "https://dprd.sumenepkab.go.id/jaringan-dokumentasi-dan-informasi-hukum",
  },
  {
    id: 35,
    name: "Sekretariat DPRD Kota Surabaya",
    url: "https://jdih-dprdsurabaya.jatimprov.go.id/",
  },
  {
    id: 36,
    name: "Sekretariat DPRD Kabupaten Trenggalek",
    url: "https://jdih.dprd.trenggalekkab.go.id/",
  },
  {
    id: 37,
    name: "Sekretariat DPRD Kabupaten Tuban",
    url: "https://jdihdprd.tubankab.go.id/",
  },
  {
    id: 38,
    name: "Sekretariat DPRD Kabupaten Tulungagung",
    url: "https://jdih.dprd-tulungagungkab.go.id/",
  },
  {
    id: 39,
    name: "Sekretariat DPRD Provinsi Jawa Timur",
    url: "https://jdih.dprd.jatimprov.go.id/",
  },
]

export default function DprdMemberCity() {
  const [showAll, setShowAll] = useState(false)
  const displayedData = showAll ? dprdData : dprdData.slice(0, 6)

  return (
    <section className="py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-green-800">
          Anggota DPRD Kota/Kabupaten
        </h2>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className={`flex items-center font-medium text-sm border rounded px-4 py-2 transition-colors ${
              showAll
                ? "bg-pink-100 text-pink-600 border-pink-300"
                : "text-green-600 border-green-600 hover:text-green-800"
            }`}
          >
            <span className="hidden md:inline">{showAll ? "LIHAT SEDIKIT" : "LIHAT SEMUA"}</span>
            <ArrowRight className="ml-1 h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4"
        >
          <AnimatePresence>
            {displayedData.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full"
                >
                  <div className="h-[120px] rounded-lg border border-gray-200 flex items-center justify-center p-4 transition-all duration-300 group-hover:bg-green-50 group-hover:border-green-200">
                    <p className="text-center text-green-800 font-medium text-sm">{item.name}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}