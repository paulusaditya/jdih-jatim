"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../config/api";

export default function JDIHUniversityMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseUrl}/home/partner-universities`)
      .then((response) => {
        setMembers(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching university members:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-8 mt-10">
          Anggota Jaringan JDIH Provinsi Jawa Timur Perguruan Tinggi
        </h2>

        {loading ? (
          <div className="grid gap-6 justify-items-center grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="w-[182px] h-[212px] bg-gray-200 animate-pulse rounded-2xl"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 justify-items-center grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {members.map((member) => (
              <MemberCard
                key={member.id}
                name={member.title}
                logo={member.image}
                link={member.link}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function MemberCard({ name, logo, link }) {
  return (
    <a
      href={link !== "#" ? link : undefined}
      target={link !== "#" ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="border border-gray-200 rounded-2xl p-5 flex flex-col items-center justify-center hover:border-green-600 hover:bg-[#F0F6FF] transition-all cursor-pointer bg-white"
      style={{ width: "182px", height: "212px", padding: "15px" }}
    >
      <div className="text-xl mb-3 w-full h-full">
        <img
          src={logo || "/placeholder.svg"}
          alt={`Logo ${name}`}
          className="object-contain w-full h-full"
          onError={(e) => (e.target.src = "/placeholder.svg")}
        />
      </div>
    </a>
  );
}
