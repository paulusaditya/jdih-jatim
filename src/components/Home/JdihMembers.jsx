"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

export default function JDIHNetworkMembers() {
  const [showAll, setShowAll] = useState(false)

  const initialMembers = [
    { name: "Kota Surabaya", logo: "/assets/jatim/image 59.png?height=80&width=80" },
    { name: "Kota Malang", logo: "/assets/jatim/image 60.png?height=80&width=80" },
    { name: "Kota Batu", logo: "/assets/jatim/image 61.png?height=80&width=80" },
    { name: "Kota Blitar", logo: "/assets/jatim/image 62.png?height=80&width=80" },
    { name: "Kota Madiun", logo: "/assets/jatim/image 63.png?height=80&width=80" },
    { name: "Kota Kediri", logo: "/assets/jatim/image 64.png?height=80&width=80" },
    { name: "Kota Mojokerto", logo: "/assets/jatim/image.png?height=80&width=80" },
    { name: "Kota Pasuruan", logo: "/assets/jatim/image 77.png?height=80&width=80" },
    { name: "Kota Probolinggo", logo: "/assets/jatim/image 97.png?height=80&width=80" },
    { name: "Kabupaten Tulungagung", logo: "/assets/jatim/image-1.png?height=80&width=80" },
    { name: "Kabupaten Tuban", logo: "/assets/jatim/image-2.png?height=80&width=80" },
    { name: "Kabupaten Trenggalek", logo: "/assets/jatim/image 108.png?height=80&width=80" },
  ]

  const additionalMembers = [
    { name: "Kabupaten Sumenep", logo: "/assets/jatim/image-3.png?height=80&width=80" },
    { name: "Kabupaten Situbondo", logo: "/assets/jatim/image 91.png?height=80&width=80" },
    { name: "Kabupaten Sidoarjo", logo: "/assets/jatim/image-4.png?height=80&width=80" },
    { name: "Kabupaten Sampang", logo: "/assets/jatim/image-5.png?height=80&width=80" },
    { name: "Kabupaten Probolinggo", logo: "/assets/jatim/image 96.png?height=80&width=80" },
    { name: "Kabupaten Ponorogo", logo: "/assets/jatim/image 92.png?height=80&width=80" },
    { name: "Kabupaten Pasuruan", logo: "/assets/jatim/image-6.png?height=80&width=80" },
    { name: "Kabupaten Pamekasan", logo: "/assets/jatim/image-7.png?height=80&width=80" },
    { name: "Kabupaten Pacitan", logo: "/assets/jatim/image-8.png?height=80&width=80" },
    { name: "Kabupaten Ngawi", logo: "./assets/jatim/image-9.png?height=80&width=80" },
    { name: "Kabupaten Nganjuk", logo: "/assets/jatim/image 94.png?height=80&width=80" },
    { name: "Kabupaten Mojokerto", logo: "/assets/jatim/image-10.png?height=80&width=80" },
    { name: "Kabupaten Malang", logo: "/assets/jatim/image-11.png?height=80&width=80" },
    { name: "Kabupaten Magetan", logo: "/assets/jatim/image-12.png?height=80&width=80" },
    { name: "Kabupaten Madiun", logo: "/assets/jatim/image-13.png?height=80&width=80" },
    { name: "Kabupaten Lumajang", logo: "/assets/jatim/image 95.png?height=80&width=80" },
    { name: "Kabupaten Lamongan", logo: "/assets/jatim/image 98.png?height=80&width=80" },
    { name: "Kabupaten Kediri", logo: "/assets/jatim/image 99.png?height=80&width=80" },
    { name: "Kabupaten Jombang", logo: "/assets/jatim/image 100.png?height=80&width=80" },
    { name: "Kabupaten Jember", logo: "/assets/jatim/image 101.png?height=80&width=80" },
    { name: "Kabupaten Gresik", logo: "/assets/jatim/image 102.png?height=80&width=80" },
    { name: "Kabupaten Bondowoso", logo: "/assets/jatim/image 103.png?height=80&width=80" },
    { name: "Kabupaten Bojonegoro", logo: "/assets/jatim/image 104.png?height=80&width=80" },
    { name: "Kabupaten Blitar", logo: "/assets/jatim/image 105.png?height=80&width=80" },
    { name: "Kabupaten Banyuwangi", logo: "/assets/jatim/image 106.png?height=80&width=80" },
    { name: "Kabupaten Bangkalan", logo: "/assets/jatim/image 107.png?height=80&width=80" },
  ]

  const allMembers = [...initialMembers, ...(showAll ? additionalMembers : [])]

  return (
    <section className="py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900">Anggota Jaringan JDIH Provinsi Jawa Timur</h2>
          <button
            onClick={() => setShowAll(!showAll)}
            className={`flex items-center font-medium text-sm border rounded px-4 py-2 transition-colors ${showAll ? "bg-pink-100 text-pink-600 border-pink-300" : "text-blue-600 border-blue-600 hover:text-blue-800"}`}
          >
            LIHAT SEMUA <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>

        <div
          className={`grid gap-6 justify-items-center transition-all duration-500 ease-in-out ${
            showAll
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
          }`}
        >
          {allMembers.map((member, index) => (
            <MemberCard
              key={index}
              name={member.name}
              logo={member.logo}
              className="animate-fadeIn"
              style={{
                animationDelay: `${index * 0.05}s`,
                width: showAll ? '287px' : '182px',
                height: showAll ? '188px' : '212px',
                borderRadius: showAll ? '16px' : '2xl',
                padding: showAll ? '20px' : '15px',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function MemberCard({ name, logo, className = "", style = {} }) {
  return (
    <div
      className={`border border-gray-200 rounded-2xl p-5 flex flex-col items-center justify-center hover:bg-[#F0F6FF] hover:border-blue-600 hover:shadow-md transition-all cursor-pointer bg-white ${className}`}
      style={style}
    >
      <div className="text-xl mb-3">
        {/* Using regular img tag as requested */}
        <img src={logo || "/placeholder.svg"} alt={`Logo ${name}`} className="object-contain w-full h-full" />
      </div>
      <p className="text-center text-l font-semibold text-blue-950 mb-3">{name}</p>
    </div>
  )
}
