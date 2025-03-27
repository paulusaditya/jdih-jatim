import React from "react";
import { useParams } from "react-router-dom";
import DetailDocCard from "../../components/Document/DetailDocCard";
import Breadcrumbs from "../../components/Breadcrumbs";
import PopularDocument from "../../components/PopularDocument";

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Dokumen", path: "/dokumen" },
  { label: "Detail Dokumen", path: "/dokumen/detail" },
];

const DocDetailPage = () => {
  const { docId } = useParams();

  return (
    <>
      <Breadcrumbs paths={breadcrumbPaths} />
      <div className="p-16 bg-white flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <DetailDocCard docId={docId} />
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
