import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function LatestRegulations() {
  const [regulations, setRegulations] = useState([]);
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionDesc, setSectionDesc] = useState("");

  useEffect(() => {
    fetch(
      "https://jdih.pisdev.my.id/api/v2/topics?webmaster_section_id=10&sort_by=created_at&sort_order=desc"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success" && data.data) {
          setSectionTitle(data.data.title || "Dokumen Peraturan Terbaru");
          setSectionDesc(
            data.data.description || "Dokumen peraturan terbaru di Jawa Timur."
          );

          const allRegulations = data.data.data || [];
          const latestRegulations = allRegulations.slice(0, 3);

          const regulationsWithSlugs = latestRegulations.map((reg) => {
            return {
              ...reg,
              slug: reg.seo_url_slug_id || "default-slug",
            };
          });

          setRegulations(regulationsWithSlugs);
        }
      })
      .catch((err) => console.error("Failed to fetch data:", err));
  }, []);

  return (
    <section className="py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-blue-900">{sectionTitle}</h2>
            <p className="text-gray-600">{sectionDesc}</p>
          </div>
          <Link
            to="/peraturan-terbaru"
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm border border-blue-600 rounded px-4 py-2 transition-colors md:px-4 md:py-2"
          >
            <span className="hidden md:inline">LIHAT SEMUA</span>
            <ArrowRight className="ml-1 h-4 w-4 md:h-5 md:w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regulations.map((regulation) => (
            <RegulationCard key={regulation.id} regulation={regulation} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RegulationCard({ regulation }) {
  const getField = (title) => {
    const field = regulation.fields.find((f) => f.title === title);
    return field ? field.details : "-";
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          {regulation.title}
        </h3>

        <div className="space-y-2 mb-6">
          <RegulationDetail
            label="Jenis Peraturan"
            value={getField("Jenis Peraturan")}
          />
          <RegulationDetail label="Nomor" value={getField("Nomor")} />
          <RegulationDetail
            label="Tahun Terbit"
            value={getField("Tahun Terbit")}
          />
          <RegulationDetail
            label="Singkatan Jenis"
            value={getField("Singkatan Jenis")}
          />
          <RegulationDetail
            label="Tanggal Penetapan"
            value={getField("Tanggal Penetapan")}
          />
          <RegulationDetail
            label="Tanggal Pengundangan"
            value={getField("Tanggal Pengundangan")}
          />
          <RegulationDetail
            label="Tempat Terbit"
            value={getField("Tempat Terbit")}
          />
        </div>
      </div>

      <div className="mt-auto pt-2">
        <Link
          to={regulation.slug ? `/peraturan-terbaru/${regulation.slug}` : "#"}
          className={`flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm ${
            !regulation.slug && "pointer-events-none opacity-50"
          }`}
        >
          Lihat Selengkapnya <ArrowUpRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function RegulationDetail({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="text-gray-900 font-medium">{value}</span>
    </div>
  );
}
