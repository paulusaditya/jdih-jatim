import { Link } from "react-router-dom";

export default function LegalPortal() {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-2">
          Produk Hukum Jawa Timur
        </h1>
        <p className="text-center text-gray-800 mb-8">
          Akses Dokumen Hukum Provinsi Jawa Timur.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <Card
            title="Produk Hukum Provinsi Jawa Timur"
            description="Monografi hukum JDIH Jatim: referensi mendalam tentang peraturan dan kebijakan."
          />
          <Card
            title="Produk Hukum Kabupaten / Kota"
            description="JDIH Jatim menyediakan Staatsblad sebagai referensi hukum bersejarah."
          />
          <Card
            title="Produk Hukum Desa"
            description="JDIH Jatim menyediakan Staatsblad sebagai referensi hukum bersejarah."
          />
          <Card
            title="Peraturan Alih Bahasa"
            description="JDIH Jatim menyediakan Staatsblad sebagai referensi hukum bersejarah."
          />
        </div>
      </div>
    );
}

function Card({ title, description }) {
    return (
      <Link
        to="#"
        className="block p-6 rounded-2xl border border-gray-400 hover:border-[#0065FF] hover:shadow-md transition-all"
      >
        <h2 className="font-bold mb-2 text-l">{title}</h2>
        <p className="text-gray-500 text-sm">{description}</p>
      </Link>
    );
}
