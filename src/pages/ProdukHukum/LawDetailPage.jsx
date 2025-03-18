import React from "react";
import { useParams } from "react-router-dom";
import DetailLawCard from "../../components/DetailLawCard";
import Breadcrumbs from "../../components/Breadcrumbs";
import Kategori from "../../components/Kategori"; //

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Produk Hukum", path: "/produk-hukum" },
  { label: "Produk Hukum Provinsi Jatim", path: "/provinsijatim" },
];

const LawDetailPage = () => {
  const { number, year } = useParams();

    return (
      <>
        <Breadcrumbs paths={breadcrumbPaths} />
        <div className="p-6 flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <DetailLawCard />
          </div>
          <div className="w-full md:w-1/3">
            <Kategori />
          </div>
        </div>
      </>
    );
};

export default LawDetailPage;
