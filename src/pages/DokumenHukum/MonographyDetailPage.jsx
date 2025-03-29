import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailDocCard from "../../components/DokumenHukum/DetailDocCard";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import PopularDocument from "../../components/PopularDocument";

const MonographyDetailPage = () => {
  const { docId } = useParams();
  const [document, setDocument] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(
          `http://54.169.231.19/api/v2/home/monography/${docId}`
        );
        const data = await response.json();
        setDocument(data);
      } catch (error) {
        console.error("Error fetching monography detail:", error);
      }
    };

    fetchDocument();
  }, [docId]);

  if (!document) {
    return <div className="p-16 text-center">Loading...</div>;
  }

  const breadcrumbPaths = [
    { label: "Beranda", path: "/" },
    { label: "Dokumentasi Hukum Lainnya", path: "/dokumentasi" },
    { label: "Monografi", path: "/monografi" },
    { label: document.title, path: `/dokumentasi/monografi/${docId}` },
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
