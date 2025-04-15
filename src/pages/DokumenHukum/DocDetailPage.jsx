"use client"

import React from "react"
import { useParams } from "react-router-dom"
import DetailDocCard from "../../components/DokumenHukum/DetailDocCard"
import Breadcrumbs from "../../components/common/Breadcrumbs"
import PopularDocument from "../../components/PopularDocument"

// Fungsi untuk konversi slug jadi judul (fallback)
const formatSlug = (slug) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

// Mapping tipe dokumen ke label tampilan
const typeLabelMap = {
  propemperda: "Propemperda",
  statsblads: "Statsblads",
  peraturan: "Peraturan",
  monografi: "Monografi",
}

const DocDetailPage = () => {
  const [documentTitle, setDocumentTitle] = React.useState("")
  const { slug, type } = useParams()

  const documentLabel = typeLabelMap[type] || "Dokumen"

  const breadcrumbPaths = [
    { label: "Beranda", path: "/" },
    { label: documentLabel, path: `/dokumentasi/${type}` },
    { label: documentTitle || formatSlug(slug), path: `/dokumentasi/${type}/${slug}` },
  ]

  return (
    <>
      <Breadcrumbs paths={breadcrumbPaths} />
      <div className="p-16 bg-white flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <DetailDocCard docId={slug} onTitleFetched={setDocumentTitle} />
        </div>
        <div className="w-full md:w-1/3">
          <div className="mt-6">
            <PopularDocument />
          </div>
        </div>
      </div>
    </>
  )
}

export default DocDetailPage
