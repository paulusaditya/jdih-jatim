"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import LoadingSpinner from "../common/LoadingSpinner";
import baseUrl from "../../config/api";

export default function JDIHNetworkMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchAllMembers = async () => {
      setLoading(true);
      setError(null);

      let allData = [];
      let currentPage = 1;
      let lastPage = 1;

      try {
        while (currentPage <= lastPage) {
          const response = await fetch(
            `${baseUrl}/home/partner-affiliates?page=${currentPage}`
          );
          if (!response.ok) {
            throw new Error("Gagal mengambil data anggota JDIH");
          }

          const result = await response.json();
          const { data, pagination } = result;

          allData = [...allData, ...data];
          lastPage = pagination?.last_page || 1;
          currentPage++;
        }

        setMembers(allData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMembers();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  const initialMembers = members.slice(0, 12);
  const allMembers = showAll ? members : initialMembers;

  return (
    <section className="py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800">
            Anggota Jaringan JDIH Provinsi Jawa Timur
          </h2>
          <button
            onClick={() => setShowAll(!showAll)}
            className={`flex items-center font-medium text-sm border rounded px-4 py-2 transition-colors ${
              showAll
                ? "bg-pink-100 text-pink-600 border-pink-300"
                : "text-green-600 border-green-600 hover:text-green-800"
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
                padding: showAll ? "5px" : "15px",
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
      className={`aspect-[4/3] w-full max-w-[185px] sm:max-w-[180px] md:max-w-[200px] lg:max-w-[220px] rounded-2xl p-4 bg-white border border-gray-200 hover:bg-[#F0F6FF] hover:border-green-600 hover:shadow-md transition-all flex items-center justify-center ${className}`}
      style={style}
    >
      <img
        src={logo || "/placeholder.svg"}
        alt="Logo Kabupaten"
        className="object-contain max-h-full max-w-full"
        onError={(e) => (e.target.src = "/placeholder.svg")}
      />
    </a>
  );
}
