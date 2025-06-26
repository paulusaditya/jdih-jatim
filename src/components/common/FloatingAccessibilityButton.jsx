"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX, Eye, Minus, Plus } from "lucide-react";

const FloatingAccessibilityButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState(() => {
    const saved = sessionStorage?.getItem("accessibility-fontSize");
    return saved ? Number.parseInt(saved) : 16;
  });
  const [currentTheme, setCurrentTheme] = useState("default");
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = sessionStorage?.getItem("accessibility-sound");
    return saved ? JSON.parse(saved) : true;
  });
  const [screenReaderMode, setScreenReaderMode] = useState(false);
  const [talkBackEnabled, setTalkBackEnabled] = useState(() => {
    const saved = sessionStorage?.getItem("accessibility-talkback");
    return saved ? JSON.parse(saved) : false;
  });

  // Effect untuk menyimpan pengaturan
  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      sessionStorage.setItem("accessibility-fontSize", fontSize.toString());
    }
  }, [fontSize]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      sessionStorage.setItem(
        "accessibility-sound",
        JSON.stringify(soundEnabled)
      );
    }
  }, [soundEnabled]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      sessionStorage.setItem(
        "accessibility-talkback",
        JSON.stringify(talkBackEnabled)
      );
    }
  }, [talkBackEnabled]);

  // Restore pengaturan saat component mount
  useEffect(() => {
    // Restore font size
    if (fontSize !== 16) {
      document.documentElement.style.fontSize = `${fontSize}px`;
    }

    // Announce TalkBack status jika aktif
    if (talkBackEnabled) {
      setTimeout(() => {
        speakText("TalkBack sudah aktif dari sesi sebelumnya");
      }, 1000);
    }
  }, []);

  // Deteksi TalkBack atau screen reader lainnya
  useEffect(() => {
    const checkScreenReader = () => {
      const hasScreenReader =
        window.speechSynthesis ||
        navigator.userAgent.includes("TalkBack") ||
        window.navigator.userAgent.includes("JAWS") ||
        window.navigator.userAgent.includes("NVDA");
      setScreenReaderMode(!!hasScreenReader);
    };

    checkScreenReader();
  }, []);

  // Setup global event listeners untuk talkback
  useEffect(() => {
    if (talkBackEnabled && window.speechSynthesis) {
      const handleClick = (e) => {
        const text = getElementText(e.target);
        if (text) {
          speakText(`Mengklik ${text}`);
        }
      };

      const handleMouseOver = (e) => {
        const text = getElementText(e.target);
        if (text) {
          speakText(text);
        }
      };

      // Tambahkan event listeners ke seluruh dokumen
      document.addEventListener("click", handleClick, true);
      document.addEventListener("mouseover", handleMouseOver, true);

      // Cleanup event listeners
      return () => {
        document.removeEventListener("click", handleClick, true);
        document.removeEventListener("mouseover", handleMouseOver, true);
      };
    }
  }, [talkBackEnabled]);

  // Fungsi untuk mendapatkan teks dari elemen
  const getElementText = (element) => {
    if (!element) return "";

    // Prioritas: aria-label > alt > title > textContent
    const ariaLabel = element.getAttribute("aria-label");
    if (ariaLabel) return ariaLabel;

    const altText = element.getAttribute("alt");
    if (altText) return altText;

    const titleText = element.getAttribute("title");
    if (titleText) return titleText;

    // Untuk button, input, dll
    if (element.tagName === "BUTTON" || element.tagName === "INPUT") {
      return (
        element.textContent?.trim() ||
        element.value ||
        element.placeholder ||
        ""
      );
    }

    // Untuk elemen lain, ambil text content tanpa batasi panjangnya
    const textContent = element.textContent?.trim() || "";
    return textContent;
  };

  // Fungsi untuk berbicara dengan suara yang lebih baik
  const speakText = (text) => {
    if (!text || !window.speechSynthesis || !talkBackEnabled) return;

    // Stop speech yang sedang berjalan
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "id-ID";
    utterance.rate = 0.9;
    utterance.volume = 0.8;
    utterance.pitch = 1;

    // Coba cari voice Indonesia
    const voices = window.speechSynthesis.getVoices();
    const indonesianVoice = voices.find(
      (voice) => voice.lang.includes("id") || voice.lang.includes("ID")
    );

    if (indonesianVoice) {
      utterance.voice = indonesianVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  // Fungsi untuk mengumumkan perubahan ke screen reader
  const announceToScreenReader = (message) => {
    if (window.speechSynthesis && soundEnabled) {
      speakText(message);
    }
  };

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    announceToScreenReader(
      newState ? "Menu aksesibilitas dibuka" : "Menu aksesibilitas ditutup"
    );
  };

  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 2, 24);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}px`;
    announceToScreenReader(`Ukuran font diperbesar menjadi ${newSize} piksel`);
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 2, 12);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}px`;
    announceToScreenReader(`Ukuran font diperkecil menjadi ${newSize} piksel`);
  };

  const toggleSound = () => {
    const newSound = !soundEnabled;
    setSoundEnabled(newSound);

    // Test suara langsung saat diaktifkan
    if (newSound && window.speechSynthesis) {
      speakText("Suara diaktifkan");
    }
  };

  // Toggle TalkBack
  const toggleTalkBack = () => {
    const newTalkBack = !talkBackEnabled;
    setTalkBackEnabled(newTalkBack);

    if (newTalkBack) {
      speakText(
        "Fitur TalkBack aktif. Sekarang semua elemen akan dibacakan saat diklik atau di-hover."
      );
    } else {
      speakText("Fitur TalkBack nonaktif");
    }
  };

  // Fungsi untuk test suara
  const testSound = () => {
    if (window.speechSynthesis && soundEnabled) {
      speakText(
        "Ini adalah tes suara aksesibilitas. TalkBack sedang berfungsi dengan baik."
      );
    } else if (!soundEnabled) {
      alert("Aktifkan panduan suara terlebih dahulu");
    } else {
      alert("Browser tidak mendukung text-to-speech");
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e, action) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return (
    <>
      {/* CSS untuk tema dan high contrast mode */}
      <style jsx>{`
        :root {
          --theme-primary: #3b82f6;
          --theme-secondary: #1e40af;
          --theme-background: #ffffff;
          --theme-text: #1f2937;
          --theme-surface: #f9fafb;
        }

        .theme-applied {
          background-color: var(--theme-background) !important;
          color: var(--theme-text) !important;
        }

        .theme-applied * {
          border-color: var(--theme-text) !important;
        }

        .theme-applied .theme-primary {
          background-color: var(--theme-primary) !important;
          color: white !important;
        }

        .theme-applied .theme-surface {
          background-color: var(--theme-surface) !important;
        }

        .talkback-active {
          outline: 2px solid #3b82f6 !important;
          outline-offset: 2px !important;
        }
      `}</style>

      {/* Floating Button */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
        <button
          onClick={toggleMenu}
          onKeyDown={(e) => handleKeyDown(e, toggleMenu)}
          className={`
            w-12 h-12 rounded-xl shadow-lg transition-all duration-300 transform
            ${
              currentTheme === "dark" || currentTheme === "highContrast"
                ? "bg-black text-white border-2 border-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }
            hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300
            active:scale-95 flex items-center justify-center group
          `}
          aria-label="Buka menu aksesibilitas"
          aria-expanded={isMenuOpen}
          aria-haspopup="true"
          role="button"
          tabIndex={0}
        >
          {/* Accessibility Icon - Stylized person icon */}
          <i className="bi bi-universal-access text-2xl" aria-hidden="true"></i>
        </button>

        {/* Accessibility Menu */}
        {isMenuOpen && (
          <div
            className={`
              absolute left-14 top-1/2 transform -translate-y-1/2 w-80 p-5 rounded-lg shadow-2xl
              ${
                currentTheme === "dark" || currentTheme === "highContrast"
                  ? "bg-black text-white border-2 border-white"
                  : "bg-white text-gray-800 border border-gray-300"
              }
              transition-all duration-300 origin-left
            `}
            role="menu"
            aria-label="Menu pengaturan aksesibilitas"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
              <h3 className="text-lg font-bold text-blue-600">
                Pengaturan Aksesibilitas
              </h3>
              <button
                onClick={toggleMenu}
                className="text-gray-500 hover:text-gray-700 p-1"
                aria-label="Tutup menu"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* TalkBack Toggle - New Design */}
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-3 text-gray-700">
                TalkBack
              </label>

              <div className="flex items-center justify-center">
                <button
                  onClick={toggleTalkBack}
                  onKeyDown={(e) => handleKeyDown(e, toggleTalkBack)}
                  className={`
                    relative w-20 h-20 rounded-2xl shadow-lg transition-all duration-300 transform
                    ${
                      talkBackEnabled
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }
                    hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300
                    active:scale-95 flex items-center justify-center group
                  `}
                  aria-label={`TalkBack ${
                    talkBackEnabled ? "aktif" : "nonaktif"
                  }`}
                  role="switch"
                  aria-checked={talkBackEnabled}
                >
                  {/* Accessibility Icon - Same as floating button */}
                  <i
                    className="bi bi-universal-access text-4xl"
                    aria-hidden="true"
                  ></i>
                </button>
              </div>

              {/* TalkBack Status Text */}
              <div className="mt-3 text-center">
                <span
                  className={`
                  text-sm font-medium px-3 py-1 rounded-full
                  ${
                    talkBackEnabled
                      ? "bg-blue-100 text-blue-700"
                      : "bg-red-100 text-red-700"
                  }
                `}
                >
                  {talkBackEnabled ? "🔊 Aktif" : "🔇 Nonaktif"}
                </span>
              </div>
            </div>

            {/* Font Size Controls */}
            <div
              className="mb-5"
              role="group"
              aria-labelledby="font-size-label"
            >
              <label
                id="font-size-label"
                className="block text-sm font-semibold mb-3 text-gray-700"
              >
                Ukuran Teks
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={decreaseFontSize}
                  onKeyDown={(e) => handleKeyDown(e, decreaseFontSize)}
                  className={`
                    px-3 py-2 rounded-md border transition-colors flex items-center gap-1
                    ${fontSize <= 12 ? "opacity-50 cursor-not-allowed" : ""}
                    bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                  `}
                  aria-label="Perkecil ukuran teks"
                  disabled={fontSize <= 12}
                >
                  <Minus className="w-4 h-4" />
                  <span className="text-xs">A</span>
                </button>

                <div className="flex-1 text-center">
                  <span className="text-sm font-medium">{fontSize}px</span>
                </div>

                <button
                  onClick={increaseFontSize}
                  onKeyDown={(e) => handleKeyDown(e, increaseFontSize)}
                  className={`
                    px-3 py-2 rounded-md border transition-colors flex items-center gap-1
                    ${fontSize >= 24 ? "opacity-50 cursor-not-allowed" : ""}
                    bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                  `}
                  aria-label="Perbesar ukuran teks"
                  disabled={fontSize >= 24}
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">A</span>
                </button>
              </div>
            </div>

            {/* Sound Toggle */}
            <div className="mb-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-gray-100 text-gray-700">
                    {soundEnabled ? (
                      <Volume2 className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <VolumeX className="w-5 h-5" aria-hidden="true" />
                    )}
                  </div>
                  <div>
                    <span className="font-semibold text-sm">Panduan Suara</span>
                    <p className="text-xs text-gray-500">
                      Aktifkan feedback audio
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleSound}
                  onKeyDown={(e) => handleKeyDown(e, toggleSound)}
                  className={`
                    relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    ${soundEnabled ? "bg-blue-600" : "bg-gray-300"}
                  `}
                  role="switch"
                  aria-checked={soundEnabled}
                  aria-label={`Panduan suara ${
                    soundEnabled ? "aktif" : "nonaktif"
                  }`}
                >
                  <span
                    className={`
                      inline-block h-4 w-4 transform rounded-full bg-white transition
                      ${soundEnabled ? "translate-x-6" : "translate-x-1"}
                    `}
                  />
                </button>
              </div>

              {/* Test Sound Button */}
              {soundEnabled && (
                <div className="mt-3">
                  <button
                    onClick={testSound}
                    className={`
                      w-full px-3 py-2 text-sm rounded-md border transition-colors
                      bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                    `}
                    aria-label="Test suara aksesibilitas"
                  >
                    🔊 Test Suara
                  </button>
                </div>
              )}
            </div>

            {/* Screen Reader Status */}
            {screenReaderMode && (
              <div
                className={`
                  flex items-center gap-3 p-3 rounded-md mb-4
                  bg-green-50 text-green-800 border border-green-200
                `}
                role="status"
                aria-live="polite"
              >
                <div className="p-1 bg-green-600 text-white rounded">
                  <Eye className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="font-semibold text-sm">
                    Screen Reader Aktif
                  </span>
                  <p className="text-xs">Pembaca layar terdeteksi</p>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Fitur aksesibilitas untuk kemudahan akses
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Overlay untuk menutup menu saat klik di luar */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default FloatingAccessibilityButton;
