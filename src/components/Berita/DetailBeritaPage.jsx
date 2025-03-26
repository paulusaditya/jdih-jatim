"use client"

import { Calendar, Instagram, Facebook, MessageCircle, ChevronRight, ChevronLeft, ChevronLeftCircle, ChevronLeftCircleIcon } from "lucide-react"
import { Link } from "react-router-dom"

export default function DetailBeritaPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Header Image */}
      <div className="mb-6">
        <img
          src="/assets/berita/imageberita1.png?height=300&width=800"
          alt="Dinas Pendidikan Provinsi"
          width={800}
          height={300}
          className="w-full h-auto rounded-lg"
        />
      </div>

      {/* Article Title */}
      <h1 className="text-xl font-bold text-gray-800 mb-4">
        Kendalikan Inflasi, Gubernur Khofifah Terus Gelar Pasar Murah di Berbagai Daerah di Jawa Timur
      </h1>

      {/* Date and Author */}
      <div className="flex flex-row justify-between items-center mb-6 text-sm text-gray-600">
        <div className="flex items-center text-green-600">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Jumat, 6 Mei 2024</span>
        </div>
        <div className="text-gray-600">Oleh: Biro Humas Provinsi Jawa Timur</div>
      </div>

      {/* Article Content */}
      <div className="prose max-w-none mb-8 text-gray-700">
        <p className="mb-4">
          Figma ipsum component variant main layer. Italic scale variant stroke background mask fill. Text editor text
          flatten clip library device. Device rotate text undo component bullet main layer mask line. Content asset
          layout component selection boolean horizontal origin link content outline vector breakthrough. Line clip
          flatten create clip text edit. Rectangle star layer outline duplicate shadow arrange. Background layer
          background fill slice flatten group draft hand. Invite effect follower asset connection text edit. Ellipse
          italic breakthrough.
        </p>

        <p className="mb-4">
          Background team background fill slice flatten group draft hand. Invite effect follower asset connection text
          edit. Ellipse italic breakthrough. Invite background layer mask. Figma auto layout component boolean draft.
          Blur, auto component draft style. Ellipse, auto layout, component draft style union transform selection effect
          scrolling.
        </p>

        {/* Second Image - Graph with arrow */}
        <div className="my-6">
          <img
            src="/assets/berita/imageberita2.png?height=300&width=600"
            alt="Grafik Inflasi"
            width={600}
            height={300}
            className="w-full h-auto rounded-lg"
          />
        </div>

        <p className="mb-4">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
      </div>

      {/* Share Buttons - Simple version as in the image */}
      <div className="flex items-center justify-between border-t pt-4 pb-4">
        <div className="flex items-center">
          <span className="mr-2 text-sm">Bagikan:</span>
          <div className="flex space-x-2">
            <button className="text-gray-600">
              <Instagram className="h-4 w-4" />
            </button>
            <button className="text-gray-600">
              <Facebook className="h-4 w-4" />
            </button>
            <button className="text-gray-600">
              <MessageCircle className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Next Button */}
        <Link to="#" className="inline-flex items-center text-blue-600 text-sm">
          <ChevronLeftCircleIcon className="h-4 w-4 ml-1" />
          Sebelumnya
        </Link>
      </div>

      {/* Berita Lainnya - Exact match to the image */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">Berita Lainnya</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              img: "/assets/berita/image(1).png",
              date: "22 Januari 2024",
              category: "Pendidikan",
              title: "Interdum cras velit tristique et odio amet eu.",
            },
            {
              img: "/assets/berita/image(2).png",
              date: "22 Januari 2024",
              category: "Pendidikan",
              title: "Morbi volutpat consequat nunc mattis imperdiet aliquet.",
            },
            {
              img: "/assets/berita/image(3).png",
              date: "22 Januari 2024",
              category: "Pendidikan",
              title: "Blandit viverra odio amet egestas lorem scelerisque consequat.",
            },
            {
              img: "/assets/berita/image(4).png",
              date: "22 Januari 2024",
              category: "Pendidikan",
              title: "Turpis vitae tincidunt ac sit tristique sed in.",
            },
          ].map((item, index) => (
            <div key={index} className="overflow-hidden">
              <img
                src={item.img || "/placeholder.svg"}
                alt="Berita thumbnail"
                className="w-full h-32 object-cover rounded"
              />
              <div className="mt-2">
                <div className="flex items-center text-xs">
                  <span className="text-gray-500">{item.date}</span>
                  <span className="mx-1 text-gray-500">·</span>
                  <span className="text-red-500">{item.category}</span>
                </div>
                <p className="mt-1 text-sm font-medium line-clamp-2">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

