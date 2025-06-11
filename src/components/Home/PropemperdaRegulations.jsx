import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import baseUrl from "../../config/api";

function shuffleArray(array) {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

export default function PropemperdaRegulations() {
  const [regulations, setRegulations] = useState([]);
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionDesc, setSectionDesc] = useState("");

  useEffect(() => {
    fetch(`${baseUrl}/home/propemperda`)
      .then((res) => res.json())
      .then(async (data) => {
        setSectionTitle(data.title);
        setSectionDesc(data.description);

        const shuffled = shuffleArray(data.data || []).slice(0, 3);

        const regulationsWithSlugs = await Promise.all(
          shuffled.map(async (reg) => {
            try {
              const res = await fetch(`${baseUrl}/topics/${reg.id}`);
              const topicData = await res.json();
              const slug = topicData?.data?.seo_url_slug_id || "default-slug";
              return { ...reg, slug };
            } catch (error) {
              console.error("Failed to fetch slug for id:", reg.id);
              return { ...reg, slug: "default-slug" };
            }
          })
        );

        setRegulations(regulationsWithSlugs);
      })
      .catch((err) => console.error("Failed to fetch data:", err));
  }, []);

  return (
    <section className="py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-green-800">{sectionTitle}</h2>
            <p className="text-gray-600">{sectionDesc}</p>
          </div>
          <Link
            to="/site-pages/propemperda"
            className="flex items-center text-green-600 hover:text-green-800 font-medium text-sm border border-green-600 rounded px-4 py-2 transition-colors md:px-4 md:py-2"
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
  const getField = (keyword) => {
    const field = regulation.fields.find((f) =>
      f.title.includes(keyword)
    );
    return field ? field.details : "-";
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          {regulation.title.toUpperCase()}
        </h3>

        {/* <div className="space-y-2 mb-6 text-sm">
          <RegulationDetail
            label="Tahun Propemperda"
            value={getField("Tahun")}
          />
          <RegulationDetail
            label="Tanggal Rapat Pembahasan"
            value={getField("Tanggal Rapat Pembahasan")}
          />
          <RegulationDetail
            label="Keterangan Rapat Pembahasan"
            value={getField("Keterangan Rapat Pembahasan")}
          />
          <RegulationDetail
            label="Tahapan"
            value={getField("Tahapan")}
          />
        </div> */}
      </div>

      <div className="mt-auto pt-2">
        <Link
          to={regulation.slug ? `/site-pages/propemperda/${regulation.slug}` : "#"}
          className={`flex items-center text-green-600 hover:text-green-800 font-medium text-sm ${
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
