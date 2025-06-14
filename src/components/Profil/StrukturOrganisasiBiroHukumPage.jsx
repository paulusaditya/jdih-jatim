"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import baseUrl from "../../config/api"
import { DownloadIcon } from "lucide-react"
import LoadingSpinner from "../common/LoadingSpinner"

const StrukturOrganisasiBiroHukumPage = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get(`${baseUrl}/topics/by-slug/struktur-organisasi-biro-hukum`)
      .then((res) => {
        setData(res.data.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError("Gagal memuat data.")
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <LoadingSpinner/>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Judul */}
        <h2 className="text-center text-green-700 text-lg font-semibold mb-1">STRUKTUR ORGANISASI</h2>
        <h1 className="text-center text-green-700 text-xl font-bold mb-6">
          BIRO HUKUM SEKRETARIAT DAERAH PROVINSI JAWA TIMUR
        </h1>

        {/* Konten utama */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md text-gray-800">
          <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: data?.details_id || "" }} />

          {/* Referensi Peraturan Gubernur - Static text since it's not in the API */}
          <p className="text-sm mt-4">
            Pasal 4 Peraturan Gubernur Jawa Timur Nomor 26 Tahun 2024 tentang Kedudukan, Susunan Organisasi, Uraian
            Tugas dan Fungsi serta Tata Kerja Sekretariat Daerah
          </p>

          {/* Tombol Download */}
          <div className="mt-6 flex justify-start">
            <a
              href="https://drive.google.com/file/d/1Q831zkmg92BFtJ53t_BdwdsEaud2R74F/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white border border-green-700 text-green-700 hover:bg-green-50 px-4 py-2 rounded-md transition-colors duration-200 text-sm"
            >
              <DownloadIcon className="w-4 h-4" /> Download Dokumen
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StrukturOrganisasiBiroHukumPage
