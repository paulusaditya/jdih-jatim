import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Produk Hukum Provinsi Jawa Timur",
    description: "Dapatkan semua produk hukum Provinsi Jawa Timur disini.",
    path: "/peraturan/produk-hukum-jatim",
    icon: "/assets/icn/icn.png",
  },
  {
    title: "Produk Hukum Kabupaten / Kota",
    description: "Tersedia produk hukum Kab/Kota yang ada di Jawa Timur.",
    path: "/peraturan/produk-hukum-kabupatenkota",
    icon: "/assets/icn/icn1.png",
  },
  {
    title: "Produk Hukum Desa",
    description:
      "Pedesaan juga memiliki hukumnya tersendiri, cek disini sekarang.",
    path: "/peraturan/produk-hukum-desa",
    icon: "/assets/icn/icn2.png",
  },
  {
    title: "Peraturan Alih Bahasa",
    description: "Dengan bahasa yang mudah dipahami versi Internasional.",
    path: "/peraturan/peraturan-alih-bahasa",
    icon: "/assets/icn/icn3.png",
  },
];

export default function LegalPortal() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-green-800 mb-2">
        Produk Hukum Jawa Timur
      </h1>
      <p className="text-center text-gray-800 mb-8">
        Akses Dokumen Hukum Provinsi Jawa Timur.
      </p>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10"
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
            icon={card.icon}
          />
        ))}
      </motion.div>
    </div>
  );
}

function Card({ title, description, path, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        to={path}
        className="w-full sm:w-auto max-w-[300px] h-full min-h-[200px] p-4 rounded-2xl border border-gray-200 hover:border-[#0065FF] hover:shadow-md transition-all flex flex-col justify-between"
      >
        <div>
          <img src={icon} alt={title} className="w-12 h-12 mb-4" />
          <h2 className="font-bold mb-2 text-l">{title}</h2>
          <p className="text-gray-500 text-xs">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
}
