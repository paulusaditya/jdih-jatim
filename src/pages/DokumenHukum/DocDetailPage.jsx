"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailDocCard from "../../components/DokumenHukum/DetailDocCard";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import PopularDocument from "../../components/PopularDocument";

// Fungsi untuk konversi slug jadi judul (fallback)
const formatSlug = (slug) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Mapping tipe dokumen ke label tampilan
const typeLabelMap = {
  propemperda: "Propemperda",
  statsblads: "Statsblads",
  peraturan: "Peraturan",
  monografi: "Monografi",
};

const DocDetailPage = () => {
  const { slug, type } = useParams();
  const documentLabel = typeLabelMap[type] || "Dokumen";
  const [documentTitle, setDocumentTitle] = useState("");
  const [monografiData, setMonografiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const breadcrumbPaths = [
    { label: "Beranda", path: "/" },
    { label: documentLabel, path: `/site-pages/${type}` },
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
      <div className="p-16 bg-white flex flex-col md:flex-row gap-6">
        <div className="flex-1">
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
        <div className="w-full md:w-1/3">
          <div className="mt-6">
            <PopularDocument />
          </div>
        </div>
      </div>
    </>
  );
};

export default DocDetailPage;
