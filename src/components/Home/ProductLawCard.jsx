import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Produk Hukum Provinsi Jawa Timur",
    description: "Monografi hukum JDIH Jatim: referensi mendalam tentang peraturan dan kebijakan.",
    path: "/peraturan/produk-hukum-jatim",
  },
  {
    title: "Produk Hukum Kabupaten / Kota",
    description: "JDIH Jatim menyediakan Staatsblad sebagai referensi hukum bersejarah.",
    path: "/peraturan/produk-hukum-kabupatenkota",
  },
  {
    title: "Produk Hukum Desa",
    description: "JDIH Jatim menyediakan Staatsblad sebagai referensi hukum bersejarah.",
    path: "/peraturan/produk-hukum-desa",
  },
  {
    title: "Peraturan Alih Bahasa",
    description: "JDIH Jatim menyediakan Staatsblad sebagai referensi hukum bersejarah.",
    path: "/peraturan/peraturan-alih-bahasa",
  },
];

export default function LegalPortal() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-2">
        Produk Hukum Jawa Timur
      </h1>
      <p className="text-center text-gray-800 mb-8">
        Akses Dokumen Hukum Provinsi Jawa Timur.
      </p>

      <motion.div 
        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            path={card.path}
          />
        ))}
      </motion.div>
    </div>
  );
}

function Card({ title, description, path }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        to={path}
        className="block p-6 rounded-2xl border border-gray-200 hover:border-[#0065FF] hover:shadow-md transition-all"
      >
        <h2 className="font-bold mb-2 text-l">{title}</h2>
        <p className="text-gray-500 text-sm">{description}</p>
      </Link>
    </motion.div>
  );
}
