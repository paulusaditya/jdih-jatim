import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto px-4 py-6">
      {/* Judul Skeleton */}
      <div className="h-6 w-3/4 bg-gray-300 rounded animate-pulse"></div>

      {/* Paragraf Skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
        <div className="h-4 w-5/6 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-4 w-2/3 bg-gray-300 rounded animate-pulse"></div>
      </div>

      {/* Link Skeleton */}
      <div className="h-4 w-1/2 bg-gray-300 rounded animate-pulse mt-4"></div>
      <div className="h-4 w-1/2 bg-gray-300 rounded animate-pulse"></div>

      {/* Tambahan Baris Skeleton */}
      <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse mt-4"></div>
    </div>
  );
};

export default LoadingSpinner;
