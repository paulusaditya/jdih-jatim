import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export default function PropemperdaRegulations() {
  const [regulations, setRegulations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://54.169.231.19/api/v2/home/propemperda")
      .then((response) => {
        const shuffledData = shuffleArray(response.data.data || []); // Acak data
        setRegulations(shuffledData.slice(0, 3)); // Ambil 3 data acak
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-blue-900">Dokumen Propemperda</h2>
            <p className="text-gray-600">
              Koleksi Dokumen Propemperda terbaru milik Biro Hukum Provinsi Jawa Timur
            </p>
          </div>
          <Link
            to="/dokumentasi/propemperda"
            className="flex items-center font-medium text-sm border rounded px-4 py-2 transition-colors text-blue-600 border-blue-600 hover:text-blue-800"
          >
            <span className="hidden md:inline">LIHAT SEMUA</span>
            <ArrowRight className="ml-1 h-4 w-4 md:h-5 md:w-5" />
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Memuat data...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regulations.map((regulation) => (
              <RegulationCard key={regulation.id} regulation={regulation} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Fungsi untuk mengacak urutan array
function shuffleArray(array) {
  return array
    .map((item) => ({ item, sort: Math.random() })) // Tambahkan nilai random
    .sort((a, b) => a.sort - b.sort) // Urutkan berdasarkan nilai random
    .map(({ item }) => item); // Kembalikan array dalam urutan acak
}

function RegulationCard({ regulation }) {
  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-gray-900 leading-tight mb-3">
        {regulation.title}
      </h3>

      <div className="text-sm text-gray-600 space-y-6 mb-4">
        <RegulationDetail label="Tahun Promperda" value={regulation.fields?.find(f => f.title.includes("Tahun"))?.details || "-"} />
        <RegulationDetail label="Tanggal Rapat Pembahasan" value={regulation.fields?.find(f => f.title.includes("Tanggal Rapat Pembahasan"))?.details || "-"} />
        <RegulationDetail label="Keterangan Rapat Pembahasan" value={regulation.fields?.find(f => f.title.includes("Keterangan Rapat Pembahasan"))?.details || "-"} />
        <RegulationDetail label="Tahapan" value={regulation.fields?.find(f => f.title.includes("Tahapan"))?.details || "-"} />
      </div>

      <Link
        to={regulation.link}
        className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
      >
        Lihat Selengkapnya <ArrowUpRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
}

function RegulationDetail({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}:</span>
      <span className="text-gray-900 font-medium">{value}</span>
    </div>
  );
}
