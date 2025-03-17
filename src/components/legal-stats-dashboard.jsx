import { FileText, Scale, FileSpreadsheet, Book } from "lucide-react"

export default function LegalStatsDashboard() {
  return (
    <div className="w-full">
      {/* Statistics Dashboard Section */}
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
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-blue-900/80" />

        {/* Content container with relative positioning to appear above the overlay */}
        <div className="relative z-10 h-full flex flex-col">
          <h1 className="text-2xl md:text-3xl font-semibold mb-8">Statistik Dokumen JDIH Provinsi Jawa Timur</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12" style={{ gap: "48px" }}>
            {/* Dokumen Peraturan */}
            <div className="bg-blue-600 rounded-lg p-6 flex items-center">
              <div className="mr-4">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">Dokumen Peraturan</p>
                <p className="text-3xl font-bold mt-1">7000+</p>
              </div>
            </div>

            {/* Monografi Hukum */}
            <div className="bg-blue-600 rounded-lg p-6 flex items-center">
              <div className="mr-4">
                <Scale className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">Monografi Hukum</p>
                <p className="text-3xl font-bold mt-1">1800+</p>
              </div>
            </div>

            {/* Artikel Hukum */}
            <div className="bg-blue-600 rounded-lg p-6 flex items-center">
              <div className="mr-4">
                <FileSpreadsheet className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">Artikel Hukum</p>
                <p className="text-3xl font-bold mt-1">100+</p>
              </div>
            </div>

            {/* Staatsblad */}
            <div className="bg-blue-600 rounded-lg p-6 flex items-center">
              <div className="mr-4">
                <Book className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">Staatsblad</p>
                <p className="text-3xl font-bold mt-1">80+</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* JDIH Information Section */}
      <div className="w-full bg-blue-50 p-6 md:p-8 flex justify-center mt-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 max-w-4xl">
          <div className="flex-shrink-0">
            <img
            src="./src/assets/nav-logo/FINAL.png"
              alt="JDIH Jawa Timur Mascot"
              width={70}
              height={150}
              className="object-contain"
            />
          </div>
          <div>
            <h2 className="text-blue-800 text-4xl font-bold mb-3 text-center md:text-left pb-6 ">JDIH JAWA TIMUR</h2>
            <p className="text-gray-700 text-l leading-relaxed">
              Situs ini merupakan situs resmi JDIH Biro Hukum Provinsi Jawa Timur. Situs ini memuat data dan informasi
              mengenai produk hukum baik produk hukum pusat maupun daerah. Disamping itu, situs ini memuat pula
              informasi mengenai buku-buku referensi tentang hukum yang dimiliki oleh Biro Hukum Provinsi Jawa Timur.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

