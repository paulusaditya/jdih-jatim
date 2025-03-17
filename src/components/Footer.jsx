import * as React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
const Footer = () => {
  return (
    <div className="flex flex-col justify-center pt-20 pb-8 w-full bg-blue-950 pl-10 pr-5">
      {" "}
      <div className="flex flex-col items-end w-full max-w-[1263px] max-md:max-w-full">
        <div className="flex flex-wrap gap-5 justify-center items-start w-full max-md:max-w-full">
          <div className="flex flex-col items-start h-[106px] min-w-[240px] w-[302px]">
            <div className="flex gap-1.5 items-start">
              <Instagram className="text-white w-6 h-6" />
              <Linkedin className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col mt-3 text-blue-50">
              <div className="text-sm">
                Jaringan Dokumentasi dan Informasi Hukum
              </div>
              <div className="text-2xl font-bold leading-loose">
                PROVINSI JAWA TIMUR
              </div>
            </div>
          </div>
          <div className="flex flex-wrap flex-1 shrink gap-5 items-start rounded-xl basis-0 min-w-[240px] max-md:max-w-full">
            <div className="flex flex-col grow shrink justify-center w-60 text-white min-w-[240px]">
              <div className="text-lg font-bold leading-none">
                Kantor Biro Hukum Jawa Timur
              </div>
              <div className="mt-4 text-base leading-6">
                Jl. Pahlawan No.110, Alun-alun Contong, Bubutan, Surabaya 60174,
                Jawa Timur – Indonesia.
              </div>
            </div>
            <div className="flex flex-col grow shrink justify-center text-white min-w-[240px] w-[241px]">
              <div className="text-lg font-bold leading-none">
                Customer Support
              </div>
              <div className="mt-4 text-base leading-6">
                031-3520881 031-3524001 (Psw. 1118)
                <br />
                support@jdih.jatimprov.go.id
              </div>
            </div>
            <div className="flex flex-col grow shrink justify-center min-w-[240px] w-[241px]">
              <div className="text-lg font-bold leading-none text-white">
                Media Sosial
              </div>
              <div className="flex gap-8 items-start self-start mt-5">
                <Facebook className="text-white w-6 h-6" />
                <Twitter className="text-white w-6 h-6" />
                <Instagram className="text-white w-6 h-6" />
                <Linkedin className="text-white w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-5 mt-8 max-w-full text-white w-[941px]">
          <div className="flex flex-col justify-center self-start py-4 rounded-xl min-w-[240px] w-[300px]">
            <div className="text-lg font-bold leading-none">Sitemap</div>
            <div className="flex flex-col mt-4 w-full text-base">
              <div>Home</div>
              <div className="mt-1">Profil</div>
              <div className="mt-1">Produk Hukum</div>
              <div className="mt-1">Dokumen Hukum Lainnya</div>
              <div className="mt-1">Berita</div>
              <div className="mt-1">Survey</div>
            </div>
          </div>
          <div className="flex flex-col flex-1 shrink py-4 rounded-xl basis-0 min-w-[240px] max-md:max-w-full">
            <div className="text-lg font-bold leading-none max-md:max-w-full">
              Analytics
            </div>
            <div
              className="flex flex-col mt-4 w-full text-base max-md:max-w
-full"
            >
              <div className="max-md:max-w-full">Pengunjung Hari Ini : 689</div>
              <div className="mt-1 max-md:max-w-full">
                Pengunjung Minggu Lalu : 19009
              </div>
              <div className="mt-1 max-md:max-w-full">
                Pengunjung Bulan Lalu : 83992
              </div>
              <div className="mt-1 max-md:max-w-full">
                Total Pengunjung : 120000392
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/667de9535be45d68e4ce1175c7bcaeafb4be310d38467d92452b72c3009c312?placeholderIfAbsent=true&apiKey=770a91bd70474eb39d8c1896cfba8984"
        className="object-contain mt-8 max-w-full aspect-[1000] w-[1262px]"
      />
      <div className="flex flex-wrap gap-10 justify-between items-center mt-8 max-w-full text-sm leading-6 text-white w-[1262px]">
        <div className="self-stretch my-auto w-[516px] max-md:max-w-full">
          © 2025 Provinsi Jawa Timur. All Rights Reserved.
        </div>
        <div className="self-stretch my-auto text-right w-[516px] max-md:max-w-full">
          Biro Hukum Sekretariat Daerah Jawa Timur . JDIH Jatim
        </div>
      </div>
    </div>
  );
};

export default Footer;