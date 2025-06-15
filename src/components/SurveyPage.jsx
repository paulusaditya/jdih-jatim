"use client";

import { useState } from "react";

export default function SurveyPage() {
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
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "message") setCharCount(value.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, subject, message } = formData;

    const waMessage =
      `Halo, saya ingin menghubungi Anda.\n\n` +
      `Nama: ${name}\n` +
      `Email: ${email}\n` +
      `No Telp: ${phone}\n` +
      `Subject: ${subject}\n` +
      `Pesan: ${message}`;

    const encodedMessage = encodeURIComponent(waMessage);
    const waUrl = `https://wa.me/6283850286066?text=${encodedMessage}`;
    window.open(waUrl, "_blank");

    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setCharCount(0);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h2 className="text-green-800 font-bold text-xl mb-6">
        Hubungi kami dengan mengisi formulir kontak di bawah ini
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Nama</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Masukkan nama Anda..." />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Masukkan email Anda..." />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">No Telp</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Masukkan nomor telp Anda..." />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
          <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Masukkan subject Anda..." />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">Pesan</label>
          <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleInputChange} required maxLength={maxChars} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" placeholder="Tuliskan pesan Anda..." />
          <div className="text-right text-xs text-gray-500 mt-1">{charCount}/{maxChars}</div>
        </div>
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-200">
          Kirim Pesan
        </button>
      </form>
    </div>
  );
}
