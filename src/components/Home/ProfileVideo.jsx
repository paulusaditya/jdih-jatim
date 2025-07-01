"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";

export default function ProfileVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "7paQODa7iDA";
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <div className="relative bg-gray-300 rounded-3xl overflow-hidden aspect-video shadow-xl">
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
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgdmlld0JveD0iMCAwIDY0MCAzNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2NDAiIGhlaWdodD0iMzYwIiBmaWxsPSIjRDlEOUQ5Ii8+CjxjaXJjbGUgY3g9IjMyMCIgY3k9IjE4MCIgcj0iNDAiIGZpbGw9IiM5Q0E4QUYiLz4KPHBhdGggZD0iTTMxMCAxNzBMMzMwIDE4MEwzMTAgMTkwVjE3MFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=";
                  }}
                />
                <button
                  className="absolute inset-0 flex items-center justify-center hover:bg-black hover:bg-opacity-10 transition-all duration-300 group"
                  onClick={() => setIsPlaying(true)}
                >
                  <div className="w-20 h-20 bg-white bg-opacity-95 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
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
        </div>

        <div className="order-1 lg:order-2 flex flex-col justify-center space-y-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-green-700 leading-tight">
            Profile JDIH Jawa Timur
          </h2>
          <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
            Situs ini merupakan situs resmi JDIH Biro Hukum Provinsi Jawa Timur.
            Situs ini memuat data dan informasi-informasi produk hukum baik
            produk hukum pusat maupun daerah. Disamping itu, situs ini memuat
            pula informasi mengenai buku-buku referensi tentang hukum yang
            dimiliki oleh Biro Hukum Provinsi Jawa Timur.
          </p>
          <div className="pt-2">
            <a
              href="https://www.youtube.com/@JDIHProvJatim"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border-2 border-green-700 text-green-700 px-6 py-3 rounded-xl font-medium hover:bg-green-700 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Buka Channel Youtube
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
