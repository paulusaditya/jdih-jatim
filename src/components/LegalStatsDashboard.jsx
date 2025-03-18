import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { FileText, Scale, FileSpreadsheet, Book } from "lucide-react";

export default function LegalStatsDashboard() {
  const controls = useAnimation();
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start("visible");
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [controls]);

  useEffect(() => {
    if (isVisible) {
      const animateNumbers = (id, targetValue) => {
        let start = 0;
        const duration = 1500; // 1.5 seconds
        const step = (timestamp, startTime) => {
          const progress = Math.min((timestamp - startTime) / duration, 1);
          setCounts((prev) => ({ ...prev, [id]: Math.floor(progress * targetValue) }));

          if (progress < 1) {
            requestAnimationFrame((ts) => step(ts, startTime));
          }
        };
        requestAnimationFrame((ts) => step(ts, ts));
      };

      animateNumbers(1, 7000);
      animateNumbers(2, 1800);
      animateNumbers(3, 100);
      animateNumbers(4, 80);
    }
  }, [isVisible]);

  const stats = [
    { id: 1, icon: <FileText className="h-10 w-10 text-white" />, label: "Dokumen Peraturan", value: 7000 },
    { id: 2, icon: <Scale className="h-10 w-10 text-white" />, label: "Monografi Hukum", value: 1800 },
    { id: 3, icon: <FileSpreadsheet className="h-10 w-10 text-white" />, label: "Artikel Hukum", value: 100 },
    { id: 4, icon: <Book className="h-10 w-10 text-white" />, label: "Staatsblad", value: 80 },
  ];

  return (
    <div className="w-full">
      <div
        className="text-white w-full relative"
        style={{
          backgroundImage: "url('./src/assets/image 48.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "348px",
          padding: "72px",
        }}
      >
        <div className="absolute inset-0 bg-blue-900/80" />
        <div className="relative z-10 h-full flex flex-col">
          <h1 className="text-2xl md:text-3xl font-semibold mb-8">
            Statistik Dokumen JDIH Provinsi Jawa Timur
          </h1>
          <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((item) => (
              <motion.div
                key={item.id}
                className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl p-6 flex items-center shadow-lg"
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
              >
                <div className="mr-4">{item.icon}</div>
                <div>
                  <p className="text-white text-lg font-medium">{item.label}</p>
                  <p className="text-white text-4xl font-bold mt-1">
                    {counts[item.id]}+
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full bg-blue-50 p-6 md:p-8 flex justify-center mt-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 max-w-4xl">
          <div className="flex-shrink-0">
            <img
              src="./src/assets/nav-logo/logo3.png"
              alt="JDIH Jawa Timur Mascot"
              width={70}
              height={150}
              className="object-contain"
            />
          </div>
          <div>
            <h2 className="text-blue-800 text-4xl font-bold mb-3 text-center md:text-left pb-6">
              JDIH JAWA TIMUR
            </h2>
            <p className="text-gray-700 text-l leading-relaxed">
              Situs ini merupakan situs resmi JDIH Biro Hukum Provinsi Jawa Timur. Situs ini memuat data dan informasi
              mengenai produk hukum baik produk hukum pusat maupun daerah. Disamping itu, situs ini memuat pula
              informasi mengenai buku-buku referensi tentang hukum yang dimiliki oleh Biro Hukum Provinsi Jawa Timur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}