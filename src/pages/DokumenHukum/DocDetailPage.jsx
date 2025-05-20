"use client";

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DetailDocCard from "../../components/DokumenHukum/DetailDocCard";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import PopularDocument from "../../components/PopularDocument";

// Fungsi untuk konversi slug jadi judul fallback
const formatSlug = (slug) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const breadcrumbMap = {
  staatsblad: {
    label: "Staatsblad",
    path: "/site-pages/staatsblad",
  },
  monografi: {
    label: "Monografi",
    path: "/site-pages/monografi",
  },
  "artikel-hukum": {
    label: "Artikel",
    path: "/site-pages/artikel-hukum",
  },
  propemperda: {
    label: "Propemperda",
    path: "/site-pages/propemperda",
  },
  "putusan-pengadilan": {
    label: "Putusan Pengadilan",
    path: "/site-pages/putusan-pengadilan",
  },
  "dokumen-langka": {
    label: "Dokumen Langka",
    path: "/site-pages/dokumen-langka",
  },
  "dokumen-populer": {
    label: "Dokumen Populer",
    path: "/site-pages/dokumen-populer",
  },
};

const DocDetailPage = ({ customSidebar }) => {
  const { slug } = useParams();
  const type = window.location.pathname.split("/")[2];
  const [documentTitle, setDocumentTitle] = useState("");

  const breadcrumbPaths = [
    { label: "Beranda", path: "/" },
    breadcrumbMap[type] || { label: "Dokumen", path: `/site-pages/${type}` },
    {
      label: documentTitle || formatSlug(slug),
      path: `/site-pages/${type}/${slug}`,
    },
  ];

  return (
    <>
      <Breadcrumbs paths={breadcrumbPaths} />
      <div className="px-4 md:px-16 py-16 bg-white grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <DetailDocCard docId={slug} onTitleFetched={setDocumentTitle} />
        </div>
        <div className="w-full">
          {customSidebar ? customSidebar : <PopularDocument />}
        </div>
      </div>
    </>
  );
};

export default DocDetailPage;
