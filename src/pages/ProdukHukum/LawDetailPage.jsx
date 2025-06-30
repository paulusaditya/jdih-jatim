import React from "react";
import { useParams } from "react-router-dom";
import DetailLawCard from "../../components/ProdukHukum/DetailLawCard";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import PopularDocument from "../../components/PopularDocument";
import WhatsAppButton from "../../components/common/ChatWaButton";
import FloatingAccessibilityButton from "../../components/common/FloatingAccessibilityButton";

const LawDetailPage = () => {
  const { slug } = useParams();

  const breadcrumbPaths = [
    { label: "Beranda", path: "/" },
    { label: "Peraturan", path: "/peraturan-terbaru" },
    { label: "Detail Produk Hukum", path: `/peraturan-terbaru/${slug}` },
  ];

  return (
    <>
      <Breadcrumbs paths={breadcrumbPaths} />
      <div className="px-4 py-16 md:p-16 bg-white flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <DetailLawCard lawId={slug} />{" "}
        </div>
        <div className="w-full md:w-1/3">
          <div>
            <PopularDocument />
          </div>
        </div>
      </div>
      <WhatsAppButton />
      <FloatingAccessibilityButton/>
    </>
  );
};

export default LawDetailPage;
