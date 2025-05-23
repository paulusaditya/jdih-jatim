import React, { useEffect, useState } from "react";
import { Eye, Download } from "lucide-react";
import DetailItem from "./DetailItem";
import Seo from "../../components/common/Seo";
import baseUrl from "../../config/api";
import LoadingSpinner from "../../components/common/LoadingSpinner";

function DetailDocCard({ docId }) {
  const [selectedButton, setSelectedButton] = useState("Detail");
  const [showPdf, setShowPdf] = useState(false);
  const [isLoadingAttachment, setIsLoadingAttachment] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/topics/by-slug/${docId}`);
        const result = await response.json();
        if (result.status === "success") {
          setData(result.data);
        }
      } catch (error) {
        console.error("❌ Error:", error);
      }
    };

    if (docId) fetchData();
  }, [docId]);

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
                className="flex items-center cursor-pointer"
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
          className={`px-4 py-1 text-base rounded-[999px] border border-zinc-300 transition-colors duration-200 ${
            selectedButton === "Detail" ? "bg-red-500 text-white" : ""
          }`}
          onClick={() => handleButtonClick("Detail")}
        >
          Detail
        </button>
        {lampiranUrl && (
          <button
            className={`px-4 py-1 text-base rounded-[999px] border border-zinc-300 transition-colors duration-200 ${
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
            className={`px-4 py-1 text-base rounded-[999px] border border-zinc-300 transition-colors duration-200 ${
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
              <LoadingSpinner />
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
              className="relative z-0"
            />
          )}
        </div>
      ) : selectedButton === "Abstrak Lampiran" && hasAbstrak ? (
        <div className="text-base text-gray-700">
          <DetailItem label="Abstrak Lampiran" value={hasAbstrak} />
        </div>
      ) : (
        <div className="flex flex-col">
          {fields.map((item, index) => {
            const value = item.details.includes("http")
              ? decodeURIComponent(item.details.split("/").pop())
              : item.details;

            return <DetailItem key={index} label={item.title} value={value} />;
          })}
        </div>
      )}
    </div>
  );
}

export default DetailDocCard;
