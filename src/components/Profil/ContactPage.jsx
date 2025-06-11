"use client";

import { useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Gmaps from "../common/Gmaps";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "message") {
      setCharCount(value.length);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone, subject, message } = formData;

    const waMessage = `Halo, saya ingin menghubungi Anda.%0A%0ANama: ${name}%0AEmail: ${email}%0ANo Telp: ${phone}%0ASubject: ${subject}%0APesan: ${message}`;
    const waUrl = `https://wa.me/6283850286066?text=${waMessage}`;

    window.open(waUrl, "_blank");

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setCharCount(0);
  };

  return (
    <div className="container mx-auto py-12 px-4 space-y-12">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-green-50 rounded-lg p-6 md:p-8">
          <h2 className="text-green-800 font-bold text-xl mb-6">
            Hubungi kami dengan mengisi formulir kontak di bawah ini
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Nama */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama Anda..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Masukkan email Anda..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-1"
                >
                  No Telp
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Masukkan nomor telp Anda..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Masukkan subject Anda..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tuliskan pesan yang ingin Anda tuliskan..."
                  rows={5}
                  maxLength={maxChars}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  required
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {charCount}/{maxChars}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                Kirim Pesan
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
          <h2 className="text-green-800 font-bold text-xl mb-6">Kontak Kami</h2>

          <div className="space-y-6">
            {/* Alamat */}
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <MapPin className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">
                  Alamat Kami:
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Jl. Pahlawan No.110, Alun-alun Contong, Bubutan, Surabaya
                  60174, Jawa Timur - Indonesia.
                </p>
              </div>
            </div>

            {/* Telepon */}
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <Phone className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">Phone:</h3>
                <p className="mt-1 text-sm text-gray-600">
                  031-3520881 031-3524001 (Psw. 1118)
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <Mail className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">Email:</h3>
                <p className="mt-1 text-sm text-gray-600">
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
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <Clock className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">
                  Jam Kerja:
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Senin s/d Jumat 08:00 - 16:00 WIB
                </p>
              </div>
            </div>

            {/* Map Section */}
            <div className="mt-12">
              <h2 className="text-green-800 font-bold text-xl mb-6">
                Lokasi Kantor Gubernur Jawa Timur
              </h2>
              <Gmaps />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
