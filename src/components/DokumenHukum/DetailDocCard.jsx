import React, { useEffect, useState } from "react";
import { Eye, Download } from "lucide-react";
import DetailItem from "./DetailItem";

function DetailDocCard({ docId }) {
  const [selectedButton, setSelectedButton] = useState("Detail");
  const [showPdf, setShowPdf] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://jdih.pisdev.my.id/api/v2/topics/by-slug/${docId}`
        );
        const result = await response.json();
        console.log("📦 Response API by-slug:", result);

        if (result.status === "success") {
          setData(result.data);
        }
      } catch (error) {
        console.error("❌ Error :", error);
      }
    };

    if (docId) fetchData();
  }, [docId]);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
    setShowPdf(button === "Dokumen Lampiran");
  };

  const handleDownload = () => {
    const lampiranField = data?.fields?.find(
      (field) => field.title.toLowerCase() === "lampiran"
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
  const judul =
    fields.find((f) => f.title === "Judul")?.details || "Judul Tidak Tersedia";
  const lampiranField = fields.find((f) => f.title === "Lampiran");
  const lampiranUrl = lampiranField ? lampiranField.details : "";

  return (
    <div className="self-center p-6 h-auto rounded-xl border border-solid border-stone-300 w-[760px] max-md:w-full max-sm:p-4">
      <div className="mb-2 text-2xl font-semibold text-zinc-800">{judul}</div>
      <div className="mb-4 text-sm text-gray-600">
        Tanggal: {data?.date || "-"}
      </div>

      <div className="flex justify-between items-center px-4 py-3 mb-5 rounded-lg bg-zinc-100 max-sm:flex-col max-sm:gap-3">
        <div className="flex gap-3 items-center text-base text-black">
          <Eye size={24} />
          <div>Visits : {visits}</div>
        </div>
        {lampiranField && (
          <div className="flex gap-2 items-center px-5 py-3 text-sm font-semibold text-zinc-800">
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

      <div className="flex gap-3 mb-5 max-sm:flex-wrap">
        <button
          className={`px-4 py-1 text-base rounded-[999px] border border-zinc-300 transition-colors duration-200 ${
            selectedButton === "Detail" ? "bg-red-500 text-white" : ""
          }`}
          onClick={() => handleButtonClick("Detail")}
        >
          Detail
        </button>
        {lampiranField && (
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
        <button
          className={`px-4 py-1 text-base rounded-[999px] border border-zinc-300 transition-colors duration-200 ${
            selectedButton === "Abstrak Lampiran" ? "bg-red-500 text-white" : ""
          }`}
          onClick={() => handleButtonClick("Abstrak Lampiran")}
        >
          Abstrak Lampiran
        </button>
      </div>

      {selectedButton === "Dokumen Lampiran" && lampiranUrl ? (
        <div className="mt-4">
          <iframe
            src={`https://docs.google.com/gview?url=${encodeURIComponent(
              lampiranUrl
            )}&embedded=true`}
            width="100%"
            height="500px"
            title="Dokumen Lampiran"
          />
        </div>
      ) : selectedButton === "Abstrak Lampiran" ? (
        <div className="text-base text-gray-700">
          <DetailItem
            label="Abstrak Lampiran"
            value={
              fields.find((f) => f.title === "Abstrak Lampiran")?.details || "-"
            }
          />
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
