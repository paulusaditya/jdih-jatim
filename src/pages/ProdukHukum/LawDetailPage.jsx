import React from "react";
import { useParams } from "react-router-dom";
import DetailLawCard from "../../components/DetailLawCard"; 

const LawDetailPage = () => {
  const { number, year } = useParams();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Detail Peraturan Gubernur Nomor {number} Tahun {year}
      </h1>
      <DetailLawCard />
    </div>
  );
};

export default LawDetailPage;
