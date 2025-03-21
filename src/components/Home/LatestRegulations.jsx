import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function LatestRegulations() {
  const regulations = [
    {
      id: 1,
      title: "PEMBENTUKAN ORGANISASI DAN TATA KERJA DEWAN RISET DAERAH PROVINSI JAWA TIMUR",
      type: "Peraturan Gubernur",
      number: "50",
      year: "2010",
      abbreviation: "PERGUB",
      stipulationDate: "01-01-1970",
      promulgationDate: "01-01-1970",
      place: "Surabaya",
    },
    {
      id: 2,
      title: "PEMBENTUKAN ORGANISASI DAN TATA KERJA DEWAN RISET DAERAH PROVINSI JAWA TIMUR",
      type: "Peraturan Gubernur",
      number: "50",
      year: "2010",
      abbreviation: "PERGUB",
      stipulationDate: "01-01-1970",
      promulgationDate: "01-01-1970",
      place: "Surabaya",
    },
    {
      id: 3,
      title: "PEMBENTUKAN ORGANISASI DAN TATA KERJA DEWAN RISET DAERAH PROVINSI JAWA TIMUR",
      type: "Peraturan Gubernur",
      number: "50",
      year: "2010",
      abbreviation: "PERGUB",
      stipulationDate: "01-01-1970",
      promulgationDate: "01-01-1970",
      place: "Surabaya",
    },
  ];

  return (
    <section className="py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-blue-900">Dokumen Peraturan Terbaru</h2>
            <p className="text-gray-600">Dokumen peraturan terbaru di Jawa Timur</p>
          </div>
          <Link
            to="/peraturan"
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
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{regulation.title}</h3>

      <div className="space-y-2 mb-6">
        <RegulationDetail label="Jenis Peraturan" value={regulation.type} />
        <RegulationDetail label="Nomor" value={regulation.number} />
        <RegulationDetail label="Tahun Terbit" value={regulation.year} />
        <RegulationDetail label="Singkatan Jenis" value={regulation.abbreviation} />
        <RegulationDetail label="Tanggal Penetapan" value={regulation.stipulationDate} />
        <RegulationDetail label="Tanggal Pengundangan" value={regulation.promulgationDate} />
        <RegulationDetail label="Tempat Terbit" value={regulation.place} />
      </div>

      <Link
        to={`/peraturan/${regulation.id}`}
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
