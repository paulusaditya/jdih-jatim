import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailDocCard from "../../components/DokumenHukum/DetailDocCard";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import PopularDocument from "../../components/PopularDocument";

const MonographyDetailPage = () => {
  const { slug } = useParams();
  const [document, setDocument] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const fullLink = `https://jdih.pisdev.my.id/monografi/${slug}`;
        const response = await fetch(
          `https://jdih.pisdev.my.id/api/v2/home/monography/show?link=${encodeURIComponent(fullLink)}&webmaster_id=11`
        );
        const data = await response.json();
        setDocument(data?.data);
      } catch (error) {
        console.error("Error fetching monography detail:", error);
      }
    };

    fetchDocument();
  }, [slug]);

  if (!document) {
    return <div className="p-16 text-center">Loading...</div>;
  }

  const breadcrumbPaths = [
    { label: "Beranda", path: "/" },
    { label: "Dokumentasi Hukum Lainnya", path: "/dokumentasi" },
    { label: "Monografi", path: "/monografi" },
    { label: document.title, path: `/dokumentasi/monografi/${slug}` },
  ];

  return (
    <>
      <Breadcrumbs paths={breadcrumbPaths} />
      <div className="p-16 bg-white flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <DetailDocCard
            title={document.title}
            description={document.description}
            image={document.image}
            link={document.link}
          />
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

export default MonographyDetailPage;
