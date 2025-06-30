"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";

export default function ProfileVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "7paQODa7iDA";
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 p-8 pt-16 md:pt-100 bg-white min-h-screen items-center">
      <div className="relative bg-green-100 rounded-3xl overflow-hidden aspect-video shadow-lg">
        {isPlaying ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="Profile JDIH Jawa Timur"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={thumbnailUrl}
              alt="Thumbnail video Profile JDIH Jawa Timur"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgdmlld0JveD0iMCAwIDY0MCAzNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2NDAiIGhlaWdodD0iMzYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMjAgMTgwTDM0MCAyMDBIMzAwTDMyMCAxODBaIiBmaWxsPSIjOTMxOEY3Ii8+CjwvdXRmPgo=";
              }}
            />
            <button
              className="absolute inset-0 flex items-center justify-center hover:bg-black hover:bg-opacity-20 transition-all duration-300"
              onClick={() => setIsPlaying(true)}
            >
              <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          </>
        )}
      </div>

      <div className="flex flex-col justify-start space-y-6">
        <h2 className="text-3xl font-bold text-green-600 leading-tight">
          Profile JDIH Jawa Timur
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Situs ini merupakan situs resmi JDIH Biro Hukum Provinsi Jawa Timur.
          Situs ini memuat data dan informasi-informasi produk hukum baik produk
          hukum pusat maupun daerah. Disamping itu, situs ini memuat pula
          informasi mengenai buku-buku referensi tentang hukum yang dimiliki
          oleh Biro Hukum Provinsi Jawa Timur.
        </p>
        <a
          href="https://www.youtube.com/@JDIHProvJatim"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-lg self-start hover:bg-green-600 transition-colors font-medium shadow-md hover:shadow-lg"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Buka Channel Youtube
        </a>
      </div>
    </div>
  );
}
