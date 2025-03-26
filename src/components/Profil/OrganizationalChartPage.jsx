const OrganizationalChartPage = () => {
  return (
    <div className="flex justify-center mt-20">
      <div className="max-w-3xl">
        <h1 className="text-xl font-bold text-center text-blue-800 mb-2">
          Struktur Organisasi
        </h1>
        <h2 className="text-lg font-semibold text-center text-blue-700 mb-2">
          Jaringan Dokumentasi dan Informasi Hukum Provinsi Jawa Timur
        </h2>
        <h3 className="text-md font-medium text-center text-blue-600 mb-6">
          Peraturan Gubernur Jawa Timur Nomor 62 Tahun 2021
        </h3>

        <div className="relative">
          <img
            src="/image114.png"
            alt="Struktur Organisasi JDIH Provinsi Jawa Timur"
            width={800}
            height={500}
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  );
};


export default OrganizationalChartPage;
