"use client"

export default function JDIHUniversityMembers() {
  const initialMembers = [
    { name: "Universitas Airlangga", logo: "/assets/univ/image 65.png?height=80&width=80" },
    { name: "UIN Sunan Ampel Surabaya", logo: "/assets/univ/image 66.png?height=80&width=80" },
    { name: "Universitas Negeri Surabaya", logo: "/assets/univ/image 67.png?height=80&width=80" },
    { name: "Universitas Negeri Jember", logo: "/assets/univ/image 68.png?height=80&width=80" },
    { name: "Universitas Trunojoyo Madura", logo: "/assets/univ/image 79.png?height=80&width=80" },
    { name: "Universitas Narotama", logo: "/assets/univ/image 78.png?height=80&width=80" },
  ]

  return (
    <section className="py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-8 text-center mt-10">Anggota Jaringan JDIH Provinsi Jawa Timur Perguruan Tinggi</h2>

        <div className="grid gap-6 justify-items-center grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {initialMembers.map((member, index) => (
            <MemberCard
              key={index}
              name={member.name}
              logo={member.logo}
              style={{
                width: '182px',
                height: '212px',
                borderRadius: '2xl',
                padding: '15px',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function MemberCard({ name, logo, style = {} }) {
  return (
    <div
      className="border border-gray-200  rounded-2xl p-5 flex flex-col items-center justify-center  hover:border-blue-600 hover:bg-[#F0F6FF] transition-all cursor-pointer bg-white"
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
