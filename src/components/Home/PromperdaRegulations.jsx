import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function PromperdaRegulations() {
  const regulations = [
    {
      id: 1,
      title: "Rancangan Peraturan Daerah Provinsi Jawa Timur tentang Pemajuan Kebudayaan Jawa Timur",
      year: "2010",
      date:"02-01-2024",
      discussionMeeting:"Masa Sidang I",
      stages:"Penyusunan"

    },
    {
      id: 2,
      title: "Rancangan Peraturan Daerah Provinsi Jawa Timur tentang Pemajuan Kebudayaan Jawa Timur",
      year: "2010",
      date:"02-01-2024",
      discussionMeeting:"Masa Sidang I",
      stages:"Penyusunan"

    },
    {
      id: 3,
      title: "Rancangan Peraturan Daerah Provinsi Jawa Timur tentang Pemajuan Kebudayaan Jawa Timur",
      year: "2010",
      date:"02-01-2024",
      discussionMeeting:"Masa Sidang I",
      stages:"Penyusunan"

    },
  ];

  return (
    <section className="py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-blue-900">Dokumen Promperda</h2>
            <p className="text-gray-600">Koleksi Dokumen Promperda terbaru milik Biro Hukum Provinsi Jawa Timur</p>
          </div>
          <Link
            href="/peraturan"
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm border border-blue-600 rounded px-4 py-2 transition-colors"
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
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{regulation.title}</h3>

      <div className="space-y-2 mb-6">
        <RegulationDetail label="Tahun Promperda" value={regulation.year} />
        <RegulationDetail label="Tanggal Rapat Pembahasan " value={regulation.date} />
        <RegulationDetail label="Keterangan Rapat Pembahasan" value={regulation.discussionMeeting} />
        <RegulationDetail label="Tahapan Promperda" value={regulation.stages} />
      </div>

      <Link
      href={`/peraturan/${regulation.id}`}
      className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
    >
      Lihat Selengkapnya <ArrowUpRight className="ml-1 h-4 w-4" />
    </Link>
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
