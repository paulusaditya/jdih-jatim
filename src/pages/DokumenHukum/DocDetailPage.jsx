"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailDocCard from "../../components/DokumenHukum/DetailDocCard";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import PopularDocument from "../../components/PopularDocument";

const breadcrumbMap = {
  staatsblad: { label: "Staatsblad", path: "/site-pages/staatsblad" },
  monografi: { label: "Monografi", path: "/site-pages/monografi" },
  "artikel-hukum": { label: "Artikel", path: "/site-pages/artikel-hukum" },
  propemperda: { label: "Propemperda", path: "/site-pages/propemperda" },
  "putusan-pengadilan": {
    label: "Putusan Pengadilan",
    path: "/site-pages/putusan-pengadilan",
  },
  "dokumen-langka": {
    label: "Dokumen Langka",
    path: "/site-pages/dokumen-langka",
  },
};

const DocDetailPage = ({ customSidebar }) => {
  const { slug } = useParams();
  const type = window.location.pathname.split("/")[2];
  const [documentTitle, setDocumentTitle] = useState("");
  const [finalSlug, setFinalSlug] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const breadcrumbPaths = [
    { label: "Beranda", path: "/" },
    breadcrumbMap[type] || { label: "Dokumen", path: `/site-pages/${type}` },
    {
      label: documentTitle || slug,
      path: `/site-pages/${type}/${slug}`,
    },
  ];

  useEffect(() => {
    if (type === "monografi") {
      fetchRealSlugFromInitialSlug();
    }
  }, [type, slug]);

  const fetchRealSlugFromInitialSlug = async () => {
    setIsLoading(true);
    try {
      let allTopics = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const res = await fetch(
          `https://jdih.pisdev.my.id/api/v2/topics?webmaster_id=11&page=${page}&per_page=263`
        );
        const data = await res.json();
        const topics = data?.data?.data || [];

        allTopics = allTopics.concat(topics);

        const totalPages = data?.data?.last_page || 1;
        hasMore = page < totalPages;
        page++;
      }

      const item = allTopics.find((i) => i.seo_url_slug_id === slug);

      if (!item) {
        setErrorMsg("Dokumen tidak ditemukan di daftar monografi.");
        return;
      }

      const realSlug = item.seo_url_slug_id;

      const finalRes = await fetch(
        `https://jdih.pisdev.my.id/api/v2/topics/by-slug/${realSlug}`
      );
      const finalData = await finalRes.json();

      setFinalSlug(finalData.data.seo_url_slug_id);
      setDocumentTitle(finalData.data.seo_title_id);
    } catch (error) {
      setErrorMsg("Terjadi kesalahan saat memuat data.");
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
            ) : errorMsg ? (
              <p className="text-red-500">{errorMsg}</p>
            ) : (
              <DetailDocCard
                docId={finalSlug}
                onTitleFetched={setDocumentTitle}
              />
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
