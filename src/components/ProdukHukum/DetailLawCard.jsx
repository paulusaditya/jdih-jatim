import React, { useEffect, useState } from "react";
import { Eye, Download } from "lucide-react";
import DetailItem from "./DetailItem";
import Seo from "../../components/common/Seo";
import baseUrl from "../../config/api";

function DetailLawCard({ lawId }) {
  const [selectedButton, setSelectedButton] = useState("Detail");
  const [showPdf, setShowPdf] = useState(false);
  const [isLoadingAttachment, setIsLoadingAttachment] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = `${baseUrl}/topics/by-slug/${lawId}`;
        const response = await fetch(url);
        const result = await response.json();

        if (result.status === "success") {
          setData(result.data);
        } else {
          console.error("❌ API Response Error:", result.status);
        }
      } catch (error) {
        console.error("❌ Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (lawId) fetchData();
  }, [lawId]);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
    setShowPdf(button === "Dokumen Lampiran");

    if (button === "Dokumen Lampiran") {
      setIsLoadingAttachment(true);
    }
  };

  const handleDownload = () => {
    const lampiranField = data?.fields?.find((field) =>
      field.title?.toLowerCase().includes("lampiran")
    );
    const url = lampiranField?.details;
    if (!url) return;

    const decodedFilename = decodeURIComponent(url.split("/").pop());
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", decodedFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="self-center p-6 h-auto rounded-xl border border-solid border-stone-300 w-[760px] max-md:w-full max-sm:p-4">
        {/* Title skeleton */}
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
        
        {/* Date skeleton */}
        <div className="h-4 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
        
        {/* Stats section skeleton */}
        <div className="flex justify-between items-center px-4 py-3 mb-5 rounded-lg bg-gray-100 max-sm:flex-col max-sm:gap-3">
          <div className="w-full flex justify-between items-center max-sm:flex">
            <div className="flex gap-2 items-center">
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {/* Buttons skeleton */}
        <div className="flex gap-3 mb-5 max-sm:flex-wrap">
          <div className="h-8 bg-gray-200 rounded-full w-16 animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded-full w-32 animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded-full w-28 animate-pulse"></div>
        </div>
        
        {/* Detail items skeleton */}
        <div className="space-y-0">
          {/* First static item (Tipe Dokumen) */}
          <div className="flex px-0 py-3 border-b border-solid border-b-zinc-100 items-start">
            <div className="w-[175px] shrink-0">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
            </div>
          </div>
          
          {/* Dynamic detail items skeleton */}
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="flex px-0 py-3 border-b border-solid border-b-zinc-100 items-start">
              <div className="w-[175px] shrink-0">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const fields = data?.fields || [];
  const visits = data?.visits || 0;

  const judulField = fields.find((f) =>
    f.title?.toLowerCase().includes("judul")
  );
  const judul = judulField?.details || "Judul Tidak Tersedia";

  const lampiranField = fields.find((f) =>
    f.title?.toLowerCase().includes("lampiran")
  );
  const lampiranUrl = lampiranField?.details || "";

  const abstrakField = fields.find((f) =>
    f.title?.toLowerCase().includes("abstrak")
  );
  const hasAbstrak = abstrakField?.details?.trim();

  return (
    <div className="self-center p-6 h-auto rounded-xl border border-solid border-stone-300 w-[760px] max-md:w-full max-sm:p-4">
      <Seo
        seoTitle={data?.seo_title_id}
        seoDescription={data?.seo_description_id}
        seoKeywords={data?.seo_keywords_id}
      />

      <div className="mb-2 text-2xl font-semibold text-zinc-800">{judul}</div>
      <div className="mb-4 text-sm text-gray-600">
        Tanggal: {data?.date || "-"}
      </div>

      <div className="flex justify-between items-center px-4 py-3 mb-5 rounded-lg bg-zinc-100 max-sm:flex-col max-sm:gap-3">
        <div className="w-full flex justify-between items-center max-sm:flex">
          <div className="flex gap-2 items-center text-base text-black">
            <Eye size={24} />
            <div>Visits : {visits}</div>
          </div>
          {lampiranField && (
            <div className="flex gap-2 items-center text-sm font-semibold text-zinc-800">
              <a
                onClick={handleDownload}
                className="flex items-center cursor-pointer hover:text-green-600 transition-colors"
              >
                <div className="mr-2">Download</div>
                <Download size={24} className="text-green-500" />
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 mb-5 max-sm:flex-wrap">
        <button
          className={`px-4 py-1 text-base rounded-[999px] border border-zinc-300 transition-colors duration-200 hover:border-red-400 ${
            selectedButton === "Detail" ? "bg-red-500 text-white" : ""
          }`}
          onClick={() => handleButtonClick("Detail")}
        >
          Detail
        </button>
        {lampiranField && (
          <button
            className={`px-4 py-1 text-base rounded-[999px] border border-zinc-300 transition-colors duration-200 hover:border-red-400 ${
              selectedButton === "Dokumen Lampiran"
                ? "bg-red-500 text-white"
                : ""
            }`}
            onClick={() => handleButtonClick("Dokumen Lampiran")}
          >
            Dokumen Lampiran
          </button>
        )}
        {hasAbstrak && (
          <button
            className={`px-4 py-1 text-base rounded-[999px] border border-zinc-300 transition-colors duration-200 hover:border-red-400 ${
              selectedButton === "Abstrak Lampiran"
                ? "bg-red-500 text-white"
                : ""
            }`}
            onClick={() => handleButtonClick("Abstrak Lampiran")}
          >
            Abstrak Lampiran
          </button>
        )}
      </div>

      {selectedButton === "Dokumen Lampiran" && lampiranUrl ? (
        <div className="mt-4 relative">
          {isLoadingAttachment && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          )}

          {/\.(jpg|jpeg|png)$/i.test(lampiranUrl) ? (
            <img
              src={lampiranUrl}
              alt="Lampiran"
              onLoad={() => setIsLoadingAttachment(false)}
              className="max-w-full max-h-[500px] mx-auto rounded-lg shadow relative z-0"
            />
          ) : (
            <iframe
              src={`https://docs.google.com/gview?url=${encodeURIComponent(
                lampiranUrl
              )}&embedded=true`}
              width="100%"
              height="500px"
              title="Dokumen Lampiran"
              onLoad={() => setIsLoadingAttachment(false)}
              className="relative z-0 rounded-lg"
            />
          )}
        </div>
      ) : selectedButton === "Abstrak Lampiran" && hasAbstrak ? (
        <div className="text-base text-gray-700">
          <DetailItem label="Abstrak Lampiran" value={hasAbstrak} />
        </div>
      ) : (
        <div className="flex flex-col">
          <DetailItem fields={fields} />
        </div>
      )}
    </div>
  );
}

export default DetailLawCard;