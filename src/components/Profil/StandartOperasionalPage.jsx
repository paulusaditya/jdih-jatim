"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../config/api";

const StandartOperasionalPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}/topics/by-slug/standar-operasional-prosedur-jdih-provinsi-jawa-timur`)
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Gagal memuat data.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <h1 className="text-3xl font-bold text-green-700 mb-6">{data?.title || "Standar Operasional Prosedur JDIH"}</h1>
        <div
          className="prose prose-sm max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: data?.details_id || "" }}
        />
      </div>
    </div>
  );
};

export default StandartOperasionalPage;
