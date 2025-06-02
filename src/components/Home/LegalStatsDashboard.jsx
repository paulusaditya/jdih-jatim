"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { FileText, Scale, FileSpreadsheet, Book } from "lucide-react";
import baseUrl from "../../config/api";

export default function LegalStatsDashboard() {
  const controls = useAnimation();
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    produkHukum: 0,
    monografi: 0,
    artikel: 0,
    staatsblad: 0,
  });

  const [animatedCounts, setAnimatedCounts] = useState({
    produkHukum: 0,
    monografi: 0,
    artikel: 0,
    staatsblad: 0,
  });

  useEffect(() => {
    fetch(`${baseUrl}/sections/active-topics-count`)
      .then((response) => response.json())
      .then((data) => {
        const produkHukum = data.data.find(
          (item) => item.title === "Produk Hukum"
        );
        const monografi = data.data.find((item) => item.title === "Monografi");
        const artikel = data.data.find((item) => item.title === "Artikel");
        const staatsblad = data.data.find(
          (item) => item.title === "Staatsblad"
        );

        setCounts({
          produkHukum: produkHukum?.count || 0,
          monografi: monografi?.count || 0,
          artikel: artikel?.count || 0,
          staatsblad: staatsblad?.count || 0,
        });
      })
      .catch((error) => {
        console.error("Error fetching active topics count:", error);
      });

    // Mock data untuk demo
    // setCounts({
    //   produkHukum: 7000,
    //   monografi: 1800,
    //   artikel: 100,
    //   staatsblad: 80,
    // });
  }, []);

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
      const animateNumbers = (key, targetValue) => {
        const duration = 1500;
        const startTime = performance.now();

        const step = (currentTime) => {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          setAnimatedCounts((prev) => ({
            ...prev,
            [key]: Math.floor(progress * targetValue),
          }));

          if (progress < 1) {
            requestAnimationFrame(step);
          }
        };

        requestAnimationFrame(step);
      };

      animateNumbers("produkHukum", counts.produkHukum);
      animateNumbers("monografi", counts.monografi);
      animateNumbers("artikel", counts.artikel);
      animateNumbers("staatsblad", counts.staatsblad);
    }
  }, [isVisible, counts]);

  const stats = [
    {
      key: "produkHukum",
      icon: <FileText className="h-10 w-10 text-white" />,
      label: "Dokumen Peraturan",
    },
    {
      key: "monografi",
      icon: <Scale className="h-10 w-10 text-white" />,
      label: "Monografi Hukum",
    },
    {
      key: "artikel",
      icon: <FileSpreadsheet className="h-10 w-10 text-white" />,
      label: "Artikel Hukum",
    },
    {
      key: "staatsblad",
      icon: <Book className="h-10 w-10 text-white" />,
      label: "Staatsblad",
    },
  ];

  return (
    <div className="w-full">
      <div
        className="text-white w-full relative bg-green-700"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          minHeight: "348px",
          padding: "24px",
        }}
      >
        <div className="absolute inset-0 bg-[rgba(0,33,105,0.24)]" />
        <div className="relative z-10 h-full flex flex-col p-4 sm:p-6 md:p-12 lg:p-16">
          <h1 className="text-2xl md:text-3xl font-semibold mb-4 sm:mb-8">
            Statistik Dokumen JDIH Provinsi Jawa Timur
          </h1>
          <div
            ref={ref}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12"
          >
            {stats.map((item) => (
              <motion.div
                key={item.key}
                role="region"
                aria-label={`Statistik ${item.label}`}
                className="flex flex-col gap-3 items-start p-5 rounded-2xl flex-[1_0_0] max-md:p-4 max-sm:p-3"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(34, 197, 94, 0.8) 0%, rgba(34, 197, 94, 0.6) 40%, rgba(34, 197, 94, 0.3) 70%, rgba(34, 197, 94, 0) 100%)",
                }}
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6 },
                  },
                }}
              >
                <h2 className="self-stretch text-base leading-6 text-white max-sm:text-sm max-sm:leading-5">
                  {item.label}
                </h2>
                <div className="flex gap-3.5 items-center self-stretch">
                  {item.icon}
                  <span
                    className="text-3xl font-bold leading-10 text-white max-md:text-2xl max-md:leading-8 max-sm:text-xl max-sm:leading-7"
                    aria-label={`Over ${animatedCounts[item.key]} documents`}
                  >
                    {animatedCounts[item.key]}+
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 