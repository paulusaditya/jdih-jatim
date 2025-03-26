"use client"

import { useState } from "react"
import { ArrowRight, ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import Link from "next/link";
import Image from "next/image";


export default function NewsSection() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 1

  const newsItems = [
    {
      id: 1,
      date: "24 - 02 - 2025",
      title:
        'Talkshow "Bincang Hukum" di TVRI Jawa Timur Kupas Tuntas Peraturan Daerah Provinsi Jawa Timur Nomor 8 Tahun 2022 tentang Kerja Sama Daerah',
      content:
        'Surabaya, Senin (24/2) - Biro Hukum Sekretariat Daerah Provinsi Jawa Timur dan Stasiun Televisi Republik Indonesia (TVRI) Jawa Timur mengelar program talkshow "Bincang Hukum" yang membahas Peraturan Daerah Provinsi Jawa Timur Nomor 8 Tahun 2022 tentang Kerja Sama Daerah. Acara ini...',
      image: "/assets/berita/image 69.png?height=300&width=500",
    },
    {
      id: 2,
      date: "18 - 02 - 2025",
      title: "Sosialisasi Peraturan Gubernur Jawa Timur Nomor 12 Tahun 2025 tentang Pengelolaan Aset Daerah",
      content:
        "Surabaya, Selasa (18/2) - Biro Hukum Sekretariat Daerah Provinsi Jawa Timur mengadakan sosialisasi Peraturan Gubernur Jawa Timur Nomor 12 Tahun 2025 tentang Pengelolaan Aset Daerah. Kegiatan ini dihadiri oleh perwakilan dari seluruh Organisasi Perangkat Daerah (OPD) di lingkungan Pemerintah Provinsi Jawa Timur...",
      image: "/assets/berita/imagedoe.jpg?height=300&width=500",
    },
  ]

  const totalPages = Math.ceil(newsItems.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = newsItems.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  return (
    <section className="py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900">
            Berita Biro Hukum Sekretariat Daerah Jawa Timur
          </h2>
          <Link
            href="/berita"
            className="flex items-center font-medium text-sm border rounded px-4 py-2 transition-colors text-blue-600 border-blue-600 hover:text-blue-800"
          >
            <span className="hidden md:inline">LIHAT SEMUA</span>
            <ArrowRight className="ml-1 h-4 w-4 md:h-5 md:w-5" />
          </Link>
        </div>

        <div className="mb-6">
          {currentItems.map((news) => (
            <div key={news.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              <div className="p-6 md:p-8 md:flex gap-6">
                <div className="md:w-7/12 space-y-4">
                  <div className="flex items-center text-green-600 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{news.date}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">{news.title}</h3>
                  <p className="text-gray-600">{news.content}</p>
                  <button className="text-green-600 border border-green-600 rounded-md px-4 py-2 inline-flex items-center text-sm font-medium hover:bg-green-50 transition-colors">
                    Baca Selengkapnya
                  </button>
                </div>
                <div className="md:w-5/12 mt-6 md:mt-0">
                  <div className="relative h-64 md:h-full w-full rounded-lg overflow-hidden">
                    <Image src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2">
          <button onClick={() => paginate(currentPage - 1)} className="p-2 rounded-md hover:bg-gray-100 transition-colors" disabled={currentPage === 1}>
            <ChevronLeft className="h-5 w-5 text-gray-500" />
          </button>
          <span className="text-gray-600">{currentPage} dari {totalPages}</span>
          <button onClick={() => paginate(currentPage + 1)} className="p-2 rounded-md hover:bg-gray-100 transition-colors" disabled={currentPage === totalPages}>
            <ChevronRight className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
    </section>
  )
}
