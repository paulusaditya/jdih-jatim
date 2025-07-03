const LoadingSpinner = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto px-4 py-6">
      {/* Judul */}
      <div className="h-6 w-2/3 bg-gray-300 rounded animate-pulse" />

      {/* Paragraf pembuka */}
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-300 rounded animate-pulse" />
        <div className="h-4 w-11/12 bg-gray-300 rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse" />
      </div>

      {/* Bullet List */}
      <div className="space-y-4">
        {[1, 2].map((_, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 mt-2 bg-gray-400 rounded-full animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-full bg-gray-300 rounded animate-pulse" />
                <div className="h-4 w-11/12 bg-gray-300 rounded animate-pulse" />
                <div className="h-4 w-4/5 bg-gray-300 rounded animate-pulse" />
              </div>
            </div>

            {/* Link panjang */}
            <div className="ml-6 space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Penutup */}
      <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse mt-4" />
    </div>
  );
};

export default LoadingSpinner;
