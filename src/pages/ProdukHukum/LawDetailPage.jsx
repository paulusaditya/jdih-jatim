import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DetailLawCard from "../../components/ProdukHukum/DetailLawCard";
import Breadcrumbs from "../../components/Breadcrumbs";
import Kategori from "../../components/Kategori";
import PopularDocument from "../../components/PopularDocument";

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Produk Hukum", path: "/produk-hukum" },
  { label: "Produk Hukum Provinsi Jatim", path: "/provinsijatim" },
];

const LawDetailPage = () => {
  const { number, year } = useParams();
  const [showKategori, setShowKategori] = useState(true);

  return (
    <>
      <Breadcrumbs paths={breadcrumbPaths} />
      <div className="p-16 bg-white flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <DetailLawCard setShowKategori={setShowKategori} />{" "}
        </div>
        <div className="w-full md:w-1/3">
          {showKategori && <Kategori />}{" "}
          <div className="mt-6">
            <PopularDocument />
          </div>
        </div>
      </div>
    </>
  );
};

export default LawDetailPage;
