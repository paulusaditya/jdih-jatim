"use client";

import React, { useEffect, useState } from "react";
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

// Mapping type ke label dan path breadcrumbs
const breadcrumbMap = {
  staatsblad: {
    label: "Staatsblad",
    path: "/site-pages/staatsblad",
  },
  monografi: {
    label: "Monografi",
    path: "/site-pages/monografi",
  },
  artikel: {
    label: "Artikel",
    path: "/site-pages/artikel",
  },
  propemperda: {
    label: "Propemperda",
    path: "/site-pages/propemperda",
  },
  putusanpengadilan: {
    label: "Putusan Pengadilan",
    path: "/site-pages/putusan-pengadilan",
  },
  dokumenlangka: {
    label: "Dokumen Langka",
    path: "/site-pages/dokumen-langka",
  },
};

const DocDetailPage = ({ customSidebar }) => {
  const { slug } = useParams();
  const type = window.location.pathname.split("/")[2];
  const [documentTitle, setDocumentTitle] = useState("");
  const [monografiData, setMonografiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const breadcrumbPaths = [
    { label: "Beranda", path: "/" },
    breadcrumbMap[type] || { label: "Dokumen", path: `/site-pages/${type}` },
    {
      label: documentTitle || formatSlug(slug),
      path: `/site-pages/${type}/${slug}`,
    },
  ];

  useEffect(() => {
    if (type === "monografi") {
      fetchMonografiDetail();
    }
  }, [type, slug]);

  const fetchMonografiDetail = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("https://jdih.pisdev.my.id/api/v2/home/monography");
      const result = await res.json();
      const found = result.data.find((item) =>
        item.link.replace("./", "") === slug
      );

      if (found) {
        setMonografiData(found);
        setDocumentTitle(found.title);
      }
    } catch (error) {
      console.error("Error fetching Monografi detail:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Breadcrumbs paths={breadcrumbPaths} />
      <div className="p-16 bg-white grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {type === "monografi" ? (
            isLoading ? (
              <p className="text-gray-500">Memuat detail...</p>
            ) : monografiData ? (
              <div className="border rounded-md p-6">
                <img
                  src={monografiData.image}
                  alt={monografiData.title}
                  className="w-40 h-auto rounded shadow mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">
                  {monografiData.title}
                </h2>
                <p className="text-sm text-gray-600">
                  *Detail lengkap belum tersedia. Ini adalah tampilan sementara.
                </p>
              </div>
            ) : (
              <p className="text-red-500">Data tidak ditemukan.</p>
            )
          ) : (
            <DetailDocCard docId={slug} onTitleFetched={setDocumentTitle} />
          )}
        </div>
        <div className="w-full">
          {customSidebar ? customSidebar : <PopularDocument />}
        </div>
      </div>
    </>
  );
};

export default DocDetailPage;
