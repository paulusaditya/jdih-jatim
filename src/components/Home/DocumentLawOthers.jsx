"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

export default function LegalDocumentsSection() {
  const [showAll, setShowAll] = useState(false)

  const initialDocuments = [
    {
      title: "Monografi",
      description: "Monografi hukum JDIH Jatim: referensi mendalam tentang peraturan dan kebijakan.",
    },
    {
      title: "Staatsblad",
      description: "JDIH Jatim menyediakan Staatsblad sebagai referensi hukum bersejarah.",
    },
    {
      title: "Propemperda",
      description: "JDIH Jatim mendukung konsultasi Propemperda untuk penyusunan regulasi daerah.",
    },
    {
      title: "Artikel Hukum",
      description: "Baca artikel hukum terkini di JDIH Jatim untuk wawasan regulasi.",
    },
  ]

  const additionalDocuments = [
    {
      title: "Putusan Pengadilan",
      description: "Dokumen Putusan Pengadilan yang ada di Jawa Timur.",
    },
    {
      title: "Dokumen Langka",
      description: "Beberapa Dokumen Langka Jawa Timur ada disini.",
    },
    {
      title: "Kerja Sama Daerah",
      description: "Kerja sama provinsi Jawa Timur dengan para Stakeholder.",
    },
    {
      title: "Surat Edaran",
      description: "Baca artikel hukum terkini di JDIH Jatim untuk wawasan regulasi.",
    },
    {
      title: "Rancangan Peraturan Daerah",
      description: "Dokumen rancangan peraturan daerah yang ada di Jawa Timur",
    },
  ]

  const allDocuments = [...initialDocuments, ...(showAll ? additionalDocuments : [])]

  return (
    <section className="py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900">Dokumen Hukum Lainnya</h2>
          <button
            onClick={() => setShowAll(!showAll)}
            className={`flex items-center font-medium text-sm border rounded px-4 py-2 transition-colors ${showAll ? "bg-pink-100 text-pink-600 border-pink-300" : "text-blue-600 border-blue-600 hover:text-blue-800"}`}
          >
            <span className="hidden md:inline">LIHAT SEMUA</span>
            <ArrowRight className="ml-1 h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>

        <p className="text-gray-600 mb-8">
          Akses dokumen-dokumen lain yang dimiliki oleh Biro Hukum Provinsi Jawa Timur.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-500 ease-in-out">
          {allDocuments.map((doc, index) => {
            const isLastCard = index === allDocuments.length - 1
            const isLastRowWithOneCard = isLastCard && allDocuments.length % 4 === 1

            return (
              <DocumentCard
                key={index}
                title={doc.title}
                description={doc.description}
                className={isLastRowWithOneCard ? "lg:col-start-1 lg:col-end-2" : ""}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function DocumentCard({ title, description, className = "" }) {
  return (
    <div
      className={`border border-gray-200 rounded-lg p-6 hover:border-blue-600 hover:shadow-md transition-all ease-in-out cursor-pointer ${className}`}
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}
