"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Play } from "lucide-react";
import baseUrl from "../config/api";

export default function GalleryPage() {
  const [videos, setVideos] = useState({
    signLanguage: [],
    regulations: [],
    activities: [],
    podcasts: [],
    publicService: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/topics?per_page=99&page=1&webmaster_section_id=27&sort_by=id&sort_order=asc`
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil data video");
      }

      const data = await response.json();
      setVideos(categorizeVideos(data.data.data));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const categorizeVideos = (videoData) => {
    const categorized = {
      signLanguage: [],
      regulations: [],
      activities: [],
      podcasts: [],
      publicService: [],
    };

    videoData.forEach((video) => {
      const title = video.title.toLowerCase();

      if (title.includes("peraturan daerah") && !title.includes("penyuluhan")) {
        categorized.signLanguage.push(video);
      } else if (title.includes("penyuluhan hukum")) {
        categorized.activities.push(video);
      } else if (title.includes("podcast") || title.includes("rechtpod")) {
        categorized.podcasts.push(video);
      } else if (
        title.includes("sosialisasi") ||
        title.includes("bantuan hukum") ||
        title.includes("waspada") ||
        title.includes("perlindungan")
      ) {
        categorized.publicService.push(video);
      } else {
        categorized.regulations.push(video);
      }
    });

    return categorized;
  };

  const extractYouTubeId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
    );
    return match ? match[1] : "";
  };

  const getYouTubeThumbnail = (url) => {
    const id = extractYouTubeId(url);
    return id
      ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
      : "/placeholder.svg?height=200&width=350";
  };

  const openYouTube = (url) => window.open(url, "_blank");

  const VideoCard = ({ video, loading = false }) => {
    if (loading) {
      return (
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow mb-6 animate-pulse">
          <div className="md:flex">
            <div className="md:w-1/3 relative">
              <div className="aspect-video bg-gray-200"></div>
            </div>
            <div className="md:w-2/3 p-6">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow mb-6 hover:shadow-lg transition-shadow">
        <div className="md:flex">
          <div className="md:w-1/3 relative">
            <div className="aspect-video relative overflow-hidden">
              <img
                src={getYouTubeThumbnail(video.video)}
                alt={video.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/placeholder.svg?height=200&width=350";
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <Play className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          <div className="md:w-2/3 p-6">
            <h3 className="text-lg font-semibold text-green-700 mb-3">
              {video.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {video.seo_description_id ||
                "Dalam upaya pengembangan desa wisata, diperlukan pemberdayaan yang terintegrasi dengan pembangunan daerah."}
            </p>
            <button
              onClick={() => openYouTube(video.video)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2 transition-colors"
            >
              Buka Youtube
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const SectionTitle = ({ title, loading = false }) => {
    if (loading) {
      return (
        <div className="h-8 bg-gray-200 rounded w-64 mb-6 animate-pulse"></div>
      );
    }

    return (
      <h2 className="text-xl font-bold text-green-700 mb-6 border-b-2 border-green-200 pb-2">
        {title}
      </h2>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl space-y-12">
        {/* Sign Language Section Skeleton */}
        <section>
          <SectionTitle loading={true} />
          <div className="space-y-6">
            {Array.from({ length: 2 }).map((_, index) => (
              <VideoCard key={index} loading={true} />
            ))}
          </div>
        </section>

        {/* Activities Section Skeleton */}
        <section>
          <SectionTitle loading={true} />
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <VideoCard key={index} loading={true} />
            ))}
          </div>
        </section>

        {/* Podcasts Section Skeleton */}
        <section>
          <SectionTitle loading={true} />
          <div className="space-y-6">
            {Array.from({ length: 2 }).map((_, index) => (
              <VideoCard key={index} loading={true} />
            ))}
          </div>
        </section>

        {/* Public Service Section Skeleton */}
        <section>
          <SectionTitle loading={true} />
          <div className="space-y-6">
            {Array.from({ length: 2 }).map((_, index) => (
              <VideoCard key={index} loading={true} />
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-600">
        <p>Error: {error}</p>
        <button
          onClick={fetchVideos}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-4 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-12">
      {videos.signLanguage.length > 0 && (
        <section>
          <SectionTitle title="Video Alih Bahasa Isyarat Peraturan Daerah :" />
          <div className="space-y-6">
            {videos.signLanguage.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </section>
      )}

      {videos.activities.length > 0 && (
        <section>
          <SectionTitle title="Video Kegiatan :" />
          <div className="space-y-6">
            {videos.activities.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </section>
      )}

      {videos.podcasts.length > 0 && (
        <section>
          <SectionTitle title='Podcast "Rechtpod" :' />
          <div className="space-y-6">
            {videos.podcasts.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </section>
      )}

      {videos.publicService.length > 0 && (
        <section>
          <SectionTitle title="Iklan Layanan Masyarakat :" />
          <div className="space-y-6">
            {videos.publicService.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
