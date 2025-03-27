"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

export default function JDIHNetworkMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Fetch data dari API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("http://54.169.231.19/api/v2/home/partner-affiliates");
        if (!response.ok) {
          throw new Error("Gagal mengambil data anggota JDIH");
        }
        const data = await response.json();
        setMembers(data.data); // Sesuaikan dengan struktur API yang diterima
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Memuat...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  // Bagi data untuk "Lihat Semua"
  const initialMembers = members.slice(0, 12);
  const allMembers = showAll ? members : initialMembers;

  return (
    <section className="py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900">
            Anggota Jaringan JDIH Provinsi Jawa Timur
          </h2>
          <button
            onClick={() => setShowAll(!showAll)}
            className={`flex items-center font-medium text-sm border rounded px-4 py-2 transition-colors ${
              showAll
                ? "bg-pink-100 text-pink-600 border-pink-300"
                : "text-blue-600 border-blue-600 hover:text-blue-800"
            }`}
          >
            <span className="hidden md:inline">
              {showAll ? "LIHAT SEDIKIT" : "LIHAT SEMUA"}
            </span>
            <ArrowRight className="ml-1 h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>

        <div
          className={`grid gap-6 justify-items-center transition-all duration-500 ease-in-out ${
            showAll
              ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6"
              : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
          }`}
        >
          {allMembers.map((member, index) => (
            <MemberCard
              key={member.id}
              logo={member.image}
              link={member.link}
              className="animate-fadeIn"
              style={{
                animationDelay: `${index * 0.05}s`,
                width: showAll ? "287px" : "182px",
                height: showAll ? "188px" : "212px",
                borderRadius: showAll ? "16px" : "2xl",
                padding: showAll ? "20px" : "15px",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MemberCard({ logo, link, className = "", style = {} }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`border border-gray-200 rounded-2xl p-5 flex items-center justify-center hover:bg-[#F0F6FF] hover:border-blue-600 hover:shadow-md transition-all cursor-pointer bg-white ${className}`}
      style={style}
    >
      <img
        src={logo || "/placeholder.svg"}
        alt="Logo Kabupaten"
        className="object-contain w-full h-full"
      />
    </a>
  );
}
