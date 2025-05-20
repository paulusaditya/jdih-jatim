import React from "react";

const PlaystoreBanner = () => {
  return (
    <div className="w-full bg-[#0056f5] rounded-xl text-white px-6 py-8 md:py-10 relative overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold">
            JDIH Sekarang Sudah Hadir Di Playstore!
          </h2>
          <p className="mt-2 text-sm md:text-base">
            Dapatkan kemudahan dalam mengakses seluruh agenda hukum Jawa Timur di ponsel kamu.
          </p>
        </div>
        <div>
          <a
            href="https://play.google.com/store/apps/details?id=com.jatimprov.jdihjatim&pcampaignid=web_share"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/gplay-logo.png"
              alt="Get it on Google Play"
              className="h-12 md:h-14 mx-auto md:mx-0"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlaystoreBanner;
