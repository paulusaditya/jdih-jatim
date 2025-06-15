export default function KomentarPage() {
  const comments = [
    {
      id: 1,
      name: "Citra Lestari",
      time: "7 jam lalu",
      avatar: "bg-yellow-500",
      text: "Saya setuju dengan poin - poin yang diusulkan dalam peraturan ini. Akan sangat berguna bagi masyarakat.",
    },
    {
      id: 2,
      name: "Citra Lestari",
      time: "7 jam lalu",
      avatar: "bg-blue-400",
      text: "Menurut saya ini merupakan langkah maju untuk kesejahteraan karyawan. Namun perlu diperhatikan juga dampak terhadap perusahaan kecil, agar tidak memberatkan mereka dalam menjalankan bisnis mereka. Evaluasi dan diskusi lebih lanjut diperlukan.",
    },
    {
      id: 3,
      name: "Roby Maulana",
      time: "15 jam lalu",
      avatar: "bg-orange-500",
      text: "Saya mendukung adanya ini untuk melindungi kepentingan! Namun dari sisi industri, ada beberapa poin yang perlu dibahas agar tidak memberatkan perusahaan kecil dan menengah.",
    },
    {
      id: 4,
      name: "Ardiansyah",
      time: "1 hari lalu",
      avatar: "bg-gray-600",
      text: "Peraturan ini sangat bermanfaat untuk perlindungan. Saya harap ada sosialisasi khusus untuk sektor yang selama ini kurang mendapat perlindungan yang memadai.",
    },
    {
      id: 5,
      name: "Bambang Sucipto",
      time: "2 hari lalu",
      avatar: "bg-gray-800",
      text: "Menurut saya, hal ini memberikan kejelasan hukum bagi karyawan. Masyarakat ingin tahu juga regulasi bukan hanya dari sisi & juga sertifikat.",
    },
    {
      id: 6,
      name: "Rgan",
      time: "3 hari lalu",
      avatar: "bg-amber-600",
      text: "Saya harap dengan adanya yang mengatur tentang kesejahteraan. Semoga bisa menjamin keselamatan dan memberikan keadilan untuk semua pihak.",
    },
    {
      id: 7,
      name: "Erik Samuel",
      time: "5 hari lalu",
      avatar: "bg-teal-500",
      text: "Saya setuju dengan poin - poin yang diusulkan dalam peraturan ini. Akan sangat berguna bagi masyarakat.",
    },
    {
      id: 8,
      name: "Irdah Wulandari",
      time: "12 hari lalu",
      avatar: "bg-gray-700",
      text: "Saya setuju dengan poin - poin yang diusulkan dalam peraturan ini. Akan sangat berguna bagi masyarakat.",
    },
    {
      id: 9,
      name: "Angelina",
      time: "22 hari lalu",
      avatar: "bg-gray-800",
      text: "Saya setuju dengan poin - poin yang diusulkan dalam peraturan ini. Akan sangat berguna bagi masyarakat.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-green-700 mb-2">
          Peraturan Daerah Tentang Pekerja
          <br />
          Perusahaan Tahun 2024
        </h1>

        <div className="flex flex-col md:flex-row gap-8 mt-8">
          {/* Comments Section */}
          <div className="flex-1">
            <h2 className="text-lg font-medium text-gray-800 mb-6">Komentar</h2>

            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  {/* Avatar */}
                  <div
                    className={`w-10 h-10 rounded-full ${comment.avatar} flex items-center justify-center flex-shrink-0`}
                  >
                    <span className="text-white font-medium text-sm">
                      {comment.name.charAt(0)}
                    </span>
                  </div>

                  {/* Comment Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-gray-900">
                        {comment.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {comment.time}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {comment.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment Form */}
            <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-6">
                Berikan Komentar
              </h2>
              <div className="flex gap-4">
                {/* User Avatar */}
                <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium">U</span>
                </div>

                {/* Comment Input */}
                <div className="flex-1">
                  <textarea
                    placeholder="Tambahkan Komentar"
                    className="w-full h-32 p-4 border-0 resize-none focus:outline-none text-gray-700 placeholder-gray-400"
                    style={{ minHeight: "120px" }}
                  />

                  {/* Submit Button */}
                  <div className="flex justify-end mt-4">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Kirim
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Document Preview */}
          <div className="w-full md:w-80 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="w-full h-96 bg-gray-50 flex flex-col">
                {/* Document header */}
                <div className="p-4 border-b border-gray-200 text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-lg">🏛️</span>
                  </div>
                  <div className="text-xs text-gray-600 leading-tight">
                    PEMERINTAH DAERAH
                    <br />
                    PROVINSI JAWA TENGAH
                  </div>
                </div>

                {/* Document content */}
                <div className="p-4 flex-1">
                  <div className="space-y-2">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="h-2 bg-gray-300 rounded"
                        style={{ width: `${Math.random() * 40 + 60}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Document title at bottom */}
              <div className="p-3 bg-gray-100 border-t border-gray-200">
                <p className="text-xs text-gray-600 text-center">
                  Peraturan Daerah Tentang Pekerja
                  <br />
                  Perusahaan Tahun 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
