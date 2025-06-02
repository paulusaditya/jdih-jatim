export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-8 py-12">
        {/* Judul Halaman */}
        <h1 className="text-2xl font-bold text-green-900 mb-6">Tentang Kami</h1>

        {/* Pengantar */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-green-800 mb-2">Pengantar</h2>
          <p className="text-gray-700 leading-relaxed">
            Dalam rangka mewujudkan tujuan JDIH dalam menciptakan suatu kemampuan (unit dan aparatur) menyediakan 
            peraturan dan dokumen hukum yang tepat dalam waktu yang singkat dengan biaya serendah mungkin serta 
            terjalin komunikasi antar anggota jaringan, maka Biro Hukum Sekretariat Daerah Propinsi Jawa Timur 
            berupaya menjadikan Jaringan Dokumentasi dan Informasi Hukum sebagai pusat informasi hukum yang dapat 
            berfungsi maksimal untuk menyebarluaskan informasi hukum dan peraturan perundang-undangan bagi anggota 
            jaringan dan masyarakat di Propinsi Jawa Timur serta memberikan kontribusi informasi hukum secara nasional.
          </p>
        </section>

        {/* Visi dan Misi */}
        <section className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-lg font-bold text-green-800 mb-2">Visi dan Misi</h2>
          <p className="mb-3 text-gray-700">
            Layanan informasi hukum yang mudah, cepat dan akurat menuju masyarakat sadar hukum
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Meningkatkan kualitas ragam pelayanan</li>
            <li>Meningkatkan efisiensi dan efektivitas informasi hukum</li>
            <li>Meningkatkan kerja sama kegiatan pendokumentasian produk hukum dalam satu jaringan</li>
            <li>Menjadikan fasilitas yang tersedia untuk kerja sama dan pembentukan jaringan yang seutuhnya</li>
            <li>Pemanfaatan dan pendayagunaan potensi masyarakat sebagai kontributor opini, analisa, maupun informasi edukatif</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
