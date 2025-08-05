"use client";

import { useEffect, useState } from "react";
import { MapPin, X } from "lucide-react";
import Monographic from "./Home/Monographic";

const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const PerpustakaanSkeleton = () => (
  <section className="py-10 px-4 md:px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      <SkeletonBox className="w-full h-[300px] md:h-[400px]" />

      <div className="flex flex-col justify-center space-y-6">
        <SkeletonBox className="h-8 w-3/4" />
        <div>
          <SkeletonBox className="h-5 w-1/4 mb-2" />
          <SkeletonBox className="h-4 w-full" />
        </div>
        <div>
          <SkeletonBox className="h-5 w-1/4 mb-2" />
          <SkeletonBox className="h-4 w-1/2" />
        </div>
        <SkeletonBox className="h-10 w-40" />
      </div>
    </div>
  </section>
);

const PhotoSkeleton = () => (
  <section className="py-10 px-4 md:px-6 bg-gray-50">
    <div className="max-w-7xl mx-auto">
      <SkeletonBox className="h-6 w-1/3 mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonBox key={index} className="aspect-square" />
        ))}
      </div>
    </div>
  </section>
);

const PerpustakaanPage = () => {
  const [data, setData] = useState(null);
  const [photoData, setPhotoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photoLoading, setPhotoLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://jdih.pisdev.my.id/api/v2/topics/by-slug/perpustakaan-hukum-biro-hukum-sekretariat-daerah-provinsi-jawa-timur`
        );
        if (!res.ok) throw new Error("Failed to fetch library data");
        const result = await res.json();
        setData(result.data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchPhotoData = async () => {
      try {
        const photoIds = [52511, 52512, 52513, 52514];
        const photoPromises = photoIds.map(async (id) => {
          try {
            const res = await fetch(`https://jdih.pisdev.my.id/api/v2/topics/${id}`);
            if (res.ok) {
              const result = await res.json();
              return result.data;
            }
            return null;
          } catch {
            return null;
          }
        });

        const photos = await Promise.all(photoPromises);
        setPhotoData(photos.filter((photo) => photo && photo.image));
      } catch (err) {
        console.error("Error fetching photos:", err);
      } finally {
        setPhotoLoading(false);
      }
    };

    fetchData();
    fetchPhotoData();
  }, []);

  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  const alamat =
    data?.fields?.find((f) => f.title === "Alamat")?.details?.replace(/\r\n/g, " ") ??
    "Jl. Pahlawan No.110, Surabaya";
  const buka =
    data?.fields?.find((f) => f.title === "Buka")?.details ??
    "Senin - Jumat (09.00 - 15.00)";

  return (
    <div>
      {loading ? (
        <PerpustakaanSkeleton />
      ) : (
        <section className="py-10 px-4 md:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div className="rounded-lg overflow-hidden w-full h-[300px] md:h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1120.7372642867172!2d112.73900700233523!3d-7.245924159933477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f940401c8755%3A0xe6b91ad0a085eaca!2sKantor%20Gubernur%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1749876888754!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-6">
                {data?.title ?? "Perpustakaan JDIH"}
              </h1>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-green-700 mb-1">Lokasi</h2>
                <p className="text-gray-700">{alamat}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-semibold text-green-700 mb-1">Buka</h2>
                <p className="text-gray-700">{buka}</p>
              </div>

              <a
                href="https://maps.google.com/?q=Jl. Pahlawan No. 110 Kota Surabaya"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-green-700 text-green-700 px-4 py-2 rounded-md hover:bg-green-50 transition-colors w-fit"
              >
                <MapPin size={18} />
                Buka Maps
              </a>
            </div>
          </div>
        </section>
      )}

      {photoLoading ? (
        <PhotoSkeleton />
      ) : (
        <section className="py-10 px-4 md:px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-6">
              Photo Perpustakaan JDIH
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {photoData.length > 0 ? (
                photoData.map((photo) => (
                  <div
                    key={photo.id}
                    className="aspect-square bg-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                    onClick={() => handleImageClick(photo.image)}
                  >
                    <img
                      src={photo.image}
                      alt={photo.title || "Photo Perpustakaan"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))
              ) : (
                Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center"
                  >
                    <div className="text-gray-400 text-2xl">📷</div>
                  </div>
                ))
              )}
            </div>
          </div>

          {selectedImage && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
              <div className="relative max-w-3xl w-full px-4">
                <button
                  className="absolute top-2 right-2 text-white hover:text-red-400"
                  onClick={closeModal}
                >
                  <X size={28} />
                </button>
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}
        </section>
      )}

      <Monographic />
    </div>
  );
};

export default PerpustakaanPage;
