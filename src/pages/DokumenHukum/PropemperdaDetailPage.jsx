import React from "react";
import { useParams } from "react-router-dom";
import DetailLawCard from "../../components/ProdukHukum/DetailLawCard";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import PopularDocument from "../../components/PopularDocument";

const PropemperdaDetailPage = () => {
  const { slug } = useParams();

  const breadcrumbPaths = [
    { label: "Beranda", path: "/" },
    { label: "Propemperda", path: "/prompemperda" },
    { label: "Detail Propemperda", path: `/dokumentasi/propemperda/${slug}` },
  ];

  return (
    <>
      <Breadcrumbs paths={breadcrumbPaths} />
      <div className="p-16 bg-white flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <DetailLawCard lawId={slug} />{" "}
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

export default PropemperdaDetailPage;