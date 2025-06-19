"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import baseUrl from "../config/api";
import LoadingSpinner from "./common/LoadingSpinner";

const PerpustakaanPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/topics/by-slug/perpustakaan-hukum-biro-hukum-sekretariat-daerah-provinsi-jawa-timur`
        );
        if (!res.ok) throw new Error("Failed to fetch library data");
        const result = await res.json();
        setData(result.data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner/>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  const alamat =
    data?.fields
      ?.find((f) => f.title === "Alamat")
      ?.details?.replace(/\r\n/g, " ") ?? "Jl. Pahlawan No.110, Surabaya";
  const buka =
    data?.fields?.find((f) => f.title === "Buka")?.details ??
    "Senin - Jumat (09.00 - 15.00)";

  return (
    <section className="py-10 px-4 md:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* MAPS */}
        <div className="rounded-lg overflow-hidden w-full h-[300px] md:h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1120.7372642867172!2d112.73900700233523!3d-7.245924159933477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f940401c8755%3A0xe6b91ad0a085eaca!2sKantor%20Gubernur%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1749876888754!5m2!1sid!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* INFO */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-6">
            {data?.title ?? "Perpustakaan JDIH"}
          </h1>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-green-700 mb-1">
              Lokasi
            </h2>
            <p className="text-gray-700">{alamat}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-green-700 mb-1">Buka</h2>
            <p className="text-gray-700">{buka}</p>
          </div>

          <a
            href="https://maps.google.com/?q=Jl. Pahlawan No. 110 Kota Surabaya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-green-700 text-green-700 px-4 py-2 rounded-md hover:bg-green-50 transition-colors w-fit"
          >
            <MapPin size={18} />
            Buka Maps
          </a>
        </div>
      </div>
    </section>
  );
};

export default PerpustakaanPage;
