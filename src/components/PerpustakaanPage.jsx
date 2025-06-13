"use client"

import { useState, useEffect } from "react"
import { MapPin } from "lucide-react"
import baseUrl from "../config/api"

const PerpustakaanPage = () => {
  const [libraryData, setLibraryData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLibraryData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/v2/topics/by-slug/perpustakaan-hukum-biro-hukum-sekretariat-daerah-provinsi-jawa-timur`,
        )

        if (!response.ok) {
          throw new Error("Failed to fetch library data")
        }

        const result = await response.json()
        setLibraryData(result.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchLibraryData()
  }, [])

  if (loading) return <div className="flex justify-center p-8">Loading...</div>
  if (error) return <div className="text-red-500 p-8">Error: {error}</div>
  if (!libraryData) return <div className="p-8">No data available</div>

  // Find address and opening hours from fields
  const addressField = libraryData.fields.find((field) => field.title === "Alamat")
  const openingHoursField = libraryData.fields.find((field) => field.title === "Buka")

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Map Image */}
        <div className="rounded-lg overflow-hidden">
          <img
            src="/placeholder.svg?height=400&width=500"
            alt="Peta Lokasi Perpustakaan"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Library Information */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-green-700 mb-6">{libraryData.title}</h1>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-green-700 mb-2">Lokasi</h2>
            <p className="text-gray-700">
              {addressField
                ? addressField.details
                : "Kantor Gubernur Jawa Timur (Lantai 1), Jl. Pahlawan No. 110 Kota Surabaya"}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-green-700 mb-2">Buka</h2>
            <p className="text-gray-700">
              {openingHoursField ? openingHoursField.details : "Senin - Jumat ( 08.00 - 16.00 WIB )"}
            </p>
          </div>

          <a
            href="https://maps.google.com/?q=Jl. Pahlawan No. 110 Kota Surabaya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-green-700 border border-green-700 px-4 py-2 rounded-md hover:bg-green-50 transition-colors w-fit"
          >
            <MapPin size={18} />
            Buka Maps
          </a>
        </div>
      </div>
    </div>
  )
}

export default PerpustakaanPage;
