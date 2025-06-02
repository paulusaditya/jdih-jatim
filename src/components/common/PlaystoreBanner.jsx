const PlaystoreBanner = () => {
  return (
    <div className="relative w-full">
      <div
        className="w-full px-4 sm:px-6 py-8 md:py-20 text-white rounded-[20px] green-600"
        style={{
          backgroundImage: "url('/assets/cta.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-5xl mx-auto w-full">
          {/* Mobile view */}
          <div className="md:hidden flex flex-col items-center justify-between gap-6">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-semibold">
                JDIH Sekarang Sudah Hadir Di Playstore!
              </h2>
              <p className="mt-2 text-sm sm:text-base text-white/90">
                Dapatkan kemudahan dalam mengakses seluruh agenda hukum Jawa
                Timur di ponsel kamu.
              </p>
              <div className="mt-4">
                <a
                  href="https://play.google.com/store/apps/details?id=com.jatimprov.jdihjatim&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <img
                    src="/assets/gplay-logo.png"
                    alt="Get it on Google Play"
                    className="w-[160px] sm:w-[180px] h-auto"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Desktop view with fixed positioning */}
          <div className="hidden md:block">
            {/* Container with specific padding to make room for the phone */}
            <div className="pl-4 md:pl-24 lg:pl-60">
              <h2 className="text-2xl md:text-3xl font-semibold">
                JDIH Sekarang Sudah Hadir Di Playstore!
              </h2>
              <p className="mt-2 text-base md:text-lg text-white/90">
                Dapatkan kemudahan dalam mengakses seluruh agenda hukum Jawa
                Timur di ponsel kamu.
              </p>
              <div className="mt-4">
                <a
                  href="https://play.google.com/store/apps/details?id=com.jatimprov.jdihjatim&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <img
                    src="/assets/gplay-logo.png"
                    alt="Get it on Google Play"
                    className="w-[180px] md:w-[200px] h-auto"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phone mockup positioned absolutely to extend outside the banner */}
      <div className="absolute left-[-20px] md:left-20 bottom-[-20px] md:bottom-[0px] top-auto z-10 hidden md:block">
        <img
          src="/assets/mock-up.png"
          alt="Mockup Aplikasi JDIH"
          className="w-[200px] md:w-[240px] h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default PlaystoreBanner;
