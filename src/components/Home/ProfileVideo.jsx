"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";

export default function ProfileVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "7paQODa7iDA";
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 p-20 bg-green-50">
      <div className="relative bg-gray-200 rounded-lg overflow-hidden aspect-video">
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
              alt="Thumbnail video"
              className="w-full h-full object-cover"
            />
            <button
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-50 transition"
              onClick={() => setIsPlaying(true)}
            >
              <div className="w-14 h-14 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </button>
          </>
        )}
      </div>

      <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          Profile JDIH Jawa Timur
        </h2>
        <p className="text-gray-700 mb-4">
          Situs ini merupakan situs resmi JDIH Biro Hukum Provinsi Jawa Timur.
          Situs ini memuat data dan informasi produk hukum baik produk hukum
          maupun lainnya. Disamping itu, situs ini memuat pula informasi
          mengenai buku-buku referensi hukum yang dimiliki oleh Biro Hukum
          Provinsi Jawa Timur.
        </p>
        <a
          href="https://www.youtube.com/@JDIHProvJatim"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-md self-start hover:bg-green-200 transition-colors"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Buka Channel Youtube
        </a>
      </div>
    </div>
  );
}
