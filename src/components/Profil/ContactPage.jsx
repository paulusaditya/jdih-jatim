"use client";

import { Clock, Mail, MapPin, Phone, Printer } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm max-w-7xl mx-auto">
        <h2 className="text-blue-900 font-bold text-lg md:text-xl mb-6">
          Kontak Kami
        </h2>

        <div className="space-y-6 text-blue-900 text-sm">
          {/* Alamat */}
          <div className="flex items-start">
            <div className="bg-green-100 p-2 rounded-full">
              <MapPin className="text-green-600 h-5 w-5" />
            </div>
            <div className="ml-4">
              <p className="font-semibold">Alamat Kami:</p>
              <p className="text-blue-800">
                Jl. Pahlawan No.110, Alun-alun Contong, Bubutan, Surabaya 60174,
                Jawa Timur – Indonesia.
              </p>
            </div>
          </div>

          {/* Telepon */}
          <div className="flex items-start">
            <div className="bg-green-100 p-2 rounded-full">
              <Phone className="text-green-600 h-5 w-5" />
            </div>
            <div className="ml-4">
              <p className="font-semibold">Phone:</p>
              <p className="text-blue-800">031-3520881</p>
            </div>
          </div>

          {/* Fax */}
          <div className="flex items-start">
            <div className="bg-green-100 p-2 rounded-full">
              <Printer className="text-green-600 h-5 w-5" />
            </div>
            <div className="ml-4">
              <p className="font-semibold">Fax:</p>
              <p className="text-blue-800">031-3524001 (Psw. 1118)</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start">
            <div className="bg-green-100 p-2 rounded-full">
              <Mail className="text-green-600 h-5 w-5" />
            </div>
            <div className="ml-4">
              <p className="font-semibold">Email:</p>
              <p className="text-blue-800">
                <a
                  href="mailto:support@jdih.jatimprov.go.id"
                  className="hover:underline"
                >
                  support@jdih.jatimprov.go.id
                </a>
              </p>
            </div>
          </div>

          {/* Jam Kerja */}
          <div className="flex items-start">
            <div className="bg-green-100 p-2 rounded-full">
              <Clock className="text-green-600 h-5 w-5" />
            </div>
            <div className="ml-4">
              <p className="font-semibold">Jam Kerja:</p>
              <p className="text-blue-800">Senin s/d Jumat 08:00 - 16:00 WIB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
